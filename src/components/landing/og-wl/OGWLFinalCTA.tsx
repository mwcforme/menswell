import { OGWLLeadForm } from "./OGWLLeadForm";

export const OGWLFinalCTA = () => (
  <section style={{ background: "#f8f9fa", textAlign: "center", padding: "clamp(48px, 8vw, 96px) 0" }} id="book">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="text-center max-w-[640px] mx-auto mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "#003366" }}>See If Medical Weight Loss Is Right for You</h2>
        <p className="mt-3 text-base" style={{ color: "#555555" }}>Schedule your no-cost consultation today. No obligation. No pressure. Just answers.</p>
      </div>
      <OGWLLeadForm heading="Start Losing Weight Today" formId="bottom" />
    </div>
  </section>
);