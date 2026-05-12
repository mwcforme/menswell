const cards = [
  { title: "Yo-Yo Dieting", desc: "You have lost weight before. You gained it all back. That is not a willpower problem. That is a medical one." },
  { title: "Hormonal Resistance", desc: "Low testosterone and metabolic dysfunction make fat loss nearly impossible without medical intervention." },
  { title: "Constant Hunger", desc: "Willpower is not the problem. Your hunger hormones are working against you." },
  { title: "Low Energy", desc: "Too exhausted to work out consistently. The cycle keeps repeating." },
  { title: "Stubborn Belly Fat", desc: "No matter what you try, the midsection will not budge." },
  { title: "Losing Confidence", desc: "Your weight is affecting how you feel about yourself every single day." },
];

export const OGWLUnifiedProblem = () => {
  const scrollToForm = () => {
    document.getElementById("wl-hero-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section style={{ background: "#f8f9fa", padding: "clamp(48px, 8vw, 96px) 0" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold leading-tight mb-4"
            style={{ color: "#1B2A4A" }}
          >
            Why Diets Alone Have Not Worked
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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

        <p
          className="text-center text-base mt-10 mb-8"
          style={{ color: "#555555" }}
        >
          If this sounds familiar, it is time to talk to a doctor.
        </p>

        <div className="text-center">
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
