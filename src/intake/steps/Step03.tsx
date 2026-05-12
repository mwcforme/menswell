import { useState } from "react";
import { StepCard, PrimaryCTA, EmailField, SavedIndicator } from "@/intake/components";
import { useIntakeStore } from "@/store/intakeStore";
import { useStepValidation } from "@/hooks/useStepValidation";
import { useShowErrors } from "@/intake/hooks/useShowErrors";
import type { StepProps } from "@/types/intake";

const Step03 = ({ onNext }: StepProps) => {
  const email = useIntakeStore((s) => s.about_you.email);
  const setField = useIntakeStore((s) => s.setField);
  const { errors } = useStepValidation(3);
  const { shouldShow, revealAll } = useShowErrors();
  const [savedTrigger, setSavedTrigger] = useState(0);

  const handleContinue = () => {
    revealAll();
    if (Object.keys(errors).length === 0) onNext();
  };

  return (
    <StepCard h1="YOUR EMAIL">
      <h2 className="intake-h2 mb-2">Where should we send your records?</h2>
      <p
        className="mb-5"
        style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: "var(--text-body)" }}
      >
        Lab results, visit summaries, and receipts go here.
      </p>
      <EmailField
        value={email}
        onChange={(v) => {
          setField("about_you.email", v);
          setSavedTrigger((n) => n + 1);
        }}
        error={errors["about_you.email"]}
        showError={shouldShow("about_you.email")}
        required
      />
      <div className="mt-6">
        <PrimaryCTA sticky onClick={handleContinue}>
          Continue
        </PrimaryCTA>
      </div>
      <SavedIndicator trigger={savedTrigger} />
    </StepCard>
  );
};

export default Step03;
