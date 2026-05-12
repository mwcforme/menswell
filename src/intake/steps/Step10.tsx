import { useState } from "react";
import { StepCard, PrimaryCTA, CardRadio, SavedIndicator } from "@/intake/components";
import { useIntakeStore } from "@/store/intakeStore";
import { useStepValidation } from "@/hooks/useStepValidation";
import { useShowErrors } from "@/intake/hooks/useShowErrors";
import type { StepProps } from "@/types/intake";

const Step10 = ({ onNext }: StepProps) => {
  const used = useIntakeStore((s) => s.hormone_therapy.used_before);
  const setField = useIntakeStore((s) => s.setField);
  const { errors } = useStepValidation(10);
  const { shouldShow, revealAll } = useShowErrors();
  const [savedTrigger, setSavedTrigger] = useState(0);

  const select = (v: boolean) => {
    setField("hormone_therapy.used_before", v);
    setSavedTrigger((n) => n + 1);
    setTimeout(onNext, 280);
  };

  const handleContinue = () => {
    revealAll();
    if (Object.keys(errors).length === 0) onNext();
  };

  const showErr =
    shouldShow("hormone_therapy.used_before") && errors["hormone_therapy.used_before"];

  return (
    <StepCard h1="HORMONE HISTORY">
      <h2 className="intake-h2 mb-5">
        Have you ever used testosterone or hormone therapy?
      </h2>
      <div className="space-y-2.5" role="radiogroup">
        <CardRadio label="Yes" selected={used === true} onSelect={() => select(true)} />
        <CardRadio label="No" selected={used === false} onSelect={() => select(false)} />
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
          {errors["hormone_therapy.used_before"]}
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

export default Step10;
