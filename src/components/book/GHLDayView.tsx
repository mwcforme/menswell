import { useEffect, useMemo, useState } from "react";
import { Loader2, ChevronLeft, ChevronRight, Clock, MapPin, CalendarCheck, RefreshCw } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  CENTER_CALENDARS,
  TIMEZONE,
  getFreeSlots,
  upsertContact,
  bookAppointment,
  type LocationKey,
} from "@/lib/ghlCalendars";

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

// Brand tokens (light surface, navy ink, orange accent)
const INK = "#0B1029";
const INK_SOFT = "#3A4258";
const MUTED = "#6B7280";
const LINE = "#E5E7EB";
const SURFACE = "#FFFFFF";
const CANVAS = "#F7F8FB";
const ORANGE = "#E8670A";
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
  const end = new Date(start); end.setDate(end.getDate() + 6);
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

// Always render the full 8am–5pm ET hourly slate (overbooking model).
// For today, omit hours that have already passed in ET.
const buildFullDaySlots = (day: Date): string[] => {
  const out: string[] = [];
  const cutoffHour = isTodayET(day) ? etHourNow() : -1;
  const dateStr = ymd(day);
  for (let h = HOUR_MIN; h < HOUR_MAX; h++) {
    if (h <= cutoffHour) continue;
    out.push(etWallToDate(dateStr, h).toISOString());
  }
  return out;
};

const GHLDayView = ({ location, firstName, lastName, email, phone, notes, source, onBooked }: Props) => {
  const today = useMemo(() => { const t = new Date(); t.setHours(0, 0, 0, 0); return t; }, []);
  const [weekStart, setWeekStart] = useState<Date>(() => startOfWeek(new Date()));
  const [slotsByDay, setSlotsByDay] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
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
    return Array.from({ length: 7 })
      .map((_, i) => { const d = new Date(weekStart); d.setDate(weekStart.getDate() + i); return d; })
      .filter((d) => d >= today);
  }, [weekStart, today]);

  const [refreshNonce, setRefreshNonce] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const start = new Date(weekStart);
    if (start < today) start.setTime(today.getTime());
    const end = new Date(weekStart);
    end.setDate(end.getDate() + 7); end.setHours(0, 0, 0, 0);

    const load = (reason: "initial" | "timer" | "focus" | "manual") => {
      const isInitial = reason === "initial";
      if (isInitial) {
        setLoading(true); setLoadError(null); setSlotsByDay({}); setSelectedSlot(null);
      }
      // Always show the full 8a–5p hourly slate per future day (overbook model).
      // The API call still runs so the "last updated" indicator stays meaningful.
      return getFreeSlots(location, start, end)
        .then(() => {
          if (cancelled) return;
          const out: Record<string, string[]> = {};
          days.forEach((d) => {
            const slate = buildFullDaySlots(d);
            if (slate.length > 0) out[ymd(d)] = slate;
          });
          setSlotsByDay(out);
          setLastUpdated(new Date());
          setLastReason(reason);
          setNowTick(Date.now());
          if (isInitial) {
            const firstWith = days.find((d) => out[ymd(d)]?.length);
            setSelectedDay(firstWith ? ymd(firstWith) : null);
          }
        })
        .catch((e: Error) => { if (!cancelled && isInitial) setLoadError(e.message || "Could not load times."); })
        .finally(() => { if (!cancelled && isInitial) setLoading(false); });
    };

    load(refreshNonce > 0 ? "manual" : "initial");
    // Realtime refresh every 30s, plus on tab focus
    const interval = window.setInterval(() => load("timer"), 30_000);
    const onFocus = () => load("focus");
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
  const prevDisabled = weekStart <= startOfWeek(today);

  const handleFinalConfirm = async () => {
    if (!selectedSlot) return;
    setSubmitting(true); setSubmitError(null);
    try {
      const contactId = await upsertContact({
        firstName: firstName || "Guest",
        lastName: lastName || undefined,
        email: email || undefined,
        phone: phone || undefined,
        source: source || "mwc-book-funnel",
      });
      await bookAppointment({ location, contactId, startTime: selectedSlot, notes });
      setModalOpen(false);
      onBooked?.(selectedSlot);
    } catch (e) {
      setSubmitError((e as Error).message || "Booking failed. Please try another time.");
    } finally { setSubmitting(false); }
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
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: ORANGE, fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>
            <CalendarCheck size={14} strokeWidth={2.5} />
            <span>Schedule your visit</span>
          </div>
          <div style={{ fontFamily: "Oswald, Inter, sans-serif", fontWeight: 700, letterSpacing: "0.01em", fontSize: "clamp(22px, 3vw, 30px)", lineHeight: 1.1, color: INK }}>
            Pick a day at the {cal.label} clinic
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, color: MUTED, fontSize: 13, marginTop: 8, flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Clock size={14} /> 30 min consult
            </span>
            <span style={{ width: 4, height: 4, borderRadius: 999, background: LINE }} />
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <MapPin size={14} /> In-person
            </span>
            <span style={{ width: 4, height: 4, borderRadius: 999, background: LINE }} />
            <span>Hours: 8 AM – 5 PM ET</span>
          </div>
        </div>

        {/* WEEK NAV */}
        <div className="px-5 md:px-7 pt-5 flex items-center justify-between gap-3">
          <button
            type="button"
            disabled={prevDisabled}
            onClick={() => { const w = new Date(weekStart); w.setDate(w.getDate() - 7); setWeekStart(w); }}
            aria-label="Previous week"
            style={{
              background: SURFACE, color: INK, border: `1px solid ${LINE}`,
              borderRadius: 999, padding: "8px 12px",
              fontSize: 13, fontWeight: 600,
              display: "inline-flex", alignItems: "center", gap: 6,
              cursor: prevDisabled ? "not-allowed" : "pointer",
              opacity: prevDisabled ? 0.4 : 1,
            }}
          >
            <ChevronLeft size={16} /> Prev
          </button>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", color: INK_SOFT }}>
            {fmtWeekRange(weekStart)}
          </div>
          <button
            type="button"
            onClick={() => { const w = new Date(weekStart); w.setDate(w.getDate() + 7); setWeekStart(w); }}
            aria-label="Next week"
            style={{
              background: SURFACE, color: INK, border: `1px solid ${LINE}`,
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
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${Math.min(days.length, 7)}, minmax(0, 1fr))`,
                gap: 8,
              }}
            >
              {days.map((d) => {
                const key = ymd(d);
                const count = slotsByDay[key]?.length || 0;
                const available = count > 0;
                const selected = selectedDay === key;
                const isToday = ymd(today) === key;
                const badgeText = !loading
                  ? available
                    ? `${count} OPEN`
                    : "FULL"
                  : "···";
                return (
                  <button
                    key={key}
                    type="button"
                    disabled={!available}
                    aria-pressed={selected}
                    aria-label={`${fmtFullDay(d)} — ${available ? `${count} times available` : "no times available"}`}
                    onClick={() => { setSelectedDay(key); setSelectedSlot(null); }}
                    style={{
                      background: selected ? INK : SURFACE,
                      border: `1.5px solid ${selected ? INK : available ? LINE : "#ECEEF2"}`,
                      borderRadius: 12, padding: "12px 6px",
                      color: selected ? "#FFFFFF" : available ? INK : "#A8AEB8",
                      cursor: available ? "pointer" : "not-allowed",
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
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: selected ? "rgba(255,255,255,0.75)" : MUTED, marginBottom: 4 }}>
                      {isToday ? "TODAY" : fmtDayShort(d)}
                    </div>
                    <div style={{ fontFamily: "Oswald, Inter, sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: "0.02em", textDecoration: !available && !loading ? "line-through" : "none", textDecorationColor: "#D7DAE0" }}>
                      {fmtMonthDay(d)}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: selected
                          ? "#FFFFFF"
                          : available
                            ? count >= 3 ? "#0F7A3D" : "#B91C1C"
                            : "#A8AEB8",
                        background: selected
                          ? "rgba(255,255,255,0.15)"
                          : available
                            ? count >= 3 ? "#E6F7EC" : "#FEECEC"
                            : "#F1F2F5",
                        marginTop: 6,
                        letterSpacing: "0.06em",
                        padding: "2px 6px",
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
                {selectedDay ? `Pick a time, ${fmtFullDay(new Date(selectedDay + "T12:00:00"))}` : "Pick a time"}
              </div>
              <div style={{ color: MUTED, fontSize: 13, marginTop: 4 }}>
                Times shown in clinic local time (ET).
              </div>
            </div>
            {(() => {
              const reasonLabel: Record<typeof lastReason, string> = {
                initial: "first load",
                timer: "30s auto-refresh",
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
                ? `Updated ${lastUpdated.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit" })} via ${reasonLabel[lastReason]}. Auto-refreshes every 30s and on tab focus.`
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
                    background: SURFACE, border: `1px solid ${LINE}`,
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
                      background: active ? ORANGE : SURFACE,
                      border: `1px solid ${active ? ORANGE : LINE}`,
                      borderRadius: 12, padding: "16px 18px",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      color: active ? "#FFFFFF" : INK, cursor: "pointer", textAlign: "left",
                      boxShadow: active
                        ? "0 8px 20px -10px rgba(232,103,10,0.55)"
                        : "0 1px 0 rgba(11,16,41,0.02)",
                      transition: "background 120ms ease, transform 120ms ease, box-shadow 120ms ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                      <span style={{ fontFamily: "Oswald, Inter, sans-serif", fontWeight: 700, fontSize: 22, letterSpacing: "0.01em" }}>
                        {time}
                      </span>
                      <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: active ? "rgba(255,255,255,0.85)" : MUTED }}>
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
              background: canConfirm ? ORANGE : "#F1F2F5",
              color: canConfirm ? "#FFFFFF" : "#9AA0AC",
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
              New Patient Consultation (30 min)
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
            <div style={{ marginTop: 12, padding: "10px 12px", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, color: "#B91C1C", fontSize: 13 }}>
              {submitError}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
            <button
              type="button"
              onClick={handleFinalConfirm}
              disabled={submitting}
              style={{
                width: "100%", minHeight: 52,
                background: ORANGE, color: "#FFFFFF",
                border: 0, borderRadius: 12, fontSize: 15, fontWeight: 700,
                letterSpacing: "0.06em", textTransform: "uppercase",
                cursor: submitting ? "wait" : "pointer", opacity: submitting ? 0.85 : 1,
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
              onClick={() => !submitting && setModalOpen(false)}
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
