import { Phone } from "lucide-react";
import { TickerStrip } from "@/components/shared/TickerStrip";
import type { LocationData } from "@/data/locations";

interface Props {
  location: LocationData;
}

export const LocationHero = ({ location }: Props) => {
  const scrollToForm = () => {
    document.getElementById("location-cta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex flex-col overflow-hidden"
      style={{ background: "#151933" }}
    >
      <div className="absolute inset-0">
        <img
          src={location.heroImage}
          alt={`Men's health center in ${location.city}, Virginia`}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(21,25,51,0.58) 0%, rgba(21,25,51,0.68) 100%)",
          }}
        />
      </div>

      <div
        className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 text-center flex flex-col items-center justify-center"
        style={{ paddingTop: 88, paddingBottom: 80, minHeight: "clamp(460px, 65vh, 640px)" }}
      >
        {/* Eyebrow */}
        <p
          className="uppercase mb-4 md:mb-6"
          style={{ fontSize: 12, letterSpacing: "0.15em", color: "rgba(255,255,255,0.6)" }}
        >
          {location.city}, Virginia
        </p>

        {/* H1 */}
        <h1
          className="font-extrabold uppercase leading-[0.95] mb-6 md:mb-8 mx-auto"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            maxWidth: 800,
            color: "#FFFFFF",
            letterSpacing: "0.02em",
            textShadow: "0 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          Men's Health Center in {location.city}, VA
        </h1>

        {/* Body */}
        <p
          className="mx-auto mb-5 md:mb-6 text-base md:text-lg leading-relaxed"
          style={{
            maxWidth: 700,
            color: "rgba(255,255,255,0.85)",
            textShadow: "0 1px 3px rgba(0,0,0,0.4)",
          }}
        >
          {location.heroAuthorityStatement}
        </p>

        {/* Medically Reviewed pill */}
        <div
          className="inline-flex items-center gap-2 mb-6 md:mb-8"
          style={{
            padding: "6px 16px",
            borderRadius: 9999,
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
            <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm-1 11.4L3.6 8l1.4-1.4L6.9 8.5l4.1-4.1L12.4 5.8 7 11.4z" fill="rgba(255,255,255,0.7)" />
          </svg>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>
            Medically reviewed by {location.leadPhysician} — {location.leadPhysicianCredentials?.split(",")[0]}
          </span>
        </div>

        {/* CTA buttons — Tier 1 + Tier 2 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
          <button
            onClick={scrollToForm}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full font-semibold uppercase cursor-pointer border-none transition-all duration-200 hover:scale-[1.02]"
            style={{
              background: "#F97316",
              color: "#FFFFFF",
              padding: "16px 32px",
              fontSize: 13,
              letterSpacing: "0.05em",
              height: 52,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#EA580C")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#F97316")}
            data-location={location.slug.replace("-va", "")}
            data-cta-type="book"
          >
            Book My Consultation
          </button>
          <a
            href={`tel:${location.phone.replace(/[^0-9]/g, "")}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase transition-all duration-200 hover:scale-[1.02]"
            style={{
              background: "#0F2A4A",
              color: "#FFFFFF",
              padding: "16px 32px",
              fontSize: 13,
              letterSpacing: "0.05em",
              height: 52,
              textDecoration: "none",
              border: "none",
            }}
            aria-label={`Call Men's Wellness Centers ${location.city} at ${location.phone}`}
            data-location={location.slug.replace("-va", "")}
            data-cta-type="call"
          >
            <Phone size={15} strokeWidth={2.5} />
            {(location.region === "Hampton Roads" || location.region === "Coastal Virginia")
              ? `Hampton Roads: ${location.phone}`
              : `Call ${location.city} Now: ${location.phone}`}
          </a>
        </div>
      </div>

      {/* Ticker strip */}
      <TickerStrip items={location.statBar.map((s) => s.label)} />
    </section>
  );
};
