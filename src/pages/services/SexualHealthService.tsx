import { Link } from "react-router-dom";
import { Check, ClipboardList, Shield, FileText, User } from "lucide-react";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import { treatments, sexualHealthFaqs, getComparisonDataForCategory } from "@/data/treatments";
import HowItWorksSection from "@/components/services/sections/HowItWorksSection";
import DontWaitBanner from "@/components/services/sections/DontWaitBanner";

const shSteps = [
  { number: "01", title: "BOOK YOUR VISIT", subtitle: "PRIVATE & CONFIDENTIAL", body: "Schedule your confidential consultation. Our clinics are private, professional, and exclusively for men. No referral needed." },
  { number: "02", title: "CONFIDENTIAL EVALUATION", subtitle: "ROOT CAUSE INVESTIGATION", body: "Your provider conducts a thorough evaluation \u2014 physical exam, comprehensive labs, cardiovascular markers, and hormone levels. We investigate the root cause, not just the symptom." },
  { number: "03", title: "DISCUSS YOUR OPTIONS", subtitle: "PERSONALIZED APPROACH", body: "Based on your results, your provider presents treatment options \u2014 from PDE5 inhibitors to injectable therapies to hormone optimization. You choose the approach that's right for you." },
  { number: "04", title: "START TREATMENT", subtitle: "ONGOING OPTIMIZATION", body: "Begin your treatment protocol with confidence. Regular follow-ups ensure the protocol is effective, and adjustments are made as needed for optimal results." },
];

const shTestimonials = [
  { name: "Richard T.", location: "Virginia Beach, VA", date: "February 2026", pill: "Sexual Health", quote: "This isn't the easiest thing to talk about, but MWC made it as comfortable as possible. The clinic is private, professional, and there's zero judgment. After a thorough evaluation, we found out my ED was partly hormonal. Between the testosterone optimization and the treatment protocol, things are working better than they have in years. My only regret is not going sooner." },
  { name: "Steve H.", location: "Chesapeake, VA", date: "March 2026", pill: "Sexual Health", quote: "I went to my regular doctor first. He spent 5 minutes with me, wrote a Viagra prescription, and sent me on my way. It barely worked. At MWC, they actually investigated WHY \u2014 ran labs, checked my cardiovascular markers, looked at the whole picture. The combination protocol they put me on has been incredibly effective." },
  { name: "Paul N.", location: "Newport News, VA", date: "January 2026", pill: "Sexual Health", quote: "At 52, I thought this was just something I had to accept. My wife and I were both frustrated. The team at the Newport News clinic was straightforward, professional, and gave me options I didn't know existed. Two months in and our relationship has a new energy. These men know what they're doing." },
];

/* ─── MWC vs Competitors Comparison ─── */
const SHCompetitorComparison = () => {
  const rows = [
    { feature: "Initial Evaluation", mwc: "In-person, confidential evaluation with physical exam + labs", online: "Online questionnaire (no exam, no labs)", pcp: "Standard office visit \u2014 may feel rushed or uncomfortable" },
    { feature: "Diagnostic Approach", mwc: "Comprehensive \u2014 checks testosterone, cardiovascular markers, metabolic health, psychological factors", online: "Symptom-based only. No lab work. No root-cause investigation", pcp: "Basic \u2014 may test testosterone, often prescribes without full workup" },
    { feature: "Treatment Options", mwc: "PDE5 inhibitors, injectable therapies (Trimix), testosterone optimization if indicated, combination protocols", online: "PDE5 inhibitors only (Viagra, Cialis generics)", pcp: "PDE5 inhibitor prescription (usually one medication)" },
    { feature: "Provider Expertise", mwc: "Physicians and NPs specializing in men's sexual health", online: "General telemedicine provider", pcp: "Generalist \u2014 may refer to urologist (additional wait time)" },
    { feature: "Confidentiality", mwc: "Private clinic setting. Discreet. Men-only environment", online: "Pharmacy delivery to your door", pcp: "Shared waiting rooms. May require referral conversations" },
    { feature: "Follow-Up", mwc: "Regular check-ins. Dosage optimization. Protocol adjustments based on response", online: "Automated refills. Limited provider access", pcp: "Annual visit. Limited ongoing management" },
    { feature: "Root Cause Focus", mwc: "Yes \u2014 addresses hormonal, vascular, and metabolic causes, not just symptoms", online: "No \u2014 symptom management only", pcp: "Sometimes \u2014 depends on PCP's comfort level with men's sexual health" },
    { feature: "Who It's Best For", mwc: "Men who want a thorough evaluation and a long-term solution \u2014 not just a pill", online: "Men with mild, occasional ED who want convenience and privacy", pcp: "Men with insurance coverage who want a starting point" },
  ];

  return (
    <section style={{ background: "#EBEAE8" }} className="py-20 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "#4A4A4A" }}>KNOW YOUR OPTIONS</p>
        <h2 className="font-bold uppercase tracking-wide text-2xl md:text-3xl" style={{ color: "#000033" }}>MWC VS. OTHER ED TREATMENT OPTIONS</h2>
        <div className="overflow-x-auto mt-10 -mx-6 px-6 md:mx-0 md:px-0">
          <table className="w-full text-left" style={{ minWidth: 700 }}>
            <thead>
              <tr>
                <th className="px-4 py-3 text-[13px] font-semibold uppercase" style={{ color: "#000033", background: "#F5F5F5" }}>Feature</th>
                <th className="px-4 py-3 text-[13px] font-semibold uppercase text-center" style={{ color: "#000033", background: "#F5F5F5", borderLeft: "3px solid #E8670A" }}>Men's Wellness Centers</th>
                <th className="px-4 py-3 text-[13px] font-semibold uppercase text-center" style={{ color: "#000033", background: "#F5F5F5" }}>Online ED Pill Services</th>
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

const EDIntro = () => (
  <section style={{ background: "#FFFFFF" }} className="py-20 px-6 md:px-8">
    <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="font-bold uppercase tracking-wide text-2xl md:text-3xl" style={{ color: "#000033" }}>
          ARE YOU HAVING WEAKER ERECTIONS? SIGNS OF ERECTILE DYSFUNCTION
        </h2>
        <p className="mt-4 text-base leading-relaxed" style={{ color: "#4A4A4A" }}>
          It can be tough to talk about, but changes in your sexual health are something a lot of men go through. Maybe it's harder to get or keep an erection. Maybe you're not feeling as confident. Whatever it is, it's treatable, and you don't have to just live with it.
        </p>
        <p className="mt-4 text-base leading-relaxed" style={{ color: "#4A4A4A" }}>
          Around 30 million men in the U.S. deal with ED — and it's treatable. About 52% of men who are prescribed common oral tablets don't end up using them for long. That's because a real solution needs to be as individual as you are.
        </p>
        <p className="mt-4 text-base leading-relaxed" style={{ color: "#4A4A4A" }}>
          Finding out what works means looking at the whole picture. Our physicians are dedicated to understanding the physical and mental factors at play, so we can build a personalized therapy that helps you talk to a physician.
        </p>
      </div>
      <img
        src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800"
        alt="Confident man smiling outdoors"
        className="rounded-xl w-full h-[400px] object-cover"
      />
    </div>
  </section>
);

const EDSolutions = () => (
  <section style={{ background: "#FFFFFF" }} className="py-20 px-6 md:px-8">
    <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <img
        src="https://images.pexels.com/photos/2803158/pexels-photo-2803158.jpeg?auto=compress&cs=tinysrgb&w=800"
        alt="Man running outdoors"
        className="rounded-xl w-full h-[400px] object-cover"
      />
      <div>
        <h2 className="font-bold uppercase tracking-wide text-2xl md:text-3xl" style={{ color: "#000033" }}>
          ERECTILE DYSFUNCTION SOLUTIONS AND ED TREATMENT OPTIONS
        </h2>
        <p className="mt-4 text-base leading-relaxed" style={{ color: "#4A4A4A" }}>
          Losing weight, exercising, and quitting smoking can naturally help manage ED symptoms. But sometimes that's not enough. We offer comprehensive ED care with multiple treatment options beyond oral medication, including a treatment program tailored to each member's specific medical needs.
        </p>
        <p className="mt-4 text-base leading-relaxed" style={{ color: "#4A4A4A" }}>
          Treatment effectiveness varies by individual. It's painless, safe, and has a low report of side effects. We can also treat other male sexual health concerns, including premature ejaculation (PE) and testosterone-related erectile dysfunction. Low testosterone causing ED is more common than many men realize. If you suspect low T may be contributing, explore our testosterone replacement therapy options.
        </p>
        <p className="mt-4 text-xs italic" style={{ color: "#888" }}>
          Each individual's treatment and/or results may vary based upon the circumstances and the member's specific situation.
        </p>
         <Link to="/book" className="inline-block mt-8 rounded-full px-10 py-4 text-sm font-bold uppercase tracking-wider" style={{ background: "#000033", color: "#FFFFFF", textDecoration: "none" }}>
          BOOK MY CONSULTATION
        </Link>
      </div>
    </div>
  </section>
);

const EDCauses = () => (
  <section style={{ background: "#EBEAE8" }} className="py-20 px-6 md:px-8">
    <div className="max-w-[1200px] mx-auto">
      <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "#4A4A4A" }}>UNDERSTANDING THE SIGNS OF ED</p>
      <h2 className="font-bold uppercase tracking-wide text-2xl md:text-3xl" style={{ color: "#000033" }}>COMMON ERECTILE DYSFUNCTION CAUSES AND RISK FACTORS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3 mt-10">
        {[
          "Smoking", "Heart disease",
          "High cholesterol or high blood pressure", "Sleep disorders",
          "Diabetes", "Overweight and obesity",
          "Parkinson's disease or multiple sclerosis", "Peyronie's disease",
          "Certain prescription medications", "Alcoholism and substance abuse",
          "Clogged blood vessels (atherosclerosis)", "Treatments for prostate cancer or enlarged prostate",
        ].map((item) => (
          <div key={item} className="flex items-start gap-2 py-1.5">
            <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#4A4A4A" }} />
            <span className="text-sm" style={{ color: "#4A4A4A" }}>{item}</span>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link to="/book" className="inline-block rounded-full px-10 py-4 text-sm font-bold uppercase tracking-wider" style={{ background: "#000033", color: "#FFFFFF", textDecoration: "none" }}>
          BOOK MY CONSULTATION
        </Link>
      </div>
    </div>
  </section>
);

const EDSpecialist = () => (
  <section style={{ background: "#FFFFFF" }} className="py-20 px-6 md:px-8">
    <div className="max-w-[1200px] mx-auto">
      <h2 className="font-bold uppercase tracking-wide text-2xl md:text-3xl" style={{ color: "#000033" }}>FINDING THE RIGHT ED SPECIALIST</h2>
      <p className="mt-4 text-base leading-relaxed max-w-[700px]" style={{ color: "#4A4A4A" }}>
        If you're experiencing difficulty getting or maintaining an erection, our team of experienced physicians and men's health specialists is here to help. We provide expert, compassionate care tailored to your needs. Have more questions? Check our FAQ section below.
      </p>
      <div className="flex flex-wrap gap-6 mt-8">
        {[
          { icon: ClipboardList, text: "Private consultation" },
          { icon: Shield, text: "Same-day test results" },
          { icon: FileText, text: "Individualized treatment plans" },
          { icon: User, text: "Quick follow-up appointments" },
        ].map((f) => (
          <div key={f.text} className="flex items-center gap-3">
            <Check size={18} color="#2ECC71" />
            <span className="text-sm font-medium" style={{ color: "#000033" }}>{f.text}</span>
          </div>
        ))}
      </div>
      <Link to="/book" className="inline-block mt-8 rounded-full px-10 py-4 text-sm font-bold uppercase tracking-wider" style={{ background: "#000033", color: "#FFFFFF", textDecoration: "none" }}>
        BOOK MY CONSULTATION
      </Link>
    </div>
  </section>
);

const SexualHealthService = () => (
  <ServicePageLayout
    title="SEXUAL HEALTH & CONFIDENCE"
    subtitle="Performance & Confidence"
    treatments={treatments.filter((t) => t.categorySlug === "sexual-health")}
    activeSlug="sexual-health"
    heroImage="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600"
    comparisonRows={getComparisonDataForCategory("sexual-health")}
    faqs={sexualHealthFaqs}
    bottomCtaHeading="Take the First Step Toward Better Sexual Health"
    bottomCtaSubtext="Confidential consultations. Proven treatments. Real results. Book your no-cost visit and take control of your sexual health today."
    testimonials={shTestimonials}
    afterHeroContent={
      <>
        <EDIntro />
        <HowItWorksSection steps={shSteps} />
      </>
    }
    afterCardsContent={
      <>
        <EDSolutions />
        <EDCauses />
        <EDSpecialist />
      </>
    }
    afterComparisonContent={
      <>
        <SHCompetitorComparison />
        <DontWaitBanner />
      </>
    }
  />
);

export default SexualHealthService;
