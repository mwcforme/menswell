import { ShieldCheck, BadgeCheck, Lock, Star, CreditCard } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "CLIA", sub: "Certified", iconColor: "#555" },
  { icon: BadgeCheck, label: "LegitScript", serif: true, iconColor: "#555" },
  { icon: Lock, label: "HIPAA", sub: "Compliant", iconColor: "#555" },
  { icon: Star, label: "4.9 ★ Google", iconColor: "#D4A017", filled: true },
  { icon: CreditCard, label: "FSA/HSA", sub: "Accepted", iconColor: "#555" },
];

export const TrustBar = () => {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "#F8FAFC",
        padding: "20px 0",
        borderTop: "1px solid #E2E8F0",
        borderBottom: "1px solid #E2E8F0",
      }}
    >
      {/* Desktop */}
      <div className="hidden md:flex items-center justify-evenly max-w-5xl mx-auto px-6">
        {badges.map((b) => {
          const Icon = b.icon;
          return (
            <div key={b.label} className="flex items-center gap-2">
              <Icon
                size={b.filled ? 18 : 20}
                style={{ color: b.iconColor }}
                {...(b.filled ? { fill: b.iconColor } : {})}
                aria-hidden="true"
              />
              <div className="flex flex-col">
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: "13px",
                    color: "#555555",
                    letterSpacing: b.serif ? "0" : "0.06em",
                    fontFamily: b.serif ? "Georgia, 'Times New Roman', serif" : "inherit",
                  }}
                >
                  {b.label}
                </span>
                {b.sub && (
                  <span style={{ fontWeight: 400, fontSize: "10px", color: "#777" }}>
                    {b.sub}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile — horizontal scroll */}
      <div className="md:hidden -mx-6 px-6 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-8" style={{ width: "max-content" }}>
          {badges.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.label} className="flex items-center gap-2 flex-shrink-0 snap-start">
                <Icon
                  size={b.filled ? 18 : 20}
                  style={{ color: b.iconColor }}
                  {...(b.filled ? { fill: b.iconColor } : {})}
                  aria-hidden="true"
                />
                <div className="flex flex-col">
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: "13px",
                      color: "#555555",
                      letterSpacing: b.serif ? "0" : "0.06em",
                      fontFamily: b.serif ? "Georgia, 'Times New Roman', serif" : "inherit",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {b.label}
                  </span>
                  {b.sub && (
                    <span style={{ fontWeight: 400, fontSize: "10px", color: "#777", whiteSpace: "nowrap" }}>
                      {b.sub}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};
