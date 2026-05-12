import { ShieldCheck, Lock, Zap, MapPin } from "lucide-react";
import { EDLeadForm } from "./EDLeadForm";
import edHeroImg from "@/assets/lp/ed-hero.jpg";

const trustItems = [
  { icon: ShieldCheck, label: "LegitScript Certified" },
  { icon: Lock, label: "100% Confidential" },
  { icon: Zap, label: "Same-Day Treatment" },
  { icon: MapPin, label: "3 VA Locations" },
];

export const EDHero = () => {
  const scrollToForm = () => {
    document.getElementById("lead-form-bottom")?.scrollIntoView({ behavior: "smooth" });
    window.dispatchEvent(new CustomEvent("lp_ed_cta_click", { detail: { button: "hero-cta" } }));
  };

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        background: "linear-gradient(135deg, #000033 0%, #004883 60%, #005a9e 100%)",
        color: "#ffffff",
        overflow: "hidden",
        padding: "clamp(80px, 10vw, 120px) 0 clamp(60px, 8vw, 100px)",
      }}
    >
      {/* Background image overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${edHeroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.15,
          mixBlendMode: "overlay",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <div
          className="ed-hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "center",
          }}
        >
          {/* Left Column */}
          <div style={{ maxWidth: 600 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 16px",
                background: "rgba(255,255,255,0.15)",
                color: "#ffffff",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.5px",
                borderRadius: 9999,
                border: "1px solid rgba(255,255,255,0.25)",
                marginBottom: 20,
              }}
            >
              Confidential ED Treatment at Virginia Centers
            </span>

            <h1
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.5px",
                color: "#ffffff",
                marginBottom: 16,
              }}
            >
              Restore Your Confidence.
              <br className="hidden md:block" />
              Restore Your Connection.
            </h1>

            <p
              style={{
                fontSize: "clamp(16px, 1.5vw, 20px)",
                fontWeight: 400,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.85)",
                marginBottom: 28,
                maxWidth: 520,
                fontFamily: "'Open Sans', sans-serif",
              }}
            >
              Discreet, physician-supervised ED treatment at 3 Virginia centers. Personalized care
              from licensed providers who understand men's health.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>
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
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(232,103,10,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#E8670A";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 14px rgba(232,103,10,0.3)";
                }}
              >
                Book My Confidential Consult
              </button>
            </div>

            {/* Trust Strip */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center" }}>
              {trustItems.map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: "'Montserrat', sans-serif",
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  <item.icon size={18} style={{ flexShrink: 0 }} />
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Form */}
          <div>
            <EDLeadForm formId="hero" />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ed-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
};
