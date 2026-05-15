import { useEffect, useRef, useState } from "react";
import { Check, Calendar } from "lucide-react";
import confetti from "canvas-confetti";

interface Props {
  firstName: string;
  apptTime: string;
  /** Raw ISO string for calendar link generation */
  apptIso?: string;
  locationCity: string;
  locationAddress?: string;
}

const STORAGE_KEY = "mwc_booking_celebrated";

const buildCalendarLinks = (iso: string, title: string, location: string) => {
  const start = new Date(iso);
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const google = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${fmt(start)}/${fmt(end)}&location=${encodeURIComponent(location)}&details=${encodeURIComponent("Your no-cost consultation at Men's Wellness Centers.")}`;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    "DESCRIPTION:Your no-cost consultation at Men's Wellness Centers.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const icsUrl = `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
  return { google, ics: icsUrl };
};

const BookedCelebrationCard = ({ firstName, apptTime, apptIso, locationCity, locationAddress }: Props) => {
  const [animateIn, setAnimateIn] = useState(false);
  const [drawCheck, setDrawCheck] = useState(false);
  const [glow, setGlow] = useState(false);
  const firedRef = useRef(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setAnimateIn(true);
      setDrawCheck(true);
      return;
    }

    const t1 = window.setTimeout(() => setAnimateIn(true), 20);

    const alreadyCelebrated = sessionStorage.getItem(STORAGE_KEY) === "1";
    if (alreadyCelebrated) {
      setDrawCheck(true);
      return () => window.clearTimeout(t1);
    }

    if (firedRef.current) return;
    firedRef.current = true;
    sessionStorage.setItem(STORAGE_KEY, "1");

    const t2 = window.setTimeout(() => setDrawCheck(true), 220);
    const t3 = window.setTimeout(() => setGlow(true), 820);
    const t4 = window.setTimeout(() => setGlow(false), 820 + 1500);

    const t5 = window.setTimeout(() => {
      try {
        confetti({
          particleCount: 110,
          spread: 75,
          startVelocity: 42,
          gravity: 1.1,
          decay: 0.92,
          ticks: 200,
          origin: { x: 0.5, y: 0.18 },
          colors: ["#E8670A", "#F97316", "#FFFFFF", "#FCD9B4"],
          disableForReducedMotion: true,
          scalar: 0.95,
        });
      } catch {
        /* no-op */
      }
    }, 250);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
      window.clearTimeout(t5);
    };
  }, []);

  const personalized =
    firstName && firstName.length >= 2
      ? `You're all set, ${firstName}.`
      : "You're all set.";

  const calTitle = "MWC Consultation";
  const calLocation = locationAddress || `${locationCity} clinic`;
  const calLinks = apptIso ? buildCalendarLinks(apptIso, calTitle, calLocation) : null;

  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid rgba(11,16,41,0.08)",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 20px 50px rgba(0,0,0,0.28)",
        opacity: animateIn ? 1 : 0,
        transform: animateIn ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 400ms ease-out, transform 400ms ease-out",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Green accent bar at top */}
      <div style={{ height: 5, background: "linear-gradient(90deg, #16A34A 0%, #4ADE80 100%)" }} />

      <div
        className="flex flex-col items-center text-center"
        style={{ padding: "36px 24px 32px" }}
      >
        {/* Check circle — larger, prominent */}
        <div
          aria-hidden
          style={{
            width: 80,
            height: 80,
            borderRadius: 999,
            background: "rgba(34,197,94,0.10)",
            border: "2px solid rgba(34,197,94,0.30)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
            boxShadow: glow
              ? "0 0 0 10px rgba(34,197,94,0.06), 0 0 40px 6px rgba(34,197,94,0.28)"
              : "none",
            transition: "box-shadow 1500ms ease-out",
          }}
        >
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12.5L10 17.5L19 7.5"
              stroke="#22C55E"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 28,
                strokeDashoffset: drawCheck ? 0 : 28,
                transition: "stroke-dashoffset 600ms ease-out",
              }}
            />
          </svg>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: "Oswald, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(26px, 5vw, 38px)",
            color: "#0B1029",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            lineHeight: 1.05,
            marginBottom: 6,
          }}
        >
          Appointment Confirmed
        </h1>

        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: 16,
            color: "#5B6478",
            marginBottom: 20,
          }}
        >
          {personalized}
        </p>

        {/* Appointment date/time block — visually distinct */}
        <div
          style={{
            background: "#F8F9FC",
            border: "1px solid rgba(11,16,41,0.09)",
            borderRadius: 12,
            padding: "16px 20px",
            marginBottom: 20,
            width: "100%",
            maxWidth: 440,
          }}
        >
          <p
            style={{
              fontFamily: "Oswald, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(19px, 3.5vw, 24px)",
              color: "#0B1029",
              letterSpacing: "0.02em",
              marginBottom: 4,
              lineHeight: 1.2,
            }}
          >
            {apptTime}
          </p>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: 13,
              color: "#5B6478",
              margin: 0,
            }}
          >
            {locationCity} clinic · In person
          </p>
        </div>

        {/* Status pills */}
        <div
          className="flex flex-wrap items-center justify-center gap-2"
          style={{ marginBottom: 24 }}
        >
          {["Confirmation sent", "No-cost, no obligation"].map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5"
              style={{
                background: "rgba(22,163,74,0.08)",
                border: "1px solid rgba(22,163,74,0.22)",
                color: "#15803D",
                borderRadius: 999,
                padding: "5px 12px",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                fontFamily: "Inter, sans-serif",
                whiteSpace: "nowrap",
              }}
            >
              <Check size={11} strokeWidth={3} style={{ color: "#22C55E", flexShrink: 0 }} />
              {label}
            </span>
          ))}
        </div>

        {/* Add to Calendar — full-width on mobile, side-by-side on sm+ */}
        {calLinks && (
          <div
            className="flex flex-col sm:flex-row gap-3 w-full"
            style={{ maxWidth: 460 }}
          >
            <a
              href={calLinks.google}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2"
              style={{
                background: "#E8670A",
                color: "#FFFFFF",
                borderRadius: 10,
                padding: "14px 16px",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.02em",
                textDecoration: "none",
                fontFamily: "Inter, sans-serif",
                minHeight: 52,
              }}
            >
              <Calendar size={16} strokeWidth={2.5} />
              Google Calendar
            </a>
            <a
              href={calLinks.ics}
              download="mwc-appointment.ics"
              className="flex-1 inline-flex items-center justify-center gap-2"
              style={{
                background: "#FFFFFF",
                color: "#0B1029",
                border: "1.5px solid rgba(11,16,41,0.18)",
                borderRadius: 10,
                padding: "14px 16px",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.02em",
                textDecoration: "none",
                fontFamily: "Inter, sans-serif",
                minHeight: 52,
              }}
            >
              <Calendar size={16} strokeWidth={2.5} />
              Apple / Outlook
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookedCelebrationCard;
