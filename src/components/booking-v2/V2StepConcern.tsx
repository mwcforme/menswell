import { useState } from "react";
import { Activity, Heart, Scale, MoreHorizontal, Check } from "lucide-react";

interface V2StepConcernProps {
  initialValue?: string;
  onNext: (concern: string) => void;
}

const font = "'Montserrat', sans-serif";
const headingFont = "'Bebas Neue', sans-serif";

const concerns = [
  { value: "trt", label: "Testosterone Replacement Therapy", icon: Activity },
  { value: "ed", label: "Erectile Dysfunction", icon: Heart },
  { value: "weight-loss", label: "Weight Loss", icon: Scale },
  { value: "other", label: "Other", icon: MoreHorizontal },
];

const V2StepConcern = ({ initialValue, onNext }: V2StepConcernProps) => {
  const [selected, setSelected] = useState(initialValue || "");

  const handleSelect = (value: string) => {
    setSelected(value);
    setTimeout(() => onNext(value), 300);
  };

  return (
    <div className="flex flex-col items-center px-5 pt-6 md:pt-10" data-spec-id="step2-screen">
      <div
        className="w-full max-w-[480px] p-6 md:p-8"
        style={{ backgroundColor: "#FFFFFF", borderRadius: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}
      >
        <h1
          data-spec-id="step2-heading"
          className="mb-2 text-center uppercase"
          style={{ fontFamily: headingFont, fontSize: "clamp(24px, 5.5vw, 36px)", color: "#0B1029", letterSpacing: "0.05em", lineHeight: 1.1 }}
        >
          Which Service?
        </h1>
        <p className="mb-6 text-center" style={{ fontFamily: font, fontWeight: 400, fontSize: 14, color: "#6B7280" }}>
          Select the service you're interested in.
        </p>

        <div className="space-y-3" data-spec-id="step2-cards">
          {concerns.map((c) => {
            const isSelected = selected === c.value;
            const Icon = c.icon;
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => handleSelect(c.value)}
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
                aria-label={c.label}
              >
                <Icon className="h-5 w-5 shrink-0" style={{ color: "#E8670A" }} />
                <span className="flex-1 text-left">{c.label}</span>
                {isSelected && <Check className="h-[18px] w-[18px] shrink-0" style={{ color: "#E8670A" }} />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default V2StepConcern;
