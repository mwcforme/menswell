import { ShieldCheck, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export const WLFooter = () => (
  <footer
    style={{
      background: "#000033",
      color: "white",
      textAlign: "center",
      padding: "clamp(32px, 5vw, 48px) 0",
    }}
  >
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
        <img src="/logos/Text_Logo_white.png" alt="Men's Wellness Centers" style={{ height: 28 }} />
      </div>

      {/* Locations */}
      <p
        style={{
          fontFamily: "'Open Sans', sans-serif",
          fontSize: 15,
          color: "rgba(255,255,255,0.8)",
          marginBottom: 16,
        }}
      >
        Richmond · Newport News · Virginia Beach
      </p>

      {/* Phone */}
      <a
        href="tel:8663444955"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 18,
          fontWeight: 600,
          color: "#E8670A",
          textDecoration: "none",
          display: "block",
          marginBottom: 24,
          transition: "color 180ms ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#d35a00";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#E8670A";
        }}
      >
        866-344-4955
      </a>

      {/* Badges */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 24,
          marginBottom: 24,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 14,
            color: "rgba(255,255,255,0.8)",
            fontFamily: "'Open Sans', sans-serif",
          }}
        >
          <ShieldCheck size={16} />
          LegitScript Certified
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 14,
            color: "rgba(255,255,255,0.8)",
            fontFamily: "'Open Sans', sans-serif",
          }}
        >
          <Lock size={16} />
          HIPAA Compliant
        </div>
      </div>

      {/* Copyright */}
      <p
        style={{
          fontFamily: "'Open Sans', sans-serif",
          fontSize: 13,
          color: "rgba(255,255,255,0.6)",
          marginBottom: 16,
        }}
      >
        © 2026 Men's Wellness Centers. All rights reserved.
      </p>

      {/* Legal Links */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 16,
          flexWrap: "wrap",
          fontSize: 12,
          fontFamily: "'Open Sans', sans-serif",
        }}
      >
        <Link
          to="/privacy-policy"
          style={{
            color: "rgba(255,255,255,0.6)",
            textDecoration: "underline",
            transition: "color 180ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#E8670A";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.6)";
          }}
        >
          Privacy Policy
        </Link>
        <Link
          to="/terms-of-service"
          style={{
            color: "rgba(255,255,255,0.6)",
            textDecoration: "underline",
            transition: "color 180ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#E8670A";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.6)";
          }}
        >
          Terms of Service
        </Link>
        <Link
          to="/telehealth-consent"
          style={{
            color: "rgba(255,255,255,0.6)",
            textDecoration: "underline",
            transition: "color 180ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#E8670A";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.6)";
          }}
        >
          HIPAA Notice
        </Link>
      </div>
    </div>
  </footer>
);