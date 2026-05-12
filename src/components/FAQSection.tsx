import { Helmet } from "react-helmet-async";
import { UnifiedFAQ } from "@/components/shared/UnifiedFAQ";

const faqs = [
  { question: "How much does testosterone therapy cost?", answer: "Testosterone therapy at Men's Wellness Centers starts with a no-cost consultation that includes comprehensive lab work. Treatment plans are customized to your needs, and our team will provide transparent pricing during your visit. We offer competitive pricing and flexible payment options. Contact us or book your no-cost consultation to get your personalized quote." },
  { question: "Do you accept insurance?", answer: "Men's Wellness Centers offers competitive self-pay pricing for all services. While we do not bill insurance directly, we can provide documentation that you may submit to your insurance provider for potential reimbursement. Many of our members find our pricing comparable to or less than typical insurance copays and deductibles for similar care." },
  { question: "What happens at my first visit?", answer: "Your first visit takes about 60 to 90 minutes. You'll meet face-to-face with a board-certified physician, have comprehensive blood work drawn in our CLIA-certified lab with results reviewed in-visit, and discuss your symptoms and health goals. If treatment is appropriate, you can start the same day. There's no obligation to start treatment, the consultation is at no cost." },
  { question: "Do I need a referral?", answer: "No. Men's Wellness Centers is a direct-access center. You can book your no-cost consultation without a referral from another physician. Simply schedule online or call any of our three Virginia locations." },
  { question: "Is testosterone therapy safe?", answer: "When properly monitored by a physician, testosterone therapy has a well-established safety profile. At Men's Wellness Centers, every member is evaluated individually, and treatment is supervised by board-certified physicians. We monitor your labs regularly and adjust protocols to optimize results while maintaining safety." },
  { question: "How quickly will I see results?", answer: "Most men begin noticing improvements in energy, mood, and sleep within 2 to 4 weeks of starting testosterone therapy. Full benefits, including body composition changes, improved libido, and cognitive clarity, typically develop over 3 to 6 months. Weight loss results vary based on the program, but many members see meaningful progress within the first month. Your provider will set realistic expectations based on your individual health profile." },
  { question: "How is Men's Wellness Centers different from online TRT providers?", answer: "We see you in person at every visit. We draw blood on-site with results reviewed in-visit (not mail-in kits), perform physical examinations, and your physician adjusts your protocol based on your labs and how you feel. We also treat ED, weight loss, and peptides under one roof." },
  { question: "Why choose Men's Wellness Centers over primary care?", answer: "Our physicians manage hormonal cases every single day. That means faster diagnosis, more targeted protocols, and providers who understand the nuances of men's health." },
  { question: "Am I a candidate for treatment?", answer: "Most men over 30 experiencing fatigue, weight gain, low libido, or brain fog are candidates. Book a no-cost consultation and we will run comprehensive labs on-site with results reviewed in-visit." },
  { question: "Who manages my care?", answer: "A board-certified Virginia physician oversees every treatment plan. Your provider reviews labs, adjusts dosing, and monitors progress at every visit." },
  { question: "Are follow-up visits included?", answer: "Yes. Unlimited office visits are included with your membership. Lab reviews, dosing adjustments, and check-ins are all covered with no extra fees." },
  { question: "What treatments do you offer?", answer: "Testosterone replacement therapy, erectile dysfunction treatment, GLP-1 weight loss, peptide therapy, anti-aging protocols, and comprehensive hormone optimization." },
  { question: "Where are your locations?", answer: "We have three Virginia centers: Richmond (Glen Allen), Newport News, and Virginia Beach. All locations offer the same full range of services with same-day lab capabilities." },
];

const aggregateRatingSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "@id": "https://mwcv2.lovable.app/#organization",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "200",
    bestRating: "5",
    worstRating: "1",
  },
};

export const FAQSection = () => {
  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(aggregateRatingSchema)}</script>
      </Helmet>
      <UnifiedFAQ
        title="FREQUENTLY ASKED QUESTIONS"
        faqs={faqs}
        showSchema
        defaultOpenIndex={0}
      />
    </>
  );
};
