import { Users, Award, Timer, Wallet } from "lucide-react";

export const TRTv2StatBar = () => {
  const stats = [
    { icon: Users, value: "10,000+", label: "Men Treated" },
    { icon: Award, value: "Since 2015", label: "Trusted Provider" },
    { icon: Timer, value: "Same-Day", label: "Lab Results" },
    { icon: Wallet, value: "FSA/HSA", label: "Accepted" },
  ];

  return (
    <section style={{ background: "#ffffff", padding: "clamp(32px, 5vw, 56px) 0", borderTop: "1px solid #EBEAE8" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <div key={i} className="text-center p-4">
              <div className="flex justify-center mb-3" style={{ color: "#000033" }}>
                <Icon size={28} strokeWidth={1.5} />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: "#000033" }}>
                {value}
              </div>
              <div className="text-sm font-medium" style={{ color: "#888888" }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
