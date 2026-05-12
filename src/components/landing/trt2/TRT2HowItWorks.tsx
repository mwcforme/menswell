import { Calendar, TestTube, TrendingUp, ArrowRight } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Calendar,
    title: "Book a Private Visit",
    desc: "Schedule online, call, or text. Same-day and evening appointments available at all 3 locations. Meet privately with our medical team to review your symptoms, medical history, and health goals.",
  },
  {
    num: "02",
    icon: TestTube,
    title: "Get Same-Day Lab Results",
    desc: "Quick, in-center blood draw. No fasting required. Your physician reviews results with you on the spot.",
  },
  {
    num: "03",
    icon: TrendingUp,
    title: "Start Your Custom Plan",
    desc: "If you qualify, your physician prescribes a TRT protocol tailored to your body, goals, and lifestyle.",
  },
];

export const TRT2HowItWorks = () => {
  const fireCTA = () => {
    window.dispatchEvent(new CustomEvent("lp_trt2_cta_click", { detail: { location: "how-it-works" } }));
    document.getElementById("final-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-14 md:py-20" style={{ background: "#FFFFFF" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <h2
          className="font-bold uppercase text-center"
          style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: "clamp(26px, 4vw, 40px)",
            color: "#000033",
            fontWeight: 700,
          }}
        >
          Getting Started Takes 15 Minutes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {steps.map((s) => (
            <div
              key={s.num}
              className="rounded-xl p-6"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ border: "2px solid #E8670A" }}
                >
                  <span className="font-bold text-sm" style={{ color: "#E8670A", fontFamily: "Inter, sans-serif" }}>
                    {s.num}
                  </span>
                </div>
                <s.icon className="h-5 w-5" style={{ color: "#000033" }} />
              </div>
              <h3 className="font-bold text-base" style={{ color: "#000033", fontFamily: "Inter, sans-serif" }}>
                {s.title}
              </h3>
              <p className="text-sm mt-2 leading-relaxed" style={{ color: "#4A4A4A", fontFamily: "Inter, sans-serif" }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={fireCTA}
            className="inline-flex items-center gap-2 rounded-full px-8 font-bold text-sm uppercase cursor-pointer transition-all duration-200 hover:scale-[1.02]"
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
            Book Your Consultation <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
