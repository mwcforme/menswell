import { UnifiedLeadForm } from "@/components/landing/unified/UnifiedLeadForm";

export const OGWLUnifiedFinalCTA = () => (
  <section
    id="book"
    style={{ background: "#1B2A4A", padding: "clamp(48px, 8vw, 96px) 0", textAlign: "center" }}
  >
    <div className="max-w-[1200px] mx-auto px-6">
      <h2
        className="text-2xl md:text-3xl font-bold leading-tight mb-3"
        style={{ color: "#FFFFFF" }}
      >
        Book a Consultation at Any of Our 3 Virginia Centers.
      </h2>
      <p className="text-base mb-10" style={{ color: "rgba(255,255,255,0.6)" }}>
        Appointments available.
      </p>

      <div className="flex justify-center">
        <UnifiedLeadForm
          heading="Book My Consultation"
          formId="og-wl-final-form"
          service="weight-loss"
          source="og-lp-weightloss-v2"
          thankYouPath="/lp/weight-loss-v2/thank-you"
          locationHelperText="Choose the center closest to you."
        />
      </div>
    </div>
  </section>
);
