import { UnifiedLeadForm } from "@/components/landing/unified/UnifiedLeadForm";

export const OGWLUnifiedHero = () => {
  const scrollToForm = () => {
    document.getElementById("wl-hero-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section
      id="lp-hero"
      className="relative overflow-hidden flex items-center"
      style={{ minHeight: "70vh", background: "#1B2A4A", color: "#FFFFFF" }}
    >
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_420px] gap-10 md:gap-16 items-center">
          <div>
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-6"
              style={{ color: "rgba(255,255,255,0.6)", letterSpacing: "0.08em" }}
            >
              Physician-Supervised Weight Loss. No Stimulants. No Gimmicks.
            </p>

            <h1
              className="font-bold leading-[1.08] mb-5"
              style={{ fontSize: "clamp(28px, 5vw, 48px)", letterSpacing: "-0.5px" }}
            >
              Medical Weight Loss.{" "}
              <span style={{ color: "#E8670A" }}>Built on Lab Work.</span>
            </h1>

            <p
              className="text-base md:text-lg leading-relaxed max-w-[520px] mb-8"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              Your doctor runs the labs, builds the plan, and monitors every pound.
              Stimulant-free vitamin injections at 3 Virginia centers.
            </p>

            <button
              onClick={scrollToForm}
              className="rounded-full px-8 font-bold text-sm uppercase cursor-pointer transition-colors duration-200"
              style={{
                height: 52,
                background: "#E8670A",
                color: "#FFFFFF",
                letterSpacing: "0.08em",
                border: "none",
                marginBottom: 40,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#CF5B09"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#E8670A"; }}
            >
              Book My Consultation
            </button>

            <p
              className="text-sm font-medium"
              style={{ color: "rgba(255,255,255,0.45)", letterSpacing: "0.02em" }}
            >
              LegitScript Certified · Trusted Since 2015 · HIPAA Compliant · 3 VA Locations
            </p>
          </div>

          <div className="w-full">
            <UnifiedLeadForm
              heading="Book Your Consultation"
              formId="wl-hero-form"
              service="weight-loss"
              source="og-lp-weightloss-v2"
              thankYouPath="/lp/weight-loss-v2/thank-you"
              locationHelperText="Choose the center closest to you."
            />
          </div>
        </div>
      </div>
    </section>
  );
};
