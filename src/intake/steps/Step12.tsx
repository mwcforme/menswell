import { useState } from "react";
import { StepCard, PrimaryCTA, TextArea, SavedIndicator } from "@/intake/components";
import { useIntakeStore } from "@/store/intakeStore";
import type { StepProps } from "@/types/intake";

const Step12 = ({ onNext }: StepProps) => {
  const allergies = useIntakeStore((s) => s.allergies);
  const setField = useIntakeStore((s) => s.setField);
  const [savedTrigger, setSavedTrigger] = useState(0);

  return (
    <StepCard h1="ALLERGIES">
      <h2 className="intake-h2 mb-2">Any allergies we should know about?</h2>
      <p
        className="mb-5"
        style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: "var(--text-body)" }}
      >
        Medications, foods, latex, anesthesia. Leave blank if none.
      </p>
      <TextArea
        label="ALLERGIES (OPTIONAL)"
        value={allergies}
        rows={4}
        onChange={(e) => {
          setField("allergies", e.target.value);
          setSavedTrigger((n) => n + 1);
        }}
        placeholder="e.g. Penicillin (hives), shellfish…"
        maxLength={1000}
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

export default Step12;
