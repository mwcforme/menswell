const stats = [
  { value: "10,000+", label: "Patients Treated" },
  { value: "Since 2015", label: "Serving Virginia" },
  { value: "4.9★", label: "Google Rating" },
  { value: "Same-Day", label: "Appointments" },
];

const certs = ["LegitScript Certified", "HIPAA Compliant", "Google Healthcare Certified"];

export const TRTv2TrustBar = () => (
  <section style={{ background: "#000033", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
    <div className="max-w-[1200px] mx-auto px-6 py-10 md:py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 text-center">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-2">
            <div className="font-bold uppercase" style={{ fontFamily: "Oswald, sans-serif", color: "#FFFFFF", fontSize: "clamp(28px, 3.5vw, 44px)", lineHeight: 1, letterSpacing: "-0.01em" }}>
              {s.value}
            </div>
            <div className="uppercase" style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.6)", fontSize: 11, letterSpacing: "0.12em", fontWeight: 600 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-6 border-t flex flex-wrap items-center justify-center gap-x-8 gap-y-3" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        {certs.map((c) => (
          <span key={c} className="text-xs uppercase font-semibold" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "Inter, sans-serif", letterSpacing: "0.12em" }}>
            ✓ {c}
          </span>
        ))}
      </div>
    </div>
  </section>
);
