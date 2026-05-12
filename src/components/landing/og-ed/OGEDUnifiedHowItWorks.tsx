export const OGEDUnifiedHowItWorks = () => {
  const scrollToForm = () => {
    const form = document.getElementById("og-ed-lead-form") || document.getElementById("og-ed-final-form");
    form?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const steps = [
    {
      num: "01",
      title: "Book a Private Visit",
      body: "Schedule online or call. Appointments often available. Choose Richmond, Newport News, or Virginia Beach.",
    },
    {
      num: "02",
      title: "Get a Full Evaluation",
      body: "Your physician conducts a thorough assessment, including lab work if needed, to identify what is actually causing the problem.",
    },
    {
      num: "03",
      title: "Start Your Treatment Plan",
      body: "Personalized options including oral medications, injectables, or combination therapy. Most men see results quickly.",
    },
  ];

  return (
    <section style={{ background: "#f8f9fa" }} className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12 md:mb-16" style={{ color: "#1B2A4A" }}>
          Discreet, Effective Treatment in 3 Steps
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step) => (
            <div key={step.num} className="rounded-xl p-8" style={{ background: "#FFFFFF", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <div className="text-3xl font-extrabold mb-3" style={{ color: "#E8670A" }}>{step.num}</div>
              <h3 className="text-lg font-bold mb-3" style={{ color: "#1B2A4A" }}>{step.title}</h3>
              <p className="text-[15px] leading-relaxed" style={{ color: "#555555" }}>{step.body}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={scrollToForm}
            className="w-full md:w-auto px-8 h-[52px] rounded-full font-bold text-sm uppercase tracking-wider cursor-pointer transition-colors duration-200 border-none"
            style={{ background: "#1B2A4A", color: "#FFFFFF" }}
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
