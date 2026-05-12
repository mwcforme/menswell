import { useState } from "react";
import { StepCard, PrimaryCTA, TextField, SavedIndicator } from "@/intake/components";
import { useIntakeStore } from "@/store/intakeStore";
import { useStepValidation } from "@/hooks/useStepValidation";
import { useShowErrors } from "@/intake/hooks/useShowErrors";
import type { StepProps } from "@/types/intake";

const Step01 = ({ onNext }: StepProps) => {
  const a = useIntakeStore((s) => s.about_you);
  const setField = useIntakeStore((s) => s.setField);
  const { errors } = useStepValidation(1);
  const { shouldShow, markBlur, revealAll } = useShowErrors();
  const [savedTrigger, setSavedTrigger] = useState(0);

  const update = (path: string, value: string) => {
    setField(path, value);
    setSavedTrigger((n) => n + 1);
  };

  const handleContinue = () => {
    revealAll();
    if (Object.keys(errors).length === 0) onNext();
  };

  return (
    <StepCard h1="WHAT'S YOUR NAME?">
      <h2 className="intake-h2 mb-5">Let's start with the basics</h2>
      <div className="space-y-4">
        <TextField
          label="FIRST NAME"
          autoComplete="given-name"
          value={a.first_name}
          onChange={(e) => update("about_you.first_name", e.target.value)}
          onBlur={() => markBlur("about_you.first_name")}
          error={errors["about_you.first_name"]}
          showError={shouldShow("about_you.first_name")}
          required
        />
        <TextField
          label="LAST NAME"
          autoComplete="family-name"
          value={a.last_name}
          onChange={(e) => update("about_you.last_name", e.target.value)}
          onBlur={() => markBlur("about_you.last_name")}
          error={errors["about_you.last_name"]}
          showError={shouldShow("about_you.last_name")}
          required
        />
      </div>
      <div className="mt-6">
        <PrimaryCTA sticky onClick={handleContinue}>
          Continue
        </PrimaryCTA>
      </div>
      <SavedIndicator trigger={savedTrigger} />
    </StepCard>
  );
};

export default Step01;
