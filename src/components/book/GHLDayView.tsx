import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
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

const NAVY = "#000814";
const NAVY_CARD = "#0B1029";
const NAVY_BORDER = "rgba(255,255,255,0.10)";
const ORANGE = "#E8670A";
const TEXT = "#FFFFFF";
const MUTED = "rgba(255,255,255,0.65)";
const DIM = "rgba(255,255,255,0.35)";

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
  return `WEEK OF ${start.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: TIMEZONE }).toUpperCase()}`;
};
const fmtTimeParts = (iso: string) => {
  const s = new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit", hour12: true, timeZone: TIMEZONE,
  });
  const [time, ampm] = s.split(" ");
  return { time, ampm };
};
const fmtFullDay = (d: Date) =>
  d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: TIMEZONE }).toUpperCase();

const GHLDayView = ({ location, firstName, lastName, email, phone, notes, source, onBooked }: Props) => {
  const today = useMemo(() => { const t = new Date(); t.setHours(0,0,0,0); return t; }, []);
  const [weekStart, setWeekStart] = useState<Date>(() => startOfWeek(new Date()));
  const [slotsByDay, setSlotsByDay] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const cal = CENTER_CALENDARS[location];

  const days = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(weekStart); d.setDate(weekStart.getDate() + i); return d;
    });
  }, [weekStart]);

  useEffect(() => {
    let cancelled = false;
    const start = new Date(weekStart);
    if (start < today) start.setTime(today.getTime());
    const end = new Date(weekStart);
    end.setDate(end.getDate() + 7); end.setHours(0, 0, 0, 0);

    setLoading(true); setLoadError(null); setSlotsByDay({});
    setSelectedSlot(null);

    getFreeSlots(location, start, end)
      .then((data) => {
        if (cancelled) return;
        const out: Record<string, string[]> = {};
        if (data && typeof data === "object") {
          Object.entries(data as Record<string, unknown>).forEach(([k, v]) => {
            if (k === "traceId") return;
            const slots = (v as { slots?: string[] })?.slots;
            if (Array.isArray(slots) && slots.length > 0) out[k] = slots;
          });
        }
        setSlotsByDay(out);
        // auto-select first day with slots
        const firstWith = days.find((d) => out[ymd(d)]?.length);
        setSelectedDay(firstWith ? ymd(firstWith) : null);
      })
      .catch((e: Error) => { if (!cancelled) setLoadError(e.message || "Could not load times."); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weekStart, location]);

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
      <div style={{ background: NAVY, border: `1px solid ${NAVY_BORDER}`, borderRadius: 14, overflow: "hidden", color: TEXT, fontFamily: "Inter, system-ui, sans-serif" }}>
        {/* HEADER */}
        <div className="px-4 md:px-6 pt-5 md:pt-7 pb-4">
          <div style={{ fontFamily: "Oswald, Inter, sans-serif", fontWeight: 700, letterSpacing: "0.02em", fontSize: "clamp(22px, 3vw, 30px)", lineHeight: 1.05 }}>
            PICK A DAY
          </div>
          <div style={{ color: MUTED, fontSize: 14, marginTop: 4 }}>
            Next available openings at your {cal.label} clinic.
          </div>
        </div>

        {/* WEEK NAV */}
        <div className="px-4 md:px-6 flex items-center justify-between gap-2" style={{ marginBottom: 12 }}>
          <button
            type="button"
            disabled={prevDisabled}
            onClick={() => { const w = new Date(weekStart); w.setDate(w.getDate() - 7); setWeekStart(w); }}
            style={{
              background: "transparent", color: TEXT, border: `1px solid ${NAVY_BORDER}`,
              borderRadius: 8, padding: "8px 12px", fontSize: 13, fontWeight: 600,
              cursor: prevDisabled ? "not-allowed" : "pointer", opacity: prevDisabled ? 0.4 : 1,
            }}
          >
            ← Prev week
          </button>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: MUTED }}>
            {fmtWeekRange(weekStart)}
          </div>
          <button
            type="button"
            onClick={() => { const w = new Date(weekStart); w.setDate(w.getDate() + 7); setWeekStart(w); }}
            style={{
              background: "transparent", color: TEXT, border: `1px solid ${NAVY_BORDER}`,
              borderRadius: 8, padding: "8px 12px", fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}
          >
            Next week →
          </button>
        </div>

        {/* DAY PILLS */}
        <div className="px-4 md:px-6 pb-5" style={{ position: "relative" }}>
          {loading && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,8,20,0.55)", zIndex: 1 }}>
              <Loader2 size={22} className="animate-spin" color={TEXT} />
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
            {days.map((d) => {
              const key = ymd(d);
              const isPast = d < today;
              const count = slotsByDay[key]?.length || 0;
              const available = !isPast && count > 0;
              const selected = selectedDay === key;
              return (
                <button
                  key={key}
                  type="button"
                  disabled={!available}
                  onClick={() => { setSelectedDay(key); setSelectedSlot(null); }}
                  style={{
                    background: selected ? ORANGE : NAVY_CARD,
                    border: `1px solid ${selected ? ORANGE : NAVY_BORDER}`,
                    borderRadius: 10, padding: "10px 6px",
                    color: selected ? TEXT : available ? TEXT : DIM,
                    cursor: available ? "pointer" : "not-allowed",
                    textAlign: "center",
                    transition: "background 120ms ease",
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: selected ? TEXT : MUTED, marginBottom: 4 }}>
                    {fmtDayShort(d)}
                  </div>
                  <div style={{ fontFamily: "Oswald, Inter, sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: "0.02em" }}>
                    {fmtMonthDay(d)}
                  </div>
                  {available && count <= 3 && (
                    <div style={{ fontSize: 10, fontWeight: 700, color: selected ? TEXT : ORANGE, marginTop: 4, letterSpacing: "0.06em" }}>
                      {count} LEFT
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          {loadError && (
            <div style={{ marginTop: 10, fontSize: 13, color: "#FCA5A5" }}>{loadError}</div>
          )}
        </div>

        {/* TIMES */}
        <div className="px-4 md:px-6 pb-5" style={{ borderTop: `1px solid ${NAVY_BORDER}`, paddingTop: 20 }}>
          <div style={{ fontFamily: "Oswald, Inter, sans-serif", fontWeight: 700, fontSize: "clamp(18px, 2.4vw, 22px)", letterSpacing: "0.02em" }}>
            PICK A TIME{selectedDay && ` · ${fmtFullDay(new Date(selectedDay + "T12:00:00"))}`}
          </div>
          <div style={{ color: MUTED, fontSize: 13, marginTop: 4, marginBottom: 16 }}>
            All consults are 30 minutes, in-person.
          </div>

          {!selectedDay ? (
            <div style={{ color: MUTED, fontSize: 14, fontStyle: "italic", padding: "20px 4px" }}>
              {loading ? "Loading availability..." : "Pick a date above to see available times."}
            </div>
          ) : times.length === 0 ? (
            <div style={{ color: MUTED, fontSize: 14, fontStyle: "italic", padding: "20px 4px" }}>
              No times available on this day.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {times.map((iso) => {
                const active = iso === selectedSlot;
                const { time, ampm } = fmtTimeParts(iso);
                return (
                  <button
                    key={iso}
                    type="button"
                    onClick={() => setSelectedSlot(iso)}
                    style={{
                      background: active ? ORANGE : NAVY_CARD,
                      border: `1px solid ${active ? ORANGE : NAVY_BORDER}`,
                      borderRadius: 10, padding: "16px 18px",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      color: TEXT, cursor: "pointer", textAlign: "left",
                      transition: "background 120ms ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                      <span style={{ fontFamily: "Oswald, Inter, sans-serif", fontWeight: 700, fontSize: 22, letterSpacing: "0.01em" }}>
                        {time}
                      </span>
                      <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: active ? TEXT : MUTED }}>
                        {ampm}
                      </span>
                    </div>
                    <span style={{ fontSize: 18, color: active ? TEXT : MUTED }}>→</span>
                  </button>
                );
              })}
            </div>
          )}

          <div style={{ marginTop: 18, fontSize: 12, color: DIM }}>
            Times shown in clinic local time (ET).
          </div>
        </div>

        {/* CONFIRM BAR */}
        <div className="px-4 md:px-6 py-4" style={{ borderTop: `1px solid ${NAVY_BORDER}`, background: NAVY_CARD }}>
          <button
            type="button"
            onClick={() => canConfirm && setModalOpen(true)}
            disabled={!canConfirm}
            style={{
              width: "100%", minHeight: 56,
              background: canConfirm ? ORANGE : "rgba(255,255,255,0.08)",
              color: canConfirm ? TEXT : MUTED,
              border: 0, borderRadius: 10, fontSize: 16, fontWeight: 700,
              letterSpacing: "0.06em", textTransform: "uppercase",
              cursor: canConfirm ? "pointer" : "not-allowed",
              fontFamily: "Oswald, Inter, sans-serif",
            }}
          >
            {canConfirm && selectedSlot
              ? `Confirm ${fmtTimeParts(selectedSlot).time} ${fmtTimeParts(selectedSlot).ampm}`
              : "Select a time to continue"}
          </button>
        </div>
      </div>

      <Dialog open={modalOpen} onOpenChange={(o) => !submitting && setModalOpen(o)}>
        <DialogContent className="sm:max-w-md" style={{ background: NAVY, color: TEXT, border: `1px solid ${NAVY_BORDER}`, fontFamily: "Inter, sans-serif" }}>
          <DialogHeader>
            <DialogTitle style={{ color: TEXT, fontFamily: "Oswald, Inter, sans-serif", letterSpacing: "0.02em" }}>
              CONFIRM YOUR APPOINTMENT
            </DialogTitle>
          </DialogHeader>
          <div style={{ background: NAVY_CARD, border: `1px solid ${NAVY_BORDER}`, borderRadius: 10, padding: 16, marginTop: 4 }}>
            <div style={{ fontSize: 12, color: MUTED, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginBottom: 8 }}>
              You're booking
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
              New Patient Consultation (30 min)
            </div>
            {selectedSlot && (
              <div style={{ fontSize: 15, color: TEXT, marginBottom: 4 }}>
                {fmtFullDay(new Date(selectedSlot))} · {fmtTimeParts(selectedSlot).time} {fmtTimeParts(selectedSlot).ampm} ET
              </div>
            )}
            <div style={{ fontSize: 14, color: MUTED }}>{cal.label} — In-person</div>
            {fullName && (
              <div style={{ fontSize: 14, color: MUTED, marginTop: 8 }}>
                Under: <strong style={{ color: TEXT }}>{fullName}</strong>
              </div>
            )}
          </div>

          {submitError && (
            <div style={{ marginTop: 12, padding: "10px 12px", background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.45)", borderRadius: 8, color: "#FCA5A5", fontSize: 13 }}>
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
                background: ORANGE, color: TEXT,
                border: 0, borderRadius: 10, fontSize: 15, fontWeight: 700,
                letterSpacing: "0.06em", textTransform: "uppercase",
                cursor: submitting ? "wait" : "pointer", opacity: submitting ? 0.85 : 1,
                fontFamily: "Oswald, Inter, sans-serif",
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
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
