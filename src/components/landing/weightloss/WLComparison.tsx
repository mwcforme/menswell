import { Check, X } from "lucide-react";

export const WLComparison = () => {
  const features = [
    {
      feature: "Medical oversight",
      online: { has: false, text: "Telehealth questionnaire" },
      mwc: { has: true, text: "In-person physician evaluation" },
    },
    {
      feature: "Lab work",
      online: { has: false, text: "Rarely required" },
      mwc: { has: true, text: "Comprehensive monthly labs" },
    },
    {
      feature: "Medications",
      online: { has: false, text: "One-size-fits-all" },
      mwc: { has: true, text: "Customized GLP-1 protocol" },
    },
    {
      feature: "Follow-up",
      online: { has: false, text: "Email check-ins" },
      mwc: { has: true, text: "Unlimited in-person visits" },
    },
    {
      feature: "Side effect mgmt",
      online: { has: false, text: "DIY" },
      mwc: { has: true, text: "Physician-managed adjustments" },
    },
    {
      feature: "Accountability",
      online: { has: false, text: "Self-directed" },
      mwc: { has: true, text: "Concierge medical support" },
    },
    {
      feature: "Legitimacy",
      online: { has: false, text: "Questionable sources" },
      mwc: { has: true, text: "LegitScript Certified provider" },
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
      id="comparison"
      style={{
        background: "#ffffff",
        padding: "clamp(48px, 8vw, 96px) 0",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px" }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "clamp(32px, 5vw, 56px)" }}>
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "#000033",
            }}
          >
            Why Virginia Men Choose MWC Over Online Weight Loss Clinics
          </h2>
        </div>

        {/* Comparison Table */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            border: "1px solid #e9ecef",
            marginBottom: 48,
          }}
        >
          {/* Table Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              background: "#f8f9fa",
              borderBottom: "2px solid #dee2e6",
            }}
          >
            <div
              style={{
                padding: "20px 24px",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 16,
                fontWeight: 700,
                color: "#495057",
              }}
            >
              Feature
            </div>
            <div
              style={{
                padding: "20px 24px",
                textAlign: "center",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 16,
                fontWeight: 700,
                color: "#6c757d",
                borderLeft: "1px solid #dee2e6",
              }}
            >
              Online Clinics
            </div>
            <div
              style={{
                padding: "20px 24px",
                textAlign: "center",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 16,
                fontWeight: 700,
                color: "#ffffff",
                background: "#004883",
                borderLeft: "1px solid #dee2e6",
              }}
            >
              Men's Wellness Centers
            </div>
          </div>

          {/* Table Rows */}
          {features.map((item, index) => (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr",
                borderBottom: index < features.length - 1 ? "1px solid #e9ecef" : "none",
              }}
            >
              {/* Feature */}
              <div
                style={{
                  padding: "16px 24px",
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#495057",
                }}
              >
                {item.feature}
              </div>

              {/* Online Clinic */}
              <div
                style={{
                  padding: "16px 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  borderLeft: "1px solid #e9ecef",
                  background: "#f8f9fa",
                }}
              >
                <X
                  size={16}
                  style={{
                    color: "#dc3545",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: 13,
                    color: "#6c757d",
                    textAlign: "center",
                  }}
                >
                  {item.online.text}
                </span>
              </div>

              {/* MWC */}
              <div
                style={{
                  padding: "16px 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  borderLeft: "1px solid #e9ecef",
                }}
              >
                <Check
                  size={16}
                  style={{
                    color: "#28a745",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: 13,
                    color: "#495057",
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  {item.mwc.text}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: "center" }}>
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
              boxShadow: "0 4px 14px rgba(232,103,10,0.3)",
              transition: "all 180ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#d35a00";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(232,103,10,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#E8670A";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(232,103,10,0.3)";
            }}
          >
            Start Your Transformation
          </button>
        </div>
      </div>
    </section>
  );
};