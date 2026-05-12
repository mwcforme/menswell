export const WLUrgencyBanner = () => {
  const scrollToForm = () => {
    const form = document.getElementById("lead-form") || document.getElementById("lead-form-bottom");
    if (form) {
      form.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #E8670A 0%, #d35a00 100%)",
        color: "white",
        padding: "clamp(32px, 5vw, 48px) 0",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
        <h2
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(24px, 4vw, 32px)",
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: 12,
          }}
        >
          Weight Loss Consultation
        </h2>

        <p
          style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: 16,
            marginBottom: 24,
            color: "rgba(255,255,255,0.9)",
          }}
        >
          Appointments at all 3 Virginia locations. Begin your transformation today.
        </p>

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
            border: "2px solid #ffffff",
            borderRadius: 8,
            cursor: "pointer",
            letterSpacing: "0.3px",
            minHeight: 54,
            background: "#ffffff",
            color: "#E8670A",
            transition: "all 180ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.9)";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#ffffff";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Book My Consultation
        </button>
      </div>
    </section>
  );
};