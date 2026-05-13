import { useState } from "react";
import { Check, MapPin } from "lucide-react";

export const TRTFinalCTA = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validatePhone = (v: string) => v.replace(/\D/g, "").length >= 10;
  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!validateEmail(email)) errs.email = "Please enter a valid email";
    if (!phone.trim()) errs.phone = "Phone is required";
    else if (!validatePhone(phone)) errs.phone = "Please enter a valid phone number";
    if (!location) errs.location = "Please select a location";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const params = new URLSearchParams({
      name, email, phone, location, source: "landing-page", service: "trt",
    });
    const urls: Record<string, string> = {
      richmond: "https://menswellnesscenters.com/thank-you-richmond/",
      "newport-news": "https://menswellnesscenters.com/thank-you-newport-news/",
      "virginia-beach": "https://menswellnesscenters.com/thank-you-virginia-beach/",
    };
    window.location.href = `${urls[location]}?${params.toString()}`;
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
    <section id="final-cta" className="py-14 md:py-20" style={{ background: "#000033" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center">
          <h2
            className="font-bold uppercase"
            style={{
              fontFamily: "Oswald, sans-serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              color: "#FFFFFF",
              fontWeight: 700,
            }}
          >
            READY TO BOOK YOUR FIRST VISIT?
          </h2>
          <p className="text-base mt-2" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "Inter, sans-serif", fontSize: 16 }}>
            $0 today. Same- or next-day visits.
          </p>

          <div className="flex items-center justify-center gap-2 mt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} style={{ color: "#D4A017", fontSize: "20px" }}>★</span>
            ))}
            <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.80)" }}>200+ Reviews</span>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div className="order-2 md:order-1 md:pt-2">
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: "rgba(255,255,255,0.85)", fontFamily: "Inter, sans-serif" }}
            >
              This isn't about vanity. It's about getting back to being the man you've always been: sharp, confident, and performing at your level.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "100% private. Your employer or insurance is never notified.",
                "Cancel or reschedule free, anytime.",
                "If TRT isn't right for you, our providers will tell you. Treatment is only prescribed when clinically appropriate.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3" style={{ color: "rgba(255,255,255,0.92)", fontFamily: "Inter, sans-serif" }}>
                  <Check className="h-5 w-5 flex-shrink-0 mt-0.5" strokeWidth={3} style={{ color: "#2ECC71" }} />
                  <span className="text-base">{t}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <div
                className="text-xs font-semibold uppercase mb-3"
                style={{ color: "rgba(255,255,255,0.55)", letterSpacing: "0.12em", fontFamily: "Inter, sans-serif" }}
              >
                Center Locations
              </div>
              <ul className="space-y-2">
                {[
                  { label: "Richmond, VA", to: "/locations/richmond" },
                  { label: "Newport News, VA", to: "/locations/newport-news" },
                  { label: "Virginia Beach, VA", to: "/locations/virginia-beach" },
                ].map((l) => (
                  <li key={l.label} className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 flex-shrink-0" style={{ color: "#E8670A" }} />
                    <a
                      href={l.to}
                      className="text-base underline underline-offset-4 hover:text-white transition-colors"
                      style={{ color: "rgba(255,255,255,0.92)", fontFamily: "Inter, sans-serif" }}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="order-1 md:order-2">
        <div
          className="mx-auto rounded-2xl p-8"
          style={{
            background: "#FFFFFF",
            maxWidth: 480,
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
            Book My Consult
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <input
                type="text"
                placeholder="Name"
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
                  if (phone && !validatePhone(phone)) setErrors((p) => ({ ...p, phone: "Please enter a valid phone number" }));
                  else setErrors((p) => { const { phone: _, ...rest } = p; return rest; });
                }}
                style={inputStyle}
                className="placeholder:text-[#999999]"
                autoComplete="tel"
              />
              {errors.phone && <p className="text-xs mt-1 text-left" style={{ color: "#CC4444" }}>{errors.phone}</p>}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={inputStyle}
                className="placeholder:text-[#999999]"
                autoComplete="email"
              />
              {errors.email && <p className="text-xs mt-1 text-left" style={{ color: "#CC4444" }}>{errors.email}</p>}
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
                <option value="" disabled>Select Location</option>
                <option value="richmond">Richmond</option>
                <option value="newport-news">Newport News</option>
                <option value="virginia-beach">Virginia Beach</option>
              </select>
              {errors.location && <p className="text-xs mt-1 text-left" style={{ color: "#CC4444" }}>{errors.location}</p>}
            </div>

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
              Book My Consult
            </button>
          </form>

          <p className="text-center text-xs mt-4" style={{ color: "#999999", fontFamily: "Inter, sans-serif" }}>
            HIPAA Compliant · No Spam · Book entirely online
          </p>

          <p className="text-center text-sm mt-3">
            <a
              href="tel:8663444955"
              className="font-bold transition-colors duration-200"
              style={{ color: "#000033", fontFamily: "Inter, sans-serif" }}
            >
              Or call: 866-344-4955
            </a>
          </p>
        </div>
          </div>
        </div>
      </div>
    </section>
  );
};
