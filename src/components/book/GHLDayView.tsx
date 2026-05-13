import { useEffect, useMemo, useRef, useState } from "react";
import { Loader2, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  CENTER_CALENDARS,
  TIMEZONE,
  type LocationKey,
} from "@/lib/ghlCalendars";
import { supabase } from "@/integrations/supabase/client";
import { useConfirmAppointment } from "@/domain/booking/useConfirmAppointment";

// banned-wording-allow-next-line — GHL API table/endpoint name
// Read free slots from the cached `ghl_free_slots` table (synced hourly from GHL).
const fetchCachedSlots = async (
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
    // Bucket by ET calendar day
    const key = new Intl.DateTimeFormat("en-CA", {
      timeZone: TIMEZONE, year: "numeric", month: "2-digit", day: "2-digit",
    }).format(new Date(iso));
    (out[key] ||= []).push(iso);
  }
  return out;
};

interface Props {
  location: LocationKey;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  notes?: string;
  source?: string;
  onBooked?: (slotIso: string) => void;
}

// Brand tokens (light surface, navy ink, orange accent).
// Two border tokens:
//   LINE   — decorative dividers (header/section underlines, badge dots). Not WCAG 1.4.11 scope.
//   BORDER — interactive component outlines (buttons, day pills, time slots). ≥3:1 vs SURFACE/CANVAS.
const INK = "#0B1029";
const INK_SOFT = "#2C3346";
const MUTED = "#4B5563";
const LINE = "#E5E7EB";
const BORDER = "#8B92A0";
const SURFACE = "#FFFFFF";
const CANVAS = "#F7F8FB";
const ORANGE = "#E8670A";
const ORANGE_DEEP = "#C2410C"; // selected time-slot bg only — preserves AA for small AM/PM text
const ORANGE_SOFT = "#FFF1E6";

// Business hours
const HOUR_MIN = 8;   // 8 AM ET
const HOUR_MAX = 18;  // exclusive — last slot is 5 PM (17:00)

const ymd = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const startOfWeek = (d: Date) => {
  const x = new Date(d);
  x.setDate(x.getDate() - x.getDay()); // Sunday
  x.setHours(0, 0, 0, 0);
  return x;
};

const fmtDayShort = (d: Date) =>
  d.toLocaleDateString("en-US", { weekday: "short", timeZone: TIMEZONE }).toUpperCase();
const fmtMonthDay = (d: Date) =>
  d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: TIMEZONE }).toUpperCase();
const fmtWeekRange = (start: Date) => {
  const end = new Date(start); end.setDate(end.getDate() + 4);
  const s = start.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const e = end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  return `${s} – ${e}`;
};
const fmtTimeParts = (iso: string) => {
  const s = new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit", hour12: true, timeZone: TIMEZONE,
  });
  const [time, ampm] = s.split(" ");
  return { time, ampm };
};
const fmtFullDay = (d: Date) =>
  d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: TIMEZONE });

// Returns the UTC offset (in minutes) of America/New_York for the given UTC instant.
// e.g. -240 during EDT, -300 during EST. Browser-independent (uses numeric parts only).
const etOffsetMinutes = (instant: Date): number => {
  const get = (parts: Intl.DateTimeFormatPart[], type: string) =>
    parseInt(parts.find((p) => p.type === type)!.value, 10);
  const fmt = (tz: string) =>
    new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", hour12: false,
    }).formatToParts(instant);
  const u = fmt("UTC");
  const e = fmt(TIMEZONE);
  const utcMs = Date.UTC(
    get(u, "year"), get(u, "month") - 1, get(u, "day"),
    get(u, "hour") % 24, get(u, "minute"),
  );
  const etMs = Date.UTC(
    get(e, "year"), get(e, "month") - 1, get(e, "day"),
    get(e, "hour") % 24, get(e, "minute"),
  );
  return Math.round((etMs - utcMs) / 60000);
};

// Build a Date for the given ET wall-clock time (YYYY-MM-DD + hour, minute=0).
// Uses ET's offset on that calendar date so display is always 8 AM..5 PM ET.
const etWallToDate = (ymdStr: string, hour: number): Date => {
  const [y, m, d] = ymdStr.split("-").map((n) => parseInt(n, 10));
  // Probe at noon UTC on that date to get a stable ET offset (avoids DST edge ambiguity).
  const probe = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  const offsetMin = etOffsetMinutes(probe); // e.g. -240
  // ET wall hour H corresponds to UTC = H - offsetMin (in minutes).
  const utcMs = Date.UTC(y, m - 1, d, hour, 0, 0) - offsetMin * 60_000;
  return new Date(utcMs);
};

// Current hour in America/New_York (0-23).
const etHourNow = (): number => {
  const s = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE, hour: "numeric", hour12: false,
  }).format(new Date());
  const n = parseInt(s, 10);
  return n === 24 ? 0 : n;
};

// Is the local-midnight day "today" in ET?
const isTodayET = (day: Date): boolean => {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE, year: "numeric", month: "2-digit", day: "2-digit",
  }).format(new Date()); // "YYYY-MM-DD"
  return today === ymd(day);
};

// banned-wording-allow-next-line — GHL API endpoint name
// Parse the GHL free-slots payload into a per-day map of ISO start times.
// GHL returns shape: { "YYYY-MM-DD": { slots: [iso, iso, ...] }, traceId?: ... }
const parseFreeSlots = (raw: unknown): Record<string, string[]> => {
  const out: Record<string, string[]> = {};
  if (!raw || typeof raw !== "object") return out;
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(k)) continue;
    const slots = (v as { slots?: unknown })?.slots;
    if (Array.isArray(slots)) {
      out[k] = slots.filter((s): s is string => typeof s === "string");
    }
  }
  return out;
};

// Filter out slots that are already in the past (relative to current ET hour on today).
const dropPastSlots = (day: Date, slots: string[]): string[] => {
  if (!isTodayET(day)) return slots;
  const cutoffMs = Date.now();
  return slots.filter((iso) => new Date(iso).getTime() > cutoffMs);
};


const GHLDayView = ({ location, firstName, lastName, email, phone, notes, source, onBooked }: Props) => {
  const today = useMemo(() => { const t = new Date(); t.setHours(0, 0, 0, 0); return t; }, []);
  // Rolling 7-day window starting today (not week-aligned) so we always show
  // a full week of upcoming availability instead of just the remainder.
  const [weekStart, setWeekStart] = useState<Date>(() => {
    const t = new Date(); t.setHours(0, 0, 0, 0); return t;
  });
  const [slotsByDay, setSlotsByDay] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const confirmCtl = useConfirmAppointment({ onBooked: (slot) => onBooked?.(slot) });
  const submitting = confirmCtl.isSubmitting;
  const submitError = confirmCtl.error;
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const lastUpdatedRef = useRef<Date | null>(null);
  const [lastReason, setLastReason] = useState<"initial" | "timer" | "focus" | "manual">("initial");
  const [nowTick, setNowTick] = useState<number>(Date.now());

  // Tick every 15s so the "X seconds ago" label stays fresh
  useEffect(() => {
    const t = window.setInterval(() => setNowTick(Date.now()), 15_000);
    return () => window.clearInterval(t);
  }, []);

  const cal = CENTER_CALENDARS[location];

  // Only future days (today + later) within the visible week
  const days = useMemo(() => {
    return Array.from({ length: 5 })
      .map((_, i) => { const d = new Date(weekStart); d.setDate(weekStart.getDate() + i); return d; })
      .filter((d) => d >= today);
  }, [weekStart, today]);

  const [refreshNonce, setRefreshNonce] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const start = new Date(weekStart);
    if (start < today) start.setTime(today.getTime());
    const end = new Date(weekStart);
    end.setDate(end.getDate() + 5); end.setHours(0, 0, 0, 0);

    const load = (reason: "initial" | "timer" | "focus" | "manual") => {
      const isInitial = reason === "initial";
      if (isInitial) {
        setLoading(true); setLoadError(null); setSlotsByDay({}); setSelectedSlot(null);
      }
      return fetchCachedSlots(cal.calendarId, start, end)
        .then((parsed) => {
          if (cancelled) return;
          const out: Record<string, string[]> = {};
          days.forEach((d) => {
            const key = ymd(d);
            const slots = dropPastSlots(d, parsed[key] || []);
            if (slots.length > 0) out[key] = slots;
          });
          setSlotsByDay(out);
          const now = new Date();
          setLastUpdated(now);
          lastUpdatedRef.current = now;
          setLastReason(reason);
          setNowTick(Date.now());
          if (isInitial) {
            const firstWith = days.find((d) => out[ymd(d)]?.length);
            setSelectedDay(firstWith ? ymd(firstWith) : null);
          } else if (selectedDay && !out[selectedDay]) {
            // selected day no longer has slots after refresh — fall back gracefully
            const firstWith = days.find((d) => out[ymd(d)]?.length);
            setSelectedDay(firstWith ? ymd(firstWith) : null);
            setSelectedSlot(null);
          } else if (selectedSlot && selectedDay && !out[selectedDay]?.includes(selectedSlot)) {
            // selected slot got booked by someone else — drop it
            setSelectedSlot(null);
          }
        })
        .catch((e: Error) => { if (!cancelled && isInitial) setLoadError(e.message || "Could not load times."); })
        .finally(() => { if (!cancelled && isInitial) setLoading(false); });
    };


    load(refreshNonce > 0 ? "manual" : "initial");
    // Auto-refresh every 30 min. On tab focus, only refresh if data is >5 min old.
    const interval = window.setInterval(() => load("timer"), 30 * 60 * 1000);
    const onFocus = () => {
      // Read freshest lastUpdated from closure-safe ref via state setter pattern
      // (acceptable here: at worst we refresh once when not strictly needed)
      const last = lastUpdatedRef.current;
      if (!last || Date.now() - last.getTime() > 5 * 60 * 1000) load("focus");
    };
    window.addEventListener("focus", onFocus);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weekStart, location, refreshNonce]);

  const times = selectedDay ? slotsByDay[selectedDay] || [] : [];
  const canConfirm = Boolean(selectedSlot);
  const prevDisabled = weekStart <= today;

  const handleFinalConfirm = async () => {
    if (!selectedSlot) return;
    const ok = await confirmCtl.confirm({
      slotIso: selectedSlot,
      location,
      firstName,
      lastName,
      email,
      phone,
      notes,
      source,
    });
    if (ok) setModalOpen(false);
  };

  const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();

  return (
    <>
      <div
        style={{
          background: SURFACE,
          border: `1px solid ${LINE}`,
          borderRadius: 16,
          overflow: "hidden",
          color: INK,
          fontFamily: "Inter, system-ui, sans-serif",
          boxShadow: "0 1px 2px rgba(11,16,41,0.04), 0 24px 48px -24px rgba(11,16,41,0.18)",
        }}
      >
        {/* HEADER */}
        <div
          className="px-5 md:px-7 pt-6 md:pt-8 pb-5"
          style={{ borderBottom: `1px solid ${LINE}`, background: SURFACE }}
        >
          <div style={{ fontFamily: "Oswald, Inter, sans-serif", fontWeight: 700, letterSpacing: "0.01em", fontSize: "clamp(22px, 3vw, 30px)", lineHeight: 1.1, color: INK }}>
            {cal.label} clinic
          </div>
        </div>

        {/* WEEK NAV */}
        <div className="px-5 md:px-7 pt-5 flex items-center justify-between gap-3">
          <button
            type="button"
            disabled={prevDisabled}
            onClick={() => { const w = new Date(weekStart); w.setDate(w.getDate() - 5); setWeekStart(w); }}
            aria-label="Previous week"
            style={{
              background: SURFACE, color: INK, border: `1px solid ${BORDER}`,
              borderRadius: 999, padding: "8px 12px",
              fontSize: 13, fontWeight: 600,
              display: "inline-flex", alignItems: "center", gap: 6,
              cursor: prevDisabled ? "not-allowed" : "pointer",
              opacity: prevDisabled ? 0.6 : 1,
            }}
          >
            <ChevronLeft size={16} /> Prev
          </button>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", color: INK_SOFT }}>
            {fmtWeekRange(weekStart)}
          </div>
          <button
            type="button"
            onClick={() => { const w = new Date(weekStart); w.setDate(w.getDate() + 5); setWeekStart(w); }}
            aria-label="Next week"
            style={{
              background: SURFACE, color: INK, border: `1px solid ${BORDER}`,
              borderRadius: 999, padding: "8px 12px",
              fontSize: 13, fontWeight: 600,
              display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer",
            }}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>

        {/* DAY PILLS */}
        <div className="px-5 md:px-7 py-5" style={{ position: "relative" }}>
          {loading && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.7)", zIndex: 1 }}>
              <Loader2 size={22} className="animate-spin" color={INK} />
            </div>
          )}
          {days.length === 0 ? (
            <div style={{ color: MUTED, fontSize: 14, fontStyle: "italic", padding: "12px 4px" }}>
              No remaining days this week. Tap Next.
            </div>
          ) : (
            <div
              className="grid grid-cols-4 md:grid-cols-7"
              style={{ gap: 8 }}
            >
              {days.map((d) => {
                const key = ymd(d);
                const actualCount = slotsByDay[key]?.length || 0;
                const count = actualCount;
                const isSunday = d.getDay() === 0;
                const available = actualCount > 0 && !isSunday;
                const selected = selectedDay === key;
                const isToday = ymd(today) === key;
                const badgeText = !loading
                  ? isSunday
                    ? "CLOSED"
                    : available
                      ? `${count} OPEN`
                      : "FULL"
                  : "···";
                return (
                  <button
                    key={key}
                    type="button"
                    disabled={isSunday || !available}
                    aria-pressed={selected}
                    aria-label={`${fmtFullDay(d)} — ${isSunday ? "Closed on Sundays" : `${count} times available`}`}
                    onClick={isSunday ? undefined : () => { setSelectedDay(key); setSelectedSlot(null); }}
                    style={{
                      background: selected ? INK : SURFACE,
                      border: `1.5px solid ${selected ? INK : BORDER}`,
                      borderRadius: 12, padding: "12px 6px",
                      color: selected ? "#FFFFFF" : INK,
                      cursor: isSunday || !available ? "default" : "pointer",
                      textAlign: "center",
                      transition: "background 120ms ease, transform 120ms ease, box-shadow 120ms ease",
                      position: "relative",
                      boxShadow: selected
                        ? "0 8px 18px -10px rgba(11,16,41,0.45)"
                        : available
                          ? "0 1px 0 rgba(11,16,41,0.03)"
                          : "inset 0 0 0 9999px rgba(11,16,41,0.015)",
                      opacity: available || selected ? 1 : 0.85,
                    }}
                  >
                    <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", color: selected ? "rgba(255,255,255,0.85)" : INK_SOFT, marginBottom: 4 }}>
                      {isToday ? "TODAY" : fmtDayShort(d)}
                    </div>
                    <div style={{ fontFamily: "Oswald, Inter, sans-serif", fontWeight: 700, fontSize: 17, letterSpacing: "0.02em", textDecoration: !available && !loading ? "line-through" : "none", textDecorationColor: "#9CA3AF" }}>
                      {fmtMonthDay(d)}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        color: selected
                          ? "#FFFFFF"
                          : available
                            ? count >= 3 ? "#0B6B33" : "#991B1B"
                            : isSunday ? "#4B5563" : "#4B5563",
                        background: selected
                          ? "rgba(255,255,255,0.18)"
                          : available
                            ? count >= 3 ? "#DCF5E5" : "#FDE2E2"
                            : isSunday ? "#E5E7EB" : "#E5E7EB",
                        marginTop: 6,
                        letterSpacing: "0.06em",
                        padding: "3px 7px",
                        borderRadius: 999,
                        display: "inline-block",
                      }}
                    >
                      {badgeText}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
          {loadError && (
            <div style={{ marginTop: 10, fontSize: 13, color: "#B91C1C" }}>{loadError}</div>
          )}
        </div>

        {/* TIMES */}
        <div className="px-5 md:px-7 pb-6" style={{ borderTop: `1px solid ${LINE}`, paddingTop: 22, background: CANVAS }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
            <div>
              <div style={{ fontFamily: "Oswald, Inter, sans-serif", fontWeight: 700, fontSize: "clamp(18px, 2.4vw, 22px)", letterSpacing: "0.01em", color: INK }}>
                {selectedDay ? fmtFullDay(new Date(selectedDay + "T12:00:00")) : "Select a day"}
              </div>
              <div style={{ color: MUTED, fontSize: 13, marginTop: 4 }}>
                All times shown in ET.
              </div>
            </div>
            {(() => {
              const reasonLabel: Record<typeof lastReason, string> = {
                initial: "first load",
                timer: "30 min auto-refresh",
                focus: "tab focus",
                manual: "manual refresh",
              };
              let agoText = "just now";
              if (lastUpdated) {
                const secs = Math.max(0, Math.round((nowTick - lastUpdated.getTime()) / 1000));
                if (secs < 5) agoText = "just now";
                else if (secs < 60) agoText = `${secs}s ago`;
                else { const m = Math.floor(secs / 60); agoText = `${m}m ago`; }
              }
              const tooltip = lastUpdated
                ? `Updated ${lastUpdated.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit" })} via ${reasonLabel[lastReason]}. Auto-refreshes every 30 min and on tab focus.`
                : "Loading availability...";
              return (
                <button
                  type="button"
                  title={tooltip}
                  aria-label={tooltip}
                  onClick={() => setRefreshNonce((n) => n + 1)}
                  disabled={loading}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    background: SURFACE, border: `1px solid ${BORDER}`,
                    borderRadius: 999, padding: "6px 10px",
                    fontSize: 11, fontWeight: 600, letterSpacing: "0.04em",
                    color: INK_SOFT, cursor: loading ? "wait" : "pointer",
                  }}
                >
                  <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
                  <span>Updated {agoText}</span>
                  <span style={{ color: MUTED, fontWeight: 500 }}>· {reasonLabel[lastReason]}</span>
                </button>
              );
            })()}
          </div>

          {!selectedDay ? (
            <div style={{ color: MUTED, fontSize: 14, fontStyle: "italic", padding: "20px 4px" }}>
              {loading ? "Loading availability..." : "Pick a date above to see available times."}
            </div>
          ) : times.length === 0 ? (
            <div style={{ color: MUTED, fontSize: 14, fontStyle: "italic", padding: "20px 4px" }}>
              No times available on this day between 8 AM and 5 PM.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {times.map((iso) => {
                const active = iso === selectedSlot;
                const { time, ampm } = fmtTimeParts(iso);
                return (
                  <button
                    key={iso}
                    type="button"
                    onClick={() => setSelectedSlot(iso)}
                    style={{
                      background: active ? ORANGE_DEEP : SURFACE,
                      border: `1px solid ${active ? ORANGE_DEEP : BORDER}`,
                      borderRadius: 12, padding: "16px 18px",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      color: active ? "#FFFFFF" : INK, cursor: "pointer", textAlign: "left",
                      boxShadow: active
                        ? "0 8px 20px -10px rgba(194,65,12,0.55)"
                        : "0 1px 0 rgba(11,16,41,0.02)",
                      transition: "background 120ms ease, transform 120ms ease, box-shadow 120ms ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                      <span style={{ fontFamily: "Oswald, Inter, sans-serif", fontWeight: 700, fontSize: 22, letterSpacing: "0.01em" }}>
                        {time}
                      </span>
                      <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: active ? "#FFFFFF" : MUTED }}>
                        {ampm}
                      </span>
                    </div>
                    <span style={{ fontSize: 18, color: active ? "#FFFFFF" : MUTED }}>→</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* CONFIRM BAR */}
        <div
          className="px-5 md:px-7 py-4"
          style={{ borderTop: `1px solid ${LINE}`, background: SURFACE }}
        >
          <button
            type="button"
            onClick={() => canConfirm && setModalOpen(true)}
            disabled={!canConfirm}
            style={{
              width: "100%", minHeight: 56,
              background: canConfirm ? ORANGE : "#E5E7EB",
              color: canConfirm ? "#FFFFFF" : "#5B6271",
              border: 0, borderRadius: 12, fontSize: 16, fontWeight: 700,
              letterSpacing: "0.06em", textTransform: "uppercase",
              cursor: canConfirm ? "pointer" : "not-allowed",
              fontFamily: "Oswald, Inter, sans-serif",
              boxShadow: canConfirm ? "0 10px 24px -10px rgba(232,103,10,0.55)" : "none",
              transition: "transform 120ms ease, box-shadow 120ms ease",
            }}
          >
            {canConfirm && selectedSlot
              ? `Confirm ${fmtTimeParts(selectedSlot).time} ${fmtTimeParts(selectedSlot).ampm}`
              : "Select a time to continue"}
          </button>
        </div>
      </div>

      <Dialog open={modalOpen} onOpenChange={(o) => !submitting && setModalOpen(o)}>
        <DialogContent className="sm:max-w-md" style={{ background: SURFACE, color: INK, border: `1px solid ${LINE}`, fontFamily: "Inter, sans-serif" }}>
          <DialogHeader>
            <DialogTitle style={{ color: INK, fontFamily: "Oswald, Inter, sans-serif", letterSpacing: "0.02em" }}>
              Confirm your appointment
            </DialogTitle>
          </DialogHeader>
          <div style={{ background: CANVAS, border: `1px solid ${LINE}`, borderRadius: 12, padding: 16, marginTop: 4 }}>
            <div style={{ fontSize: 12, color: MUTED, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginBottom: 8 }}>
              You're booking
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
              New Patient Consultation (60 min)
            </div>
            {selectedSlot && (
              <div style={{ fontSize: 15, color: INK, marginBottom: 4 }}>
                {fmtFullDay(new Date(selectedSlot))} · {fmtTimeParts(selectedSlot).time} {fmtTimeParts(selectedSlot).ampm} ET
              </div>
            )}
            <div style={{ fontSize: 14, color: MUTED }}>{cal.label}, In-person</div>
            {fullName && (
              <div style={{ fontSize: 14, color: MUTED, marginTop: 8 }}>
                Under: <strong style={{ color: INK }}>{fullName}</strong>
              </div>
            )}
          </div>

          {submitError && (
            <div
              role="alert"
              aria-live="assertive"
              style={{
                marginTop: 12,
                padding: "12px 14px",
                background: "#FEF2F2",
                border: "1px solid #EF4444",
                borderRadius: 8,
                color: "#B91C1C",
                fontSize: 13,
                lineHeight: 1.5,
              }}
            >
              <div style={{ fontWeight: 600 }}>{submitError}</div>
              {confirmCtl.redirect && (
                <>
                  <div style={{ marginTop: 8, fontSize: 12, color: "#7F1D1D", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                    <span>
                      Connecting you with a coordinator in{" "}
                      <strong>{Math.max(1, Math.ceil(confirmCtl.redirect.remainingMs / 1000))}s</strong>
                    </span>
                    <button
                      type="button"
                      onClick={confirmCtl.cancelRedirect}
                      style={{
                        background: "transparent",
                        border: "1px solid #FCA5A5",
                        color: "#7F1D1D",
                        borderRadius: 6,
                        padding: "4px 10px",
                        fontSize: 11,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                  <div
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={confirmCtl.redirect.totalMs}
                    aria-valuenow={confirmCtl.redirect.totalMs - confirmCtl.redirect.remainingMs}
                    style={{
                      marginTop: 8,
                      height: 4,
                      background: "#FECACA",
                      borderRadius: 999,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${Math.min(100, ((confirmCtl.redirect.totalMs - confirmCtl.redirect.remainingMs) / confirmCtl.redirect.totalMs) * 100)}%`,
                        background: "#B91C1C",
                        transition: "width 100ms linear",
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
            <button
              type="button"
              onClick={handleFinalConfirm}
              disabled={submitting || !!confirmCtl.redirect}
              style={{
                width: "100%", minHeight: 52,
                background: ORANGE, color: "#FFFFFF",
                border: 0, borderRadius: 12, fontSize: 15, fontWeight: 700,
                letterSpacing: "0.06em", textTransform: "uppercase",
                cursor: submitting || confirmCtl.redirect ? "wait" : "pointer",
                opacity: submitting || confirmCtl.redirect ? 0.6 : 1,
                fontFamily: "Oswald, Inter, sans-serif",
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                boxShadow: "0 10px 24px -10px rgba(232,103,10,0.55)",
              }}
            >
              {submitting && <Loader2 size={16} className="animate-spin" />}
              {submitting ? "Booking..." : "Confirm booking"}
            </button>
            <button
              type="button"
              onClick={() => { if (!submitting) { confirmCtl.cancelRedirect(); setModalOpen(false); } }}
              style={{ width: "100%", minHeight: 44, background: "transparent", color: MUTED, border: 0, fontSize: 14, fontWeight: 600, cursor: "pointer" }}
            >
              ← Change time
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GHLDayView;
