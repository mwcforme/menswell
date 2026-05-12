import { useState } from "react";
import { Clock, Check } from "lucide-react";

interface V2StepDurationProps {
  initialValue?: string;
  onNext: (duration: string) => void;
}

const font = "'Montserrat', sans-serif";
const headingFont = "'Bebas Neue', sans-serif";

const durations = [
  { value: "<6mo", label: "Less than 6 months" },
  { value: "6-12mo", label: "6–12 months" },
  { value: "1-2yr", label: "1–2 years" },
  { value: "2+yr", label: "More than 2 years" },
];

const V2StepDuration = ({ initialValue, onNext }: V2StepDurationProps) => {
  const [selected, setSelected] = useState(initialValue || "");

  const handleSelect = (value: string) => {
    setSelected(value);
    setTimeout(() => onNext(value), 300);
  };

  return (
    <div className="flex flex-col items-center px-5 pt-6 md:pt-10" data-spec-id="step3-screen">
      <div
        className="w-full max-w-[480px] p-6 md:p-8"
        style={{ backgroundColor: "#FFFFFF", borderRadius: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}
      >
        <h1
          className="mb-2 text-center uppercase"
          style={{ fontFamily: headingFont, fontSize: "clamp(24px, 5.5vw, 36px)", color: "#0B1029", letterSpacing: "0.05em", lineHeight: 1.1 }}
        >
          How Long Has This Been Going On?
        </h1>
        <p className="mb-6 text-center" style={{ fontFamily: font, fontWeight: 400, fontSize: 14, color: "#6B7280" }}>
          This helps us prepare for your visit.
        </p>

        <div className="space-y-3" data-spec-id="step3-cards">
          {durations.map((d) => {
            const isSelected = selected === d.value;
            return (
              <button
                key={d.value}
                type="button"
                onClick={() => handleSelect(d.value)}
                className="flex w-full items-center gap-4 px-5 transition-all"
                style={{
                  minHeight: 56,
                  fontFamily: font, fontWeight: isSelected ? 700 : 600, fontSize: 15,
                  color: "#0B1029",
                  backgroundColor: isSelected ? "rgba(232,103,10,0.06)" : "#FFFFFF",
                  border: isSelected ? "2px solid #E8670A" : "2px solid #D1CCC5",
                  borderRadius: 12,
                  cursor: "pointer",
                  boxShadow: isSelected ? "0 0 0 3px rgba(232,103,10,0.1)" : "0 1px 3px rgba(0,0,0,0.06)",
                }}
                onMouseEnter={(e) => { if (!isSelected) { e.currentTarget.style.borderColor = "rgba(232,103,10,0.4)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)"; } }}
                onMouseLeave={(e) => { if (!isSelected) { e.currentTarget.style.borderColor = "#D1CCC5"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)"; } }}
                aria-label={d.label}
              >
                <Clock className="h-4 w-4 shrink-0" style={{ color: "#E8670A" }} />
                <span className="flex-1 text-left">{d.label}</span>
                {isSelected && <Check className="h-[18px] w-[18px] shrink-0" style={{ color: "#E8670A" }} />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default V2StepDuration;
