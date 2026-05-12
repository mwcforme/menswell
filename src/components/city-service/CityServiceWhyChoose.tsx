import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { CityServiceConfig } from "@/data/city-services";

interface Props {
  city: string;
  service: CityServiceConfig;
}

export const CityServiceWhyChoose = ({ city, service }: Props) => {
  const gridRef = useScrollReveal({ staggerChildren: true, staggerDelay: 120 });

  return (
    <section style={{ background: "#EBEAE8", padding: "80px 0" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h2
          className="font-bold uppercase leading-tight mb-4"
          style={{ color: "#000033", fontSize: "clamp(1.15rem, 3vw, 1.75rem)" }}
        >
          WHY CHOOSE MEN'S WELLNESS CENTERS {city.toUpperCase()} FOR {service.serviceShortName}
        </h2>
        <p className="text-sm leading-relaxed max-w-2xl mb-10 md:mb-14" style={{ color: "#666" }}>
          Not all {service.serviceShortName} clinics are the same. Here's what sets our {city} center apart.
        </p>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
          {service.differentiators.map((d) => (
            <div key={d.title}>
              <h3 className="font-bold text-[14px] uppercase tracking-[0.04em] mb-2" style={{ color: "#000033" }}>
                {d.title}
              </h3>
              <p className="text-[13px] leading-relaxed" style={{ color: "#666" }}>
                {d.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
