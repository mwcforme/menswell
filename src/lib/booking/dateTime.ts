/**
 * Pure date/time utilities for the booking funnel.
 * All functions are timezone-aware (America/New_York) and side-effect free.
 *
 * Extracted from GHLDayView/GHLAccordionView so both views share one
 * canonical implementation. Do not couple this module to React or Supabase.
 */
import { TIMEZONE } from "@/lib/ghlCalendars";

/** Local-calendar YYYY-MM-DD (no timezone shift). Used as a stable map key. */
export const ymd = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** "MON", "TUE", etc. in ET. */
export const fmtDayShort = (d: Date): string =>
  d.toLocaleDateString("en-US", { weekday: "short", timeZone: TIMEZONE }).toUpperCase();

/** "MAY 14" style label in ET. */
export const fmtMonthDay = (d: Date): string =>
  d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: TIMEZONE }).toUpperCase();

/** "Wednesday, May 14" — long form for accessible labels and modals. */
export const fmtFullDay = (d: Date): string =>
  d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: TIMEZONE });

/** Split an ISO instant into ET wall-clock parts: { time: "8:30", ampm: "AM" }. */
export const fmtTimeParts = (iso: string): { time: string; ampm: string } => {
  const s = new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit", hour12: true, timeZone: TIMEZONE,
  });
  const [time, ampm] = s.split(" ");
  return { time, ampm };
};

/** Today in ET as YYYY-MM-DD. Anchors all "is today" comparisons. */
export const todayET = (): string =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE, year: "numeric", month: "2-digit", day: "2-digit",
  }).format(new Date());

export const isTodayET = (day: Date): boolean => todayET() === ymd(day);

export const isTomorrowET = (day: Date): boolean => {
  const t = new Date();
  t.setDate(t.getDate() + 1);
  const tom = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE, year: "numeric", month: "2-digit", day: "2-digit",
  }).format(t);
  return tom === ymd(day);
};

/** Build a local-midnight Date for a YYYY-MM-DD string. */
export const dateFromEtYmd = (s: string): Date => {
  const [y, m, d] = s.split("-").map((n) => parseInt(n, 10));
  const local = new Date(y, m - 1, d);
  local.setHours(0, 0, 0, 0);
  return local;
};

/** Drop slots that are already in the past (only relevant for today). */
export const dropPastSlots = (day: Date, slots: string[]): string[] => {
  if (!isTodayET(day)) return slots;
  const cutoffMs = Date.now();
  return slots.filter((iso) => new Date(iso).getTime() > cutoffMs);
};
