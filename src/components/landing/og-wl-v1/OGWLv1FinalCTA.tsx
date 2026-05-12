import { OGWLv1LeadForm } from "./OGWLv1LeadForm";

export const OGWLv1FinalCTA = () => (
  <section style={{ background: "#000033", textAlign: "center", padding: "clamp(48px, 8vw, 96px) 0" }} id="book">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="text-center max-w-[640px] mx-auto mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "#FFFFFF" }}>
          Ready to See Your Labs?
        </h2>
        <p className="mt-3 text-base" style={{ color: "rgba(255,255,255,0.65)" }}>
          Book a no-cost consultation at any of our 3 Virginia centers. Your doctor starts with bloodwork, not guesswork.
        </p>
      </div>
      <OGWLv1LeadForm heading="Book My Consultation" formId="bottom" />
    </div>
  </section>
);
