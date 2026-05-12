import { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import V2Header from "@/components/booking-v2/V2Header";
import SurveyProgressBar from "@/components/survey/SurveyProgressBar";
import SurveyRatingStep, { RatingValue } from "@/components/survey/SurveyRatingStep";
import SurveyRecommendStep from "@/components/survey/SurveyRecommendStep";
import SurveyLocationStep from "@/components/survey/SurveyLocationStep";
import SurveyIdentityStep from "@/components/survey/SurveyIdentityStep";
import SurveyRedirectInterstitial from "@/components/survey/SurveyRedirectInterstitial";
import {
  REVIEW_URLS,
  LOCATION_LABELS,
  LocationSlug,
  isLocationSlug,
} from "@/data/reviewUrls";

import "@/intake/styles.css"; // pulls in Bebas Neue / Montserrat tokens already used by /bookv2

const font = "'Montserrat', sans-serif";

interface SurveyState {
  overall: RatingValue | "";
  staff: RatingValue | "";
  recommend: boolean | null;
  location: LocationSlug | "";
  contactMode: "email" | "phone" | "";
  contactValue: string;
}

const initialState: SurveyState = {
  overall: "",
  staff: "",
  recommend: null,
  location: "",
  contactMode: "",
  contactValue: "",
};

const SurveyPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const prefilledLocation = params.get("location");
  const contactId = params.get("contact_id");
  const firstName = params.get("first_name");

  const isWarm = isLocationSlug(prefilledLocation);

  const phaseLabels = useMemo(
    () =>
      isWarm
        ? ["EXPERIENCE", "STAFF", "RECOMMEND"]
        : ["EXPERIENCE", "STAFF", "RECOMMEND", "ABOUT YOU"],
    [isWarm]
  );

  const [state, setState] = useState<SurveyState>({
    ...initialState,
    location: isWarm ? (prefilledLocation as LocationSlug) : "",
  });

  // Step indices:
  // warm: 0 overall, 1 staff, 2 recommend, 3 redirecting (only if yes)
  // cold: 0 overall, 1 staff, 2 recommend, 3 location, 4 identity, 5 redirecting
  const [step, setStep] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [slideDir, setSlideDir] = useState<"left" | "right">("left");

  const goTo = useCallback((next: number, dir: "left" | "right" = "left") => {
    setSlideDir(dir);
    setTransitioning(true);
    setTimeout(() => {
      setStep(next);
      setTransitioning(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 250);
  }, []);

  const goBack = () => {
    if (step > 0) goTo(step - 1, "right");
  };

  // Phase index for progress bar
  const phaseIndex = useMemo(() => {
    if (step === 0) return 0;
    if (step === 1) return 1;
    if (step === 2) return 2;
    if (!isWarm && step === 3) return 3;
    if (!isWarm && step === 4) return 3;
    return phaseLabels.length - 1;
  }, [step, isWarm, phaseLabels.length]);

  const submitAndRoute = useCallback(
    (finalState: SurveyState) => {
      const payload = {
        contact_id: contactId,
        location: finalState.location,
        overall: finalState.overall,
        staff: finalState.staff,
        recommend: finalState.recommend,
        contact_mode: finalState.contactMode || null,
        contact_value: finalState.contactValue || null,
        submitted_at: new Date().toISOString(),
        source: isWarm ? "ghl_link" : "cold",
      };
      // eslint-disable-next-line no-console
      console.info("survey_submit", payload);
      (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({
        event: "survey_submitted",
        ...payload,
      });

      if (finalState.recommend && isLocationSlug(finalState.location)) {
        // Show interstitial then redirect
        setStep(99);
        const url = REVIEW_URLS[finalState.location];
        setTimeout(() => window.location.assign(url), 1200);
      } else {
        navigate("/survey/thanks", {
          state: { location: finalState.location, contactId },
        });
      }
    },
    [contactId, isWarm, navigate]
  );

  // Track step views
  useEffect(() => {
    (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({
      event: "survey_step_view",
      step,
      warm: isWarm,
    });
  }, [step, isWarm]);

  const handleRecommend = (recommend: boolean) => {
    const next = { ...state, recommend };
    setState(next);
    if (isWarm) {
      submitAndRoute(next);
    } else {
      goTo(3);
    }
  };

  const handleLocation = (loc: LocationSlug) => {
    setState((p) => ({ ...p, location: loc }));
    goTo(4);
  };

  const handleIdentity = ({ mode, value }: { mode: "email" | "phone"; value: string }) => {
    const next = { ...state, contactMode: mode, contactValue: value };
    setState(next);
    submitAndRoute(next);
  };

  const slideStyle: React.CSSProperties = transitioning
    ? {
        opacity: 0,
        transform: slideDir === "left" ? "translateX(-24px)" : "translateX(24px)",
        transition: "opacity 250ms ease-out, transform 250ms ease-out",
      }
    : {
        opacity: 1,
        transform: "translateX(0)",
        transition: "opacity 250ms ease-out, transform 250ms ease-out",
      };

  const showBack = step > 0 && step < 99;

  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: "#0B1029" }}>
      <V2Header />

      <main className="flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-lg">
          {step !== 99 && (
            <SurveyProgressBar labels={phaseLabels} currentIndex={phaseIndex} />
          )}
        </div>

        {showBack && (
          <div className="mx-auto w-full max-w-lg px-5">
            <button
              type="button"
              onClick={goBack}
              className="mb-2 flex items-center gap-1 transition-all"
              style={{
                fontFamily: font,
                fontWeight: 500,
                fontSize: 14,
                color: "#B8B6B2",
                cursor: "pointer",
                background: "none",
                border: "none",
              }}
              aria-label="Go back"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          </div>
        )}

        <div className="flex-1" style={slideStyle}>
          {step === 0 && (
            <SurveyRatingStep
              greeting={firstName ? `Hi, ${firstName}` : undefined}
              title="How was your overall experience?"
              subtitle="Your honest answer helps us improve."
              scale="experience"
              initialValue={state.overall}
              onSelect={(v) => {
                setState((p) => ({ ...p, overall: v }));
                goTo(1);
              }}
            />
          )}
          {step === 1 && (
            <SurveyRatingStep
              title="How did our team treat you?"
              subtitle="Front desk, providers, and care team."
              scale="staff"
              initialValue={state.staff}
              onSelect={(v) => {
                setState((p) => ({ ...p, staff: v }));
                goTo(2);
              }}
            />
          )}
          {step === 2 && (
            <SurveyRecommendStep
              initialValue={state.recommend}
              ctaLabel={isWarm ? "Submit Feedback" : "Continue"}
              onSubmit={handleRecommend}
            />
          )}
          {!isWarm && step === 3 && (
            <SurveyLocationStep
              initialValue={state.location}
              onSelect={handleLocation}
            />
          )}
          {!isWarm && step === 4 && (
            <SurveyIdentityStep
              ctaLabel="Submit Feedback"
              onSubmit={handleIdentity}
            />
          )}
          {step === 99 && isLocationSlug(state.location) && (
            <SurveyRedirectInterstitial locationLabel={LOCATION_LABELS[state.location]} />
          )}
        </div>

        <div className="py-6 text-center">
          <span style={{ fontFamily: font, fontSize: 13, color: "#AEB5BF" }}>
            Questions? Text or call{" "}
            <a
              href="tel:8663444955"
              style={{ color: "#AEB5BF", textDecoration: "underline" }}
            >
              (866) 344-4955
            </a>
          </span>
        </div>
      </main>
    </div>
  );
};

export default SurveyPage;
