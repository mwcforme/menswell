import { UnifiedFAQ } from "@/components/shared/UnifiedFAQ";

const faqs = [
  { question: "How much does TRT cost?", answer: "We'll give you a clear breakdown during your no-cost consultation — no hidden fees. Treatment plans start at $199/month after approval." },
  { question: "Is TRT safe? What about long-term commitment?", answer: "When administered under proper medical supervision, TRT has a well-established safety profile. We're LegitScript certified as of 2025, independently verified by the same organization that vets providers for Google and Microsoft. We provide comprehensive monitoring throughout, tracking your levels and health markers to help ensure optimal outcomes with minimal risk." },
  { question: "How long until I see results?", answer: "Many members report improvements in energy and mood within 2-4 weeks. Full benefits, including improved body composition, libido, and mental clarity, typically develop over 3-6 months. Individual results vary based on health history and treatment adherence." },
  { question: "How is this different from online TRT services like Hone or Fountain TRT?", answer: "Online services ship medication after a questionnaire. We provide comprehensive, in-person medical care. You get a real doctor-patient relationship, thorough testing, personalized protocols, and ongoing monitoring. We're also LegitScript certified, which means our business practices, licensing, and medical protocols have been independently verified. Most online TRT mills can't say that." },
  { question: "Is this covered by insurance?", answer: "No. We operate outside of insurance so we can provide the level of care, testing, and physician access that insurance-based centers don't. All consultations and treatments are conducted in person at our Virginia centers in Richmond, Newport News, or Virginia Beach." },
];

const GHLTRTFAQ = () => (
  <UnifiedFAQ
    title="FREQUENTLY ASKED QUESTIONS"
    faqs={faqs}
    defaultOpenIndex={null}
  />
);

export default GHLTRTFAQ;
