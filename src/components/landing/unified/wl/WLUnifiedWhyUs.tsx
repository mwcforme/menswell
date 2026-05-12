const cards = [
  {
    title: "Physician-Supervised, Not App-Managed",
    body: "Your weight loss protocol is prescribed and monitored by a Virginia-licensed physician who sees you in person. Not a questionnaire and a mailed syringe.",
  },
  {
    title: "FDA-Approved GLP-1 Medications",
    body: "We prescribe Semaglutide and Tirzepatide based on your individual lab work and health profile. Dosing is calibrated to your body, not a standard template.",
  },
  {
    title: "Real Labs, Real Monitoring",
    body: "On-site blood work at every key stage. Your physician tracks metabolic markers, adjusts dosing, and catches issues early. This is medical weight loss, not guesswork.",
  },
  {
    title: "Everything Included",
    body: "Your program covers all follow-up visits, lab draws, dosage adjustments, and physician consultations. One price. No surprise bills three months in.",
  },
];

export const WLUnifiedWhyUs = () => {
  return (
    <section style={{ background: "#FFFFFF" }} className="py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12" style={{ color: "#1B2A4A" }}>
          WHY MEN CHOOSE MEN'S WELLNESS CENTERS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div key={card.title} className="rounded-xl p-8" style={{ background: "#F5F5F3", borderLeft: "3px solid #1B2A4A" }}>
              <h3 className="text-base font-bold mb-3" style={{ color: "#1B2A4A" }}>{card.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#4A4A4A" }}>{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
