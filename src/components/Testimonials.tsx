import { ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState, useCallback, useEffect, useRef } from "react";

const SvgStar = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="#F59E0B" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M10 1.5l2.47 5.01L18 7.27l-4 3.9.94 5.5L10 14.27l-4.94 2.4.94-5.5-4-3.9 5.53-.76L10 1.5z" />
  </svg>
);

const testimonials = [
  {
    quote: "Six months on TRT and my energy is completely different. The Richmond team had my labs done and reviewed in under two hours on my first visit.",
    name: "Marty H.",
    location: "Newport News, VA",
    tag: "TRT",
    date: "January 2026",
  },
  {
    quote: "Down 35 pounds on the GLP-1 program. My provider adjusts my plan every month based on labs, not some cookie-cutter protocol.",
    name: "Andrew T.",
    location: "Richmond, VA",
    tag: "Weight Loss",
    date: "December 2025",
  },
  {
    quote: "I tried two online providers before MWC. Having an actual physician review my bloodwork in person and adjust dosing is a completely different experience.",
    name: "David B.",
    location: "Virginia Beach, VA",
    tag: "TRT",
    date: "November 2025",
  },
  {
    quote: "The team at Virginia Beach made me feel comfortable from day one. My testosterone levels are dialed in and I feel like I'm in my 30s again.",
    name: "James R.",
    location: "Virginia Beach, VA",
    tag: "TRT",
    date: "October 2025",
  },
  {
    quote: "I was skeptical about peptide therapy but the results speak for themselves. Better sleep, better recovery, and my physician tracks everything with labs.",
    name: "Chris M.",
    location: "Richmond, VA",
    tag: "Peptides",
    date: "February 2026",
  },
];

export const Testimonials = () => {
  const sectionRef = useScrollReveal();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    const update = () => setSlidesPerView(window.innerWidth < 768 ? 1 : 3);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - slidesPerView);

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
    <section id="testimonials" ref={sectionRef} className="relative py-14 md:py-20" style={{ background: "#1A1A2E" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-bold text-lg uppercase tracking-[0.1em]" style={{ color: "#FFFFFF" }}>
            What Our Members Are Saying
          </h2>
          <div className="flex justify-center gap-1 mt-3">
            {[...Array(5)].map((_, i) => (
              <SvgStar key={i} />
            ))}
          </div>
          <p className="text-sm font-normal mt-2" style={{ color: "rgba(255,255,255,0.75)" }}>
            4.9 out of 5 · 200+ <span className="font-semibold" style={{ color: "#FFFFFF" }}>Google</span> Reviews
          </p>
        </div>

        {/* Slider */}
        <div
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`,
              gap: `${gap}px`,
            }}
          >
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="flex-shrink-0 rounded-xl md:rounded-2xl p-5 md:p-7 flex flex-col"
                style={{
                  width: slidesPerView === 1 ? "100%" : `calc((100% - ${(slidesPerView - 1) * gap}px) / ${slidesPerView})`,
                  background: "#252540",
                }}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => <SvgStar key={i} />)}
                </div>

                {/* Treatment pill */}
                <span
                  className="inline-flex self-start items-center px-3 py-1 rounded-full text-[11px] uppercase font-semibold mb-3"
                  style={{
                    background: "rgba(249,115,22,0.1)",
                    border: "1px solid rgba(249,115,22,0.3)",
                    color: "#F97316",
                    letterSpacing: "0.08em",
                  }}
                >
                  {t.tag}
                </span>

                <p
                  className="text-[13px] md:text-sm font-normal leading-relaxed italic flex-1"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  "{t.quote}"
                </p>
                <div className="w-10 h-[1px] my-4 md:my-5" style={{ background: "rgba(255,255,255,0.12)" }} />
                <p className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>{t.name}</p>
                <p className="text-[13px] mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>{t.location}</p>
                <p className="text-[11px] mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>{t.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 md:gap-6 mt-8 md:mt-10">
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-default"
            style={{ background: "rgba(255,255,255,0.08)", border: "none" }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={16} style={{ color: "#FFFFFF" }} />
          </button>

          <div className="flex gap-1">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className="w-11 h-11 flex items-center justify-center cursor-pointer"
                style={{ background: "transparent", border: "none" }}
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

          <button
            onClick={next}
            disabled={currentIndex >= maxIndex}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-default"
            style={{ background: "rgba(255,255,255,0.08)", border: "none" }}
            aria-label="Next testimonial"
          >
            <ChevronRight size={16} style={{ color: "#FFFFFF" }} />
          </button>
        </div>
      </div>
    </section>
  );
};
