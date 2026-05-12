const rows = [
  { feature: "Evaluation", online: "Online questionnaire", mwc: "In-person physician exam" },
  { feature: "Root Cause Analysis", online: "Prescribe-and-go", mwc: "Full diagnostic workup" },
  { feature: "Treatment Options", online: "Generic pills only", mwc: "Multiple treatment modalities" },
  { feature: "Privacy", online: "Digital trail, shared data", mwc: "Private center, HIPAA-secured" },
  { feature: "Follow-up", online: "Automated refills", mwc: "Ongoing physician optimization" },
  { feature: "Medical Oversight", online: "Minimal", mwc: "Licensed Virginia physicians" },
  { feature: "Results", online: "Variable", mwc: "Physician-optimized outcomes" },
];

export const EDComparison = () => {
  const scrollToForm = () => {
    document.getElementById("lead-form-bottom")?.scrollIntoView({ behavior: "smooth" });
    window.dispatchEvent(new CustomEvent("lp_ed_cta_click", { detail: { button: "comparison-cta" } }));
  };

  return (
    <section style={{ background: "#ffffff", padding: "clamp(48px, 8vw, 96px) 0" }} id="why-mwc">
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
            Why Virginia Men Trust MWC for ED Treatment
          </h2>
        </div>

        <table
          className="ed-comparison-table"
          style={{
            width: "100%",
            maxWidth: 800,
            margin: "0 auto",
            background: "#ffffff",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  padding: "20px 24px",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  background: "#f1f3f5",
                  color: "#343a40",
                  textAlign: "left",
                }}
              >
                Feature
              </th>
              <th
                style={{
                  padding: "20px 24px",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  background: "#e9ecef",
                  color: "#495057",
                  textAlign: "center",
                }}
              >
                Online ED Services
              </th>
              <th
                style={{
                  padding: "20px 24px",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  background: "#004883",
                  color: "#ffffff",
                  textAlign: "center",
                }}
              >
                Men's Wellness Centers
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.feature}>
                <td
                  style={{
                    padding: "16px 24px",
                    fontSize: 14,
                    borderBottom: "1px solid #f1f3f5",
                    fontWeight: 600,
                    color: "#343a40",
                    fontFamily: "'Open Sans', sans-serif",
                  }}
                >
                  {row.feature}
                </td>
                <td
                  style={{
                    padding: "16px 24px",
                    fontSize: 14,
                    borderBottom: "1px solid #f1f3f5",
                    color: "#6c757d",
                    textAlign: "center",
                    fontFamily: "'Open Sans', sans-serif",
                  }}
                >
                  <span style={{ color: "#adb5bd", marginRight: 6 }}>✗</span>
                  {row.online}
                </td>
                <td
                  style={{
                    padding: "16px 24px",
                    fontSize: 14,
                    borderBottom: "1px solid #f1f3f5",
                    background: "rgba(0,72,131,0.03)",
                    color: "#000033",
                    fontWeight: 600,
                    textAlign: "center",
                    fontFamily: "'Open Sans', sans-serif",
                  }}
                >
                  <span style={{ color: "#28a745", marginRight: 6 }}>✓</span>
                  {row.mwc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ textAlign: "center", marginTop: 40 }}>
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
            Get Real Treatment from Real Physicians
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ed-comparison-table { font-size: 13px !important; border-radius: 12px !important; }
          .ed-comparison-table thead th,
          .ed-comparison-table tbody td { padding: 12px 14px !important; }
        }
      `}</style>
    </section>
  );
};
