import { useState, useRef, useCallback } from "react";
import V2Header from "@/components/booking-v2/V2Header";
import V2ProgressBar from "@/components/booking-v2/V2ProgressBar";
import V2StepOne from "@/components/booking-v2/V2StepOne";
import V2StepConcern from "@/components/booking-v2/V2StepConcern";

import V2StepPriorTreatment from "@/components/booking-v2/V2StepPriorTreatment";

import V2StepCalendar from "@/components/booking-v2/V2StepThree";
import V2StepVerify from "@/components/booking-v2/V2StepVerify";
import V2StepFour from "@/components/booking-v2/V2StepFour";
import SpecOverlay from "@/components/booking-v2/spec/SpecOverlay";
import SpecModeToggle from "@/components/booking-v2/spec/SpecModeToggle";
import { ArrowLeft } from "lucide-react";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const locationLabels: Record<string, string> = {
  richmond: "Richmond, VA",
  "newport-news": "Newport News, VA",
  "virginia-beach": "Virginia Beach, VA",
};

interface FormData {
  firstName: string;
  phone: string;
  location: string;
  primaryConcern: string;
  duration: string;
  priorTreatment: boolean;
  email: string;
  selectedDate: string;
  selectedTime: string;
  smsConsent: boolean;
  smsReminder: boolean;
}

const font = "'Montserrat', sans-serif";

const BookingFunnelV2 = () => {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "", phone: "", location: "",
    primaryConcern: "", duration: "", priorTreatment: false,
    email: "", selectedDate: "", selectedTime: "",
    smsConsent: false, smsReminder: true,
  });
  const [slideDir, setSlideDir] = useState<"left" | "right">("left");
  const [transitioning, setTransitioning] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((next: Step, direction: "left" | "right" = "left") => {
    setSlideDir(direction);
    setTransitioning(true);
    setTimeout(() => {
      setStep(next);
      setSlideDir(direction);
      setTransitioning(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 250);
  }, []);

  const goBack = () => {
    if (step > 1) goTo((step - 1) as Step, "right");
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

  return (
    <div className="bookv2-funnel flex min-h-screen flex-col" style={{ backgroundColor: "#0B1029" }}>
      <V2Header />

      <main className="flex flex-1 flex-col">
        {/* Progress bar */}
        <div className="mx-auto w-full max-w-lg" data-spec-id="chrome-progressbar">
          <V2ProgressBar currentStep={step} />
        </div>

        {/* Back button */}
        {step > 1 && step < 6 && (
          <div className="mx-auto w-full max-w-lg px-5">
            <button
              type="button"
              onClick={goBack}
              data-spec-id="chrome-back"
              className="mb-2 flex items-center gap-1 transition-all"
              style={{
                fontFamily: font, fontWeight: 500, fontSize: 14, color: "#B8B6B2",
                cursor: "pointer", background: "none", border: "none",
              }}
              aria-label="Go back"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          </div>
        )}

        {/* Step content */}
        <div ref={contentRef} className="flex-1" style={slideStyle}>
          {step === 1 && (
            <V2StepOne
              initialData={formData}
              onNext={(d) => {
                setFormData((p) => ({ ...p, ...d }));
                goTo(2);
              }}
            />
          )}
          {step === 2 && (
            <V2StepConcern
              initialValue={formData.primaryConcern}
              onNext={(concern) => {
                setFormData((p) => ({ ...p, primaryConcern: concern }));
                goTo(3);
              }}
            />
          )}
          {step === 3 && (
            <V2StepPriorTreatment
              initialValue={formData.priorTreatment}
              onNext={(prior) => {
                setFormData((p) => ({ ...p, priorTreatment: prior }));
                goTo(4);
              }}
            />
          )}
          {step === 4 && (
            <V2StepCalendar
              firstName={formData.firstName}
              phone={formData.phone}
              email={formData.email}
              locationLabel={locationLabels[formData.location] || formData.location}
              onNext={(d) => {
                setFormData((p) => ({ ...p, ...d }));
                goTo(5);
              }}
            />
          )}
          {step === 5 && (
            <V2StepVerify
              email={formData.email}
              phone={formData.phone}
            />
          )}
          {step === 6 && (
            <V2StepFour
              firstName={formData.firstName}
              phone={formData.phone}
              email={formData.email}
              location={formData.location}
              locationLabel={locationLabels[formData.location] || formData.location}
              selectedDate={formData.selectedDate}
              selectedTime={formData.selectedTime}
              primaryConcern={formData.primaryConcern}
              duration={formData.duration}
              priorTreatment={formData.priorTreatment}
              smsConsent={formData.smsConsent}
              smsReminder={formData.smsReminder}
            />
          )}
        </div>

        {/* Minimal footer */}
        <div className="py-6 text-center">
          <span style={{ fontFamily: font, fontSize: 13, color: "#AEB5BF" }}>
            Questions? Text or call{" "}
            <a href="tel:8663444955" style={{ color: "#AEB5BF", textDecoration: "underline" }}>
              (866) 344-4955
            </a>
          </span>
        </div>
      </main>

      {/* Spec mode (mockup annotations for dev team) */}
      <SpecOverlay currentStep={step} />
      <SpecModeToggle />
    </div>
  );
};

export default BookingFunnelV2;
