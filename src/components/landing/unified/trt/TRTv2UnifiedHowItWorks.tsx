const steps = [
  {
    num: "01",
    title: "Book a Private Visit",
    body: "Call or book online. Appointments are often available at our Richmond, Newport News, or Virginia Beach center.",
  },
  {
    num: "02",
    title: "Get Same-Day Lab Results",
    body: "Quick, on-site blood work measures your testosterone, PSA, and key health markers. You'll have results before you leave.",
  },
  {
    num: "03",
    title: "Start Your Custom Plan",
    body: "Your physician reviews results with you, answers your questions, and builds a treatment plan specific to your labs and goals. Follow-up visits, labs, and adjustments are all included.",
  },
];

export const TRTv2UnifiedHowItWorks = () => {
  return (
    <section style={{ background: "#F5F5F3" }} className="py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3 text-center" style={{ color: "#666" }}>
          Simple. Fast. Professional.
        </p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-4" style={{ color: "#1B2A4A" }}>
          FROM FIRST CALL TO FEELING BETTER
        </h2>
        <p className="text-center text-base mb-12 max-w-2xl mx-auto" style={{ color: "#4A4A4A" }}>
          Most men complete their evaluation and know their results in a single 60-minute visit.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-white rounded-xl p-8"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
            >
              <span
                className="text-sm font-bold tracking-wider block mb-4"
                style={{ color: "#E8670A" }}
              >
                {step.num}
              </span>
              <h3 className="text-lg font-bold mb-3" style={{ color: "#1B2A4A" }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#4A4A4A" }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
