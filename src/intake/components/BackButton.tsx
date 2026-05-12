import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  onClick: () => void;
}

const BackButton = ({ onClick }: BackButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex items-center gap-1"
    style={{
      background: "none",
      border: "none",
      padding: "8px 4px",
      color: "var(--text-on-dark)",
      fontFamily: "'Montserrat', sans-serif",
      fontSize: 14,
      fontWeight: 500,
      cursor: "pointer",
    }}
  >
    <ArrowLeft size={16} strokeWidth={2} />
    Back
  </button>
);

export default BackButton;
