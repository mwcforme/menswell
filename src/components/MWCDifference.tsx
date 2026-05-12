import { useScrollReveal } from "@/hooks/useScrollReveal";

const pillars = [
  {
    title: "Results in One Visit",
    body: "Walk in, get labs drawn, and sit down with your physician before you leave. Most members walk out the same day with a treatment plan and medication in hand.",
  },
  {
    title: "Virginia-Based, Physician-Led",
    body: "Every protocol is written by a Virginia-licensed physician who specializes in men's health. No chatbots, no nurse-only visits. 10,000+ members and a 4.9-star average across three locations.",
  },
  {
    title: "Private Centers, Purpose-Built",
    body: "Three Virginia locations designed from the ground up for men's health. Private exam rooms, on-site labs, and a team that treats one thing: helping men feel and perform at their best.",
  },
];

export const MWCDifference = () => {
  const gridRef = useScrollReveal({ staggerChildren: true, staggerDelay: 150 });

  return (
    <section
      id="difference"
      className="relative overflow-hidden py-12 md:py-24"
      style={{ background: "#EBEAE8" }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div
          className="rounded-xl md:rounded-2xl px-5 py-10 md:px-14 md:py-16"
          style={{ background: "#1A1A2E" }}
        >
          <h2
            className="text-center uppercase mb-8 md:mb-14 font-bold text-base md:text-xl tracking-[0.12em]"
            style={{ color: "#FFFFFF" }}
          >
            The MWC Standard
          </h2>

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {pillars.map(({ title, body }) => (
              <div key={title} className="text-left">
                <h3
                  className="font-bold uppercase text-[13px] md:text-sm tracking-[0.08em] leading-snug mb-2 md:mb-3"
                  style={{ color: "#FFFFFF" }}
                >
                  {title}
                </h3>
                <p
                  className="font-normal text-[13px] leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
