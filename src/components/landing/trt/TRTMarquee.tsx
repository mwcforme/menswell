/**
 * Trust / certification band.
 * Replaces the scrolling marquee — certification logos do more trust-building
 * work at the same visual weight without the supplement-brand feel.
 */
export const TRTMarquee = () => (
  <section
    aria-label="Certifications and credentials"
    style={{ background: "#0A1628", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
  >
    <div
      className="max-w-[1200px] mx-auto px-6 flex flex-wrap items-center justify-center gap-8 md:gap-12"
      style={{ paddingTop: 28, paddingBottom: 28 }}
    >
      {/* CLIA */}
      <div className="flex items-center gap-3">
        <img
          src="/images/badges/clia.png"
          alt="CLIA Certified Laboratory"
          className="h-10 w-auto object-contain"
          style={{ filter: "brightness(0) invert(1)", opacity: 0.75 }}
          loading="lazy"
        />
        <div style={{ fontFamily: "Inter, sans-serif" }}>
          <div style={{ color: "#FFFFFF", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1.2 }}>CLIA Certified</div>
          <div style={{ color: "rgba(255,255,255,0.50)", fontSize: 11 }}>On-site laboratory</div>
        </div>
      </div>

      <div aria-hidden="true" style={{ width: 1, height: 36, background: "rgba(255,255,255,0.12)" }} className="hidden md:block" />

      {/* HIPAA */}
      <div className="flex items-center gap-3">
        <img
          src="/images/badges/hipaa.png"
          alt="HIPAA Compliant"
          className="h-10 w-auto object-contain"
          style={{ filter: "brightness(0) invert(1)", opacity: 0.75 }}
          loading="lazy"
        />
        <div style={{ fontFamily: "Inter, sans-serif" }}>
          <div style={{ color: "#FFFFFF", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1.2 }}>HIPAA Compliant</div>
          <div style={{ color: "rgba(255,255,255,0.50)", fontSize: 11 }}>Your data stays private</div>
        </div>
      </div>

      <div aria-hidden="true" style={{ width: 1, height: 36, background: "rgba(255,255,255,0.12)" }} className="hidden md:block" />

      {/* LegitScript */}
      <div className="flex items-center gap-3">
        <img
          src="/images/badges/legitscript.png"
          alt="LegitScript Certified"
          className="h-10 w-auto object-contain"
          style={{ filter: "brightness(0) invert(1)", opacity: 0.75 }}
          loading="lazy"
        />
        <div style={{ fontFamily: "Inter, sans-serif" }}>
          <div style={{ color: "#FFFFFF", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1.2 }}>LegitScript Certified</div>
          <div style={{ color: "rgba(255,255,255,0.50)", fontSize: 11 }}>Healthcare verified</div>
        </div>
      </div>

      <div aria-hidden="true" style={{ width: 1, height: 36, background: "rgba(255,255,255,0.12)" }} className="hidden md:block" />

      {/* Virginia Board of Medicine */}
      <div className="flex items-center gap-3">
        <div
          aria-hidden="true"
          className="flex items-center justify-center flex-shrink-0"
          style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}
        >
          <span style={{ color: "#FFFFFF", fontSize: 18 }}>⚕</span>
        </div>
        <div style={{ fontFamily: "Inter, sans-serif" }}>
          <div style={{ color: "#FFFFFF", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1.2 }}>VA Board of Medicine</div>
          <div style={{ color: "rgba(255,255,255,0.50)", fontSize: 11 }}>Licensed Virginia providers</div>
        </div>
      </div>
    </div>
  </section>
);
