import { useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { TCPAConsent } from "@/components/ui/TCPAConsent";

interface Props {
  heading: string;
  introText?: string;
  checklistItems: string[];
  bgColor?: string;
}

const ConsultationFormSection = ({
  heading,
  introText = "Schedule a confidential consultation with one of our licensed physicians. Your first visit includes:",
  checklistItems,
  bgColor = "#EBEAE8",
}: Props) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", location: "" });
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      toast.error("Please accept the consent to continue.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Thank you! We'll be in touch shortly.");
      setForm({ name: "", email: "", phone: "", location: "" });
      setConsent(false);
      setSubmitting(false);
    }, 800);
  };

  return (
    <section style={{ background: bgColor }} className="py-20 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left Column */}
        <div>
          <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "#4A4A4A" }}>
            GET STARTED TODAY
          </p>
          <h2 className="font-bold uppercase tracking-wide text-2xl md:text-3xl" style={{ color: "#000033" }}>
            {heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "#4A4A4A" }}>
            {introText}
          </p>
          <ul className="mt-6 space-y-3">
            {checklistItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check size={18} color="#2ECC71" className="flex-shrink-0 mt-0.5" />
                <span className="text-sm" style={{ color: "#4A4A4A" }}>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 mt-8">
            <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: "#000033" }}>
              HIPAA Compliant
            </span>
            <span style={{ color: "#E5E5E5" }}>|</span>
            <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: "#000033" }}>
              LegitScript Certified
            </span>
          </div>
        </div>

        {/* Right Column — Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl p-8"
          style={{ background: "#FFFFFF", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
        >
          <h3 className="font-bold text-lg uppercase mb-6" style={{ color: "#000033" }}>
            Schedule My Consultation
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase mb-1.5" style={{ color: "#000033" }}>Full Name *</label>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2"
                style={{ borderColor: "#E5E5E5", color: "#000033" }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase mb-1.5" style={{ color: "#000033" }}>Email Address *</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2"
                style={{ borderColor: "#E5E5E5", color: "#000033" }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase mb-1.5" style={{ color: "#000033" }}>Phone Number *</label>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2"
                style={{ borderColor: "#E5E5E5", color: "#000033" }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase mb-1.5" style={{ color: "#000033" }}>Location *</label>
              <select
                required
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 appearance-none"
                style={{ borderColor: "#E5E5E5", color: form.location ? "#000033" : "#999" }}
              >
                <option value="">Select a location</option>
                <option value="richmond">Richmond, VA</option>
                <option value="newport-news">Newport News, VA</option>
                <option value="virginia-beach">Virginia Beach, VA</option>
              </select>
            </div>
          </div>

          <div className="mt-5">
            <TCPAConsent consent={consent} onChange={setConsent} variant="light" id="consult-consent" />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-6 rounded-full py-4 text-sm font-bold uppercase tracking-wider transition-opacity duration-200 disabled:opacity-50"
            style={{ background: "#000033", color: "#FFFFFF" }}
          >
            {submitting ? "Submitting..." : "Schedule My Consultation"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ConsultationFormSection;
