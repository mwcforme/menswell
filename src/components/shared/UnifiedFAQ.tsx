import { useState } from "react";
import { ChevronRight, Phone, MessageCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQGroup {
  label: string;
  items: FAQItem[];
}

interface UnifiedFAQProps {
  title: string;
  subtitle?: string;
  faqs?: FAQItem[];
  groups?: FAQGroup[];
  showContactCTA?: boolean;
  showSchema?: boolean;
  defaultOpenIndex?: number | null;
}

export const UnifiedFAQ = ({
  title,
  subtitle,
  faqs,
  groups,
  showContactCTA = false,
  showSchema = false,
  defaultOpenIndex = null,
}: UnifiedFAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const allFaqs: FAQItem[] = groups
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

  const renderItem = (faq: FAQItem, globalIdx: number) => {
    const isOpen = openIndex === globalIdx;
    return (
      <div key={globalIdx} style={{ borderBottom: "1px solid rgba(0,0,0,0.10)" }}>
        <button
          type="button"
          onClick={() => setOpenIndex(isOpen ? null : globalIdx)}
          className="py-4 md:py-5 flex justify-between items-center cursor-pointer w-full bg-transparent border-none hover:bg-[#E5E3DE] rounded-lg px-3 -mx-1 transition-colors"
          aria-expanded={isOpen}
        >
          <span
            className="font-medium text-[14px] md:text-base text-left pr-4"
            style={{ color: "#000033" }}
          >
            {faq.question}
          </span>
          <ChevronRight
            size={18}
            strokeWidth={2.5}
            className="flex-shrink-0"
            style={{
              color: "#E8670A",
              transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 200ms ease",
            }}
          />
        </button>
        <div
          style={{
            maxHeight: isOpen ? "500px" : "0",
            opacity: isOpen ? 1 : 0,
            overflow: "hidden",
            transition: "max-height 300ms ease, opacity 200ms ease",
          }}
        >
          <p
            className="text-[13px] md:text-sm leading-relaxed pb-4 md:pb-5 px-3"
            style={{ color: "#666666" }}
          >
            {faq.answer}
          </p>
        </div>
      </div>
    );
  };

  let globalIdx = 0;

  return (
    <section id="faq" style={{ background: "#EBEAE8", padding: "80px 0" }}>
      {showSchema && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        </Helmet>
      )}
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <h2
          className="font-bold text-base md:text-lg uppercase tracking-[0.05em] text-center mb-2"
          style={{ color: "#000033" }}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-center text-[14px] mb-8 md:mb-12" style={{ color: "#666" }}>
            {subtitle}
          </p>
        )}
        {!subtitle && <div className="mb-8 md:mb-12" />}

        <div>
          {groups
            ? groups.map((group, gi) => (
                <div key={gi}>
                  <div
                    style={{
                      borderLeft: "3px solid #F97316",
                      paddingLeft: 12,
                      marginTop: gi > 0 ? 32 : 0,
                      marginBottom: 16,
                    }}
                  >
                    <p
                      className="uppercase"
                      style={{
                        fontSize: 13,
                        letterSpacing: "0.12em",
                        color: "#0F2A4A",
                        fontWeight: 600,
                        margin: 0,
                      }}
                    >
                      {group.label}
                    </p>
                  </div>
                  {group.items.map((faq) => {
                    const el = renderItem(faq, globalIdx);
                    globalIdx++;
                    return el;
                  })}
                </div>
              ))
            : allFaqs.map((faq, i) => renderItem(faq, i))}
        </div>

        {showContactCTA && (
          <div className="text-center mt-10">
            <p className="text-base mb-5" style={{ color: "#666666" }}>
              Still have questions?
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="tel:8663444955"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-[15px] font-bold transition-all duration-200 hover:scale-[1.02]"
                style={{ background: "#000033", color: "#ffffff", textDecoration: "none" }}
              >
                <Phone size={16} /> Call 866-344-4955
              </a>
              <a
                href="sms:8663444955"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-[15px] font-bold transition-all duration-200 hover:scale-[1.02]"
                style={{
                  border: "2px solid #000033",
                  color: "#000033",
                  textDecoration: "none",
                  background: "transparent",
                }}
              >
                <MessageCircle size={16} /> Text Us
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
