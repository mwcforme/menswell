import { EDLeadForm } from "./EDLeadForm";

export const EDFinalCTA = () => (
  <section
    style={{ background: "#f8f9fa", textAlign: "center", padding: "clamp(48px, 8vw, 96px) 0" }}
    id="book"
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
            color: "#000033",
          }}
        >
          Schedule a Confidential Consultation
        </h2>
        <p style={{ margin: "12px auto 0", color: "#495057", fontSize: 16, fontFamily: "'Open Sans', sans-serif" }}>
          Schedule your confidential consultation at one of our 3 Virginia centers.
        </p>
      </div>

      <EDLeadForm heading="Schedule My Private Visit" formId="bottom" />
    </div>
  </section>
);
