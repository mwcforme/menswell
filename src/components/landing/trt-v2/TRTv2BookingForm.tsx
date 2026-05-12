import { useState } from "react";
import { Lock } from "lucide-react";

const locationOptions = [
  { value: "richmond-va", label: "Richmond / Glen Allen" },
  { value: "newport-news-va", label: "Newport News" },
  { value: "virginia-beach-va", label: "Virginia Beach" },
];

export const TRTv2BookingForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("lp_trt_v2_cta_click", { detail: { location: "form_submit" } }));
    setSubmitted(true);
  };

  return (
    <section id="booking" style={{ background: "#000033" }}>
      <div className="max-w-[640px] mx-auto px-6 py-16 md:py-24">
        <h2 className="font-bold uppercase text-center" style={{ fontFamily: "Oswald, sans-serif", color: "#FFFFFF", fontSize: "clamp(28px, 3.4vw, 42px)", letterSpacing: "0.02em" }}>
          Book Your Consultation
        </h2>
        <p className="mt-4 text-center text-base" style={{ color: "rgba(255,255,255,0.75)", fontFamily: "Inter, sans-serif" }}>
          Same-day and next-day appointments available at our 3 Virginia clinics. No credit card required to book.
        </p>

        <div className="mt-8 rounded-2xl p-6 md:p-8" style={{ background: "#FFFFFF" }}>
          {submitted ? (
            <div className="py-12 text-center" style={{ fontFamily: "Inter, sans-serif" }}>
              <div className="text-2xl font-bold mb-2" style={{ color: "#000033", fontFamily: "Oswald, sans-serif" }}>
                Request received.
              </div>
              <p style={{ color: "#4a4a5e" }}>A care team member will call you shortly to confirm your appointment.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="booking-firstname" className="block text-xs font-semibold uppercase mb-1.5" style={{ color: "#000033", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif" }}>
                  First Name
                </label>
                <input
                  id="booking-firstname"
                  type="text"
                  required
                  autoComplete="given-name"
                  maxLength={50}
                  className="w-full px-4 py-3 rounded-lg outline-none focus:ring-2"
                  style={{ background: "#FFFFFF", border: "1px solid #D1D5DB", color: "#000033", fontFamily: "Inter, sans-serif" }}
                />
              </div>
              <div>
                <label htmlFor="booking-phone" className="block text-xs font-semibold uppercase mb-1.5" style={{ color: "#000033", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif" }}>
                  Phone
                </label>
                <input
                  id="booking-phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  maxLength={20}
                  placeholder="(555) 555-5555"
                  className="w-full px-4 py-3 rounded-lg outline-none focus:ring-2"
                  style={{ background: "#FFFFFF", border: "1px solid #D1D5DB", color: "#000033", fontFamily: "Inter, sans-serif" }}
                />
              </div>
              <div>
                <label htmlFor="booking-location" className="block text-xs font-semibold uppercase mb-1.5" style={{ color: "#000033", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif" }}>
                  Preferred Location
                </label>
                <select
                  id="booking-location"
                  required
                  defaultValue=""
                  className="w-full px-4 py-3 rounded-lg outline-none focus:ring-2 bg-white"
                  style={{ border: "1px solid #D1D5DB", color: "#000033", fontFamily: "Inter, sans-serif" }}
                >
                  <option value="" disabled>Select a clinic…</option>
                  {locationOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 rounded-full py-3.5 text-sm font-bold uppercase cursor-pointer transition-colors duration-200"
                style={{ background: "#E8670A", color: "#FFFFFF", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif", border: "none" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#CF5B09"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#E8670A"; }}
              >
                Request My Appointment
              </button>

              <p className="text-[11px] leading-relaxed mt-3 flex items-start gap-1.5" style={{ color: "#5a5a6e", fontFamily: "Inter, sans-serif" }}>
                <Lock className="h-3 w-3 mt-0.5 flex-shrink-0" />
                <span>HIPAA-compliant. Your information is never sold or shared with third parties. By submitting, you agree to be contacted by Men's Wellness Centers regarding your appointment.</span>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
