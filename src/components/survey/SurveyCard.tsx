import { ReactNode } from "react";

interface SurveyCardProps {
  title: string;
  subtitle?: string;
  greeting?: string;
  children: ReactNode;
}

const headingFont = "'Bebas Neue', sans-serif";
const font = "'Montserrat', sans-serif";

const SurveyCard = ({ title, subtitle, greeting, children }: SurveyCardProps) => (
  <div className="flex flex-col items-center px-5 pt-6 md:pt-10">
    <div
      className="w-full max-w-[520px] p-6 md:p-8"
      style={{ backgroundColor: "#FFFFFF", borderRadius: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}
    >
      {greeting && (
        <p
          className="mb-3 text-center uppercase"
          style={{
            fontFamily: font,
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: "0.12em",
            color: "#E8670A",
          }}
        >
          {greeting}
        </p>
      )}
      <h1
        className="mb-2 text-center uppercase"
        style={{
          fontFamily: headingFont,
          fontSize: "clamp(24px, 5.5vw, 34px)",
          color: "#0B1029",
          letterSpacing: "0.05em",
          lineHeight: 1.1,
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          className="mb-6 text-center"
          style={{ fontFamily: font, fontWeight: 400, fontSize: 14, color: "#6B7280" }}
        >
          {subtitle}
        </p>
      )}
      {!subtitle && <div className="mb-4" />}
      {children}
    </div>
  </div>
);

export default SurveyCard;
