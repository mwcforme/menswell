const testimonials = [
  { quote: "Five years as a member. The staff is always professional, and Ashley is the best nurse I have had anywhere. Gentle with injections and blood draws every time.", name: "Marty H.", location: "Richmond, VA" },
  { quote: "They respected my research and let me start at a lower dose than standard. No pushback, no judgment. That earned my trust immediately.", name: "Andrew S.", location: "Richmond, VA" },
  { quote: "Three years and counting. They answer every question, work around my schedule, and actually treat you like a person.", name: "Tom B.", location: "Richmond, VA" },
];

export const OGTRTUnifiedTestimonials = () => {
  const scrollToForm = () => {
    document.getElementById("unified-lead-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section style={{ background: "#f8f9fa" }} className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#1B2A4A" }}>
            What Our Members Are Saying
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-xl p-8"
              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#333333" }}>
                "{t.quote}"
              </p>
              <p className="text-sm font-bold" style={{ color: "#1B2A4A" }}>{t.name}</p>
              <p className="text-xs" style={{ color: "#999999" }}>{t.location}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-sm font-semibold mb-8" style={{ color: "#1B2A4A" }}>
          4.9 Star Average Rating on Google
        </p>

        <div className="text-center">
          <button
            onClick={scrollToForm}
            className="rounded-full px-8 font-bold text-sm uppercase tracking-wider cursor-pointer transition-colors duration-200"
            style={{ height: 52, background: "#1B2A4A", color: "#FFFFFF", border: "none", letterSpacing: "0.08em" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#0F1D35"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#1B2A4A"; }}
          >
            BOOK MY CONSULTATION
          </button>
        </div>
      </div>
    </section>
  );
};
