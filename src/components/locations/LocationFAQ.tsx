import { Helmet } from "react-helmet-async";
import { UnifiedFAQ } from "@/components/shared/UnifiedFAQ";
import type { FAQGroup } from "@/components/shared/UnifiedFAQ";
import type { LocationData } from "@/data/locations";

interface Props {
  location: LocationData;
}

const FAQ_GROUPS: Record<string, { label: string; questions: string[] }[]> = {
  "richmond-va": [
    {
      label: "About Our Richmond Center",
      questions: [
        "What services does Men's Wellness Centers in Richmond offer?",
        "How do I book a no-cost consultation at the Richmond center?",
        "What should I expect at my first visit in Richmond?",
        "What are the hours for Men's Wellness Centers Richmond?",
        "Where is Men's Wellness Centers in Richmond located?",
        "Is parking available at the Richmond location?",
        "Is the Richmond center the original Men's Wellness Centers location?",
      ],
    },
    {
      label: "Treatment & Medical Questions",
      questions: [
        "How much does testosterone therapy cost at Men's Wellness Centers?",
        "Is testosterone therapy safe? What are the risks?",
        "What is the normal testosterone level for a man my age?",
        "How long does it take for testosterone therapy to work?",
        "Can I get TRT if my testosterone is 'normal' but I still have symptoms?",
      ],
    },
    {
      label: "Insurance, Referrals & Getting Started",
      questions: [
        "Do I need a referral to visit the Richmond Men's Wellness Centers?",
        "Does the Richmond center accept FSA or HSA?",
        "Is TRT covered by insurance?",
        "How is Men's Wellness Centers different from online TRT services?",
      ],
    },
  ],
  "newport-news-va": [
    {
      label: "About Our Newport News Center",
      questions: [
        "What services does Men's Wellness Centers in Newport News offer?",
        "How do I book a no-cost consultation at the Newport News center?",
        "What should I expect at my first visit in Newport News?",
        "What are the hours for Men's Wellness Centers Newport News?",
        "Where is Men's Wellness Centers in Newport News?",
        "Is parking available at the Newport News location?",
        "Why is the Newport News location closed on Wednesdays?",
        "Does the Newport News location serve Hampton and Williamsburg?",
      ],
    },
    {
      label: "Treatment & Medical Questions",
      questions: [
        "How much does testosterone therapy cost at Men's Wellness Centers?",
        "Is testosterone therapy safe? What are the risks?",
        "How long does it take for testosterone therapy to work?",
        "Can I get TRT if my testosterone is 'normal' but I still have symptoms?",
      ],
    },
    {
      label: "Insurance, Referrals & Getting Started",
      questions: [
        "Do I need a referral to visit the Newport News Men's Wellness Centers?",
        "Does the Newport News center accept FSA or HSA?",
        "Is TRT covered by insurance?",
        "How is Men's Wellness Centers different from online TRT services?",
      ],
    },
  ],
  "virginia-beach-va": [
    {
      label: "About Our Virginia Beach Center",
      questions: [
        "What services does Men's Wellness Centers in Virginia Beach offer?",
        "How do I book a no-cost consultation at the Virginia Beach center?",
        "What should I expect at my first visit in Virginia Beach?",
        "What are the hours for Men's Wellness Centers Virginia Beach?",
        "Where is Men's Wellness Centers in Virginia Beach?",
        "Is parking available at the Virginia Beach location?",
        "Does the Virginia Beach center serve Norfolk and Chesapeake?",
      ],
    },
    {
      label: "Treatment & Medical Questions",
      questions: [
        "How much does testosterone therapy cost at Men's Wellness Centers?",
        "Is testosterone therapy safe? What are the risks?",
        "How long does it take for testosterone therapy to work?",
        "Can I get TRT if my testosterone is 'normal' but I still have symptoms?",
      ],
    },
    {
      label: "Military, Insurance & Getting Started",
      questions: [
        "Do you serve active military and veterans at the Virginia Beach location?",
        "Can active military members get TRT at Men's Wellness Centers?",
        "Do I need a referral to visit the Virginia Beach Men's Wellness Centers?",
        "Does the Virginia Beach center accept FSA or HSA?",
        "How is Men's Wellness Centers different from online TRT services?",
      ],
    },
  ],
};

export const LocationFAQ = ({ location }: Props) => {
  const groupConfig = FAQ_GROUPS[location.slug];

  const groups: FAQGroup[] | undefined = groupConfig
    ? groupConfig.map((g) => ({
        label: g.label,
        items: g.questions
          .map((q) => location.faqs.find((f) => f.question === q))
          .filter(Boolean)
          .map((f) => ({ question: f!.question, answer: f!.answer })),
      }))
    : undefined;

  const faqs = !groups
    ? location.faqs.map((f) => ({ question: f.question, answer: f.answer }))
    : undefined;

  const allFaqs = groups
    ? groups.flatMap((g) => g.items)
    : faqs || [];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <UnifiedFAQ
        title="FREQUENTLY ASKED QUESTIONS"
        subtitle={`Common questions from men in the ${location.city} area`}
        groups={groups}
        faqs={faqs}
      />
    </>
  );
};
