import { Star } from "lucide-react";

export const TRTv2Testimonials = () => {
  const testimonials = [
    { name: "Marty Haddaway", location: "Richmond, VA", text: "The team at Men's Wellness is great. I have been a patient for 5 years and the staff is always wonderful and professional. Ashley M is a wonderful nurse and always gentle with my injection and blood draws." },
    { name: "Andrew", location: "Richmond, VA", text: "I very much appreciate and respect all the staff here. They respected my own research and desire to start at a much lower dose than standard and gave me no issues. I'm very excited to be on this journey." },
    { name: "Mr. Barbour", location: "Richmond, VA", text: "The team at Men's Wellness have really taken care of me the three years that I've been associated with them, they answer any questions that you might have and they're very accommodating to your work schedule." },
  ];

  const scrollToForm = () => {
    const form = document.getElementById("lead-form") || document.getElementById("lead-form-bottom");
    form?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section id="testimonials" style={{ background: "#EBEAE8", padding: "clamp(48px, 8vw, 96px) 0" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "#000033" }}>
            Real Members. Real Results.
          </h2>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-3 gap-6 mb-8">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-xl p-7" style={{ background: "#ffffff", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={14} style={{ fill: "#ffd700", stroke: "#ffd700" }} />)}
              </div>
              <p className="text-[15px] leading-relaxed mb-4 italic" style={{ color: "#666666" }}>"{t.text}"</p>
              <div className="text-sm font-semibold" style={{ color: "#000033" }}>{t.name}</div>
              <div className="text-[13px] mt-0.5" style={{ color: "#888888" }}>{t.location}</div>
            </div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 mb-8" style={{ scrollbarWidth: "none" }}>
          {testimonials.map((t, i) => (
            <div key={i} className="snap-start flex-shrink-0 rounded-xl p-7" style={{ width: "85vw", maxWidth: 340, background: "#ffffff", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={14} style={{ fill: "#ffd700", stroke: "#ffd700" }} />)}
              </div>
              <p className="text-[15px] leading-relaxed mb-4 italic" style={{ color: "#666666" }}>"{t.text}"</p>
              <div className="text-sm font-semibold" style={{ color: "#000033" }}>{t.name}</div>
              <div className="text-[13px] mt-0.5" style={{ color: "#888888" }}>{t.location}</div>
            </div>
          ))}
        </div>

        {/* Google badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full" style={{ background: "#ffffff", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-sm font-medium" style={{ color: "#666666" }}>5.0 Rating on Google Reviews</span>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 rounded-full px-8 font-bold text-sm uppercase cursor-pointer transition-all duration-200 hover:scale-[1.02] border-none"
            style={{ height: 52, background: "#E8670A", color: "#FFFFFF", letterSpacing: "0.08em" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#CF5B09"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#E8670A"; }}
          >
            Join 10,000+ Men Who Trust MWC
          </button>
        </div>
      </div>
    </section>
  );
};
