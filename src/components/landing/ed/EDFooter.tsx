import { ShieldCheck, Shield, CheckCircle } from "lucide-react";
import { FooterCompliance } from "@/components/ui/FooterCompliance";

export const EDFooter = () => (
  <footer style={{ background: "#000033" }}>
    <div
      style={{
        color: "rgba(255,255,255,0.6)",
        textAlign: "center",
        padding: "40px 24px 0",
        fontSize: 13,
        fontFamily: "'Open Sans', sans-serif",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 16,
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: 12,
          }}
        >
          <ShieldCheck size={22} />
          Men's Wellness Centers
        </div>

        {/* Locations */}
        <div style={{ marginBottom: 8 }}>Richmond · Newport News · Virginia Beach</div>

        {/* Phone */}
        <div>
          <a
            href="tel:8663444955"
            style={{ color: "#ffffff", textDecoration: "none", fontWeight: 600 }}
          >
            866-344-4955
          </a>
        </div>

        {/* Badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            marginTop: 16,
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 14px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 9999,
              fontSize: 11,
              fontWeight: 600,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            <CheckCircle size={16} style={{ color: "#28a745" }} />
            LegitScript Certified
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 14px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 9999,
              fontSize: 11,
              fontWeight: 600,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            <Shield size={16} />
            HIPAA Compliant
          </span>
        </div>
      </div>
    </div>

    <FooterCompliance />
  </footer>
);
