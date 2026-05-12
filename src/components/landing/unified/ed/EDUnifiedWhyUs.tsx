const cards = [
  {
    title: "Face-to-Face with a Physician",
    body: "You sit across from a licensed doctor who specializes in men's health. Not a nurse practitioner on a screen. Not an AI chat. A physician, in person.",
  },
  {
    title: "More Than a Pill",
    body: "About half of men prescribed standard oral ED medications stop using them. We offer multiple treatment options, including injectables and combination protocols, tailored to what actually works for your body.",
  },
  {
    title: "Discreet and Private",
    body: "Our centers are built for men. Private exam rooms, no crowded waiting areas, no shared pharmacies. Your visit stays between you and your doctor.",
  },
  {
    title: "Medication Dispensed On-Site",
    body: "No pharmacy pickup. No prescription sent to a chain store where someone you know works the counter. We dispense your medication at the center, the same day.",
  },
];

export const EDUnifiedWhyUs = () => {
  return (
    <section style={{ background: "#FFFFFF" }} className="py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12" style={{ color: "#1B2A4A" }}>
          WHY MEN CHOOSE MEN'S WELLNESS CENTERS FOR ED
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
