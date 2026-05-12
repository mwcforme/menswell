import {
  BatteryLow, HeartOctagon, Scale02, FaceSad, Moon01, Lightning02,
  AlertCircle, ThermometerCold, XCircle, UserX01, Clock,
} from "@untitledui/icons";
import type { FC, SVGProps } from "react";

/* ── shared icon type ── */
type Icon = FC<SVGProps<SVGSVGElement> & { size?: number }>;

/* ── section data shapes ── */
export interface GHLSymptom {
  icon: Icon;
  title: string;
  desc: string;
}

export interface GHLStep {
  num: string;
  title: string;
  desc: string;
}

export interface GHLResult {
  img: string;
  title: string;
  subtitle: string;
  desc: string;
  alt: string;
}

export interface GHLTestimonial {
  quote: string;
  name: string;
  location: string;
}

export interface GHLFAQ {
  q: string;
  a: string;
  cta: string;
}

export interface GHLVerticalConfig {
  slug: string;
  heroId: string;
  formId: string;
  hero: {
    headlineWhite: string;
    headlineOrange: string;
    bullets: string[];
    ctaText: string;
  };
  symptoms: {
    preTitle: string;
    titleDesktop?: string;
    titleMain: string;
    subtitle: string;
    items: GHLSymptom[];
    ctaText: string;
  };
  howItWorks: {
    steps: GHLStep[];
    bridgeCopy: string;
    ctaText: string;
  };
  results: {
    subtitleLine: string;
    items: GHLResult[];
  };
  midCTA: {
    headline: string;
    body: string;
    ctaText: string;
  };
  testimonials: GHLTestimonial[];
  faqs: GHLFAQ[];
  finalCTA: {
    preTitle: string;
    headline: string;
    body: string;
  };
  footerServiceLine: string;
  mobileCTAText: string;
}

/* ═══════════════════════════════════════════════
   TRT
   ═══════════════════════════════════════════════ */
export const trtConfig: GHLVerticalConfig = {
  slug: "trt",
  heroId: "ghl-hero",
  formId: "ghl-hero-form",
  hero: {
    headlineWhite: "Stop Managing Decline.",
    headlineOrange: "Start Performing Again.",
    bullets: [
      "Physician-supervised TRT at 3 Virginia centers",
      "On-site labs with results reviewed in-visit",
      "Testosterone testing and consultation",
    ],
    ctaText: "Book My Consultation",
  },
  symptoms: {
    preTitle: "Recognize the Signs",
    titleDesktop: "Are You Experiencing",
    titleMain: "Symptoms of Low T?",
    subtitle: "You didn't get where you are by settling. If these symptoms feel familiar, Low Testosterone could be what's holding you back from feeling your best.",
    items: [
      { icon: BatteryLow, title: "Low Energy", desc: "The kind of tired that sleep doesn't seem to touch. You wake up drained and feel worse by midday." },
      { icon: HeartOctagon, title: "Decreased Libido", desc: "Lack of interest in intimacy. Something that used to come naturally now feels like effort." },
      { icon: Scale02, title: "Weight Gain", desc: "Stubborn fat, especially around the midsection, no matter how much you diet or exercise." },
      { icon: FaceSad, title: "Mood Swings", desc: "Irritability, anxiety, or depression that doesn't match what's happening in your life." },
      { icon: Moon01, title: "Poor Sleep", desc: "Trouble falling or staying asleep. You never feel rested no matter how many hours you get." },
      { icon: Lightning02, title: "Brain Fog", desc: "Difficulty concentrating or remembering. You can't focus the way you used to." },
    ],
    ctaText: "Check My Levels",
  },
  howItWorks: {
    steps: [
      { num: "01", title: "Consultation", desc: "Meet with our physician for a comprehensive evaluation. We'll discuss your symptoms, health history, and goals." },
      { num: "02", title: "Testing", desc: "Get your testosterone levels checked right here in our center. No waiting, no separate appointments. Results before you leave." },
      { num: "03", title: "Treatment", desc: "Start your personalized TRT plan designed specifically for your body and your lifestyle. We keep you dialed in." },
    ],
    bridgeCopy: "That's it. No hoops. No waiting. Just results.",
    ctaText: "Start My Consultation",
  },
  results: {
    subtitleLine: "from TRT",
    items: [
      { img: "/images/services/testosterone.jpg", title: "Increased Energy", subtitle: "Wake Up Ready", desc: "Members commonly report feeling more refreshed and maintaining energy throughout the day.", alt: "Confident man in athletic wear outside wellness center" },
      { img: "/images/services/custom-protocols.jpg", title: "Improved Mood & Focus", subtitle: "Think Clearer", desc: "Many men report improved motivation, mental clarity, and overall well-being.", alt: "Two men walking on beach with surfboards" },
      { img: "/images/services/sexual-wellness-couple.png", title: "Enhanced Libido", subtitle: "Perform with Confidence", desc: "Many members report renewed drive and improved intimate relationships.", alt: "Couple relaxing together" },
      { img: "/images/services/labs-porch.png", title: "Better Sleep", subtitle: "Rest & Recover", desc: "Improved sleep quality is among the most commonly reported benefits of optimized testosterone levels.", alt: "Couple enjoying coffee on porch" },
      { img: "/images/services/peptides.jpg", title: "Reduced Brain Fog", subtitle: "Sharpen Your Mind", desc: "Members frequently report improvements in concentration, memory, and mental sharpness.", alt: "Man relaxing on beach" },
      { img: "/images/services/weight-loss.jpg", title: "Stronger Muscle Tone", subtitle: "Build & Maintain", desc: "Optimized testosterone may support lean muscle development alongside a consistent exercise routine.", alt: "Man running on trail at sunset" },
    ],
  },
  midCTA: {
    headline: "You Know Something's Off. Let's Find Out Why.",
    body: "This is not about vanity. It's about remaining who you've always been: driven, confident, and high-functioning.",
    ctaText: "Book My Appointment",
  },
  testimonials: [
    { quote: "Six months on TRT and I finally feel like myself again. Energy is up, mood is stable, and I'm sleeping through the night for the first time in years.", name: "Mark B.", location: "Richmond, VA" },
    { quote: "The nursing staff here is top-notch. They walk you through everything, answer every question, and actually follow up after your visits. Never experienced that anywhere else.", name: "Howard B.", location: "Virginia Beach, VA" },
    { quote: "From the front desk to the physician, every person I've dealt with has been professional and genuinely helpful. You can tell they care about results, not just billing.", name: "Douglas H.", location: "Newport News, VA" },
    { quote: "Got my labs back in two days and started treatment the same week. No runaround, no waiting months. The team moves fast and knows what they're doing.", name: "James R.", location: "Richmond, VA" },
    { quote: "I feel stronger and more focused than I have in years. My wife says I'm a different person. Should've done this years ago.", name: "Steve P.", location: "Chesapeake, VA" },
    { quote: "I was hesitant about hormone therapy but the doctor laid everything out honestly. No pressure, just facts. Three months in and I wish I'd started sooner.", name: "David K.", location: "Norfolk, VA" },
  ],
  faqs: [
    { q: "How much does TRT cost?", a: "We'll give you a clear breakdown during your no-cost consultation. No hidden fees. Treatment plans start at $199/month after approval.", cta: "See pricing details" },
    { q: "Is TRT safe? What about long-term commitment?", a: "When administered under proper medical supervision, TRT has a well-established safety profile. We're LegitScript certified as of 2025, independently verified by the same organization that vets providers for Google and Microsoft. We provide comprehensive monitoring throughout, tracking your levels and health markers to help ensure optimal outcomes with minimal risk.", cta: "Book my no-cost consultation" },
    { q: "How long until I see results?", a: "Many members report improvements in energy and mood within 2-4 weeks. Full benefits, including improved body composition, libido, and mental clarity, typically develop over 3-6 months. Individual results vary based on health history and treatment adherence.", cta: "Start my evaluation" },
    { q: "How is this different from online TRT services like Hone or Fountain TRT?", a: "Online services ship medication after a questionnaire. We provide comprehensive, in-person medical care. You get a real doctor-patient relationship, thorough testing, personalized protocols, and ongoing monitoring. We're also LegitScript certified, which means our business practices, licensing, and medical protocols have been independently verified. Most online TRT mills can't say that.", cta: "See why men switch to MWC" },
    { q: "Is this covered by insurance?", a: "No. We operate outside of insurance so we can provide the level of care, testing, and physician access that insurance-based centers don't. All consultations and treatments are conducted in person at our Virginia centers in Richmond, Newport News, or Virginia Beach.", cta: "Learn about our pricing" },
  ],
  finalCTA: {
    preTitle: "What to Expect",
    headline: "You've Read Enough. Let's Get Your Levels Checked.",
    body: "This isn't about vanity. It's about getting back to being the man you've always been: sharp, confident, and performing at your level.",
  },
  footerServiceLine: "Physician-supervised testosterone therapy at our",
  mobileCTAText: "Book Consult",
};

/* ═══════════════════════════════════════════════
   ED
   ═══════════════════════════════════════════════ */
export const edConfig: GHLVerticalConfig = {
  slug: "ed",
  heroId: "ghl-hero",
  formId: "ghl-hero-form",
  hero: {
    headlineWhite: "Stop Settling for Workarounds.",
    headlineOrange: "Get Real Treatment.",
    bullets: [
      "Private, in-person evaluations at 3 Virginia centers",
      "A licensed physician identifies the cause and prescribes what works",
      "Medication dispensed on-site, the same day",
    ],
    ctaText: "Book My Private Visit",
  },
  symptoms: {
    preTitle: "Sound Familiar?",
    titleDesktop: "Are You Dealing With",
    titleMain: "Erectile Dysfunction?",
    subtitle: "If any of these feel familiar, it's not in your head. ED is a medical condition with medical solutions. The first step is finding out what's causing it.",
    items: [
      { icon: AlertCircle, title: "Inconsistent Performance", desc: "It works sometimes, not others. You never know what to expect, and the uncertainty makes it worse." },
      { icon: FaceSad, title: "Avoiding Intimacy", desc: "You're pulling away from your partner because you're afraid of what might happen. Or not happen." },
      { icon: XCircle, title: "Pills That Don't Work", desc: "You've tried the blue pill. Maybe the generic version too. It either didn't work or the side effects weren't worth it." },
      { icon: HeartOctagon, title: "Loss of Confidence", desc: "It affects more than the bedroom. You feel less like yourself at work, at home, everywhere." },
      { icon: ThermometerCold, title: "Low Drive", desc: "The desire is fading. What used to feel natural now feels like a chore or something you'd rather avoid." },
      { icon: Lightning02, title: "Not Sure What's Wrong", desc: "Is it stress? Hormones? Blood flow? You don't know because no one has actually tested you." },
    ],
    ctaText: "Schedule My Private Visit",
  },
  howItWorks: {
    steps: [
      { num: "01", title: "Walk In, No Judgment", desc: "Book a private visit at any of our 3 Virginia centers. No crowded waiting rooms. No awkward conversations at a pharmacy counter." },
      { num: "02", title: "Find the Cause", desc: "Your physician runs labs and reviews your full health history to identify what is actually causing the issue. Not a guess. A diagnosis." },
      { num: "03", title: "Get What Works", desc: "Based on your results, your doctor prescribes treatment tailored to you. Oral medications, injectables, or combination therapy. Dispensed on-site, that day." },
    ],
    bridgeCopy: "That's it. Private, professional, and resolved in one visit.",
    ctaText: "Book My Confidential Visit",
  },
  results: {
    subtitleLine: "from ED Treatment",
    items: [
      { img: "/images/services/sexual-wellness-couple.png", title: "Restored Confidence", subtitle: "Feel Like Yourself", desc: "Members report feeling more confident in and out of the bedroom after identifying and treating the root cause.", alt: "Couple relaxing together" },
      { img: "/images/services/testosterone.jpg", title: "Consistent Performance", subtitle: "Reliable Results", desc: "When the cause is treated, not just masked, members report consistent, reliable results.", alt: "Confident man in athletic wear" },
      { img: "/images/services/custom-protocols.jpg", title: "Improved Relationships", subtitle: "Reconnect", desc: "Many members say their relationships improved significantly once intimacy was no longer a source of anxiety.", alt: "Two men walking on beach" },
      { img: "/images/services/labs-porch.png", title: "Better Overall Health", subtitle: "The Full Picture", desc: "ED is often a symptom of a bigger issue. Many members discover hormonal or cardiovascular factors they didn't know about.", alt: "Couple enjoying coffee on porch" },
      { img: "/images/services/peptides.jpg", title: "Peace of Mind", subtitle: "Answers, Not Guesses", desc: "Knowing the cause removes the anxiety. Members report feeling relief just from getting a clear diagnosis.", alt: "Man relaxing on beach" },
      { img: "/images/services/labs.jpg", title: "No More Workarounds", subtitle: "Real Medicine", desc: "No more timing pills or hoping for the best. Members get a protocol designed around their specific physiology.", alt: "Lab work being performed" },
    ],
  },
  midCTA: {
    headline: "You Deserve Better Than a Pill and a Prayer.",
    body: "If what you've tried hasn't worked, it's because no one looked hard enough. We do.",
    ctaText: "Book My Appointment",
  },
  testimonials: [
    { quote: "I was embarrassed to even bring it up. The doctor made it easy. Ran labs, explained what was going on, and I had my prescription before I left.", name: "James H.", location: "Richmond, VA" },
    { quote: "Tried the online pill mills. Waste of money. This was the first time a doctor actually looked at my bloodwork and figured out the real issue.", name: "Robert M.", location: "Virginia Beach, VA" },
    { quote: "In and out in about an hour. Private, professional, and it worked. Should have done this a year ago.", name: "Kevin P.", location: "Newport News, VA" },
    { quote: "My wife noticed the difference before I did. Not just physically, but my mood and confidence came back. The doctor here actually listens.", name: "Anthony D.", location: "Chesapeake, VA" },
    { quote: "I'd been dealing with this for two years and just ignored it. One visit here and I had answers and a plan. No judgment, no lectures.", name: "Brian T.", location: "Richmond, VA" },
    { quote: "The privacy is what sold me. No pharmacy run, no explaining to anyone. Everything happened in the office. Professional start to finish.", name: "William C.", location: "Norfolk, VA" },
  ],
  faqs: [
    { q: "How much does ED treatment cost?", a: "We'll give you a clear breakdown during your no-cost consultation. No hidden fees. Treatment plans vary based on the protocol your physician recommends, and all options are discussed before you commit.", cta: "See pricing details" },
    { q: "Is this different from just getting a Viagra prescription?", a: "Yes. We don't just hand you a pill. Your physician runs labs, reviews your health history, and identifies what is actually causing the problem. You may end up on an oral medication, an injectable, or a combination protocol. The difference is the diagnosis behind it.", cta: "Book my private visit" },
    { q: "How long until I see results?", a: "Many members see improvement after their first visit. The treatment your doctor prescribes is based on your specific diagnosis, so it's targeted to work. Individual results vary based on the underlying cause.", cta: "Start my evaluation" },
    { q: "Is everything confidential?", a: "Completely. Our centers are built for privacy. No shared waiting areas, no pharmacy pickups, no records sent to your primary care unless you request it. Medication is dispensed on-site.", cta: "Learn about our process" },
    { q: "Is this covered by insurance?", a: "No. We operate outside of insurance so we can provide the level of care, testing, and physician access that insurance-based centers don't. All consultations and treatments are conducted in person at our Virginia centers in Richmond, Newport News, or Virginia Beach.", cta: "Learn about our pricing" },
  ],
  finalCTA: {
    preTitle: "What to Expect",
    headline: "Get Answers. Get Treated. Move On.",
    body: "Schedule a confidential evaluation at our Richmond, Newport News, or Virginia Beach center. Your visit includes a private consultation, same-day lab work, and a prescription plan built for you.",
  },
  footerServiceLine: "Physician-supervised sexual health treatment at our",
  mobileCTAText: "Book Private Visit",
};

/* ═══════════════════════════════════════════════
   WEIGHT LOSS
   ═══════════════════════════════════════════════ */
export const wlConfig: GHLVerticalConfig = {
  slug: "wl",
  heroId: "ghl-hero",
  formId: "ghl-hero-form",
  hero: {
    headlineWhite: "Stop Dieting.",
    headlineOrange: "Start Losing.",
    bullets: [
      "Physician-supervised GLP-1 therapy at 3 Virginia centers",
      "Semaglutide and Tirzepatide prescribed from real lab work",
      "Consultation and metabolic evaluation",
    ],
    ctaText: "Book My Consultation",
  },
  symptoms: {
    preTitle: "Sound Familiar?",
    titleDesktop: "Are You Struggling With",
    titleMain: "Stubborn Weight?",
    subtitle: "You've tried the diets, the apps, the meal plans. If the weight keeps coming back, the problem isn't willpower. It's biology.",
    items: [
      { icon: Scale02, title: "Stubborn Belly Fat", desc: "You eat well and stay active, but the midsection won't budge. It's not discipline. It's metabolic." },
      { icon: BatteryLow, title: "Low Energy", desc: "Carrying extra weight drains everything. You're tired before lunch and wiped by dinner." },
      { icon: FaceSad, title: "Failed Diets", desc: "Keto, fasting, calorie counting. You lost some, gained it back, and then some. The cycle is exhausting." },
      { icon: Moon01, title: "Poor Sleep", desc: "Extra weight affects sleep quality. You snore, you toss, you wake up feeling like you never rested." },
      { icon: HeartOctagon, title: "Joint Pain", desc: "Knees, back, hips. The weight is making everything harder and the pain is keeping you from moving." },
      { icon: Lightning02, title: "Brain Fog", desc: "Sluggish thinking, poor focus, low motivation. Your body is fighting you and your brain is paying the price." },
    ],
    ctaText: "Start My Evaluation",
  },
  howItWorks: {
    steps: [
      { num: "01", title: "Full Workup", desc: "Your first visit includes on-site blood work and a comprehensive health review. Your physician looks at the full picture before prescribing anything." },
      { num: "02", title: "Your Protocol", desc: "Based on your labs, your doctor builds a weight loss plan around your specific metabolism, health markers, and goals. GLP-1 medications are prescribed and administered on-site." },
      { num: "03", title: "Track It Together", desc: "Regular follow-ups, lab monitoring, and dosage adjustments are all included. Your physician tracks your progress and adapts the plan as your body responds." },
    ],
    bridgeCopy: "That's it. Real medicine. Real monitoring. Real results.",
    ctaText: "Start My Consultation",
  },
  results: {
    subtitleLine: "from GLP-1 Therapy",
    items: [
      { img: "/images/services/weight-loss.jpg", title: "Significant Weight Loss", subtitle: "Measurable Progress", desc: "Members commonly report losing 15-20% of body weight within the first 6 months of physician-supervised GLP-1 therapy.", alt: "Man running on trail at sunset" },
      { img: "/images/services/testosterone.jpg", title: "More Energy", subtitle: "Feel the Difference", desc: "As weight comes off, energy levels go up. Members report feeling lighter, faster, and more motivated.", alt: "Confident man in athletic wear" },
      { img: "/images/services/labs-porch.png", title: "Better Lab Numbers", subtitle: "The Data Shows It", desc: "Blood pressure, cholesterol, A1C. Members frequently see improvements across the board as weight decreases.", alt: "Couple enjoying coffee on porch" },
      { img: "/images/services/custom-protocols.jpg", title: "Improved Mobility", subtitle: "Move Without Pain", desc: "Less weight means less joint strain. Members report being able to exercise, walk, and move with less pain.", alt: "Two men walking on beach" },
      { img: "/images/services/peptides.jpg", title: "Better Sleep", subtitle: "Rest & Recover", desc: "Weight loss often leads to improved sleep quality, reduced snoring, and waking up feeling actually rested.", alt: "Man relaxing on beach" },
      { img: "/images/services/sexual-wellness-couple.png", title: "Renewed Confidence", subtitle: "Feel Like You Again", desc: "Members consistently report improvements in self-image, mood, and motivation as they see real progress.", alt: "Couple relaxing together" },
    ],
  },
  midCTA: {
    headline: "The Weight Won't Fix Itself. But We Can Help.",
    body: "This is not another diet. It's physician-supervised medicine designed to work with your body, not against it.",
    ctaText: "Book My Appointment",
  },
  testimonials: [
    { quote: "Down 30 pounds in 4 months. The injections gave me energy I haven't had in years, and the doctor actually monitors everything.", name: "Tom W.", location: "Richmond, VA" },
    { quote: "I tried every diet. Keto, fasting, meal plans. Nothing stuck. Three months on Semaglutide with Dr. P and I'm down 4 pant sizes.", name: "Chris D.", location: "Virginia Beach, VA" },
    { quote: "My doctor here checks my bloodwork every visit and adjusts the dose. That matters. The online places just ship it and forget you.", name: "Mark F.", location: "Newport News, VA" },
    { quote: "I was skeptical about the injections. The doctor explained exactly how it works, checked my labs first, and started me slow. Down 25 pounds and counting.", name: "Daniel R.", location: "Richmond, VA" },
    { quote: "My knees don't hurt anymore. My blood pressure is normal for the first time in a decade. This isn't a diet. This is medicine.", name: "Greg S.", location: "Chesapeake, VA" },
    { quote: "The follow-up care is what makes this place different. They don't just give you a shot and send you home. They track everything.", name: "Paul M.", location: "Norfolk, VA" },
  ],
  faqs: [
    { q: "How much does GLP-1 therapy cost?", a: "We'll give you a clear breakdown during your no-cost consultation. No hidden fees. Treatment plans vary based on the medication and dosing your physician recommends, and all options are discussed before you commit.", cta: "See pricing details" },
    { q: "What's the difference between Semaglutide and Tirzepatide?", a: "Both are GLP-1 receptor agonists that help reduce appetite and support weight loss. Tirzepatide also targets a second receptor (GIP), which may offer additional metabolic benefits. Your physician will recommend the best option based on your lab work and health profile.", cta: "Book my no-cost consultation" },
    { q: "How long until I see results?", a: "Most members begin to notice appetite changes and initial weight loss within the first 2-4 weeks. Significant results typically develop over 3-6 months with consistent treatment and physician monitoring. Individual results vary.", cta: "Start my evaluation" },
    { q: "Is this different from online weight loss services?", a: "Yes. Online services ship medication after a questionnaire. We provide comprehensive, in-person medical care. You get a real doctor-patient relationship, thorough lab work, personalized dosing, and ongoing monitoring. We're LegitScript certified, which means our practices have been independently verified.", cta: "See why men switch to MWC" },
    { q: "Is this covered by insurance?", a: "No. We operate outside of insurance so we can provide the level of care, testing, and physician access that insurance-based centers don't. All consultations and treatments are conducted in person at our Virginia centers in Richmond, Newport News, or Virginia Beach.", cta: "Learn about our pricing" },
  ],
  finalCTA: {
    preTitle: "What to Expect",
    headline: "Ready to Lose It for Good? Let's Start.",
    body: "Schedule a no-cost consultation at our Richmond, Newport News, or Virginia Beach center. Your first visit includes on-site lab work, results reviewed in-visit, and a physician-built weight loss plan.",
  },
  footerServiceLine: "Physician-supervised weight loss therapy at our",
  mobileCTAText: "Book Consult",
};

/* ═══════════════════════════════════════════════
   GENERAL MEN'S HEALTH
   ═══════════════════════════════════════════════ */
export const generalConfig: GHLVerticalConfig = {
  slug: "general",
  heroId: "ghl-hero",
  formId: "ghl-hero-form",
  hero: {
    headlineWhite: "Stop Guessing.",
    headlineOrange: "Get Answers.",
    bullets: [
      "Comprehensive men's health evaluations at 3 Virginia centers",
      "On-site labs with results reviewed in-visit",
      "Consultation with a licensed physician",
    ],
    ctaText: "Book My Consultation",
  },
  symptoms: {
    preTitle: "Something Feel Off?",
    titleDesktop: "Are You Experiencing",
    titleMain: "Any of These?",
    subtitle: "You're not the kind of man who ignores problems. But when the symptoms are vague, it's hard to know where to start. That's what we're here for.",
    items: [
      { icon: BatteryLow, title: "Constant Fatigue", desc: "Sleep doesn't help. Coffee barely works. The energy you used to have is gone and nothing is bringing it back." },
      { icon: Scale02, title: "Unexplained Weight Changes", desc: "Gaining weight you can't explain, or losing muscle no matter what you do. Something metabolic may be off." },
      { icon: HeartOctagon, title: "Low Libido or ED", desc: "Lack of interest in intimacy, or difficulty performing. It could be hormonal, vascular, or both." },
      { icon: FaceSad, title: "Mood or Motivation Issues", desc: "Irritability, low motivation, or a general feeling of not being yourself. These aren't just 'getting older.'" },
      { icon: Moon01, title: "Poor Sleep Quality", desc: "Trouble falling asleep, staying asleep, or waking up rested. Your body may be telling you something your doctor hasn't checked." },
      { icon: Lightning02, title: "Brain Fog", desc: "Difficulty concentrating, poor memory, or mental sluggishness. Your mind isn't keeping up the way it used to." },
    ],
    ctaText: "Get My Evaluation",
  },
  howItWorks: {
    steps: [
      { num: "01", title: "Consultation", desc: "Meet with a licensed physician who specializes in men's health. We'll discuss your symptoms, your history, and what you want to fix." },
      { num: "02", title: "Comprehensive Testing", desc: "On-site blood work covers hormones, metabolic markers, and key health indicators. Results before you leave." },
      { num: "03", title: "Your Plan", desc: "Based on your labs and evaluation, your doctor builds a treatment plan specific to your body. Whether that's TRT, GLP-1 therapy, ED treatment, or a combination." },
    ],
    bridgeCopy: "That's it. One visit. Real answers. A real plan.",
    ctaText: "Start My Consultation",
  },
  results: {
    subtitleLine: "from Our Members",
    items: [
      { img: "/images/services/testosterone.jpg", title: "More Energy", subtitle: "Feel the Difference", desc: "Members commonly report sustained energy throughout the day after their underlying health issues are identified and treated.", alt: "Confident man in athletic wear" },
      { img: "/images/services/weight-loss.jpg", title: "Weight Loss", subtitle: "Measurable Progress", desc: "Whether through GLP-1 therapy or hormonal optimization, members frequently see significant changes in body composition.", alt: "Man running on trail at sunset" },
      { img: "/images/services/sexual-wellness-couple.png", title: "Improved Sexual Health", subtitle: "Confidence Restored", desc: "From low libido to ED, members report meaningful improvements once the root cause is identified and properly treated.", alt: "Couple relaxing together" },
      { img: "/images/services/custom-protocols.jpg", title: "Mental Clarity", subtitle: "Think Sharper", desc: "Brain fog, poor focus, and low motivation frequently improve once hormonal and metabolic imbalances are addressed.", alt: "Two men walking on beach" },
      { img: "/images/services/labs-porch.png", title: "Better Sleep", subtitle: "Rest & Recover", desc: "Many members report deeper, more restorative sleep after treatment, which supports recovery across every other area.", alt: "Couple enjoying coffee on porch" },
      { img: "/images/services/peptides.jpg", title: "Stronger Overall Health", subtitle: "The Full Picture", desc: "When you treat the root cause, everything improves: mood, energy, body composition, performance, and quality of life.", alt: "Man relaxing on beach" },
    ],
  },
  midCTA: {
    headline: "Something's Off. Let's Find Out What.",
    body: "You don't need to diagnose yourself. That's our job. One visit, real lab work, and a physician who specializes in men's health.",
    ctaText: "Book My Appointment",
  },
  testimonials: [
    { quote: "I came in for fatigue and found out my testosterone was tanked. Four months later I feel like a completely different person. Energy, mood, everything.", name: "Mark B.", location: "Richmond, VA" },
    { quote: "I'd been putting on weight and had zero motivation. Turns out it was hormonal. The doctor here actually ran the right tests and figured it out.", name: "Tom W.", location: "Virginia Beach, VA" },
    { quote: "I was dealing with ED and low energy. The physician here connected the dots. One treatment plan addressed both issues. Should've come in sooner.", name: "James H.", location: "Newport News, VA" },
    { quote: "From the front desk to the physician, every person I've dealt with has been professional and genuinely helpful. You can tell they care about results, not just billing.", name: "Douglas H.", location: "Richmond, VA" },
    { quote: "I was skeptical about a men's health center. But these guys are legit. Lab work on-site, doctor who actually listens, and a real plan. Not some cookie-cutter approach.", name: "Steve P.", location: "Chesapeake, VA" },
    { quote: "I came in not even sure what was wrong. Just felt off. The labs showed my testosterone was low and my metabolic panel was a mess. Three months later, I'm down 20 pounds and sleeping through the night.", name: "David K.", location: "Norfolk, VA" },
  ],
  faqs: [
    { q: "What services do you offer?", a: "We provide comprehensive men's health evaluations including testosterone therapy (TRT), GLP-1 weight loss medication (Semaglutide and Tirzepatide), erectile dysfunction treatment, and peptide therapy. All services are physician-supervised and conducted in person at our Virginia centers.", cta: "Book my no-cost consultation" },
    { q: "How much does it cost?", a: "We'll give you a clear breakdown during your no-cost consultation. No hidden fees. Treatment plans vary based on what your physician recommends after your evaluation. All options are discussed before you commit to anything.", cta: "See pricing details" },
    { q: "Do I need to know what's wrong before I come in?", a: "No. That's what the evaluation is for. Many members come in with vague symptoms like fatigue, weight gain, or low motivation. Our physician runs comprehensive labs and identifies what's actually going on.", cta: "Start my evaluation" },
    { q: "How is this different from my regular doctor?", a: "We specialize in men's health. Your primary care doctor manages everything from ear infections to diabetes. We focus exclusively on hormonal optimization, metabolic health, and sexual wellness for men. On-site labs, results reviewed in-visit, and a physician who does this all day, every day.", cta: "See why men choose us" },
    { q: "Is this covered by insurance?", a: "No. We operate outside of insurance so we can provide the level of care, testing, and physician access that insurance-based centers don't. All consultations and treatments are conducted in person at our Virginia centers in Richmond, Newport News, or Virginia Beach.", cta: "Learn about our pricing" },
  ],
  finalCTA: {
    preTitle: "What to Expect",
    headline: "Get the Full Picture. One Visit.",
    body: "Schedule a no-cost evaluation at our Richmond, Newport News, or Virginia Beach center. Your visit includes comprehensive lab work, a physician consultation, and a plan built around your results.",
  },
  footerServiceLine: "Comprehensive men's health services at our",
  mobileCTAText: "Book Consult",
};
