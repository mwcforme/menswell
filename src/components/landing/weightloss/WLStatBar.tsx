import { Users, CalendarCheck, FlaskConical, CreditCard } from "lucide-react";

export const WLStatBar = () => {
  const stats = [
    { icon: Users, value: "10,000+", label: "Men Treated" },
    { icon: CalendarCheck, value: "Since 2015", label: "Trusted Provider" },
    { icon: FlaskConical, value: "Monthly", label: "Lab Monitoring" },
    { icon: CreditCard, value: "FSA/HSA", label: "Accepted" },
  ];

  return (
    <section
      style={{
        background: "#ffffff",
        padding: "clamp(32px, 5vw, 56px) 0",
        borderBottom: "1px solid #e9ecef",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 24,
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map(({ icon: Icon, value, label }, index) => (
            <div
              key={index}
              style={{
                textAlign: "center",
                padding: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 12,
                  color: "#004883",
                }}
              >
                <Icon size={32} />
              </div>
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#000033",
                  marginBottom: 4,
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: 14,
                  color: "#6c757d",
                  fontWeight: 500,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};