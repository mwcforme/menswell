import { UnifiedLeadForm } from "../unified/UnifiedLeadForm";

export const OGTRTUnifiedFinalCTA = () => {
  return (
    <section style={{ background: "#1B2A4A" }} className="py-16 md:py-24">
      <div className="max-w-[600px] mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
          Schedule Your First Testosterone Test Today.
        </h2>
        <p className="text-base mb-10" style={{ color: "rgba(255,255,255,0.7)" }}>
          Appointments at all 3 Virginia centers.
        </p>
        <div className="flex justify-center">
          <UnifiedLeadForm
            heading="Book Your Consultation"
            formId="og-trt-final-form"
            service="trt"
            source="og-lp-trt-final"
            thankYouPath="/lp/trt2/thank-you"
          />
        </div>
      </div>
    </section>
  );
};
