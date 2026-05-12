import { UnifiedLeadForm } from "../UnifiedLeadForm";

export const TRTv2UnifiedHero = () => {
  return (
    <section id="lp-hero" style={{ background: "#1B2A4A" }} className="pt-[60px]">
      <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left: Copy */}
          <div className="text-white">
            <h1 className="text-3xl md:text-[42px] md:leading-[1.15] font-extrabold mb-5">
              Tired, Low Energy, Losing Muscle? It's Probably Your Testosterone.
            </h1>
            <p className="text-base md:text-lg mb-6" style={{ color: "rgba(255,255,255,0.8)" }}>
              Get tested at one of our 3 Virginia centers. Results in hand the same day. A licensed physician reviews everything with you face to face. No apps. No subscriptions. No waiting.
            </p>

            {/* Trust Badges - text only */}
            <p className="text-xs md:text-sm font-medium tracking-wide mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
              LegitScript Certified · Trusted Since 2015 · HIPAA Compliant · 3 VA Locations
            </p>

            {/* CTA for mobile - scroll to form */}
            <button
              onClick={() => {
                const form = document.getElementById("trt-hero-form");
                if (form) form.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className="md:hidden w-full h-[52px] rounded-full font-bold text-sm uppercase tracking-wider cursor-pointer mb-6"
              style={{ background: "#E8670A", color: "#FFFFFF", border: "none" }}
            >
              BOOK MY CONSULTATION
            </button>
          </div>

          {/* Right: Form */}
          <div className="flex justify-center md:justify-end">
            <UnifiedLeadForm
              heading="Claim Your Consultation"
              formId="trt-hero-form"
              service="trt"
              source="lp-trt-v2"
              thankYouPath="/lp/trt-v2/thank-you"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
