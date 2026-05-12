import { Lock, Pill, VolumeX, HeartCrack, TrendingDown, Stethoscope, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const symptoms: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Lock, title: "Performance Anxiety", desc: "The worry itself makes things worse. It becomes a cycle that's hard to break." },
  { icon: Pill, title: "Failed OTC Solutions", desc: "You've tried the pills from the internet. They didn't work — or came with side effects." },
  { icon: VolumeX, title: "Suffering in Silence", desc: "You haven't talked to anyone about it. You're not sure who to trust." },
  { icon: HeartCrack, title: "Relationship Strain", desc: "It's affecting your relationship, and you're not sure how to fix it." },
  { icon: TrendingDown, title: "Declining Confidence", desc: "It's not just about the bedroom. Your confidence is taking a hit everywhere." },
  { icon: Stethoscope, title: "Underlying Health Issues", desc: "ED can be an early warning sign of cardiovascular or hormonal problems." },
];

export const EDProblemAgitation = () => {
  const scrollToForm = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section style={{ background: "#f8f9fa", padding: "clamp(48px, 8vw, 96px) 0" }} id="symptoms">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 0 auto", marginBottom: "clamp(32px, 4vw, 56px)" }}>
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
            You're Not Alone — And It's More Common Than You Think
          </h2>
          <p style={{ margin: "12px auto 0", color: "#495057", fontSize: 16, fontFamily: "'Open Sans', sans-serif" }}>
            Over 30 million American men experience ED. It's a medical condition, not a personal failure.
          </p>
        </div>

        <div
          className="ed-card-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
        >
          {symptoms.map((s) => (
            <div
              key={s.title}
              style={{
                background: "#ffffff",
                border: "1px solid #e9ecef",
                borderRadius: 12,
                padding: "28px 24px",
                transition: "transform 180ms ease, box-shadow 180ms ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(0,72,131,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 12,
                }}
              >
                <s.icon size={24} style={{ color: "#004883" }} />
              </div>
              <h4
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#000033",
                  marginBottom: 8,
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                {s.title}
              </h4>
              <p style={{ fontSize: 14, color: "#495057", lineHeight: 1.6, fontFamily: "'Open Sans', sans-serif" }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <p style={{ fontSize: 17, color: "#343a40", margin: "0 auto 16px", maxWidth: 500, fontFamily: "'Open Sans', sans-serif" }}>
            The good news? Effective, physician-supervised treatment exists.
          </p>
          <button
            onClick={scrollToForm}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "#E8670A",
              fontWeight: 700,
              fontSize: 15,
              fontFamily: "'Montserrat', sans-serif",
              background: "none",
              border: "none",
              cursor: "pointer",
              transition: "gap 180ms ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.gap = "10px"; }}
            onMouseLeave={(e) => { e.currentTarget.style.gap = "6px"; }}
          >
            See Your Options <ArrowRight size={18} />
          </button>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .ed-card-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};
