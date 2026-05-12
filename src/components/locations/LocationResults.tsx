import { useScrollReveal } from "@/hooks/useScrollReveal";

const stats = [
  {
    value: "3x",
    subtitle: "Average increase in total testosterone within 90 days",
    label: "Testosterone Therapy",
  },
  {
    value: "87%",
    subtitle: "of members report improved energy, mood, and mental clarity within 30 days",
    label: "All Programs",
  },
  {
    value: "34 lbs",
    subtitle: "Average weight loss over 6 months on our GLP-1 + hormone optimization protocol",
    label: "Medical Weight Loss",
  },
];

export const LocationResults = () => {
  const contentRef = useScrollReveal();

  return (
    <section style={{ background: "#F5F4F2", padding: "80px 0" }}>
      <div ref={contentRef} className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-14">
          <h2
            className="font-bold uppercase leading-tight mb-4"
            style={{ color: "#000033", fontSize: "clamp(1.15rem, 3vw, 1.75rem)", letterSpacing: "0.05em" }}
          >
            REAL RESULTS FROM REAL MEMBERS
          </h2>
          <p className="text-[14px] leading-relaxed max-w-2xl mx-auto" style={{ color: "#666" }}>
            Anonymized clinical outcomes from Men's Wellness Centers members. Individual results vary based on diagnosis, treatment protocol, and adherence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg p-6 md:p-8 text-center"
              style={{ background: "#FFFFFF" }}
            >
              <p
                className="font-bold mb-3"
                style={{ color: "#000033", fontSize: "clamp(2rem, 5vw, 3rem)" }}
              >
                {s.value}
              </p>
              <p className="text-[14px] leading-relaxed mb-3" style={{ color: "#333" }}>
                {s.subtitle}
              </p>
              <span
                className="inline-block text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
                style={{ background: "rgba(15,42,74,0.06)", color: "#000033" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <p className="text-[12px] text-center mb-8 leading-relaxed" style={{ color: "#999" }}>
          Statistics reflect aggregated, anonymized clinical data from Men's Wellness Centers members. Individual results may vary. These figures are not guarantees of outcome.
        </p>

        <div className="text-center">
          <button
            onClick={() => document.getElementById("location-cta")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center justify-center font-bold uppercase tracking-wider text-[13px] border-none cursor-pointer"
            style={{
              background: "#EA580C",
              color: "#FFFFFF",
              padding: "16px 32px",
              borderRadius: 9999,
              transition: "transform 200ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            BOOK MY CONSULTATION
          </button>
        </div>
      </div>
    </section>
  );
};
