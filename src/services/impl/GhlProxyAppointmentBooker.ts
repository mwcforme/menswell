import { bookAppointment, getFreeSlots, TIMEZONE } from "@/lib/ghlCalendars";
import type {
  AppointmentInput,
  AppointmentResult,
  DateRange,
  IAppointmentBooker,
} from "@/services/contracts/IAppointmentBooker";
import type { LocationKey } from "@/lib/ghlCalendars";

/**
 * Wraps the existing `ghlCalendars` helpers, which themselves route through
 * the `ghl-proxy` Supabase edge function. Returns availability bucketed by
 * ET calendar day to match the shape the existing GHLDayView consumes.
 */
export class GhlProxyAppointmentBooker implements IAppointmentBooker {
  async listAvailability(location: LocationKey, range: DateRange): Promise<Record<string, string[]>> {
    const raw = await getFreeSlots(location, range.start, range.end);
    if (!raw || typeof raw !== "object") return {};
    const out: Record<string, string[]> = {};
    for (const [key, value] of Object.entries(raw)) {
      if (value && typeof value === "object" && "slots" in (value as object)) {
        const slots = (value as { slots: string[] }).slots;
        if (Array.isArray(slots)) {
          // Re-bucket by ET day in case GHL key differs.
          for (const iso of slots) {
            const day = new Intl.DateTimeFormat("en-CA", {
              timeZone: TIMEZONE,
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }).format(new Date(iso));
            (out[day] ||= []).push(iso);
          }
        }
      }
    }
    return out;
  }

  async bookAppointment(input: AppointmentInput): Promise<AppointmentResult> {
    const res = await bookAppointment(input);
    return { ok: res.ok, status: res.status };
  }
}
