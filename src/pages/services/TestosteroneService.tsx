import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import { treatments, trtFaqs, getComparisonDataForCategory } from "@/data/treatments";
import HowItWorksSection from "@/components/services/sections/HowItWorksSection";
import DontWaitBanner from "@/components/services/sections/DontWaitBanner";
import ConsultationFormSection from "@/components/services/sections/ConsultationFormSection";

const trtSteps = [
  { number: "01", title: "BOOK YOUR VISIT", subtitle: "NO REFERRAL NEEDED", body: "Schedule your no-cost consultation online or call any of our three Virginia locations. No referral needed. Same-day and next-day appointments often available." },
  { number: "02", title: "SAME-DAY LABS", subtitle: "RESULTS BEFORE YOU LEAVE", body: "At your first visit, we draw a comprehensive male hormone panel \u2014 Total T, Free T, Estradiol, PSA, CBC, CMP, Lipids, and Thyroid. Results are typically available the same day." },
  { number: "03", title: "REVIEW WITH YOUR PHYSICIAN", subtitle: "FACE-TO-FACE CONSULTATION", body: "Your physician reviews your lab results, symptoms, and health history to determine if TRT is right for you. You'll discuss protocol options, expected timeline, and monitoring plan." },
  { number: "04", title: "START YOUR TRT PROTOCOL", subtitle: "ONGOING OPTIMIZATION", body: "Begin your personalized testosterone therapy protocol. Regular follow-up labs and provider check-ins ensure your levels are optimized and your protocol is working." },
];

const trtTestimonials = [
  { name: "Kevin S.", location: "Henrico, VA", date: "February 2026", pill: "TRT", quote: "At 47, I thought feeling exhausted all the time was just part of getting older. My wife convinced me to get checked. Turns out my testosterone was at 187 \u2014 barely functional. Four months into TRT at Men's Wellness Centers and I'm sleeping through the night, hitting the gym at 5 AM again, and my wife says I'm a different man. Best decision I've made for my health." },
  { name: "Marcus D.", location: "Midlothian, VA", date: "January 2026", pill: "TRT", quote: "I tried the online TRT route first \u2014 waited 3 weeks for a kit, did labs at home, and some doctor I never met put me on a standard dose. No follow-up, no monitoring. When I switched to MWC, Dr. Caravella sat with me for 45 minutes, drew comprehensive labs, and had me on an optimized protocol within days. The difference in care is night and day." },
  { name: "Andrew L.", location: "Chester, VA", date: "March 2026", pill: "TRT", quote: "I was worried about the safety of testosterone therapy. The team at MWC explained everything \u2014 the labs they run, how they monitor estrogen levels, PSA, blood count \u2014 all of it. Nothing felt rushed. Nine months in, my levels are dialed in, I've put on lean muscle, and my annual physical came back better than it has in 10 years." },
];

/* ─── MWC vs Competitors Comparison ─── */
const TRTCompetitorComparison = () => {
  const rows = [
    { feature: "Initial Evaluation", mwc: "In-person exam + on-site labs", online: "Online questionnaire only", pcp: "Standard blood panel (may not include full hormone panel)" },
    { feature: "Lab Work", mwc: "Comprehensive male hormone panel (Total T, Free T, Estradiol, PSA, CBC, CMP, Lipids, Thyroid)", online: "Basic testosterone level only", pcp: "Limited panel \u2014 may require specialist referral for full workup" },
    { feature: "Provider", mwc: "Board-certified physician + dedicated NP", online: "Telemedicine provider (often PA or NP, limited oversight)", pcp: "PCP \u2014 generalist, not hormone specialist" },
    { feature: "Treatment Options", mwc: "Injectable T (Cypionate/Enanthate), with ancillary management (AI, HCG as indicated)", online: "One-size-fits-all injectable or topical", pcp: "Topical gel (most common) or referral to endocrinologist" },
    { feature: "Monitoring", mwc: "Regular follow-up labs + in-person visits. Protocol adjustments based on labs and symptoms", online: "Periodic lab review by phone/video. Limited protocol adjustments", pcp: "Annual blood work. Minimal ongoing hormone management" },
    { feature: "Ancillary Management", mwc: "Estrogen management, HCG for fertility preservation, DHEA, thyroid optimization \u2014 as clinically indicated", online: "Rarely offered. May require separate provider", pcp: "Not typically offered. Referral required" },
    { feature: "Time to First Treatment", mwc: "Same visit (after labs reviewed) or within 1 week", online: "2-4 weeks (shipping, pharmacy delays)", pcp: "2-6 weeks (referrals, prior authorization)" },
    { feature: "Cost Transparency", mwc: "Upfront pricing. No hidden fees.", online: "Subscription model \u2014 ongoing monthly cost", pcp: "Insurance-dependent. Copays, deductibles, prior auth" },
    { feature: "Who It's Best For", mwc: "Men who want physician-supervised, optimized TRT with regular monitoring", online: "Men in remote areas without access to specialized clinics", pcp: "Men with insurance coverage who prefer the traditional healthcare system" },
  ];

  return (
    <section style={{ background: "#EBEAE8" }} className="py-20 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "#4A4A4A" }}>KNOW YOUR OPTIONS</p>
        <h2 className="font-bold uppercase tracking-wide text-2xl md:text-3xl" style={{ color: "#000033" }}>MWC TRT VS. OTHER OPTIONS</h2>
        <div className="overflow-x-auto mt-10 -mx-6 px-6 md:mx-0 md:px-0">
          <table className="w-full text-left" style={{ minWidth: 700 }}>
            <thead>
              <tr>
                <th className="px-4 py-3 text-[13px] font-semibold uppercase" style={{ color: "#000033", background: "#F5F5F5" }}>Feature</th>
                <th className="px-4 py-3 text-[13px] font-semibold uppercase text-center" style={{ color: "#000033", background: "#F5F5F5", borderLeft: "3px solid #E8670A" }}>Men's Wellness Centers</th>
                <th className="px-4 py-3 text-[13px] font-semibold uppercase text-center" style={{ color: "#000033", background: "#F5F5F5" }}>Online / Mail-Order TRT</th>
                <th className="px-4 py-3 text-[13px] font-semibold uppercase text-center" style={{ color: "#000033", background: "#F5F5F5" }}>Primary Care Doctor</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.feature}>
                  <td className="px-4 py-3 text-sm font-semibold" style={{ color: "#000033", borderBottom: "1px solid #E5E5E5" }}>{r.feature}</td>
                  <td className="px-4 py-3 text-sm font-medium" style={{ color: "#000033", borderBottom: "1px solid #E5E5E5", borderLeft: "3px solid #E8670A" }}>{r.mwc}</td>
                  <td className="px-4 py-3 text-sm italic" style={{ color: "#888", borderBottom: "1px solid #E5E5E5" }}>{r.online}</td>
                  <td className="px-4 py-3 text-sm italic" style={{ color: "#888", borderBottom: "1px solid #E5E5E5" }}>{r.pcp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

const TRTBenefits = () => (
  <section style={{ background: "#FFFFFF" }} className="py-20 px-6 md:px-8">
    <div className="max-w-[1200px] mx-auto text-center">
      <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "#4A4A4A" }}>THE RESULTS YOU'RE LOOKING FOR</p>
      <h2 className="font-bold uppercase tracking-wide text-2xl md:text-3xl" style={{ color: "#000033" }}>WHAT TRT CAN HELP YOU ACHIEVE</h2>
      <p className="mt-4 text-base max-w-[650px] mx-auto" style={{ color: "#4A4A4A" }}>
        When testosterone levels are optimized, many men report significant improvements in energy, mood, and overall quality of life.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {[
          { title: "Restored Energy", body: "Wake up feeling refreshed and maintain consistent energy throughout the day." },
          { title: "Mental Clarity", body: "Improved focus, sharper thinking, and reduced brain fog." },
          { title: "Better Mood", body: "More balanced mood, reduced irritability, and improved sense of well-being." },
          { title: "Physical Performance", body: "Increased strength, faster recovery, and improved body composition." },
        ].map((c) => (
          <div key={c.title} className="rounded-xl p-6 text-left" style={{ background: "#F5F5F5" }}>
            <h3 className="font-bold text-[15px] uppercase" style={{ color: "#000033" }}>{c.title}</h3>
            <p className="text-sm mt-2 leading-relaxed" style={{ color: "#4A4A4A" }}>{c.body}</p>
          </div>
        ))}
      </div>
      <Link to="/book" className="inline-block mt-10 rounded-full px-10 py-4 text-sm font-bold uppercase tracking-wider" style={{ background: "#000033", color: "#FFFFFF", textDecoration: "none" }}>
        FIND OUT IF TRT IS RIGHT FOR ME
      </Link>
    </div>
  </section>
);

const SignsSymptoms = () => (
  <section style={{ background: "#FFFFFF" }} className="py-20 px-6 md:px-8">
    <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "#4A4A4A" }}>UNDERSTANDING THE SIGNS</p>
        <h2 className="font-bold uppercase tracking-wide text-2xl md:text-3xl" style={{ color: "#000033" }}>SIGNS AND SYMPTOMS OF LOW TESTOSTERONE</h2>
        <p className="mt-4 text-base leading-relaxed" style={{ color: "#4A4A4A" }}>
          If you've been feeling less energetic, less motivated, or not like yourself, low testosterone could be the cause. Testosterone plays a crucial role in maintaining mood, energy, sexual function, and overall vitality. Recognizing the symptoms early helps you take control of your health.
        </p>
        <p className="mt-4 text-base leading-relaxed" style={{ color: "#4A4A4A" }}>
          Don't ignore these warning signs. Our licensed physicians at Men's Wellness Centers can test your testosterone levels the same day and create a personalized treatment plan at our Richmond, Newport News, or Virginia Beach center.
        </p>
      </div>
      <ul className="space-y-3 mt-2">
        {[
          "Decrease in sex drive (libido)",
          "Feelings of sadness or irritability",
          "Less frequent or weaker erections",
          "Lack of energy, strength, or endurance",
          "Decline in ability to play sports",
          "Persistent tiredness",
          "Lack of focus and mental clarity",
          "Increased body fat, especially around midsection",
        ].map((s) => (
          <li key={s} className="flex items-start gap-3">
            <Check size={18} color="#2ECC71" className="flex-shrink-0 mt-0.5" />
            <span className="text-sm" style={{ color: "#4A4A4A" }}>{s}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="max-w-[1200px] mx-auto text-center mt-10">
      <Link to="/book" className="inline-block rounded-full px-10 py-4 text-sm font-bold uppercase tracking-wider" style={{ background: "#000033", color: "#FFFFFF", textDecoration: "none" }}>
        BOOK MY CONSULTATION
      </Link>
    </div>
  </section>
);

const WhatCauses = () => (
  <section style={{ background: "#EBEAE8" }} className="py-20 px-6 md:px-8">
    <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="font-bold uppercase tracking-wide text-2xl md:text-3xl" style={{ color: "#000033" }}>WHAT CAUSES LOW TESTOSTERONE IN MEN?</h2>
        <p className="mt-4 text-base leading-relaxed" style={{ color: "#4A4A4A" }}>
          Testosterone production naturally declines about 1% per year after age 30, a process sometimes called andropause. However, certain conditions can accelerate this decline or cause abnormally low levels at any age:
        </p>
        <ul className="mt-4 space-y-2">
          {["Obesity and metabolic syndrome", "Chronic stress and elevated cortisol levels", "Type 2 diabetes", "Sleep disorders like sleep apnea", "Certain medications (opioids, steroids)", "Pituitary gland disorders"].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#4A4A4A" }}>
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#000033" }} />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-base leading-relaxed" style={{ color: "#4A4A4A" }}>
          If lifestyle changes like weight loss, exercise, and stress management aren't improving your symptoms, medical treatment may be the next step.
        </p>
        <Link to="/book" className="inline-block mt-8 rounded-full px-10 py-4 text-sm font-bold uppercase tracking-wider" style={{ background: "#000033", color: "#FFFFFF", textDecoration: "none" }}>
          BOOK MY CONSULTATION
        </Link>
      </div>
      <img
        src="https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=800"
        alt="Athletic man exercising outdoors"
        className="rounded-xl w-full h-[400px] object-cover"
      />
    </div>
  </section>
);

const TRTOverview = () => (
  <section style={{ background: "#FFFFFF" }} className="py-20 px-6 md:px-8">
    <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      <div>
        <h2 className="font-bold uppercase tracking-wide text-2xl md:text-3xl" style={{ color: "#000033" }}>TESTOSTERONE REPLACEMENT THERAPY (TRT) FOR LOW T</h2>
        <p className="mt-4 text-base leading-relaxed" style={{ color: "#4A4A4A" }}>
          To diagnose low T, you'll first meet with one of our licensed physicians. When you arrive for your appointment, he'll perform a physical exam and test your testosterone levels. The lab test takes just a few minutes, and you'll know your results before leaving.
        </p>
        <p className="mt-4 text-base leading-relaxed" style={{ color: "#4A4A4A" }}>
          If you have low T levels, your physician will discuss your treatment options. Typically, treatment for low T involves testosterone injections, which can be done during quick follow-up visits or in the convenience of your own home. Begin moving toward better health today. Have questions about TRT? Check our FAQ below.
        </p>
      </div>
      <ul className="space-y-3 mt-2">
        {[
          "Private consultation",
          "Same-day test results",
          "Individualized treatment plans",
          "Quick follow-up appointments",
        ].map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Check size={18} color="#2ECC71" className="flex-shrink-0 mt-0.5" />
            <span className="text-sm font-medium" style={{ color: "#000033" }}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const TestosteroneService = () => (
  <ServicePageLayout
    title="TESTOSTERONE THERAPY"
    subtitle="Hormone Optimization"
    treatments={treatments.filter((t) => t.categorySlug === "testosterone-therapy")}
    activeSlug="testosterone-therapy"
    heroImage="https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=1600"
    comparisonRows={getComparisonDataForCategory("testosterone-therapy")}
    faqs={trtFaqs}
    bottomCtaHeading="See What Your Testosterone Levels Say"
    bottomCtaSubtext="Your no-cost consultation includes comprehensive lab work. Find out where you stand \u2014 and what optimized feels like."
    testimonials={trtTestimonials}
    afterHeroContent={
      <>
        <TRTBenefits />
        <HowItWorksSection steps={trtSteps} />
      </>
    }
    afterCardsContent={
      <>
        <SignsSymptoms />
        <WhatCauses />
        <TRTOverview />
      </>
    }
    afterComparisonContent={
      <>
        <TRTCompetitorComparison />
        <DontWaitBanner />
      </>
    }
    beforeFaqContent={
      <ConsultationFormSection
        heading="FIND OUT IF TRT IS RIGHT FOR YOU"
        checklistItems={[
          "Comprehensive health assessment",
          "Same-day lab results (no waiting)",
          "Personalized treatment recommendations",
          "Transparent pricing — no surprise bills",
        ]}
      />
    }
  />
);

export default TestosteroneService;
