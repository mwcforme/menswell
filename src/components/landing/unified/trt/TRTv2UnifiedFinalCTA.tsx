import { UnifiedLeadForm } from "../UnifiedLeadForm";

export const TRTv2UnifiedFinalCTA = () => {
  return (
    <section style={{ background: "#1B2A4A" }} className="py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left: Closing copy */}
          <div className="text-white">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-5">
              Find Out If TRT Is Right for You
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.8)" }}>
              Schedule a confidential consultation at our Richmond, Newport News, or Virginia Beach center. Your first visit includes on-site blood work, results reviewed in-visit, and a face-to-face review with a licensed physician.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.8)" }}>
              No referral needed. No long waits. Just answers.
            </p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              Or call:{" "}
              <a href="tel:8663444955" className="font-semibold text-white hover:underline">
                866-344-4955
              </a>
            </p>
          </div>

          {/* Right: Form */}
          <div className="flex justify-center md:justify-end">
            <UnifiedLeadForm
              heading="Claim Your Consultation"
              formId="trt-final-form"
              service="trt"
              source="lp-trt-v2-final"
              thankYouPath="/lp/trt-v2/thank-you"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
