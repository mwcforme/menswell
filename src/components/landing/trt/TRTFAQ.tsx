import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";

const faqs = [
  {
    q: "Does insurance cover this?",
    a: "Consults with our providers are always complimentary, including labs review and your care plan. We don't bill insurance directly, but we accept FSA and HSA. Many men find our straightforward process simpler than navigating insurance approvals.",
    cta: true,
  },
  {
    q: "What should I expect at my first visit?",
    a: "Plan for about 60 minutes. You'll have your labs drawn on-site, meet face-to-face with a licensed provider to review your symptoms and history, and leave with a personalized care plan. If treatment is clinically appropriate, it can often begin the same day.",
    cta: true,
  },
  {
    q: "What is included in my initial consult?",
    a: "Yes. Consultations with our providers are always at no cost. That includes a comprehensive hormone lab panel, a face-to-face visit with a licensed Virginia physician, and a personalized care plan based on your labs. You decide whether to begin treatment.",
  },
  {
    q: "How is this different from Hims, Hone, or online TRT?",
    a: "We are an in-person Virginia Center, not a telehealth app. You see the same physician at the same Center, your labs are drawn on-site, and your provider knows your case. No mail-order chatbots, no rotating clinicians, no shipping delays.",
  },
  {
    q: "How do I know if testosterone treatment is right for me?",
    a: "A diagnosis of low testosterone requires lab work and a clinical evaluation. At your first visit, we'll run a comprehensive hormone panel and review your symptoms. Treatment is only prescribed when clinically appropriate.",
  },
  {
    q: "What does treatment typically involve?",
    a: "Treatment plans are personalized based on your labs and symptoms. Common options include clinician-prescribed hormone therapy administered through several delivery methods. Your provider will review the options that fit your situation at your consultation.",
  },
  {
    q: "Is testosterone replacement therapy safe?",
    a: "TRT is FDA-approved when prescribed and monitored by a licensed provider for patients with clinically diagnosed low testosterone. Like any prescription treatment, it has potential side effects, which your provider will review with you. Ongoing lab monitoring is part of every care plan.",
  },
  {
    q: "How soon do patients typically notice changes?",
    a: "Many patients report initial changes in energy and mood within the first few weeks, with broader symptom improvements over 2 to 3 months. Individual results vary based on baseline labs, adherence, and individual health factors.",
  },
];

export const TRTFAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  const scrollToBooking = () => {
    const el = document.getElementById("booking") || document.getElementById("final-cta");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" style={{ background: "#F5F0EB" }}>
      <div className="max-w-[820px] mx-auto px-6 py-16 md:py-24">
        <h2 className="font-bold uppercase text-center" style={{ fontFamily: "Oswald, sans-serif", color: "#000033", fontSize: "clamp(26px, 3vw, 38px)", letterSpacing: "0.02em" }}>
          Frequently Asked Questions
        </h2>

        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="rounded-xl overflow-hidden" style={{ background: "#FFFFFF", border: "1px solid #E5E5EA" }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 cursor-pointer"
                  style={{ color: "#000033", fontFamily: "Inter, sans-serif" }}
                >
                  <span className="font-semibold text-base">{f.q}</span>
                  <ChevronDown className="h-5 w-5 flex-shrink-0 transition-transform duration-200" style={{ color: "#E8670A", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "#1a1a2e", fontFamily: "Inter, sans-serif" }}>
                    <p>{f.a}</p>
                    {f.cta && (
                      <button
                        onClick={scrollToBooking}
                        className="mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase cursor-pointer"
                        style={{ background: "#E8670A", color: "#FFFFFF", letterSpacing: "0.08em", border: "none" }}
                      >
                        Book My Consult <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </section>
  );
};
