import { useState } from "react";
import { StepCard, PrimaryCTA, TextField, SavedIndicator } from "@/intake/components";
import AddressAutocompleteField from "@/intake/components/fields/AddressAutocompleteField";
import { useIntakeStore } from "@/store/intakeStore";
import { useStepValidation } from "@/hooks/useStepValidation";
import { useShowErrors } from "@/intake/hooks/useShowErrors";
import type { StepProps } from "@/types/intake";

const Step05 = ({ onNext }: StepProps) => {
  const addr = useIntakeStore((s) => s.address);
  const setField = useIntakeStore((s) => s.setField);
  const setMany = useIntakeStore((s) => s.setMany);
  const { errors } = useStepValidation(5);
  const { shouldShow, markBlur, revealAll } = useShowErrors();
  const [savedTrigger, setSavedTrigger] = useState(0);

  const handleContinue = () => {
    revealAll();
    if (Object.keys(errors).length === 0) onNext();
  };

  return (
    <StepCard h1="WHERE DO YOU LIVE?">
      <h2 className="intake-h2 mb-5">Your address</h2>
      <AddressAutocompleteField
        street={addr.street}
        city={addr.city}
        state={addr.state}
        postal_code={addr.postal_code}
        onChange={(next) => {
          setMany([
            { path: "address.street", value: next.street },
            { path: "address.city", value: next.city },
            { path: "address.state", value: next.state },
            { path: "address.postal_code", value: next.postal_code },
          ]);
          setSavedTrigger((n) => n + 1);
        }}
        onBlur={(field) => markBlur(field)}
        errors={errors}
        showError={shouldShow}
      />

      <div className="mt-4">
        <TextField
          label="APT / SUITE (OPTIONAL)"
          autoComplete="address-line2"
          value={addr.address2}
          onChange={(e) => {
            setField("address.address2", e.target.value);
            setSavedTrigger((n) => n + 1);
          }}
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

export default Step05;
