import { ButtonHTMLAttributes, ReactNode } from "react";
import { ChevronRight } from "lucide-react";

interface PrimaryCTAProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  sticky?: boolean;
  showArrow?: boolean;
}

const PrimaryCTA = ({
  children,
  sticky = false,
  showArrow = true,
  className,
  style,
  ...rest
}: PrimaryCTAProps) => {
  const stickyStyle: React.CSSProperties = sticky
    ? {
        position: "sticky",
        // Lift above iOS soft keyboard via the --intake-kb-offset var set by IntakeFlow
        bottom: "calc(16px + var(--intake-kb-offset, 0px))",
        zIndex: 5,
      }
    : {};

  return (
    <button
      type="button"
      className={`intake-cta ${className ?? ""}`}
      style={{ ...stickyStyle, ...style }}
      {...rest}
    >
      <span>{children}</span>
      {showArrow && <ChevronRight size={18} strokeWidth={2.25} />}
    </button>
  );
};

export default PrimaryCTA;
