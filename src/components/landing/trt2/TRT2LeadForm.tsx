import { useState } from "react";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TRT2LeadFormProps {
  heading?: string;
}

export const TRT2LeadForm = ({ heading = "Get Started, At No Cost" }: TRT2LeadFormProps) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validatePhone = (v: string) => v.replace(/\D/g, "").length >= 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!phone.trim()) errs.phone = "Phone is required";
    else if (!validatePhone(phone)) errs.phone = "Please enter a valid 10-digit phone number";
    if (!location) errs.location = "Please select a location";
    if (!consent) errs.consent = "Please agree to receive communications";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    window.dispatchEvent(new CustomEvent("lp_trt2_form_submit", {
      detail: { name, phone, location, source: "lp-trt2", service: "trt" },
    }));

    const params = new URLSearchParams({ name, phone, location, source: "lp-trt2", service: "trt" });
    navigate(`/lp/trt2/thank-you?${params.toString()}`);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: 52,
    background: "#F5F0EB",
    border: "2px solid #C8C6C1",
    borderRadius: 8,
    padding: "0 16px",
    fontSize: 16,
    color: "#000033",
    outline: "none",
    fontFamily: "Inter, sans-serif",
    transition: "border-color 200ms ease, box-shadow 200ms ease",
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "#E8670A";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,103,10,0.15)";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "#C8C6C1";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div
      className="rounded-2xl p-8"
      style={{
        background: "#FFFFFF",
        boxShadow: "0 8px 40px rgba(0,0,0,0.30)",
      }}
    >
      <h3
        className="font-bold uppercase text-center mb-6"
        style={{
          fontFamily: "Oswald, sans-serif",
          fontSize: "clamp(20px, 3vw, 24px)",
          color: "#000033",
          fontWeight: 700,
        }}
      >
        {heading}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={inputStyle}
            className="placeholder:text-[#999999]"
            autoComplete="name"
          />
          {errors.name && <p className="text-xs mt-1 text-left" style={{ color: "#CC4444" }}>{errors.name}</p>}
        </div>

        <div>
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onFocus={handleFocus}
            onBlur={(e) => {
              handleBlur(e);
              if (phone && !validatePhone(phone)) setErrors((p) => ({ ...p, phone: "Please enter a valid 10-digit phone number" }));
              else setErrors((p) => { const { phone: _, ...rest } = p; return rest; });
            }}
            style={inputStyle}
            className="placeholder:text-[#999999]"
            autoComplete="tel"
          />
          {errors.phone && <p className="text-xs mt-1 text-left" style={{ color: "#CC4444" }}>{errors.phone}</p>}
        </div>

        <div>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={handleFocus as any}
            onBlur={handleBlur as any}
            style={{
              ...inputStyle,
              color: location ? "#000033" : "#999999",
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23999999' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
              paddingRight: 40,
            }}
          >
            <option value="" disabled>Preferred Location</option>
            <option value="richmond">Richmond</option>
            <option value="newport-news">Newport News</option>
            <option value="virginia-beach">Virginia Beach</option>
          </select>
          {errors.location && <p className="text-xs mt-1 text-left" style={{ color: "#CC4444" }}>{errors.location}</p>}
        </div>

        {/* TCPA Consent */}
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-4 w-4 accent-[#E8670A]"
          />
          <span className="text-xs leading-relaxed" style={{ color: "#666", fontFamily: "Inter, sans-serif" }}>
            By checking this box, I agree to receive calls and texts from Men's Wellness Centers. Message & data rates may apply. See our{" "}
            <a href="/privacy-policy" className="underline" style={{ color: "#000033" }}>Privacy Policy</a> &{" "}
            <a href="/terms-of-service" className="underline" style={{ color: "#000033" }}>Terms</a>.
          </span>
        </label>
        {errors.consent && <p className="text-xs text-left" style={{ color: "#CC4444" }}>{errors.consent}</p>}

        <button
          type="submit"
          className="w-full rounded-full uppercase font-bold cursor-pointer transition-colors duration-200"
          style={{
            height: 52,
            background: "#E8670A",
            color: "#FFFFFF",
            fontSize: 14,
            border: "none",
            letterSpacing: "0.08em",
            fontFamily: "Inter, sans-serif",
            marginTop: 8,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#CF5B09"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#E8670A"; }}
        >
          Claim My Consultation
        </button>
      </form>

      <p className="text-center text-xs mt-4" style={{ color: "#999999", fontFamily: "Inter, sans-serif" }}>
        We'll text you to confirm within 1 hour. No spam, ever.
      </p>

      <div className="flex items-center justify-center gap-1.5 mt-3">
        <Lock className="h-3.5 w-3.5" style={{ color: "#999999" }} />
        <span className="text-xs" style={{ color: "#999999", fontFamily: "Inter, sans-serif" }}>
          Your info is private & HIPAA-secure
        </span>
      </div>
    </div>
  );
};
