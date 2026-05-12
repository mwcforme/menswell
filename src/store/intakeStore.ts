import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { IntakeState } from "@/types/intake";

const initialIntake: IntakeState = {
  contact_id: null,
  submitted_at: null,
  intake_version: "v2",
  about_you: {
    first_name: "",
    last_name: "",
    full_legal_name: "",
    phone: "",
    email: "",
    dob: "",
  },
  address: { street: "", address2: "", city: "", state: "", postal_code: "" },
  occupation: "",
  primary_care_provider: {
    provider_name: "",
    clinic_name: "",
    may_contact: null,
  },
  medical_history: { diagnoses: [] },
  medications: "",
  allergies: "",
  lifestyle: { tobacco: null, alcohol: null },
  hormone_therapy: { used_before: null },
  symptoms: { physical: [], psychological: [], sexual: [] },
  visit: { primary_reason: "" },
  consents: {
    info_accurate: false,
    authorize_treatment: false,
    telemedicine: false,
    privacy_practices: false,
  },
  signature: { typed_name: "", signed_at: null },
};

const formatPhoneRaw = (raw: string): string => {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

const formatDobInput = (raw: string): string => {
  if (!raw) return "";
  const iso = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return `${iso[2]}/${iso[3]}/${iso[1]}`;
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(raw)) return raw;
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 8) {
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  }
  return raw;
};

interface IntakeStore extends IntakeState {
  currentStep: number;
  hasHydrated: boolean;
  setField: (path: string, value: unknown) => void;
  setMany: (updates: Array<{ path: string; value: unknown }>) => void;
  setStep: (n: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
  loadFromUrlParams: () => void;
  _markHydrated: () => void;
}

const setByPath = <T extends object>(obj: T, path: string, value: unknown): T => {
  const parts = path.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const root: any = { ...obj };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cursor: any = root;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    cursor[key] = Array.isArray(cursor[key]) ? [...cursor[key]] : { ...cursor[key] };
    cursor = cursor[key];
  }
  cursor[parts[parts.length - 1]] = value;
  return root;
};

export const useIntakeStore = create<IntakeStore>()(
  persist(
    (set, get) => ({
      ...initialIntake,
      currentStep: 1,
      hasHydrated: false,

      setField: (path, value) => {
        set((state) => {
          const next = setByPath(state, path, value);
          // Keep full_legal_name in sync when name parts change.
          if (path === "about_you.first_name" || path === "about_you.last_name") {
            const fn = (next as IntakeState).about_you.first_name.trim();
            const ln = (next as IntakeState).about_you.last_name.trim();
            (next as IntakeState).about_you.full_legal_name = [fn, ln]
              .filter(Boolean)
              .join(" ");
          }
          return next;
        });
      },

      setMany: (updates) => {
        set((state) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let next: any = state;
          for (const u of updates) next = setByPath(next, u.path, u.value);
          const fn = next.about_you.first_name.trim();
          const ln = next.about_you.last_name.trim();
          next.about_you.full_legal_name = [fn, ln].filter(Boolean).join(" ");
          return next;
        });
      },

      setStep: (n) => set({ currentStep: Math.max(1, Math.min(18, n)) }),

      nextStep: () =>
        set((s) => ({ currentStep: Math.min(18, s.currentStep + 1) })),

      prevStep: () =>
        set((s) => ({ currentStep: Math.max(1, s.currentStep - 1) })),

      resetForm: () =>
        set({
          ...initialIntake,
          currentStep: 1,
          hasHydrated: true,
        }),

      _markHydrated: () => set({ hasHydrated: true }),

      loadFromUrlParams: () => {
        if (typeof window === "undefined") return;
        const params = new URLSearchParams(window.location.search);
        if (params.toString().length === 0) return;

        const first = params.get("first_name") ?? "";
        const last = params.get("last_name") ?? "";
        const phoneRaw = params.get("phone") ?? "";
        const email = params.get("email") ?? "";
        const dobRaw = params.get("dob") ?? "";
        const contactId = params.get("contact_id");

        const current = get();
        const next = {
          about_you: { ...current.about_you },
          contact_id: current.contact_id,
        };

        if (first) next.about_you.first_name = first;
        if (last) next.about_you.last_name = last;
        if (first || last) {
          next.about_you.full_legal_name = [
            next.about_you.first_name,
            next.about_you.last_name,
          ]
            .filter(Boolean)
            .join(" ");
        }
        if (phoneRaw) next.about_you.phone = formatPhoneRaw(phoneRaw);
        if (email) next.about_you.email = email;
        if (dobRaw) next.about_you.dob = formatDobInput(dobRaw);
        if (contactId) next.contact_id = contactId;

        set((state) => ({ ...state, ...next }));

        // If identity fields are all present, jump past them to step 5 (Address).
        const a = get().about_you;
        const allFour =
          a.first_name.trim() &&
          a.last_name.trim() &&
          a.phone.trim() &&
          a.email.trim() &&
          a.dob.trim();
        if (allFour && get().currentStep < 5) {
          set({ currentStep: 5 });
        }
      },
    }),
    {
      name: "mwc_intake_v2",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => {
        const { currentStep: _cs, hasHydrated: _hh, ...rest } = state;
        return rest;
      },
      onRehydrateStorage: () => (state) => {
        state?._markHydrated();
      },
    }
  )
);

/** Check if the persisted store has any meaningful data (used by resume prompt). */
export const hasResumableData = (state: IntakeState): boolean => {
  const a = state.about_you;
  return Boolean(
    a.first_name.trim() ||
      a.last_name.trim() ||
      a.email.trim() ||
      a.phone.trim()
  );
};

/** Heuristic: estimate the last logically-completed step from the data. */
export const estimateResumeStep = (state: IntakeState): number => {
  let step = 1;
  const a = state.about_you;
  if (a.first_name && a.last_name) step = 2;
  if (a.phone) step = 3;
  if (a.email) step = 4;
  if (a.dob) step = 5;
  if (state.address.street && state.address.city && state.address.state && state.address.postal_code) step = 6;
  if (state.visit.primary_reason) step = 7;
  // Step 7 is informational; assume they'd resume there if they got that far.
  if (state.primary_care_provider.provider_name || state.primary_care_provider.clinic_name) step = 9;
  if (state.medical_history.diagnoses.length > 0) step = 10;
  if (state.hormone_therapy.used_before !== null) step = 11;
  if (state.medications) step = 12;
  if (state.allergies) step = 13;
  if (state.occupation) step = 14;
  if (state.lifestyle.tobacco && state.lifestyle.alcohol) step = 15;
  if (state.symptoms.physical.length > 0) step = 16;
  if (state.symptoms.psychological.length > 0) step = 17;
  if (state.symptoms.sexual.length > 0) step = 18;
  return Math.min(step, 18);
};
