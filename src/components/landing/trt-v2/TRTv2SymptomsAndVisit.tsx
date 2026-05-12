import { Check, ArrowRight } from "lucide-react";

const symptoms = [
  "Persistent fatigue not resolved by sleep",
  "Reduced motivation, drive, or confidence",
  "Difficulty maintaining muscle or losing fat despite consistent training",
  "Lower libido or changes in sexual function",
  "Mood changes, irritability, or reduced focus",
  'Lab results previously labeled "normal" despite ongoing symptoms',
];

const steps = [
  { n: 1, title: "On-site blood work", time: "~15 min", body: "Full hormone and metabolic panel drawn at the clinic." },
  { n: 2, title: "Face-to-face physician consultation", time: "~30 min", body: "Review your symptoms, history, and lab results with a licensed Virginia physician." },
  { n: 3, title: "Personalized care plan", time: "~15 min", body: "Built around your labs and clinical evaluation." },
];

export const TRTv2SymptomsAndVisit = () => {
  const scrollToBooking = () => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="symptoms-visit" style={{ background: "#F5F0EB" }}>
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left */}
          <div>
            <h2 className="font-bold uppercase" style={{ fontFamily: "Oswald, sans-serif", color: "#000033", fontSize: "clamp(24px, 2.6vw, 32px)", letterSpacing: "0.02em", lineHeight: 1.15 }}>
              Common Signs of Low Testosterone in Men
            </h2>
            <ul className="mt-6 space-y-3">
              {symptoms.map((s) => (
                <li key={s} className="flex items-start gap-3" style={{ color: "#1a1a2e", fontFamily: "Inter, sans-serif" }}>
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "#E8670A" }} />
                  <span className="text-base leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm italic" style={{ color: "#4a4a5e", fontFamily: "Inter, sans-serif" }}>
              If these are familiar, a clinical evaluation can determine whether testosterone levels are a contributing factor.
            </p>
          </div>

          {/* Right */}
          <div>
            <h2 className="font-bold uppercase" style={{ fontFamily: "Oswald, sans-serif", color: "#000033", fontSize: "clamp(24px, 2.6vw, 32px)", letterSpacing: "0.02em", lineHeight: 1.15 }}>
              How Your First Visit Works
            </h2>
            <ol className="mt-6 space-y-5">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-4">
                  <div className="flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center font-bold" style={{ background: "#000033", color: "#FFFFFF", fontFamily: "Oswald, sans-serif" }}>
                    {s.n}
                  </div>
                  <div>
                    <div className="font-semibold" style={{ color: "#000033", fontFamily: "Inter, sans-serif" }}>
                      {s.title} <span className="font-normal" style={{ color: "#7a7a8e" }}>· {s.time}</span>
                    </div>
                    <div className="text-sm mt-1" style={{ color: "#4a4a5e", fontFamily: "Inter, sans-serif" }}>{s.body}</div>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm" style={{ color: "#4a4a5e", fontFamily: "Inter, sans-serif" }}>
              Most first visits are completed in under 60 minutes. If treatment is clinically appropriate, it can begin the same day.
            </p>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={scrollToBooking}
            className="inline-flex items-center gap-2 rounded-full px-8 font-bold text-sm uppercase cursor-pointer transition-all duration-200 hover:scale-[1.02]"
            style={{ height: 52, background: "#E8670A", color: "#FFFFFF", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif", border: "none" }}
          >
            Book My Consultation <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
