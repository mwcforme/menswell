import { ReactNode } from "react";
import { LPHeader } from "./LPHeader";
import { LPFooter } from "./LPFooter";

interface LPLayoutProps {
  children: ReactNode;
  ctaTarget?: string;
}

export const LPLayout = ({ children, ctaTarget = "#book" }: LPLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "Inter, system-ui, sans-serif", background: "#EBEAE8" }}>
      <LPHeader ctaTarget={ctaTarget} />
      <main className="flex-1 pt-[88px]">
        {children}
      </main>
      <LPFooter />
    </div>
  );
};
