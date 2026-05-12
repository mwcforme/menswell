const testimonials = [
  { quote: "Down 30 pounds in 4 months. The injections gave me energy I have not had in years, and the doctor actually monitors everything.", name: "Brian K.", location: "Richmond, VA" },
  { quote: "I tried every diet. Turns out my testosterone was tanked and my metabolism was shot. They fixed both.", name: "Steve P.", location: "Newport News, VA" },
  { quote: "No gimmicks, no supplements you do not need. Just a doctor who looks at your labs and tells you exactly what to do.", name: "Mark D.", location: "Virginia Beach, VA" },
];

export const OGWLUnifiedTestimonials = () => {
  const scrollToForm = () => {
    document.getElementById("wl-hero-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section style={{ background: "#FFFFFF", padding: "clamp(48px, 8vw, 96px) 0" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold leading-tight mb-3"
            style={{ color: "#1B2A4A" }}
          >
            What Our Members Are Saying
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-xl p-6"
              style={{ background: "#f8f9fa", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "#333333" }}
              >
                "{t.quote}"
              </p>
              <p className="text-sm font-semibold" style={{ color: "#1B2A4A" }}>
                {t.name}, {t.location}
              </p>
            </div>
          ))}
        </div>

        <p
          className="text-center text-sm font-semibold mt-8 mb-8"
          style={{ color: "#1B2A4A" }}
        >
          4.9 Star Average Rating on Google
        </p>

        <div className="text-center">
          <button
            onClick={scrollToForm}
            className="rounded-full px-8 font-bold text-sm uppercase cursor-pointer transition-colors duration-200"
            style={{
              height: 52,
              background: "#1B2A4A",
              color: "#FFFFFF",
              letterSpacing: "0.08em",
              border: "none",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#0F1D35"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#1B2A4A"; }}
          >
            Book My Consultation
          </button>
        </div>
      </div>
    </section>
  );
};
