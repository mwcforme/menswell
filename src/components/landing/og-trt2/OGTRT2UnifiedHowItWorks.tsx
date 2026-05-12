export const OGTRT2UnifiedHowItWorks = () => {
  const steps = [
    { number: "01", title: "Book a Private Visit", description: "Schedule online or call. Same-day and evening appointments available at all 3 locations." },
    { number: "02", title: "Get Same-Day Lab Results", description: "Quick blood draw, no fasting required. Your physician reviews results with you on the spot." },
    { number: "03", title: "Start Your Custom Plan", description: "If you qualify, your physician prescribes a TRT protocol tailored to your body, your goals, and your lifestyle." },
  ];

  const scrollToForm = () => {
    const form = document.getElementById("og-trt2-lead-form") || document.getElementById("og-trt2-final-form");
    form?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section style={{ background: "#1B2A4A", color: "white", padding: "clamp(48px, 8vw, 96px) 0" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">Getting Started Takes 15 Minutes</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="rounded-xl p-8"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div
                className="text-lg font-bold mb-4"
                style={{ color: "#E8670A" }}
              >
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={scrollToForm}
            className="px-8 h-[52px] rounded-full font-bold text-sm uppercase tracking-wider cursor-pointer transition-colors duration-200 border-none"
            style={{ background: "#E8670A", color: "#FFFFFF" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#CF5B09"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#E8670A"; }}
          >
            BOOK MY CONSULTATION
          </button>
        </div>
      </div>
    </section>
  );
};
