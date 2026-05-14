import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import BookLayout from "@/components/book/BookLayout";
import GHLDayView from "@/components/book/GHLDayView";
import { useBookingSync, updateBookingState, toQueryString, type UrgencyTier } from "@/lib/bookingState";
import { CENTER_CALENDARS, type LocationKey } from "@/lib/ghlCalendars";

const SERVICE_LABEL: Record<string, string> = {
  energy: "TRT consult",
  sexual: "men's sexual health consult",
  weight: "medical weight loss consult",
  other: "consultation",
};

const SYMPTOM_CHIP: Record<string, string> = {
  energy: "⚡ Energy & focus",
  sexual: "💪 Sexual health",
  weight: "⚖ Weight & body comp",
  other: "🩺 General wellness",
};

const LOCATION_LABEL: Record<string, string> = {
  richmond: "Richmond clinic",
  "virginia-beach": "Virginia Beach clinic",
  "newport-news": "Newport News clinic",
};

const LOCATION_CHIP: Record<string, string> = {
  richmond: "📍 Richmond",
  "virginia-beach": "📍 Virginia Beach",
  "newport-news": "📍 Newport News",
};

const URGENCY_SUB: Record<UrgencyTier, string> = {
  early: "60-minute in-person visit at our Virginia clinic.",
  building: "60-minute in-person visit at our Virginia clinic.",
  overdue: "60-minute in-person visit at our Virginia clinic.",
  long_overdue: "60-minute in-person visit at our Virginia clinic.",
};

// First name only, URL-decoded. React text-node escaping handles XSS.
const firstNameOnly = (name?: string): string => {
  if (!name) return "";
  try {
    const decoded = decodeURIComponent(name);
    return decoded.trim().split(/\s+/)[0] || "";
  } catch {
    return name.trim().split(/\s+/)[0] || "";
  }
};

const BookSchedule = () => {
  const navigate = useNavigate();
  const state = useBookingSync();

  const serviceLabel = SERVICE_LABEL[state.symptom || "other"] || SERVICE_LABEL.other;
  const subhead = state.urgencyTier
    ? URGENCY_SUB[state.urgencyTier]
    : "60-minute in-person visit at our Virginia clinic.";

  const [firstName = "", ...lastParts] = (state.name || "").trim().split(/\s+/);
  const lastName = lastParts.join(" ");
  const personalFirstName = firstNameOnly(state.name);

  const heading = personalFirstName
    ? `${personalFirstName}, pick a time that works.`
    : `Pick a time that works.`;

  const contextChips = [
    state.location ? LOCATION_CHIP[state.location] : null,
    state.symptom ? SYMPTOM_CHIP[state.symptom] : null,
    "🕒 60 min · $0 today",
  ].filter(Boolean) as string[];

  const goBack = () => {
    const qs = toQueryString(state);
    navigate(`/book/duration${qs ? `?${qs}` : ""}`);
  };

  const locationLine = state.location ? LOCATION_LABEL[state.location] : null;
  const metaLine = [locationLine, "60-min consult", "No charge today"]
    .filter(Boolean)
    .join(" · ");

  return (
    <BookLayout page="schedule" title="Pick your consult time | Men's Wellness Centers">
      <div className="px-3 md:px-6 py-2 md:py-8 space-y-2 md:space-y-6 pb-12">

        {/* Compact mobile header: Back + progress in one row */}
        <div className="mx-auto w-full" style={{ maxWidth: 720 }}>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={goBack}
              className="flex items-center gap-1 shrink-0"
              style={{
                background: "transparent", border: 0, color: "#FFFFFF",
                fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600,
                opacity: 0.85, cursor: "pointer", padding: "4px 0",
              }}
              aria-label="Back to previous step"
            >
              <ArrowLeft size={14} /> Back
            </button>
            <div
              className="flex gap-1 flex-1"
              role="progressbar"
              aria-label="Step 3 of 3"
              aria-valuemin={0}
              aria-valuemax={3}
              aria-valuenow={3}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="flex-1"
                  style={{ height: 3, borderRadius: 2, background: "#E8670A" }}
                />
              ))}
            </div>
          </div>
          {/* Desktop-only step label */}
          <div
            className="hidden md:block text-center mt-3"
            style={{
              fontSize: 12,
              color: "#FFFFFF",
              letterSpacing: "0.08em",
              fontWeight: 700,
              fontFamily: "Inter, sans-serif",
              textTransform: "uppercase",
            }}
          >
            Step 3 of 3 · Pick your time
          </div>
        </div>

        {/* Headline + meta line (replaces hero + chips) */}
        <section
          className="mx-auto text-center"
          style={{ maxWidth: 720, color: "#FFFFFF" }}
        >
          <h1
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(18px, 2.6vw, 26px)",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              marginBottom: 4,
              color: "#FFFFFF",
              textTransform: "none",
            }}
          >
            {heading}
          </h1>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              color: "#9CA3AF",
              lineHeight: 1.4,
              margin: 0,
              letterSpacing: "0.01em",
            }}
          >
            {metaLine}
          </p>
        </section>

        {/* CALENDAR or location picker */}
        <section className="mx-auto" aria-label="Pick a date and time" style={{ maxWidth: 720 }}>
          {state.location && state.location in CENTER_CALENDARS ? (
            <GHLDayView
              location={state.location as LocationKey}
              firstName={firstName}
              lastName={lastName}
              email={state.email}
              phone={state.phone}
              source={state.source || "mwc-book-funnel"}
              urgencyTier={state.urgencyTier}
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
                {(Object.values(CENTER_CALENDARS)).map((c) => (
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

        {/* Desktop-only quiet support row; mobile relies on the floating
            phone button in the page header. */}
        <div
          className="hidden md:block mx-auto text-center"
          style={{ maxWidth: 720, color: "#FFFFFF", opacity: 0.85, fontSize: 13, fontFamily: "Inter, sans-serif" }}
        >
          Need help picking a time?{" "}
          <a
            href="tel:8663444955"
            style={{ color: "#FFFFFF", textDecoration: "underline", fontWeight: 600 }}
          >
            Call (866) 344-4955
          </a>
        </div>
      </div>
    </BookLayout>
  );
};

export default BookSchedule;
