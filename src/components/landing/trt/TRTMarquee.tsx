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
        maxWidth: 860,
        margin: "0 auto",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
      }}
    >
      <img
        src="/images/badges/legitscript.png"
        alt="LegitScript Certified"
        style={{ height: 36, width: "auto", maxWidth: 120, objectFit: "contain" }}
        loading="lazy"
      />

      <div aria-hidden="true" style={{ width: 1, height: 28, background: "rgba(255,255,255,0.15)", flexShrink: 0 }} />

      <img
        src="/images/badges/clia.png"
        alt="CLIA Certified Laboratory"
        style={{ height: 36, width: "auto", maxWidth: 120, objectFit: "contain" }}
        loading="lazy"
      />

      <div aria-hidden="true" style={{ width: 1, height: 28, background: "rgba(255,255,255,0.15)", flexShrink: 0 }} />

      <img
        src="/images/badges/hipaa.png"
        alt="HIPAA Compliant"
        style={{ height: 36, width: "auto", maxWidth: 120, objectFit: "contain" }}
        loading="lazy"
      />
    </div>
  </section>
);
