import { useState } from "react";
import { Lock, Stethoscope, Clock, ArrowRight, ChevronLeft, ChevronRight, Check } from "lucide-react";

interface StepThreeProps {
  firstName: string;
  phone: string;
  email: string;
  location: string;
  onNext: (data: { selectedDate: string; selectedTime: string }) => void;
}

const trustItems = [
  { icon: Lock, label: "Private & discreet" },
  { icon: Stethoscope, label: "Physician supervised" },
  { icon: Clock, label: "60-min consultation" },
];

const timeSlots = ["9:00 AM", "10:30 AM", "1:00 PM", "3:30 PM"];

const generateCalendar = () => {
  const firstDay = 0; // March 2026 starts on Sunday
  const daysInMonth = 31;
  const days: Array<{ day: number; available: boolean } | null> = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push({ day: d, available: true });
  return days;
};

const calendarDays = generateCalendar();
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const StepThree = ({ firstName, phone, email, location, onNext }: StepThreeProps) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [smsConsent, setSmsConsent] = useState(true);

  const canSubmit = selectedDate !== null && selectedTime;

  return (
    <div className="min-h-[calc(100vh-60px)]" style={{ backgroundColor: "#EBEAE8" }}>
      <div className="mx-auto max-w-[560px] px-5 py-8">
        {/* Urgency banner */}
        <div className="mb-6 rounded-lg py-2.5 text-center text-sm font-medium" style={{ backgroundColor: "#E8670A", color: "#fff" }}>
          Appointments are available today.
        </div>

        <h2
          className="mb-2 text-center uppercase"
          style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 800, fontStyle: "italic", fontSize: "clamp(1.3rem, 4vw, 2rem)", color: "#1A1A2E", transform: "skewX(-3deg)" }}
        >
          Your Personalized Consultation Is Ready
        </h2>
        <p className="mb-6 text-center text-sm" style={{ color: "#6B7280" }}>
          Select a time at our {location} center below.
        </p>

        {/* Calendar card */}
        <div className="mb-6 overflow-hidden rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <ChevronLeft className="h-5 w-5 cursor-pointer" style={{ color: "#6B7280" }} />
            <span className="text-sm font-semibold" style={{ color: "#1A1A2E" }}>March 2026</span>
            <ChevronRight className="h-5 w-5 cursor-pointer" style={{ color: "#6B7280" }} />
          </div>

          <div className="mb-2 grid grid-cols-7 text-center">
            {weekDays.map((d) => (
              <span key={d} className="text-xs font-medium" style={{ color: "#9CA3AF" }}>{d}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((cell, i) => {
              if (!cell) return <div key={i} />;
              const isSelected = selectedDate === cell.day;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={!cell.available}
                  onClick={() => cell.available && setSelectedDate(cell.day)}
                  className="relative flex h-9 items-center justify-center rounded-lg text-sm transition-all"
                  style={{
                    backgroundColor: isSelected ? "#E8670A" : "transparent",
                    color: isSelected ? "#fff" : cell.available ? "#1A1A2E" : "#D1D5DB",
                    cursor: cell.available ? "pointer" : "default",
                    fontWeight: isSelected ? 600 : 400,
                  }}
                >
                  {cell.day}
                  {cell.available && !isSelected && (
                    <span className="absolute bottom-1 h-1 w-1 rounded-full" style={{ backgroundColor: "#E8670A" }} />
                  )}
                </button>
              );
            })}
          </div>

          {selectedDate && (
            <div className="mt-5 animate-fade-in border-t pt-4" style={{ borderColor: "#F3F4F6" }}>
              <p className="mb-3 text-xs font-medium uppercase" style={{ color: "#6B7280", letterSpacing: "0.08em" }}>Available Times</p>
              <div className="flex flex-wrap gap-2">
                {timeSlots.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTime(t)}
                    className="rounded-full px-4 py-2 text-sm font-medium transition-all"
                    style={{
                      backgroundColor: selectedTime === t ? "#E8670A" : "transparent",
                      color: selectedTime === t ? "#fff" : "#1A1A2E",
                      border: selectedTime === t ? "1px solid #E8670A" : "1px solid #D1D5DB",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pre-populated info */}
        <div className="mb-4 rounded-xl px-4 py-3" style={{ backgroundColor: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.06)" }}>
          <p className="text-xs" style={{ color: "#6B7280" }}>
            Booking for: <strong style={{ color: "#1A1A2E" }}>{firstName}</strong> · {phone} · {email}
          </p>
        </div>

        {/* SMS consent */}
        <label className="mb-6 flex cursor-pointer items-start gap-3">
          <div
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded"
            style={{ backgroundColor: smsConsent ? "#E8670A" : "transparent", border: smsConsent ? "none" : "2px solid #9CA3AF" }}
            onClick={() => setSmsConsent(!smsConsent)}
          >
            {smsConsent && <Check className="h-3 w-3 text-white" />}
          </div>
          <div>
            <p className="text-sm" style={{ color: "#1A1A2E" }}>Send me appointment reminders via text</p>
            <p className="text-xs" style={{ color: "#9CA3AF" }}>We'll send you a text confirmation and reminder. Reply STOP to opt out.</p>
          </div>
        </label>

        {/* Trust badges */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
          {trustItems.map((b) => (
            <div key={b.label} className="flex items-center gap-1.5" style={{ color: "#6B7280", fontSize: 11, letterSpacing: "0.06em" }}>
              <b.icon className="h-3.5 w-3.5" />
              <span className="uppercase">{b.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => canSubmit && onNext({ selectedDate: `March ${selectedDate}, 2026`, selectedTime })}
          disabled={!canSubmit}
          className="flex w-full items-center justify-center gap-2 font-bold transition-all"
          style={{
            height: 56, borderRadius: 9999, backgroundColor: canSubmit ? "#000033" : "rgba(0,0,0,0.15)",
            color: canSubmit ? "#fff" : "rgba(0,0,0,0.4)", fontSize: 16, cursor: canSubmit ? "pointer" : "not-allowed", border: "none",
          }}
          onMouseEnter={(e) => { if (canSubmit) e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
        >
          Confirm Appointment <ArrowRight className="h-4 w-4" />
        </button>

        {/* Below the fold */}
        <div className="mt-16 text-center">
          <p className="mb-8 uppercase" style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 800, fontStyle: "italic", fontSize: "clamp(1.1rem, 3vw, 1.6rem)", color: "#1A1A2E", transform: "skewX(-3deg)" }}>
            No Pressure. Just Answers.
          </p>
          <div className="space-y-4 text-left">
            {[
              { n: "1", title: "Quick health review", desc: "Your physician reviews your lab work and health history" },
              { n: "2", title: "Honest conversation", desc: "No sales pitch, just clinical recommendations" },
              { n: "3", title: "Your decision", desc: "Start treatment same day or take time to decide" },
            ].map((item) => (
              <div key={item.n} className="flex gap-4 rounded-xl bg-white p-4 shadow-sm">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold" style={{ backgroundColor: "#E8670A", color: "#fff" }}>
                  {item.n}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#1A1A2E" }}>{item.title}</p>
                  <p className="text-xs" style={{ color: "#6B7280" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepThree;
