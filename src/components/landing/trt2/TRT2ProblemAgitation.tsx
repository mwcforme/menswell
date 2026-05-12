import { BatteryLow, Dumbbell, BrainCog, HeartOff, Scale, CloudRain, type LucideIcon } from "lucide-react";

const symptoms: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: BatteryLow, title: "Chronic Fatigue", desc: "You sleep 8 hours and still drag through the day." },
  { icon: Dumbbell, title: "Muscle Loss", desc: "You're working out but losing ground, not gaining." },
  { icon: BrainCog, title: "Irritability & Brain Fog", desc: "Short temper, can't focus, feel like a different person." },
  { icon: HeartOff, title: "Low Libido", desc: "Your drive isn't what it used to be — in or out of the bedroom." },
  { icon: Scale, title: "Weight Gain", desc: "Belly fat increasing no matter what you do." },
  { icon: CloudRain, title: "Low Mood", desc: "Not depressed exactly, but you've lost your edge." },
];

export const TRT2ProblemAgitation = () => {
  const fireCTA = () => {
    window.dispatchEvent(new CustomEvent("lp_trt2_cta_click", { detail: { location: "problem" } }));
    document.getElementById("final-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-14 md:py-20" style={{ background: "#F5F0EB" }}>
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
          Low Testosterone Affects More Than You Think
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {symptoms.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="rounded-xl p-6"
                style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
              >
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{ width: 56, height: 56, background: "#F5F0EB" }}
                >
                  <Icon size={28} style={{ color: "#E8670A" }} strokeWidth={1.8} />
                </div>
                <h3 className="font-bold text-base mt-3" style={{ color: "#000033", fontFamily: "Inter, sans-serif" }}>
                  {s.title}
                </h3>
                <p className="text-sm mt-1.5 leading-relaxed" style={{ color: "#4A4A4A", fontFamily: "Inter, sans-serif" }}>
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <p className="text-sm" style={{ color: "#4A4A4A", fontFamily: "Inter, sans-serif" }}>
            If 2 or more of these sound familiar, low T could be the cause.
          </p>
          <button
            onClick={fireCTA}
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold cursor-pointer bg-transparent border-none"
            style={{ color: "#E8670A", fontFamily: "Inter, sans-serif" }}
          >
            Find Out Today →
          </button>
        </div>
      </div>
    </section>
  );
};
