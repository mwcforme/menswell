const results = [
  { img: "/images/services/testosterone.jpg", title: "Increased Energy", subtitle: "Wake Up Ready", desc: "Members commonly report feeling more refreshed and maintaining energy throughout the day.", alt: "Confident man in athletic wear outside wellness center" },
  { img: "/images/services/custom-protocols.jpg", title: "Improved Mood & Focus", subtitle: "Think Clearer", desc: "Many men report improved motivation, mental clarity, and overall well-being.", alt: "Two men walking on beach with surfboards" },
  { img: "/images/services/sexual-wellness-couple.png", title: "Enhanced Libido", subtitle: "Perform with Confidence", desc: "Many members report renewed drive and improved intimate relationships.", alt: "Couple relaxing together" },
  { img: "/images/services/labs-porch.png", title: "Better Sleep", subtitle: "Rest & Recover", desc: "Improved sleep quality is among the most commonly reported benefits of optimized testosterone levels.", alt: "Couple enjoying coffee on porch" },
  { img: "/images/services/peptides.jpg", title: "Reduced Brain Fog", subtitle: "Sharpen Your Mind", desc: "Members frequently report improvements in concentration, memory, and mental sharpness.", alt: "Man relaxing on beach" },
  { img: "/images/services/weight-loss.jpg", title: "Stronger Muscle Tone", subtitle: "Build & Maintain", desc: "Optimized testosterone may support lean muscle development alongside a consistent exercise routine.", alt: "Man running on trail at sunset" },
];

const GHLTRTResults = () => (
  <section style={{ backgroundColor: "#EBEAE8" }} className="py-12 md:py-20">
    <div className="max-w-[1170px] mx-auto px-4">
      <div className="text-center mb-8 md:mb-12">
        <p className="text-[#666] text-sm uppercase tracking-widest mb-2">Real Results</p>
        <p className="hidden md:block text-[#000033] text-lg mb-1">What Members Report</p>
        <h2
          style={{ fontFamily: "'Bebas Neue', cursive" }}
          className="text-[32px] md:text-[56px] text-[#000033] leading-none"
        >
          from TRT
        </h2>
        <p className="text-[#666] text-[15px] mt-4">
          Individual results vary. These reflect commonly reported member experiences.
        </p>
      </div>

      {/* CRO-03: 1-col mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {results.map((r, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden border-2 border-[#C8C6C1]">
            <div className="p-5 pt-6">
              <h3 className="font-bold uppercase text-[15px] tracking-wide leading-tight text-[#000033]">
                {r.title}
              </h3>
              <p className="font-normal text-[13px] mt-1.5 text-[#666]">
                {r.subtitle}
              </p>
            </div>
            <div className="mx-3 mb-3 rounded-xl overflow-hidden aspect-[4/3]">
              <img src={r.img} alt={r.alt} className="object-cover w-full h-full" loading="lazy" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default GHLTRTResults;
