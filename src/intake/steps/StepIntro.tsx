import { Lock } from "lucide-react";
import { PrimaryCTA } from "@/intake/components";
import type { StepProps } from "@/types/intake";
import { useIntakeStore } from "@/store/intakeStore";

const StepIntro = ({ onNext }: StepProps) => {
  const firstName = useIntakeStore((s) => s.about_you.first_name);
  const greeting = firstName ? `Welcome, ${firstName}.` : "Let's get you ready.";

  return (
    <div className="mx-auto w-full" style={{ maxWidth: 560, paddingTop: 24, paddingBottom: 24 }}>
      <h1 className="intake-h1 mb-3">{greeting}</h1>
      <p className="intake-body-dark mb-8" style={{ fontSize: 16, lineHeight: 1.55 }}>
        About 4 minutes. Your answers save as you go. Your appointment is already booked —
        this just helps your provider spend more time with you, less on paperwork.
      </p>

      <PrimaryCTA onClick={onNext}>Start</PrimaryCTA>

      <div className="mt-5 flex items-center justify-center gap-1.5">
        <Lock size={12} color="var(--text-muted)" strokeWidth={2} />
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 12,
            color: "var(--text-muted)",
            letterSpacing: "0.06em",
          }}
        >
          HIPAA-SECURE · YOUR ANSWERS ARE PRIVATE
        </span>
      </div>
    </div>
  );
};

export default StepIntro;
