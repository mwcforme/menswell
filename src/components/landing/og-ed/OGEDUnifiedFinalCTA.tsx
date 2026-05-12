import { UnifiedLeadForm } from "../unified/UnifiedLeadForm";

export const OGEDUnifiedFinalCTA = () => {
  return (
    <section style={{ background: "#1B2A4A" }} className="py-16 md:py-24">
      <div className="max-w-[600px] mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
          Schedule a Confidential Consultation Today.
        </h2>
        <p className="text-base mb-10" style={{ color: "rgba(255,255,255,0.7)" }}>
          Appointments at all 3 Virginia centers.
        </p>
        <div className="flex justify-center">
          <UnifiedLeadForm
            heading="Claim Your Consultation"
            formId="og-ed-final-form"
            service="ed"
            source="og-lp-ed-final"
            thankYouPath="/lp/trt2/thank-you"
          />
        </div>
      </div>
    </section>
  );
};
