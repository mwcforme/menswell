import { useState } from "react";
import { Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface WLLeadFormProps {
  heading?: string;
  formId?: string;
}

export const WLLeadForm = ({
  heading = "Start Losing Weight Today",
  formId = "hero",
}: WLLeadFormProps) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validatePhone = (v: string) => v.replace(/\D/g, "").length >= 10;

  const formatPhone = (v: string) => {
    const x = v.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    if (!x) return v;
    return !x[2] ? x[1] : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
  };

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

    window.dispatchEvent(
      new CustomEvent("lp_weightloss_form_submit", {
        detail: { name, phone, location, source: "lp-weightloss-v2", service: "weight-loss", form_location: formId },
      })
    );

    // Optional analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'generate_lead', {
        event_category: 'Weight Loss',
        event_label: 'Form Submit',
        value: 1
      });
    }
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', { content_category: 'Weight Loss' });
    }

    const params = new URLSearchParams({
      name,
      phone,
      location,
      source: "lp-weightloss-v2",
      service: "weight-loss",
    });
    navigate(`/lp/weight-loss-v2/thank-you?${params.toString()}`);
  };

  return (
    <div
      id={formId === "bottom" ? "lead-form-bottom" : "lead-form"}
      style={{
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(20px)",
        borderRadius: 16,
        padding: 32,
        boxShadow: "0 12px 32px rgba(0,0,0,0.12), 0 0 40px rgba(0,0,0,0.1)",
        border: "1px solid rgba(255,255,255,0.3)",
        color: "#212529",
        maxWidth: formId === "bottom" ? 480 : undefined,
        margin: formId === "bottom" ? "32px auto 0" : undefined,
      }}
    >
      <h3
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 22,
          fontWeight: 700,
          marginBottom: 20,
          color: "#000033",
          textAlign: "center",
        }}
      >
        {heading}
      </h3>

      <form onSubmit={handleSubmit} noValidate>
        {/* Full Name */}
        <div style={{ marginBottom: 14 }}>
          <label
            style={{
              display: "block",
              fontSize: 13,
              fontWeight: 600,
              color: "#343a40",
              marginBottom: 4,
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Full Name
          </label>
          <input
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            style={{
              width: "100%",
              padding: "12px 16px",
              border: "1.5px solid #dee2e6",
              borderRadius: 8,
              fontSize: 15,
              background: "#ffffff",
              minHeight: 48,
              outline: "none",
              fontFamily: "'Open Sans', sans-serif",
              color: "#212529",
              transition: "border-color 180ms ease, box-shadow 180ms ease",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#004883";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,72,131,0.1)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#dee2e6";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          {errors.name && (
            <p style={{ color: "#dc3545", fontSize: 12, marginTop: 4 }}>{errors.name}</p>
          )}
        </div>

        {/* Phone */}
        <div style={{ marginBottom: 14 }}>
          <label
            style={{
              display: "block",
              fontSize: 13,
              fontWeight: 600,
              color: "#343a40",
              marginBottom: 4,
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="(555) 123-4567"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            autoComplete="tel"
            style={{
              width: "100%",
              padding: "12px 16px",
              border: "1.5px solid #dee2e6",
              borderRadius: 8,
              fontSize: 15,
              background: "#ffffff",
              minHeight: 48,
              outline: "none",
              fontFamily: "'Open Sans', sans-serif",
              color: "#212529",
              transition: "border-color 180ms ease, box-shadow 180ms ease",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#004883";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,72,131,0.1)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#dee2e6";
              e.currentTarget.style.boxShadow = "none";
              if (phone && !validatePhone(phone))
                setErrors((p) => ({ ...p, phone: "Please enter a valid 10-digit phone number" }));
              else setErrors((p) => { const { phone: _, ...rest } = p; return rest; });
            }}
          />
          {errors.phone && (
            <p style={{ color: "#dc3545", fontSize: 12, marginTop: 4 }}>{errors.phone}</p>
          )}
        </div>

        {/* Location */}
        <div style={{ marginBottom: 14 }}>
          <label
            style={{
              display: "block",
              fontSize: 13,
              fontWeight: 600,
              color: "#343a40",
              marginBottom: 4,
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Preferred Location
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              border: "1.5px solid #dee2e6",
              borderRadius: 8,
              fontSize: 15,
              background: "#ffffff",
              minHeight: 48,
              outline: "none",
              fontFamily: "'Open Sans', sans-serif",
              color: location ? "#212529" : "#adb5bd",
              appearance: "none" as const,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%236c757d' viewBox='0 0 16 16'%3E%3Cpath d='M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 14px center",
              paddingRight: 40,
              transition: "border-color 180ms ease, box-shadow 180ms ease",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#004883";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,72,131,0.1)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#dee2e6";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <option value="" disabled>
              Select a center
            </option>
            <option value="richmond">Richmond, Glen Allen, VA</option>
            <option value="newport_news">Newport News, VA</option>
            <option value="virginia_beach">Virginia Beach, VA</option>
          </select>
          {errors.location && (
            <p style={{ color: "#dc3545", fontSize: 12, marginTop: 4 }}>{errors.location}</p>
          )}
        </div>

        {/* Consent */}
        <label
          style={{
            display: "flex",
            gap: 8,
            alignItems: "flex-start",
            margin: "14px 0",
            fontSize: 11,
            color: "#6c757d",
            lineHeight: 1.5,
            cursor: "pointer",
            fontFamily: "'Open Sans', sans-serif",
          }}
        >
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            style={{ marginTop: 2, flexShrink: 0, width: 16, height: 16, accentColor: "#004883" }}
          />
          <span>
            By checking this box, you agree to receive text messages from Men's Wellness Centers. Message & data rates
            may apply. Reply STOP to opt out.
          </span>
        </label>
        {errors.consent && (
          <p style={{ color: "#dc3545", fontSize: 12, marginBottom: 8 }}>{errors.consent}</p>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "14px 32px",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 15,
            fontWeight: 700,
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            letterSpacing: "0.3px",
            minHeight: 48,
            background: "#E8670A",
            color: "#ffffff",
            boxShadow: "0 4px 14px rgba(232,103,10,0.3)",
            transition: "all 180ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#d35a00";
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(232,103,10,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#E8670A";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 14px rgba(232,103,10,0.3)";
          }}
        >
          Claim My Consultation
        </button>

        {/* Microcopy */}
        <div
          style={{
            textAlign: "center",
            marginTop: 10,
            fontSize: 12,
            color: "#6c757d",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            alignItems: "center",
            fontFamily: "'Open Sans', sans-serif",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <Lock size={14} />
            Your information is 100% secure & HIPAA compliant
          </span>
        </div>

        {/* Links */}
        <div
          style={{
            textAlign: "center",
            marginTop: 8,
            fontSize: 11,
            fontFamily: "'Open Sans', sans-serif",
          }}
        >
          <Link to="/privacy-policy" style={{ color: "#004883", textDecoration: "underline" }}>
            Privacy Policy
          </Link>
          {" · "}
          <Link to="/terms-of-service" style={{ color: "#004883", textDecoration: "underline" }}>
            Terms of Service
          </Link>
        </div>
      </form>
    </div>
  );
};