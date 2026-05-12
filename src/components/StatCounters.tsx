import { Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const StatCounters = () => {
  const ref = useScrollReveal();

  return (
    <section style={{ background: "#EBEAE8" }} className="py-10 md:py-14">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div
          ref={ref}
          className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0"
        >
          {/* Stat 1 */}
          <div className="text-center md:flex-1">
            <span className="font-black text-3xl md:text-5xl leading-none" style={{ color: "#000033" }}>
              3
            </span>
            <p className="text-[11px] md:text-sm font-normal mt-1" style={{ color: "#888888" }}>
              Virginia Locations
            </p>
          </div>

          <div className="hidden md:block w-px h-10" style={{ background: "rgba(0,0,0,0.1)" }} />

          {/* Stat 2 */}
          <div className="text-center md:flex-1">
            <span className="font-black text-3xl md:text-5xl leading-none" style={{ color: "#000033" }}>
              10,000+
            </span>
            <p className="text-[11px] md:text-sm font-normal mt-1" style={{ color: "#888888" }}>
              Men Treated
            </p>
          </div>

          <div className="hidden md:block w-px h-10" style={{ background: "rgba(0,0,0,0.1)" }} />

          {/* Stat 3 */}
          <div className="text-center md:flex-1">
            <div className="flex items-center justify-center gap-1">
              <span className="font-black text-3xl md:text-5xl leading-none" style={{ color: "#000033" }}>
                4.9
              </span>
              <Star size={20} fill="#D4A017" color="#D4A017" aria-hidden="true" />
            </div>
            <p className="text-[11px] md:text-sm font-normal mt-1" style={{ color: "#888888" }}>
              Average Google Rating
            </p>
          </div>

          <div className="hidden md:block w-px h-10" style={{ background: "rgba(0,0,0,0.1)" }} />

          {/* Stat 4 */}
          <div className="text-center md:flex-1">
            <span className="font-black text-3xl md:text-5xl leading-none" style={{ color: "#000033" }}>
              10+
            </span>
            <p className="text-[11px] md:text-sm font-normal mt-1" style={{ color: "#888888" }}>
              Years of Experience
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
