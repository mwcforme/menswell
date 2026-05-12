import type { LocationData } from "@/data/locations";

export interface CityServiceFAQ {
  question: string;
  answer: string;
}

export interface CityServiceTestimonial {
  quote: string;
  name: string;
  location: string;
}

export interface CityServiceStat {
  value: string;
  label: string;
  source?: string;
}

export interface CityServiceDifferentiator {
  title: string;
  body: string;
}

export interface CityServiceTreatmentItem {
  title: string;
  description: string;
}

export interface CityServiceConfig {
  serviceSlug: string;
  serviceName: string;
  serviceShortName: string;
  heroHeadline: (city: string) => string;
  heroSubtext: (city: string, phone: string) => string;
  heroImage: string;

  metaTitle: (city: string) => string;
  metaDescription: (city: string) => string;
  canonicalPath: (locationSlug: string) => string;

  differentiators: CityServiceDifferentiator[];
  comparisonPoints: string[];
  treatments: CityServiceTreatmentItem[];
  processSteps: (city: string, phone: string) => { num: string; title: string; body: string }[];
  stats: CityServiceStat[];
  faqs: (city: string, phone: string) => CityServiceFAQ[];
}

// ─── TRT Config ─────────────────────────────────────────────────

export const trtServiceConfig: CityServiceConfig = {
  serviceSlug: "testosterone-therapy",
  serviceName: "Testosterone Replacement Therapy",
  serviceShortName: "TRT",
  heroImage: "/images/services/testosterone.jpg",

  heroHeadline: (city) => `Testosterone Therapy in ${city}, VA`,
  heroSubtext: (city, phone) =>
    `Physician-supervised TRT with on-site labs, face-to-face consultations, and personalized protocols at our ${city} center. No referral needed. Call ${phone} or book online.`,

  metaTitle: (city) => `Testosterone Therapy in ${city}, VA | TRT Clinic | Men's Wellness Centers`,
  metaDescription: (city) =>
    `Board-certified TRT clinic in ${city}, VA. On-site labs, physician-led testosterone therapy, all-inclusive pricing. Consultation. Men's Wellness Centers.`,
  canonicalPath: (slug) => `/locations/${slug}/testosterone-therapy`,

  differentiators: [
    { title: "On-Site Labs & Treatment", body: "Walk in, get blood drawn in our CLIA-certified lab, and start TRT the same day if you qualify. No outside lab visits." },
    { title: "Board-Certified Physicians", body: "Your protocol is prescribed and monitored by a Virginia-licensed MD who specializes in hormone optimization, not an algorithm." },
    { title: "Personalized Protocols", body: "Your dosing is built around your labs, symptoms, and goals. We adjust based on follow-up bloodwork, not a one-size-fits-all script." },
    { title: "All-Inclusive Pricing", body: "Medication, labs, unlimited follow-ups, and physician oversight. One transparent monthly investment. No hidden fees." },
    { title: "No Contracts", body: "Month-to-month plans. Stay because it works, not because you're locked in." },
    { title: "On-Site Injections", body: "Prefer to have your injection administered by our clinical team? We offer in-office injections at every visit." },
  ],

  comparisonPoints: [
    "Face-to-face physician visits, not telehealth-only",
    "Same-day in-house labs with 15-minute results",
    "Personalized dosing based on your bloodwork",
    "Unlimited follow-up visits included",
    "No contracts or long-term commitments",
    "On-site medication dispensing",
  ],

  treatments: [
    { title: "Testosterone Cypionate Injections", description: "The gold standard for TRT. Weekly or bi-weekly intramuscular injections with physician-guided dosing." },
    { title: "Enclomiphene Therapy", description: "An oral alternative that stimulates your body's own testosterone production. Ideal for men who want to preserve fertility." },
    { title: "Testosterone Pellets", description: "Subcutaneous pellets inserted every 3-4 months for steady, hassle-free hormone levels." },
    { title: "HCG Therapy", description: "Often paired with TRT to maintain testicular function and fertility during testosterone therapy." },
    { title: "Estrogen Management", description: "Anastrozole and other estrogen blockers to keep your hormone ratios optimized." },
    { title: "Ongoing Lab Monitoring", description: "Comprehensive hormone panels every 90 days to track progress and fine-tune your protocol." },
  ],

  processSteps: (city, phone) => [
    { num: "1", title: "Book Your Visit", body: `Schedule online or call ${phone}. Walk into our ${city} center and sit down with a board-certified physician. No referral needed.` },
    { num: "2", title: "On-Site Labs", body: "We draw blood on-site in our CLIA-certified lab and have your full hormone panel back within the hour. No separate lab trips." },
    { num: "3", title: "Start Treatment", body: "If you qualify, your physician prescribes a personalized TRT protocol and you can receive your first injection the same day." },
  ],

  stats: [
    { value: "3x", label: "Average increase in total testosterone within 90 days", source: "MWC clinical data, 2024-2025" },
    { value: "87%", label: "Report improved energy and mood within 30 days", source: "Member-reported outcomes survey" },
    { value: "4-6 wks", label: "Typical timeline for sexual function improvement", source: "Endocrine Society Guidelines" },
  ],

  faqs: (city, phone) => [
    { question: `What does testosterone therapy cost at Men's Wellness Centers ${city}?`, answer: `Your initial consultation and blood work are at no cost. TRT plans are all-inclusive: medication, labs, unlimited follow-ups, and physician oversight for one monthly price. No hidden fees. Call ${phone} for current pricing.` },
    { question: "How do I know if I need testosterone therapy?", answer: "Common signs of low testosterone include fatigue, low libido, brain fog, weight gain, irritability, and difficulty building muscle. We diagnose with a comprehensive blood panel, not symptoms alone." },
    { question: "Is TRT safe?", answer: "When prescribed and monitored by a qualified physician, TRT has a strong safety profile backed by decades of research. The AUA and Endocrine Society both support TRT for men with clinically low testosterone. We monitor labs every 90 days." },
    { question: "Will TRT affect my fertility?", answer: "Exogenous testosterone can suppress sperm production. If fertility is a concern, we may recommend enclomiphene or HCG therapy as alternatives or adjuncts. Your physician will discuss all options during your consultation." },
    { question: "How long until I feel results?", answer: "Most men notice improved energy and mood within 2-4 weeks. Sexual function typically improves at 4-6 weeks. Body composition changes become measurable at 8-12 weeks." },
    { question: `Do I need a referral for TRT in ${city}?`, answer: `No. Men's Wellness Centers is a direct-access clinic. You can schedule online or call ${phone} directly.` },
    { question: "Can I get TRT if my levels are 'normal' but I have symptoms?", answer: "Yes. Many men fall in a sub-optimal range where they're technically normal but symptomatic. Our physicians evaluate the full clinical picture, not just a single number." },
    { question: "Do you accept insurance for TRT?", answer: "We operate on a direct-pay model. No insurance billing means no prior authorizations and no insurance company deciding your treatment. FSA and HSA accepted." },
  ],
};
