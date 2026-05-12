import { ButtonHTMLAttributes, ReactNode } from "react";

interface QuickButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const QuickButton = ({ children, className, ...rest }: QuickButtonProps) => (
  <button type="button" className={`intake-quick-btn ${className ?? ""}`} {...rest}>
    {children}
  </button>
);

export default QuickButton;
