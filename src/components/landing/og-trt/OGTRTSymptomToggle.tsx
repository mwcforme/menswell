import { useState } from "react";

const optimalPills = ["Increased energy ↗", "Sharper focus ↗", "Stronger drive ↗", "Better mood ↗", "Lean muscle ↗", "Improved performance ↗", "Mental clarity ↗"];
const lowTPills = ["Fatigue ↘", "Weight gain ↘", "Brain fog ↘", "Low libido ↘", "Mood swings ↘", "Poor sleep ↘", "Loss of strength ↘"];

export const OGTRTSymptomToggle = () => {
  const [isOptimal, setIsOptimal] = useState(true);

  return (
    <section className="relative" style={{ background: "#003366", padding: "clamp(48px, 8vw, 96px) 0" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(0,72,131,0.15) 0%, transparent 70%)" }} />
      <div className="relative max-w-[1200px] mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "#FFFFFF" }}>Turn On Your Testosterone</h2>
        <p className="text-base max-w-[600px] mx-auto mt-4" style={{ color: "rgba(255,255,255,0.60)" }}>
          Most men over 35 are walking around with sub-optimal testosterone. When your levels are right, everything changes.
        </p>
        <div className="relative mx-auto mt-8 flex rounded-lg overflow-hidden cursor-pointer select-none" style={{ width: 200, height: 44, background: "rgba(255,255,255,0.08)" }}>
          <div className="absolute top-0 h-full w-1/2 rounded-lg transition-all duration-300" style={{ background: isOptimal ? "#004883" : "rgba(255,255,255,0.10)", left: isOptimal ? 0 : "50%" }} />
          <button onClick={() => setIsOptimal(true)} className="relative z-10 flex-1 text-xs font-bold uppercase cursor-pointer bg-transparent border-none" style={{ color: isOptimal ? "#FFFFFF" : "rgba(255,255,255,0.5)", letterSpacing: "0.06em" }}>Optimal</button>
          <button onClick={() => setIsOptimal(false)} className="relative z-10 flex-1 text-xs font-bold uppercase cursor-pointer bg-transparent border-none" style={{ color: !isOptimal ? "#FFFFFF" : "rgba(255,255,255,0.5)", letterSpacing: "0.06em" }}>Low T</button>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mt-8 transition-opacity duration-300">
          {(isOptimal ? optimalPills : lowTPills).map((pill) => (
            <span key={pill} className="rounded-lg px-4 py-2 text-sm font-medium"
              style={isOptimal
                ? { background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.20)", color: "#FFFFFF" }
                : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.40)" }
              }>{pill}</span>
          ))}
        </div>
      </div>
    </section>
  );
};