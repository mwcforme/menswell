export interface Badge {
  text: string;
  isHighlight?: boolean;
}

export interface Treatment {
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  price: string;
  description: string;
  badges: Badge[];
  icon: string;
  link: string;
  note?: string;
}

export interface ComparisonRow {
  service: string;
  icon: string;
  administration: string;
  benefits: string;
  howItWorks: string;
  timeline: string;
}

export const treatments: Treatment[] = [
  // Testosterone Therapy
  {
    name: "Testosterone Replacement Therapy",
    slug: "testosterone-replacement",
    category: "Testosterone Therapy",
    categorySlug: "testosterone-therapy",
    price: "$199/mo",
    badges: [{ text: "Hormone Health" }, { text: "Most Popular", isHighlight: true }],
    icon: "Shield",
    link: "/services/testosterone-therapy",
    description:
      "Physician-supervised testosterone injections with on-site monitoring at our Virginia centers. On-site labs, same-day treatment. Your protocol is built around your bloodwork — not a one-size-fits-all script.",
  },
  {
    name: "Enclomiphene Therapy",
    slug: "enclomiphene",
    category: "Testosterone Therapy",
    categorySlug: "testosterone-therapy",
    price: "$199/mo",
    badges: [{ text: "Hormone Health" }, { text: "Fertility Friendly" }],
    icon: "RefreshCw",
    link: "/services/testosterone-therapy",
    description:
      "Not ready for injections? Enclomiphene signals your body to produce more testosterone naturally. It's oral, preserves fertility, and for some men, it's exactly the right first step.",
  },
  {
    name: "Testosterone Pellets",
    slug: "testosterone-pellets",
    category: "Testosterone Therapy",
    categorySlug: "testosterone-therapy",
    price: "Contact for Pricing",
    badges: [{ text: "Hormone Health" }, { text: "Steady Support" }],
    icon: "Clock",
    link: "/services/testosterone-therapy",
    description:
      "Slow-release pellets implanted beneath the skin provide consistent testosterone delivery for months. Fewer visits, steady levels, minimal disruption to your routine.",
  },

  // Sexual Health
  {
    name: "Prescription ED Medications",
    slug: "ed-medications",
    category: "Sexual Health",
    categorySlug: "sexual-health",
    price: "$99/mo",
    badges: [{ text: "Sexual Health" }, { text: "Best Seller", isHighlight: true }],
    icon: "Heart",
    link: "/services/sexual-health",
    description:
      "Sildenafil. Tadalafil. Dispensed on-site, today. No awkward pharmacy pickups, no waiting for mail-order. Your Virginia physician writes the prescription and hands you the medication before you walk out.",
  },
  {
    name: "Intracavernosal Pharmacotherapy",
    slug: "icp",
    category: "Sexual Health",
    categorySlug: "sexual-health",
    price: "$199/mo",
    badges: [{ text: "Sexual Health" }, { text: "Advanced" }],
    icon: "Target",
    link: "/services/sexual-health",
    description:
      "When pills don't cut it, ICP delivers. Trimix and other injectable formulations work directly where you need them. Our clinical team trains you properly — most men are comfortable self-administering after one visit.",
  },
  {
    name: "ED Medication Troches",
    slug: "ed-troches",
    category: "Sexual Health",
    categorySlug: "sexual-health",
    price: "$149/mo",
    badges: [{ text: "Sexual Health" }],
    icon: "Sparkles",
    link: "/services/sexual-health",
    description:
      "These dissolve under your tongue — faster absorption, easier on your stomach. We compound them in multiple formulations so you get exactly what works for your situation.",
  },
  {
    name: "PT-141 Peptide Therapy",
    slug: "pt-141",
    category: "Sexual Health",
    categorySlug: "sexual-health",
    price: "$199/mo",
    badges: [{ text: "Sexual Health" }, { text: "Advanced" }],
    icon: "Flame",
    link: "/services/sexual-health",
    description:
      "PT-141 works differently than ED pills — it activates neural pathways linked to desire and arousal. For men whose drive has dropped alongside their performance, this targets the root.",
  },

  // Weight Loss
  {
    name: "Semaglutide Therapy",
    slug: "semaglutide",
    category: "Weight Loss",
    categorySlug: "weight-loss",
    price: "$399/mo",
    badges: [{ text: "Weight Loss" }, { text: "Most Popular", isHighlight: true }],
    icon: "TrendingDown",
    link: "/services/weight-loss",
    description:
      "The medication behind the headlines — now available at our Virginia centers. Semaglutide changes how your brain responds to hunger. Weekly injections, physician monitoring, and real accountability.",
  },
  {
    name: "Tirzepatide Therapy",
    slug: "tirzepatide",
    category: "Weight Loss",
    categorySlug: "weight-loss",
    price: "$499/mo",
    badges: [{ text: "Weight Loss" }, { text: "Premium" }],
    icon: "Gauge",
    link: "/services/weight-loss",
    description:
      "Tirzepatide targets two metabolic pathways instead of one. For men who've struggled with weight their whole lives, this dual-action approach often delivers what nothing else has.",
  },
  {
    name: "Phentermine",
    slug: "phentermine",
    category: "Weight Loss",
    categorySlug: "weight-loss",
    price: "$99/mo",
    badges: [{ text: "Weight Loss" }],
    icon: "Zap",
    link: "/services/weight-loss",
    description:
      "Sometimes you need something to break the cycle. Phentermine has been helping people lose weight since 1959 — it's not new, but it works. Best used short-term alongside real changes to how you eat and move.",
  },
  {
    name: "Phentermine + Topiramate",
    slug: "phentermine-topiramate",
    category: "Weight Loss",
    categorySlug: "weight-loss",
    price: "$149/mo",
    badges: [{ text: "Weight Loss" }, { text: "Combination" }],
    icon: "Layers",
    link: "/services/weight-loss",
    description:
      "Combining these two medications creates a different effect than either alone. The appetite control is stronger, the cravings quieter. We monitor carefully and adjust as your body responds.",
  },

  // Wellness & Vitality
  {
    name: "B-Complex Immune Boost",
    slug: "b-complex",
    category: "Wellness & Vitality",
    categorySlug: "wellness-vitality",
    price: "$99/mo",
    badges: [{ text: "Vitality" }, { text: "Best Seller", isHighlight: true }],
    icon: "Battery",
    link: "/services/wellness-vitality",
    description:
      "High-dose B vitamins hit differently when they go straight into the muscle. If you're dragging through the week or fighting off something, this helps. Quick in-office injection.",
  },
  {
    name: "NAD+ Injections",
    slug: "nad-plus",
    category: "Wellness & Vitality",
    categorySlug: "wellness-vitality",
    price: "$299/mo",
    badges: [{ text: "Vitality" }, { text: "Longevity" }],
    icon: "Dna",
    link: "/services/wellness-vitality",
    description:
      "NAD+ delivers heightened cellular energy, improved metabolism, and sharper focus by supporting key pathways linked to aging and performance. As NAD+ levels decline with age, restoring this coenzyme enhances resilience and recovery.",
  },
  {
    name: "MIC Injection",
    slug: "mic-injection",
    category: "Wellness & Vitality",
    categorySlug: "wellness-vitality",
    price: "$99/mo",
    badges: [{ text: "Vitality" }],
    icon: "Droplet",
    link: "/services/wellness-vitality",
    description:
      "Methionine, inositol, choline — three compounds that support liver function and help your body process fat. Often used alongside other weight loss treatments.",
  },

  // Included
  {
    name: "Same-Day Lab Results",
    slug: "same-day-labs",
    category: "Included Services",
    categorySlug: "included",
    price: "Included",
    badges: [{ text: "Included" }],
    icon: "FlaskConical",
    link: "/services",
    description:
      "Every visit includes on-site bloodwork with results reviewed before you leave. Testosterone, PSA, and key health markers — no waiting days for callbacks, no separate lab appointments.",
  },
];

export const categories = [
  { name: "All Services", slug: "" },
  { name: "Testosterone Therapy", slug: "testosterone-therapy" },
  { name: "Sexual Health", slug: "sexual-health" },
  { name: "Weight Loss", slug: "weight-loss" },
  { name: "Wellness & Vitality", slug: "wellness-vitality" },
];

export const comparisonData: ComparisonRow[] = [
  {
    service: "TRT Injections",
    icon: "Shield",
    administration: "In-center weekly injections, physician-supervised",
    benefits: "Improved energy, mood, strength, and body composition",
    howItWorks: "Exogenous testosterone with steady release via injection",
    timeline: "2-6 weeks to notice changes",
  },
  {
    service: "Enclomiphene",
    icon: "RefreshCw",
    administration: "Daily oral medication",
    benefits: "Natural testosterone boost while preserving fertility",
    howItWorks: "Stimulates your body's own hormone production",
    timeline: "4-8 weeks",
  },
  {
    service: "Testosterone Pellets",
    icon: "Clock",
    administration: "In-center procedure every 3-6 months",
    benefits: "Consistent levels with minimal visits",
    howItWorks: "Slow-release pellets implanted subcutaneously",
    timeline: "2-4 weeks",
  },
  {
    service: "ED Medications",
    icon: "Heart",
    administration: "Oral tablets, as needed or daily",
    benefits: "Stronger, more reliable erections",
    howItWorks: "PDE-5 inhibitors that enhance blood flow",
    timeline: "30-60 minutes per dose",
  },
  {
    service: "ICP (Trimix)",
    icon: "Target",
    administration: "Self-administered injection before intercourse",
    benefits: "Fast-acting erection support when pills fail",
    howItWorks: "Combination vasodilators increase penile blood flow",
    timeline: "5-15 minutes",
  },
  {
    service: "PT-141",
    icon: "Flame",
    administration: "Subcutaneous injection",
    benefits: "Increased sexual desire and arousal",
    howItWorks: "Activates neural pathways linked to libido",
    timeline: "30-90 minutes",
  },
  {
    service: "Semaglutide",
    icon: "TrendingDown",
    administration: "Weekly injection at center",
    benefits: "Reduced appetite, steady weight loss",
    howItWorks: "GLP-1 receptor agonist that regulates hunger signals",
    timeline: "4-8 weeks",
  },
  {
    service: "Tirzepatide",
    icon: "Gauge",
    administration: "Weekly injection at center",
    benefits: "Dual-action metabolic support, sustained fat loss",
    howItWorks: "Targets both GLP-1 and GIP receptors",
    timeline: "4-8 weeks",
  },
  {
    service: "Phentermine",
    icon: "Zap",
    administration: "Daily oral medication",
    benefits: "Short-term appetite suppression, energy boost",
    howItWorks: "Stimulates CNS to reduce hunger signals",
    timeline: "1-2 weeks",
  },
  {
    service: "Phentermine + Topiramate",
    icon: "Layers",
    administration: "Daily oral combination medication",
    benefits: "Enhanced appetite control, reduced cravings",
    howItWorks: "Dual mechanism: appetite suppression plus craving reduction",
    timeline: "2-4 weeks",
  },
  {
    service: "B-Complex",
    icon: "Battery",
    administration: "Quick in-center injection",
    benefits: "Energy, immune support, mood",
    howItWorks: "B vitamins delivered directly into muscle tissue",
    timeline: "Same day",
  },
  {
    service: "NAD+",
    icon: "Dna",
    administration: "In-center injection",
    benefits: "Cellular energy, mental clarity, recovery",
    howItWorks: "Restores declining NAD+ coenzyme levels",
    timeline: "1-2 weeks",
  },
  {
    service: "ED Troches",
    icon: "Sparkles",
    administration: "Sublingual troche, as needed",
    benefits: "Faster absorption, easier on the stomach",
    howItWorks: "Dissolves under tongue for rapid delivery of ED medication",
    timeline: "15-30 minutes",
  },
  {
    service: "MIC",
    icon: "Droplet",
    administration: "Quick in-center injection",
    benefits: "Fat metabolism, liver support",
    howItWorks: "Methionine, inositol, choline support fat processing",
    timeline: "Cumulative over weeks",
  },
];

export interface FAQ {
  question: string;
  answer: string;
}

export const faqData: FAQ[] = [
  { question: "How much does treatment cost?", answer: "Treatment plans are transparent and straightforward. Testosterone therapy starts at $199/month, ED medications at $99/month, and weight loss programs at $399/month. Your initial consultation and testosterone test are included at no extra cost. There are no hidden fees — follow-up visits, lab monitoring, and protocol adjustments are included in your plan." },
  { question: "What should I expect during my first visit?", answer: "Your first visit takes about 60 minutes. You'll meet face-to-face with a licensed Virginia physician, have your blood drawn on-site, and review your results before you leave. If treatment is appropriate, many men begin the same day. No referrals needed." },
  { question: "Who will be treating me?", answer: "You'll see a licensed Virginia physician at every visit — not a PA, not a nurse practitioner, not someone on a screen. The same doctor manages your care from your first visit through ongoing optimization." },
  { question: "Do I need a referral from my primary care doctor?", answer: "No. You can book directly with us. No referrals, no pre-approvals, no waiting for your PCP to return a call." },
  { question: "How quickly will I see results?", answer: "It depends on the treatment. Many men notice improvements in energy and mood within 2-4 weeks of starting TRT. ED medications work within 30-60 minutes. Weight loss results typically begin within the first month. Your physician will set realistic expectations based on your specific situation." },
  { question: "Do you accept insurance?", answer: "We do not bill insurance directly, but we provide documentation you can submit to your insurance company for potential reimbursement. Many HSA and FSA plans cover our services. Our transparent pricing means you'll know exactly what you're paying before treatment begins." },
  { question: "Is my information kept confidential?", answer: "Absolutely. We are fully HIPAA compliant. All medical records, lab results, and treatment details are protected. Our centers are designed for privacy — from separate consultation rooms to discreet check-in processes." },
  { question: "Can I combine different treatments?", answer: "Yes, and many men do. Your physician may recommend combining TRT with weight loss support, or ED treatment alongside hormone optimization. Every combination is medically supervised and adjusted based on your labs and response." },
  { question: "What's included in my treatment plan?", answer: "Your plan includes all physician consultations, on-site lab work, treatment administration, follow-up visits, and ongoing protocol adjustments. There are no surprise fees for check-ins or lab monitoring." },
  { question: "How often will I need to come in?", answer: "Most men visit every 1-2 weeks initially, then transition to monthly visits once their levels stabilize. Follow-up frequency is based on your treatment type and how your body responds." },
  { question: "Can I switch between your three locations?", answer: "Yes. Your medical records are accessible at all three Virginia locations — Richmond, Newport News, and Virginia Beach. Visit whichever center is most convenient." },
  { question: "What if treatment doesn't work for me?", answer: "Your physician will adjust your protocol based on follow-up labs and how you're feeling. If one approach isn't delivering results, we explore alternatives. There's no one-size-fits-all — that's the point of physician-supervised care." },
];

export const trtFaqs: FAQ[] = [
  { question: "What is testosterone replacement therapy?", answer: "TRT is a physician-supervised treatment that restores testosterone to healthy levels using injections, pellets, or oral medications. At Men's Wellness Centers, we test your levels on-site, review results the same day, and build a protocol around your specific bloodwork." },
  { question: "What are the signs of low testosterone?", answer: "Common signs include persistent fatigue, reduced sex drive, difficulty concentrating, irritability, increased body fat, and decreased muscle mass. Many men describe it as just not feeling like themselves anymore." },
  { question: "How quickly will I notice results from TRT?", answer: "Most men notice improvements in energy and mood within 2-4 weeks. Improvements in body composition and strength typically appear over 2-3 months. Full optimization often takes 3-6 months of consistent treatment." },
  { question: "Is TRT safe?", answer: "When supervised by a licensed physician with regular lab monitoring, TRT is considered safe for men with clinically low testosterone. We monitor your levels, PSA, hematocrit, and other markers at every follow-up to ensure you're in a healthy range." },
  { question: "Will TRT affect my fertility?", answer: "Standard testosterone injections can suppress sperm production. If fertility is a concern, we offer enclomiphene therapy, which boosts testosterone naturally while preserving sperm production. Your physician will discuss the best option for your situation." },
  { question: "What's the difference between injections and pellets?", answer: "Injections are administered weekly at our center for precise dosing control. Pellets are implanted every 3-6 months for steady, low-maintenance testosterone delivery. Both are effective — the best choice depends on your lifestyle and preferences." },
  { question: "Do I need blood work before starting?", answer: "Yes. We draw blood on-site during your first visit and review your testosterone, PSA, and key health markers before you leave. Treatment decisions are always based on your actual lab results, not symptoms alone." },
  { question: "How much does TRT cost?", answer: "Testosterone therapy starts at $199/month. This includes physician visits, lab monitoring, treatment administration, and ongoing protocol adjustments. Your initial consultation and testosterone test are included at no extra cost." },
  { question: "Can I stop TRT once I start?", answer: "Yes. TRT is not a lifetime commitment by default. If you choose to stop, your physician will guide you through a safe tapering protocol. Some men use TRT seasonally or for specific periods." },
  { question: "What makes your centers different from online TRT providers?", answer: "You see a real physician face-to-face at every visit. Your labs are drawn and reviewed on-site the same day. Your medication is dispensed before you leave. No video calls, no mail-order, no guessing. That's in-person care." },
];

export const sexualHealthFaqs: FAQ[] = [
  { question: "What causes erectile dysfunction?", answer: "ED can result from physical factors like reduced blood flow, hormonal shifts, or nerve changes, as well as psychological factors like stress or performance anxiety. Low testosterone is a common underlying cause that many men don't realize." },
  { question: "What ED treatments do you offer?", answer: "We offer prescription oral medications (sildenafil, tadalafil), sublingual troches for faster absorption, intracavernosal injections (Trimix/ICP) for men who don't respond to pills, and PT-141 peptide therapy for libido and arousal concerns." },
  { question: "Do I need to tell my regular doctor?", answer: "That's entirely up to you. Everything at our centers is confidential and HIPAA-compliant. We don't share information with other providers unless you ask us to." },
  { question: "How quickly do ED medications work?", answer: "Oral medications like sildenafil work within 30-60 minutes. Tadalafil can work within 30 minutes and lasts up to 36 hours. ICP injections work within 5-15 minutes. Your physician will recommend the best option for your needs." },
  { question: "What if pills don't work for me?", answer: "That's exactly when our ICP and troches options become valuable. Many men who don't respond to standard pills find excellent results with injectable or sublingual formulations. We don't stop at the first option." },
  { question: "Is ED treatment safe?", answer: "All of our ED treatments are FDA-approved and physician-supervised. We evaluate your cardiovascular health and medication interactions before prescribing. Regular monitoring ensures ongoing safety." },
  { question: "Can low testosterone cause ED?", answer: "Absolutely. Low testosterone is one of the most common and treatable causes of ED. We test your hormones during your first visit because treating the underlying hormonal issue often improves erectile function significantly." },
  { question: "How discreet is the process?", answer: "Completely. Our centers are designed for privacy — from separate consultation rooms to discreet check-in. Medications are dispensed on-site so there's no pharmacy pickup. Everything stays between you and your physician." },
  { question: "How much does ED treatment cost?", answer: "Prescription ED medications start at $99/month. ICP therapy is $199/month. PT-141 is $199/month. Your initial consultation is at no cost, and all follow-up visits are included in your plan." },
  { question: "Do I need lab work for ED treatment?", answer: "We recommend baseline bloodwork to check testosterone and other markers that may be contributing to ED. This is done on-site during your first visit with results reviewed in-visit." },
];

export const weightLossFaqs: FAQ[] = [
  { question: "How does medical weight loss work?", answer: "Our physician-supervised programs combine FDA-approved medications with regular monitoring to help you lose weight safely and sustainably. We start with bloodwork to understand your metabolism, prescribe the right medication, and adjust your protocol as your body responds." },
  { question: "What's the difference between semaglutide and tirzepatide?", answer: "Both are GLP-1 medications that reduce appetite and improve metabolic function. Semaglutide targets one receptor pathway. Tirzepatide targets two (GLP-1 and GIP), which often produces more significant results. Your physician will recommend the best option based on your health profile and goals." },
  { question: "How much weight can I expect to lose?", answer: "Results vary, but clinical studies show average weight loss of 15-20% of body weight with GLP-1 medications over 12-16 months. Combined with lifestyle changes, many men at our centers exceed these averages." },
  { question: "Is phentermine still prescribed?", answer: "Yes. Phentermine has been FDA-approved since 1959 and remains effective for short-term weight loss. We use it strategically — often as a kickstart while longer-acting medications take effect, or for men who need a defined treatment window." },
  { question: "Do I need to diet and exercise too?", answer: "Medication makes the process dramatically easier, but sustainable results come from building better habits alongside treatment. Your physician will discuss practical lifestyle adjustments — not extreme diets." },
  { question: "What are the side effects?", answer: "Common early side effects of GLP-1 medications include mild nausea, which typically resolves within 2-3 weeks. We start at low doses and titrate slowly to minimize side effects. Your physician monitors you closely throughout." },
  { question: "How long will I need treatment?", answer: "Most weight loss programs run 6-12 months depending on your goals. Some men transition to maintenance protocols after reaching their target. Your physician will create a timeline based on your specific situation." },
  { question: "Can I combine weight loss with TRT?", answer: "Yes, and many men do. Low testosterone often contributes to weight gain and makes losing weight harder. Optimizing your hormones while on a weight loss program can accelerate results and improve energy for exercise." },
  { question: "How much does it cost?", answer: "Semaglutide starts at $399/month. Tirzepatide starts at $499/month. Phentermine starts at $99/month. Initial consultation and bloodwork are included at no extra cost." },
  { question: "Do you accept HSA/FSA?", answer: "Yes, our weight loss programs are eligible for HSA and FSA payment. We provide all necessary documentation for your flexible spending account." },
];

export const wellnessVitalityFaqs: FAQ[] = [
  { question: "What are vitamin injections?", answer: "Vitamin injections deliver essential nutrients directly into your muscle tissue, bypassing the digestive system for immediate absorption. They're faster and more effective than oral supplements, especially for men with absorption issues or high-demand lifestyles." },
  { question: "What does NAD+ do?", answer: "NAD+ is a coenzyme found in every cell of your body that supports energy production, DNA repair, and cellular metabolism. Levels decline naturally with age. Restoring NAD+ through injection can improve energy, mental clarity, recovery, and overall resilience." },
  { question: "How often do I need vitamin injections?", answer: "Most men come in weekly or bi-weekly for their injection. Each visit takes less than 5 minutes. Your physician will recommend a frequency based on your bloodwork and how you're responding." },
  { question: "Can I combine vitamin injections with other treatments?", answer: "Absolutely. Many of our members pair B-Complex or MIC injections with TRT or weight loss programs for comprehensive support. Your physician coordinates everything into one plan." },
  { question: "Are there any side effects?", answer: "Side effects are rare and typically mild — occasional soreness at the injection site or a temporary energy boost. All injections are administered by our trained clinical staff." },
  { question: "Do I need bloodwork first?", answer: "We recommend baseline labs to identify any specific deficiencies. This helps us target the right nutrients for your body rather than guessing." },
  { question: "How quickly will I feel a difference?", answer: "Many men feel an energy boost within hours of a B-Complex injection. NAD+ benefits typically build over 1-2 weeks of consistent treatment. MIC injections work best as part of an ongoing regimen." },
  { question: "How much do vitamin injections cost?", answer: "B-Complex and MIC injections start at $99/month. NAD+ injections are $299/month. All follow-up visits and lab monitoring are included." },
  { question: "What's the difference between B-Complex and MIC?", answer: "B-Complex focuses on energy, immune function, and mood support. MIC (methionine, inositol, choline) targets fat metabolism and liver function. Some men benefit from both — your physician will recommend based on your goals." },
];

export const getComparisonDataForCategory = (slug: string): ComparisonRow[] => {
  const slugToServices: Record<string, string[]> = {
    "testosterone-therapy": ["TRT Injections", "Enclomiphene", "Testosterone Pellets"],
    "sexual-health": ["ED Medications", "ICP (Trimix)", "PT-141", "ED Troches"],
    "weight-loss": ["Semaglutide", "Tirzepatide", "Phentermine", "Phentermine + Topiramate"],
    "wellness-vitality": ["B-Complex", "NAD+", "MIC"],
  };
  const services = slugToServices[slug];
  if (!services) return comparisonData;
  return comparisonData.filter((row) => services.includes(row.service));
};