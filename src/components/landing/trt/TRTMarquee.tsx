const items = [
  "FEEL STRONGER", "THINK CLEARER", "SLEEP BETTER", "LEAN MUSCLE",
  "MORE ENERGY", "SHARPER FOCUS", "LAST LONGER", "LOSE WEIGHT", "BETTER MOOD",
];

const MarqueeContent = () => (
  <>
    {items.map((item, i) => (
      <span key={i} className="flex items-center gap-6 flex-shrink-0">
        <span
          className="font-bold text-lg uppercase"
          style={{
            fontFamily: "Oswald, sans-serif",
            color: "#FFFFFF",
            letterSpacing: "0.08em",
            fontWeight: 700,
          }}
        >
          {item}
        </span>
        <span style={{ color: "rgba(255,255,255,0.65)" }}>◆</span>
      </span>
    ))}
  </>
);

export const TRTMarquee = () => (
  <section
    className="overflow-hidden"
    style={{ background: "var(--brand-cta)", height: 56 }}
  >
    <div className="flex items-center h-full gap-6 animate-marquee hover:[animation-play-state:paused]">
      <MarqueeContent />
      <MarqueeContent />
    </div>

    <style>{`
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee {
        animation: marquee 45s linear infinite;
        width: max-content;
      }
      @media (prefers-reduced-motion: reduce) {
        .animate-marquee {
          animation: none !important;
          transform: translateX(0) !important;
        }
      }
    `}</style>
  </section>
);
