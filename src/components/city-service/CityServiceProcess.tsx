import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { LocationData } from "@/data/locations";
import type { CityServiceConfig } from "@/data/city-services";

interface Props {
  location: LocationData;
  service: CityServiceConfig;
}

export const CityServiceProcess = ({ location, service }: Props) => {
  const steps = service.processSteps(location.city, location.phone);
  const gridRef = useScrollReveal({ staggerChildren: true, staggerDelay: 150 });

  return (
    <section style={{ background: "#EBEAE8", padding: "80px 0" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h2
          className="font-bold uppercase leading-tight mb-4"
          style={{ color: "#000033", fontSize: "clamp(1.15rem, 3vw, 1.75rem)" }}
        >
          HOW {service.serviceShortName} WORKS AT OUR {location.city.toUpperCase()} CENTER
        </h2>
        <p className="text-sm leading-relaxed max-w-2xl mb-10 md:mb-12" style={{ color: "#666", fontStyle: "italic" }}>
          Walk in with questions. Leave the same day with answers and a treatment plan.
        </p>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {steps.map((step) => (
            <div key={step.num} className="flex flex-col">
              <div
                className="flex items-center justify-center rounded-full mb-4"
                style={{ width: 48, height: 48, background: "#F97316", color: "#FFFFFF", fontSize: 20, fontWeight: 700, flexShrink: 0 }}
              >
                {step.num}
              </div>
              <h3 className="font-bold text-[15px] uppercase tracking-[0.04em] mb-2" style={{ color: "#000033" }}>
                {step.title}
              </h3>
              <p className="text-[13px] leading-relaxed" style={{ color: "#666" }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
