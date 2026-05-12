import { useState } from "react";
import { StepCard, PrimaryCTA, MaskedDOBField, SavedIndicator } from "@/intake/components";
import { useIntakeStore } from "@/store/intakeStore";
import { useStepValidation } from "@/hooks/useStepValidation";
import { useShowErrors } from "@/intake/hooks/useShowErrors";
import type { StepProps } from "@/types/intake";

const Step04 = ({ onNext }: StepProps) => {
  const dob = useIntakeStore((s) => s.about_you.dob);
  const setField = useIntakeStore((s) => s.setField);
  const { errors } = useStepValidation(4);
  const { shouldShow, revealAll } = useShowErrors();
  const [savedTrigger, setSavedTrigger] = useState(0);

  const handleContinue = () => {
    revealAll();
    if (Object.keys(errors).length === 0) onNext();
  };

  return (
    <StepCard h1="YOUR DATE OF BIRTH">
      <h2 className="intake-h2 mb-2">When were you born?</h2>
      <p
        className="mb-5"
        style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: "var(--text-body)" }}
      >
        We use this to verify your identity at check-in.
      </p>
      <MaskedDOBField
        value={dob}
        onChange={(v) => {
          setField("about_you.dob", v);
          setSavedTrigger((n) => n + 1);
        }}
        error={errors["about_you.dob"]}
        showError={shouldShow("about_you.dob")}
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

export default Step04;
