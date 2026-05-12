import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { CityServiceConfig } from "@/data/city-services";

interface Props {
  service: CityServiceConfig;
}

export const CityServiceComparison = ({ service }: Props) => {
  const ref = useScrollReveal();

  return (
    <section style={{ background: "#1A1A2E", padding: "80px 0" }}>
      <div ref={ref} className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
          <div>
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-3"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              The MWC Difference
            </p>
            <h2
              className="font-bold uppercase leading-tight mb-6"
              style={{ color: "#FFFFFF", fontSize: "clamp(1.15rem, 3vw, 1.75rem)" }}
            >
              WHY MEN SWITCH TO MEN'S WELLNESS CENTERS FOR {service.serviceShortName}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Online clinics send you a generic script. Primary care providers check a box and move on.
              We sit down with you, run labs in-house, and build a protocol that's actually yours.
            </p>
          </div>

          <div className="space-y-5">
            {service.comparisonPoints.map((point) => (
              <div key={point} className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-0.5">
                  <circle cx="10" cy="10" r="10" fill="rgba(249,115,22,0.15)" />
                  <path d="M6 10l3 3 5-5" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-[14px] font-medium leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => document.getElementById("location-cta")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center justify-center rounded-full font-semibold uppercase cursor-pointer border-none transition-all duration-200 hover:scale-[1.02]"
            style={{ background: "#F97316", color: "#FFFFFF", padding: "16px 32px", fontSize: 13, letterSpacing: "0.05em" }}
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
