const testimonials = [
  {
    quote: "Down 30 pounds in 4 months. The injections gave me energy I haven't had in years, and the physician actually monitors everything.",
    name: "Tom W.",
    city: "Richmond, VA",
  },
  {
    quote: "I tried every diet. Keto, fasting, meal plans. Nothing stuck. Three months on Semaglutide with my physician and I'm down 4 pant sizes.",
    name: "Chris D.",
    city: "Virginia Beach, VA",
  },
  {
    quote: "My physician here checks my bloodwork every visit and adjusts the dose. That matters. The online places just ship it and forget you.",
    name: "Mark F.",
    city: "Newport News, VA",
  },
];

export const WLUnifiedTestimonials = () => {
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
