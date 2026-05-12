import { useState } from "react";
import imgTeam from "@/assets/lp/mwc-team-new.png";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const whiteInput: React.CSSProperties = {
  width: "100%",
  background: "#FFFFFF",
  border: "1.5px solid rgba(0,0,51,0.12)",
  borderRadius: "12px",
  padding: "12px 16px",
  color: "#000033",
  fontSize: "16px",
  height: "48px",
  outline: "none",
  transition: "all 200ms ease",
};

const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = "#E8670A";
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,103,10,0.18)";
};
const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = "rgba(0,0,51,0.12)";
  e.currentTarget.style.boxShadow = "none";
};

export const BookingCTA = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [consent, setConsent] = useState(false);
  const contentRef = useScrollReveal();

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); };

  return (
    <section id="booking" className="relative overflow-hidden py-16 md:py-28" style={{ background: "#000033" }}>
      <div
        className="absolute pointer-events-none"
        style={{
          left: "20%", top: "30%", width: 400, height: 300,
          background: "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 60%)",
        }}
      />

      <div ref={contentRef} className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center relative">
        <div className="hidden md:block rounded-2xl overflow-hidden aspect-[4/3]">
          <img
            src={imgTeam}
            alt="Smiling male physician in white coat"
            className="w-full h-full object-cover rounded-2xl"
            loading="lazy"
          />
        </div>

        <div>
          <h2 className="font-bold text-xl md:text-2xl uppercase leading-tight" style={{ color: "#FFFFFF" }}>
            Schedule My Consultation
          </h2>
          <p className="text-[13px] md:text-sm font-normal mt-2 md:mt-3" style={{ color: "rgba(255,255,255,0.75)" }}>
            On-site labs. Three Virginia locations. No referral needed.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 md:mt-8 space-y-3" noValidate>
            <div>
              <label htmlFor="booking-name" className="sr-only">Full Name</label>
              <input
                id="booking-name" type="text" placeholder="Full Name"
                value={name} onChange={(e) => setName(e.target.value)}
                onFocus={handleFocus} onBlur={handleBlur}
                style={whiteInput} required autoComplete="name"
                className="placeholder:text-[#999]"
              />
            </div>
            <div>
              <label htmlFor="booking-email" className="sr-only">Email Address</label>
              <input
                id="booking-email" type="email" placeholder="Email Address"
                value={email} onChange={(e) => setEmail(e.target.value)}
                onFocus={handleFocus} onBlur={handleBlur}
                style={whiteInput} required autoComplete="email"
                className="placeholder:text-[#999]"
              />
            </div>
            <div>
              <label htmlFor="booking-phone" className="sr-only">Phone Number</label>
              <input
                id="booking-phone" type="tel" placeholder="Phone Number"
                value={phone} onChange={(e) => setPhone(e.target.value)}
                onFocus={handleFocus} onBlur={handleBlur}
                style={whiteInput} required autoComplete="tel"
                className="placeholder:text-[#999]"
              />
            </div>
            <div>
              <label htmlFor="booking-location" className="sr-only">Location</label>
              <select
                id="booking-location" value={location}
                onChange={(e) => setLocation(e.target.value)}
                onFocus={handleFocus as any} onBlur={handleBlur as any} required
                style={{
                  ...whiteInput,
                  color: location ? "#000033" : "#999",
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23999' viewBox='0 0 16 16'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                  paddingRight: "40px",
                }}
              >
                <option value="" disabled>Select Your Preferred Location</option>
                <option value="richmond">Richmond, VA</option>
                <option value="newport-news">Newport News, VA</option>
                <option value="virginia-beach">Virginia Beach, VA</option>
              </select>
            </div>

            <div className="flex items-start gap-3 mt-1">
              <input
                id="booking-consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 w-4 h-4 rounded accent-white cursor-pointer flex-shrink-0"
              />
              <label htmlFor="booking-consent" className="text-[11px] md:text-[12px] leading-relaxed cursor-pointer" style={{ color: "rgba(255,255,255,0.6)" }}>
                I consent to receive appointment and marketing texts from Men's Wellness Centers. Msg frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out or HELP for help. Consent is not required to receive services.{" "}
                <a href="/privacy-policy" className="underline underline-offset-2 hover:opacity-80" style={{ color: "rgba(255,255,255,0.75)" }}>Privacy Policy</a>
                {" | "}
                <a href="/terms-of-service" className="underline underline-offset-2 hover:opacity-80" style={{ color: "rgba(255,255,255,0.75)" }}>Terms of Service</a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full rounded-full py-4 mt-4 font-semibold uppercase text-[14px] md:text-[15px] tracking-[0.05em] cursor-pointer transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: "#F97316",
                color: "#FFFFFF",
                border: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#EA580C";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#F97316";
              }}
            >
              Book My Consultation
            </button>
          </form>

          <p className="text-center mt-3 text-[12px] md:text-[13px]" style={{ color: "rgba(255,255,255,0.55)" }}>
            HIPAA Compliant · No Spam · Response Within 1 Hour
          </p>
          <p className="text-center mt-3 md:mt-4">
            <a
              href="tel:8663444955"
              className="text-[14px] md:text-[15px] underline underline-offset-4 font-semibold transition-opacity duration-200 hover:opacity-80"
              style={{ color: "#FFFFFF" }}
            >
              Or call: 866-344-4955
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
