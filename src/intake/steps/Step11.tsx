import { useState } from "react";
import { StepCard, PrimaryCTA, TextArea, SavedIndicator } from "@/intake/components";
import { useIntakeStore } from "@/store/intakeStore";
import type { StepProps } from "@/types/intake";

const Step11 = ({ onNext }: StepProps) => {
  const meds = useIntakeStore((s) => s.medications);
  const setField = useIntakeStore((s) => s.setField);
  const [savedTrigger, setSavedTrigger] = useState(0);

  return (
    <StepCard h1="MEDICATIONS">
      <h2 className="intake-h2 mb-2">What are you currently taking?</h2>
      <p
        className="mb-5"
        style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: "var(--text-body)" }}
      >
        Prescriptions, over-the-counter, supplements. List as many as you remember — or
        leave blank.
      </p>
      <TextArea
        label="MEDICATIONS (OPTIONAL)"
        value={meds}
        rows={5}
        onChange={(e) => {
          setField("medications", e.target.value);
          setSavedTrigger((n) => n + 1);
        }}
        placeholder="e.g. Lisinopril 10mg daily, fish oil, vitamin D…"
        maxLength={2000}
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

export default Step11;
