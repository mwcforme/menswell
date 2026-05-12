const steps = [
  {
    num: "01",
    title: "Full Workup",
    body: "Your first visit includes on-site blood work and a comprehensive health review. Your physician looks at the full picture before prescribing anything.",
  },
  {
    num: "02",
    title: "Your Protocol",
    body: "Based on your labs, your doctor builds a weight loss plan around your specific metabolism, health markers, and goals. GLP-1 medications are prescribed and administered on-site.",
  },
  {
    num: "03",
    title: "Track It Together",
    body: "Regular follow-ups, lab monitoring, and dosage adjustments are all included. Your physician tracks your progress and adapts the plan as your body responds.",
  },
];

export const WLUnifiedHowItWorks = () => {
  return (
    <section style={{ background: "#F5F5F3" }} className="py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3 text-center" style={{ color: "#666" }}>
          Simple. Fast. Professional.
        </p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-4" style={{ color: "#1B2A4A" }}>
          HOW IT WORKS
        </h2>
        <p className="text-center text-base mb-12 max-w-2xl mx-auto" style={{ color: "#4A4A4A" }}>
          Most men complete their evaluation in a single 60-minute visit and leave with lab results in hand.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.num} className="bg-white rounded-xl p-8" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <span className="text-sm font-bold tracking-wider block mb-4" style={{ color: "#E8670A" }}>{step.num}</span>
              <h3 className="text-lg font-bold mb-3" style={{ color: "#1B2A4A" }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#4A4A4A" }}>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
