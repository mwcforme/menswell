import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { TCPAConsent } from "@/components/ui/TCPAConsent";
import { updateBookingState, toQueryString } from "@/lib/bookingState";

export const HeroForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Native required attributes catch missing text fields. Consent is a
    // checkbox so we validate it explicitly.
    if (!consent) {
      setError("Please agree to receive messages so we can confirm your visit.");
      return;
    }
    if (!name || !phone || !email || !location) {
      setError("Please fill out all four fields.");
      return;
    }
    setError("");
    // Persist hero form fields into booking state, then advance to the
    // symptom question. URL params keep state alive across refresh / GHL.
    const next = updateBookingState({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      location,
      source: "hero_form",
    });
    navigate(`/book/symptom?${toQueryString(next)}`);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: 48,
    background: "#FFFFFF",
    border: "1.5px solid rgba(0,0,51,0.12)",
    borderRadius: 8,
    padding: "0 16px",
    fontSize: 16,
    color: "#000033",
    outline: "none",
    transition: "border-color 200ms ease, box-shadow 200ms ease",
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "#E8670A";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,103,10,0.18)";
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "rgba(0,0,51,0.12)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div
      className="w-full rounded-2xl p-6 md:p-8 mx-auto"
      style={{
        background: "rgba(10,10,46,0.80)",
        border: "1px solid rgba(255,255,255,0.06)",
        maxWidth: 480,
        boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
        backdropFilter: "blur(20px)",
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="hero-name" className="sr-only">Full Name</label>
            <input
              id="hero-name" type="text" placeholder="Full Name"
              value={name} onChange={(e) => setName(e.target.value)}
              onFocus={handleFocus} onBlur={handleBlur}
              style={inputStyle} required autoComplete="name"
              className="placeholder:text-[#999]"
            />
          </div>
          <div>
            <label htmlFor="hero-phone" className="sr-only">Phone</label>
            <input
              id="hero-phone" type="tel" placeholder="Phone"
              value={phone} onChange={(e) => setPhone(e.target.value)}
              onFocus={handleFocus} onBlur={handleBlur}
              style={inputStyle} required autoComplete="tel"
              className="placeholder:text-[#999]"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="hero-email" className="sr-only">Email</label>
            <input
              id="hero-email" type="email" placeholder="Email"
              value={email} onChange={(e) => setEmail(e.target.value)}
              onFocus={handleFocus} onBlur={handleBlur}
              style={inputStyle} required autoComplete="email"
              className="placeholder:text-[#999]"
            />
          </div>
          <div>
            <label htmlFor="hero-location" className="sr-only">Location</label>
            <select
              id="hero-location" value={location}
              onChange={(e) => setLocation(e.target.value)}
              onFocus={handleFocus as any} onBlur={handleBlur as any}
              required
              style={{
                ...inputStyle,
                color: location ? "#000033" : "#999",
                appearance: "none",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23999' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
                paddingRight: 40,
              }}
            >
              <option value="" disabled>Location</option>
              <option value="richmond">Richmond, VA</option>
              <option value="newport-news">Newport News, VA</option>
              <option value="virginia-beach">Virginia Beach, VA</option>
            </select>
          </div>
        </div>

        {/* TCPA Consent */}
        <div className="pt-1">
          <TCPAConsent consent={consent} onChange={setConsent} variant="dark" id="hero-consent" />
        </div>

        {error && (
          <div
            role="alert"
            style={{
              background: "rgba(220, 38, 38, 0.12)",
              border: "1px solid rgba(248, 113, 113, 0.4)",
              color: "#FCA5A5",
              borderRadius: 6,
              padding: "10px 12px",
              fontSize: 13,
              lineHeight: 1.4,
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full rounded-lg py-3.5 font-bold text-sm uppercase tracking-[0.08em] cursor-pointer transition-colors duration-200"
          style={{ background: "#E8670A", color: "#FFFFFF", border: "none" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#CF5B09"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#E8670A"; }}
        >
          Schedule My Consultation
        </button>
      </form>

      {/* Minimal social proof — one line */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-current" style={{ color: "#E8670A" }} />
          ))}
        </div>
        <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.40)" }}>
          4.9/5 · 200+ reviews · Since 2015
        </span>
      </div>
    </div>
  );
};
