import { ShieldCheck, Clock, Zap, MapPin, FlaskConical, ArrowRight } from "lucide-react";
import { OGTRT2LeadForm } from "./OGTRT2LeadForm";
import heroImage from "@/assets/hero-trt-surfers.webp";

export const OGTRT2Hero = () => {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section id="hero" className="relative overflow-hidden" style={{ minHeight: "70vh", display: "flex", alignItems: "center", background: "#003366", color: "white" }}>
      <div className="absolute inset-0" style={{ backgroundImage: `url(${heroImage})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15 }} />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-8 md:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg px-4 py-1.5 mb-6" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", fontSize: 13, fontWeight: 600, letterSpacing: "0.04em" }}>
              <FlaskConical size={14} /> Testosterone Testing — Limited Time
            </div>

            <h1 className="font-bold leading-[1.08]" style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 20 }}>
              Tired, Low Energy, Losing Muscle?<br />
              <span style={{ color: "#E8670A" }}>It's Probably Your Testosterone.</span>
            </h1>

            <p className="text-base md:text-lg leading-relaxed max-w-[520px]" style={{ color: "rgba(255,255,255,0.75)", marginBottom: 32 }}>
              Physician-supervised TRT at 3 Virginia clinics. On-site labs. Real results. No referral needed.
            </p>

            <button onClick={scrollToForm} className="inline-flex items-center gap-2 rounded-lg px-8 font-bold text-sm uppercase cursor-pointer transition-all duration-200 hover:scale-[1.02]"
              style={{ height: 52, background: "#E8670A", color: "#FFFFFF", letterSpacing: "0.08em", border: "none", marginBottom: 40 }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#CF5B09"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#E8670A"; }}
            >
              Book Your Consultation <ArrowRight className="h-4 w-4" />
            </button>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: ShieldCheck, text: "LegitScript Certified" },
                { icon: Clock, text: "Trusted Since 2015" },
                { icon: Zap, text: "Same-Day Results" },
                { icon: MapPin, text: "3 VA Locations" },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 500 }}>
                  <Icon size={14} className="flex-shrink-0" /><span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full"><OGTRT2LeadForm /></div>
        </div>
      </div>
    </section>
  );
};