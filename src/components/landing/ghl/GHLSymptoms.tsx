import type { GHLVerticalConfig } from "@/data/ghl-config";

interface Props { config: GHLVerticalConfig }

const GHLSymptoms = ({ config }: Props) => {
  const { symptoms, formId } = config;

  const scrollToForm = () => {
    document.getElementById(formId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section style={{ backgroundColor: "#F5F0EB" }} className="py-12 md:py-20">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <p className="text-[#666] text-sm uppercase tracking-widest mb-2">{symptoms.preTitle}</p>
          {symptoms.titleDesktop && (
            <p className="hidden md:block text-[#000033] text-lg mb-1">{symptoms.titleDesktop}</p>
          )}
          <h2 style={{ fontFamily: "'Bebas Neue', cursive" }} className="text-[32px] md:text-[56px] text-[#000033] leading-none">
            {symptoms.titleMain}
          </h2>
          <p className="text-[#666] text-[15px] mt-4 max-w-2xl mx-auto">{symptoms.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-10">
          {symptoms.items.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(232,103,10,0.1)" }}>
                <s.icon size={22} style={{ color: "#E8670A" }} />
              </div>
              <h3 className="font-bold text-[#000033] text-lg mb-2">{s.title}</h3>
              <p className="text-[#666] text-[15px] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={scrollToForm}
            className="px-8 py-4 rounded-full text-white font-semibold uppercase text-sm tracking-wide transition-colors"
            style={{ backgroundColor: "#E8670A", fontFamily: "Inter, sans-serif" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#CF5B09")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#E8670A")}
          >
            {symptoms.ctaText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default GHLSymptoms;
