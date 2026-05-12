import { useState } from "react";

export const ConsultationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string; location?: string }>({});

  const validatePhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    return digits.length >= 10;
  };

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handlePhoneBlur = () => {
    if (phone && !validatePhone(phone)) {
      setErrors((prev) => ({ ...prev, phone: "Please enter a valid phone number" }));
    } else {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const handleEmailBlur = () => {
    if (email && !validateEmail(email)) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email address" }));
    } else {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(email)) newErrors.email = "Please enter a valid email address";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    else if (!validatePhone(phone)) newErrors.phone = "Please enter a valid phone number";
    if (!location) newErrors.location = "Please select a location";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    // Submit logic here
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: 48,
    background: "#F7F7F5",
    border: "1.5px solid #D1D1CB",
    borderRadius: 8,
    padding: "0 16px",
    fontSize: 15,
    color: "#000033",
    outline: "none",
    transition: "border-color 200ms ease, box-shadow 200ms ease",
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "#E8670A";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,103,10,0.12)";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "#D1D1CB";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div
      id="consultation-form"
      className="w-full rounded-2xl p-8"
      style={{
        background: "#FFFFFF",
        maxWidth: 420,
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      }}
    >
      <h3
        className="font-bold text-xl text-center mb-6"
        style={{ color: "#000033" }}
      >
        Claim Your Consultation
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="lp-name" className="sr-only">Full Name</label>
          <input
            id="lp-name"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={handleFocus}
            onBlur={(e) => { handleBlur(e); }}
            style={inputStyle}
            className="placeholder:text-[#999999]"
            required
            autoComplete="name"
          />
          {errors.name && (
            <p className="text-xs mt-1" style={{ color: "#CC4444" }}>{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="lp-email" className="sr-only">Email Address</label>
          <input
            id="lp-email"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={handleFocus}
            onBlur={(e) => { handleBlur(e); handleEmailBlur(); }}
            style={inputStyle}
            className="placeholder:text-[#999999]"
            required
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-xs mt-1" style={{ color: "#CC4444" }}>{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="lp-phone" className="sr-only">Phone Number</label>
          <input
            id="lp-phone"
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onFocus={handleFocus}
            onBlur={(e) => { handleBlur(e); handlePhoneBlur(); }}
            style={inputStyle}
            className="placeholder:text-[#999999]"
            required
            autoComplete="tel"
          />
          {errors.phone && (
            <p className="text-xs mt-1" style={{ color: "#CC4444" }}>{errors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="lp-location" className="sr-only">Select Location</label>
          <select
            id="lp-location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={handleFocus as any}
            onBlur={(e) => { (handleBlur as any)(e); }}
            required
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
            <option value="" disabled>Select Location</option>
            <option value="richmond">Richmond</option>
            <option value="newport-news">Newport News</option>
            <option value="virginia-beach">Virginia Beach</option>
          </select>
          {errors.location && (
            <p className="text-xs mt-1" style={{ color: "#CC4444" }}>{errors.location}</p>
          )}
        </div>

        <div className="flex items-start gap-3">
          <input
            id="lp-consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 w-4 h-4 rounded cursor-pointer flex-shrink-0"
            style={{ accentColor: "#E8670A" }}
          />
          <label htmlFor="lp-consent" className="text-[11px] leading-relaxed cursor-pointer" style={{ color: "#777777" }}>
            I consent to receive appointment and marketing texts from Men's Wellness Centers. Msg frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out or HELP for help. Consent is not required to receive services.{" "}
            <a href="/privacy-policy" className="underline underline-offset-2 hover:opacity-80" style={{ color: "#555555" }}>Privacy Policy</a>
            {" | "}
            <a href="/terms-of-service" className="underline underline-offset-2 hover:opacity-80" style={{ color: "#555555" }}>Terms of Service</a>
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded-full uppercase font-bold tracking-[0.08em] cursor-pointer transition-colors duration-200"
          style={{
            height: 52,
            background: "#E8670A",
            color: "#FFFFFF",
            fontSize: 14,
            border: "none",
            marginTop: 8,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#CF5B09"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#E8670A"; }}
        >
          Claim My Consultation
        </button>
      </form>

      <p className="text-center text-xs mt-4" style={{ color: "#999999" }}>
        HIPAA Compliant <span className="mx-1">·</span> No Spam <span className="mx-1">·</span> Response Within 1 Hour
      </p>

      <p className="text-center text-sm mt-3">
        <a
          href="tel:8663444955"
          className="font-semibold transition-colors duration-200 hover:text-[#E8670A]"
          style={{ color: "#000033" }}
        >
          Or call: 866-344-4955
        </a>
      </p>
    </div>
  );
};
