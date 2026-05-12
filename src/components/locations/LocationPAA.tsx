import { useState } from "react";
import { Plus } from "lucide-react";
import type { LocationData } from "@/data/locations";

const getPAAQuestions = (city: string) => [
  {
    question: "What is the normal testosterone level for a man my age?",
    answer: "Normal testosterone ranges are 300-1,000 ng/dL, but 'normal' doesn't mean 'optimal.' Many men with levels in the 300-400 range experience significant symptoms. At Men's Wellness Centers, we look at free testosterone, SHBG, and estradiol, not just total T, to get the full picture.",
  },
  {
    question: "How long does it take for testosterone therapy to work?",
    answer: "Most men notice improved energy and mood within 2-4 weeks. Sexual function improvements typically appear at 4-6 weeks. Body composition changes (more muscle, less fat) become measurable at 8-12 weeks. Full optimization usually occurs by 3-6 months with consistent treatment and monitoring.",
  },
  {
    question: "Can I get TRT if my testosterone is 'normal' but I still have symptoms?",
    answer: "Yes, this is actually one of the most common scenarios we see. Many men fall in a 'sub-optimal' range where they're technically 'normal' but symptomatic. Our physicians evaluate the full clinical picture: your symptoms, lifestyle, complete hormone panel, and health goals, not just a single number.",
  },
  {
    question: "Is TRT covered by insurance?",
    answer: `Men's Wellness Centers operates on a direct-pay model. We don't bill insurance. This means no prior authorizations, no referral requirements, and no insurance company deciding your treatment. Many members use FSA or HSA accounts. Our all-inclusive pricing often costs less than insurance copays + deductibles for comparable care.`,
  },
];

interface Props {
  location: LocationData;
}

export const LocationPAA = ({ location }: Props) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const questions = getPAAQuestions(location.city);

  const cityLabel = location.slug === "richmond-va" ? "Richmond" :
    location.slug === "newport-news-va" ? "Hampton Roads" : "Virginia Beach";

  return (
    <section className="py-16 md:py-24" style={{ background: "#FFFFFF" }}>
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <h2
          className="font-bold text-base md:text-lg uppercase tracking-wide text-center mb-8 md:mb-12"
          style={{ color: "#000033" }}
        >
          What {cityLabel} Men Want to Know
        </h2>

        <div>
          {questions.map((q, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.10)" }}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="py-4 md:py-5 flex justify-between items-center cursor-pointer w-full bg-transparent border-none hover:bg-[#F5F4F2] rounded-lg px-2 -mx-2 transition-colors"
                  aria-expanded={isOpen}
                >
                  <h3 className="font-medium text-[14px] md:text-base text-left pr-4" style={{ color: "#000033" }}>
                    {q.question}
                  </h3>
                  <Plus
                    size={20}
                    strokeWidth={2.5}
                    className="flex-shrink-0"
                    style={{
                      color: "#000033",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 200ms ease",
                    }}
                  />
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? "400px" : "0",
                    opacity: isOpen ? 1 : 0,
                    overflow: "hidden",
                    transition: "max-height 300ms ease, opacity 200ms ease",
                  }}
                >
                  <p className="text-[13px] md:text-sm leading-relaxed pb-4 md:pb-5 px-2" style={{ color: "#666666" }}>
                    {q.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
