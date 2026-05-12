import { UnifiedLeadForm } from "../unified/UnifiedLeadForm";

export const OGTRT2UnifiedFinalCTA = () => (
  <section style={{ background: "#1B2A4A", padding: "clamp(48px, 8vw, 96px) 0" }}>
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="text-center max-w-[640px] mx-auto mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white mb-4">
          Schedule Your First Testosterone Test Today.
        </h2>
        <p className="text-base" style={{ color: "rgba(255,255,255,0.7)" }}>
          Appointments at all 3 Virginia centers.
        </p>
      </div>
      <div className="flex justify-center">
        <UnifiedLeadForm
          heading="Book Your Lab Work"
          formId="og-trt2-final-form"
          service="trt"
          source="og-lp-trt2"
          thankYouPath="/lp/trt2/thank-you"
        />
      </div>
    </div>
  </section>
);
