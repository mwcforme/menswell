import { cn } from "@/lib/utils";

const steps = ["You", "Your Visit", "Your Time", "Confirmed"];

interface ProgressBarProps {
  currentStep: number;
  lightMode?: boolean;
}

const ProgressBar = ({ currentStep, lightMode = true }: ProgressBarProps) => {
  const dotColor = (i: number) => {
    if (i + 1 <= currentStep) return "#E8670A";
    return lightMode ? "#C4C0B8" : "rgba(255,255,255,0.25)";
  };

  const lineColor = (i: number) => {
    if (i + 1 < currentStep) return "#E8670A";
    return lightMode ? "#C4C0B8" : "rgba(255,255,255,0.15)";
  };

  const labelColor = (i: number) => {
    if (i + 1 <= currentStep) return lightMode ? "#000033" : "#fff";
    return lightMode ? "#9CA3AF" : "rgba(255,255,255,0.4)";
  };

  return (
    <div className="mx-auto flex w-full max-w-sm items-center justify-between py-6 md:py-8">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center" style={{ flex: i < steps.length - 1 ? 1 : 0 }}>
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={cn(
                "rounded-full transition-all duration-300",
                i + 1 === currentStep && "animate-pulse"
              )}
              style={{
                width: i + 1 === currentStep ? 14 : 10,
                height: i + 1 === currentStep ? 14 : 10,
                backgroundColor: dotColor(i),
                boxShadow: i + 1 === currentStep ? "0 0 0 4px rgba(232,103,10,0.25)" : "none",
              }}
            />
            <span
              className="block text-center uppercase text-[9px] md:text-[10px]"
              style={{ letterSpacing: "0.08em", color: labelColor(i), fontWeight: i + 1 <= currentStep ? 600 : 400 }}
            >
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className="mx-0.5 md:mx-1 h-0.5 flex-1 rounded-full transition-colors duration-300"
              style={{ backgroundColor: lineColor(i) }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
