import { Shield, ClipboardList, Heart, ChevronRight } from "lucide-react";

export const OGEDHowItWorks = () => {
  const steps = [
    { number: "01", icon: Shield, title: "Book a Confidential Visit", description: "Schedule a private, one-on-one appointment. No one else will be in the room. Your visit is completely confidential." },
    { number: "02", icon: ClipboardList, title: "Get a Full Evaluation", description: "Your physician conducts a thorough assessment, including lab work if needed, to identify the root cause — not just treat the symptom." },
    { number: "03", icon: Heart, title: "Start Your Treatment Plan", description: "Personalized treatment options including oral medications, injectables, or combination therapy. Most men see results quickly." },
  ];

  const scrollToForm = () => {
    const form = document.getElementById("lead-form") || document.getElementById("lead-form-bottom");
    form?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section id="how-it-works" style={{ background: "#003366", color: "white", padding: "clamp(48px, 8vw, 96px) 0" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Discreet, Effective Treatment in 3 Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div
                className="text-center p-8 rounded-xl h-full flex flex-col"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5 text-lg font-bold"
                  style={{ background: "rgba(0,72,131,0.3)", border: "2px solid #4da6ff", color: "#4da6ff" }}
                >
                  {step.number}
                </div>
                <div className="flex justify-center mb-4">
                  <step.icon size={28} strokeWidth={1.5} style={{ color: "rgba(255,255,255,0.7)" }} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-[15px] leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.7)" }}>{step.description}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 z-10" style={{ color: "rgba(255,255,255,0.3)" }}>
                  <ChevronRight size={24} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 rounded-lg px-8 font-bold text-sm uppercase cursor-pointer transition-all duration-200 hover:scale-[1.02] border-none"
            style={{ height: 52, background: "#E8670A", color: "#FFFFFF", letterSpacing: "0.08em" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#CF5B09"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#E8670A"; }}
          >
            Book Your Confidential Consult
          </button>
        </div>
      </div>
    </section>
  );
};