const cards = [
  {
    title: "Doctor-Run, Not App-Run",
    body: "Every member sees a Virginia-licensed physician face to face. Not a chatbot. Not a nurse practitioner on a video call. A doctor, in the room with you.",
  },
  {
    title: "Same-Day Lab Results",
    body: "We draw blood in-house and run your labs on-site. You know your testosterone level before you leave. No waiting for callbacks. No separate lab appointments.",
  },
  {
    title: "Custom Protocols, Not Cookie-Cutter",
    body: "Your dosing, your schedule, and your follow-up plan are built around your lab work and your symptoms. Not a one-size template.",
  },
  {
    title: "All Follow-Up Included",
    body: "Regular check-ins, ongoing labs, and dosage adjustments are part of the program. No surprise fees. No nickel-and-diming for follow-up visits.",
  },
];

export const TRTv2UnifiedWhyUs = () => {
  return (
    <section style={{ background: "#FFFFFF" }} className="py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12" style={{ color: "#1B2A4A" }}>
          WHY MEN CHOOSE MEN'S WELLNESS CENTERS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl p-8"
              style={{
                background: "#F5F5F3",
                borderLeft: "3px solid #1B2A4A",
              }}
            >
              <h3 className="text-base font-bold mb-3" style={{ color: "#1B2A4A" }}>
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#4A4A4A" }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
