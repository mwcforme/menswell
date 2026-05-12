import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AppShell, BackButton } from "./components";
import ResumeToast from "./components/ResumeToast";
import {
  estimateResumeStep,
  hasResumableData,
  useIntakeStore,
} from "@/store/intakeStore";
import { TOTAL_STEPS, phaseForStep, type StepProps } from "@/types/intake";

// Lazy-load each step so the entry chunk stays small.
// Step "0" is the welcome/intro screen — not counted in TOTAL_STEPS.
const stepModules: Record<number, () => Promise<{ default: React.FC<StepProps> }>> = {
  0: () => import("./steps/StepIntro"),
  1: () => import("./steps/Step01"),
  2: () => import("./steps/Step02"),
  3: () => import("./steps/Step03"),
  4: () => import("./steps/Step04"),
  5: () => import("./steps/Step05"),
  6: () => import("./steps/Step06"),
  7: () => import("./steps/Step07"),
  8: () => import("./steps/Step08"),
  9: () => import("./steps/Step09"),
  10: () => import("./steps/Step10"),
  11: () => import("./steps/Step11"),
  12: () => import("./steps/Step12"),
  13: () => import("./steps/Step13"),
  14: () => import("./steps/Step14"),
  15: () => import("./steps/Step15"),
  16: () => import("./steps/Step16"),
  17: () => import("./steps/Step17"),
  18: () => import("./steps/Step18"),
};

const StepLoader = ({
  step,
  onNext,
  onBack,
}: {
  step: number;
  onNext: () => void;
  onBack: () => void;
}) => {
  const Comp = useMemo(() => lazy(stepModules[step]), [step]);
  return (
    <Suspense fallback={<div style={{ minHeight: 240 }} />}>
      <Comp onNext={onNext} onBack={onBack} />
    </Suspense>
  );
};

const IntakeFlow = () => {
  const currentStep = useIntakeStore((s) => s.currentStep);
  const hasHydrated = useIntakeStore((s) => s.hasHydrated);
  const loadFromUrlParams = useIntakeStore((s) => s.loadFromUrlParams);
  const resetForm = useIntakeStore((s) => s.resetForm);
  const setStep = useIntakeStore((s) => s.setStep);
  const nextStep = useIntakeStore((s) => s.nextStep);
  const prevStep = useIntakeStore((s) => s.prevStep);
  const reduceMotion = useReducedMotion();

  // Local intro flag — independent of currentStep so the welcome screen can
  // be shown before step 1 without breaking persistence/resume.
  const [showIntro, setShowIntro] = useState(true);

  const directionRef = useRef<1 | -1>(1);
  const lastStepRef = useRef(currentStep);
  const urlLoadedRef = useRef(false);

  const [showResume, setShowResume] = useState(false);
  const [resumeChecked, setResumeChecked] = useState(false);

  // Run URL pre-fill once after hydration
  useEffect(() => {
    if (!hasHydrated || urlLoadedRef.current) return;
    urlLoadedRef.current = true;

    const beforeFirst = useIntakeStore.getState().about_you.first_name;
    loadFromUrlParams();

    const after = useIntakeStore.getState();
    const hasUrl = typeof window !== "undefined" && window.location.search.length > 0;

    // If we have prior data, skip the intro screen and offer Resume.
    if (hasResumableData(after) && !hasUrl) {
      setShowIntro(false);
      if (after.currentStep === 1 && beforeFirst) {
        setShowResume(true);
      }
    } else if (hasUrl) {
      // GHL deep-link with prefilled identity: skip intro
      setShowIntro(false);
    }
    setResumeChecked(true);
  }, [hasHydrated, loadFromUrlParams]);

  // Safari bfcache rehydrate
  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        try {
          useIntakeStore.persist.rehydrate();
        } catch {
          /* ignore */
        }
      }
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  // iOS visualViewport: keep sticky CTA above the soft keyboard.
  // Exposes --intake-kb-offset on .intake-root so the sticky CTA `bottom`
  // can lift with the keyboard.
  useEffect(() => {
    if (typeof window === "undefined" || !window.visualViewport) return;
    const vv = window.visualViewport;
    const apply = () => {
      const offset = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      document.documentElement.style.setProperty("--intake-kb-offset", `${offset}px`);
    };
    apply();
    vv.addEventListener("resize", apply);
    vv.addEventListener("scroll", apply);
    return () => {
      vv.removeEventListener("resize", apply);
      vv.removeEventListener("scroll", apply);
      document.documentElement.style.setProperty("--intake-kb-offset", "0px");
    };
  }, []);

  // Track direction + scroll + analytics
  useEffect(() => {
    directionRef.current = currentStep >= lastStepRef.current ? 1 : -1;
    lastStepRef.current = currentStep;
    if (typeof window !== "undefined") window.scrollTo(0, 0);
    if (!showIntro) {
      void import("@/lib/intakeAnalytics").then((m) => m.trackStepView(currentStep));
    }
  }, [currentStep, showIntro]);

  const effectiveStep = showIntro ? 0 : currentStep;
  const phaseIndex = showIntro ? 0 : phaseForStep(currentStep);
  const showBack = !showIntro && currentStep > 1;

  const handleNext = () => {
    if (showIntro) {
      setShowIntro(false);
      return;
    }
    nextStep();
  };

  const handleBack = () => {
    if (showIntro) return;
    if (currentStep === 1) {
      setShowIntro(true);
      return;
    }
    prevStep();
  };

  const dir = directionRef.current;
  const variants = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, x: dir === 1 ? 24 : -24 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: dir === 1 ? -24 : 24 },
      };

  const handleResume = () => {
    const s = useIntakeStore.getState();
    setStep(estimateResumeStep(s));
    setShowResume(false);
  };

  const handleStartOver = () => {
    resetForm();
    setShowIntro(true);
    setShowResume(false);
  };

  if (!hasHydrated || !resumeChecked) {
    return (
      <AppShell currentStep={1} totalSteps={TOTAL_STEPS} phaseIndex={0} showProgress>
        <div style={{ minHeight: 240 }} />
      </AppShell>
    );
  }

  return (
    <AppShell
      currentStep={effectiveStep}
      totalSteps={TOTAL_STEPS}
      phaseIndex={phaseIndex}
      showProgress={!showIntro}
    >
      {showBack && (
        <div className="mb-1">
          <BackButton onClick={handleBack} />
        </div>
      )}

      {showResume && currentStep === 1 && !showIntro && (
        <ResumeToast onResume={handleResume} onStartOver={handleStartOver} />
      )}

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={showIntro ? "intro" : `step-${currentStep}`}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: reduceMotion ? 0.1 : 0.25, ease: "easeOut" }}
        >
          <StepLoader step={effectiveStep} onNext={handleNext} onBack={handleBack} />
        </motion.div>
      </AnimatePresence>
    </AppShell>
  );
};

export default IntakeFlow;
