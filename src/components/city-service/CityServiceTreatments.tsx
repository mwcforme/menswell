import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { CityServiceConfig } from "@/data/city-services";

interface Props {
  service: CityServiceConfig;
}

export const CityServiceTreatments = ({ service }: Props) => {
  const gridRef = useScrollReveal({ staggerChildren: true, staggerDelay: 100 });

  return (
    <section style={{ background: "#FFFFFF", padding: "80px 0" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-14">
          <h2
            className="font-bold uppercase leading-tight mb-4"
            style={{ color: "#000033", fontSize: "clamp(1.15rem, 3vw, 1.75rem)" }}
          >
            {service.serviceShortName} TREATMENTS WE OFFER
          </h2>
          <p className="text-sm leading-relaxed max-w-2xl mx-auto" style={{ color: "#666" }}>
            Every protocol is physician-prescribed and tailored to your bloodwork and goals.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {service.treatments.map((t) => (
            <div key={t.title} className="rounded-lg p-6" style={{ background: "#F5F4F2" }}>
              <h3 className="font-bold text-[14px] uppercase tracking-[0.04em] mb-3" style={{ color: "#000033" }}>
                {t.title}
              </h3>
              <p className="text-[13px] leading-relaxed" style={{ color: "#666" }}>
                {t.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
