import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import BookLayout from "@/components/book/BookLayout";
import GHLAccordionView from "@/components/book/GHLAccordionView";
import { useBookingSync, updateBookingState, toQueryString } from "@/lib/bookingState";
import { CENTER_CALENDARS, type LocationKey } from "@/lib/ghlCalendars";

const LOCATION_LABEL: Record<string, string> = {
  richmond: "Richmond clinic",
  "virginia-beach": "Virginia Beach clinic",
  "newport-news": "Newport News clinic",
};

const firstNameOnly = (name?: string): string => {
  if (!name) return "";
  try {
    const decoded = decodeURIComponent(name);
    return decoded.trim().split(/\s+/)[0] || "";
  } catch {
    return name.trim().split(/\s+/)[0] || "";
  }
};

const BookSchedule2 = () => {
  const navigate = useNavigate();
  const state = useBookingSync();

  const [firstName = "", ...lastParts] = (state.name || "").trim().split(/\s+/);
  const lastName = lastParts.join(" ");
  const personalFirstName = firstNameOnly(state.name);

  const heading = personalFirstName ? `${personalFirstName}, pick a time.` : `Pick a time.`;

  const goBack = () => {
    const qs = toQueryString(state);
    navigate(`/book/duration${qs ? `?${qs}` : ""}`);
  };

  const locationLine = state.location ? LOCATION_LABEL[state.location] : null;
  const metaLine = [locationLine, "60-min consult", "No charge today"].filter(Boolean).join(" · ");

  return (
    <BookLayout page="schedule" title="Pick your consult time | Men's Wellness Centers">
      <div className="px-3 md:px-6 py-2 md:py-8 space-y-2 md:space-y-6 pb-12">
        <div className="mx-auto w-full" style={{ maxWidth: 720 }}>
          <button
            type="button"
            onClick={goBack}
            className="flex items-center gap-1"
            style={{
              background: "transparent", border: 0, color: "#FFFFFF",
              fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600,
              opacity: 0.85, cursor: "pointer", padding: "4px 0",
            }}
            aria-label="Back to previous step"
          >
            <ArrowLeft size={14} /> Back
          </button>
          <div className="flex gap-1 mt-2" role="progressbar" aria-label="Step 3 of 3" aria-valuemin={0} aria-valuemax={3} aria-valuenow={3}>
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex-1" style={{ height: 3, borderRadius: 2, background: "#E8670A" }} />
            ))}
          </div>
        </div>

        <section className="mx-auto text-center" style={{ maxWidth: 720, color: "#FFFFFF" }}>
          <h1
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(18px, 2.6vw, 26px)",
              lineHeight: 1.2,
              marginBottom: 4,
              color: "#FFFFFF",
            }}
          >
            {heading}
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#9CA3AF", margin: 0 }}>
            {metaLine}
          </p>
        </section>

        <section className="mx-auto" aria-label="Pick a date and time" style={{ maxWidth: 480 }}>
          {state.location && state.location in CENTER_CALENDARS ? (
            <GHLAccordionView
              location={state.location as LocationKey}
              firstName={firstName}
              lastName={lastName}
              email={state.email}
              phone={state.phone}
              source={state.source || "mwc-book-funnel"}
              notes={[
                state.symptom && `Concern: ${state.symptom}`,
                state.duration && `Duration: ${state.duration}`,
                state.urgencyTier && `Urgency: ${state.urgencyTier}`,
                state.note,
              ].filter(Boolean).join(" | ")}
              onBooked={(slotIso) => {
                const next = updateBookingState({ appointmentTime: slotIso });
                navigate(`/book/confirmed?${toQueryString(next)}`);
              }}
            />
          ) : (
            <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 12, padding: 20, fontFamily: "Inter, sans-serif" }}>
              <div style={{ fontSize: 13, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 700, marginBottom: 10 }}>
                Choose your center
              </div>
              <div className="grid gap-2">
                {Object.values(CENTER_CALENDARS).map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => updateBookingState({ location: c.key })}
                    style={{ padding: "14px 16px", borderRadius: 8, border: "1px solid #D1D5DB", background: "#FFFFFF", color: "#0B1029", fontSize: 16, fontWeight: 600, textAlign: "left", cursor: "pointer" }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </BookLayout>
  );
};

export default BookSchedule2;
