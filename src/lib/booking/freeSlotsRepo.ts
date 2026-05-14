/**
 * Single source of truth for reading cached GHL free-slots from Supabase.
 * This is the data-access layer for the booking UI — components should
 * import from here rather than calling supabase directly.
 *
 * banned-wording-allow-next-line — `ghl_free_slots` is the table name.
 */
import { TIMEZONE } from "@/lib/ghlCalendars";
import { supabase } from "@/integrations/supabase/client";

/**
 * Fetch all cached free slots for `calendarId` between `[start, end)` and
 * bucket them by ET calendar day (YYYY-MM-DD).
 *
 * Throws on Supabase error so callers can surface a single error message
 * to the UI without inspecting a wrapper object.
 */
export const fetchCachedSlots = async (
  calendarId: string,
  start: Date,
  end: Date,
): Promise<Record<string, string[]>> => {
  const { data, error } = await supabase
    .from("ghl_free_slots")
    .select("slot_start")
    .eq("calendar_id", calendarId)
    .gte("slot_start", start.toISOString())
    .lt("slot_start", end.toISOString())
    .order("slot_start", { ascending: true })
    .limit(1000);
  if (error) throw new Error(error.message);

  const out: Record<string, string[]> = {};
  for (const row of data || []) {
    const iso = row.slot_start as string;
    const key = new Intl.DateTimeFormat("en-CA", {
      timeZone: TIMEZONE, year: "numeric", month: "2-digit", day: "2-digit",
    }).format(new Date(iso));
    (out[key] ||= []).push(iso);
  }
  return out;
};
