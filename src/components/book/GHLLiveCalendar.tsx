import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Globe, CalendarClock, MapPin, Loader2 } from "lucide-react";
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

interface DayCell { date: Date; inMonth: boolean; key: string; }

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const ymd = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const buildMonth = (anchor: Date): DayCell[] => {
  const first = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  const startOffset = first.getDay(); // 0=Sun
  const daysInMonth = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0).getDate();
  const cells: DayCell[] = [];
  // leading
  for (let i = startOffset; i > 0; i--) {
    const d = new Date(first);
    d.setDate(first.getDate() - i);
    cells.push({ date: d, inMonth: false, key: ymd(d) });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(anchor.getFullYear(), anchor.getMonth(), i);
    cells.push({ date: d, inMonth: true, key: ymd(d) });
  }
  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1].date;
    const d = new Date(last);
    d.setDate(last.getDate() + 1);
    cells.push({ date: d, inMonth: false, key: ymd(d) });
  }
  return cells;
};

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit", hour12: true, timeZone: TIMEZONE,
  });

const formatHeading = (d: Date) =>
  d.toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", timeZone: TIMEZONE,
  });

const monthLabel = (d: Date) =>
  d.toLocaleDateString("en-US", { month: "long", year: "numeric" });

const GHLLiveCalendar = ({ location, firstName, lastName, email, phone, notes, source, onBooked }: Props) => {
  const today = useMemo(() => new Date(), []);
  const [anchor, setAnchor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [slotsByDay, setSlotsByDay] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const cells = useMemo(() => buildMonth(anchor), [anchor]);
  const calLabel = CENTER_CALENDARS[location].label;

  // Fetch slots whenever month or location changes
  useEffect(() => {
    let cancelled = false;
    const start = new Date(anchor);
    // if viewing current month, start at today
    if (start.getMonth() === today.getMonth() && start.getFullYear() === today.getFullYear()) {
      start.setTime(today.getTime());
    }
    const end = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0, 23, 59, 59);
    setLoading(true);
    setLoadError(null);
    setSlotsByDay({});
    setSelectedDay(null);
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
      })
      .catch((e: Error) => {
        if (!cancelled) setLoadError(e.message || "Could not load times.");
      })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [anchor, location, today]);

  const dayHasSlots = (key: string) => Boolean(slotsByDay[key]?.length);
  const times = selectedDay ? slotsByDay[selectedDay] || [] : [];
  const canConfirm = Boolean(selectedSlot);

  const handleFinalConfirm = async () => {
    if (!selectedSlot) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const contactId = await upsertContact({
        firstName: firstName || "Guest",
        lastName: lastName || undefined,
        email: email || undefined,
        phone: phone || undefined,
        source: source || "mwc-book-funnel",
      });
      await bookAppointment({
        location,
        contactId,
        startTime: selectedSlot,
        notes,
      });
      setModalOpen(false);
      onBooked?.(selectedSlot);
    } catch (e) {
      setSubmitError((e as Error).message || "Booking failed. Please try another time.");
    } finally {
      setSubmitting(false);
    }
  };

  const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();
  const prevDisabled = anchor.getFullYear() === today.getFullYear() && anchor.getMonth() === today.getMonth();

  return (
    <>
      <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 12, overflow: "hidden", fontFamily: "Inter, system-ui, sans-serif", color: "#0B1029" }}>
        <div className="px-4 py-3 md:px-6 md:py-5" style={{ borderBottom: "1px solid #E5E7EB", background: "#FAFBFC" }}>
          <div style={{ fontSize: 12, color: "#6B7280", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 4 }}>
            Men's Wellness Centers
          </div>
          <div className="text-lg md:text-[22px]" style={{ fontWeight: 700, marginBottom: 2 }}>
            New Patient Consultation
          </div>
          <div className="text-sm md:text-[15px]" style={{ color: "#6B7280" }}>
            30 min · In-person · {calLabel}
          </div>
        </div>

        <div className="md:grid md:grid-cols-2" style={{ display: "grid" }}>
          {/* Calendar */}
          <div className="p-3 md:p-5" style={{ borderRight: "1px solid #E5E7EB" }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
              <button
                type="button"
                aria-label="Previous month"
                disabled={prevDisabled}
                onClick={() => setAnchor(new Date(anchor.getFullYear(), anchor.getMonth() - 1, 1))}
                style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid #E5E7EB", background: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", cursor: prevDisabled ? "not-allowed" : "pointer", opacity: prevDisabled ? 0.4 : 1 }}
              >
                <ChevronLeft size={18} color="#0B1029" />
              </button>
              <div style={{ fontSize: 17, fontWeight: 700 }}>{monthLabel(anchor)}</div>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => setAnchor(new Date(anchor.getFullYear(), anchor.getMonth() + 1, 1))}
                style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid #E5E7EB", background: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
              >
                <ChevronRight size={18} color="#0B1029" />
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 6 }}>
              {WEEKDAYS.map((w) => (
                <div key={w} style={{ textAlign: "center", fontSize: 12, fontWeight: 600, color: "#9CA3AF", letterSpacing: "0.05em" }}>{w}</div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, position: "relative" }}>
              {loading && (
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.7)", zIndex: 1 }}>
                  <Loader2 size={22} className="animate-spin" color="#0B1029" />
                </div>
              )}
              {cells.map((cell) => {
                const isPast = cell.date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                const available = cell.inMonth && !isPast && dayHasSlots(cell.key);
                const isSelected = selectedDay === cell.key;
                return (
                  <button
                    key={cell.key}
                    type="button"
                    disabled={!available}
                    onClick={() => { setSelectedDay(cell.key); setSelectedSlot(null); }}
                    style={{
                      aspectRatio: "1 / 1", borderRadius: 999, fontSize: 15,
                      fontWeight: isSelected ? 700 : 500, border: 0,
                      background: isSelected ? "#0B1029" : available ? "#EEF1F6" : "transparent",
                      color: isSelected ? "#FFFFFF" : !cell.inMonth || !available ? "#D1D5DB" : "#0B1029",
                      cursor: available ? "pointer" : "default",
                      transition: "background 120ms ease",
                    }}
                  >
                    {cell.date.getDate()}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2" style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid #F3F4F6", fontSize: 13, color: "#6B7280" }}>
              <Globe size={14} />
              <span>Eastern time. US &amp; Canada</span>
            </div>
            {loadError && (
              <div style={{ marginTop: 10, fontSize: 13, color: "#B91C1C" }}>{loadError}</div>
            )}
          </div>

          {/* Time slots */}
          <div className="p-3 md:p-5" style={{ background: "#FAFBFC" }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>
              {selectedDay ? formatHeading(new Date(selectedDay + "T12:00:00")) : "Pick a date"}
            </div>
            {selectedDay ? (
              times.length === 0 ? (
                <div style={{ fontSize: 14, color: "#6B7280", fontStyle: "italic", padding: "20px 4px" }}>
                  No times available on this day.
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2" style={{ maxHeight: 360, overflowY: "auto", paddingRight: 4 }}>
                  {times.map((iso) => {
                    const active = iso === selectedSlot;
                    return (
                      <button
                        key={iso}
                        type="button"
                        onClick={() => setSelectedSlot(iso)}
                        style={{
                          padding: "10px 12px", borderRadius: 8,
                          border: active ? "2px solid #E8670A" : "1px solid #D1D5DB",
                          background: active ? "#E8670A" : "#FFFFFF",
                          color: active ? "#FFFFFF" : "#0B1029",
                          fontSize: 14, fontWeight: 600, textAlign: "center", cursor: "pointer",
                        }}
                      >
                        {formatTime(iso)}
                      </button>
                    );
                  })}
                </div>
              )
            ) : (
              <div style={{ fontSize: 14, color: "#6B7280", fontStyle: "italic", padding: "20px 4px" }}>
                {loading ? "Loading availability..." : "Pick a date to see available times."}
              </div>
            )}
          </div>
        </div>

        <div className="p-3 md:p-5" style={{ borderTop: "1px solid #E5E7EB", background: "#FFFFFF" }}>
          <button
            type="button"
            onClick={() => canConfirm && setModalOpen(true)}
            disabled={!canConfirm}
            style={{
              width: "100%", minHeight: 56,
              background: canConfirm ? "#E8670A" : "#D1D5DB",
              color: canConfirm ? "#FFFFFF" : "#6B7280",
              border: 0, borderRadius: 8, fontSize: 18, fontWeight: 700,
              letterSpacing: "0.02em", textTransform: "uppercase",
              cursor: canConfirm ? "pointer" : "not-allowed",
              boxShadow: canConfirm ? "0 2px 6px rgba(232,103,10,0.35)" : "none",
            }}
          >
            {canConfirm && selectedSlot ? `Confirm ${formatTime(selectedSlot)}` : "Select a time to continue"}
          </button>
          <div style={{ fontSize: 12, color: "#9CA3AF", textAlign: "center", marginTop: 10 }}>
            Secure booking by Men's Wellness Centers.
          </div>
        </div>
      </div>

      <Dialog open={modalOpen} onOpenChange={(o) => !submitting && setModalOpen(o)}>
        <DialogContent className="sm:max-w-md" style={{ fontFamily: "Inter, sans-serif" }}>
          <DialogHeader>
            <DialogTitle style={{ fontSize: 20, color: "#0B1029" }}>Confirm your appointment</DialogTitle>
          </DialogHeader>

          <div style={{ background: "#FAFBFC", border: "1px solid #E5E7EB", borderRadius: 10, padding: 16, marginTop: 8 }}>
            <div style={{ fontSize: 13, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 700, marginBottom: 6 }}>You're booking</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#0B1029", marginBottom: 10 }}>New Patient Consultation (30 min)</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, color: "#0B1029", marginBottom: 6 }}>
              <CalendarClock size={16} style={{ color: "#E8670A" }} />
              <span>
                {selectedSlot && `${formatHeading(new Date(selectedSlot))}, ${formatTime(selectedSlot)} ET`}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, color: "#0B1029" }}>
              <MapPin size={16} style={{ color: "#E8670A" }} />
              <span>{calLabel} — In-person</span>
            </div>
            {fullName && (
              <div style={{ fontSize: 14, color: "#3A4258", marginTop: 8 }}>
                Under the name: <strong style={{ color: "#0B1029" }}>{fullName}</strong>
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
                background: "#E8670A", color: "#FFFFFF",
                border: 0, borderRadius: 8, fontSize: 16, fontWeight: 700,
                letterSpacing: "0.02em", textTransform: "uppercase",
                cursor: submitting ? "wait" : "pointer", opacity: submitting ? 0.85 : 1,
                boxShadow: "0 2px 6px rgba(232,103,10,0.35)",
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
            >
              {submitting && <Loader2 size={16} className="animate-spin" />}
              {submitting ? "Booking..." : "Confirm booking"}
            </button>
            <button
              type="button"
              onClick={() => !submitting && setModalOpen(false)}
              style={{ width: "100%", minHeight: 44, background: "transparent", color: "#5A6478", border: 0, fontSize: 15, fontWeight: 600, cursor: "pointer" }}
            >
              ← Change time
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GHLLiveCalendar;
