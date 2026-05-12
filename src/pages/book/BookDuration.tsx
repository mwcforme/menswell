import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarClock, CalendarDays, CalendarRange, History, ShieldCheck } from "lucide-react";
import BookLayout from "@/components/book/BookLayout";
import SurveyCard from "@/components/book/SurveyCard";
import OptionRow from "@/components/book/OptionRow";
import { useBookingSync, updateBookingState, toQueryString, type UrgencyTier } from "@/lib/bookingState";

const OPTIONS = [
  { value: "lt6mo", label: "Less than 6 months", icon: CalendarClock, urgency: "early" as UrgencyTier },
  { value: "6to12mo", label: "6 to 12 months", icon: CalendarDays, urgency: "building" as UrgencyTier },
  { value: "1to2yr", label: "1 to 2 years", icon: CalendarRange, urgency: "overdue" as UrgencyTier },
  { value: "gt2yr", label: "More than 2 years", icon: History, urgency: "long_overdue" as UrgencyTier },
] as const;

const BookDuration = () => {
  const navigate = useNavigate();
  const state = useBookingSync();
  const [selected, setSelected] = useState<string>(state.duration || "");
  const advanceTimer = useRef<number | null>(null);

  useEffect(() => {
    if (!state.symptom) {
      navigate("/book/symptom", { replace: true });
    }
  }, [state.symptom, navigate]);

  useEffect(() => () => {
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
  }, []);

  if (!state.symptom) return null;

  const handleSelect = (value: string, urgency: UrgencyTier) => {
    if (advanceTimer.current) return;
    setSelected(value);
    const next = updateBookingState({ duration: value, urgencyTier: urgency });
    advanceTimer.current = window.setTimeout(() => {
      navigate(`/book/schedule?${toQueryString(next)}`);
    }, 600);
  };

  const handlePrev = () => {
    navigate(`/book/symptom?${toQueryString(state)}`);
  };

  return (
    <BookLayout page="duration" title="How long has this been going on? | Men's Wellness Centers">
      <SurveyCard
        progressLabel="Almost done. 2 quick questions"
        filledSegments={2}
        totalSegments={3}
        title="How long has this been going on?"
        subtitle="A rough estimate is fine."
        prevLabel="Back"
        onPrev={handlePrev}
      >
        {/* Reassurance banner */}
        <div
          className="flex items-start gap-3 p-3 mb-3"
          style={{
            background: "#FFF7ED",
            borderLeft: "4px solid #F97316",
            borderRadius: 8,
          }}
        >
          <ShieldCheck size={20} style={{ color: "#E8670A", flexShrink: 0, marginTop: 2 }} />
          <p
            style={{
              fontSize: 14,
              color: "#3A4258",
              fontFamily: "Inter, sans-serif",
              lineHeight: 1.45,
              margin: 0,
            }}
          >
            Most men wait over 2 years to get help. You're not alone. Let's fix that today.
          </p>
        </div>

        {OPTIONS.map((o) => (
          <OptionRow
            key={o.value}
            icon={o.icon}
            label={o.label}
            selected={selected === o.value}
            onClick={() => handleSelect(o.value, o.urgency)}
          />
        ))}
      </SurveyCard>
    </BookLayout>
  );
};

export default BookDuration;
