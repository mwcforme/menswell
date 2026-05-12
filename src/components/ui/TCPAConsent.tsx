import { Link } from "react-router-dom";

interface Props {
  consent: boolean;
  onChange: (checked: boolean) => void;
  /** "dark" = white text on dark bg, "light" = gray text on light bg */
  variant?: "dark" | "light";
  id?: string;
}

export const TCPAConsent = ({ consent, onChange, variant = "dark", id = "tcpa-consent" }: Props) => {
  const isDark = variant === "dark";
  const textColor = isDark ? "rgba(255,255,255,0.45)" : "#666";
  const linkColor = isDark ? "rgba(255,255,255,0.65)" : "#444";

  return (
    <div className="flex items-start gap-2.5">
      <input
        id={id}
        type="checkbox"
        checked={consent}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 w-4 h-4 flex-shrink-0 cursor-pointer"
        style={{ accentColor: "#E8670A" }}
      />
      <label htmlFor={id} className="text-[11px] leading-relaxed cursor-pointer" style={{ color: textColor }}>
        I consent to receive appointment and marketing texts from Men's Wellness Centers.
        Msg frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out or HELP for help.
        Consent is not required to receive services.{" "}
        <Link to="/privacy-policy" className="underline underline-offset-2" style={{ color: linkColor }}>Privacy Policy</Link>
        {" | "}
        <Link to="/terms-of-service" className="underline underline-offset-2" style={{ color: linkColor }}>Terms</Link>
      </label>
    </div>
  );
};
