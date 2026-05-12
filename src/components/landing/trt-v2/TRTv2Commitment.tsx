import { FileText, XCircle, Lock } from "lucide-react";

const items = [
  { icon: FileText, label: "No long-term contracts" },
  { icon: XCircle, label: "Cancel anytime" },
  { icon: Lock, label: "HIPAA-secure records" },
];

export const TRTv2Commitment = () => (
  <section style={{ background: "#000033" }}>
    <div className="max-w-[900px] mx-auto px-6 py-16 md:py-20 text-center">
      <h2 className="font-bold uppercase" style={{ fontFamily: "Oswald, sans-serif", color: "#FFFFFF", fontSize: "clamp(26px, 3vw, 38px)", letterSpacing: "0.02em" }}>
        Our Commitment To Your Care
      </h2>
      <p className="mt-6 text-base md:text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.78)", fontFamily: "Inter, sans-serif" }}>
        If your labs and symptoms haven't measurably improved within your first 90 days of treatment, our physicians will reassess and adjust your protocol at no additional consultation cost. There are no long-term contracts. You can cancel care at any time.
      </p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-3">
            <Icon className="h-6 w-6" style={{ color: "#E8670A" }} />
            <div className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "Inter, sans-serif" }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
