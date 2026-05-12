import { useState } from "react";
import { StepCard, PrimaryCTA, CardRadio, SavedIndicator } from "@/intake/components";
import { useIntakeStore } from "@/store/intakeStore";
import { useStepValidation } from "@/hooks/useStepValidation";
import { useShowErrors } from "@/intake/hooks/useShowErrors";
import type { StepProps, TobaccoUse, AlcoholUse } from "@/types/intake";

const Step14 = ({ onNext }: StepProps) => {
  const lifestyle = useIntakeStore((s) => s.lifestyle);
  const setField = useIntakeStore((s) => s.setField);
  const { errors } = useStepValidation(14);
  const { shouldShow, revealAll } = useShowErrors();
  const [savedTrigger, setSavedTrigger] = useState(0);

  const handleContinue = () => {
    revealAll();
    if (Object.keys(errors).length === 0) onNext();
  };

  const tobaccoErr = shouldShow("lifestyle.tobacco") && errors["lifestyle.tobacco"];
  const alcoholErr = shouldShow("lifestyle.alcohol") && errors["lifestyle.alcohol"];

  const tObs: { v: TobaccoUse; l: string }[] = [
    { v: "yes", l: "Yes" },
    { v: "no", l: "No" },
    { v: "former", l: "Former user" },
  ];
  const aObs: { v: AlcoholUse; l: string }[] = [
    { v: "yes", l: "Yes" },
    { v: "no", l: "No" },
    { v: "occasionally", l: "Occasionally" },
  ];

  return (
    <StepCard h1="LIFESTYLE">
      <div className="mb-6">
        <div className="intake-label mb-2">TOBACCO USE</div>
        <div className="space-y-2.5" role="radiogroup">
          {tObs.map((o) => (
            <CardRadio
              key={`t-${o.v}`}
              label={o.l}
              selected={lifestyle.tobacco === o.v}
              onSelect={() => {
                setField("lifestyle.tobacco", o.v);
                setSavedTrigger((n) => n + 1);
              }}
            />
          ))}
        </div>
        {tobaccoErr && (
          <p
            aria-live="polite"
            style={{
              marginTop: 6,
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 12,
              color: "var(--error-red)",
            }}
          >
            {errors["lifestyle.tobacco"]}
          </p>
        )}
      </div>

      <div>
        <div className="intake-label mb-2">ALCOHOL USE</div>
        <div className="space-y-2.5" role="radiogroup">
          {aObs.map((o) => (
            <CardRadio
              key={`a-${o.v}`}
              label={o.l}
              selected={lifestyle.alcohol === o.v}
              onSelect={() => {
                setField("lifestyle.alcohol", o.v);
                setSavedTrigger((n) => n + 1);
              }}
            />
          ))}
        </div>
        {alcoholErr && (
          <p
            aria-live="polite"
            style={{
              marginTop: 6,
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 12,
              color: "var(--error-red)",
            }}
          >
            {errors["lifestyle.alcohol"]}
          </p>
        )}
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

export default Step14;
