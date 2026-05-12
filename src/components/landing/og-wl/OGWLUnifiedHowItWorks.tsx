const steps = [
  { num: "01", title: "Full Workup", desc: "Metabolic panel, hormone levels, body composition. Your doctor sees the full picture at our on-site lab." },
  { num: "02", title: "Your Protocol", desc: "Based on your labs, not a generic plan. Vitamin injections, hormone optimization, and a roadmap that fits your life." },
  { num: "03", title: "Track It Together", desc: "Regular check-ins with your physician. We measure progress and adjust the plan as your body changes." },
];

export const OGWLUnifiedHowItWorks = () => {
  const scrollToForm = () => {
    document.getElementById("wl-hero-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section style={{ background: "#FFFFFF", padding: "clamp(48px, 8vw, 96px) 0" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold leading-tight mb-3"
            style={{ color: "#1B2A4A" }}
          >
            How It Works
          </h2>
          <p className="text-base" style={{ color: "#555555" }}>
            3 steps. One visit. Same-day answers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="rounded-xl p-6"
              style={{ background: "#f8f9fa", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <div
                className="text-3xl font-bold mb-4"
                style={{ color: "#E8670A" }}
              >
                {step.num}
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: "#1B2A4A" }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#555555" }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={scrollToForm}
            className="rounded-full px-8 font-bold text-sm uppercase cursor-pointer transition-colors duration-200"
            style={{
              height: 52,
              background: "#1B2A4A",
              color: "#FFFFFF",
              letterSpacing: "0.08em",
              border: "none",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#0F1D35"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#1B2A4A"; }}
          >
            Book My Consultation
          </button>
        </div>
      </div>
    </section>
  );
};
