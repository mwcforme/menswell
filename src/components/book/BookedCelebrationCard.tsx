import { useEffect, useRef, useState } from "react";
import { Calendar } from "lucide-react";
import confetti from "canvas-confetti";

interface Props {
  firstName: string;
  apptTime: string;
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
  return { google, ics: `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}` };
};

const BookedCelebrationCard = ({ firstName, apptTime, apptIso, locationCity, locationAddress }: Props) => {
  const [animateIn, setAnimateIn] = useState(false);
  const firedRef = useRef(false);

  useEffect(() => {
    const t1 = window.setTimeout(() => setAnimateIn(true), 20);

    const alreadyCelebrated = sessionStorage.getItem(STORAGE_KEY) === "1";
    if (alreadyCelebrated) return () => window.clearTimeout(t1);

    if (firedRef.current) return;
    firedRef.current = true;
    sessionStorage.setItem(STORAGE_KEY, "1");

    const t2 = window.setTimeout(() => {
      try {
        confetti({
          particleCount: 90,
          spread: 60,
          startVelocity: 38,
          gravity: 1.1,
          decay: 0.92,
          ticks: 180,
          origin: { x: 0.5, y: 0.3 },
          colors: ["#E8670A", "#F97316", "#0B1029", "#D1D5DB"],
          disableForReducedMotion: true,
          scalar: 0.9,
        });
      } catch { /* no-op */ }
    }, 150);

    return () => { window.clearTimeout(t1); window.clearTimeout(t2); };
  }, []);

  const first = firstName && firstName.length >= 2 ? firstName : null;
  const calTitle = "MWC Consultation";
  const calLocation = locationAddress || `${locationCity} clinic`;
  const calLinks = apptIso ? buildCalendarLinks(apptIso, calTitle, calLocation) : null;

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 16,
        border: "1px solid #E5E7EB",
        padding: "40px 32px 36px",
        opacity: animateIn ? 1 : 0,
        transform: animateIn ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 350ms ease, transform 350ms ease",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Eyebrow */}
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#16A34A",
          marginBottom: 16,
        }}
      >
        ✓ &nbsp;Confirmed
      </p>

      {/* Main heading — left-aligned, no ALL CAPS AI feel */}
      <h1
        style={{
          fontFamily: "Oswald, sans-serif",
          fontWeight: 700,
          fontSize: "clamp(28px, 5vw, 42px)",
          color: "#0B1029",
          letterSpacing: "0.01em",
          lineHeight: 1.05,
          marginBottom: first ? 6 : 20,
          textTransform: "none",
        }}
      >
        You're booked{first ? `, ${first}` : ""}.
      </h1>

      {first && (
        <p style={{ fontSize: 16, color: "#6B7280", marginBottom: 24, fontWeight: 400 }}>
          We'll see you soon. A confirmation is on its way.
        </p>
      )}

      {/* Date / time — clean data row */}
      <div
        style={{
          borderTop: "1px solid #F3F4F6",
          borderBottom: "1px solid #F3F4F6",
          padding: "18px 0",
          marginBottom: 24,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <span
          style={{
            fontFamily: "Oswald, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(18px, 3vw, 22px)",
            color: "#0B1029",
            letterSpacing: "0.01em",
          }}
        >
          {apptTime}
        </span>
        <span style={{ fontSize: 14, color: "#6B7280", fontWeight: 500 }}>
          {locationCity} · In-person consultation · 60 min
        </span>
      </div>

      {/* Trust line — plain text, no pill theater */}
      <p style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 24, fontWeight: 400 }}>
        No-cost. No commitment. Bring a photo ID.
      </p>

      {/* Calendar buttons — understated, functional */}
      {calLinks && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <a
            href={calLinks.google}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              background: "#0B1029",
              color: "#FFFFFF",
              borderRadius: 8,
              padding: "13px 20px",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              fontFamily: "Inter, sans-serif",
              letterSpacing: "0.01em",
            }}
          >
            <Calendar size={15} strokeWidth={2} />
            Add to Google Calendar
          </a>
          <a
            href={calLinks.ics}
            download="mwc-appointment.ics"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              background: "#F9FAFB",
              color: "#374151",
              border: "1px solid #E5E7EB",
              borderRadius: 8,
              padding: "13px 20px",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              fontFamily: "Inter, sans-serif",
              letterSpacing: "0.01em",
            }}
          >
            <Calendar size={15} strokeWidth={2} />
            Apple Calendar / Outlook (.ics)
          </a>
        </div>
      )}
    </div>
  );
};

export default BookedCelebrationCard;
