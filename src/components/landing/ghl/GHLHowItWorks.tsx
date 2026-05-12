import type { GHLVerticalConfig } from "@/data/ghl-config";

interface Props { config: GHLVerticalConfig }

const GHLHowItWorks = ({ config }: Props) => {
  const { howItWorks, formId } = config;

  const scrollToForm = () => {
    document.getElementById(formId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="text-center mb-8 md:mb-14">
          <p className="text-[#666] text-sm uppercase tracking-widest mb-2">How It Works</p>
          <p className="hidden md:block text-[#000033] text-lg mb-1">Our Straightforward</p>
          <h2 style={{ fontFamily: "'Bebas Neue', cursive" }} className="text-[32px] md:text-[56px] text-[#000033] leading-none">
            3-Step Process
          </h2>
          <p className="text-[#666] text-[15px] mt-4">Walk in. Get tested. Start treatment. Same day.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {howItWorks.steps.map((s, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "rgba(232,103,10,0.1)" }}>
                <span style={{ fontFamily: "'Bebas Neue', cursive", color: "#E8670A" }} className="text-2xl">{s.num}</span>
              </div>
              <h3 className="font-bold text-[#000033] text-xl mb-3">{s.title}</h3>
              <p className="text-[#666] text-[15px] leading-relaxed max-w-xs mx-auto">{s.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-[15px] font-medium text-[#666] mt-6 mb-4 text-center">{howItWorks.bridgeCopy}</p>

        <div className="text-center">
          <button
            onClick={scrollToForm}
            className="px-8 py-4 rounded-full text-white font-semibold uppercase text-sm tracking-wide transition-colors"
            style={{ backgroundColor: "#E8670A", fontFamily: "Inter, sans-serif" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#CF5B09")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#E8670A")}
          >
            {howItWorks.ctaText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default GHLHowItWorks;
