export const WLProblemAgitation = () => {
  const problems = [
    {
      emoji: "🔄",
      title: "Yo-Yo Dieting",
      description: "You've lost weight before, only to gain it all back — and then some.",
    },
    {
      emoji: "🧬",
      title: "Hormonal Resistance",
      description: "Low testosterone and metabolic dysfunction make fat loss nearly impossible without medical help.",
    },
    {
      emoji: "🍽️",
      title: "Constant Hunger",
      description: "Willpower isn't the problem. Your hunger hormones are working against you.",
    },
    {
      emoji: "⚡",
      title: "Low Energy",
      description: "Too exhausted to work out consistently. The cycle keeps repeating.",
    },
    {
      emoji: "📊",
      title: "Stubborn Belly Fat",
      description: "No matter what you try, the midsection won't budge.",
    },
    {
      emoji: "😞",
      title: "Losing Confidence",
      description: "Your weight is affecting how you feel about yourself every single day.",
    },
  ];

  const scrollToHowItWorks = () => {
    const section = document.getElementById("how-it-works");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="problem-agitation"
      style={{
        background: "#f8f9fa",
        padding: "clamp(48px, 8vw, 96px) 0",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "clamp(32px, 5vw, 56px)" }}>
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "#000033",
              marginBottom: 16,
            }}
          >
            Why Diets Alone Haven't Worked
          </h2>
        </div>

        {/* Problem Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 20,
            marginBottom: 48,
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12"
        >
          {problems.map((problem, index) => (
            <div
              key={index}
              style={{
                background: "#ffffff",
                borderRadius: 12,
                padding: 24,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                border: "1px solid #e9ecef",
                transition: "transform 180ms ease, box-shadow 180ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
              }}
            >
              {/* Emoji Icon */}
              <div
                style={{
                  fontSize: 32,
                  marginBottom: 16,
                }}
              >
                {problem.emoji}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#000033",
                  marginBottom: 8,
                }}
              >
                {problem.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: "#6c757d",
                  margin: 0,
                }}
              >
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: 18,
              color: "#495057",
              marginBottom: 16,
            }}
          >
            If this sounds like you, GLP-1 therapy could be the missing piece.
          </p>
          <button
            onClick={scrollToHowItWorks}
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 16,
              fontWeight: 600,
              color: "#E8670A",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
              transition: "color 180ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#d35a00";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#E8670A";
            }}
          >
            Learn How It Works →
          </button>
        </div>
      </div>
    </section>
  );
};