import { ButtonHTMLAttributes, ReactNode } from "react";

interface SecondaryLinkProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const SecondaryLink = ({ children, className, ...rest }: SecondaryLinkProps) => (
  <div className="mt-3 text-center">
    <button
      type="button"
      className={`intake-secondary-link ${className ?? ""}`}
      {...rest}
    >
      {children}
    </button>
  </div>
);

export default SecondaryLink;
