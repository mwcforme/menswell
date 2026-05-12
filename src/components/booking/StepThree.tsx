import GHLDayView from "@/components/book/GHLDayView";
import type { LocationKey } from "@/lib/ghlCalendars";

interface StepThreeProps {
  firstName: string;
  phone: string;
  email: string;
  location: string;
  onNext: (data: { selectedDate: string; selectedTime: string }) => void;
}

// Map StepOne/StepTwo display label → GHL calendar key
const LOCATION_KEY: Record<string, LocationKey> = {
  "Richmond": "richmond",
  "Newport News": "newport-news",
  "Virginia Beach": "virginia-beach",
};

const StepThree = ({ firstName, phone, email, location, onNext }: StepThreeProps) => {
  const key = LOCATION_KEY[location] || "richmond";
  const [first, ...rest] = (firstName || "").trim().split(/\s+/);
  const lastName = rest.join(" ") || undefined;

  const handleBooked = (slotIso: string) => {
    const d = new Date(slotIso);
    const selectedDate = d.toLocaleDateString("en-US", {
      weekday: "long", month: "long", day: "numeric", year: "numeric",
      timeZone: "America/New_York",
    });
    const selectedTime = d.toLocaleTimeString("en-US", {
      hour: "numeric", minute: "2-digit", hour12: true,
      timeZone: "America/New_York",
    });
    onNext({ selectedDate, selectedTime });
  };

  return (
    <div className="min-h-[calc(100vh-60px)]" style={{ backgroundColor: "#EBEAE8" }}>
      <div className="mx-auto max-w-[680px] px-5 py-8">
        <h2
          className="mb-2 text-center uppercase"
          style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 800, fontStyle: "italic", fontSize: "clamp(1.3rem, 4vw, 2rem)", color: "#1A1A2E", transform: "skewX(-3deg)" }}
        >
          Pick A Time That Works For You
        </h2>
        <p className="mb-6 text-center text-sm" style={{ color: "#6B7280" }}>
          Real availability at our {location || "Virginia"} center.
        </p>

        <GHLDayView
          location={key}
          firstName={first || firstName || "Guest"}
          lastName={lastName}
          email={email || undefined}
          phone={phone || undefined}
          source="mwc-book-funnel-step3"
          onBooked={handleBooked}
        />
      </div>
    </div>
  );
};

export default StepThree;
