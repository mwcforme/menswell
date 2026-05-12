import { useState } from "react";

const optimalPills = [
  "Increased energy ↗", "Sharper focus ↗", "Stronger drive ↗",
  "Better mood ↗", "Lean muscle ↗", "Improved performance ↗", "Mental clarity ↗",
];

const lowTPills = [
  "Fatigue ↘", "Weight gain ↘", "Brain fog ↘",
  "Low libido ↘", "Mood swings ↘", "Poor sleep ↘", "Loss of strength ↘",
];

export const TRTSymptomToggle = () => {
  const [isOptimal, setIsOptimal] = useState(true);

  return (
    <section
      className="py-14 md:py-20 relative"
      style={{ background: "#000033" }}
    >
      {/* Radial glow — very subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(232,103,10,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6 text-center">
        <h2
          className="font-bold uppercase"
          style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: "clamp(28px, 4vw, 40px)",
            color: "#FFFFFF",
            fontWeight: 700,
          }}
        >
          TURN ON YOUR TESTOSTERONE
        </h2>
        <p
          className="text-base max-w-[600px] mx-auto mt-4"
          style={{ color: "rgba(255,255,255,0.60)", fontFamily: "Inter, sans-serif" }}
        >
          Most men over 35 are walking around with sub-optimal testosterone. When your levels are right, everything changes.
        </p>

        {/* Toggle */}
        <div
          className="relative mx-auto mt-8 flex rounded-full overflow-hidden cursor-pointer select-none"
          style={{ width: 200, height: 44, background: "rgba(255,255,255,0.08)" }}
        >
          <div
            className="absolute top-0 h-full w-1/2 rounded-full transition-all duration-300"
            style={{
              background: isOptimal ? "#E8670A" : "rgba(255,255,255,0.10)",
              left: isOptimal ? 0 : "50%",
            }}
          />
          <button
            onClick={() => setIsOptimal(true)}
            className="relative z-10 flex-1 text-xs font-bold uppercase cursor-pointer bg-transparent border-none"
            style={{
              color: isOptimal ? "#FFFFFF" : "rgba(255,255,255,0.5)",
              letterSpacing: "0.06em",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Optimal
          </button>
          <button
            onClick={() => setIsOptimal(false)}
            className="relative z-10 flex-1 text-xs font-bold uppercase cursor-pointer bg-transparent border-none"
            style={{
              color: !isOptimal ? "#FFFFFF" : "rgba(255,255,255,0.5)",
              letterSpacing: "0.06em",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Low T
          </button>
        </div>

        {/* Pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-8 transition-opacity duration-300">
          {(isOptimal ? optimalPills : lowTPills).map((pill) => (
            <span
              key={pill}
              className="rounded-full px-4 py-2 text-sm font-medium"
              style={
                isOptimal
                  ? {
                      background: "rgba(255,255,255,0.10)",
                      border: "1px solid rgba(255,255,255,0.20)",
                      color: "#FFFFFF",
                      fontFamily: "Inter, sans-serif",
                    }
                  : {
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      color: "rgba(255,255,255,0.40)",
                      fontFamily: "Inter, sans-serif",
                    }
              }
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
