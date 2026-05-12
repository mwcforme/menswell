import { useState } from "react";
import { MapPin, Check } from "lucide-react";
import SurveyCard from "./SurveyCard";
import { LocationSlug, LOCATION_LABELS } from "@/data/reviewUrls";

const font = "'Montserrat', sans-serif";

interface SurveyLocationStepProps {
  initialValue?: LocationSlug | "";
  onSelect: (loc: LocationSlug) => void;
}

const slugs: LocationSlug[] = ["virginia-beach", "newport-news", "richmond"];

const SurveyLocationStep = ({ initialValue = "", onSelect }: SurveyLocationStepProps) => {
  const [selected, setSelected] = useState<LocationSlug | "">(initialValue);

  const handleSelect = (slug: LocationSlug) => {
    setSelected(slug);
    setTimeout(() => onSelect(slug), 300);
  };

  return (
    <SurveyCard
      title="Which Center Did You Visit?"
      subtitle="Pick the location of your most recent visit."
    >
      <div role="radiogroup" aria-label="Location" className="space-y-3">
        {slugs.map((slug) => {
          const isSelected = selected === slug;
          return (
            <button
              key={slug}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => handleSelect(slug)}
              className="flex w-full items-center gap-4 px-5 transition-all"
              style={{
                minHeight: 64,
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
            >
              <MapPin className="h-5 w-5 shrink-0" style={{ color: "#E8670A" }} />
              <span className="flex-1 text-left">{LOCATION_LABELS[slug]}</span>
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

export default SurveyLocationStep;
