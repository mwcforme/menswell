import { useState } from "react";
import SurveyCard from "./SurveyCard";
import { formatPhone } from "@/intake/components/fields/PhoneField";

const font = "'Montserrat', sans-serif";

type Mode = "email" | "phone";

interface SurveyIdentityStepProps {
  ctaLabel: string;
  onSubmit: (id: { mode: Mode; value: string }) => void;
}

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const isValidPhone = (v: string) => v.replace(/\D/g, "").length === 10;

const SurveyIdentityStep = ({ ctaLabel, onSubmit }: SurveyIdentityStepProps) => {
  const [mode, setMode] = useState<Mode>("email");
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  const valid = mode === "email" ? isValidEmail(value) : isValidPhone(value);
  const showErr = touched && value.length > 0 && !valid;

  const handleChange = (raw: string) => {
    if (mode === "phone") setValue(formatPhone(raw));
    else setValue(raw);
  };

  const handleSwitch = (m: Mode) => {
    if (m !== mode) {
      setMode(m);
      setValue("");
      setTouched(false);
    }
  };

  const handleSubmit = () => {
    setTouched(true);
    if (!valid) return;
    onSubmit({ mode, value: value.trim() });
  };

  const toggle = (m: Mode, label: string) => {
    const active = mode === m;
    return (
      <button
        type="button"
        onClick={() => handleSwitch(m)}
        className="flex-1 transition-all"
        style={{
          height: 44,
          borderRadius: 10,
          fontFamily: font,
          fontWeight: 600,
          fontSize: 13,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: active ? "#FFFFFF" : "#6B7280",
          backgroundColor: active ? "#0B1029" : "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        {label}
      </button>
    );
  };

  return (
    <SurveyCard
      title="One Last Thing"
      subtitle="So we can match this feedback to your visit."
    >
      <div
        className="mb-4 flex gap-1 p-1"
        style={{ backgroundColor: "#F5F3F0", borderRadius: 12 }}
      >
        {toggle("email", "Email")}
        {toggle("phone", "Phone")}
      </div>

      <input
        type={mode === "email" ? "email" : "tel"}
        inputMode={mode === "email" ? "email" : "tel"}
        autoComplete={mode === "email" ? "email" : "tel"}
        placeholder={mode === "email" ? "you@example.com" : "(555) 555-1234"}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={() => setTouched(true)}
        className="w-full"
        style={{
          height: 56,
          borderRadius: 10,
          padding: "0 16px",
          fontFamily: font,
          fontSize: 16,
          fontWeight: 500,
          color: "#0B1029",
          backgroundColor: "#F5F3F0",
          border: showErr ? "1.5px solid #DC2626" : "1.5px solid #D1CCC5",
          outline: "none",
        }}
      />
      {showErr && (
        <p
          className="mt-2"
          style={{ fontFamily: font, fontSize: 13, color: "#DC2626" }}
        >
          {mode === "email" ? "Enter a valid email address." : "Enter a 10-digit phone number."}
        </p>
      )}

      <button
        type="button"
        disabled={!valid}
        onClick={handleSubmit}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 transition-all"
        style={{
          height: 56,
          borderRadius: 9999,
          fontFamily: font,
          fontWeight: 700,
          fontSize: 15,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#FFFFFF",
          backgroundColor: "#E8670A",
          border: "none",
          cursor: valid ? "pointer" : "not-allowed",
          opacity: valid ? 1 : 0.4,
        }}
      >
        {ctaLabel}
      </button>

      <p
        className="mt-4 text-center"
        style={{ fontFamily: font, fontSize: 12, color: "#9CA3AF" }}
      >
        We'll only use this to verify your visit. No marketing spam.
      </p>
    </SurveyCard>
  );
};

export default SurveyIdentityStep;
