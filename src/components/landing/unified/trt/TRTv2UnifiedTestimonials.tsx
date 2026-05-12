const testimonials = [
  {
    quote: "Down 15 pounds of fat, up in energy. My wife noticed before I did. Labs improved across the board within 3 months.",
    name: "Mike R.",
    city: "Richmond, VA",
  },
  {
    quote: "I put it off for two years because I figured it was just aging. Turns out my testosterone was half what it should be. Wish I had come in sooner.",
    name: "David T.",
    city: "Newport News, VA",
  },
  {
    quote: "The whole thing took about an hour. Blood draw, results, sat down with the doctor. No runaround. Started treatment that same week.",
    name: "Steve L.",
    city: "Virginia Beach, VA",
  },
];

export const TRTv2UnifiedTestimonials = () => {
  return (
    <section style={{ background: "#F5F5F3" }} className="py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12" style={{ color: "#1B2A4A" }}>
          WHAT OUR MEMBERS SAY
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-8"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
            >
              <p className="text-base leading-relaxed mb-6" style={{ color: "#333333" }}>
                "{t.quote}"
              </p>
              <p className="text-sm font-bold" style={{ color: "#1B2A4A" }}>
                {t.name}
              </p>
              <p className="text-xs" style={{ color: "#999999" }}>
                {t.city}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
