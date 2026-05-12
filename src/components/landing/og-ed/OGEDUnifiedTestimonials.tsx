export const OGEDUnifiedTestimonials = () => {
  const scrollToForm = () => {
    const form = document.getElementById("og-ed-lead-form") || document.getElementById("og-ed-final-form");
    form?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const testimonials = [
    {
      name: "James R.",
      location: "Richmond, VA",
      text: "I put it off for two years. Walked in, got tested, had a plan the same day. Wish I'd done it sooner.",
    },
    {
      name: "David K.",
      location: "Virginia Beach, VA",
      text: "Completely confidential and professional. The doctor spent over 30 minutes with me, explained everything clearly, and gave me options I did not know existed. Results in the first week.",
    },
    {
      name: "Marty H.",
      location: "Richmond, VA",
      text: "The staff is always professional. Five years as a member and the care has been consistently excellent.",
    },
  ];

  return (
    <section style={{ background: "#f8f9fa" }} className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12 md:mb-16" style={{ color: "#1B2A4A" }}>
          What Our Members Are Saying
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-xl p-8" style={{ background: "#FFFFFF", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <p className="text-[15px] leading-relaxed mb-5 italic" style={{ color: "#555555" }}>
                "{t.text}"
              </p>
              <div className="text-sm font-bold" style={{ color: "#1B2A4A" }}>{t.name}</div>
              <div className="text-[13px] mt-0.5" style={{ color: "#888888" }}>{t.location}</div>
            </div>
          ))}
        </div>
        <p className="text-center text-sm font-semibold mb-10" style={{ color: "#555555" }}>
          4.9 Star Average Rating on Google
        </p>
        <div className="text-center">
          <button
            onClick={scrollToForm}
            className="w-full md:w-auto px-8 h-[52px] rounded-full font-bold text-sm uppercase tracking-wider cursor-pointer transition-colors duration-200 border-none"
            style={{ background: "#1B2A4A", color: "#FFFFFF" }}
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
