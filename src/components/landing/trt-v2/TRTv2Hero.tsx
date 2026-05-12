import { ArrowRight, Check, Star } from "lucide-react";

const trustChecks = [
  "No referral needed",
  "Same/next-day appointments",
  "FSA/HSA accepted",
  "Licensed Virginia physicians",
];

export const TRTv2Hero = () => {
  const scrollTo = (id: string) => () => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    window.dispatchEvent(new CustomEvent("lp_trt_v2_cta_click", { detail: { location: "hero", target: id } }));
  };

  return (
    <section id="hero" className="relative overflow-hidden" style={{ background: "#000033" }}>
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,51,0.98) 0%, rgba(0,0,51,0.85) 100%)" }} />
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-28 pb-16 md:pt-36 md:pb-24">
        <span
          className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase mb-6"
          style={{ background: "#F5F0EB", color: "#000033", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif" }}
        >
          Virginia's In-Person Men's Health Clinics
        </span>

        <h1
          className="font-bold leading-[1.05] max-w-[900px]"
          style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(34px, 5.5vw, 60px)", color: "#FFFFFF", fontWeight: 700 }}
        >
          Physician-Led <span style={{ color: "#E8670A" }}>Testosterone Care</span>, In One Visit
        </h1>

        <p className="mt-5 text-base md:text-lg leading-relaxed max-w-[680px]" style={{ color: "rgba(255,255,255,0.78)", fontFamily: "Inter, sans-serif" }}>
          Walk into one of our 3 Virginia clinics for blood work, a face-to-face physician consultation, and a personalized care plan — typically completed in under 60 minutes. Same-day and next-day appointments available.
        </p>

        <div className="mt-5 flex items-center gap-2 flex-wrap" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "Inter, sans-serif" }}>
          <span className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4" fill="#FFC107" stroke="#FFC107" />)}
          </span>
          <span className="text-sm font-medium">4.9 average from 200+ verified Google reviews</span>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={scrollTo("booking")}
            className="inline-flex items-center gap-2 rounded-full px-8 font-bold text-sm uppercase cursor-pointer transition-all duration-200 hover:scale-[1.02]"
            style={{ height: 52, background: "#E8670A", color: "#FFFFFF", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif", border: "none" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#CF5B09"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#E8670A"; }}
          >
            Book My Consultation <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={scrollTo("symptoms-visit")}
            className="inline-flex items-center gap-2 rounded-full px-8 font-bold text-sm uppercase cursor-pointer transition-all duration-200"
            style={{ height: 52, background: "transparent", color: "#FFFFFF", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif", border: "1px solid rgba(255,255,255,0.35)" }}
          >
            See If You Qualify
          </button>
        </div>

        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3">
          {trustChecks.map((t) => (
            <li key={t} className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "Inter, sans-serif" }}>
              <Check className="h-[18px] w-[18px] flex-shrink-0" style={{ color: "#2ECC71" }} />
              <span className="text-sm font-medium">{t}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Inter, sans-serif" }}>
          Medically reviewed by licensed Virginia physicians.
        </div>
      </div>
    </section>
  );
};
