import { ArrowRight, Shield, Clock, MapPin, Award } from "lucide-react";
import { TRT2LeadForm } from "./TRT2LeadForm";

const trustItems = [
  { icon: Award, label: "LegitScript Certified" },
  { icon: Clock, label: "Trusted Since 2015" },
  { icon: Clock, label: "Same-Day Results" },
  { icon: MapPin, label: "3 VA Locations" },
];

export const TRT2Hero = () => {
  const fireCTA = () => {
    window.dispatchEvent(new CustomEvent("lp_trt2_cta_click", { detail: { location: "hero" } }));
    document.getElementById("final-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ background: "#000033", minHeight: "100vh" }}
    >
      {/* Gradient overlays */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,51,0.95) 0%, rgba(0,0,51,0.7) 100%)" }} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column */}
          <div>
            {/* Badge pill */}
            <span
              className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase mb-6"
              style={{
                background: "#F5F0EB",
                color: "#000033",
                letterSpacing: "0.06em",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Testosterone Testing, Limited Availability
            </span>

            <h1
              className="font-bold leading-[1.05]"
              style={{
                fontFamily: "Oswald, sans-serif",
                fontSize: "clamp(32px, 5vw, 56px)",
                color: "#FFFFFF",
                fontWeight: 700,
              }}
            >
              Tired, Low Energy, Losing Muscle?{" "}
              <span style={{ color: "#E8670A" }}>It's Probably Your Testosterone.</span>
            </h1>

            <p
              className="mt-5 text-base md:text-lg leading-relaxed max-w-[540px]"
              style={{ color: "rgba(255,255,255,0.75)", fontFamily: "Inter, sans-serif" }}
            >
              Physician-supervised TRT at 3 Virginia centers. On-site labs. Real results. No referral needed.
            </p>

            <button
              onClick={fireCTA}
              className="mt-8 inline-flex items-center gap-2 rounded-full px-8 font-bold text-sm uppercase cursor-pointer transition-all duration-200 hover:scale-[1.02]"
              style={{
                height: 52,
                background: "#E8670A",
                color: "#FFFFFF",
                letterSpacing: "0.08em",
                fontFamily: "Inter, sans-serif",
                border: "none",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#CF5B09"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#E8670A"; }}
            >
              Book My Consultation <ArrowRight className="h-4 w-4" />
            </button>

            {/* Trust strip */}
            <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2">
              {trustItems.map((item, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <item.icon className="h-3.5 w-3.5" style={{ color: "rgba(255,255,255,0.5)" }} />
                  <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Inter, sans-serif" }}>
                    {item.label}
                  </span>
                  {i < trustItems.length - 1 && (
                    <span className="ml-2 hidden sm:inline" style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right column — form */}
          <div className="w-full max-w-[440px] mx-auto lg:mx-0 lg:ml-auto">
            <TRT2LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
};
