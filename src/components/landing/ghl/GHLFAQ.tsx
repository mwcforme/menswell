import { UnifiedFAQ } from "@/components/shared/UnifiedFAQ";
import type { GHLVerticalConfig } from "@/data/ghl-config";

interface Props { config: GHLVerticalConfig }

const GHLFAQ = ({ config }: Props) => (
  <UnifiedFAQ
    title="FREQUENTLY ASKED QUESTIONS"
    faqs={config.faqs.map((faq) => ({ question: faq.q, answer: faq.a }))}
    defaultOpenIndex={null}
  />
);

export default GHLFAQ;
