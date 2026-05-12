import { OGTRTLeadForm } from "./OGTRTLeadForm";

export const OGTRTFinalCTA = () => (
  <section style={{ background: "#003366", textAlign: "center", padding: "clamp(48px, 8vw, 96px) 0" }} id="book">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="text-center max-w-[640px] mx-auto mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "#FFFFFF" }}>Ready to Get Tested?</h2>
        <p className="mt-3 text-base" style={{ color: "rgba(255,255,255,0.65)" }}>Walk into any of our 3 Virginia centers. Consultation.</p>
        <div className="flex items-center justify-center gap-2 mt-4">
          {Array.from({ length: 5 }).map((_, i) => (<span key={i} style={{ color: "#D4A017", fontSize: "20px" }}>★</span>))}
          <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.80)" }}>200+ Reviews</span>
        </div>
      </div>
      <OGTRTLeadForm heading="Book My Consultation" formId="bottom" />
    </div>
  </section>
);