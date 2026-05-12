import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  StepCard,
  PrimaryCTA,
  CardCheckbox,
  TextField,
  SavedIndicator,
} from "@/intake/components";
import RecaptchaPlaceholder from "@/intake/components/RecaptchaPlaceholder";
import ConsentDrawer from "@/intake/components/ConsentDrawer";
import { useIntakeStore } from "@/store/intakeStore";
import { useStepValidation } from "@/hooks/useStepValidation";
import { useShowErrors } from "@/intake/hooks/useShowErrors";
import { submitIntake } from "@/lib/submitIntake";
import { trackSubmitted, trackSubmitError } from "@/lib/intakeAnalytics";
import type { IntakeState, StepProps } from "@/types/intake";

interface ConsentItem {
  key: keyof IntakeState["consents"];
  short: string;
  drawerTitle: string;
  drawerBody: string;
}

const ITEMS: ConsentItem[] = [
  {
    key: "info_accurate",
    short: "I confirm my information is accurate.",
    drawerTitle: "Accuracy of Information",
    drawerBody:
      "I confirm that the information I have provided in this intake is true, complete, and accurate to the best of my knowledge. I understand that incomplete or inaccurate information may affect the quality and safety of my care, and I will update my provider promptly if anything changes.",
  },
  {
    key: "authorize_treatment",
    short: "I consent to evaluation and treatment.",
    drawerTitle: "Authorization for Treatment",
    drawerBody:
      "I voluntarily authorize the licensed medical providers and clinical staff of Men's Wellness Centers to perform the evaluations, examinations, diagnostic tests (including blood work), and treatments they determine to be medically appropriate for my care. I understand no guarantees have been made about outcomes, I may refuse any test or treatment, and I may withdraw my consent at any time.",
  },
  {
    key: "telemedicine",
    short: "I understand telemedicine may be used.",
    drawerTitle: "Consent to Telemedicine",
    drawerBody:
      "I understand some portions of my care may be provided in person and others via telemedicine (live video, audio, or secure messaging) when my provider determines it is clinically appropriate. Telemedicine has benefits and limitations; I have the right to refuse telemedicine and request an in-person visit at any time. All telemedicine encounters are subject to the same confidentiality protections as in-person visits.",
  },
  {
    key: "privacy_practices",
    short: "I acknowledge the Privacy Notice.",
    drawerTitle: "Notice of Privacy Practices",
    drawerBody:
      "I acknowledge that I have been provided with, or had the opportunity to review, MWC's Notice of Privacy Practices, which describes how my protected health information may be used and disclosed and how I may access this information. The full notice is available at any MWC center and on the MWC website.",
  },
];

const Step18 = ({ onBack }: StepProps) => {
  const navigate = useNavigate();
  const consents = useIntakeStore((s) => s.consents);
  const sig = useIntakeStore((s) => s.signature);
  const a = useIntakeStore((s) => s.about_you);
  const setField = useIntakeStore((s) => s.setField);
  const { errors } = useStepValidation(18);
  const { shouldShow, markBlur, revealAll } = useShowErrors();

  const [savedTrigger, setSavedTrigger] = useState(0);
  const [drawer, setDrawer] = useState<ConsentItem | null>(null);
  const [captcha, setCaptcha] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Catch async submission error broadcast (mirror legacy behavior)
  useEffect(() => {
    const handler = () => {
      const w = window as unknown as { __intakeSubmitError?: string };
      if (w.__intakeSubmitError) {
        setSubmitError(w.__intakeSubmitError);
        w.__intakeSubmitError = undefined;
        setSubmitting(false);
      }
    };
    window.addEventListener("intake:submit-error", handler);
    return () => window.removeEventListener("intake:submit-error", handler);
  }, []);

  const handleSubmit = async () => {
    if (submitting) return;
    revealAll();
    if (!captcha) {
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);

    const fullState = useIntakeStore.getState();
    const {
      currentStep: _cs,
      hasHydrated: _hh,
      setField: _sf,
      setMany: _sm,
      setStep: _ss,
      nextStep: _ns,
      prevStep: _ps,
      resetForm,
      loadFromUrlParams: _lp,
      _markHydrated: _mh,
      ...payload
    } = fullState;

    const result = await submitIntake(payload);

    if (result.ok) {
      const greet = {
        fullName:
          payload.about_you.full_legal_name ||
          `${payload.about_you.first_name} ${payload.about_you.last_name}`.trim(),
        email: payload.about_you.email,
        phone: payload.about_you.phone,
      };
      trackSubmitted();
      try {
        localStorage.removeItem("mwc_intake_v2");
      } catch {
        /* ignore */
      }
      resetForm();
      navigate("/intake/thanks", { replace: true, state: greet });
    } else {
      trackSubmitError(result.error);
      setSubmitError(result.error || "Submission failed");
      setSubmitting(false);
      onBack?.();
    }
  };

  const expectedName =
    `${a.first_name} ${a.last_name}`.trim().replace(/\s+/g, " ") || "your full name";

  return (
    <StepCard h1="SIGN & SUBMIT">
      {submitError && (
        <div
          role="alert"
          className="mb-4"
          style={{
            background: "rgba(220,38,38,0.10)",
            border: "1px solid rgba(220,38,38,0.35)",
            borderRadius: 10,
            padding: "12px 14px",
            color: "var(--text-primary)",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 13,
            lineHeight: 1.45,
          }}
        >
          <strong style={{ color: "var(--error-red)", fontWeight: 700 }}>
            Something went wrong sending your intake.
          </strong>{" "}
          Please try again, or call us at{" "}
          <a
            href="tel:+17579379990"
            style={{ color: "var(--accent-orange)", textDecoration: "underline" }}
          >
            (757) 937-9990
          </a>
          .
        </div>
      )}

      <h2 className="intake-h2 mb-5">Final confirmations</h2>

      <div className="space-y-3">
        {ITEMS.map((item) => {
          const checked = consents[item.key];
          const errKey = `consents.${item.key}`;
          const showErr = shouldShow(errKey) && errors[errKey];
          return (
            <div key={item.key}>
              <CardCheckbox
                label={item.short}
                checked={checked}
                onToggle={() => {
                  setField(`consents.${item.key}`, !checked);
                  setSavedTrigger((n) => n + 1);
                }}
              />
              <div className="mt-1 text-right">
                <button
                  type="button"
                  onClick={() => setDrawer(item)}
                  className="intake-secondary-link"
                  style={{ fontSize: 12 }}
                >
                  Read full text
                </button>
              </div>
              {showErr && (
                <p
                  aria-live="polite"
                  style={{
                    marginTop: 4,
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: 12,
                    color: "var(--error-red)",
                  }}
                >
                  {errors[errKey]}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <TextField
          label={`TYPE YOUR FULL LEGAL NAME (${expectedName})`}
          autoComplete="name"
          value={sig.typed_name}
          onChange={(e) => {
            setField("signature.typed_name", e.target.value);
            setSavedTrigger((n) => n + 1);
          }}
          onBlur={() => markBlur("signature.typed_name")}
          error={errors["signature.typed_name"]}
          showError={shouldShow("signature.typed_name")}
          required
          maxLength={120}
        />
      </div>

      <p
        className="mt-3 mb-4"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 11,
          color: "var(--text-muted)",
          letterSpacing: "0.04em",
        }}
      >
        Today's date and time will be recorded automatically.
      </p>

      <RecaptchaPlaceholder
        checked={captcha}
        onChange={(v) => {
          setCaptcha(v);
          if (v) setCaptchaError(false);
        }}
      />
      {captchaError && (
        <p
          aria-live="polite"
          style={{
            marginTop: 6,
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 12,
            color: "var(--error-red)",
          }}
        >
          Please confirm you're not a robot.
        </p>
      )}

      <div className="mt-6">
        <PrimaryCTA sticky onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Submitting…" : "Complete My Intake"}
        </PrimaryCTA>
      </div>

      <ConsentDrawer
        open={!!drawer}
        title={drawer?.drawerTitle ?? ""}
        body={drawer?.drawerBody ?? ""}
        onClose={() => setDrawer(null)}
      />

      <SavedIndicator trigger={savedTrigger} />
    </StepCard>
  );
};

export default Step18;
