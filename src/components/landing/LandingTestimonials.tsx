import { Star } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  location: string;
}

interface LandingTestimonialsProps {
  testimonials: Testimonial[];
}

export const LandingTestimonials = ({ testimonials }: LandingTestimonialsProps) => (
  <section className="py-14 md:py-20" style={{ background: "#FFFFFF" }}>
    <div className="max-w-[1200px] mx-auto px-6">
      <h2
        className="font-bold text-3xl text-center mb-12"
        style={{ color: "#000033" }}
      >
        From Our Patients
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="min-w-[280px] snap-start rounded-xl p-6"
            style={{ background: "#F7F7F5" }}
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" style={{ color: "#D4A017" }} />
              ))}
            </div>
            <p
              className="text-sm leading-relaxed italic mb-4"
              style={{ color: "#000033" }}
            >
              "{t.quote}"
            </p>
            <p className="text-sm font-semibold" style={{ color: "#000033" }}>
              {t.name}
            </p>
            <p className="text-xs" style={{ color: "#888888" }}>
              {t.location}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
