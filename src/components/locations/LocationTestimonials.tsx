import { ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState, useCallback, useEffect, useRef } from "react";
import type { LocationData } from "@/data/locations";

const SvgStar = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="#F59E0B" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M10 0.5L12.94 6.46L19.5 7.41L14.75 12.04L15.88 18.57L10 15.47L4.12 18.57L5.25 12.04L0.5 7.41L7.06 6.46L10 0.5Z" />
  </svg>
);

interface Props {
  location: LocationData;
}

export const LocationTestimonials = ({ location }: Props) => {
  const sectionRef = useScrollReveal();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    const update = () => setSlidesPerView(window.innerWidth < 768 ? 1 : 3);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, location.testimonials.length - slidesPerView);
  const prev = useCallback(() => setCurrentIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(() => setCurrentIndex((i) => Math.min(maxIndex, i + 1)), [maxIndex]);

  const touchStart = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (diff > 50) next();
    else if (diff < -50) prev();
  };

  const gap = slidesPerView === 1 ? 0 : 24;

  return (
    <section ref={sectionRef} className="relative" style={{ background: "#1A1A2E", padding: "80px 0" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-bold text-lg uppercase tracking-[0.1em]" style={{ color: "#FFFFFF" }}>
            WHAT OUR {location.city.toUpperCase()} MEMBERS ARE SAYING
          </h2>
          <div className="flex justify-center gap-1 mt-3">
            {[...Array(5)].map((_, i) => (
              <SvgStar key={i} />
            ))}
          </div>
          <p className="text-sm font-normal mt-2" style={{ color: "rgba(255,255,255,0.75)" }}>
            {location.googleRating} · {location.googleReviewCount}{" "}
            <span className="font-semibold" style={{ color: "#FFFFFF" }}>Google</span> Reviews
          </p>
        </div>

        <div className="overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`,
              gap: `${gap}px`,
            }}
          >
            {location.testimonials.map((t, i) => (
              <div
                key={i}
                className="flex-shrink-0 rounded-xl md:rounded-2xl p-5 md:p-7"
                style={{
                  width: slidesPerView === 1 ? "100%" : `calc((100% - ${(slidesPerView - 1) * gap}px) / ${slidesPerView})`,
                  background: "#252540",
                }}
              >
                {/* Treatment tag pill */}
                {t.treatment && (
                  <span
                    className="inline-flex items-center mb-3 uppercase"
                    style={{
                      background: "rgba(249,115,22,0.1)",
                      border: "1px solid rgba(249,115,22,0.3)",
                      borderRadius: 9999,
                      padding: "4px 12px",
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      color: "#F97316",
                      fontWeight: 600,
                    }}
                  >
                    {t.treatment}
                  </span>
                )}
                {/* Star row */}
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, si) => (
                    <SvgStar key={si} />
                  ))}
                </div>
                <p
                  className="text-[13px] md:text-sm font-normal leading-relaxed italic"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  "{t.quote}"
                </p>
                <div className="w-10 h-[1px] my-4 md:my-5" style={{ background: "rgba(255,255,255,0.12)" }} />
                <p className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>{t.name}</p>
                <p className="text-[13px] mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>{t.location}</p>
              </div>
            ))}
          </div>
        </div>

        {maxIndex > 0 && (
          <div className="flex items-center justify-center gap-4 md:gap-6 mt-8 md:mt-10">
            {/* Prev arrow — 44px touch target */}
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-default"
              style={{ width: 44, height: 44, background: "rgba(255,255,255,0.08)", border: "none" }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} style={{ color: "#FFFFFF" }} />
            </button>
            {/* Dots — 44px touch target each */}
            <div className="flex gap-1">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className="flex items-center justify-center cursor-pointer"
                  style={{ width: 44, height: 44, background: "transparent", border: "none", padding: 0 }}
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <span
                    className="block rounded-full transition-all duration-300"
                    style={{
                      width: i === currentIndex ? 12 : 8,
                      height: i === currentIndex ? 12 : 8,
                      background: i === currentIndex ? "#FFFFFF" : "rgba(255,255,255,0.25)",
                    }}
                  />
                </button>
              ))}
            </div>
            {/* Next arrow — 44px touch target */}
            <button
              onClick={next}
              disabled={currentIndex >= maxIndex}
              className="flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-default"
              style={{ width: 44, height: 44, background: "rgba(255,255,255,0.08)", border: "none" }}
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} style={{ color: "#FFFFFF" }} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
