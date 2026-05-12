import { useState } from "react";
import {
  Check,
  Sparkles,
  Smile,
  Meh,
  Frown,
  AlertCircle,
  HeartHandshake,
  ThumbsUp,
  CircleDot,
  ThumbsDown,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import SurveyCard from "./SurveyCard";

export type RatingValue = "excellent" | "good" | "average" | "poor" | "very-poor";

export type RatingScale = "experience" | "staff";

interface ScaleOption {
  value: RatingValue;
  label: string;
  icon: LucideIcon;
}

const SCALES: Record<RatingScale, ScaleOption[]> = {
  // Q1 — overall experience (star/feel scale)
  experience: [
    { value: "excellent", label: "Excellent", icon: Sparkles },
    { value: "good", label: "Good", icon: Smile },
    { value: "average", label: "Okay", icon: Meh },
    { value: "poor", label: "Disappointing", icon: Frown },
    { value: "very-poor", label: "Bad", icon: AlertCircle },
  ],
  // Q2 — staff interaction (relational scale, distinct words)
  staff: [
    { value: "excellent", label: "Genuinely Cared", icon: HeartHandshake },
    { value: "good", label: "Friendly & Helpful", icon: ThumbsUp },
    { value: "average", label: "Just Did The Job", icon: CircleDot },
    { value: "poor", label: "Felt Rushed", icon: ThumbsDown },
    { value: "very-poor", label: "Unprofessional", icon: XCircle },
  ],
};

const font = "'Montserrat', sans-serif";

interface SurveyRatingStepProps {
  title: string;
  subtitle?: string;
  greeting?: string;
  scale?: RatingScale;
  initialValue?: RatingValue | "";
  onSelect: (value: RatingValue) => void;
}

const SurveyRatingStep = ({
  title,
  subtitle,
  greeting,
  scale = "experience",
  initialValue = "",
  onSelect,
}: SurveyRatingStepProps) => {
  const [selected, setSelected] = useState<RatingValue | "">(initialValue);
  const options = SCALES[scale];

  const handleSelect = (value: RatingValue) => {
    setSelected(value);
    setTimeout(() => onSelect(value), 300);
  };

  return (
    <SurveyCard title={title} subtitle={subtitle} greeting={greeting}>
      <div role="radiogroup" aria-label={title} className="space-y-3">
        {options.map((opt) => {
          const isSelected = selected === opt.value;
          const Icon = opt.icon;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => handleSelect(opt.value)}
              className="flex w-full items-center gap-4 px-5 transition-all"
              style={{
                minHeight: 56,
                fontFamily: font,
                fontWeight: isSelected ? 700 : 600,
                fontSize: 15,
                color: "#0B1029",
                backgroundColor: isSelected ? "rgba(232,103,10,0.06)" : "#FFFFFF",
                border: isSelected ? "2px solid #E8670A" : "2px solid #D1CCC5",
                borderRadius: 12,
                cursor: "pointer",
                boxShadow: isSelected
                  ? "0 0 0 3px rgba(232,103,10,0.1)"
                  : "0 1px 3px rgba(0,0,0,0.06)",
                transform: isSelected ? "translateY(-1px)" : "translateY(0)",
                touchAction: "manipulation",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = "rgba(232,103,10,0.4)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = "#D1CCC5";
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
              aria-label={opt.label}
            >
              <Icon
                className="h-5 w-5 shrink-0 transition-transform"
                style={{
                  color: "#E8670A",
                  transform: isSelected ? "scale(1.1)" : "scale(1)",
                }}
              />
              <span className="flex-1 text-left">{opt.label}</span>
              {isSelected && (
                <Check className="h-[18px] w-[18px] shrink-0" style={{ color: "#E8670A" }} />
              )}
            </button>
          );
        })}
      </div>
    </SurveyCard>
  );
};

export default SurveyRatingStep;
