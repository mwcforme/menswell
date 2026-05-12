import { UnifiedFAQ } from "@/components/shared/UnifiedFAQ";

export const TRTv2FAQ = () => (
  <UnifiedFAQ
    title="COMMON QUESTIONS ABOUT TRT"
    faqs={[
      { question: "Is TRT safe?", answer: "Yes. TRT is an FDA-recognized treatment prescribed and monitored by licensed physicians. At MWC, we run comprehensive labs before, during, and after treatment to ensure your safety." },
      { question: "How quickly will I see results?", answer: "Most men notice improved energy and mood within 2 to 4 weeks. Full results, including body composition and libido improvements, typically develop over 3 to 6 months." },
      { question: "What does it cost?", answer: "Your initial testosterone testing is at no cost. Treatment pricing is transparent with no hidden fees. We'll walk you through everything at your first visit." },
      { question: "Do I need a referral?", answer: "No. You can book directly with us. No referral, no prior labs, no hoops to jump through." },
      { question: "What happens at my first visit?", answer: "You'll meet privately with a physician, complete a quick blood draw, review your results the same day, and if you qualify, leave with a personalized treatment plan." },
      { question: "Is my visit private and confidential?", answer: "Absolutely. All visits are one-on-one in a private clinical setting. We are fully HIPAA-compliant." },
    ]}
    showContactCTA
    defaultOpenIndex={0}
  />
);
