import { Checkbox } from "@/components/ui/checkbox";

interface TCPAConsentProps {
  consent: boolean;
  onChange: (v: boolean) => void;
  variant?: "light" | "dark";
  id?: string;
}

export const TCPAConsent = ({ consent, onChange, variant = "light", id = "tcpa-consent" }: TCPAConsentProps) => {
  const isDark = variant === "dark";
  return (
    <label htmlFor={id} className="flex items-start gap-3 cursor-pointer select-none">
      <input
        id={id}
        type="checkbox"
        checked={consent}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 accent-orange-500"
      />
      <span
        className="text-xs leading-relaxed"
        style={{ color: isDark ? "rgba(255,255,255,0.7)" : "#475569" }}
      >
        By checking this box, I consent to receive appointment-related calls, texts, and emails from
        Men's Wellness Centers at the contact information provided. Message and data rates may apply.
        Consent is not a condition of purchase. Reply STOP to opt out.
      </span>
    </label>
  );
};

// Tiny shim so Checkbox import isn't required externally
export default TCPAConsent;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _ = Checkbox;
