const COLORS = {
  cream: "#F5F1E8",
  navy: "#000814",
  muted: "rgba(0,8,20,0.55)",
};

const badges = [
  "LegitScript Certified",
  "HIPAA Compliant",
  "Virginia Licensed",
  "DEA Registered",
  "Physician Led",
  "B Corp Mindset",
];

export const New2Press = () => (
  <section style={{ background: COLORS.cream }} className="pb-24">
    <div className="max-w-[1240px] mx-auto px-5 sm:px-6">
      <div
        className="uppercase text-center mb-10"
        style={{
          color: COLORS.muted,
          fontFamily: "Inter, sans-serif",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.18em",
        }}
      >
        Credentialed and certified
      </div>
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-8 items-center justify-items-center"
        style={{ borderTop: "1px solid rgba(0,8,20,0.08)", borderBottom: "1px solid rgba(0,8,20,0.08)", padding: "32px 0" }}
      >
        {badges.map((b) => (
          <div
            key={b}
            className="text-center"
            style={{
              color: COLORS.navy,
              fontFamily: "Oswald, sans-serif",
              fontSize: 16,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              opacity: 0.8,
            }}
          >
            {b}
          </div>
        ))}
      </div>
    </div>
  </section>
);
