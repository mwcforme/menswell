import { useState } from "react";
import { StepCard, PrimaryCTA, CardCheckbox, SavedIndicator } from "@/intake/components";
import { useIntakeStore } from "@/store/intakeStore";
import type { StepProps } from "@/types/intake";

const ITEMS = [
  "High blood pressure",
  "High cholesterol",
  "Diabetes",
  "Heart disease",
  "Stroke",
  "Sleep apnea",
  "Thyroid disorder",
  "Depression or anxiety",
  "Prostate condition",
  "Cancer",
  "Blood clots / DVT",
  "Sickle cell anemia",
  "Priapism",
  "Peyronie's disease",
];
const NONE = "None of the above";

const Step09 = ({ onNext }: StepProps) => {
  const selected = useIntakeStore((s) => s.medical_history.diagnoses);
  const setField = useIntakeStore((s) => s.setField);
  const [savedTrigger, setSavedTrigger] = useState(0);

  const toggle = (val: string) => {
    let next: string[];
    if (val === NONE) next = selected.includes(NONE) ? [] : [NONE];
    else {
      const without = selected.filter((v) => v !== NONE);
      next = without.includes(val) ? without.filter((v) => v !== val) : [...without, val];
    }
    setField("medical_history.diagnoses", next);
    setSavedTrigger((n) => n + 1);
  };

  return (
    <StepCard h1="DIAGNOSES">
      <h2 className="intake-h2 mb-2">Have you been diagnosed with any of these?</h2>
      <p
        className="mb-5"
        style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: "var(--text-body)" }}
      >
        Check all that apply.
      </p>
      <div className="space-y-2.5">
        {ITEMS.map((d) => (
          <CardCheckbox
            key={d}
            label={d}
            checked={selected.includes(d)}
            onToggle={() => toggle(d)}
          />
        ))}
        <CardCheckbox
          label={NONE}
          checked={selected.includes(NONE)}
          onToggle={() => toggle(NONE)}
        />
      </div>
      <div className="mt-6">
        <PrimaryCTA sticky onClick={onNext}>
          Continue
        </PrimaryCTA>
      </div>
      <SavedIndicator trigger={savedTrigger} />
    </StepCard>
  );
};

export default Step09;
