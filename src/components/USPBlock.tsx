import { useScrollReveal } from "@/hooks/useScrollReveal";

const features = [
  {
    title: "Concierge Service",
    description: "One-on-one support from medical experts who know your name and your goals.",
  },
  {
    title: "Face-to-Face Consultations",
    description: "Every visit is in-person with a Virginia-licensed provider. No telemedicine shortcuts.",
  },
  {
    title: "State-Licensed Providers",
    description: "Board-certified physicians and nurse practitioners at every location.",
  },
  {
    title: "Unlimited Office Visits",
    description: "Follow-ups, lab reviews, and treatment adjustments included with no hidden fees.",
  },
];

export const USPBlock = () => {
  const contentRef = useScrollReveal();

  return (
    <section className="py-14 md:py-20" style={{ background: "#1A1A2E" }}>
      <div ref={contentRef} className="max-w-6xl mx-auto px-4 md:px-6">
        <p
          className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] mb-3"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Why Men Choose Us
        </p>
        <h2
          className="font-bold uppercase leading-tight max-w-md"
          style={{ color: "#FFFFFF", fontSize: "clamp(1.15rem, 3vw, 1.75rem)" }}
        >
          No Contracts. No Gimmicks. Just Results.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 mt-10 md:mt-14">
          {features.map((f) => (
            <div key={f.title}>
              <h3
                className="font-bold text-[13px] md:text-sm uppercase tracking-wide"
                style={{ color: "#FFFFFF" }}
              >
                {f.title}
              </h3>
              <p className="mt-1.5 text-[12px] md:text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
