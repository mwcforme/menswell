import { useEffect } from "react";
import { MapPin, Play, FlaskConical, ExternalLink, Clock } from "lucide-react";
import { useLocation } from "react-router-dom";
import BookLayout from "@/components/book/BookLayout";
import { useBookingStore } from "@/domain/booking/bookingStore";
import BookedCelebrationCard from "@/components/book/BookedCelebrationCard";

const EXPECT_VIDEO_SRC = "/videos/what-to-expect.mp4";

type CenterInfo = {
  city: string;
  centerName: string;
  street: string;
  cityStateZip: string;
  proximity: string;
  hours: string;
  phoneDisplay: string;
  phoneTel: string;
};

const CENTERS: Record<string, CenterInfo> = {
  "newport-news": {
    city: "Newport News",
    centerName: "Men's Wellness Centers, Newport News",
    street: "827 Diligence Drive, Suite 206",
    cityStateZip: "Newport News, VA 23606",
    proximity: "2 min from I-64",
    hours: "Mon-Sat 9:00 AM - 5:00 PM",
    phoneDisplay: "(757) 806-6263",
    phoneTel: "tel:7578066263",
  },
  "virginia-beach": {
    city: "Virginia Beach",
    centerName: "Men's Wellness Centers, Virginia Beach",
    street: "996 First Colonial Road",
    cityStateZip: "Virginia Beach, VA 23454",
    proximity: "3 min from I-264",
    hours: "Mon-Sat 9:00 AM - 5:00 PM",
    phoneDisplay: "(757) 806-6263",
    phoneTel: "tel:7578066263",
  },
  "richmond": {
    city: "Glen Allen",
    centerName: "Men's Wellness Centers, Richmond",
    street: "4050 Innslake Dr, Suite 360",
    cityStateZip: "Glen Allen, VA 23060",
    proximity: "5 min from I-64",
    hours: "Mon-Sat 9:00 AM - 5:00 PM",
    phoneDisplay: "(804) 346-4636",
    phoneTel: "tel:8043464636",
  },
};

const DEFAULT_CENTER = CENTERS["newport-news"];


const formatAppointment = (raw?: string): string => {
  if (!raw) return "Time to be confirmed";
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return "Time to be confirmed";
  const datePart = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "America/New_York",
  }).format(d);
  const timePart = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/New_York",
  }).format(d);
  return `${datePart}  ·  ${timePart} ET`;
};

const BookConfirmed = () => {
  const appointmentTime = useBookingStore((s) => s.appointmentTime);
  const routerLocation = useLocation();
  const navState = (routerLocation.state || {}) as { appointmentTime?: string };
  const effectiveAppt = appointmentTime || navState.appointmentTime;
  const location = useBookingStore((s) => s.location);
  const identity = useBookingStore((s) => s.identity);
  const apptTime = formatAppointment(effectiveAppt);
  const center = (location && CENTERS[location]) || DEFAULT_CENTER;
  const fullAddress = `${center.centerName}, ${center.street}, ${center.cityStateZip}`;
  const mapsQuery = encodeURIComponent(fullAddress);
  const PHONE_DISPLAY = center.phoneDisplay;
  const PHONE_TEL = center.phoneTel;
  const fullName = [identity?.firstName, identity?.lastName].filter(Boolean).join(" ");


  return (
    <BookLayout page="confirmed" variant="confirmation" title="You're booked | Men's Wellness Centers">
      <div
        className="px-4 md:px-8 py-6 md:py-10 pb-12"
        style={{ background: "#000814" }}
      >
        <div className="mx-auto flex flex-col gap-8 md:gap-10" style={{ maxWidth: 1100, fontFamily: "Inter, sans-serif" }}>

          {/* Status Header */}
          <div className="flex flex-col items-center text-center">
            <div
              className="flex items-center justify-center mb-4 md:mb-5"
              style={{
                width: 48,
                height: 48,
                borderRadius: 999,
                background: "rgba(34,197,94,0.10)",
                border: "1px solid rgba(34,197,94,0.45)",
                boxShadow: "0 0 24px rgba(34,197,94,0.18)",
              }}
            >
              <CheckCircle2 size={24} strokeWidth={2.5} style={{ color: "#22C55E" }} />
            </div>
            <h1
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 600,
                fontSize: "clamp(28px, 4.4vw, 40px)",
                color: "#FFFFFF",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                lineHeight: 1.1,
                marginBottom: 10,
              }}
            >
              Appointment Confirmed
            </h1>
            <div className="flex flex-col items-center gap-1.5">
              {fullName && (
                <span
                  className="text-base md:text-lg"
                  style={{ color: "#FFFFFF", fontFamily: "Inter, sans-serif", fontWeight: 600 }}
                >
                  {fullName}
                </span>
              )}
              <span
                className="text-lg md:text-xl"
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                {apptTime}
              </span>
            </div>
          </div>

          {/* Two-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">

            {/* Location Tile */}
            <div
              className="relative flex flex-col overflow-hidden"
              style={{
                background: "#FFFFFF",
                borderRadius: 14,
                padding: "32px 28px",
                border: "1px solid rgba(11,16,41,0.10)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
              }}
            >
              <h2
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(26px, 3vw, 34px)",
                  color: "#0B1029",
                  textTransform: "uppercase",
                  letterSpacing: "0.02em",
                  lineHeight: 1.05,
                  marginBottom: 8,
                }}
              >
                {center.city}
              </h2>
              <p
                style={{
                  color: "#5B6478",
                  fontSize: 15,
                  fontWeight: 500,
                  marginBottom: 18,
                }}
              >
                {center.centerName}
              </p>

              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <MapPin size={18} strokeWidth={2.5} style={{ color: "#E8670A", flexShrink: 0, marginTop: 2 }} />
                  <span
                    style={{
                      color: "#E8670A",
                      fontWeight: 700,
                      fontSize: 14,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {center.proximity}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={18} strokeWidth={2.5} style={{ color: "#E8670A", flexShrink: 0, marginTop: 3 }} />
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#0B1029",
                      fontWeight: 600,
                      fontSize: 16,
                      lineHeight: 1.4,
                      textDecoration: "underline",
                      textUnderlineOffset: 3,
                    }}
                  >
                    {center.street}<br />
                    {center.cityStateZip}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} strokeWidth={2.5} style={{ color: "#E8670A", flexShrink: 0, marginTop: 3 }} />
                  <span style={{ color: "#0B1029", fontSize: 16, fontWeight: 500 }}>
                    {center.hours}
                  </span>
                </div>
                <div
                  className="inline-flex items-center gap-1.5 self-start mt-1"
                  style={{
                    background: "rgba(34,197,94,0.10)",
                    border: "1px solid rgba(34,197,94,0.35)",
                    color: "#0F7A3A",
                    padding: "4px 10px",
                    borderRadius: 999,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  <FlaskConical size={12} strokeWidth={2.5} />
                  Same-Day Labs On Site
                </div>
              </div>

              <div
                className="relative mt-6 w-full overflow-hidden"
                style={{
                  borderRadius: 12,
                  border: "1px solid rgba(11,16,41,0.12)",
                  height: 260,
                }}
              >
                <iframe
                  title={`Map to ${center.centerName}`}
                  src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0, width: "100%", height: "100%", display: "block" }}
                  allowFullScreen
                />
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inline-flex items-center gap-2"
                  style={{
                    top: 12,
                    left: 12,
                    background: "#FFFFFF",
                    color: "#0B1029",
                    padding: "10px 16px",
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: 15,
                    textDecoration: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
                  }}
                >
                  Open in Maps
                  <ExternalLink size={14} strokeWidth={2.5} />
                </a>
              </div>
            </div>

            {/* Video Card */}
            <div
              className="relative flex flex-col overflow-hidden"
              style={{
                background: "#FFFFFF",
                borderRadius: 14,
                boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
              }}
            >
              <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", background: "#000" }}>
                <video
                  src={EXPECT_VIDEO_SRC}
                  title="What to expect at your visit"
                  controls
                  playsInline
                  preload="metadata"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    border: 0,
                  }}
                />
              </div>

              <div className="p-7 md:p-8 flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Play size={18} strokeWidth={2.5} style={{ color: "#C2410C" }} />
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#C2410C",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                    }}
                  >
                    2 Min Watch
                  </span>
                </div>
                <h2
                  style={{
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(20px, 2.4vw, 26px)",
                    color: "#0B1029",
                    textTransform: "uppercase",
                    letterSpacing: "0.02em",
                    marginBottom: 10,
                  }}
                >
                  What To Expect
                </h2>
                <p
                  className="text-base md:text-lg"
                  style={{ color: "#3A4258", lineHeight: 1.5, fontWeight: 500 }}
                >
                  A short overview of your check-in and consultation. Bring photo ID. Eat normally. Arrive 10 minutes early.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p
            className="text-center text-sm md:text-base"
            style={{ color: "rgba(255,255,255,0.72)", fontFamily: "Inter, sans-serif" }}
          >
            Need to reschedule or running late? Call or text{" "}
            <a
              href={PHONE_TEL}
              style={{ color: "#FFFFFF", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 4 }}
            >
              {PHONE_DISPLAY}
            </a>
            .
          </p>
        </div>
      </div>

    </BookLayout>
  );
};

export default BookConfirmed;
