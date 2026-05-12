import { Check, Star01, ArrowNarrowRight } from "@untitledui/icons";
import GHLTRTLeadForm from "./GHLTRTLeadForm";

const GHLTRTHero = () => {
  const scrollToForm = () => {
    document.getElementById("ghl-hero-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="ghl-hero" className="relative min-h-screen flex items-center pt-20" style={{ backgroundColor: "#000033" }}>
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-10"
      >
        <source src="/videos/hero-bg-1.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 max-w-[1170px] mx-auto px-4 py-8 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        {/* Left column */}
        <div className="flex flex-col">
          {/* Certification badges – visible on all screens (CRO-05) */}
          <div className="hidden md:flex flex-wrap gap-3 mb-8">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm text-white/90 font-medium bg-white/20 backdrop-blur-sm border border-white/20">
              <Check size={14} className="text-[#2ECC71]" />
              LegitScript Certified (2025)
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm text-white/90 font-medium bg-white/20 backdrop-blur-sm border border-white/20">
              <Check size={14} className="text-[#2ECC71]" />
              Google Healthcare Certified
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{ fontFamily: "'Bebas Neue', cursive" }}
            className="text-[40px] md:text-[80px] lg:text-[90px] leading-[0.95] text-white mb-6 md:mb-8"
          >
            Stop Managing Decline.{" "}
            <span style={{ color: "#E8670A" }}>Start Performing Again.</span>
          </h1>

          {/* Mobile: social proof + form (CRO-02) */}
          <div className="md:hidden mb-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2.5 border border-white/20 mb-4 w-fit">
              <span className="text-white font-bold text-sm">4.9</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star01 key={i} size={14} className="text-[#E8670A] fill-[#E8670A]" />
                ))}
              </div>
              <span className="text-white/90 text-[13px]">200+ Reviews</span>
            </div>
            <GHLTRTLeadForm id="ghl-hero-form" />
          </div>

          {/* Bullet list */}
          <ul className="space-y-3 mb-8">
            {[
              "Physician-supervised TRT at 3 Virginia centers",
              "On-site labs with results reviewed in-visit",
              "Testosterone testing and consultation",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-white/90 text-[15px]">
                <Check size={18} className="text-[#2ECC71] mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          {/* CTA + Rating - desktop only */}
          <div className="hidden md:flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold uppercase text-sm tracking-wide transition-colors cursor-pointer"
              style={{ backgroundColor: "#E8670A", fontFamily: "Inter, sans-serif" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#CF5B09")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#E8670A")}
            >
              Book My Consultation
              <ArrowNarrowRight size={16} />
            </button>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2.5 border border-white/20">
              <span className="text-white font-bold text-sm">4.9</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star01 key={i} size={14} className="text-[#E8670A] fill-[#E8670A]" />
                ))}
              </div>
              <span className="text-white/90 text-[13px]">200+ Reviews</span>
            </div>
          </div>
        </div>

        {/* Right column - Form (desktop only) */}
        <div className="hidden md:block">
          <GHLTRTLeadForm id="ghl-hero-form" />
        </div>
      </div>
    </section>
  );
};

export default GHLTRTHero;
