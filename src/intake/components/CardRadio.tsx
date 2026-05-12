import { KeyboardEvent, ReactNode, useRef } from "react";
import { Check, LucideIcon } from "lucide-react";

interface CardRadioProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
  icon?: LucideIcon;
  children?: ReactNode;
}

const CardRadio = ({ label, selected, onSelect, icon: Icon, children }: CardRadioProps) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      onSelect();
      return;
    }
    // Arrow-key roving within parent radiogroup
    if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "ArrowLeft") {
      const group = btnRef.current?.closest('[role="radiogroup"]');
      if (!group) return;
      const radios = Array.from(
        group.querySelectorAll<HTMLButtonElement>('[role="radio"]')
      );
      const idx = radios.indexOf(btnRef.current!);
      if (idx === -1) return;
      e.preventDefault();
      const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
      const next = radios[(idx + dir + radios.length) % radios.length];
      next?.focus();
      next?.click();
    }
  };

  return (
    <button
      ref={btnRef}
      type="button"
      role="radio"
      aria-checked={selected}
      tabIndex={selected ? 0 : -1}
      onClick={onSelect}
      onKeyDown={handleKey}
      className="intake-select-card"
    >
      {Icon && <Icon size={20} color="var(--accent-orange)" strokeWidth={2} />}
      <span className="flex-1">{label}</span>
      {children}
      {selected && <Check size={20} color="var(--accent-orange)" strokeWidth={2.5} />}
    </button>
  );
};

export default CardRadio;
