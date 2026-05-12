const testimonials = [
  {
    quote: "I was embarrassed to even bring it up. The doctor made it easy. Ran labs, explained what was going on, and I had my prescription before I left.",
    name: "James H.",
    city: "Richmond, VA",
  },
  {
    quote: "Tried the online pill mills. Waste of money. This was the first time a doctor actually looked at my bloodwork and figured out the real issue.",
    name: "Robert M.",
    city: "Virginia Beach, VA",
  },
  {
    quote: "In and out in about an hour. Private, professional, and it worked. Should have done this a year ago.",
    name: "Kevin P.",
    city: "Newport News, VA",
  },
];

export const EDUnifiedTestimonials = () => {
  return (
    <section style={{ background: "#F5F5F3" }} className="py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12" style={{ color: "#1B2A4A" }}>
          WHAT OUR MEMBERS SAY
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-xl p-8" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#333333" }}>"{t.quote}"</p>
              <p className="text-sm font-bold" style={{ color: "#1B2A4A" }}>{t.name}</p>
              <p className="text-xs" style={{ color: "#999999" }}>{t.city}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
