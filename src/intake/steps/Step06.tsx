import { useEffect, useRef, useState } from "react";
import { StepCard, PrimaryCTA, CardRadio, SavedIndicator } from "@/intake/components";
import { useIntakeStore } from "@/store/intakeStore";
import { useStepValidation } from "@/hooks/useStepValidation";
import { useShowErrors } from "@/intake/hooks/useShowErrors";
import type { StepProps } from "@/types/intake";

const REASONS = [
  "Low Testosterone / hormone evaluation",
  "Erectile Dysfunction",
  "Weight Loss",
  "Something else",
];

const Step06 = ({ onNext }: StepProps) => {
  const visit = useIntakeStore((s) => s.visit);
  const setField = useIntakeStore((s) => s.setField);
  const { errors } = useStepValidation(6);
  const { shouldShow, revealAll } = useShowErrors();
  const [savedTrigger, setSavedTrigger] = useState(0);
  const advanceTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    },
    []
  );

  const select = (val: string) => {
    setField("visit.primary_reason", val);
    setSavedTrigger((n) => n + 1);
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(() => onNext(), 300);
  };

  const handleContinue = () => {
    revealAll();
    if (Object.keys(errors).length === 0) onNext();
  };

  const showErr = shouldShow("visit.primary_reason") && errors["visit.primary_reason"];

  return (
    <StepCard h1="MAIN REASON FOR VISIT">
      <h2 className="intake-h2 mb-5">What brings you in?</h2>
      <div className="space-y-2.5" role="radiogroup">
        {REASONS.map((r) => (
          <CardRadio
            key={r}
            label={r}
            selected={visit.primary_reason === r}
            onSelect={() => select(r)}
          />
        ))}
      </div>
      {showErr && (
        <p
          aria-live="polite"
          style={{
            marginTop: 10,
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 12,
            color: "var(--error-red)",
          }}
        >
          {errors["visit.primary_reason"]}
        </p>
      )}
      <div className="mt-6">
        <PrimaryCTA sticky onClick={handleContinue}>
          Continue
        </PrimaryCTA>
      </div>
      <SavedIndicator trigger={savedTrigger} />
    </StepCard>
  );
};

export default Step06;
