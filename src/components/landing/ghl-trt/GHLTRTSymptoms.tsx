import { BatteryLow, HeartOctagon, Scale02, FaceSad, Moon01, Lightning02 } from "@untitledui/icons";

const symptoms = [
  { icon: BatteryLow, title: "Low Energy", desc: "The kind of tired that sleep doesn't seem to touch. You wake up drained and feel worse by midday." },
  { icon: HeartOctagon, title: "Decreased Libido", desc: "Lack of interest in intimacy. Something that used to come naturally now feels like effort." },
  { icon: Scale02, title: "Weight Gain", desc: "Stubborn fat, especially around the midsection, no matter how much you diet or exercise." },
  { icon: FaceSad, title: "Mood Swings", desc: "Irritability, anxiety, or depression that doesn't match what's happening in your life." },
  { icon: Moon01, title: "Poor Sleep", desc: "Trouble falling or staying asleep. You never feel rested no matter how many hours you get." },
  { icon: Lightning02, title: "Brain Fog", desc: "Difficulty concentrating or remembering. You can't focus the way you used to." },
];

const GHLTRTSymptoms = () => {
  const scrollToForm = () => {
    document.getElementById("ghl-hero-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section style={{ backgroundColor: "#F5F0EB" }} className="py-12 md:py-20">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <p className="text-[#666] text-sm uppercase tracking-widest mb-2">Recognize the Signs</p>
          <p className="hidden md:block text-[#000033] text-lg mb-1">Are You Experiencing</p>
          <h2
            style={{ fontFamily: "'Bebas Neue', cursive" }}
            className="text-[32px] md:text-[56px] text-[#000033] leading-none"
          >
            Symptoms of Low T?
          </h2>
          <p className="text-[#666] text-[15px] mt-4 max-w-2xl mx-auto">
            You didn't get where you are by settling. If these symptoms feel familiar, Low Testosterone could be what's holding you back from feeling your best.
          </p>
        </div>

        {/* CRO-03: 1-col mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-10">
          {symptoms.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-6">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: "rgba(232,103,10,0.1)" }}
              >
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
            Check My Levels
          </button>
        </div>
      </div>
    </section>
  );
};

export default GHLTRTSymptoms;
