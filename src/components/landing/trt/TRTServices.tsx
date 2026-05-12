import { ArrowRight } from "lucide-react";
import imgTRT from "@/assets/lp/man-running-trail.jpeg";
import imgED from "@/assets/lp/man-henley-confident.webp";
import imgWL from "@/assets/lp/man-running-harbor.jpeg";

const services = [
  {
    title: "TESTOSTERONE THERAPY",
    subtitle: "Physician-supervised TRT injections with on-site monitoring",
    image: imgTRT,
    badge: "MOST POPULAR",
    badgeBg: "#E8670A",
    badgeColor: "#FFFFFF",
  },
  {
    title: "ED TREATMENT",
    subtitle: "Oral meds, injection therapy, and combination protocols",
    image: imgED,
  },
  {
    title: "MEDICAL WEIGHT LOSS",
    subtitle: "Stimulant-free vitamin injections and metabolic optimization",
    image: imgWL,
    badge: "NEW",
    badgeBg: "#FFFFFF",
    badgeColor: "#000033",
  },
];

export const TRTServices = () => (
  <section id="services" className="py-14 md:py-16" style={{ background: "#000033" }}>
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:overflow-visible overflow-x-auto snap-x snap-mandatory flex md:grid" style={{ scrollbarWidth: "none" }}>
        {services.map((s) => (
          <div
            key={s.title}
            className="flex-shrink-0 w-[85vw] md:w-auto snap-start rounded-xl overflow-hidden transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.07)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div className="relative">
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-[280px] object-cover"
                loading="lazy"
              />
              {s.badge && (
                <span
                  className="absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-bold uppercase"
                  style={{ background: s.badgeBg, color: s.badgeColor }}
                >
                  {s.badge}
                </span>
              )}
            </div>
            <div className="p-6">
              <h3
                className="font-bold text-xl uppercase"
                style={{ fontFamily: "Oswald, sans-serif", color: "#FFFFFF", fontWeight: 700 }}
              >
                {s.title}
              </h3>
              <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "Inter, sans-serif" }}>
                {s.subtitle}
              </p>
              <button
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold cursor-pointer bg-transparent border-none transition-opacity duration-200"
                style={{ color: "rgba(255,255,255,0.70)", fontFamily: "Inter, sans-serif" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#FFFFFF"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.70)"; }}
              >
                LEARN MORE <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
