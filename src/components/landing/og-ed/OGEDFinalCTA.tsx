import { OGEDLeadForm } from "./OGEDLeadForm";

export const OGEDFinalCTA = () => (
  <section style={{ background: "#f8f9fa", textAlign: "center", padding: "clamp(48px, 8vw, 96px) 0" }} id="book">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="text-center max-w-[640px] mx-auto mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "#003366" }}>
          Schedule a Confidential Consultation
        </h2>
        <p className="mt-3 text-base" style={{ color: "#555555" }}>
          Schedule your confidential consultation at one of our 3 Virginia clinics.
        </p>
      </div>
      <OGEDLeadForm heading="Schedule My Private Visit" formId="bottom" />
    </div>
  </section>
);