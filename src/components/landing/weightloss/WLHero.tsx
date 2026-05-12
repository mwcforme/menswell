import { ShieldCheck, Users, Activity, MapPin } from "lucide-react";
import { WLLeadForm } from "./WLLeadForm";
import heroImage from "@/assets/lp/man-running-outside.avif";

export const WLHero = () => {
  const scrollToForm = () => {
    const form = document.getElementById("lead-form");
    if (form) {
      form.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        background: `linear-gradient(135deg, #000033 0%, #004883 60%, #005a9e 100%)`,
        color: "white",
        overflow: "hidden",
      }}
    >
      {/* Hero Background Image Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.15,
          mixBlendMode: "overlay",
        }}
      />

      <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "clamp(32px, 5vw, 64px)",
            alignItems: "center",
          }}
          className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-8 md:gap-16 items-center"
        >
          {/* Left Column - Content */}
          <div className="order-1">
            {/* Eyebrow Pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                borderRadius: 100,
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 24,
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              <ShieldCheck size={16} />
              Physician-Supervised GLP-1 Weight Loss
            </div>

            {/* H1 */}
            <h1
              style={{
                fontSize: "clamp(28px, 5vw, 48px)",
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: 20,
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: "-0.5px",
              }}
            >
              Lose Weight the Right Way.
              <br />
              With a Doctor by Your Side.
            </h1>

            {/* Subheading */}
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.5,
                marginBottom: 32,
                color: "rgba(255,255,255,0.9)",
                maxWidth: 520,
                fontFamily: "'Open Sans', sans-serif",
              }}
            >
              FDA-approved GLP-1 medications like Semaglutide, prescribed and monitored by Virginia physicians. Real medical oversight. No mail-order shortcuts.
            </p>

            {/* CTA Button */}
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
                marginBottom: 40,
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

            {/* Trust Strip */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 16,
              }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[
                { icon: ShieldCheck, text: "LegitScript Certified" },
                { icon: Users, text: "10,000+ Patients" },
                { icon: Activity, text: "Monthly Monitoring" },
                { icon: MapPin, text: "3 VA Locations" },
              ].map(({ icon: Icon, text }, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: "rgba(255,255,255,0.9)",
                    fontSize: 13,
                    fontWeight: 500,
                    fontFamily: "'Open Sans', sans-serif",
                  }}
                >
                  <Icon size={16} style={{ flexShrink: 0 }} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="order-2">
            <WLLeadForm />
          </div>
        </div>
      </div>
    </section>
  );
};