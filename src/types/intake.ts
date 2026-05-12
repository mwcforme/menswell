export type YesNoUrgent = "yes" | "no" | "urgent_only" | null;
export type TobaccoUse = "yes" | "no" | "former" | null;
export type AlcoholUse = "yes" | "no" | "occasionally" | null;

export interface IntakeState {
  contact_id: string | null;
  submitted_at: string | null;
  intake_version: "v2";
  about_you: {
    first_name: string;
    last_name: string;
    /** Recombined for legacy payloads / e-signature comparison. */
    full_legal_name: string;
    phone: string;
    email: string;
    dob: string;
  };
  address: {
    street: string;
    address2: string;
    city: string;
    state: string;
    postal_code: string;
  };
  occupation: string;
  primary_care_provider: {
    provider_name: string;
    clinic_name: string;
    may_contact: YesNoUrgent;
  };
  medical_history: {
    diagnoses: string[];
  };
  medications: string;
  allergies: string;
  lifestyle: {
    tobacco: TobaccoUse;
    alcohol: AlcoholUse;
  };
  hormone_therapy: {
    used_before: boolean | null;
  };
  symptoms: {
    physical: string[];
    psychological: string[];
    sexual: string[];
  };
  visit: {
    primary_reason: string;
  };
  consents: {
    info_accurate: boolean;
    authorize_treatment: boolean;
    telemedicine: boolean;
    privacy_practices: boolean;
  };
  signature: {
    typed_name: string;
    signed_at: string | null;
  };
}

export const TOTAL_STEPS = 18;

/**
 * Map a step (1–18) to a phase index (1-based).
 * 0 = none, 1 About You, 2 Your Visit, 3 Health History, 4 Symptoms, 5 Sign & Submit.
 */
export const phaseForStep = (step: number): number => {
  if (step <= 0) return 0;
  if (step <= 5) return 1;
  if (step <= 7) return 2;
  if (step <= 14) return 3;
  if (step <= 17) return 4;
  return 5;
};

export interface StepProps {
  onNext: () => void;
  onBack: () => void;
}
