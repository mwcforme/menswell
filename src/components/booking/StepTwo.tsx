import { useState, useEffect } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

interface StepTwoProps {
  onNext: (data: {
    email: string;
    referralSource: string;
    location: string;
    primaryConcern: string;
    duration: string;
    triedOther: boolean;
    screenerAnswers: Record<string, boolean>;
    contactMethod: "voice" | "sms";
  }) => void;
  onDQ: () => void;
}

const concerns = [
  { id: "energy", label: "Low energy / fatigue" },
  { id: "sexual", label: "Low sex drive / ED" },
  { id: "weight", label: "Weight gain / difficulty losing weight" },
  { id: "other", label: "Other" },
];

const durations = ["< 6 mo", "6–12 mo", "1–2 yr", "2+ yr"];

const referralOptions = ["Google Search", "Social Media (Facebook/Instagram)", "Friend or Family Referral", "Physician Referral", "Online Ad", "TV/Radio", "Other"];
const locationOptions = ["Richmond", "Newport News", "Virginia Beach"];

const screenersByPath: Record<string, string[]> = {
  energy: ["Have you been diagnosed with prostate or breast cancer?", "Are you currently trying to conceive?", "Blood clots (DVT or PE) in the past 6 months?"],
  mood: ["Have you been diagnosed with prostate or breast cancer?", "Are you currently trying to conceive?", "Blood clots (DVT or PE) in the past 6 months?"],
  wellness: ["Have you been diagnosed with prostate or breast cancer?", "Are you currently trying to conceive?", "Blood clots (DVT or PE) in the past 6 months?"],
  sexual: ["Do you take nitrate medications (e.g., nitroglycerin)?", "Active or unstable heart disease?"],
  weight: ["History of thyroid cancer or MEN2 syndrome?", "History of pancreatitis?", "Severe digestive disorder (e.g., gastroparesis)?"],
};

const CustomSelect = ({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: string[]; placeholder: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between transition-colors"
        style={{
          height: 52, borderRadius: 10, backgroundColor: "#fff",
          border: open ? "1px solid #E8670A" : "1px solid #D1D5DB",
          color: value ? "#1A1A2E" : "#9CA3AF", padding: "0 16px", fontSize: 16,
          boxShadow: open ? "0 0 0 3px rgba(232,103,10,0.15)" : "none",
        }}
      >
        <span>{value || placeholder}</span>
        <ChevronDown className="h-4 w-4" style={{ color: "#9CA3AF", transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-lg bg-white" style={{ border: "1px solid #E5E7EB", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false); }}
              className="block w-full px-4 py-3 text-left text-sm transition-colors hover:bg-gray-50"
              style={{ color: "#1A1A2E", borderBottom: "1px solid #F3F4F6" }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const StepTwo = ({ onNext, onDQ }: StepTwoProps) => {
  const [concern, setConcern] = useState("");
  const [duration, setDuration] = useState("");
  const [triedOther, setTriedOther] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [referral, setReferral] = useState("");
  const [location, setLocation] = useState("");
  const [contactMethod, setContactMethod] = useState<"voice" | "sms" | "">("");
  const [screenerAnswers, setScreenerAnswers] = useState<Record<string, boolean>>({});
  const [showGroupB, setShowGroupB] = useState(false);
  const [showGroupC, setShowGroupC] = useState(false);

  const topQuestionsComplete = concern && duration && triedOther !== null;

  useEffect(() => {
    if (topQuestionsComplete && email && referral && location && contactMethod) {
      setEmailError("");
      const t = setTimeout(() => setShowGroupB(true), 200);
      return () => clearTimeout(t);
    }
  }, [topQuestionsComplete, email, referral, location, contactMethod]);

  useEffect(() => {
    if (concern) {
      setScreenerAnswers({});
      const t = setTimeout(() => setShowGroupC(true), 300);
      return () => clearTimeout(t);
    }
  }, [concern]);

  const screenerQuestions = concern ? (screenersByPath[concern] || []) : [];
  const allScreenerAnswered = screenerQuestions.length > 0 ? screenerQuestions.every((q) => q in screenerAnswers) : true;
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit = topQuestionsComplete && email && validEmail && referral && location && contactMethod && allScreenerAnswered;

  const handleSubmit = () => {
    if (!validEmail) { setEmailError("Enter a valid email address"); return; }
    if (!canSubmit) return;
    const hasDQ = Object.values(screenerAnswers).some((v) => v === true);
    if (hasDQ) { onDQ(); return; }
    onNext({ email: email.trim(), referralSource: referral, location, primaryConcern: concern, duration, triedOther: triedOther!, screenerAnswers, contactMethod: contactMethod as "voice" | "sms" });
  };

  const YNPills = ({ question }: { question: string }) => {
    const val = screenerAnswers[question];
    return (
      <div className="mb-3">
        <p className="mb-2 text-sm font-medium" style={{ color: "#1A1A2E" }}>{question}</p>
        <div className="flex gap-2">
          {[false, true].map((isYes) => (
            <button
              key={String(isYes)}
              type="button"
              onClick={() => setScreenerAnswers((p) => ({ ...p, [question]: isYes }))}
              className="flex-1 rounded-full py-2.5 text-sm font-medium transition-all"
              style={{
                backgroundColor: val === isYes ? (isYes ? "rgba(245,158,11,0.15)" : "rgba(232,103,10,0.1)") : "#fff",
                border: val === isYes ? (isYes ? "1px solid #F59E0B" : "1px solid #E8670A") : "1px solid #D1D5DB",
                color: val === isYes ? "#1A1A2E" : "#555555",
              }}
            >
              {isYes ? "Yes" : "No"}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-[calc(100vh-88px)] flex-col items-center px-5 py-8" style={{ backgroundColor: "#EBEAE8" }}>
      <div className="w-full max-w-[560px]">
        <h2
          className="mb-3 text-center uppercase"
          style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 800, fontStyle: "italic", fontSize: "clamp(1.3rem, 4vw, 2rem)", color: "#000033", letterSpacing: "-0.01em", transform: "skewX(-3deg)" }}
        >
          Let's Personalize Your Visit
        </h2>
        <p className="mb-8 text-center" style={{ color: "#555555", fontSize: 15 }}>
          Answer a few quick questions so we can match you with the right physician.
        </p>

        {/* Top Questions: Primary Concern, Duration, Tried Other */}
        <div className="mb-6 space-y-6">
          {/* Primary Concern */}
          <div>
            <label className="mb-3 block text-sm font-medium" style={{ color: "#555555" }}>Primary Concern <span style={{ color: "#DC2626" }}>*</span></label>
            <div className="space-y-2">
              {concerns.map((c) => (
                <label
                  key={c.id}
                  className="flex cursor-pointer items-center gap-3 rounded-xl bg-white p-4 transition-all"
                  style={{
                    border: concern === c.id ? "2px solid #E8670A" : "1px solid #E5E7EB",
                    backgroundColor: concern === c.id ? "rgba(232,103,10,0.04)" : "#fff",
                  }}
                >
                  <input type="radio" name="concern" value={c.id} checked={concern === c.id} onChange={() => setConcern(c.id)} className="sr-only" />
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border-2" style={{ borderColor: concern === c.id ? "#E8670A" : "#D1D5DB" }}>
                    {concern === c.id && <span className="block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#E8670A" }} />}
                  </span>
                  <span className="text-sm" style={{ color: "#1A1A2E", fontWeight: concern === c.id ? 600 : 400 }}>{c.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* How long experiencing */}
          {concern && (
            <div className="animate-fade-in">
              <label className="mb-3 block text-sm font-medium" style={{ color: "#555555" }}>How long experiencing? <span style={{ color: "#DC2626" }}>*</span></label>
              <div className="space-y-2">
                {durations.map((d) => (
                  <label
                    key={d}
                    className="flex cursor-pointer items-center gap-3 rounded-xl bg-white p-4 transition-all"
                    style={{
                      border: duration === d ? "2px solid #E8670A" : "1px solid #E5E7EB",
                      backgroundColor: duration === d ? "rgba(232,103,10,0.04)" : "#fff",
                    }}
                  >
                    <input type="radio" name="duration" value={d} checked={duration === d} onChange={() => setDuration(d)} className="sr-only" />
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border-2" style={{ borderColor: duration === d ? "#E8670A" : "#D1D5DB" }}>
                      {duration === d && <span className="block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#E8670A" }} />}
                    </span>
                    <span className="text-sm" style={{ color: "#1A1A2E", fontWeight: duration === d ? 600 : 400 }}>{d}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Tried other treatments */}
          {concern && duration && (
            <div className="animate-fade-in">
              <label className="mb-3 block text-sm font-medium" style={{ color: "#555555" }}>Tried other treatments? <span style={{ color: "#DC2626" }}>*</span></label>
              <div className="flex gap-3">
                {([{ value: true, label: "Yes" }, { value: false, label: "No" }] as const).map((opt) => (
                  <label
                    key={String(opt.value)}
                    className="flex flex-1 cursor-pointer items-center gap-2.5 rounded-xl bg-white p-4 transition-all"
                    style={{
                      border: triedOther === opt.value ? "2px solid #E8670A" : "1px solid #D1D5DB",
                      backgroundColor: triedOther === opt.value ? "rgba(232,103,10,0.04)" : "#fff",
                    }}
                  >
                    <input type="radio" name="triedOther" checked={triedOther === opt.value} onChange={() => setTriedOther(opt.value)} className="sr-only" />
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border-2" style={{ borderColor: triedOther === opt.value ? "#E8670A" : "#D1D5DB" }}>
                      {triedOther === opt.value && <span className="block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#E8670A" }} />}
                    </span>
                    <span className="text-sm font-medium" style={{ color: "#1A1A2E" }}>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Group A - Contact details (shown after top questions) */}
        {topQuestionsComplete && (
          <div className="animate-fade-in mb-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase" style={{ color: "#555555", letterSpacing: "0.08em" }}>Email Address</label>
              <input
                style={{ height: 52, borderRadius: 10, backgroundColor: "#fff", border: "1px solid #D1D5DB", color: "#1A1A2E", padding: "0 16px", fontSize: 16, width: "100%", outline: "none" }}
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                onFocus={(e) => { e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,103,10,0.15)"; e.currentTarget.style.borderColor = "#E8670A"; }}
                onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#D1D5DB"; }}
              />
              {emailError && <p className="mt-1 text-xs" style={{ color: "#DC2626" }}>{emailError}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase" style={{ color: "#555555", letterSpacing: "0.08em" }}>How did you hear about us?</label>
              <CustomSelect value={referral} onChange={setReferral} options={referralOptions} placeholder="Select one…" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase" style={{ color: "#555555", letterSpacing: "0.08em" }}>Preferred Location</label>
              <CustomSelect value={location} onChange={setLocation} options={locationOptions} placeholder="Select a location…" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase" style={{ color: "#555555", letterSpacing: "0.08em" }}>Preferred Contact Method</label>
              <div className="flex gap-3">
                {([{ value: "voice", label: "Voice Call" }, { value: "sms", label: "Text / SMS" }] as const).map((opt) => (
                  <label
                    key={opt.value}
                    className="flex flex-1 cursor-pointer items-center gap-2.5 rounded-xl bg-white p-4 transition-all"
                    style={{
                      border: contactMethod === opt.value ? "2px solid #E8670A" : "1px solid #D1D5DB",
                      backgroundColor: contactMethod === opt.value ? "rgba(232,103,10,0.04)" : "#fff",
                    }}
                  >
                    <input type="radio" name="contactMethod" value={opt.value} checked={contactMethod === opt.value} onChange={() => setContactMethod(opt.value)} className="sr-only" />
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border-2" style={{ borderColor: contactMethod === opt.value ? "#E8670A" : "#D1D5DB" }}>
                      {contactMethod === opt.value && <span className="block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#E8670A" }} />}
                    </span>
                    <span className="text-sm font-medium" style={{ color: "#1A1A2E" }}>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Medical Screener */}
        {showGroupC && concern && screenerQuestions.length > 0 && (
          <div className="animate-fade-in mb-6 rounded-2xl bg-white p-5" style={{ border: "1px solid #E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <p className="mb-4 text-xs font-medium uppercase" style={{ color: "#888888", letterSpacing: "0.06em" }}>
              Safety screening so our physicians can prepare for your visit
            </p>
            {screenerQuestions.map((q) => (
              <YNPills key={q} question={q} />
            ))}
          </div>
        )}

        {/* CTA */}
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="mt-4 flex w-full items-center justify-center gap-2 font-bold transition-all"
          style={{
            height: 56, borderRadius: 9999, backgroundColor: canSubmit ? "#E8670A" : "rgba(0,0,0,0.12)",
            color: canSubmit ? "#fff" : "rgba(0,0,0,0.35)", fontSize: 16, cursor: canSubmit ? "pointer" : "not-allowed", border: "none",
          }}
          onMouseEnter={(e) => { if (canSubmit) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.backgroundColor = "#D45A06"; } }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; if (canSubmit) e.currentTarget.style.backgroundColor = "#E8670A"; }}
        >
          See Available Times <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
