export const OGEDUnifiedWhyUs = () => {
  const cards = [
    {
      title: "Doctor-Run, Not App-Run",
      body: "You see a licensed Virginia physician face to face. Not a chatbot. Not a questionnaire. A doctor who examines you, reviews your labs, and answers your questions.",
    },
    {
      title: "100% Confidential",
      body: "Every visit is one-on-one in a private setting. Fully HIPAA-compliant. No group waiting rooms. No referral needed.",
    },
    {
      title: "More Than a Pill",
      body: "Online services hand you a generic prescription and move on. We diagnose the root cause, offer multiple treatment options, and monitor your progress over time.",
    },
    {
      title: "All Follow-Up Included",
      body: "Regular check-ins, dosage adjustments, and lab monitoring included. No hidden fees. No surprise bills.",
    },
  ];

  return (
    <section style={{ background: "#FFFFFF" }} className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12 md:mb-16" style={{ color: "#1B2A4A" }}>
          Why Virginia Men Choose Men's Wellness Centers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, i) => (
            <div key={i} className="rounded-xl p-8" style={{ background: "#f8f9fa" }}>
              <h3 className="text-lg font-bold mb-3" style={{ color: "#1B2A4A" }}>{card.title}</h3>
              <p className="text-[15px] leading-relaxed" style={{ color: "#555555" }}>{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
