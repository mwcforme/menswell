import { useState } from "react";
import { ChevronLeft, ChevronRight, Globe, CalendarClock, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  onConfirm?: (slot: string) => void;
  locationLabel?: string;
  firstName?: string;
  lastName?: string;
}

const MONTH_LABEL = "May 2026";
const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const DAYS: { d: number; outside?: boolean; disabled?: boolean }[] = [
  { d: 26, outside: true, disabled: true }, { d: 27, outside: true, disabled: true },
  { d: 28, outside: true, disabled: true }, { d: 29, outside: true, disabled: true },
  { d: 30, outside: true, disabled: true }, { d: 1, disabled: true }, { d: 2, disabled: true },
  { d: 3, disabled: true }, { d: 4, disabled: true }, { d: 5, disabled: true },
  { d: 6, disabled: true }, { d: 7, disabled: true }, { d: 8, disabled: true },
  { d: 9, disabled: true },
  { d: 10, disabled: true }, { d: 11 }, { d: 12 }, { d: 13 }, { d: 14 }, { d: 15 }, { d: 16, disabled: true },
  { d: 17, disabled: true }, { d: 18 }, { d: 19 }, { d: 20 }, { d: 21 }, { d: 22 }, { d: 23, disabled: true },
  { d: 24, disabled: true }, { d: 25, disabled: true }, { d: 26 }, { d: 27 }, { d: 28 }, { d: 29 }, { d: 30, disabled: true },
];

const TIMES_BY_DAY: Record<number, string[]> = {
  11: ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"],
  12: ["9:30 AM", "11:00 AM", "1:30 PM", "3:00 PM"],
  13: ["10:00 AM", "11:30 AM", "2:00 PM", "3:30 PM", "4:30 PM"],
  14: ["9:00 AM", "10:30 AM", "12:00 PM", "2:30 PM"],
  15: ["9:30 AM", "11:00 AM", "1:00 PM", "3:00 PM", "4:30 PM"],
};

const WEEKDAY_NAME = (d: number): string => {
  // May 2026: May 1 = Friday → use static map.
  const map: Record<number, string> = {
    11: "Monday", 12: "Tuesday", 13: "Wednesday", 14: "Thursday", 15: "Friday",
    18: "Monday", 19: "Tuesday", 20: "Wednesday", 21: "Thursday", 22: "Friday",
    26: "Tuesday", 27: "Wednesday", 28: "Thursday", 29: "Friday",
  };
  return map[d] || "Tuesday";
};

const GHLNeoCalendarMock = ({ onConfirm, locationLabel, firstName, lastName }: Props) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const times = selectedDay ? (TIMES_BY_DAY[selectedDay] || []) : [];
  const canConfirm = !!selectedDay && !!selectedTime;

  const slotLabel =
    selectedDay && selectedTime
      ? `${WEEKDAY_NAME(selectedDay)}, May ${selectedDay} at ${selectedTime}`
      : "";

  const handleConfirmClick = () => {
    if (!canConfirm) return;
    setModalOpen(true);
  };

  const handleFinalConfirm = () => {
    if (!slotLabel) return;
    setModalOpen(false);
    onConfirm?.(slotLabel);
  };

  const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();

  return (
    <>
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: 12,
          overflow: "hidden",
          fontFamily: "Inter, system-ui, sans-serif",
          color: "#0B1029",
        }}
      >
        {/* Header */}
        <div
          className="px-4 py-3 md:px-6 md:py-5"
          style={{ borderBottom: "1px solid #E5E7EB", background: "#FAFBFC" }}
        >
          <div style={{ fontSize: 12, color: "#6B7280", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 4 }}>
            Men's Wellness Centers
          </div>
          <div className="text-lg md:text-[22px]" style={{ fontWeight: 700, color: "#0B1029", marginBottom: 2 }}>
            New Patient Consultation
          </div>
          <div className="text-sm md:text-[15px]" style={{ color: "#6B7280" }}>
            30 min · In-person {locationLabel ? `· ${locationLabel}` : ""}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0 }}>
          <div className="md:grid md:grid-cols-2" style={{ display: "grid" }}>
            {/* Calendar */}
            <div className="p-3 md:p-5" style={{ borderRight: "1px solid #E5E7EB" }}>
              <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
                <button
                  type="button"
                  aria-label="Previous month"
                  style={{
                    width: 36, height: 36, borderRadius: 8, border: "1px solid #E5E7EB",
                    background: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                  }}
                >
                  <ChevronLeft size={18} color="#0B1029" />
                </button>
                <div style={{ fontSize: 17, fontWeight: 700, color: "#0B1029" }}>{MONTH_LABEL}</div>
                <button
                  type="button"
                  aria-label="Next month"
                  style={{
                    width: 36, height: 36, borderRadius: 8, border: "1px solid #E5E7EB",
                    background: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                  }}
                >
                  <ChevronRight size={18} color="#0B1029" />
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 6 }}>
                {WEEKDAYS.map((w) => (
                  <div key={w} style={{ textAlign: "center", fontSize: 12, fontWeight: 600, color: "#9CA3AF", letterSpacing: "0.05em" }}>
                    {w}
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
                {DAYS.map((day, i) => {
                  const isSelected = !day.disabled && !day.outside && day.d === selectedDay;
                  const isAvailable = !day.disabled && !day.outside;
                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={day.disabled || day.outside}
                      onClick={() => {
                        setSelectedDay(day.d);
                        setSelectedTime(null);
                      }}
                      style={{
                        aspectRatio: "1 / 1",
                        borderRadius: 999,
                        fontSize: 15,
                        fontWeight: isSelected ? 700 : 500,
                        border: 0,
                        background: isSelected ? "#0B1029" : isAvailable ? "#EEF1F6" : "transparent",
                        color: isSelected ? "#FFFFFF" : day.outside || day.disabled ? "#D1D5DB" : "#0B1029",
                        cursor: isAvailable ? "pointer" : "default",
                        transition: "background 120ms ease",
                      }}
                    >
                      {day.d}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2" style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid #F3F4F6", fontSize: 13, color: "#6B7280" }}>
                <Globe size={14} />
                <span>Eastern time. US &amp; Canada</span>
              </div>
            </div>

            {/* Time slots */}
            <div className="p-3 md:p-5" style={{ background: "#FAFBFC" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#0B1029", marginBottom: 14 }}>
                {selectedDay ? `${WEEKDAY_NAME(selectedDay)}, May ${selectedDay}` : "Pick a date"}
              </div>
              {selectedDay ? (
                <div className="grid grid-cols-2 gap-2" style={{ maxHeight: 360, overflowY: "auto", paddingRight: 4 }}>
                  {times.map((t) => {
                    const active = t === selectedTime;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTime(t)}
                        style={{
                          padding: "10px 12px",
                          borderRadius: 8,
                          border: active ? "2px solid #E8670A" : "1px solid #D1D5DB",
                          background: active ? "#E8670A" : "#FFFFFF",
                          color: active ? "#FFFFFF" : "#0B1029",
                          fontSize: 14,
                          fontWeight: 600,
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div
                  style={{
                    fontSize: 14,
                    color: "#6B7280",
                    fontStyle: "italic",
                    padding: "20px 4px",
                  }}
                >
                  Pick a date to see available times.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer / Confirm */}
        <div className="p-3 md:p-5" style={{ borderTop: "1px solid #E5E7EB", background: "#FFFFFF" }}>
          <button
            type="button"
            onClick={handleConfirmClick}
            disabled={!canConfirm}
            aria-disabled={!canConfirm}
            style={{
              width: "100%",
              minHeight: 56,
              background: canConfirm ? "#E8670A" : "#D1D5DB",
              color: canConfirm ? "#FFFFFF" : "#6B7280",
              border: 0,
              borderRadius: 8,
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              cursor: canConfirm ? "pointer" : "not-allowed",
              boxShadow: canConfirm ? "0 2px 6px rgba(232,103,10,0.35)" : "none",
            }}
          >
            {canConfirm ? `Confirm ${selectedTime}` : "Select a time to continue"}
          </button>
          <div style={{ fontSize: 12, color: "#9CA3AF", textAlign: "center", marginTop: 10 }}>
            Secure booking by Men's Wellness Centers.
          </div>
        </div>
      </div>

      {/* Pre-confirmation modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md" style={{ fontFamily: "Inter, sans-serif" }}>
          <DialogHeader>
            <DialogTitle style={{ fontSize: 20, color: "#0B1029" }}>
              Confirm your appointment
            </DialogTitle>
          </DialogHeader>

          <div
            style={{
              background: "#FAFBFC",
              border: "1px solid #E5E7EB",
              borderRadius: 10,
              padding: 16,
              marginTop: 8,
            }}
          >
            <div style={{ fontSize: 13, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 700, marginBottom: 6 }}>
              You're booking
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#0B1029", marginBottom: 10 }}>
              New Patient Consultation (30 min)
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, color: "#0B1029", marginBottom: 6 }}>
              <CalendarClock size={16} style={{ color: "#E8670A" }} />
              <span>{slotLabel} ET</span>
            </div>
            {locationLabel && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, color: "#0B1029", marginBottom: 6 }}>
                <MapPin size={16} style={{ color: "#E8670A" }} />
                <span>{locationLabel} — In-person</span>
              </div>
            )}
            {fullName && (
              <div style={{ fontSize: 14, color: "#3A4258", marginTop: 8 }}>
                Under the name: <strong style={{ color: "#0B1029" }}>{fullName}</strong>
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              marginTop: 14,
              padding: "10px 12px",
              background: "#F9FAFB",
              borderRadius: 8,
            }}
          >
            <CalendarClock size={16} style={{ color: "#6B7280", marginTop: 2, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#0B1029", marginBottom: 2 }}>
                Free to reschedule or cancel
              </div>
              <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.5 }}>
                Need to change plans? You can reschedule or cancel up to 2 hours before your appointment, no fees, no questions. We'll send you a confirmation email and text with a one-click reschedule link.
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
            <button
              type="button"
              onClick={handleFinalConfirm}
              style={{
                width: "100%",
                minHeight: 52,
                background: "#E8670A",
                color: "#FFFFFF",
                border: 0,
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                cursor: "pointer",
                boxShadow: "0 2px 6px rgba(232,103,10,0.35)",
              }}
            >
              Confirm booking
            </button>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              style={{
                width: "100%",
                minHeight: 44,
                background: "transparent",
                color: "#5A6478",
                border: 0,
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              ← Change time
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GHLNeoCalendarMock;
