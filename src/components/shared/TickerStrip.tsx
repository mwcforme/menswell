interface TickerStripProps {
  items: string[];
  speed?: number;
}

export const TickerStrip = ({ items, speed = 30 }: TickerStripProps) => {
  const id = `ticker-${speed}`;
  return (
    <div
      className="relative z-10 overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.08)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className={`flex items-center h-11 gap-8 ${id} hover:[animation-play-state:paused]`}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-8 flex-shrink-0">
            {items.map((label, i) => (
              <span key={i} className="flex items-center gap-8 flex-shrink-0">
                <span
                  className="uppercase whitespace-nowrap"
                  style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", color: "rgba(255,255,255,0.7)" }}
                >
                  {label}
                </span>
                {i < items.length - 1 && <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>}
              </span>
            ))}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes tickerScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .${id} { animation: tickerScroll ${speed}s linear infinite; width: max-content; }
      `}</style>
    </div>
  );
};
