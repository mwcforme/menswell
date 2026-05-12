import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export type UrgencyTier = "early" | "building" | "overdue" | "long_overdue";

export interface BookingState {
  name?: string;
  phone?: string;
  email?: string;
  location?: string;       // "richmond" | "newport-news" | "virginia-beach"
  service?: string;        // "trt" | "ed" | "weight-loss" | ...
  source?: string;
  symptom?: string;        // "energy" | "sexual" | "weight" | "other"
  duration?: string;       // "lt6mo" | "6to12mo" | "1to2yr" | "gt2yr"
  urgencyTier?: UrgencyTier;
  note?: string;
  appointmentTime?: string;
}

const KEY = "mwc_booking_state_v1";
const FIELDS: (keyof BookingState)[] = [
  "name", "phone", "email", "location", "service", "source",
  "symptom", "duration", "urgencyTier", "note", "appointmentTime",
];

// Back-compat: legacy "libido" → "sexual"
const normalizeSymptom = (v?: string) => (v === "libido" ? "sexual" : v);

const readSession = (): BookingState => {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as BookingState) : {};
  } catch {
    return {};
  }
};

const writeSession = (state: BookingState) => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
};

export const getBookingState = (): BookingState => readSession();

export const updateBookingState = (patch: Partial<BookingState>): BookingState => {
  const next = { ...readSession(), ...patch };
  // strip empty strings/undefined
  Object.keys(next).forEach((k) => {
    const v = next[k as keyof BookingState];
    if (v === "" || v === undefined || v === null) delete next[k as keyof BookingState];
  });
  writeSession(next);
  return next;
};

export const clearBookingState = () => {
  if (typeof window === "undefined") return;
  try { sessionStorage.removeItem(KEY); } catch { /* ignore */ }
};

/** Build a URLSearchParams string carrying the full booking state forward. */
export const toQueryString = (state: BookingState, extra?: Partial<BookingState>): string => {
  const merged = { ...state, ...extra };
  const sp = new URLSearchParams();
  FIELDS.forEach((f) => {
    const v = merged[f];
    if (v) sp.set(f, String(v));
  });
  return sp.toString();
};

const LABELS = {
  location: {
    richmond: "Richmond",
    "newport-news": "Newport News",
    "virginia-beach": "Virginia Beach",
  } as Record<string, string>,
  symptom: {
    energy: "Low Energy / Fatigue",
    sexual: "Sexual Health Concerns",
    libido: "Sexual Health Concerns",
    weight: "Weight Gain / Difficulty Losing Weight",
    other: "Something else",
  } as Record<string, string>,
  duration: {
    lt6mo: "Less than 6 months",
    "6to12mo": "6 to 12 months",
    "1to2yr": "1 to 2 years",
    gt2yr: "More than 2 years",
  } as Record<string, string>,
};

export const labelFor = (field: "location" | "symptom" | "duration", value?: string) =>
  value ? LABELS[field][value] || value : "";

/**
 * Hook that hydrates state from URL params on mount (URL wins over session for
 * the fields it specifies), persists to sessionStorage, and returns the merged
 * state. Use this on every booking funnel page.
 */
export const useBookingSync = (): BookingState => {
  const [params] = useSearchParams();

  const fromUrl = useMemo(() => {
    const out: Record<string, string> = {};
    FIELDS.forEach((f) => {
      const v = params.get(f);
      if (v) out[f] = f === "symptom" ? (normalizeSymptom(v) as string) : v;
    });
    return out as Partial<BookingState>;
  }, [params]);

  useEffect(() => {
    if (Object.keys(fromUrl).length > 0) {
      updateBookingState(fromUrl);
    }
  }, [fromUrl]);

  return { ...readSession(), ...fromUrl };
};
