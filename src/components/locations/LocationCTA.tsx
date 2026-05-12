import { useState } from "react";
import { Phone, Lock, ChevronDown } from "lucide-react";
import { TCPAConsent } from "@/components/ui/TCPAConsent";
import type { LocationData } from "@/data/locations";

interface Props {
  location: LocationData;
}

export const LocationCTA = ({ location }: Props) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => window.open("/book", "_self"), 400);
  };

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "#FFFFFF",
    outline: "none",
    minHeight: 52,
    fontSize: 16,
  };

  return (
    <section id="location-cta" style={{ background: "#151933", padding: "80px 0" }}>
      <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
        <h2
          className="font-bold uppercase leading-tight mb-4"
          style={{ color: "#FFFFFF", fontSize: "clamp(1.25rem, 3vw, 1.75rem)" }}
        >
          BOOK YOUR CONSULTATION IN {location.city.toUpperCase()}
        </h2>
        <p className="text-[14px] md:text-[15px] leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
          Same-day lab work, a face-to-face physician visit, and a personalized treatment plan, all in about 60 minutes at our {location.city} center.
        </p>

        {/* Form card container */}
        <div
          className="max-w-md mx-auto rounded-2xl mb-10"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            padding: 32,
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-5 py-3.5 rounded-xl text-[15px] placeholder:text-white/40 focus:border-white/30 transition-colors"
              style={inputStyle}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-5 py-3.5 rounded-xl text-[15px] placeholder:text-white/40 focus:border-white/30 transition-colors"
              style={inputStyle}
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-3.5 rounded-xl text-[15px] placeholder:text-white/40 focus:border-white/30 transition-colors"
              style={inputStyle}
            />

            {/* Location selector with chevron */}
            <button
              type="button"
              onClick={() => setLocationOpen(!locationOpen)}
              className="w-full px-5 py-3.5 rounded-xl text-left text-[15px] flex items-center justify-between"
              style={{
                ...inputStyle,
                color: "rgba(255,255,255,0.7)",
                cursor: "pointer",
              }}
            >
              <span>{location.centerName}</span>
              <ChevronDown
                size={16}
                style={{
                  color: "rgba(255,255,255,0.4)",
                  transform: locationOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 200ms ease",
                }}
              />
            </button>

            {/* TCPA Consent */}
            <div className="pt-1">
              <TCPAConsent consent={consent} onChange={setConsent} variant="dark" id="location-cta-consent" />
            </div>

            {/* Tier 1 CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center rounded-full font-semibold uppercase cursor-pointer border-none transition-all duration-200 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-wait"
              style={{
                background: "#F97316",
                color: "#FFFFFF",
                padding: "16px 32px",
                fontSize: 14,
                letterSpacing: "0.05em",
              }}
              onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.background = "#EA580C"; }}
              onMouseLeave={(e) => { if (!isSubmitting) e.currentTarget.style.background = "#F97316"; }}
              data-location={location.slug.replace("-va", "")}
              data-cta-type="form"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2" width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Submitting...
                </>
              ) : (
                "Book My Consultation"
              )}
            </button>
          </form>

          {/* HIPAA trust line */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <Lock size={12} style={{ color: "rgba(255,255,255,0.4)" }} />
            <span className="text-[11px] uppercase tracking-widest font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
              HIPAA-protected. Your information is never shared.
            </span>
          </div>
        </div>

        <p className="text-[11px] md:text-xs font-medium tracking-[0.15em] uppercase mb-6" style={{ color: "rgba(255,255,255,0.35)" }}>
          CLIA Certified · LegitScript Verified · HIPAA Compliant · FSA/HSA Accepted
        </p>

        {/* Tier 2 call button */}
        <p className="text-[14px]" style={{ color: "rgba(255,255,255,0.5)" }}>
          Prefer to call?{" "}
          <a
            href={`tel:${location.phone.replace(/[^0-9]/g, "")}`}
            className="inline-flex items-center gap-1.5 font-semibold hover:opacity-80 transition-opacity"
            style={{ color: "#FFFFFF", textDecoration: "none" }}
            aria-label={`Call Men's Wellness Centers ${location.city} at ${location.phone}`}
          >
            <Phone size={13} />
            {location.phone}
          </a>
        </p>
      </div>
    </section>
  );
};
