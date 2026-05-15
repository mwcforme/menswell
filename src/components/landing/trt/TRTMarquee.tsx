/**
 * Trust / certification band.
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
      className="max-w-[900px] mx-auto px-6 flex flex-wrap items-center justify-center gap-10 md:gap-16"
      style={{ paddingTop: 24, paddingBottom: 24 }}
    >
      {/* LegitScript */}
      <div className="flex items-center gap-3">
        <img
          src="/images/badges/legitscript.png"
          alt="LegitScript Certified"
          className="object-contain"
          style={{ height: 44, width: "auto" }}
          loading="lazy"
        />
        <div style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.3 }}>
          <div style={{ color: "#FFFFFF", fontSize: 13, fontWeight: 700 }}>LegitScript Certified</div>
          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>Verified healthcare provider</div>
        </div>
      </div>

      <div aria-hidden="true" style={{ width: 1, height: 32, background: "rgba(255,255,255,0.10)" }} className="hidden md:block" />

      {/* CLIA */}
      <div className="flex items-center gap-3">
        <img
          src="/images/badges/clia.png"
          alt="CLIA Certified Laboratory"
          className="object-contain"
          style={{ height: 44, width: "auto" }}
          loading="lazy"
        />
        <div style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.3 }}>
          <div style={{ color: "#FFFFFF", fontSize: 13, fontWeight: 700 }}>CLIA Certified</div>
          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>On-site laboratory</div>
        </div>
      </div>

      <div aria-hidden="true" style={{ width: 1, height: 32, background: "rgba(255,255,255,0.10)" }} className="hidden md:block" />

      {/* HIPAA */}
      <div className="flex items-center gap-3">
        <img
          src="/images/badges/hipaa.png"
          alt="HIPAA Compliant"
          className="object-contain"
          style={{ height: 44, width: "auto" }}
          loading="lazy"
        />
        <div style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.3 }}>
          <div style={{ color: "#FFFFFF", fontSize: 13, fontWeight: 700 }}>HIPAA Compliant</div>
          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>Your records stay private</div>
        </div>
      </div>
    </div>
  </section>
);
