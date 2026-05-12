import { useState, useRef } from "react";
import BookingHeader from "@/components/booking/BookingHeader";
import ProgressBar from "@/components/booking/ProgressBar";
import StepOne from "@/components/booking/StepOne";
import StepTwo from "@/components/booking/StepTwo";
import StepThree from "@/components/booking/StepThree";
import StepFour from "@/components/booking/StepFour";
import DQSoftLanding from "@/components/booking/DQSoftLanding";
import { Footer } from "@/components/Footer";
import { Star, Shield, MapPin, Lock, Award } from "lucide-react";

type Step = 1 | 2 | 3 | 4 | "dq";

interface FormData {
  firstName: string;
  phone: string;
  email: string;
  referralSource: string;
  location: string;
  primaryConcern: string;
  duration: string;
  screenerAnswers: Record<string, boolean>;
  selectedDate: string;
  selectedTime: string;
}

const BookingFunnel = () => {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "", phone: "", email: "",
    referralSource: "", location: "", primaryConcern: "", duration: "",
    screenerAnswers: {}, selectedDate: "", selectedTime: "",
  });
  const [transitioning, setTransitioning] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const goTo = (next: Step) => {
    setTransitioning(true);
    setTimeout(() => {
      setStep(next);
      setTransitioning(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  };

  const showProgress = typeof step === "number" && step >= 1 && step <= 4;
  const isLightStep = (typeof step === "number" && step >= 1 && step <= 4) || step === "dq";
  const bgColor = isLightStep ? "#EBEAE8" : "#000814";

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: bgColor }}>
      <BookingHeader />
      <main className="flex-1 flex flex-col">

      {showProgress && (
        <div className="mx-auto max-w-lg px-5" style={{ backgroundColor: bgColor }}>
          <ProgressBar currentStep={step as number} lightMode={isLightStep} />
        </div>
      )}

      <div
        ref={contentRef}
        className="flex-1 transition-all duration-300"
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? "translateY(12px)" : "translateY(0)",
        }}
      >
        {step === 1 && (
          <StepOne onNext={(d) => { setFormData((p) => ({ ...p, ...d })); goTo(2); }} />
        )}
        {step === 2 && (
          <StepTwo
            onNext={(d) => { setFormData((p) => ({ ...p, ...d })); goTo(3); }}
            onDQ={() => goTo("dq")}
          />
        )}
        {step === 3 && (
          <StepThree
            firstName={formData.firstName}
            phone={formData.phone}
            email={formData.email}
            location={formData.location}
            onNext={(d) => { setFormData((p) => ({ ...p, ...d })); goTo(4); }}
          />
        )}
        {step === 4 && (
          <StepFour
            firstName={formData.firstName}
            phone={formData.phone}
            location={formData.location}
            selectedDate={formData.selectedDate}
            selectedTime={formData.selectedTime}
          />
        )}
        {step === "dq" && <DQSoftLanding phone={formData.phone} />}
      </div>

      {/* Trust Strip */}
      <div style={{ backgroundColor: bgColor }} className="pb-4 pt-2 px-5">
        <div className="mx-auto max-w-lg flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider" style={{ color: "#888888" }}>
            <MapPin size={11} /> 10,000+ Men Treated
          </span>
          <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider" style={{ color: "#888888" }}>
            <Star size={11} fill="#D4A017" color="#D4A017" /> 4.9 Google Reviews
          </span>
          <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider" style={{ color: "#888888" }}>
            <Shield size={11} /> LegitScript Certified
          </span>
          <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider" style={{ color: "#888888" }}>
            <Lock size={11} /> HIPAA Compliant
          </span>
          <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider" style={{ color: "#888888" }}>
            <Award size={11} /> CLIA Certified
          </span>
        </div>
      </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingFunnel;
