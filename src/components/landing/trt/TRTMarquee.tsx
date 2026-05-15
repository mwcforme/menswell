/**
 * Trust / certification band — single row, no wrapping.
 * Order: LegitScript → CLIA → HIPAA
 */
export const TRTMarquee = () => (
  <section
    aria-label="Certifications and credentials"
    style={{
      background: "#111827",
      borderTop: "1px solid rgba(255,255,255,0.07)",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      overflowX: "hidden",
    }}
  >
    <div
      style={{
        maxWidth: 860,
        margin: "0 auto",
        padding: "18px 16px",
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      {/* LegitScript */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
        <img
          src="/images/badges/legitscript.png"
          alt="LegitScript Certified"
          style={{ height: 32, width: "auto", objectFit: "contain", flexShrink: 0 }}
          loading="lazy"
        />
        <div style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.25, minWidth: 0 }}>
          <div style={{ color: "#FFFFFF", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>LegitScript</div>
          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, whiteSpace: "nowrap" }}>Certified</div>
        </div>
      </div>

      <div aria-hidden="true" style={{ width: 1, height: 28, background: "rgba(255,255,255,0.12)", flexShrink: 0, margin: "0 12px" }} />

      {/* CLIA */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
        <img
          src="/images/badges/clia.png"
          alt="CLIA Certified Laboratory"
          style={{ height: 32, width: "auto", objectFit: "contain", flexShrink: 0 }}
          loading="lazy"
        />
        <div style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.25, minWidth: 0 }}>
          <div style={{ color: "#FFFFFF", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>CLIA Certified</div>
          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, whiteSpace: "nowrap" }}>On-site labs</div>
        </div>
      </div>

      <div aria-hidden="true" style={{ width: 1, height: 28, background: "rgba(255,255,255,0.12)", flexShrink: 0, margin: "0 12px" }} />

      {/* HIPAA */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
        <img
          src="/images/badges/hipaa.png"
          alt="HIPAA Compliant"
          style={{ height: 32, width: "auto", objectFit: "contain", flexShrink: 0 }}
          loading="lazy"
        />
        <div style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.25, minWidth: 0 }}>
          <div style={{ color: "#FFFFFF", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>HIPAA Compliant</div>
          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, whiteSpace: "nowrap" }}>Private records</div>
        </div>
      </div>
    </div>
  </section>
);
