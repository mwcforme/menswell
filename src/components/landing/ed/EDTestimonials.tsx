const testimonials = [
  {
    quote: "The team at Men's Wellness is great. I have been a patient for 5 years and the staff is always wonderful and professional. Ashley M is a wonderful nurse and always gentle with my injection and blood draws.",
    name: "Marty Haddaway",
    location: "Richmond, VA",
  },
  {
    quote: "I very much appreciate and respect all the staff here. They respected my own research and desire to start at a much lower dose than standard and gave me no issues. I'm very excited to be on this journey.",
    name: "Andrew",
    location: "Richmond, VA",
  },
  {
    quote: "Completely confidential and professional. The doctor spent over 30 minutes with me, explained everything clearly, and gave me options I didn't even know existed. Results in the first week.",
    name: "David K.",
    location: "Virginia Beach, VA",
  },
];

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export const EDTestimonials = () => {
  const scrollToForm = () => {
    document.getElementById("lead-form-bottom")?.scrollIntoView({ behavior: "smooth" });
    window.dispatchEvent(new CustomEvent("lp_ed_cta_click", { detail: { button: "testimonials-cta" } }));
  };

  return (
    <section style={{ background: "#f8f9fa", padding: "clamp(48px, 8vw, 96px) 0" }} id="testimonials">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto", marginBottom: "clamp(32px, 4vw, 56px)" }}>
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(24px, 3vw, 40px)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.3px",
              color: "#000033",
            }}
          >
            Trusted by Thousands of Virginia Men
          </h2>
        </div>

        <div
          className="ed-testimonial-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              style={{
                background: "#ffffff",
                border: "1px solid #e9ecef",
                borderRadius: 12,
                padding: 28,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div style={{ color: "#f59e0b", fontSize: 18, letterSpacing: 2 }}>★★★★★</div>
              <blockquote
                style={{
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "#343a40",
                  fontStyle: "italic",
                  flexGrow: 1,
                  fontFamily: "'Open Sans', sans-serif",
                  margin: 0,
                }}
              >
                "{t.quote}"
              </blockquote>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#004883",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                {t.name}{" "}
                <span style={{ fontWeight: 400, color: "#6c757d" }}>, {t.location}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Google badge */}
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 24px",
              background: "#ffffff",
              border: "1px solid #e9ecef",
              borderRadius: 9999,
              fontSize: 14,
              fontWeight: 600,
              color: "#343a40",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              fontFamily: "'Open Sans', sans-serif",
            }}
          >
            <GoogleIcon />
            4.9 ★ on Google · 500+ reviews
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button
            onClick={scrollToForm}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "16px 40px",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 17,
              fontWeight: 700,
              border: "none",
              borderRadius: 12,
              cursor: "pointer",
              minHeight: 56,
              background: "#E8670A",
              color: "#ffffff",
              boxShadow: "0 4px 14px rgba(232,103,10,0.3)",
              transition: "all 180ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#d35a00";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#E8670A";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Join 10,000+ Men Who Trust MWC
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ed-testimonial-grid {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            gap: 16px !important;
            padding-bottom: 8px !important;
            -webkit-overflow-scrolling: touch;
          }
          .ed-testimonial-grid > div {
            min-width: 280px !important;
            scroll-snap-align: start;
            flex-shrink: 0;
          }
        }
      `}</style>
    </section>
  );
};
