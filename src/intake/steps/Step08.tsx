import { useState } from "react";
import { StepCard, PrimaryCTA, TextField, CardRadio, SavedIndicator } from "@/intake/components";
import { useIntakeStore } from "@/store/intakeStore";
import type { StepProps, YesNoUrgent } from "@/types/intake";

const CONTACT_OPTIONS: { value: YesNoUrgent; label: string }[] = [
  { value: "yes", label: "Yes, you can contact them" },
  { value: "no", label: "No, please don't" },
  { value: "urgent_only", label: "Only if urgent" },
];

const Step08 = ({ onNext }: StepProps) => {
  const pcp = useIntakeStore((s) => s.primary_care_provider);
  const setField = useIntakeStore((s) => s.setField);
  const [savedTrigger, setSavedTrigger] = useState(0);

  const update = (path: string, value: unknown) => {
    setField(path, value);
    setSavedTrigger((n) => n + 1);
  };

  return (
    <StepCard h1="PRIMARY CARE PROVIDER">
      <h2 className="intake-h2 mb-2">Do you have a primary care provider?</h2>
      <p
        className="mb-5"
        style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: "var(--text-body)" }}
      >
        All optional — we coordinate when it helps your care.
      </p>

      <div className="space-y-4">
        <TextField
          label="PROVIDER NAME"
          value={pcp.provider_name}
          onChange={(e) => update("primary_care_provider.provider_name", e.target.value)}
          autoComplete="off"
        />
        <TextField
          label="CLINIC NAME"
          value={pcp.clinic_name}
          onChange={(e) => update("primary_care_provider.clinic_name", e.target.value)}
          autoComplete="off"
        />

        <div>
          <div className="intake-label mb-2">MAY WE CONTACT THEM?</div>
          <div className="space-y-2.5" role="radiogroup">
            {CONTACT_OPTIONS.map((opt) => (
              <CardRadio
                key={opt.value ?? "none"}
                label={opt.label}
                selected={pcp.may_contact === opt.value}
                onSelect={() => update("primary_care_provider.may_contact", opt.value)}
              />
            ))}
          </div>
        </div>
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

export default Step08;
