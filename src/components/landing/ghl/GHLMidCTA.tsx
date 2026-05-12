import type { GHLVerticalConfig } from "@/data/ghl-config";

interface Props { config: GHLVerticalConfig }

const GHLMidCTA = ({ config }: Props) => {
  const { midCTA, formId } = config;

  const scrollToForm = () => {
    document.getElementById(formId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-12 md:py-20 text-center" style={{ backgroundColor: "#000033" }}>
      <div className="max-w-[1170px] mx-auto px-4">
        <h2 style={{ fontFamily: "'Bebas Neue', cursive" }} className="text-[32px] md:text-[48px] text-white leading-tight mb-4">
          {midCTA.headline}
        </h2>
        <p className="text-white/80 text-[15px] max-w-xl mx-auto mb-8">{midCTA.body}</p>
        <button
          onClick={scrollToForm}
          className="px-8 py-4 rounded-full text-white font-semibold uppercase text-sm tracking-wide transition-colors"
          style={{ backgroundColor: "#E8670A", fontFamily: "Inter, sans-serif" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#CF5B09")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#E8670A")}
        >
          {midCTA.ctaText}
        </button>
      </div>
    </section>
  );
};

export default GHLMidCTA;
