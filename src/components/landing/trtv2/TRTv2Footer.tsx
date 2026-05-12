import { ShieldPlus, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export const TRTv2Footer = () => (
  <footer style={{ background: "#000033", color: "white", textAlign: "center", padding: "clamp(32px, 5vw, 48px) 0" }}>
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 16 }}>
        <ShieldPlus size={24} style={{ color: "#E8670A" }} />
        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 20, fontWeight: 700 }}>Men's Wellness Centers</span>
      </div>

      <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.8)", marginBottom: 16 }}>
        Richmond · Newport News · Virginia Beach
      </p>

      <a href="tel:8663444955" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 18, fontWeight: 600, color: "#E8670A", textDecoration: "none", display: "block", marginBottom: 24, transition: "color 180ms ease" }}
        onMouseEnter={(e) => { e.currentTarget.style.color = "#d35a00"; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = "#E8670A"; }}
      >
        866-344-4955
      </a>

      <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>
        © 2026 Men's Wellness Centers. All rights reserved.
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", fontSize: 12, fontFamily: "'Open Sans', sans-serif", marginBottom: 24 }}>
        <Link to="/privacy-policy" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "underline", transition: "color 180ms ease" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#E8670A"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
        >Privacy Policy</Link>
        <Link to="/terms-of-service" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "underline", transition: "color 180ms ease" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#E8670A"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
        >Terms of Service</Link>
      </div>

      {/* LegitScript Badge */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.2)", fontSize: 13, color: "rgba(255,255,255,0.7)", fontFamily: "'Open Sans', sans-serif" }}>
        <ShieldCheck size={16} style={{ color: "#28a745" }} />
        LegitScript Certified
      </div>
    </div>
  </footer>
);
