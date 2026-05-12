import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { LocationData } from "@/data/locations";

const bullets = [
  "Board-certified physician oversight at every visit, your care team is led by an MD, supported by experienced nurse practitioners for seamless continuity",
  "On-site labs with 15-minute results, no separate Quest or LabCorp trip",
  "All-inclusive pricing with no hidden fees or surprise bills",
  "Unlimited follow-up visits included in your plan",
  "Private, purpose-built centers, not a shared urgent care",
  "No contracts, flexible month-to-month plans",
];

interface Props {
  location: LocationData;
}

export const LocationWhyMWC = ({ location }: Props) => {
  const contentRef = useScrollReveal();

  return (
    <section style={{ background: "#1A1A2E", padding: "80px 0" }}>
      <div ref={contentRef} className="max-w-6xl mx-auto px-4 md:px-6">
        <p
          className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] mb-3"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          The MWC Difference
        </p>
        <h2
          className="font-bold uppercase leading-tight max-w-md mb-10 md:mb-14"
          style={{ color: "#FFFFFF", fontSize: "clamp(1.15rem, 3vw, 1.75rem)" }}
        >
          WHY MEN CHOOSE OUR {location.city.toUpperCase()} CENTER
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          {bullets.map((b) => (
            <div key={b}>
              <p
                className="font-semibold text-[13px] md:text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                {b}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 md:mt-14">
          <button
            onClick={() => document.getElementById("location-cta")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center justify-center rounded-full font-semibold uppercase cursor-pointer border-none transition-all duration-200 hover:scale-[1.02]"
            style={{
              background: "#F97316",
              color: "#FFFFFF",
              padding: "16px 32px",
              fontSize: 13,
              letterSpacing: "0.05em",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#EA580C")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#F97316")}
          >
            Book My Consultation
          </button>
        </div>
      </div>
    </section>
  );
};
