import { useState } from "react";
import { ShieldCheck } from "lucide-react";

interface RecaptchaPlaceholderProps {
  checked: boolean;
  onChange: (next: boolean) => void;
}

/**
 * Visual-only reCAPTCHA mockup. Mimics the v2 "I'm not a robot" widget so the
 * intake screen reads as production-grade, but the click is a simple toggle.
 */
const RecaptchaPlaceholder = ({ checked, onChange }: RecaptchaPlaceholderProps) => {
  const [verifying, setVerifying] = useState(false);

  const handleClick = () => {
    if (checked || verifying) return;
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      onChange(true);
    }, 700);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 16px",
        background: "#F9F9F9",
        border: "1px solid #D3D3D3",
        borderRadius: 8,
        fontFamily: "'Roboto', 'Montserrat', sans-serif",
      }}
    >
      <button
        type="button"
        onClick={handleClick}
        aria-checked={checked}
        role="checkbox"
        style={{
          width: 28,
          height: 28,
          background: "#FFFFFF",
          border: "2px solid #C1C1C1",
          borderRadius: 3,
          cursor: checked ? "default" : "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "0 0 auto",
        }}
      >
        {verifying && (
          <span
            aria-hidden
            style={{
              width: 16,
              height: 16,
              border: "2px solid #4285F4",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "intake-spin 0.8s linear infinite",
            }}
          />
        )}
        {checked && !verifying && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34A853" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </button>
      <span
        style={{
          fontSize: 14,
          color: "#000000",
          flex: 1,
        }}
      >
        I'm not a robot
      </span>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <ShieldCheck size={28} color="#4285F4" strokeWidth={1.5} />
        <span style={{ fontSize: 9, color: "#555", letterSpacing: "0.04em" }}>reCAPTCHA</span>
        <span style={{ fontSize: 8, color: "#9AA0A6" }}>Privacy · Terms</span>
      </div>
      <style>{`@keyframes intake-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default RecaptchaPlaceholder;
