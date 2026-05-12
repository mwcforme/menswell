import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { CityServiceConfig } from "@/data/city-services";

interface Props {
  service: CityServiceConfig;
}

export const CityServiceResults = ({ service }: Props) => {
  const ref = useScrollReveal();

  return (
    <section style={{ background: "#F5F4F2", padding: "80px 0" }}>
      <div ref={ref} className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-14">
          <h2
            className="font-bold uppercase leading-tight mb-4"
            style={{ color: "#000033", fontSize: "clamp(1.15rem, 3vw, 1.75rem)" }}
          >
            REAL RESULTS FROM REAL MEMBERS
          </h2>
          <p className="text-sm leading-relaxed max-w-xl mx-auto" style={{ color: "#666" }}>
            Clinical outcomes from our centers. Individual results may vary.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
          {service.stats.map((stat) => (
            <div key={stat.value} className="rounded-lg p-6 md:p-8 text-center" style={{ background: "#FFFFFF" }}>
              <p className="font-bold mb-2" style={{ color: "#000033", fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>
                {stat.value}
              </p>
              <p className="text-[13px] leading-relaxed mb-2" style={{ color: "#666" }}>
                {stat.label}
              </p>
              {stat.source && (
                <p className="text-[11px]" style={{ color: "#999" }}>{stat.source}</p>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-[11px] leading-relaxed" style={{ color: "#999" }}>
          Anonymized clinical data from Men's Wellness Centers, 2024-2025. Individual results may vary. These figures are not guarantees of outcome.
        </p>
      </div>
    </section>
  );
};
