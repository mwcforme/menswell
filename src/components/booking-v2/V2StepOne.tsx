import { useState } from "react";
import { Shield, MapPin, Calendar, CheckCircle, ArrowRight, Star, Check } from "lucide-react";

interface V2StepOneProps {
  onNext: (data: { firstName: string; phone: string; location: string; smsConsent: boolean }) => void;
  initialData?: { firstName?: string; phone?: string; location?: string; smsConsent?: boolean };
}

const font = "'Montserrat', sans-serif";
const headingFont = "'Bebas Neue', sans-serif";

const locations = [
  { value: "richmond", label: "Richmond, VA" },
  { value: "newport-news", label: "Newport News, VA" },
  { value: "virginia-beach", label: "Virginia Beach, VA" },
];

const trustBadges = [
  { icon: Shield, label: "LegitScript Certified" },
  { icon: MapPin, label: "3 Virginia Centers" },
  { icon: Calendar, label: "Since 2015" },
  { icon: CheckCircle, label: "FDA-Approved Therapies" },
];

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

const V2StepOne = ({ onNext, initialData }: V2StepOneProps) => {
  const [firstName, setFirstName] = useState(initialData?.firstName || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [consent, setConsent] = useState(initialData?.smsConsent ?? false);

  const isValid = firstName.trim() && phone.trim() && location;

  const focusStyle = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "rgba(232,103,10,0.5)";
    e.currentTarget.style.boxShadow = "inset 0 1px 2px rgba(0,0,0,0.06), 0 0 0 3px rgba(232,103,10,0.1)";
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "#D1CCC5";
    e.currentTarget.style.boxShadow = "inset 0 1px 2px rgba(0,0,0,0.06)";
  };

  return (
    <div className="flex flex-col items-center px-5 pt-6 md:pt-10" data-spec-id="step1-screen">
      <h1
        className="text-center uppercase"
        style={{
          fontFamily: headingFont,
          fontSize: "clamp(28px, 6vw, 40px)",
          color: "#fff",
          letterSpacing: "0.05em",
          lineHeight: 1.05,
          marginBottom: 8,
        }}
      >
        Your Consultation Is Waiting
      </h1>

      <p className="mb-3 text-center" style={{ fontFamily: font, fontWeight: 400, fontSize: 15, color: "#B8B6B2", lineHeight: 1.5 }}>
        Licensed physician. No obligation. No pressure.
      </p>

      {/* Trust line */}
      <div className="mb-6 flex items-center justify-center gap-2" data-spec-id="step1-trustline" style={{ fontFamily: font, fontSize: 15, fontWeight: 500 }}>
        <Star className="h-4 w-4" style={{ color: "#E8670A" }} fill="#E8670A" />
        <span style={{ color: "#fff" }}>4.9 Google Reviews · 10,000+ Men Treated</span>
      </div>

      {/* White form card */}
      <div
        className="w-full max-w-[480px] p-6 md:p-8"
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 16,
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}
      >
        <h2 className="mb-6 text-center uppercase" style={{ fontFamily: headingFont, fontSize: 26, color: "#0B1029", letterSpacing: "0.04em" }}>
          Book My Consultation
        </h2>

        <div className="space-y-4">
          <div data-spec-id="step1-firstname">
            <label className="mb-1.5 block uppercase" style={{ fontFamily: font, fontWeight: 600, fontSize: 13, color: "#9CA3AF", letterSpacing: "0.08em" }}>
              Full Name
            </label>
            <input style={inputStyle} placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} onFocus={focusStyle} onBlur={blurStyle} aria-label="Full name" />
          </div>

          <div data-spec-id="step1-phone">
            <label className="mb-1.5 block uppercase" style={{ fontFamily: font, fontWeight: 600, fontSize: 13, color: "#9CA3AF", letterSpacing: "0.08em" }}>
              Phone Number
            </label>
            <input style={inputStyle} type="tel" placeholder="(555) 555-5555" value={phone} onChange={(e) => setPhone(e.target.value)} onFocus={focusStyle} onBlur={blurStyle} aria-label="Phone number" />
          </div>

          <div data-spec-id="step1-location" style={{ marginTop: 16 }}>
            <label className="mb-2 block uppercase" style={{ fontFamily: font, fontWeight: 600, fontSize: 13, color: "#9CA3AF", letterSpacing: "0.08em" }}>
              Select Location
            </label>
            <div className="space-y-3">
              {locations.map((loc) => {
                const selected = location === loc.value;
                return (
                  <button
                    key={loc.value}
                    type="button"
                    onClick={() => setLocation(loc.value)}
                    className="flex w-full items-center gap-3 px-4 transition-all"
                    style={{
                      minHeight: 48,
                      fontFamily: font, fontWeight: selected ? 700 : 600, fontSize: 15,
                      color: "#0B1029",
                      backgroundColor: selected ? "rgba(232,103,10,0.06)" : "#FFFFFF",
                      border: selected ? "2px solid #E8670A" : "2px solid #D1CCC5",
                      borderRadius: 12,
                      cursor: "pointer",
                      boxShadow: selected ? "0 0 0 3px rgba(232,103,10,0.1)" : "0 1px 3px rgba(0,0,0,0.06)",
                    }}
                    onMouseEnter={(e) => { if (!selected) { e.currentTarget.style.borderColor = "rgba(232,103,10,0.4)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)"; } }}
                    onMouseLeave={(e) => { if (!selected) { e.currentTarget.style.borderColor = "#D1CCC5"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)"; } }}
                    aria-label={loc.label}
                  >
                    <MapPin className="h-4 w-4 shrink-0" style={{ color: "#E8670A" }} />
                    <span className="flex-1 text-left">{loc.label}</span>
                    {selected && <Check className="h-[18px] w-[18px] shrink-0" style={{ color: "#E8670A" }} />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* TCPA Consent */}
        <div className="mt-5 flex items-start gap-3" data-spec-id="step1-consent">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 rounded" style={{ accentColor: "#E8670A" }} aria-label="SMS consent" id="v2-sms-consent" />
          <label htmlFor="v2-sms-consent" style={{ fontFamily: font, fontSize: 14, color: "#6B7280", lineHeight: 1.6 }}>
            I consent to receive appointment and marketing texts from Men's Wellness Centers. Msg frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out or HELP for help. Consent is not required to receive services.
          </label>
        </div>

        <div className="mt-3 flex items-center justify-center gap-2" style={{ fontFamily: font, fontSize: 14 }}>
          <a href="/privacy-policy" style={{ color: "#6B7280", textDecoration: "underline" }}>Privacy Policy</a>
          <span style={{ color: "#D1D5DB" }}>|</span>
          <a href="/terms-of-service" style={{ color: "#6B7280", textDecoration: "underline" }}>Terms of Services</a>
        </div>

        {/* CTA */}
        <button
          onClick={() => isValid && onNext({ firstName: firstName.trim(), phone, location, smsConsent: consent })}
          disabled={!isValid}
          data-spec-id="step1-cta"
          className="mt-6 flex w-full items-center justify-center gap-2 uppercase transition-all"
          style={{
            height: 56, borderRadius: 12, backgroundColor: "#E8670A", color: "#fff",
            fontFamily: font, fontWeight: 700, fontSize: 15, letterSpacing: "0.1em",
            cursor: isValid ? "pointer" : "default", opacity: isValid ? 1 : 0.4, border: "none", padding: "16px 24px",
          }}
          onMouseEnter={(e) => { if (isValid) e.currentTarget.style.boxShadow = "0 4px 20px rgba(232,103,10,0.3)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
          aria-label="Schedule my consultation"
        >
          Schedule My Consultation <ArrowRight className="h-4 w-4" />
        </button>

        {/* Trust badges */}
        <div className="mt-5 grid grid-cols-2 gap-2 md:flex md:flex-wrap md:justify-center md:gap-4" data-spec-id="step1-trustbadges">
          {trustBadges.map((b) => (
            <div key={b.label} className="flex items-center gap-1.5" style={{ fontFamily: font, fontSize: 12, color: "#9CA3AF" }}>
              <b.icon className="h-3.5 w-3.5" />
              <span>{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default V2StepOne;
