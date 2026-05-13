import { useCallback, useEffect, useRef, useState } from "react";
import { useServices } from "@/app/providers/ServicesProvider";
import { useLeadSubmitController } from "@/domain/leads/useLeadSubmitController";
import { confirmLeadSchema, type ConfirmLeadInput } from "@/domain/leads/leadFormSchema";
import type { LocationKey } from "@/lib/ghlCalendars";
import { trackConversion } from "@/lib/capi";

export interface ConfirmInput {
  slotIso: string;
  location: LocationKey;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  notes?: string;
  source?: string;
}

export type ConfirmStatus = "idle" | "submitting" | "success" | "error";

export interface RedirectState {
  /** Where the user is being sent. */
  url: string;
  /** Total countdown duration in ms. */
  totalMs: number;
  /** Remaining ms (ticks every ~100ms). */
  remainingMs: number;
}

export interface ConfirmAppointmentController {
  status: ConfirmStatus;
  error: string | null;
  isSubmitting: boolean;
  /** Non-null when an automatic redirect is pending after an unrecoverable error. */
  redirect: RedirectState | null;
  confirm: (input: ConfirmInput) => Promise<boolean>;
  /** Cancel a pending redirect (e.g. when the user dismisses the modal). */
  cancelRedirect: () => void;
  reset: () => void;
}

const FAILED_INTENT_KEY = "mwc_booking_failed_intent_v1";

/**
 * Composes lead submission + appointment booking for the booking modal.
 * Mirrors the existing GHLDayView `handleFinalConfirm` behavior:
 *  - upsert contact via `useLeadSubmitController` (no toast, inline error)
 *  - book appointment via `useServices().booking`
 *  - on slot-taken: persist failed-intent and redirect to /book/lets-talk
 */
export function useConfirmAppointment(opts?: {
  onBooked?: (slotIso: string) => void;
}): ConfirmAppointmentController {
  const { booking } = useServices();
  const [status, setStatus] = useState<ConfirmStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const lead = useLeadSubmitController<ConfirmLeadInput>({
    schema: confirmLeadSchema,
    toLeadInput: (v) => ({ firstName: v.name || "Guest", email: v.email, phone: v.phone }),
    toastOnError: false,
    persistToBookingState: false,
  });

  const [redirect, setRedirect] = useState<RedirectState | null>(null);
  const tickRef = useRef<number | null>(null);
  const navTimerRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (tickRef.current !== null) {
      window.clearInterval(tickRef.current);
      tickRef.current = null;
    }
    if (navTimerRef.current !== null) {
      window.clearTimeout(navTimerRef.current);
      navTimerRef.current = null;
    }
  }, []);

  const cancelRedirect = useCallback(() => {
    clearTimers();
    setRedirect(null);
  }, [clearTimers]);

  // Cleanup on unmount.
  useEffect(() => () => clearTimers(), [clearTimers]);

  const scheduleRedirect = useCallback(
    (url: string, totalMs: number) => {
      clearTimers();
      const start = Date.now();
      setRedirect({ url, totalMs, remainingMs: totalMs });
      tickRef.current = window.setInterval(() => {
        const elapsed = Date.now() - start;
        const remainingMs = Math.max(0, totalMs - elapsed);
        setRedirect({ url, totalMs, remainingMs });
        if (remainingMs <= 0 && tickRef.current !== null) {
          window.clearInterval(tickRef.current);
          tickRef.current = null;
        }
      }, 100);
      navTimerRef.current = window.setTimeout(() => {
        window.location.href = url;
      }, totalMs);
    },
    [clearTimers],
  );

  const reset = useCallback(() => {
    clearTimers();
    setRedirect(null);
    setStatus("idle");
    setError(null);
    lead.reset();
  }, [clearTimers, lead]);

  const confirm = useCallback(
    async (input: ConfirmInput): Promise<boolean> => {
      if (status === "submitting") return false;
      cancelRedirect();
      setStatus("submitting");
      setError(null);

      // Step 1: upsert contact.
      const result = await lead.submit({
        ...(input.firstName ? { name: input.firstName } : {}),
        ...(input.email ? { email: input.email } : {}),
        ...(input.phone ? { phone: input.phone } : {}),
      } satisfies ConfirmLeadInput);

      // The controller may have skipped submission (validation only); fall back
      // to a direct call when no validated payload was produced but the caller
      // gave us at least a name to upsert under.
      let contactId = result?.contactId ?? null;
      if (!contactId) {
        const { GhlProxyLeadSubmitter } = await import(
          "@/services/impl/GhlProxyLeadSubmitter"
        );
        try {
          const r = await new GhlProxyLeadSubmitter().submitLead({
            firstName: input.firstName || "Guest",
            lastName: input.lastName || undefined,
            email: input.email || undefined,
            phone: input.phone || undefined,
            source: input.source || "mwc-book-funnel",
          });
          contactId = r.contactId;
        } catch (e) {
          const msg = (e as Error).message || "Booking failed. Please try another time.";
          setError(msg);
          setStatus("error");
          return false;
        }
      }

      // Step 2: book the appointment.
      try {
        await booking.bookAppointment({
          location: input.location,
          contactId,
          startTime: input.slotIso,
          notes: input.notes,
        });
        setStatus("success");
        void trackConversion("Schedule", {
          user_data: {
            email: input.email,
            phone: input.phone,
            first_name: input.firstName,
            last_name: input.lastName,
            state: "VA",
            external_id: contactId,
          },
          custom_data: {
            content_name: `book-${input.location}`,
            content_category: "appointment",
          },
        });
        opts?.onBooked?.(input.slotIso);
        return true;
      } catch (bookErr) {
        // Slot likely taken between render and confirm. Persist intent and bounce.
        try {
          sessionStorage.setItem(
            FAILED_INTENT_KEY,
            JSON.stringify({
              contactId,
              location: input.location,
              startTime: input.slotIso,
              firstName: input.firstName,
              lastName: input.lastName,
              email: input.email,
              phone: input.phone,
              failedAt: new Date().toISOString(),
              error: (bookErr as Error).message,
            }),
          );
        } catch {
          /* ignore */
        }
        setError(
          "That time was just taken. We'll have a coordinator call you to confirm another slot.",
        );
        setStatus("error");
        scheduleRedirect("/book/lets-talk", 4000);
        return false;
      }
    },
    [booking, cancelRedirect, lead, opts, scheduleRedirect, status],
  );

  return {
    status,
    error,
    redirect,
    isSubmitting: status === "submitting",
    confirm,
    cancelRedirect,
    reset,
  };
}

