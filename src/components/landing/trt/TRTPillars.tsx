import imgDoctor from "@/assets/lp/provider-headshot.jpg";
import imgLobby from "@/assets/lp/onsite-labs-centrifuge.jpg";
import imgAthletic from "@/assets/lp/man-athletic-smiling.jpeg";
import imgTeam from "@/assets/lp/mwc-team.webp";

const pillars = [
  {
    title: "LICENSED PROVIDERS",
    desc: "Licensed Virginia physicians and nurse practitioners. A real provider, every visit.",
    image: imgDoctor,
  },
  {
    title: "ON-SITE LABS",
    desc: "Full labs done in-center, with results back before you walk out.",
    image: imgLobby,
  },
  {
    title: "BUILT FOR MEN",
    desc: "TRT, ED, and weight loss is all we do. Not a side service at a general practice.",
    image: imgAthletic,
  },
  {
    title: "ONGOING MONITORING",
    desc: "Regular check-ins, labs, and protocol adjustments. We don't write a script and disappear.",
    image: imgTeam,
  },
];

export const TRTPillars = () => (
  <section className="py-14 md:py-20" style={{ background: "#000033" }}>
    <div className="max-w-[1200px] mx-auto px-6">
      <h2
        className="font-bold uppercase text-center mb-12"
        style={{
          fontFamily: "Oswald, sans-serif",
          fontSize: "clamp(28px, 4vw, 40px)",
          color: "#FFFFFF",
          fontWeight: 700,
        }}
      >
        EVERYTHING YOU NEED FOR TRT, ED,<br />
        AND WEIGHT LOSS, UNDER ONE ROOF.
      </h2>

      {/* Mobile: horizontal scroll strip. Desktop: 4-col grid. */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {pillars.map((p) => (
          <div
            key={p.title}
            className="rounded-xl overflow-hidden text-center transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            <div className="flex justify-center mt-6">
              <img
                src={p.image}
                alt={p.title}
                className="w-[120px] h-[120px] rounded-full object-cover"
                style={{ border: "3px solid var(--c-border-on-dark)" }}
                loading="lazy"
              />
            </div>
            <h3
              className="font-bold text-base uppercase mt-4 tracking-wide"
              style={{ fontFamily: "Oswald, sans-serif", color: "#FFFFFF", fontWeight: 700 }}
            >
              {p.title}
            </h3>
            <p
              className="text-sm px-5 pb-6 mt-2 leading-relaxed"
              style={{ color: "rgba(255,255,255,0.85)", fontFamily: "Inter, sans-serif" }}
            >
              {p.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile-only horizontal scroll cards */}
      <div
        className="sm:hidden flex gap-3 overflow-x-auto pb-2"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", marginLeft: -24, marginRight: -24, paddingLeft: 24, paddingRight: 24 }}
      >
        {pillars.map((p) => (
          <div
            key={p.title}
            className="rounded-xl overflow-hidden text-center flex-shrink-0"
            style={{
              width: 200,
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.18)",
              scrollSnapAlign: "start",
            }}
          >
            <div className="flex justify-center mt-5">
              <img
                src={p.image}
                alt={p.title}
                className="w-[100px] h-[100px] rounded-full object-cover"
                style={{ border: "3px solid var(--c-border-on-dark)" }}
                loading="lazy"
              />
            </div>
            <h3
              className="font-bold text-sm uppercase mt-3 tracking-wide px-3"
              style={{ fontFamily: "Oswald, sans-serif", color: "#FFFFFF", fontWeight: 700 }}
            >
              {p.title}
            </h3>
            <p
              className="text-xs px-4 pb-5 mt-1.5 leading-relaxed"
              style={{ color: "rgba(255,255,255,0.85)", fontFamily: "Inter, sans-serif" }}
            >
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
