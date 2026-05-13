import { useMemo, useState } from "react";
import { Loader2, Lock, ChevronDown } from "lucide-react";
import { useLeadSubmitController } from "@/domain/leads/useLeadSubmitController";
import { heroLeadSchema, type HeroLeadInput } from "@/domain/leads/leadFormSchema";
import { getBookingState, toQueryString, updateBookingState } from "@/lib/bookingState";

/**
 * /quiz — Low-T self assessment, modeled on the AMS questionnaire.
 * Inspired by jointitan.com/quiz: 0-3 scale across 7 symptom domains,
 * progress bar, then a contact-capture gate that routes to the booking funnel.
 */

interface QuizItem {
  id: string;
  label: string;
}
interface QuizSection {
  id: string;
  title: string;
  blurb: string;
  items: QuizItem[];
}

const SECTIONS: QuizSection[] = [
  {
    id: "energy",
    title: "Low Energy / Mood / Cognitive Function",
    blurb: "Often the first sign of changing testosterone levels.",
    items: [
      { id: "fatigue", label: "Fatigue" },
      { id: "depression", label: "Depression" },
      { id: "irritability", label: "Irritability" },
      { id: "anxiety", label: "Anxiety" },
      { id: "brain_fog", label: "Brain fog or poor focus" },
    ],
  },
  {
    id: "body",
    title: "Weight, Muscle, Body Composition",
    blurb: "Testosterone regulates fat distribution, muscle mass, and bone density.",
    items: [
      { id: "weight_gain", label: "Weight gain" },
      { id: "weight_loss", label: "Unintended weight loss" },
      { id: "muscle_loss", label: "Muscle loss" },
      { id: "bone_loss", label: "Bone loss" },
    ],
  },
  {
    id: "sexual",
    title: "Sexual Health and Reproductive Function",
    blurb: "Testosterone drives desire, performance, and overall sexual health.",
    items: [
      { id: "libido", label: "Low sex drive" },
      { id: "erectile", label: "Erectile difficulty" },
      { id: "fertility", label: "Fertility challenges" },
    ],
  },
  {
    id: "skin",
    title: "Skin and Hair Changes",
    blurb: "Testosterone keeps skin firm and hair full. When levels fall, it shows.",
    items: [
      { id: "brittle_hair", label: "Dry or brittle hair" },
      { id: "skin_dry", label: "Dry or oily skin" },
      { id: "hair_loss", label: "Thinning hair or hair loss" },
    ],
  },
  {
    id: "circulation",
    title: "Circulation and Body Temperature",
    blurb: "Cold hands, slower recovery, and reduced stamina can signal low T.",
    items: [
      { id: "cold_body", label: "Feeling cold" },
      { id: "cold_extremities", label: "Cold hands or feet" },
      { id: "palpitations", label: "Irregular heartbeat or palpitations" },
    ],
  },
  {
    id: "pain",
    title: "Chronic Pain or Headaches",
    blurb: "Testosterone helps regulate inflammation. When it drops, discomfort rises.",
    items: [
      { id: "aches", label: "Aches and pains" },
      { id: "headaches", label: "Headaches" },
    ],
  },
  {
    id: "digestive",
    title: "Digestive Issues",
    blurb: "Hormonal balance affects how efficiently your body absorbs nutrients.",
    items: [
      { id: "constipation", label: "Constipation" },
      { id: "bloating", label: "Bloating" },
      { id: "upset_stomach", label: "Upset stomach" },
    ],
  },
];

const TOTAL_ITEMS = SECTIONS.reduce((n, s) => n + s.items.length, 0);

const SCORE_OPTIONS = [0, 1, 2, 3] as const;

function bracket(score: number) {
  if (score <= 9) return { label: "Minimal", color: "#9CA3AF", note: "Symptoms are minimal. A baseline lab panel is still useful for men over 35." };
  if (score <= 19) return { label: "Mild", color: "#FACC15", note: "Symptoms suggest mild hormonal change. A clinical evaluation is recommended." };
  if (score <= 29) return { label: "Moderate", color: "#E8670A", note: "Symptoms align with moderate signs of low testosterone. Schedule an in-person evaluation." };
  return { label: "Severe", color: "#DC2626", note: "Symptoms align strongly with low testosterone. We recommend an in-person evaluation soon." };
}

const formatPhone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};

export default function TRTQuiz() {
  const [scores, setScores] = useState<Record<string, number>>({});
  const [phase, setPhase] = useState<"quiz" | "results">("quiz");

  const answered = Object.keys(scores).length;
  const progress = Math.min(100, Math.round((answered / TOTAL_ITEMS) * 100));
  const total = useMemo(() => Object.values(scores).reduce((a, b) => a + b, 0), [scores]);
  const result = bracket(total);

  function setScore(id: string, value: number) {
    setScores((s) => ({ ...s, [id]: value }));
  }

  function handleShowResults() {
    // Persist the score so it follows into the booking funnel.
    updateBookingState({ source: "quiz" });
    setPhase("results");
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  return (
    <main style={{ background: "#000814", minHeight: "100vh", color: "#F5F0EB", fontFamily: "Inter, sans-serif" }}>
      {/* Sticky progress bar */}
      <div className="sticky top-0 z-30" style={{ background: "rgba(0,8,20,0.92)", backdropFilter: "blur(8px)" }}>
        <div className="max-w-[860px] mx-auto px-6 py-4 flex items-center gap-4">
          <img src="/logos/Text_Logo_white.png" alt="Men's Wellness Centers" className="h-6 w-auto" />
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.10)" }}>
            <div
              className="h-full transition-all duration-300"
              style={{ width: `${progress}%`, background: "#E8670A" }}
            />
          </div>
          <div className="text-xs tabular-nums w-10 text-right" style={{ color: "#E8670A" }}>{progress}%</div>
        </div>
      </div>

      <div className="max-w-[860px] mx-auto px-6 pb-32 pt-10 md:pt-14">
        {phase === "quiz" ? (
          <QuizPhase
            scores={scores}
            setScore={setScore}
            onSubmit={handleShowResults}
            answered={answered}
          />
        ) : (
          <ResultsPhase total={total} result={result} />
        )}
      </div>
    </main>
  );
}

function QuizPhase({
  scores,
  setScore,
  onSubmit,
  answered,
}: {
  scores: Record<string, number>;
  setScore: (id: string, value: number) => void;
  onSubmit: () => void;
  answered: number;
}) {
  return (
    <>
      <header className="mb-10 md:mb-14">
        <div className="text-xs uppercase tracking-[0.18em] mb-4" style={{ color: "#E8670A" }}>
          60-Second Assessment
        </div>
        <h1 className="font-bold uppercase leading-[1.05]" style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(34px, 5.5vw, 56px)", letterSpacing: "0.01em" }}>
          See if testosterone replacement therapy is right for you.
        </h1>
        <p className="mt-5 text-base md:text-lg max-w-[640px]" style={{ color: "rgba(245,240,235,0.90)" }}>
          A short symptom inventory used by our clinical team. Score each item, then we will route you to a center near you for a proper in-person evaluation. Your answers are private.
        </p>
        <div className="mt-6 inline-flex items-center gap-3 rounded-md px-4 py-2 text-sm" style={{ background: "rgba(232,103,10,0.14)", border: "1px solid rgba(232,103,10,0.45)", color: "#FFB07A" }}>
          <span className="font-semibold">Score each symptom:</span>
          <span style={{ color: "rgba(245,240,235,0.90)" }}>0 none, 1 mild, 2 moderate, 3 severe</span>
        </div>
      </header>

      <div className="space-y-6">
        {SECTIONS.map((section, idx) => (
          <section
            key={section.id}
            className="rounded-2xl p-6 md:p-8"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-start justify-between gap-4 mb-1">
              <h2 className="font-semibold uppercase" style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(20px, 2.4vw, 26px)", letterSpacing: "0.02em" }}>
                {section.title}
              </h2>
              <div className="text-xs tabular-nums px-2 py-1 rounded" style={{ color: "rgba(245,240,235,0.55)", border: "1px solid rgba(255,255,255,0.10)" }}>
                {idx + 1} / {SECTIONS.length}
              </div>
            </div>
            <p className="text-sm mb-6" style={{ color: "rgba(245,240,235,0.62)" }}>
              {section.blurb}
            </p>

            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 md:gap-6 items-center">
                  <label className="text-sm md:text-[15px]" style={{ color: "rgba(245,240,235,0.92)" }}>
                    {item.label}
                  </label>
                  <div className="grid grid-cols-4 gap-2 md:w-[280px]">
                    {SCORE_OPTIONS.map((n) => {
                      const active = scores[item.id] === n;
                      return (
                        <button
                          key={n}
                          type="button"
                          aria-pressed={active}
                          aria-label={`${item.label}: ${n}`}
                          onClick={() => setScore(item.id, n)}
                          className="h-11 rounded-md text-sm font-semibold transition-colors"
                          style={{
                            background: active ? "#E8670A" : "rgba(255,255,255,0.04)",
                            color: active ? "#FFFFFF" : "rgba(245,240,235,0.78)",
                            border: `1px solid ${active ? "#E8670A" : "rgba(255,255,255,0.12)"}`,
                          }}
                        >
                          {n}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={onSubmit}
          disabled={answered === 0}
          className="w-full md:w-auto md:min-w-[320px] h-14 rounded-md font-bold uppercase tracking-[0.08em] text-base transition-opacity"
          style={{
            background: "#E8670A",
            color: "#FFFFFF",
            opacity: answered === 0 ? 0.5 : 1,
            cursor: answered === 0 ? "not-allowed" : "pointer",
            boxShadow: "0 12px 32px rgba(232,103,10,0.35)",
          }}
        >
          Get my results
        </button>
        <p className="text-xs" style={{ color: "rgba(245,240,235,0.55)" }}>
          {answered} of {TOTAL_ITEMS} answered. Unanswered items count as zero.
        </p>
      </div>
    </>
  );
}

function ResultsPhase({ total, result }: { total: number; result: ReturnType<typeof bracket> }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [tcpa, setTcpa] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const controller = useLeadSubmitController<HeroLeadInput>({
    schema: heroLeadSchema,
    source: "trt-quiz",
    tags: [`quiz_score:${total}`, `quiz_bracket:${result.label.toLowerCase()}`],
    toLeadInput: (v) => {
      const [first, ...rest] = v.name.trim().split(/\s+/);
      return {
        firstName: first || "Guest",
        lastName: rest.join(" ") || undefined,
        email: v.email,
        phone: v.phone,
      };
    },
    onSuccess: (_r, v) => {
      const merged = getBookingState();
      const qs = toQueryString({
        ...merged,
        location: v.location,
        service: "trt",
        note: `Quiz score ${total} of 84 (${result.label}).`,
      });
      window.location.assign(`/book/symptom?${qs}`);
    },
    toastOnError: false,
  });

  const errors = controller.fieldErrors;
  const isSubmitting = controller.isSubmitting;

  const inputBase = (field: string): React.CSSProperties => ({
    width: "100%",
    height: 50,
    background: "rgba(11,16,41,0.6)",
    border: `1px solid ${focused === field ? "#E8670A" : "rgba(245,240,235,0.20)"}`,
    borderRadius: 8,
    padding: "0 16px",
    fontSize: 15,
    color: "#F5F0EB",
    outline: "none",
    fontFamily: "Inter, sans-serif",
    transition: "border-color 150ms ease",
  });

  return (
    <div>
      <div className="text-xs uppercase tracking-[0.18em] mb-4" style={{ color: "#E8670A" }}>
        Your Results
      </div>
      <h1 className="font-bold uppercase leading-[1.05]" style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(34px, 5.5vw, 56px)", letterSpacing: "0.01em" }}>
        Score: <span style={{ color: result.color }}>{total}</span>
        <span className="text-2xl md:text-3xl ml-3 align-middle" style={{ color: "rgba(245,240,235,0.55)" }}>/ 84</span>
      </h1>
      <div className="mt-3 inline-block px-3 py-1 rounded text-xs uppercase tracking-[0.14em] font-semibold" style={{ background: `${result.color}22`, color: result.color, border: `1px solid ${result.color}55` }}>
        {result.label}
      </div>
      <p className="mt-5 text-base md:text-lg max-w-[640px]" style={{ color: "rgba(245,240,235,0.82)" }}>
        {result.note}
      </p>
      <p className="mt-3 text-xs" style={{ color: "rgba(245,240,235,0.55)" }}>
        This is not a diagnosis. Only a blood panel and clinical evaluation can confirm low testosterone. Individual results vary.
      </p>

      <div className="mt-10 rounded-2xl p-7 md:p-8" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 20px 60px rgba(0,0,0,0.45)" }}>
        <h2 className="font-bold uppercase mb-2" style={{ fontFamily: "Oswald, sans-serif", fontSize: 22, letterSpacing: "0.02em" }}>
          See your results with a provider
        </h2>
        <p className="text-sm mb-6" style={{ color: "rgba(245,240,235,0.7)" }}>
          Tell us where to send your results and we will hold a time at the center nearest you.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void controller.submit({ name, phone, email, location, tcpa });
          }}
          className="space-y-4"
        >
          <div>
            <input
              type="text"
              placeholder="Full name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setFocused("name")}
              onBlur={() => setFocused(null)}
              style={inputBase("name")}
            />
            {errors.name && <p className="mt-1 text-xs" style={{ color: "#FF8A8A" }}>{errors.name}</p>}
          </div>
          <div>
            <input
              type="tel"
              inputMode="tel"
              placeholder="(555) 555-5555"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              onFocus={() => setFocused("phone")}
              onBlur={() => setFocused(null)}
              style={inputBase("phone")}
            />
            {errors.phone && <p className="mt-1 text-xs" style={{ color: "#FF8A8A" }}>{errors.phone}</p>}
          </div>
          <div>
            <input
              type="email"
              inputMode="email"
              placeholder="Email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              style={inputBase("email")}
            />
            {errors.email && <p className="mt-1 text-xs" style={{ color: "#FF8A8A" }}>{errors.email}</p>}
          </div>
          <div className="relative">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onFocus={() => setFocused("location")}
              onBlur={() => setFocused(null)}
              style={{ ...inputBase("location"), appearance: "none", paddingRight: 40 }}
            >
              <option value="" disabled>Select nearest center</option>
              <option value="richmond">Richmond</option>
              <option value="newport-news">Newport News</option>
              <option value="virginia-beach">Virginia Beach</option>
            </select>
            <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "rgba(245,240,235,0.55)" }} />
            {errors.location && <p className="mt-1 text-xs" style={{ color: "#FF8A8A" }}>{errors.location}</p>}
          </div>

          <label className="flex items-start gap-3 text-xs leading-relaxed select-none" style={{ color: "rgba(245,240,235,0.72)" }}>
            <input
              type="checkbox"
              checked={tcpa}
              onChange={(e) => setTcpa(e.target.checked)}
              className="mt-0.5"
            />
            <span>
              I agree to be contacted by Men's Wellness Centers by phone, text, or email about my appointment. Message and data rates may apply. Consent is not a condition of purchase. See our <a href="/tcpa" className="underline">TCPA disclosure</a> and <a href="/privacy-policy" className="underline">privacy policy</a>.
            </span>
          </label>
          {errors.tcpa && <p className="text-xs" style={{ color: "#FF8A8A" }}>{errors.tcpa}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 rounded-md font-bold uppercase tracking-[0.08em] text-base transition-opacity flex items-center justify-center gap-2"
            style={{
              background: "#E8670A",
              color: "#FFFFFF",
              opacity: isSubmitting ? 0.7 : 1,
              boxShadow: "0 12px 32px rgba(232,103,10,0.35)",
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Sending
              </>
            ) : (
              <>Continue to scheduling</>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-xs" style={{ color: "rgba(245,240,235,0.55)" }}>
            <Lock size={12} /> Your information is private and HIPAA-aware.
          </div>
        </form>
      </div>
    </div>
  );
}
