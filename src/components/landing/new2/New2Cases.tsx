const COLORS = {
  cream: "#F5F1E8",
  navy: "#000814",
  orange: "#E8670A",
  muted: "rgba(0,8,20,0.6)",
};

const cases = [
  {
    tags: "TRT / ENERGY / RICHMOND",
    title: "From dragging through workouts to back in the gym at 5am.",
  },
  {
    tags: "TRT / FOCUS / VIRGINIA BEACH",
    title: "A 52-year-old executive who finally felt sharp again at work.",
  },
  {
    tags: "TRT / RECOVERY / NEWPORT NEWS",
    title: "An ex-athlete rebuilding strength and sleep after months of fatigue.",
  },
  {
    tags: "TRT / RELATIONSHIPS / RICHMOND",
    title: "Drive and confidence back in the marriage after one visit.",
  },
];

export const New2Cases = () => (
  <section style={{ background: COLORS.cream }} className="pb-24 lg:pb-32">
    <div className="max-w-[1240px] mx-auto px-5 sm:px-6">
      <div
        className="uppercase mb-3"
        style={{
          color: COLORS.orange,
          fontFamily: "Inter, sans-serif",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.18em",
        }}
      >
        Real Men. Real Results.
      </div>
      <h2
        className="font-bold mb-12 max-w-[760px]"
        style={{
          fontFamily: "Oswald, sans-serif",
          color: COLORS.navy,
          fontSize: "clamp(30px, 3.6vw, 48px)",
          lineHeight: 1.05,
          textTransform: "uppercase",
        }}
      >
        Stories from Virginia men who got their edge back.
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cases.map((c, i) => (
          <a
            key={i}
            href="#hero-form"
            className="block group"
            style={{ background: COLORS.navy, borderRadius: 12, overflow: "hidden", minHeight: 360 }}
          >
            <div
              style={{
                height: 180,
                background: `linear-gradient(135deg, rgba(232,103,10,0.25) 0%, rgba(0,8,20,0.95) 100%)`,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0.06,
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.85'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                }}
              />
            </div>
            <div className="p-6">
              <div
                className="uppercase mb-4"
                style={{
                  color: COLORS.orange,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                }}
              >
                {c.tags}
              </div>
              <div
                style={{
                  color: "#F5F1E8",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 16,
                  fontWeight: 600,
                  lineHeight: 1.35,
                }}
              >
                {c.title}
              </div>
            </div>
          </a>
        ))}
      </div>
      <div
        className="mt-6"
        style={{ color: COLORS.muted, fontFamily: "Inter, sans-serif", fontSize: 12 }}
      >
        Composite stories representative of patient experiences. Individual results vary.
      </div>
    </div>
  </section>
);
