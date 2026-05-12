import { Zap, Stethoscope, ShieldCheck } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const pillars = [
  {
    icon: Zap,
    title: "Same-Day Results",
    body: "On-site labs with results reviewed during your visit. No waiting days for answers. Your physician reviews your panels and builds your plan the same day.",
  },
  {
    icon: Stethoscope,
    title: "Physician-Supervised Care",
    body: "Every treatment plan is created, adjusted, and monitored by a licensed Virginia physician. No nurse practitioners. No AI chatbots. Real medical oversight at every step.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent, All-Inclusive Pricing",
    body: "All follow-up visits, lab work, and dosage adjustments included in your plan. No hidden fees, no surprise bills, no upsells. The price we quote is the price you pay.",
  },
];

export const About = () => {
  const headingRef = useScrollReveal();
  const gridRef = useScrollReveal({ staggerChildren: true, staggerDelay: 150 });

  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{ background: "#000033", padding: "64px 16px" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div ref={headingRef} className="text-center mb-12">
          <h2
            className="uppercase"
            style={{
              color: "#FFFFFF",
              fontWeight: 700,
              marginBottom: "8px",
            }}
          >
            The Men's Wellness Centers Difference
          </h2>
          <p style={{ color: "#A8B8D0", fontSize: "1rem", maxWidth: "600px", margin: "0 auto" }}>
            What sets us apart from online-only providers and cookie-cutter programs.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div ref={gridRef} className="grid md:grid-cols-3 gap-6">
          {pillars.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-lg p-8 pillar-card"
              style={{
                background: "#1A2B4C",
                border: "1px solid #2A3F65",
                transition: "border-color 300ms ease",
              }}
            >
              <Icon size={40} style={{ color: "#E8670A", marginBottom: "16px" }} />
              <h3
                style={{
                  color: "#FFFFFF",
                  fontWeight: 600,
                  marginBottom: "12px",
                }}
              >
                {title}
              </h3>
              <p
                className="leading-relaxed"
                style={{ color: "#A8B8D0", fontSize: "0.875rem" }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .pillar-card:hover {
          border-color: #E8670A !important;
        }
      `}</style>
    </section>
  );
};
