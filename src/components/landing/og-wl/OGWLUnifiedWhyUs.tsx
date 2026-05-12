const cards = [
  { title: "Doctor-Run, Not App-Run", desc: "A licensed physician designs your plan and monitors you in person. No chatbots, no generic PDF." },
  { title: "Stimulant-Free Injections", desc: "Our nutrient-rich vitamin injections boost metabolism and energy without stimulants or harsh side effects." },
  { title: "Your Hormones Might Be the Problem", desc: "Low T tanks your metabolism. We test your hormones on-site and can treat both issues at the same center." },
  { title: "Built for Men's Bodies", desc: "Men lose weight differently. Our programs account for male metabolism, hormones, and muscle preservation." },
];

export const OGWLUnifiedWhyUs = () => (
  <section style={{ background: "#f8f9fa", padding: "clamp(48px, 8vw, 96px) 0" }}>
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="text-center mb-12 md:mb-16">
        <h2
          className="text-3xl md:text-4xl font-bold leading-tight mb-3"
          style={{ color: "#1B2A4A" }}
        >
          Why Us
        </h2>
        <p className="text-base" style={{ color: "#555555" }}>
          What is different about losing weight here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-xl p-6"
            style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.06)" }}
          >
            <h3 className="font-bold text-base mb-2" style={{ color: "#1B2A4A" }}>
              {card.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#555555" }}>
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
