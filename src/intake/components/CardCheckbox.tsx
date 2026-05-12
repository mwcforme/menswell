import { KeyboardEvent } from "react";
import { Check, LucideIcon } from "lucide-react";

interface CardCheckboxProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
  icon?: LucideIcon;
}

const CardCheckbox = ({ label, checked, onToggle, icon: Icon }: CardCheckboxProps) => {
  const handleKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onToggle}
      onKeyDown={handleKey}
      className="intake-select-card"
    >
      {Icon && <Icon size={20} color="var(--accent-orange)" strokeWidth={2} />}
      <span className="flex-1">{label}</span>
      {checked && <Check size={20} color="var(--accent-orange)" strokeWidth={2.5} />}
    </button>
  );
};

export default CardCheckbox;
