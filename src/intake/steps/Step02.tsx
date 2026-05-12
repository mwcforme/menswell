import { useState } from "react";
import { StepCard, PrimaryCTA, PhoneField, SavedIndicator } from "@/intake/components";
import { useIntakeStore } from "@/store/intakeStore";
import { useStepValidation } from "@/hooks/useStepValidation";
import { useShowErrors } from "@/intake/hooks/useShowErrors";
import type { StepProps } from "@/types/intake";

const Step02 = ({ onNext }: StepProps) => {
  const phone = useIntakeStore((s) => s.about_you.phone);
  const setField = useIntakeStore((s) => s.setField);
  const { errors } = useStepValidation(2);
  const { shouldShow, revealAll } = useShowErrors();
  const [savedTrigger, setSavedTrigger] = useState(0);

  const handleContinue = () => {
    revealAll();
    if (Object.keys(errors).length === 0) onNext();
  };

  return (
    <StepCard h1="YOUR PHONE">
      <h2 className="intake-h2 mb-2">Best number to reach you</h2>
      <p
        className="mb-5"
        style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: "var(--text-body)" }}
      >
        We'll text your appointment confirmation here.
      </p>
      <PhoneField
        value={phone}
        onChange={(v) => {
          setField("about_you.phone", v);
          setSavedTrigger((n) => n + 1);
        }}
        error={errors["about_you.phone"]}
        showError={shouldShow("about_you.phone")}
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

export default Step02;
