import { useMemo } from "react";
import { useIntakeStore } from "@/store/intakeStore";

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
const digits = (s: string) => s.replace(/\D/g, "");

const validateDob = (value: string): string => {
  if (!value) return "Date of birth is required";
  const m = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return "Use format MM/DD/YYYY";
  const month = +m[1];
  const day = +m[2];
  const year = +m[3];
  const now = new Date().getFullYear();
  if (month < 1 || month > 12) return "Invalid month";
  if (day < 1 || day > 31) return "Invalid day";
  if (year < 1920) return "Year must be 1920 or later";
  if (year > now - 18) return "You must be 18 or older";
  const test = new Date(year, month - 1, day);
  if (test.getFullYear() !== year || test.getMonth() !== month - 1 || test.getDate() !== day)
    return "Please enter a real date";
  return "";
};

export interface StepValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Per-step validation rules for the 18-step intake flow.
 * Components decide WHEN to display errors via useShowErrors().
 */
export const useStepValidation = (stepNumber: number): StepValidationResult => {
  const state = useIntakeStore();

  return useMemo<StepValidationResult>(() => {
    const errors: Record<string, string> = {};
    const a = state.about_you;
    const addr = state.address;
    const sig = state.signature;
    const consents = state.consents;

    switch (stepNumber) {
      case 1: {
        if (!a.first_name.trim()) errors["about_you.first_name"] = "Required";
        if (!a.last_name.trim()) errors["about_you.last_name"] = "Required";
        break;
      }

      case 2: {
        if (digits(a.phone).length !== 10)
          errors["about_you.phone"] = "Enter a 10-digit phone number";
        break;
      }

      case 3: {
        if (!isEmail(a.email)) errors["about_you.email"] = "Enter a valid email";
        break;
      }

      case 4: {
        const dobErr = validateDob(a.dob);
        if (dobErr) errors["about_you.dob"] = dobErr;
        break;
      }

      case 5: {
        if (!addr.street.trim()) errors["address.street"] = "Required";
        if (!addr.city.trim()) errors["address.city"] = "Required";
        if (!addr.state.trim()) errors["address.state"] = "Required";
        if (!addr.postal_code.trim()) errors["address.postal_code"] = "Required";
        else if (!/^\d{5}(-\d{4})?$/.test(addr.postal_code.trim()))
          errors["address.postal_code"] = "Enter a valid ZIP";
        break;
      }

      case 6: {
        if (!state.visit.primary_reason)
          errors["visit.primary_reason"] = "Choose one";
        break;
      }

      case 7:
        // Informational gate — no validation
        break;

      case 8:
        // PCP all optional
        break;

      case 9:
        // Diagnoses optional
        break;

      case 10: {
        if (state.hormone_therapy.used_before === null)
          errors["hormone_therapy.used_before"] = "Choose Yes or No";
        break;
      }

      case 11:
      case 12:
      case 13:
        // Medications, allergies, occupation — optional
        break;

      case 14: {
        if (!state.lifestyle.tobacco) errors["lifestyle.tobacco"] = "Choose one";
        if (!state.lifestyle.alcohol) errors["lifestyle.alcohol"] = "Choose one";
        break;
      }

      case 15:
      case 16:
      case 17:
        // Symptom checklists optional
        break;

      case 18: {
        if (!consents.info_accurate) errors["consents.info_accurate"] = "Required";
        if (!consents.authorize_treatment)
          errors["consents.authorize_treatment"] = "Required";
        if (!consents.telemedicine) errors["consents.telemedicine"] = "Required";
        if (!consents.privacy_practices)
          errors["consents.privacy_practices"] = "Required";

        const typed = sig.typed_name.trim().replace(/\s+/g, " ").toLowerCase();
        const expected = `${a.first_name} ${a.last_name}`
          .trim()
          .replace(/\s+/g, " ")
          .toLowerCase();
        if (!typed) errors["signature.typed_name"] = "Required";
        else if (typed !== expected)
          errors["signature.typed_name"] =
            "Please type your name exactly as entered at the start.";
        break;
      }
    }

    return { isValid: Object.keys(errors).length === 0, errors };
  }, [state, stepNumber]);
};
