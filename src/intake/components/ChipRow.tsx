interface ChipRowProps {
  value: "yes" | "no" | null;
  onChange: (v: "yes" | "no") => void;
  yesLabel?: string;
  noLabel?: string;
}

const ChipRow = ({ value, onChange, yesLabel = "Yes", noLabel = "No" }: ChipRowProps) => (
  <div className="flex w-full" style={{ gap: 12 }}>
    <button
      type="button"
      aria-pressed={value === "yes"}
      onClick={() => onChange("yes")}
      className="intake-chip"
    >
      {yesLabel}
    </button>
    <button
      type="button"
      aria-pressed={value === "no"}
      onClick={() => onChange("no")}
      className="intake-chip"
    >
      {noLabel}
    </button>
  </div>
);

export default ChipRow;
