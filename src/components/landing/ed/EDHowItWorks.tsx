import { Shield, ClipboardList, Heart, ChevronRight } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Shield,
    title: "Book a Confidential Visit",
    desc: "Schedule a private, one-on-one appointment. No one else will be in the room. Your visit is completely confidential.",
    hasConnector: true,
  },
  {
    num: "02",
    icon: ClipboardList,
    title: "Get a Full Evaluation",
    desc: "Your physician conducts a thorough assessment, including lab work if needed, to identify the root cause, not just treat the symptom.",
    hasConnector: true,
  },
  {
    num: "03",
    icon: Heart,
    title: "Start Your Treatment Plan",
    desc: "Personalized treatment options including oral medications, injectables, or combination therapy. Most men see results quickly.",
    hasConnector: false,
  },
];

export const EDHowItWorks = () => {
  const scrollToForm = () => {
    document.getElementById("lead-form-bottom")?.scrollIntoView({ behavior: "smooth" });
    window.dispatchEvent(new CustomEvent("lp_ed_cta_click", { detail: { button: "how-it-works-cta" } }));
  };

  return (
    <section
      id="how-it-works"
      style={{
        background: "#000033",
        color: "#ffffff",
        padding: "clamp(48px, 8vw, 96px) 0",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto", marginBottom: "clamp(32px, 4vw, 56px)" }}>
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(24px, 3vw, 40px)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.3px",
            }}
          >
            Discreet, Effective Treatment in 3 Steps
          </h2>
        </div>

        <div
          className="ed-steps-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 32,
          }}
        >
          {steps.map((step) => (
            <div
              key={step.num}
              style={{ position: "relative", textAlign: "center", padding: "32px 24px" }}
            >
              {/* Step number circle */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 64,
                  height: 64,
                  background: "rgba(255,255,255,0.12)",
                  border: "2px solid rgba(255,255,255,0.2)",
                  color: "#ffffff",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 24,
                  fontWeight: 800,
                  borderRadius: "50%",
                  margin: "0 auto 20px",
                }}
              >
                {step.num}
              </div>

              {/* Icon */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 48,
                  height: 48,
                  margin: "0 auto 12px",
                  color: "#E8670A",
                }}
              >
                <step.icon size={40} />
              </div>

              <h4
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#ffffff",
                  marginBottom: 10,
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                {step.title}
              </h4>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.7,
                  maxWidth: 300,
                  margin: "0 auto",
                  fontFamily: "'Open Sans', sans-serif",
                }}
              >
                {step.desc}
              </p>

              {/* Connector arrow */}
              {step.hasConnector && (
                <div
                  className="ed-step-connector"
                  style={{
                    position: "absolute",
                    top: 62,
                    right: -20,
                    width: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.2)",
                  }}
                >
                  <ChevronRight size={24} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <button
            onClick={scrollToForm}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "16px 40px",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 17,
              fontWeight: 700,
              border: "none",
              borderRadius: 12,
              cursor: "pointer",
              letterSpacing: "0.3px",
              minHeight: 56,
              background: "#E8670A",
              color: "#ffffff",
              boxShadow: "0 4px 14px rgba(232,103,10,0.3)",
              transition: "all 180ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#d35a00";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#E8670A";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Book Your Confidential Consult
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ed-steps-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .ed-step-connector { display: none !important; }
        }
      `}</style>
    </section>
  );
};
