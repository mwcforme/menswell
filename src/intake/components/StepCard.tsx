import { ReactNode } from "react";

interface StepCardProps {
  h1?: string;
  subtitle?: string;
  children: ReactNode;
}

const StepCard = ({ h1, subtitle, children }: StepCardProps) => (
  <div className="mx-auto w-full" style={{ maxWidth: 520 }}>
    {h1 && (
      <h1 className="intake-h1 mb-2 mt-2 text-center sm:text-left">{h1}</h1>
    )}
    {subtitle && (
      <p className="intake-body-dark mb-4 text-center sm:text-left">{subtitle}</p>
    )}
    <div
      className="relative"
      style={{
        marginTop: 16,
        background: "var(--card-white)",
        borderRadius: 16,
        padding: 24,
        boxShadow: "var(--card-shadow)",
      }}
    >
      {children}
    </div>
  </div>
);

export default StepCard;
