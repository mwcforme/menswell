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
    }}
  >
    <div
      className="max-w-[860px] mx-auto px-6"
      style={{ paddingTop: 20, paddingBottom: 20, display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "center", gap: 0 }}
    >
      {/* LegitScript */}
      <div className="flex items-center gap-2.5" style={{ flex: "1 1 0", justifyContent: "center" }}>
        <img src="/images/badges/legitscript.png" alt="LegitScript Certified" style={{ height: 34, width: "auto", objectFit: "contain", flexShrink: 0 }} loading="lazy" />
        <div style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.25 }}>
          <div style={{ color: "#FFFFFF", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>LegitScript Certified</div>
          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, whiteSpace: "nowrap" }}>Verified healthcare provider</div>
        </div>
      </div>

      <div aria-hidden="true" style={{ width: 1, height: 28, background: "rgba(255,255,255,0.12)", flexShrink: 0, margin: "0 8px" }} />

      {/* CLIA */}
      <div className="flex items-center gap-2.5" style={{ flex: "1 1 0", justifyContent: "center" }}>
        <img src="/images/badges/clia.png" alt="CLIA Certified Laboratory" style={{ height: 34, width: "auto", objectFit: "contain", flexShrink: 0 }} loading="lazy" />
        <div style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.25 }}>
          <div style={{ color: "#FFFFFF", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>CLIA Certified</div>
          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, whiteSpace: "nowrap" }}>On-site laboratory</div>
        </div>
      </div>

      <div aria-hidden="true" style={{ width: 1, height: 28, background: "rgba(255,255,255,0.12)", flexShrink: 0, margin: "0 8px" }} />

      {/* HIPAA */}
      <div className="flex items-center gap-2.5" style={{ flex: "1 1 0", justifyContent: "center" }}>
        <img src="/images/badges/hipaa.png" alt="HIPAA Compliant" style={{ height: 34, width: "auto", objectFit: "contain", flexShrink: 0 }} loading="lazy" />
        <div style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.25 }}>
          <div style={{ color: "#FFFFFF", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>HIPAA Compliant</div>
          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, whiteSpace: "nowrap" }}>Your records stay private</div>
        </div>
      </div>
    </div>
  </section>
);
