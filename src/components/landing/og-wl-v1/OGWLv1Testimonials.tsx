import { Star } from "lucide-react";

const testimonials = [
  { quote: "Down 30 pounds in 4 months. The injections gave me energy I haven't had in years, and the physician actually monitors everything.", name: "Brian K.", location: "Richmond, VA" },
  { quote: "I tried every diet. Turns out my testosterone was tanked and my metabolism was shot. They fixed both.", name: "Steve P.", location: "Newport News, VA" },
  { quote: "No gimmicks, no supplements you don't need. Just a physician who looks at your labs and tells you exactly what to do.", name: "Mark D.", location: "Virginia Beach, VA" },
];

export const OGWLv1Testimonials = () => (
  <section style={{ background: "#ffffff", padding: "clamp(48px, 8vw, 96px) 0" }}>
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "#003366" }}>From Our Members</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.name} className="rounded-xl p-6" style={{ background: "#f8f9fa" }}>
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (<Star key={i} className="h-4 w-4 fill-current" style={{ color: "#D4A017" }} />))}
            </div>
            <p className="text-sm leading-relaxed italic mb-4" style={{ color: "#333333" }}>"{t.quote}"</p>
            <p className="text-sm font-semibold" style={{ color: "#003366" }}>{t.name}</p>
            <p className="text-xs" style={{ color: "#888888" }}>{t.location}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);