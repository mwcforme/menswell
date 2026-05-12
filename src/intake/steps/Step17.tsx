import { useState } from "react";
import { StepCard, PrimaryCTA, CardCheckbox, SavedIndicator } from "@/intake/components";
import { useIntakeStore } from "@/store/intakeStore";
import type { StepProps } from "@/types/intake";

const ITEMS = [
  "Decreased or absent morning erections",
  "Inability to obtain an erection",
  "Inability to maintain an erection",
  "Decreased turgor or rigidity",
  "Ineffective response to ED medication",
  "Use of medication (Viagra or Cialis)",
  "Premature ejaculation",
];
const NONE = "None of the above";

const Step17 = ({ onNext }: StepProps) => {
  const selected = useIntakeStore((s) => s.symptoms.sexual);
  const setField = useIntakeStore((s) => s.setField);
  const [savedTrigger, setSavedTrigger] = useState(0);

  const toggle = (val: string) => {
    let next: string[];
    if (val === NONE) next = selected.includes(NONE) ? [] : [NONE];
    else {
      const without = selected.filter((v) => v !== NONE);
      next = without.includes(val) ? without.filter((v) => v !== val) : [...without, val];
    }
    setField("symptoms.sexual", next);
    setSavedTrigger((n) => n + 1);
  };

  return (
    <StepCard h1="SEXUAL SYMPTOMS">
      <h2 className="intake-h2 mb-2">Last one before consent</h2>
      <p
        className="mb-5"
        style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: "var(--text-body)" }}
      >
        Honest answers help your provider build the right plan. Check all that apply.
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

export default Step17;
