import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface UnifiedLeadFormProps {
  heading?: string;
  formId?: string;
  service?: string;
  source?: string;
  thankYouPath?: string;
  locationHelperText?: string;
}

export const UnifiedLeadForm = ({
  heading = "Claim Your Consultation",
  formId = "unified-lead-form",
  service = "general",
  source = "landing-page",
  thankYouPath = "/lp/trt-v2/thank-you",
  locationHelperText,
}: UnifiedLeadFormProps) => {
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
    if (!name.trim()) errs.name = "Full name is required";
    if (!phone.trim()) errs.phone = "Phone number is required";
    else if (!validatePhone(phone)) errs.phone = "Please enter a valid phone number";
    if (!location) errs.location = "Please select a center";
    if (!consent) errs.consent = "Please agree to receive SMS messages";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Fire analytics events
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("lead_form_submit", {
          detail: { name, phone, location, service, source },
        })
      );
      if ((window as any).gtag) {
        (window as any).gtag("event", "generate_lead", {
          event_category: service,
          event_label: source,
        });
      }
      if ((window as any).fbq) {
        (window as any).fbq("track", "Lead", {
          content_category: service,
          value: 1,
          currency: "USD",
        });
      }
    }

    navigate(
      `${thankYouPath}?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&location=${encodeURIComponent(location)}&source=${encodeURIComponent(source)}&service=${encodeURIComponent(service)}`
    );
  };

  const inputClasses =
    "w-full h-[52px] rounded-lg px-4 text-base outline-none transition-all duration-200 border-2 border-[#D4D3D1] bg-white focus:border-[#E8670A] focus:ring-2 focus:ring-[#E8670A]/15";

  return (
    <div
      id={formId}
      className="w-full rounded-2xl p-6 md:p-8"
      style={{
        background: "#FFFFFF",
        maxWidth: 420,
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      }}
    >
      <h3
        className="font-bold text-lg md:text-xl text-center mb-6"
        style={{ color: "#1B2A4A" }}
      >
        {heading}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor={`${formId}-name`} className="sr-only">Full Name</label>
          <input
            id={`${formId}-name`}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClasses}
            style={{ color: "#1B2A4A", fontSize: 16 }}
            required
            autoComplete="name"
          />
          {errors.name && (
            <p className="text-xs mt-1" style={{ color: "#CC4444" }}>{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor={`${formId}-phone`} className="sr-only">Phone Number</label>
          <input
            id={`${formId}-phone`}
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClasses}
            style={{ color: "#1B2A4A", fontSize: 16 }}
            required
            autoComplete="tel"
          />
          {errors.phone && (
            <p className="text-xs mt-1" style={{ color: "#CC4444" }}>{errors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor={`${formId}-location`} className="sr-only">Preferred Location</label>
          <select
            id={`${formId}-location`}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className={inputClasses}
            style={{
              color: location ? "#1B2A4A" : "#999999",
              fontSize: 16,
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23999999' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
              paddingRight: 40,
            }}
          >
            <option value="" disabled>Preferred Location</option>
            <option value="richmond">Richmond VA</option>
            <option value="newport_news">Newport News VA</option>
            <option value="virginia_beach">Virginia Beach VA</option>
          </select>
          {locationHelperText && (
            <p className="text-xs mt-1" style={{ color: "#999999" }}>{locationHelperText}</p>
          )}
          {errors.location && (
            <p className="text-xs mt-1" style={{ color: "#CC4444" }}>{errors.location}</p>
          )}
        </div>

        <div className="flex items-start gap-3">
          <input
            id={`${formId}-consent`}
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 w-4 h-4 rounded cursor-pointer flex-shrink-0"
            style={{ accentColor: "#E8670A" }}
          />
          <label
            htmlFor={`${formId}-consent`}
            className="text-[11px] leading-relaxed cursor-pointer"
            style={{ color: "#777777" }}
          >
            I agree to receive SMS messages from Men's Wellness Centers. Message &amp; data rates may apply. Reply STOP to cancel.
          </label>
        </div>
        {errors.consent && (
          <p className="text-xs" style={{ color: "#CC4444" }}>{errors.consent}</p>
        )}

        <button
          type="submit"
          className="w-full h-[52px] rounded-full font-bold tracking-wide cursor-pointer transition-colors duration-200 text-sm uppercase"
          style={{
            background: "#1B2A4A",
            color: "#FFFFFF",
            border: "none",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#0F1D35"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#1B2A4A"; }}
        >
          Claim My Consultation
        </button>
      </form>

      <p className="text-center text-xs mt-4" style={{ color: "#999999" }}>
        We'll text you to confirm within 1 hour.
      </p>
      <p className="text-center text-xs mt-1" style={{ color: "#AAAAAA" }}>
        Your info is private &amp; HIPAA-secure
      </p>
      <p className="text-center text-xs mt-2" style={{ color: "#BBBBBB" }}>
        <Link to="/privacy-policy" className="underline underline-offset-2 hover:opacity-80">
          Privacy Policy
        </Link>
        {" · "}
        <Link to="/terms-of-service" className="underline underline-offset-2 hover:opacity-80">
          Terms of Service
        </Link>
      </p>
    </div>
  );
};
