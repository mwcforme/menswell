import { Star } from "lucide-react";

export const WLTestimonials = () => {
  const testimonials = [
    {
      name: "James R.",
      location: "Virginia Beach, VA",
      text: "I was skeptical about weight loss programs, but the medical approach at MWC is completely different. My doctor actually monitors my bloodwork monthly and adjusts my medication. I've lost 35 pounds in 4 months.",
      rating: 5,
    },
    {
      name: "Michael T.",
      location: "Newport News, VA",
      text: "After years of failed diets, Semaglutide prescribed by an actual physician changed everything. The staff monitors my progress closely and I've never felt healthier. Down 28 pounds and counting.",
      rating: 5,
    },
    {
      name: "Mr. Barbour",
      location: "Richmond, VA",
      text: "The team at Men's Wellness have really taken care of me the three years that I've been associated with them, they answer any questions that you might have and they're very accommodating to your work schedule.",
      rating: 5,
    },
  ];

  const scrollToForm = () => {
    const form = document.getElementById("lead-form") || document.getElementById("lead-form-bottom");
    if (form) {
      form.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section
      id="testimonials"
      style={{
        background: "#f8f9fa",
        padding: "clamp(48px, 8vw, 96px) 0",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "clamp(32px, 5vw, 56px)" }}>
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "#000033",
            }}
          >
            Real Men. Real Weight Loss.
          </h2>
        </div>

        {/* Testimonials */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 24,
            marginBottom: 32,
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:overflow-x-auto md:scroll-snap-x-mandatory"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              style={{
                background: "#ffffff",
                borderRadius: 12,
                padding: 28,
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                border: "1px solid #e9ecef",
                scrollSnapAlign: "start",
                minWidth: 280,
              }}
              className="md:scroll-snap-align-start md:min-w-[280px]"
            >
              {/* Stars */}
              <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    style={{ fill: "#ffd700", stroke: "#ffd700" }}
                  />
                ))}
              </div>

              {/* Quote */}
              <p
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "#495057",
                  marginBottom: 16,
                  fontStyle: "italic",
                }}
              >
                "{testimonial.text}"
              </p>

              {/* Attribution */}
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#000033",
                }}
              >
                — {testimonial.name}
              </div>
              <div
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: 13,
                  color: "#6c757d",
                  marginTop: 2,
                }}
              >
                {testimonial.location}
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews Badge */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 20px",
              background: "#ffffff",
              borderRadius: 8,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              border: "1px solid #e9ecef",
            }}
          >
            {/* Google "G" Logo SVG */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: 14,
                color: "#495057",
                fontWeight: 500,
              }}
            >
              4.9 stars on Google · 200+ reviews
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={scrollToForm}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "16px 32px",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 16,
              fontWeight: 700,
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              letterSpacing: "0.3px",
              minHeight: 54,
              background: "#E8670A",
              color: "#ffffff",
              boxShadow: "0 4px 14px rgba(232,103,10,0.3)",
              transition: "all 180ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#d35a00";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(232,103,10,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#E8670A";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(232,103,10,0.3)";
            }}
          >
            Book Your Consultation
          </button>
        </div>
      </div>
    </section>
  );
};