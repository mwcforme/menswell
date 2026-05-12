import { UnifiedFAQ } from "@/components/shared/UnifiedFAQ";

export const OGWLFAQ = () => (
  <UnifiedFAQ
    title="COMMON QUESTIONS ABOUT MEDICAL WEIGHT LOSS"
    faqs={[
      { question: "What is GLP-1 therapy?", answer: "GLP-1 receptor agonists like Semaglutide are FDA-approved medications that reduce appetite and help your body burn stored fat more efficiently. They work by mimicking a natural hormone that regulates hunger." },
      { question: "How much weight can I lose?", answer: "Results vary, but clinical studies show average weight loss of 15 to 20% of body weight over 12 to 18 months. Many of our members see significant results within the first 3 to 4 months." },
      { question: "Are there side effects?", answer: "Some members experience mild nausea initially, which typically resolves as your body adjusts. Your physician monitors you monthly and adjusts dosing to minimize any side effects." },
      { question: "What does it cost?", answer: "Your initial consultation and evaluation are at no cost. Treatment plans are transparent with no hidden fees. FSA/HSA accepted." },
      { question: "Do I need to exercise?", answer: "Exercise helps accelerate results, but the medication works even without a strict workout regimen. Your physician will recommend a sustainable activity level based on your health." },
      { question: "How is this different from online weight loss providers?", answer: "We provide comprehensive in-person medical evaluation, monthly lab work, face-to-face physician follow-ups, and ongoing dosage optimization. Online providers simply can't match this level of care." },
    ]}
    showContactCTA
    defaultOpenIndex={0}
  />
);
