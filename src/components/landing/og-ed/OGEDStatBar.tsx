import { Users, Lock, Zap, CreditCard } from "lucide-react";

export const OGEDStatBar = () => {
  const stats = [
    { icon: Users, value: "10,000+", label: "Men Treated" },
    { icon: Lock, value: "100%", label: "Confidential" },
    { icon: Zap, value: "Same-Day", label: "Treatment Options" },
    { icon: CreditCard, value: "FSA/HSA", label: "Accepted" },
  ];

  return (
    <section style={{ background: "#004883", padding: "clamp(32px, 5vw, 56px) 0" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <div key={i} className="text-center p-4">
              <div className="flex justify-center mb-3" style={{ color: "#ffffff" }}>
                <Icon size={28} strokeWidth={1.5} />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: "#ffffff" }}>
                {value}
              </div>
              <div className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.75)" }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};