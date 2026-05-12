import { Users, Lock, Zap, CreditCard } from "lucide-react";

const stats = [
  { icon: Users, value: "10,000+", label: "Men Treated" },
  { icon: Lock, value: "100%", label: "Confidential" },
  { icon: Zap, value: "Same-Day", label: "Treatment Options" },
  { icon: CreditCard, value: "FSA/HSA", label: "Accepted" },
];

export const EDStatBar = () => (
  <section
    style={{
      background: "#ffffff",
      borderTop: "1px solid #e9ecef",
      padding: "32px 0",
    }}
  >
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
      <div
        className="ed-stat-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 24,
          textAlign: "center",
        }}
      >
        {stats.map((s) => (
          <div key={s.label}>
            <s.icon
              size={32}
              style={{ color: "#004883", margin: "0 auto 8px", display: "block" }}
            />
            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 18,
                fontWeight: 700,
                color: "#000033",
              }}
            >
              {s.value}
            </div>
            <div style={{ fontSize: 13, color: "#6c757d", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
    <style>{`
      @media (max-width: 768px) {
        .ed-stat-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
      }
    `}</style>
  </section>
);
