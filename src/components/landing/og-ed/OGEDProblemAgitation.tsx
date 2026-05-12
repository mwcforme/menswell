export const OGEDProblemAgitation = () => {
  const symptoms = [
    { emoji: "🔒", title: "Performance Anxiety", description: "The worry itself makes things worse. It becomes a cycle that's hard to break." },
    { emoji: "💊", title: "Failed OTC Solutions", description: "You've tried the pills from the internet. They didn't work — or came with side effects." },
    { emoji: "🤐", title: "Suffering in Silence", description: "You haven't talked to anyone about it. You're not sure who to trust." },
    { emoji: "💔", title: "Relationship Strain", description: "It's affecting your relationship, and you're not sure how to fix it." },
    { emoji: "📉", title: "Declining Confidence", description: "It's not just about the bedroom. Your confidence is taking a hit everywhere." },
    { emoji: "🩺", title: "Underlying Health Issues", description: "ED can be an early warning sign of cardiovascular or hormonal problems." },
  ];

  const scrollToForm = () => {
    const form = document.getElementById("lead-form") || document.getElementById("lead-form-bottom");
    form?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section id="symptoms" style={{ background: "#f8f9fa", padding: "clamp(48px, 8vw, 96px) 0" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "#003366" }}>
            You're Not Alone — And It's More Common Than You Think
          </h2>
          <p className="mt-3 text-base" style={{ color: "#555555" }}>
            Over 30 million American men experience ED. It's a medical condition, not a personal failure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {symptoms.map((s, i) => (
            <div
              key={i}
              className="rounded-xl p-6 transition-all duration-200 hover:-translate-y-1"
              style={{
                background: "#ffffff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <div className="text-3xl mb-4">{s.emoji}</div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: "#003366" }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#555555" }}>{s.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg mb-4" style={{ color: "#555555" }}>
            The good news? Effective, physician-supervised treatment exists.
          </p>
          <button
            onClick={scrollToForm}
            className="text-base font-semibold cursor-pointer bg-transparent border-none underline transition-colors duration-200"
            style={{ color: "#004883" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#003366"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#004883"; }}
          >
            See Your Options →
          </button>
        </div>
      </div>
    </section>
  );
};