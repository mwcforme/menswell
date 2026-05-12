import { CheckCircle2 } from "lucide-react";
import { StepCard, PrimaryCTA, SecondaryLink } from "@/intake/components";
import type { StepProps } from "@/types/intake";

const TREATS = ["Low Testosterone", "Erectile Dysfunction", "Medical Weight Loss"];
const NOT = ["Primary care", "Urgent care", "STD clinic"];

const Step07 = ({ onNext }: StepProps) => {
  return (
    <StepCard h1="ARE WE THE RIGHT FIT?">
      <h2 className="intake-h2 mb-3">Quick check before we continue</h2>
      <p
        className="mb-5"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 15,
          lineHeight: 1.55,
          color: "var(--text-body)",
        }}
      >
        We want to make sure you're in the right place. Men's Wellness Centers focuses on a
        narrow set of conditions — by design.
      </p>

      <div
        style={{
          background: "var(--accent-orange-tint-06)",
          border: "1px solid rgba(232,103,10,0.18)",
          borderRadius: 12,
          padding: 16,
        }}
      >
        <div
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 11,
            letterSpacing: "0.08em",
            fontWeight: 600,
            color: "var(--accent-orange)",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          We treat
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {TREATS.map((t) => (
            <li
              key={t}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "6px 0",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 15,
                color: "var(--text-primary)",
                fontWeight: 500,
              }}
            >
              <CheckCircle2 size={18} color="var(--accent-orange)" strokeWidth={2.25} />
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div
        className="mt-3"
        style={{
          background: "var(--input-bg)",
          border: "1px solid var(--input-border)",
          borderRadius: 12,
          padding: 16,
        }}
      >
        <div
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 11,
            letterSpacing: "0.08em",
            fontWeight: 600,
            color: "var(--text-label)",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          We are NOT
        </div>
        <p
          style={{
            margin: 0,
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 14,
            color: "var(--text-body)",
            lineHeight: 1.55,
          }}
        >
          {NOT.join(" · ")}.
        </p>
      </div>

      <div className="mt-6">
        <PrimaryCTA sticky onClick={onNext}>
          I'm in the right place
        </PrimaryCTA>
      </div>
      <SecondaryLink onClick={() => (window.location.href = "/")}>
        This isn't for me — exit
      </SecondaryLink>
    </StepCard>
  );
};

export default Step07;
