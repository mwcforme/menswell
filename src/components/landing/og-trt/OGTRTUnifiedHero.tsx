import { UnifiedLeadForm } from "../unified/UnifiedLeadForm";

export const OGTRTUnifiedHero = () => {
  const scrollToForm = () => {
    document.getElementById("unified-lead-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section id="lp-hero" style={{ background: "#1B2A4A" }} className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_420px] gap-10 md:gap-16 items-center">
          <div>
            <p
              className="text-sm font-semibold tracking-wide uppercase mb-6"
              style={{ color: "rgba(255,255,255,0.6)", letterSpacing: "0.06em" }}
            >
              Testosterone Replacement Therapy. Physician-Run. Virginia Centers.
            </p>
            <h1
              className="font-bold leading-tight mb-6"
              style={{ color: "#FFFFFF", fontSize: "clamp(28px, 5vw, 46px)" }}
            >
              Low T Treatment at 3 Virginia Centers.{" "}
              <span style={{ color: "#E8670A" }}>Physician-Supervised. Lab-Verified.</span>
            </h1>
            <p
              className="text-base md:text-lg leading-relaxed mb-8 max-w-[540px]"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              A licensed physician draws your blood, reviews results the same day, and builds a protocol based on your labs. No referral needed. No apps. No guesswork.
            </p>
            <button
              onClick={scrollToForm}
              className="rounded-full px-8 font-bold text-sm uppercase tracking-wider cursor-pointer transition-colors duration-200"
              style={{ height: 52, background: "#E8670A", color: "#FFFFFF", border: "none", letterSpacing: "0.08em" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#CF5B09"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#E8670A"; }}
            >
              BOOK MY CONSULTATION
            </button>
            <p
              className="mt-8 text-sm"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              LegitScript Certified · Trusted Since 2015 · HIPAA Compliant · 3 VA Locations
            </p>
          </div>
          <div className="w-full">
            <UnifiedLeadForm
              heading="Book Your Consultation"
              formId="unified-lead-form"
              service="trt"
              source="og-lp-trt"
              thankYouPath="/lp/trt2/thank-you"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
