import { ShieldCheck, BadgeCheck, Lock, Star, CreditCard } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const marks = [
  { icon: ShieldCheck, label: "CLIA Certified" },
  { icon: BadgeCheck, label: "LegitScript" },
  { icon: Lock, label: "HIPAA Compliant" },
  { icon: Star, label: "4.9 Google Reviews", gold: true },
  { icon: CreditCard, label: "FSA/HSA Accepted" },
];

export const PressBar = () => {
  const ref = useScrollReveal();

  return (
    <section style={{ background: "#EBEAE8" }} className="py-6 md:py-8">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div ref={ref} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:justify-between md:flex-nowrap">
          {marks.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.label} className="flex items-center gap-1.5 flex-shrink-0">
                <Icon
                  size={m.gold ? 16 : 18}
                  style={{ color: m.gold ? "#D4A017" : "#555" }}
                  fill={m.gold ? "#D4A017" : "none"}
                />
                <span className="text-[11px] md:text-[13px] font-semibold uppercase tracking-wide" style={{ color: "#555", whiteSpace: "nowrap" }}>
                  {m.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
