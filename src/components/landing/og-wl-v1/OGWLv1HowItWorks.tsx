const steps = [
  { num: "01", title: "Full Workup", desc: "Metabolic panel, hormone levels, body composition. Your doctor sees the full picture at our on-site lab." },
  { num: "02", title: "Your Protocol", desc: "Based on your labs, not a generic plan. Vitamin injections, hormone optimization, and a roadmap that fits your life." },
  { num: "03", title: "Track It Together", desc: "Regular check-ins with your physician. We measure progress and adjust the plan as your body changes." },
];

export const OGWLv1HowItWorks = () => (
  <section style={{ background: "#ffffff", padding: "clamp(48px, 8vw, 96px) 0" }}>
    <div className="max-w-[960px] mx-auto px-6">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "#003366" }}>How It Works</h2>
        <p className="text-sm mt-2 uppercase font-medium" style={{ color: "#888888", letterSpacing: "0.1em" }}>3 steps. One visit. Same-day answers.</p>
      </div>
      <div className="hidden md:block relative">
        <div className="absolute h-[1px] top-[24px] left-[17%] right-[17%]" style={{ background: "#D1D1CB", zIndex: 0 }} />
        <div className="flex justify-between relative" style={{ zIndex: 1 }}>
          {steps.map((step) => (
            <div key={step.num} className="flex flex-col items-center" style={{ width: "33.333%" }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#FFFFFF", border: "2px solid #004883" }}>
                <span className="font-bold text-sm" style={{ color: "#004883", letterSpacing: "0.08em" }}>{step.num}</span>
              </div>
              <h3 className="font-bold text-base text-center mt-5" style={{ color: "#003366" }}>{step.title}</h3>
              <p className="text-sm text-center mt-2 max-w-[240px] leading-relaxed" style={{ color: "#555555" }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="md:hidden relative">
        <div className="absolute w-[1px] top-[24px] bottom-[24px] left-[23px]" style={{ background: "#D1D1CB", zIndex: 0 }} />
        <div className="flex flex-col" style={{ zIndex: 1 }}>
          {steps.map((step, i) => (
            <div key={step.num} className="flex flex-row gap-5 relative" style={{ zIndex: 1, paddingBottom: i < steps.length - 1 ? 32 : 0 }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#FFFFFF", border: "2px solid #004883" }}>
                <span className="font-bold text-sm" style={{ color: "#004883", letterSpacing: "0.08em" }}>{step.num}</span>
              </div>
              <div className="flex flex-col pt-1">
                <h3 className="font-bold text-base text-left" style={{ color: "#003366" }}>{step.title}</h3>
                <p className="text-sm text-left leading-relaxed mt-1" style={{ color: "#555555" }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);