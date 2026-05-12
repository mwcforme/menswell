import { useState } from "react";
import { Lock04 } from "@untitledui/icons";

interface GHLTRTLeadFormProps {
  id?: string;
}

const GHLTRTLeadForm = ({ id }: GHLTRTLeadFormProps) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center" id={id}>
        <div className="text-[#2ECC71] text-5xl mb-4">✓</div>
        <h3 style={{ fontFamily: "'Bebas Neue', cursive" }} className="text-2xl text-[#000033] mb-2">
          Thank You!
        </h3>
        <p className="text-[#666] text-[15px]">We'll text you to confirm within 1 hour.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl" id={id}>
      <h3
        style={{ fontFamily: "'Bebas Neue', cursive" }}
        className="text-[28px] text-[#000033] text-center mb-1 leading-tight"
      >
        Get Started. At No Cost
      </h3>
      <p className="text-[#666] text-[15px] text-center mb-1">
        Limited appointments available
      </p>
      {/* CRO-13: friction reducer */}
      <p className="text-[#999] text-[13px] italic text-center mb-6">
        Takes less than 30 seconds
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name*"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          autoComplete="name"
          className="w-full px-4 py-3.5 rounded-lg text-base font-normal border-2 outline-none transition-colors"
          style={{
            backgroundColor: "#F5F0EB",
            borderColor: "#C8C6C1",
            fontFamily: "Inter, sans-serif",
            color: "#000033",
          }}
        />
        <input
          type="tel"
          placeholder="Phone Number*"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full px-4 py-3.5 rounded-lg text-base font-normal border-2 outline-none transition-colors"
          style={{
            backgroundColor: "#F5F0EB",
            borderColor: "#C8C6C1",
            fontFamily: "Inter, sans-serif",
            color: "#000033",
          }}
        />
        <input
          type="email"
          placeholder="Email Address*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3.5 rounded-lg text-base font-normal border-2 outline-none transition-colors"
          style={{
            backgroundColor: "#F5F0EB",
            borderColor: "#C8C6C1",
            fontFamily: "Inter, sans-serif",
            color: "#000033",
          }}
        />

        {/* CRO-06: expanded touch target on checkbox */}
        <label className="flex items-start gap-3 cursor-pointer -m-3 p-3">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 w-5 h-5 min-w-[20px] min-h-[20px] rounded border-2 border-[#C8C6C1] accent-[#E8670A]"
          />
          <span className="text-[13px] text-[#666] leading-relaxed">
            I consent to receive appointment and marketing texts from Men's Wellness Centers. Msg frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out or HELP for help. Consent is not required to receive services.
            {" "}<a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#666]">Privacy Policy</a>
            {" "}<a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#666]">Terms of Service</a>
          </span>
        </label>

        <button
          type="submit"
          className="w-full py-4 rounded-full text-white font-semibold uppercase tracking-wide text-sm transition-colors"
          style={{ backgroundColor: "#E8670A", fontFamily: "Inter, sans-serif" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#CF5B09")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#E8670A")}
        >
          Claim My Consultation
        </button>
      </form>

      {/* CRO-08: trust text 14px */}
      <p className="text-[#666] text-sm text-center mt-4">
        We'll text you to confirm within 1 hour. No spam, ever.
      </p>
      <p className="text-[#666] text-sm font-medium text-center mt-2 flex items-center justify-center gap-1.5">
        <Lock04 size={12} />
        Your info is private & HIPAA-secure
      </p>
    </div>
  );
};

export default GHLTRTLeadForm;
