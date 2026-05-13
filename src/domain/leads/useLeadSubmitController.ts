import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import type { ZodSchema } from "zod";
import { useServices } from "@/app/providers/ServicesProvider";
import { updateBookingState } from "@/lib/bookingState";
import { getAttribution, attributionTags } from "@/lib/attribution";
import { trackConversion } from "@/lib/capi";
import { supabase } from "@/integrations/supabase/client";
import type { LeadInput, LeadResult } from "@/services/contracts/ILeadSubmitter";

export type LeadSubmitStatus = "idle" | "submitting" | "success" | "error";

export interface LeadSubmitOptions<TInput> {
  /** Zod schema used to validate raw input before submission. */
  schema: ZodSchema<TInput>;
  /** Maps validated input to the CRM payload shape. */
  toLeadInput: (input: TInput) => LeadInput;
  /** Default lead source string. */
  source?: string;
  /** Default tags applied to every submission. */
  tags?: string[];
  /** Called after a successful submission. */
  onSuccess?: (result: LeadResult, input: TInput) => void | Promise<void>;
  /** Optional path to navigate to after success. */
  navigateTo?: string;
  /** Whether to surface errors as a sonner toast. Defaults to true. */
  toastOnError?: boolean;
  /**
   * If true (default), captured fields are persisted to the shared
   * `bookingState` sessionStorage so downstream funnel steps can hydrate.
   */
  persistToBookingState?: boolean;
}

export interface LeadSubmitController<TInput> {
  status: LeadSubmitStatus;
  error: string | null;
  fieldErrors: Record<string, string>;
  submit: (raw: unknown) => Promise<LeadResult | null>;
  reset: () => void;
  isSubmitting: boolean;
}

/**
 * Single source of truth for lead-form submission UX.
 * Validates → calls `useServices().leads.submitLead` → manages loading,
 * success, and error state with a consistent toast + inline-error contract.
 */
export function useLeadSubmitController<TInput>(
  opts: LeadSubmitOptions<TInput>,
): LeadSubmitController<TInput> {
  const { leads, nav } = useServices();
  const [status, setStatus] = useState<LeadSubmitStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const inFlight = useRef(false);

  const reset = useCallback(() => {
    setStatus("idle");
    setError(null);
    setFieldErrors({});
  }, []);

  const submit = useCallback(
    async (raw: unknown): Promise<LeadResult | null> => {
      if (inFlight.current) return null;

      const parsed = opts.schema.safeParse(raw);
      if (!parsed.success) {
        const fe: Record<string, string> = {};
        for (const issue of parsed.error.issues) {
          const key = issue.path[0];
          if (typeof key === "string" && !fe[key]) fe[key] = issue.message;
        }
        setFieldErrors(fe);
        setStatus("error");
        setError("Please fix the highlighted fields.");
        return null;
      }

      setFieldErrors({});
      setError(null);
      setStatus("submitting");
      inFlight.current = true;

      const validated = parsed.data;
      const base = opts.toLeadInput(validated);
      const attr = getAttribution();

      // Hidden attribution fields override the visible First/Last Name when
      // present (e.g. CRM-pre-filled URL or cookie from a prior visit).
      const leadInput: LeadInput = {
        ...base,
        ...(attr.first_name ? { firstName: attr.first_name } : {}),
        ...(attr.last_name ? { lastName: attr.last_name } : (base.lastName ? { lastName: base.lastName } : {})),
        source: opts.source ?? base.source ?? "lead-form",
        tags: [...(opts.tags ?? []), ...(base.tags ?? []), ...attributionTags(attr)],
      };

      // ---- Persist raw capture FIRST (zero data loss if CRM fails) ----
      const v = validated as Record<string, unknown>;
      const captureRow = {
        name: typeof v.name === "string" ? v.name : null,
        phone: typeof v.phone === "string" ? v.phone : (leadInput.phone ?? null),
        email: typeof v.email === "string" ? v.email : (leadInput.email ?? null),
        location: typeof v.location === "string" ? v.location : null,
        service: typeof v.service === "string" ? v.service : null,
        source: leadInput.source ?? null,
        page_url: typeof window !== "undefined" ? window.location.href : null,
        tags: leadInput.tags ?? null,
        attribution: attr as unknown as Record<string, unknown>,
        crm_status: "pending",
      };
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await supabase.from("lead_captures").insert(captureRow as any);
      } catch (persistErr) {
        // Never block submission on capture failure — log only.
        console.warn("[lead-capture] insert failed", persistErr);
      }

      try {
        const result = await leads.submitLead(leadInput);

        if (opts.persistToBookingState !== false) {
          updateBookingState({
            ...(typeof v.name === "string" ? { name: v.name } : {}),
            ...(typeof v.phone === "string" ? { phone: v.phone } : {}),
            ...(typeof v.email === "string" ? { email: v.email } : {}),
            ...(typeof v.location === "string" ? { location: v.location } : {}),
            source: leadInput.source,
          });
        }

        setStatus("success");

        const fullName = typeof v.name === "string" ? v.name.trim() : "";
        const [firstName, ...rest] = fullName.split(/\s+/);
        void trackConversion("Lead", {
          user_data: {
            email: typeof v.email === "string" ? v.email : undefined,
            phone: typeof v.phone === "string" ? v.phone : undefined,
            first_name: attr.first_name || firstName || undefined,
            last_name: attr.last_name || (rest.length ? rest.join(" ") : undefined),
            state: typeof v.location === "string" ? "VA" : undefined,
            external_id: result.contactId,
          },
          custom_data: {
            content_name: leadInput.source,
            lp_slug: typeof window !== "undefined" ? window.location.pathname : undefined,
          },
        });

        await opts.onSuccess?.(result, validated);
        if (opts.navigateTo) nav.go(opts.navigateTo);
        return result;
      } catch (e) {
        const msg = (e as Error).message || "Something went wrong. Please try again.";
        setError(msg);
        setStatus("error");
        if (opts.toastOnError !== false) toast.error(msg);
        return null;
      } finally {
        inFlight.current = false;
      }
    },
    [leads, nav, opts],
  );

  return {
    status,
    error,
    fieldErrors,
    submit,
    reset,
    isSubmitting: status === "submitting",
  };
}
