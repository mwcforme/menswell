export const OGTRT2UnifiedTestimonials = () => {
  const testimonials = [
    {
      text: "Five years as a member. The staff is always professional, and Ashley is the best nurse I have had anywhere. Gentle with injections and blood draws every time.",
      name: "Marty H.",
      location: "Richmond, VA",
    },
    {
      text: "They respected my research and let me start at a lower dose than standard. No pushback, no judgment. That earned my trust immediately.",
      name: "Andrew S.",
      location: "Richmond, VA",
    },
    {
      text: "Three years and counting. They answer every question, work around my schedule, and actually treat you like a person.",
      name: "Tom B.",
      location: "Richmond, VA",
    },
  ];

  const scrollToForm = () => {
    const form = document.getElementById("og-trt2-lead-form") || document.getElementById("og-trt2-final-form");
    form?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section style={{ background: "#f8f9fa", padding: "clamp(48px, 8vw, 96px) 0" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "#1B2A4A" }}>
            What Our Members Are Saying
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-xl p-7"
              style={{ background: "#ffffff", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
            >
              <p className="text-[15px] leading-relaxed mb-4 italic" style={{ color: "#555555" }}>
                "{t.text}"
              </p>
              <div className="text-sm font-semibold" style={{ color: "#1B2A4A" }}>
                — {t.name}
              </div>
              <div className="text-[13px] mt-0.5" style={{ color: "#888888" }}>
                {t.location}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-10">
          <p className="text-sm font-medium" style={{ color: "#555555" }}>
            4.9 Star Average Rating on Google
          </p>
        </div>

        <div className="text-center">
          <button
            onClick={scrollToForm}
            className="px-8 h-[52px] rounded-full font-bold text-sm uppercase tracking-wider cursor-pointer transition-colors duration-200 border-none"
            style={{ background: "#E8670A", color: "#FFFFFF" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#CF5B09"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#E8670A"; }}
          >
            BOOK MY CONSULTATION
          </button>
        </div>
      </div>
    </section>
  );
};
