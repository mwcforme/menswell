export const OGTRTResults = () => (
  <section id="results" style={{ background: "#ffffff", padding: "clamp(48px, 8vw, 96px) 0" }}>
    <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold leading-tight" style={{ color: "#003366" }}>Within Your First 2 Months</h2>
        <div className="mt-8 space-y-8">
          <div>
            <span className="text-5xl md:text-6xl font-bold" style={{ color: "#003366" }}>2-5X</span>
            <p className="text-sm mt-1" style={{ color: "#555555" }}>increase in your total testosterone*</p>
          </div>
          <div>
            <span className="text-5xl md:text-6xl font-bold" style={{ color: "#003366" }}>84%</span>
            <p className="text-sm mt-1" style={{ color: "#555555" }}>reported significant improvement in symptoms*</p>
          </div>
        </div>
        <p className="text-xs mt-6" style={{ color: "#888888" }}>*Based on published clinical TRT data</p>
      </div>
      <div>
        <div className="rounded-xl p-8" style={{ background: "#003366" }}>
          <div className="flex gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (<span key={i} style={{ color: "#D4A017", fontSize: "18px" }}>★</span>))}
          </div>
          <p className="text-base italic leading-relaxed" style={{ color: "#FFFFFF" }}>
            "I was tired all the time, gaining weight, zero motivation. Two months in and my wife says I'm a different man. On-site labs, face-to-face with my doctor every visit. The real deal."
          </p>
          <p className="mt-4 font-bold text-sm" style={{ color: "#FFFFFF" }}>Marty H.</p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.60)" }}>Verified Member · Richmond, VA</p>
        </div>
      </div>
    </div>
  </section>
);