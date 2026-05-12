import { ShieldCheck, Users, Activity, MapPin, ArrowRight } from "lucide-react";
import { OGWLLeadForm } from "./OGWLLeadForm";
import heroImage from "@/assets/lp/man-running-outside.avif";

export const OGWLHero = () => {
  const scrollToForm = () => { document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "center" }); };

  return (
    <section id="hero" className="relative overflow-hidden" style={{ minHeight: "70vh", display: "flex", alignItems: "center", background: "#003366", color: "white" }}>
      <div className="absolute inset-0" style={{ backgroundImage: `url(${heroImage})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15 }} />
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-8 md:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg px-4 py-1.5 mb-6" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", fontSize: 13, fontWeight: 600, letterSpacing: "0.04em" }}>
              <ShieldCheck size={14} /> Physician-Supervised GLP-1 Weight Loss
            </div>
            <h1 className="font-bold leading-[1.08]" style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 20 }}>
              Lose Weight the Right Way.<br /><span style={{ color: "#E8670A" }}>With a Physician by Your Side.</span>
            </h1>
            <p className="text-base md:text-lg leading-relaxed max-w-[520px]" style={{ color: "rgba(255,255,255,0.75)", marginBottom: 32 }}>
              FDA-approved GLP-1 medications like Semaglutide, prescribed and monitored by Virginia physicians. Real medical oversight. No mail-order shortcuts.
            </p>
            <button onClick={scrollToForm} className="inline-flex items-center gap-2 rounded-lg px-8 font-bold text-sm uppercase cursor-pointer transition-all duration-200 hover:scale-[1.02]"
              style={{ height: 52, background: "#E8670A", color: "#FFFFFF", letterSpacing: "0.08em", border: "none", marginBottom: 40 }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#CF5B09"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#E8670A"; }}>
              Book Your Consultation <ArrowRight className="h-4 w-4" />
            </button>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[{ icon: ShieldCheck, text: "LegitScript Certified" }, { icon: Users, text: "10,000+ Members" }, { icon: Activity, text: "Monthly Monitoring" }, { icon: MapPin, text: "3 VA Locations" }].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 500 }}>
                  <Icon size={14} className="flex-shrink-0" /><span>{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full"><OGWLLeadForm /></div>
        </div>
      </div>
    </section>
  );
};