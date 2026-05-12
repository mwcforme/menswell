import { ArrowRight } from "lucide-react";
import { useRef } from "react";

const testimonials = [
  {
    quote: "The team at Men's Wellness is great. I have been a patient for 5 years and the staff is always wonderful and professional. Ashley M is a wonderful nurse and always gentle with my injection and blood draws.",
    name: "Marty Haddaway",
    location: "Richmond, VA",
  },
  {
    quote: "I very much appreciate and respect all the staff here. They respected my own research and desire to start at a much lower dose than standard and gave me no issues. I'm very excited to be on this journey.",
    name: "Andrew",
    location: "Richmond, VA",
  },
  {
    quote: "The team at Men's Wellness have really taken care of me the three years that I've been associated with them, they answer any questions that you might have and they're very accommodating to your work schedule.",
    name: "Mr. Barbour",
    location: "Richmond, VA",
  },
];

const Stars = () => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} style={{ color: "#D4A017", fontSize: "16px" }}>★</span>
    ))}
  </div>
);

export const TRT2Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const fireCTA = () => {
    window.dispatchEvent(new CustomEvent("lp_trt2_cta_click", { detail: { location: "testimonials" } }));
    document.getElementById("final-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-14 md:py-20" style={{ background: "#FFFFFF" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <h2
          className="font-bold uppercase text-center"
          style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: "clamp(26px, 4vw, 40px)",
            color: "#000033",
            fontWeight: 700,
          }}
        >
          Real Members. Real Results.
        </h2>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-3 gap-6 mt-10">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-xl p-6"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
            >
              <Stars />
              <p className="text-sm italic mt-4 leading-relaxed" style={{ color: "#4A4A4A", fontFamily: "Inter, sans-serif" }}>
                "{t.quote}"
              </p>
              <div className="mt-4">
                <p className="text-sm font-bold" style={{ color: "#000033", fontFamily: "Inter, sans-serif" }}>{t.name}</p>
                <p className="text-xs" style={{ color: "#888888", fontFamily: "Inter, sans-serif" }}>{t.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div
          ref={scrollRef}
          className="md:hidden flex gap-4 mt-10 overflow-x-auto snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="snap-start flex-shrink-0 rounded-xl p-6"
              style={{
                width: "85vw",
                maxWidth: 340,
                background: "#FFFFFF",
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <Stars />
              <p className="text-sm italic mt-4 leading-relaxed" style={{ color: "#4A4A4A", fontFamily: "Inter, sans-serif" }}>
                "{t.quote}"
              </p>
              <div className="mt-4">
                <p className="text-sm font-bold" style={{ color: "#000033", fontFamily: "Inter, sans-serif" }}>{t.name}</p>
                <p className="text-xs" style={{ color: "#888888", fontFamily: "Inter, sans-serif" }}>{t.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Google badge + CTA */}
        <div className="flex flex-col items-center mt-8 gap-4">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} style={{ color: "#D4A017", fontSize: "18px" }}>★</span>
              ))}
            </div>
            <span className="text-sm font-medium" style={{ color: "#4A4A4A", fontFamily: "Inter, sans-serif" }}>
              4.9/5 on Google · 200+ Reviews
            </span>
          </div>

          <button
            onClick={fireCTA}
            className="inline-flex items-center gap-2 rounded-full px-8 font-bold text-sm uppercase cursor-pointer transition-all duration-200 hover:scale-[1.02]"
            style={{
              height: 52,
              background: "#E8670A",
              color: "#FFFFFF",
              letterSpacing: "0.08em",
              fontFamily: "Inter, sans-serif",
              border: "none",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#CF5B09"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#E8670A"; }}
          >
            Join 10,000+ Men Who Trust MWC <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
