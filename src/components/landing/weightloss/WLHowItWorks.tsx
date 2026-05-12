import { Calendar, Pill, TrendingDown, ChevronRight } from "lucide-react";

export const WLHowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: Calendar,
      title: "Book Your Visit",
      description: "Schedule at any of our 3 Virginia locations. Your physician reviews your history, goals, and runs comprehensive bloodwork.",
    },
    {
      number: "02",
      icon: Pill,
      title: "Get Your GLP-1 Prescription",
      description: "If you qualify, your physician prescribes Semaglutide or another GLP-1 medication tailored to your body and goals.",
    },
    {
      number: "03",
      icon: TrendingDown,
      title: "Lose Weight with Ongoing Support",
      description: "Monthly check-ins, lab monitoring, and dosage adjustments. We don't just prescribe and disappear.",
    },
  ];

  const scrollToForm = () => {
    const form = document.getElementById("lead-form") || document.getElementById("lead-form-bottom");
    if (form) {
      form.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section
      id="how-it-works"
      style={{
        background: "#000033",
        color: "white",
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
              marginBottom: 16,
            }}
          >
            Your Medical Weight Loss Plan in 3 Steps
          </h2>
        </div>

        {/* Steps */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 32,
            alignItems: "stretch",
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Card */}
              <div
                style={{
                  textAlign: "center",
                  padding: 32,
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.1)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Number */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "rgba(232,103,10,0.2)",
                    border: "2px solid #E8670A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#E8670A",
                  }}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                  <step.icon size={32} style={{ color: "rgba(255,255,255,0.8)" }} />
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: 20,
                    fontWeight: 600,
                    marginBottom: 12,
                    color: "white",
                  }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: "rgba(255,255,255,0.8)",
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {step.description}
                </p>
              </div>

              {/* Desktop Connector Arrow */}
              {index < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10"
                  style={{
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  <ChevronRight size={24} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <button
            onClick={scrollToForm}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "16px 32px",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 16,
              fontWeight: 700,
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              letterSpacing: "0.3px",
              minHeight: 54,
              background: "#E8670A",
              color: "#ffffff",
              boxShadow: "0 4px 14px rgba(232,103,10,0.4)",
              transition: "all 180ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#d35a00";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(232,103,10,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#E8670A";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(232,103,10,0.4)";
            }}
          >
            Book Your Consultation
          </button>
        </div>
      </div>
    </section>
  );
};