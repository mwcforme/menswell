import { Star, ShieldCheck } from "lucide-react";

const stats = [
  { value: "2–5×", label: "Increase in total testosterone within first 2 months" },
  { value: "84%", label: "Of patients report meaningful symptom improvement" },
];

const testimonials = [
  {
    quote:
      "Energy is back to where it was a decade ago. I'm sleeping better, focused at work, and the team actually answers when I call.",
    name: "Mark T.",
    city: "Richmond, VA",
  },
  {
    quote:
      "I was skeptical of any clinic that wasn't my regular doctor, but the in-person visit and on-site bloodwork made it feel legit. Body comp has shifted noticeably alongside training.",
    name: "James R.",
    city: "Virginia Beach, VA",
  },
  {
    quote:
      "Mood and motivation were the biggest changes for me. The physician walked me through every number on the panel — first time anyone has actually done that.",
    name: "David K.",
    city: "Newport News, VA",
  },
];

export const TRTv2ReviewsOutcomes = () => (
  <section style={{ background: "#F5F0EB" }}>
    <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
      <h2 className="font-bold uppercase text-center" style={{ fontFamily: "Oswald, sans-serif", color: "#000033", fontSize: "clamp(26px, 3vw, 38px)", letterSpacing: "0.02em" }}>
        Patient Reviews & Outcomes
      </h2>

      {/* Outcome stats */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px] mx-auto">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl p-6 text-center" style={{ background: "#FFFFFF", border: "1px solid #E5E5EA" }}>
            <div className="font-bold" style={{ fontFamily: "Oswald, sans-serif", color: "#E8670A", fontSize: "clamp(36px, 4.5vw, 56px)", lineHeight: 1 }}>
              {s.value}
            </div>
            <div className="mt-3 text-sm leading-relaxed" style={{ color: "#1a1a2e", fontFamily: "Inter, sans-serif" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-center max-w-[760px] mx-auto" style={{ color: "#5a5a6e", fontFamily: "Inter, sans-serif" }}>
        Based on internal patient outcomes data from 2022–2024. Individual results vary. Treatment outcomes depend on adherence, baseline labs, and individual health factors.
      </p>

      {/* Testimonials */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.name} className="rounded-2xl p-6 flex flex-col" style={{ background: "#FFFFFF", border: "1px solid #E5E5EA" }}>
            <div className="flex items-center gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4" fill="#FFC107" stroke="#FFC107" />)}
            </div>
            <p className="text-sm leading-relaxed flex-1" style={{ color: "#1a1a2e", fontFamily: "Inter, sans-serif" }}>
              "{t.quote}"
            </p>
            <div className="mt-4 pt-4 border-t" style={{ borderColor: "#E5E5EA" }}>
              <div className="text-sm font-semibold" style={{ color: "#000033", fontFamily: "Inter, sans-serif" }}>{t.name}</div>
              <div className="text-xs" style={{ color: "#7a7a8e", fontFamily: "Inter, sans-serif" }}>{t.city}</div>
              <div className="mt-2 inline-flex items-center gap-1 text-[10px] uppercase font-semibold px-2 py-0.5 rounded" style={{ background: "#E8F5E9", color: "#1B5E20", letterSpacing: "0.08em" }}>
                <ShieldCheck className="h-3 w-3" /> Verified Patient Review
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href="https://www.google.com/search?q=Men%27s+Wellness+Centers+Virginia+reviews"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold underline underline-offset-4"
          style={{ color: "#000033", fontFamily: "Inter, sans-serif" }}
        >
          Read all 200+ reviews on Google →
        </a>
      </div>
    </div>
  </section>
);
