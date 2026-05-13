import { useNavigate } from "react-router-dom";
import { Phone } from "lucide-react";
import BookLayout from "@/components/book/BookLayout";
import GHLDayView from "@/components/book/GHLDayView";
import { useBookingSync, updateBookingState, toQueryString, type UrgencyTier } from "@/lib/bookingState";
import { CENTER_CALENDARS, type LocationKey } from "@/lib/ghlCalendars";

const PHONE_DISPLAY = "(866) 344-4955";
const PHONE_TEL = "tel:8663444955";

const SERVICE_LABEL: Record<string, string> = {
  energy: "TRT consult",
  sexual: "men's sexual health consult",
  weight: "medical weight loss consult",
  other: "consultation",
};

const URGENCY_SUB: Record<UrgencyTier, string> = {
  early: "60-minute in-person visit at our Virginia clinic.",
  building: "60-minute in-person visit at our Virginia clinic.",
  overdue: "60-minute in-person visit at our Virginia clinic.",
  long_overdue: "60-minute in-person visit at our Virginia clinic.",
};

const BookSchedule = () => {
  const navigate = useNavigate();
  const state = useBookingSync();

  const serviceLabel = SERVICE_LABEL[state.symptom || "other"] || SERVICE_LABEL.other;
  const subhead = state.urgencyTier
    ? URGENCY_SUB[state.urgencyTier]
    : "Pick a time that works for you. Most visits run about 60 minutes.";

  const trackCallClick = () => {
    const w = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
    if (typeof window !== "undefined" && w.dataLayer) {
      w.dataLayer.push({ event: "phone_click", page: "schedule" });
    }
  };

  const [firstName = "", ...lastParts] = (state.name || "").trim().split(/\s+/);
  const lastName = lastParts.join(" ");


  return (
    <BookLayout page="schedule" title="Pick your consult time | Men's Wellness Centers">
      <div className="px-3 md:px-6 py-4 md:py-8 space-y-4 md:space-y-6 pb-28 md:pb-12">


        {/* 3/3 progress bar */}
        <div className="mx-auto w-full" style={{ maxWidth: 720 }}>
          <div
            className="text-center mb-2"
            style={{
              fontSize: 13,
              color: "#FFFFFF",
              letterSpacing: "0.08em",
              fontWeight: 700,
              fontFamily: "Inter, sans-serif",
              textTransform: "uppercase",
            }}
          >
            Last step. Pick a time
          </div>
          <div className="flex gap-2" role="progressbar" aria-valuemin={0} aria-valuemax={3} aria-valuenow={3}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex-1"
                style={{ height: 8, borderRadius: 4, background: "#E8670A" }}
              />
            ))}
          </div>
        </div>

        {/* Personalized header */}
        <section
          className="mx-auto text-center"
          style={{ maxWidth: 720, color: "#FFFFFF" }}
        >
          <h1
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(22px, 2.8vw, 28px)",
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
              marginBottom: 8,
              color: "#FFFFFF",
              textTransform: "none",
            }}
          >
            Schedule your {serviceLabel}.
          </h1>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 17,
              color: "#E5E7EB",
              lineHeight: 1.55,
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            {subhead}
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

      </div>

      {/* Sticky mobile tap-to-call */}
      <a
        href={PHONE_TEL}
        onClick={trackCallClick}
        aria-label={`Call ${PHONE_DISPLAY} to book by phone`}
        className="md:hidden fixed inset-x-0 bottom-0 flex items-center justify-center gap-3 z-50"
        style={{
          background: "#E8670A",
          color: "#FFFFFF",
          fontFamily: "Inter, sans-serif",
          fontWeight: 700,
          fontSize: 22,
          textDecoration: "none",
          minHeight: 72,
          padding: "16px 20px",
          paddingBottom: "max(16px, env(safe-area-inset-bottom))",
          boxShadow: "0 -4px 12px rgba(0,0,0,0.25)",
        }}
      >
        <Phone size={24} strokeWidth={2.5} />
        <span>CALL {PHONE_DISPLAY}</span>
      </a>
    </BookLayout>
  );
};

export default BookSchedule;
