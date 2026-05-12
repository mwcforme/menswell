import { UnifiedLeadForm } from "../UnifiedLeadForm";

export const EDUnifiedFinalCTA = () => {
  return (
    <section style={{ background: "#1B2A4A" }} className="py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="text-white">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-5">
              Get Answers. Get Treated. Move On.
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.8)" }}>
              Schedule a confidential evaluation at our Richmond, Newport News, or Virginia Beach center. Your visit includes a private consultation, same-day lab work, and a prescription plan built for you.
            </p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              Or call:{" "}
              <a href="tel:8663444955" className="font-semibold text-white hover:underline">866-344-4955</a>
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <UnifiedLeadForm
              heading="Claim Your Consultation"
              formId="ed-final-form"
              service="ed"
              source="lp-ed-final"
              thankYouPath="/lp/trt-v2/thank-you"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
