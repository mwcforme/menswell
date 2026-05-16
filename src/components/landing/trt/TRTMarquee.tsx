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
      className="flex flex-row items-center justify-center flex-wrap"
      style={{
        maxWidth: 960,
        margin: "0 auto",
        padding: "36px 24px",
        gap: "24px 40px",
      }}
    >
      <img
        src="/images/badges/legitscript.png"
        alt="LegitScript Certified"
        className="h-14 md:h-20 w-auto"
        style={{ maxWidth: 160, objectFit: "contain" }}
        loading="lazy"
      />

      <div aria-hidden="true" className="hidden sm:block" style={{ width: 1, height: 56, background: "rgba(255,255,255,0.20)", flexShrink: 0 }} />

      <img
        src="/images/badges/clia.png"
        alt="CLIA Certified Laboratory"
        className="h-14 md:h-20 w-auto"
        style={{ maxWidth: 160, objectFit: "contain" }}
        loading="lazy"
      />

      <div aria-hidden="true" className="hidden sm:block" style={{ width: 1, height: 56, background: "rgba(255,255,255,0.20)", flexShrink: 0 }} />

      <img
        src="/images/badges/hipaa.png"
        alt="HIPAA Compliant"
        className="h-14 md:h-20 w-auto"
        style={{ maxWidth: 160, objectFit: "contain" }}
        loading="lazy"
      />
    </div>
  </section>
);
