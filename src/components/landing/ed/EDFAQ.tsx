import { UnifiedFAQ } from "@/components/shared/UnifiedFAQ";

export const EDFAQ = () => (
  <UnifiedFAQ
    title="COMMON QUESTIONS ABOUT ED TREATMENT"
    faqs={[
      { question: "Is my visit completely private?", answer: "Absolutely. All visits are one-on-one with a physician in a private clinical setting. We are fully HIPAA-compliant. No group settings, no waiting rooms with other members for the same service." },
      { question: "What treatment options are available?", answer: "We offer multiple treatment modalities including oral medications, injectable therapies, and combination protocols. Your physician determines the best approach based on your specific health profile." },
      { question: "How quickly will treatment work?", answer: "Many men notice significant improvement within days of starting treatment. Your physician will optimize your protocol during follow-up visits to ensure the best possible results." },
      { question: "What does it cost?", answer: "Your initial consultation is at no cost. Treatment pricing is transparent with no hidden fees. We accept FSA/HSA. We'll walk you through everything at your first visit." },
      { question: "Could ED be a sign of something else?", answer: "Yes. ED can be an early indicator of cardiovascular disease, diabetes, or hormonal imbalances. Our comprehensive evaluation screens for underlying conditions, making treatment about your total health, not just one symptom." },
      { question: "Do I need a referral?", answer: "No. You can book directly with us. No referral from your primary care physician needed. No prior labs required." },
    ]}
    showContactCTA
    defaultOpenIndex={0}
  />
);
