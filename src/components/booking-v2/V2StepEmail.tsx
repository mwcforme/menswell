import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface V2StepEmailProps {
  initialValue?: string;
  onNext: (email: string) => void;
}

const font = "'Montserrat', sans-serif";
const headingFont = "'Bebas Neue', sans-serif";

const inputStyle: React.CSSProperties = {
  height: 56,
  borderRadius: 10,
  backgroundColor: "#F5F3F0",
  border: "1px solid #D1CCC5",
  color: "#0B1029",
  padding: "14px 16px",
  fontSize: 16,
  width: "100%",
  outline: "none",
  fontFamily: font,
  fontWeight: 400,
  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.06)",
};

const V2StepEmail = ({ initialValue, onNext }: V2StepEmailProps) => {
  const [email, setEmail] = useState(initialValue || "");

  const isValid = email.trim().length > 0 && email.includes("@") && email.includes(".");

  return (
    <div className="flex flex-col items-center px-5 pt-6 md:pt-10" data-spec-id="step5-screen">
      <div
        className="w-full max-w-[480px] p-6 md:p-8"
        style={{ backgroundColor: "#FFFFFF", borderRadius: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}
      >
        <h1
          className="mb-2 text-center uppercase"
          style={{ fontFamily: headingFont, fontSize: "clamp(22px, 5vw, 34px)", color: "#0B1029", letterSpacing: "0.05em", lineHeight: 1.1 }}
        >
          Where Should We Email Your Consultation Details?
        </h1>
        <p className="mb-6 text-center" style={{ fontFamily: font, fontWeight: 400, fontSize: 15, color: "#6B7280" }}>
          We'll send a confirmation and appointment details.
        </p>

        <label className="mb-2 block uppercase" style={{ fontFamily: font, fontWeight: 600, fontSize: 13, color: "#9CA3AF", letterSpacing: "0.08em" }}>
          Email Address
        </label>
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          data-spec-id="step5-email"
          style={inputStyle}
          onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(232,103,10,0.5)"; e.currentTarget.style.boxShadow = "inset 0 1px 2px rgba(0,0,0,0.06), 0 0 0 3px rgba(232,103,10,0.1)"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "#D1CCC5"; e.currentTarget.style.boxShadow = "inset 0 1px 2px rgba(0,0,0,0.06)"; }}
          aria-label="Email address"
        />

        <button
          onClick={() => isValid && onNext(email.trim())}
          disabled={!isValid}
          data-spec-id="step5-cta"
          className="mt-6 flex w-full items-center justify-center gap-2 uppercase transition-all"
          style={{
            height: 56, borderRadius: 12, backgroundColor: "#E8670A", color: "#fff",
            fontFamily: font, fontWeight: 700, fontSize: 15, letterSpacing: "0.1em",
            cursor: isValid ? "pointer" : "default", opacity: isValid ? 1 : 0.4, border: "none", padding: "16px 24px",
          }}
          onMouseEnter={(e) => { if (isValid) e.currentTarget.style.boxShadow = "0 4px 20px rgba(232,103,10,0.3)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
          aria-label="Pick my time"
        >
          Pick My Time <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default V2StepEmail;
