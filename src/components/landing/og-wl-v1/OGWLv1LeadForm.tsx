import { useState } from "react";
import { Lock, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface OGWLv1LeadFormProps { heading?: string; formId?: string; }

export const OGWLv1LeadForm = ({ heading = "Get Started — At No Cost", formId = "hero" }: OGWLv1LeadFormProps) => {
  const navigate = useNavigate();
  const [name, setName] = useState(""); const [phone, setPhone] = useState(""); const [location, setLocation] = useState("");
  const [consent, setConsent] = useState(false); const [errors, setErrors] = useState<Record<string, string>>({});
  const validatePhone = (v: string) => v.replace(/\D/g, "").length >= 10;
  const formatPhone = (v: string) => { const x = v.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/); if (!x) return v; return !x[2] ? x[1] : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : ""); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!phone.trim()) errs.phone = "Phone is required";
    else if (!validatePhone(phone)) errs.phone = "Please enter a valid 10-digit phone number";
    if (!location) errs.location = "Please select a location";
    if (!consent) errs.consent = "Please agree to receive communications";
    setErrors(errs); if (Object.keys(errs).length > 0) return;
    window.dispatchEvent(new CustomEvent("lp_wl_form_submit", { detail: { name, phone, location, source: "og-lp-weight-loss", service: "weight-loss", form_location: formId } }));
    if (typeof window !== "undefined" && (window as any).gtag) (window as any).gtag("event", "generate_lead", { event_category: "Weight Loss", event_label: "Form Submit", value: 1 });
    if (typeof window !== "undefined" && (window as any).fbq) (window as any).fbq("track", "Lead", { content_category: "Weight Loss" });
    const params = new URLSearchParams({ name, phone, location, source: "og-lp-weight-loss", service: "weight-loss" });
    navigate(`/lp/weight-loss-v2/thank-you?${params.toString()}`);
  };

  const inputClasses = "w-full px-4 py-3 rounded-lg text-[15px] outline-none transition-all duration-200 border-[1.5px]";

  return (
    <div id={formId === "bottom" ? "lead-form-bottom" : "lead-form"} className="rounded-lg p-8"
      style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(20px)", boxShadow: "0 12px 32px rgba(0,0,0,0.12)", border: "1px solid rgba(255,255,255,0.3)", color: "#212529",
        maxWidth: formId === "bottom" ? 480 : undefined, margin: formId === "bottom" ? "32px auto 0" : undefined }}>
      <h3 className="text-[22px] font-bold mb-5 text-center" style={{ color: "#003366" }}>{heading}</h3>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3.5">
          <label className="block text-[13px] font-semibold mb-1" style={{ color: "#343a40" }}>Full Name</label>
          <input type="text" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={inputClasses}
            style={{ borderColor: "#dee2e6", minHeight: 48 }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#004883"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,72,131,0.08)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "#dee2e6"; e.currentTarget.style.boxShadow = "none"; }} />
          {errors.name && <p className="text-[12px] mt-1" style={{ color: "#dc3545" }}>{errors.name}</p>}
        </div>
        <div className="mb-3.5">
          <label className="block text-[13px] font-semibold mb-1" style={{ color: "#343a40" }}>Phone Number</label>
          <input type="tel" placeholder="(555) 123-4567" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} autoComplete="tel" className={inputClasses}
            style={{ borderColor: "#dee2e6", minHeight: 48 }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#004883"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,72,131,0.08)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "#dee2e6"; e.currentTarget.style.boxShadow = "none";
              if (phone && !validatePhone(phone)) setErrors((p) => ({ ...p, phone: "Please enter a valid 10-digit phone number" }));
              else setErrors((p) => { const { phone: _, ...rest } = p; return rest; }); }} />
          {errors.phone && <p className="text-[12px] mt-1" style={{ color: "#dc3545" }}>{errors.phone}</p>}
        </div>
        <div className="mb-3.5">
          <label className="block text-[13px] font-semibold mb-1" style={{ color: "#343a40" }}>Preferred Location</label>
          <select value={location} onChange={(e) => setLocation(e.target.value)} className={inputClasses}
            style={{ borderColor: "#dee2e6", minHeight: 48, color: location ? "#212529" : "#adb5bd", appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%236c757d' viewBox='0 0 16 16'%3E%3Cpath d='M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: 40 }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#004883"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,72,131,0.08)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "#dee2e6"; e.currentTarget.style.boxShadow = "none"; }}>
            <option value="" disabled>Select a clinic</option>
            <option value="richmond">Richmond, VA</option>
            <option value="newport_news">Newport News, VA</option>
            <option value="virginia_beach">Virginia Beach, VA</option>
          </select>
          {errors.location && <p className="text-[12px] mt-1" style={{ color: "#dc3545" }}>{errors.location}</p>}
        </div>
        <label className="flex gap-2 items-start my-3.5 text-[11px] leading-relaxed cursor-pointer" style={{ color: "#6c757d" }}>
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 flex-shrink-0 w-4 h-4" style={{ accentColor: "#004883" }} />
          <span>I agree to receive SMS messages from Men's Wellness Centers. Message & data rates may apply. Reply STOP to cancel.</span>
        </label>
        {errors.consent && <p className="text-[12px] mb-2" style={{ color: "#dc3545" }}>{errors.consent}</p>}
        <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-8 py-3.5 text-[15px] font-bold cursor-pointer transition-all duration-200 border-none"
          style={{ background: "#003366", color: "#ffffff", letterSpacing: "0.03em", minHeight: 48 }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#004883"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#003366"; }}>
          Claim My Consultation
        </button>
        <div className="text-center mt-3 text-[12px] flex flex-col gap-1 items-center" style={{ color: "#6c757d" }}>
          <span className="inline-flex items-center gap-1"><MessageCircle size={14} /> We'll text you to confirm within 1 hour.</span>
          <span className="inline-flex items-center gap-1"><Lock size={14} /> Your info is private & HIPAA-secure</span>
        </div>
        <div className="text-center mt-2 text-[11px]">
          <Link to="/privacy-policy" style={{ color: "#004883", textDecoration: "underline" }}>Privacy Policy</Link>{" · "}
          <Link to="/terms-of-service" style={{ color: "#004883", textDecoration: "underline" }}>Terms of Service</Link>
        </div>
      </form>
    </div>
  );
};