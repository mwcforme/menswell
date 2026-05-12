const items = [
  "FEEL STRONGER", "THINK CLEARER", "SLEEP BETTER", "LEAN MUSCLE",
  "MORE ENERGY", "SHARPER FOCUS", "LAST LONGER", "LOSE WEIGHT", "BETTER MOOD",
];

const MarqueeContent = () => (
  <>
    {items.map((item, i) => (
      <span key={i} className="flex items-center gap-6 flex-shrink-0">
        <span className="font-bold text-lg uppercase" style={{ color: "#FFFFFF", letterSpacing: "0.08em", fontWeight: 700 }}>{item}</span>
        <span style={{ color: "rgba(255,255,255,0.40)" }}>◆</span>
      </span>
    ))}
  </>
);

export const OGTRTMarquee = () => (
  <section className="overflow-hidden" style={{ background: "#004883", height: 56 }}>
    <div className="flex items-center h-full gap-6 animate-og-marquee hover:[animation-play-state:paused]">
      <MarqueeContent />
      <MarqueeContent />
    </div>
    <style>{`
      @keyframes ogMarquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      .animate-og-marquee { animation: ogMarquee 25s linear infinite; width: max-content; }
    `}</style>
  </section>
);