import { useState } from "react";
import { Shield, MapPin, Calendar, CheckCircle, ArrowRight } from "lucide-react";
import { TCPAConsent } from "@/components/ui/TCPAConsent";

interface StepOneProps {
  onNext: (data: { firstName: string; phone: string; location: string }) => void;
}

const trustBadges = [
  { icon: Shield, label: "LegitScript Certified" },
  { icon: MapPin, label: "3 Virginia Centers" },
  { icon: Calendar, label: "Since 2015" },
  { icon: CheckCircle, label: "FDA-Approved Therapies" },
];

const StepOne = ({ onNext }: StepOneProps) => {
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(true);

  const validate = () => {
    setErrors({});
    return true;
  };

  const handleSubmit = () => {
    if (validate()) onNext({ firstName: firstName.trim(), phone, location });
  };

  const inputStyle: React.CSSProperties = {
    height: 52,
    borderRadius: 10,
    backgroundColor: "#fff",
    border: "1px solid #D1D5DB",
    color: "#1A1A2E",
    padding: "0 16px",
    fontSize: 16,
    width: "100%",
    outline: "none",
  };

  return (
    <div className="flex flex-col items-center px-5 py-4 md:min-h-[calc(100vh-88px)] md:justify-start md:py-10" style={{ backgroundColor: "#EBEAE8" }}>
      <h1
        className="mx-auto max-w-xl text-center uppercase"
        style={{
          fontFamily: "'Oswald', sans-serif",
          fontWeight: 800,
          fontStyle: "italic",
          fontSize: "clamp(1.6rem, 5vw, 2.8rem)",
          lineHeight: 1.05,
          color: "#000033",
          letterSpacing: "-0.02em",
          transform: "skewX(-3deg)",
          marginBottom: 8,
        }}
      >
        Your Consultation Is Waiting
      </h1>

      <p className="mx-auto mb-3 max-w-md text-center" style={{ color: "#555555", fontSize: 15, lineHeight: 1.5 }}>
        60-minute visit. Licensed physician. No obligation.
      </p>

      <div
        className="mx-auto w-full max-w-[480px] rounded-2xl bg-white p-6 md:p-8"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.06)" }}
      >
        <div className="space-y-3">
          <div>
            <input
              style={inputStyle}
              placeholder="Full Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onFocus={(e) => { e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,103,10,0.15)"; e.currentTarget.style.borderColor = "#E8670A"; }}
              onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#D1D5DB"; }}
              aria-label="Full Name"
            />
            {errors.firstName && <p className="mt-1 text-xs" style={{ color: "#DC2626" }}>{errors.firstName}</p>}
          </div>
          <div>
            <input
              style={inputStyle}
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onFocus={(e) => { e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,103,10,0.15)"; e.currentTarget.style.borderColor = "#E8670A"; }}
              onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#D1D5DB"; }}
              aria-label="Phone Number"
            />
            {errors.phone && <p className="mt-1 text-xs" style={{ color: "#DC2626" }}>{errors.phone}</p>}
          </div>
          
          <div>
            <select
              style={{ ...inputStyle, appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onFocus={(e) => { e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,103,10,0.15)"; e.currentTarget.style.borderColor = "#E8670A"; }}
              onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#D1D5DB"; }}
              aria-label="Location"
            >
              <option value="">Location</option>
              <option value="Newport News">Newport News</option>
              <option value="Richmond">Richmond</option>
              <option value="Virginia Beach">Virginia Beach</option>
            </select>
            {errors.location && <p className="mt-1 text-xs" style={{ color: "#DC2626" }}>{errors.location}</p>}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 flex w-full items-center justify-center gap-2 font-bold transition-all hover:shadow-lg"
          style={{
            height: 56,
            borderRadius: 9999,
            backgroundColor: "#E8670A",
            color: "#fff",
            fontSize: 16,
            cursor: "pointer",
            border: "none",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.backgroundColor = "#D45A06"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.backgroundColor = "#E8670A"; }}
        >
          See Available Times <ArrowRight className="h-4 w-4" />
        </button>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          {trustBadges.map((b) => (
            <div key={b.label} className="flex items-center gap-1" style={{ color: "#888888", fontSize: 10, letterSpacing: "0.06em" }}>
              <b.icon className="h-3 w-3" />
              <span className="uppercase">{b.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-3">
          <TCPAConsent consent={consent} onChange={setConsent} variant="light" id="step1-consent" />
        </div>
      </div>
    </div>
  );
};

export default StepOne;
