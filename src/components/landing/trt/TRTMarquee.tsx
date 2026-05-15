/**
 * Trust / certification band — single row, images only on mobile, labels on desktop.
 * Order: LegitScript → CLIA → HIPAA
 */
export const TRTMarquee = () => (
  <section
    aria-label="Certifications and credentials"
    style={{
      background: "#111827",
      borderTop: "1px solid rgba(255,255,255,0.07)",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
    }}
  >
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "32px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 56,
      }}
    >
      <img
        src="/images/badges/legitscript.png"
        alt="LegitScript Certified"
        style={{ height: 64, width: "auto", maxWidth: 180, objectFit: "contain" }}
        loading="lazy"
      />

      <div aria-hidden="true" style={{ width: 1, height: 48, background: "rgba(255,255,255,0.18)", flexShrink: 0 }} />

      <img
        src="/images/badges/clia.png"
        alt="CLIA Certified Laboratory"
        style={{ height: 64, width: "auto", maxWidth: 180, objectFit: "contain" }}
        loading="lazy"
      />

      <div aria-hidden="true" style={{ width: 1, height: 48, background: "rgba(255,255,255,0.18)", flexShrink: 0 }} />

      <img
        src="/images/badges/hipaa.png"
        alt="HIPAA Compliant"
        style={{ height: 64, width: "auto", maxWidth: 180, objectFit: "contain" }}
        loading="lazy"
      />
    </div>
  </section>
);
