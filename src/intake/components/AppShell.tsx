import { ReactNode } from "react";
import StickyHeader from "./StickyHeader";
import ProgressBar from "./ProgressBar";

interface AppShellProps {
  children: ReactNode;
  currentStep?: number;
  totalSteps?: number;
  phaseIndex?: number;
  showProgress?: boolean;
}

const AppShell = ({
  children,
  currentStep = 0,
  totalSteps = 20,
  phaseIndex = 0,
  showProgress = true,
}: AppShellProps) => {
  return (
    <div className="intake-root flex min-h-screen flex-col">
      <StickyHeader />
      {showProgress && (
        <ProgressBar
          currentStep={currentStep}
          totalSteps={totalSteps}
          phaseIndex={phaseIndex}
        />
      )}
      <main
        className="mx-auto w-full flex-1"
        style={{ maxWidth: 520, padding: "8px 20px 24px" }}
      >
        {children}
      </main>
      <footer
        className="intake-safe-bottom py-6 text-center"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 13,
          color: "#AEB5BF",
        }}
      >
        Questions? Text or call{" "}
        <a
          href="tel:8663444955"
          style={{ color: "#AEB5BF", textDecoration: "underline" }}
        >
          (866) 344-4955
        </a>
      </footer>
    </div>
  );
};

export default AppShell;
