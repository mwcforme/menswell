import imgFirstVisit from "@/assets/lp/first-visit-bloodwork.png";
import { Check } from "lucide-react";

export const TRTPricingCTA = () => {
  const scrollToForm = () => {
    document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" });
  };

  const trust = [
    "Physician-Led",
    "LegitScript Certified",
    "HIPAA Compliant",
    "3 Virginia Locations",
  ];

  return (
    <section id="pricing-cta" className="py-10 md:py-14" style={{ background: "#E8670A" }}>
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
        {/* Left: copy (mobile second) */}
        <div className="order-2 md:order-1">
          <h2
            className="font-bold uppercase"
            style={{
              fontFamily: "Oswald, sans-serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              color: "#FFFFFF",
              fontWeight: 700,
            }}
          >
            YOUR FIRST VISIT IS ON US.<br />HERE'S WHAT'S INCLUDED.
          </h2>

          <ul className="mt-6 space-y-3" style={{ fontFamily: "Inter, sans-serif" }}>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 flex-shrink-0 mt-0.5" strokeWidth={3} style={{ color: "#FFFFFF" }} />
              <span className="text-base" style={{ color: "#FFFFFF", fontSize: 16 }}>
                <strong>Initial consult at no cost.</strong> Labs, physician visit, and your plan reviewed on us.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 flex-shrink-0 mt-0.5" strokeWidth={3} style={{ color: "#FFFFFF" }} />
              <span className="text-base" style={{ color: "#FFFFFF", fontSize: 16 }}>
                <strong>Treatment, if prescribed:</strong> from $199/month.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 flex-shrink-0 mt-0.5" strokeWidth={3} style={{ color: "#FFFFFF" }} />
              <span className="text-base" style={{ color: "#FFFFFF", fontSize: 16 }}>
                FSA/HSA accepted.
              </span>
            </li>
          </ul>

          <button
            onClick={scrollToForm}
            className="mt-6 rounded-full px-8 font-bold uppercase cursor-pointer transition-colors duration-200 w-full sm:w-auto"
            style={{
              height: 56,
              minHeight: 56,
              background: "#FFFFFF",
              color: "#000033",
              fontSize: 15,
              letterSpacing: "0.08em",
              fontFamily: "Inter, sans-serif",
              border: "none",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.90)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#FFFFFF"; }}
          >
            Claim My Consult
          </button>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-5">
            {trust.map((label) => (
              <li key={label} className="flex items-center gap-2">
                <Check className="h-[18px] w-[18px] flex-shrink-0" style={{ color: "#2ECC71" }} />
                <span className="text-sm font-medium" style={{ color: "#FFFFFF", fontFamily: "Inter, sans-serif" }}>{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: image (mobile first) */}
        <div className="order-1 md:order-2">
          <img
            src={imgFirstVisit}
            alt="Phlebotomist drawing blood for on-site testosterone panel at Men's Wellness Centers"
            className="rounded-2xl object-cover w-full aspect-[4/3] md:aspect-auto md:h-[360px]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};
