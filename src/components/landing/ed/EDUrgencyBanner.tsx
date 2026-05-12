export const EDUrgencyBanner = () => {
  const scrollToForm = () => {
    document.getElementById("lead-form-bottom")?.scrollIntoView({ behavior: "smooth" });
    window.dispatchEvent(new CustomEvent("lp_ed_cta_click", { detail: { button: "urgency-cta" } }));
  };

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #E8670A 0%, #f5820d 50%, #E8670A 100%)",
        color: "#ffffff",
        textAlign: "center",
        padding: "clamp(40px, 6vw, 72px) 0",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <h2
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(20px, 2.5vw, 32px)",
            fontWeight: 700,
            lineHeight: 1.2,
            color: "#ffffff",
            marginBottom: 12,
          }}
        >
          Confidential Consultation, At No Cost
        </h2>
        <p
          style={{
            fontSize: 16,
            opacity: 0.9,
            marginBottom: 24,
            marginLeft: "auto",
            marginRight: "auto",
            fontFamily: "'Open Sans', sans-serif",
          }}
        >
          Appointments at all 3 Virginia locations. Your privacy is evidence-based.
        </p>
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
            fontWeight: 800,
            border: "none",
            borderRadius: 12,
            cursor: "pointer",
            minHeight: 56,
            background: "#ffffff",
            color: "#E8670A",
            boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
            transition: "all 180ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f8f9fa";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#ffffff";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Book My Confidential Visit
        </button>
      </div>
    </section>
  );
};
