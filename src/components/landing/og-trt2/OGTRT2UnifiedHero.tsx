import { UnifiedLeadForm } from "../unified/UnifiedLeadForm";

export const OGTRT2UnifiedHero = () => {
  const scrollToForm = () => {
    const form = document.getElementById("og-trt2-lead-form") || document.getElementById("og-trt2-final-form");
    form?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section id="lp-hero" style={{ background: "#1B2A4A" }} className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="text-white">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
              Testosterone Testing. Virginia Centers.
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
              Testosterone Testing. Walk Out With Answers.
            </h1>
            <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.8)" }}>
              A licensed physician draws your blood, reviews results the same day, and tells you exactly where you stand. Three Virginia centers. No referral needed.
            </p>
            <button
              onClick={scrollToForm}
              className="w-full md:w-auto px-8 h-[52px] rounded-full font-bold text-sm uppercase tracking-wider cursor-pointer transition-colors duration-200 border-none"
              style={{ background: "#E8670A", color: "#FFFFFF" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#CF5B09"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#E8670A"; }}
            >
              BOOK MY CONSULTATION
            </button>
            <p className="text-xs mt-6" style={{ color: "rgba(255,255,255,0.45)" }}>
              LegitScript Certified · Trusted Since 2015 · HIPAA Compliant · 3 VA Locations
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <UnifiedLeadForm
              heading="Book Your Lab Work"
              formId="og-trt2-lead-form"
              service="trt"
              source="og-lp-trt2"
              thankYouPath="/lp/trt2/thank-you"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
