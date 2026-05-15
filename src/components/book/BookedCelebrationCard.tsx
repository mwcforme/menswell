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
  const end = new Date(start.getTime() + 60 * 60 * 1000); // 60 min
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const google = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${fmt(start)}/${fmt(end)}&location=${encodeURIComponent(location)}&details=${encodeURIComponent("Your no-cost consultation at Men's Wellness Centers.")}` ;
  // ICS blob for Apple/Outlook
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

    // Card slide-in always plays per mount.
    const t1 = window.setTimeout(() => setAnimateIn(true), 20);

    const alreadyCelebrated = sessionStorage.getItem(STORAGE_KEY) === "1";
    if (alreadyCelebrated) {
      setDrawCheck(true);
      return () => window.clearTimeout(t1);
    }

    if (firedRef.current) return;
    firedRef.current = true;
    sessionStorage.setItem(STORAGE_KEY, "1");

    // Check draws after card starts settling.
    const t2 = window.setTimeout(() => setDrawCheck(true), 220);
    const t3 = window.setTimeout(() => setGlow(true), 820);
    const t4 = window.setTimeout(() => setGlow(false), 820 + 1500);

    // Confetti burst.
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

  const personalized = firstName && firstName.length >= 2
    ? `You're all set, ${firstName}.`
    : "You're all set.";

  const calTitle = "MWC Consultation";
  const calLocation = locationAddress || `${locationCity} clinic`;
  const calLinks = apptIso ? buildCalendarLinks(apptIso, calTitle, calLocation) : null;

  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid rgba(11,16,41,0.10)",
        borderRadius: 16,
        padding: "40px 28px",
        boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
        opacity: animateIn ? 1 : 0,
        transform: animateIn ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 400ms ease-out, transform 400ms ease-out",
        fontFamily: "Inter, sans-serif",
      }}
      className="md:!p-[56px_48px] flex flex-col items-center text-center"
    >
      {/* Animated check */}
      <div
        aria-hidden
        style={{
          position: "relative",
          width: 64,
          height: 64,
          borderRadius: 999,
          background: "rgba(34,197,94,0.10)",
          border: "1px solid rgba(34,197,94,0.40)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
          boxShadow: glow
            ? "0 0 0 0 rgba(34,197,94,0), 0 0 48px 8px rgba(34,197,94,0.40)"
            : "0 0 0 0 rgba(34,197,94,0), 0 0 18px 0 rgba(34,197,94,0.12)",
          transition: "box-shadow 1500ms ease-out",
        }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12.5L10 17.5L19 7.5"
            stroke="#22C55E"
            strokeWidth="2.6"
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

      <h1
        style={{
          fontFamily: "Oswald, sans-serif",
          fontWeight: 600,
          fontSize: "clamp(28px, 4.4vw, 40px)",
          color: "#0B1029",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          lineHeight: 1.1,
          marginBottom: 12,
        }}
      >
        Appointment Confirmed
      </h1>

      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
          fontSize: 18,
          color: "#3A4258",
          marginBottom: 14,
        }}
      >
        {personalized}
      </p>

      <p
        style={{
          fontFamily: "Oswald, sans-serif",
          fontWeight: 600,
          fontSize: "clamp(20px, 2.6vw, 28px)",
          color: "#0B1029",
          letterSpacing: "0.02em",
          marginBottom: 8,
          lineHeight: 1.2,
        }}
      >
        {apptTime}
      </p>

      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
          fontSize: 16,
          color: "#5B6478",
          marginBottom: 22,
        }}
      >
        {locationCity} clinic, in person
      </p>

      {/* Status pills */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-6">
        {[
          "Confirmation sent",
          "No-cost, no obligation",
        ].map((label) => (
          <span
            key={label}
            className="inline-flex items-center gap-1.5 whitespace-nowrap"
            style={{
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.30)",
              color: "#166534",
              borderRadius: 999,
              padding: "7px 14px",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontFamily: "Inter, sans-serif",
              lineHeight: 1.2,
            }}
          >
            <Check size={12} strokeWidth={3} style={{ color: "#22C55E", flexShrink: 0 }} />
            {label}
          </span>
        ))}
      </div>

      {/* Add to Calendar buttons */}
      {calLinks && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={calLinks.google}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2"
            style={{
              background: "#0B1029",
              color: "#FFFFFF",
              borderRadius: 8,
              padding: "11px 20px",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.04em",
              textDecoration: "none",
              fontFamily: "Inter, sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            <Calendar size={15} strokeWidth={2.5} />
            Add to Google Calendar
          </a>
          <a
            href={calLinks.ics}
            download="mwc-appointment.ics"
            className="inline-flex items-center gap-2"
            style={{
              background: "transparent",
              color: "#0B1029",
              border: "1.5px solid rgba(11,16,41,0.25)",
              borderRadius: 8,
              padding: "11px 20px",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.04em",
              textDecoration: "none",
              fontFamily: "Inter, sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            <Calendar size={15} strokeWidth={2.5} />
            Add to Apple / Outlook
          </a>
        </div>
      )}
    </div>
  );
};

export default BookedCelebrationCard;
