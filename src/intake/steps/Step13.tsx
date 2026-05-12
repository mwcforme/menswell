import { useState } from "react";
import { StepCard, PrimaryCTA, TextField, SavedIndicator } from "@/intake/components";
import { useIntakeStore } from "@/store/intakeStore";
import type { StepProps } from "@/types/intake";

const Step13 = ({ onNext }: StepProps) => {
  const occupation = useIntakeStore((s) => s.occupation);
  const setField = useIntakeStore((s) => s.setField);
  const [savedTrigger, setSavedTrigger] = useState(0);

  return (
    <StepCard h1="YOUR WORK">
      <h2 className="intake-h2 mb-2">What do you do for a living?</h2>
      <p
        className="mb-5"
        style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: "var(--text-body)" }}
      >
        Helps your provider understand physical demands and schedule constraints.
      </p>
      <TextField
        label="OCCUPATION (OPTIONAL)"
        autoComplete="organization-title"
        value={occupation}
        onChange={(e) => {
          setField("occupation", e.target.value);
          setSavedTrigger((n) => n + 1);
        }}
      />
      <div className="mt-6">
        <PrimaryCTA sticky onClick={onNext}>
          Continue
        </PrimaryCTA>
      </div>
      <SavedIndicator trigger={savedTrigger} />
    </StepCard>
  );
};

export default Step13;
