const steps = [
  { num: "01", title: "Lab Work", desc: "Blood draw at our on-site lab. No fasting required. Your physician reviews results with you the same day." },
  { num: "02", title: "Your Protocol", desc: "Based on your labs, your physician builds a TRT plan tailored to your body, your goals, and your lifestyle." },
  { num: "03", title: "Ongoing Monitoring", desc: "Regular check-ins, follow-up labs, and dose adjustments. We track your progress and fine-tune your protocol over time." },
];

export const OGTRTUnifiedHowItWorks = () => {
  const scrollToForm = () => {
    document.getElementById("unified-lead-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section style={{ background: "#f8f9fa" }} className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#1B2A4A" }}>
            How It Works
          </h2>
          <p className="text-base" style={{ color: "#666666" }}>
            Walk in. Get tested. Start treatment. Same day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {steps.map((s) => (
            <div
              key={s.num}
              className="rounded-xl p-8"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-5"
                style={{ background: "#1B2A4A" }}
              >
                <span className="text-sm font-bold text-white">{s.num}</span>
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: "#1B2A4A" }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#555555" }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={scrollToForm}
            className="rounded-full px-8 font-bold text-sm uppercase tracking-wider cursor-pointer transition-colors duration-200"
            style={{ height: 52, background: "#1B2A4A", color: "#FFFFFF", border: "none", letterSpacing: "0.08em" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#0F1D35"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#1B2A4A"; }}
          >
            BOOK MY CONSULTATION
          </button>
        </div>
      </div>
    </section>
  );
};
