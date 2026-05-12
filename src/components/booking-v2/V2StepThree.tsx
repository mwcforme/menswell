import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Lock, Stethoscope, Zap } from "lucide-react";

interface V2StepCalendarProps {
  firstName: string;
  phone: string;
  email: string;
  locationLabel: string;
  onNext: (data: { selectedDate: string; selectedTime: string; smsReminder: boolean; email: string }) => void;
}

const font = "'Montserrat', sans-serif";
const headingFont = "'Bebas Neue', sans-serif";

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM",
];
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const noPressureCards = [
  { num: "1", title: "Quick health review", desc: "My physician reviews my lab work and health history." },
  { num: "2", title: "An honest conversation", desc: "No sales pitch. Just clinical recommendations based on my results." },
  { num: "3", title: "My decision", desc: "Start same day if I choose, or take time to decide. Zero pressure." },
];

const V2StepCalendar = ({ firstName, phone, email: initialEmail, locationLabel, onNext }: V2StepCalendarProps) => {
  const today = useMemo(() => new Date(), []);
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [smsReminder, setSmsReminder] = useState(true);
  const [email, setEmail] = useState(initialEmail || "");

  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const days: { day: number; available: boolean }[] = [];
    for (let i = 0; i < firstDay; i++) days.push({ day: 0, available: false });
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(viewYear, viewMonth, d);
      const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      days.push({ day: d, available: !isPast });
    }
    return days;
  }, [viewMonth, viewYear, today]);

  const isPrevDisabled = viewMonth === today.getMonth() && viewYear === today.getFullYear();

  const prevMonth = () => {
    if (isPrevDisabled) return;
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
    setSelectedDay(null); setSelectedTime("");
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
    setSelectedDay(null); setSelectedTime("");
  };

  const selectedDateStr = selectedDay
    ? new Date(viewYear, viewMonth, selectedDay).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
    : "";

  const isEmailValid = email.trim().length > 0 && email.includes("@") && email.includes(".");
  const dateTimePicked = !!selectedDay && !!selectedTime;
  const isValid = dateTimePicked && isEmailValid;

  return (
    <div className="flex flex-col items-center px-5 pt-6 md:pt-10" data-spec-id="step6-screen">
      {/* Urgency banner — outside white card */}
      <div className="mb-4 flex items-center justify-center gap-2" data-spec-id="step6-urgency">
        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#34D399" }} />
        <span style={{ fontFamily: font, fontWeight: 500, fontSize: 14, color: "#B8B6B2", letterSpacing: "0.02em" }}>
          Appointments available today
        </span>
      </div>

      {/* Trust signal — outside white card */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-3" data-spec-id="step6-trustrow" style={{ fontFamily: font, fontSize: 14, fontWeight: 500, color: "#B8B6B2" }}>
        <span className="flex items-center gap-1"><Lock className="h-3.5 w-3.5" /> Private &amp; Discreet</span>
        <span className="flex items-center gap-1"><Stethoscope className="h-3.5 w-3.5" /> Physician-Led</span>
        <span className="flex items-center gap-1"><Zap className="h-3.5 w-3.5" /> Results Same Day</span>
      </div>

      {/* White card */}
      <div
        className="w-full max-w-[480px] p-5 md:p-8"
        style={{ backgroundColor: "#FFFFFF", borderRadius: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}
      >
        <h1 className="mb-1 text-center uppercase" style={{ fontFamily: headingFont, fontSize: "clamp(24px, 5.5vw, 36px)", color: "#0B1029", letterSpacing: "0.05em" }}>
          Pick My Time
        </h1>
        <p className="mb-5 text-center" style={{ fontFamily: font, fontSize: 14, color: "#6B7280" }}>
          Select a time at our {locationLabel} center.
        </p>

        {/* Calendar */}
        <div className="mb-6 rounded-xl p-4" style={{ backgroundColor: "#F5F3F0", border: "1px solid #D1CCC5" }}>
          <div className="mb-4 flex items-center justify-between" data-spec-id="step6-monthnav">
            <button type="button" onClick={prevMonth} disabled={isPrevDisabled} className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ color: isPrevDisabled ? "#D1D5DB" : "#0B1029", cursor: isPrevDisabled ? "default" : "pointer", background: "none", border: "none" }} aria-label="Previous month">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span style={{ fontFamily: font, fontWeight: 600, fontSize: 16, color: "#0B1029" }}>
              {monthNames[viewMonth]} {viewYear}
            </span>
            <button type="button" onClick={nextMonth} className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ color: "#0B1029", cursor: "pointer", background: "none", border: "none" }} aria-label="Next month">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mb-2 grid grid-cols-7 text-center">
            {dayNames.map((d) => (
              <span key={d} style={{ fontFamily: font, fontWeight: 500, fontSize: 13, color: "#9CA3AF" }}>{d}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1" data-spec-id="step6-grid">
            {calendarDays.map((cell, i) => (
              <button
                key={i}
                type="button"
                disabled={!cell.available || cell.day === 0}
                onClick={() => { setSelectedDay(cell.day); setSelectedTime(""); }}
                className="relative flex h-10 w-full items-center justify-center rounded-lg transition-all"
                style={{
                  fontFamily: font, fontSize: 14, fontWeight: 400,
                  color: cell.day === 0 ? "transparent" : !cell.available ? "#D1D5DB" : selectedDay === cell.day ? "#fff" : "#0B1029",
                  backgroundColor: selectedDay === cell.day ? "#E8670A" : "transparent",
                  cursor: cell.available && cell.day > 0 ? "pointer" : "default",
                  border: "none",
                }}
                aria-label={cell.day > 0 ? `Select ${monthNames[viewMonth]} ${cell.day}` : undefined}
              >
                {cell.day > 0 && cell.day}
                {cell.available && cell.day > 0 && selectedDay !== cell.day && (
                  <div className="absolute bottom-1 h-1 w-1 rounded-full" style={{ backgroundColor: "#E8670A" }} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Time slots */}
        <div className="mb-6" data-spec-id="step6-times">
          <label className="mb-3 block uppercase" style={{ fontFamily: font, fontWeight: 600, fontSize: 13, color: "#9CA3AF", letterSpacing: "0.08em" }}>
            Available Times
          </label>
          {!selectedDay ? (
            <p className="text-center italic" style={{ fontFamily: font, fontSize: 15, color: "#9CA3AF" }}>
              Select a date above to see available times
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {timeSlots.map((t) => {
                const isSelected = selectedTime === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTime(t)}
                    className="transition-all"
                    style={{
                      minHeight: 44, paddingLeft: 16, paddingRight: 16,
                      borderRadius: 24,
                      fontFamily: font, fontWeight: 500, fontSize: 14,
                      color: isSelected ? "#fff" : "#0B1029",
                      cursor: "pointer",
                      backgroundColor: isSelected ? "#E8670A" : "#FFFFFF",
                      border: isSelected ? "2px solid #E8670A" : "2px solid #D1CCC5",
                    }}
                    aria-label={`Select time ${t}`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Hidden fields — name & phone already captured */}
        <input type="hidden" name="firstName" value={firstName} />
        <input type="hidden" name="phone" value={phone} />

        {/* Email — revealed after date + time selected */}
        {dateTimePicked && (
          <div className="mb-6" data-spec-id="step6-email">
            <label className="mb-2 block uppercase" style={{ fontFamily: font, fontWeight: 600, fontSize: 13, color: "#9CA3AF", letterSpacing: "0.08em" }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                height: 56, borderRadius: 10, backgroundColor: "#F5F3F0",
                border: "1px solid #D1CCC5", color: "#0B1029", padding: "14px 16px",
                fontSize: 16, width: "100%", outline: "none", fontFamily: font, fontWeight: 400,
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.06)",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(232,103,10,0.5)"; e.currentTarget.style.boxShadow = "inset 0 1px 2px rgba(0,0,0,0.06), 0 0 0 3px rgba(232,103,10,0.1)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#D1CCC5"; e.currentTarget.style.boxShadow = "inset 0 1px 2px rgba(0,0,0,0.06)"; }}
              aria-label="Email address"
            />
            <p style={{ fontFamily: font, fontSize: 13, color: "#9CA3AF", marginTop: 6 }}>
              We'll send your confirmation and appointment details here.
            </p>
          </div>
        )}

        {/* Booking summary */}
        <div className="mb-4 rounded-xl px-4 py-3" data-spec-id="step6-summary" style={{ backgroundColor: "#F5F3F0", border: "1px solid #D1CCC5" }}>
          <span style={{ fontFamily: font, fontSize: 15, color: "#6B7280" }}>
            Booking for: <strong style={{ color: "#0B1029" }}>{firstName || "-"}</strong>
            {selectedDateStr && <> · {selectedDateStr}</>}
            {selectedTime && <> · {selectedTime}</>}
          </span>
        </div>

        {/* SMS reminder */}
        <div className="mb-6 flex items-start gap-2" data-spec-id="step6-reminder">
          <input type="checkbox" checked={smsReminder} onChange={(e) => setSmsReminder(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0" style={{ accentColor: "#E8670A" }} id="sms-reminder-v2" aria-label="SMS reminder opt-in" />
          <div>
            <label htmlFor="sms-reminder-v2" style={{ fontFamily: font, fontSize: 15, color: "#4B5563" }}>Send me appointment reminders via text</label>
            <p style={{ fontFamily: font, fontSize: 13, color: "#9CA3AF", marginTop: 2 }}>We'll send a confirmation and reminder. Reply STOP to opt out.</p>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => isValid && onNext({ selectedDate: selectedDateStr, selectedTime, smsReminder, email: email.trim() })}
          disabled={!isValid}
          data-spec-id="step6-cta"
          className="flex w-full items-center justify-center gap-2 uppercase transition-all"
          style={{
            height: 56, borderRadius: 12, backgroundColor: "#E8670A", color: "#fff",
            fontFamily: font, fontWeight: 700, fontSize: 14, letterSpacing: "0.1em",
            cursor: isValid ? "pointer" : "default", opacity: isValid ? 1 : 0.4, border: "none", padding: "16px 24px",
          }}
          onMouseEnter={(e) => { if (isValid) e.currentTarget.style.boxShadow = "0 4px 20px rgba(232,103,10,0.3)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
          aria-label="Confirm my appointment"
        >
          {dateTimePicked ? "Confirm My Appointment" : "Pick a Date & Time"} <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* No Pressure section — outside white card, on dark bg */}
      <div className="w-full max-w-[480px] pt-8 pb-4" data-spec-id="step6-nopressure">
        <h2 className="mb-4 text-center uppercase" style={{ fontFamily: headingFont, fontSize: 20, color: "#fff", letterSpacing: "0.05em" }}>
          No Pressure. Just Answers.
        </h2>
        <div className="space-y-3">
          {noPressureCards.map((card) => (
            <div
              key={card.num}
              className="flex gap-4 rounded-2xl p-4"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <span style={{ fontFamily: headingFont, fontSize: 24, color: "#E8670A", lineHeight: 1 }}>{card.num}</span>
              <div>
                <p style={{ fontFamily: font, fontWeight: 600, fontSize: 14, color: "#fff", marginBottom: 4 }}>{card.title}</p>
                <p style={{ fontFamily: font, fontWeight: 400, fontSize: 14, color: "#B8B6B2" }}>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default V2StepCalendar;
