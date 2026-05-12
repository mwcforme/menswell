import { useScrollReveal } from "@/hooks/useScrollReveal";

const stats = [
  {
    value: "40%",
    subtitle: "of men over 45 have clinically low testosterone",
    source: "American Urological Association, 2024",
  },
  {
    value: "15-20%",
    subtitle: "body weight reduction with GLP-1 therapy over 68 weeks",
    source: "New England Journal of Medicine, STEP Trial",
  },
  {
    value: "2-4 weeks",
    subtitle: "to notice improvements in energy, mood, and sexual function on TRT",
    source: "Journal of Clinical Endocrinology & Metabolism",
  },
  {
    value: "Superior",
    subtitle: "outcomes with combined hormonal + metabolic treatment vs. single interventions",
    source: "International Journal of Men's Health",
  },
];

export const LocationCitations = () => {
  const contentRef = useScrollReveal();

  return (
    <section style={{ background: "#EBEAE8", padding: "80px 0" }}>
      <div ref={contentRef} className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-14">
          <h2
            className="font-bold uppercase leading-tight mb-4"
            style={{ color: "#000033", fontSize: "clamp(1.15rem, 3vw, 1.75rem)", letterSpacing: "0.05em" }}
          >
            EVIDENCE-BASED MEDICINE. NOT TRENDS.
          </h2>
          <p className="text-[14px] leading-relaxed max-w-2xl mx-auto" style={{ color: "#666" }}>
            Our treatment protocols are grounded in peer-reviewed research and clinical guidelines.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s) => (
            <div
              key={s.value}
              className="rounded-lg p-5 md:p-6 text-center"
              style={{ background: "#FFFFFF" }}
            >
              <p
                className="font-bold mb-2"
                style={{ color: "#000033", fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}
              >
                {s.value}
              </p>
              <p className="text-[13px] leading-relaxed mb-3" style={{ color: "#333" }}>
                {s.subtitle}
              </p>
              <p className="text-[11px]" style={{ color: "#999" }}>
                {s.source}
              </p>
            </div>
          ))}
        </div>

        <p className="text-[13px] text-center mt-8 leading-relaxed" style={{ color: "#999" }}>
          Clinical outcomes vary. All citations reference published medical research. Your physician will discuss how these findings relate to your individual health profile.
        </p>
      </div>
    </section>
  );
};
