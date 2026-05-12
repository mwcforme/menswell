interface BenefitCard {
  title: string;
  desc: string;
}

interface LandingBenefitsProps {
  sectionTitle: string;
  sectionSubtitle: string;
  cards: BenefitCard[];
}

export const LandingBenefits = ({ sectionTitle, sectionSubtitle, cards }: LandingBenefitsProps) => (
  <section className="py-14 md:py-20" style={{ background: "#EBEAE8" }}>
    <div className="max-w-[1200px] mx-auto px-6">
      <h2
        className="font-bold text-3xl text-center mb-4"
        style={{ color: "#000033" }}
      >
        {sectionTitle}
      </h2>
      <p
        className="text-base text-center max-w-[600px] mx-auto mb-12"
        style={{ color: "#4A4A4A" }}
      >
        {sectionSubtitle}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-xl p-6"
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <h3
              className="font-bold text-base mb-2"
              style={{ color: "#000033" }}
            >
              {card.title}
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "#4A4A4A" }}
            >
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
