import { Link } from "react-router-dom";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import { treatments, weightLossFaqs, getComparisonDataForCategory } from "@/data/treatments";
import HowItWorksSection from "@/components/services/sections/HowItWorksSection";
import DontWaitBanner from "@/components/services/sections/DontWaitBanner";
import ConsultationFormSection from "@/components/services/sections/ConsultationFormSection";

const wlSteps = [
  { number: "01", title: "BOOK YOUR VISIT", subtitle: "NO REFERRAL REQUIRED", body: "Schedule your weight loss consultation. We'll start building your plan from the first visit. No referral required." },
  { number: "02", title: "METABOLIC TESTING", subtitle: "COMPREHENSIVE LABS", body: "Comprehensive lab work including metabolic panel, thyroid function, A1C, lipids, and hormone levels. We identify the metabolic and hormonal factors driving your weight." },
  { number: "03", title: "YOUR WEIGHT LOSS PLAN", subtitle: "BUILT FOR YOUR BODY", body: "Your physician designs a personalized weight loss protocol \u2014 GLP-1 medications, appetite management, hormone optimization, and nutritional guidance tailored to your body and goals." },
  { number: "04", title: "ONGOING MONITORING", subtitle: "SUSTAINABLE RESULTS", body: "Regular check-ins, lab monitoring, and dosage adjustments keep your progress on track. Your provider adapts your plan as your body responds. Sustainable results, not crash dieting." },
];

const wlTestimonials = [
  { name: "Greg M.", location: "Hampton, VA", date: "March 2026", pill: "Weight Loss", quote: "I've tried Keto, Paleo, intermittent fasting \u2014 you name it. I'd lose 15 pounds and gain back 20. Dr. Patterson ran labs and found my thyroid was borderline and my testosterone was tanked. Once we addressed the hormones AND started the GLP-1 medication, the weight finally started coming off and staying off. Down 42 pounds since October." },
  { name: "Carlos R.", location: "Norfolk, VA", date: "February 2026", pill: "Weight Loss", quote: "The semaglutide program at MWC has been a game-changer. I'm not white-knuckling it through every meal anymore. My appetite is controlled, my energy is consistent, and I'm making better choices without the constant battle. The regular check-ins keep me accountable. 28 pounds down in 3 months." },
  { name: "Dennis P.", location: "Williamsburg, VA", date: "January 2026", pill: "Weight Loss", quote: "What separates MWC from the online weight loss clinics is the physician oversight. They're not just handing you a prescription and wishing you luck. My provider adjusted my dosage twice based on how I was responding, added B12 injections when my energy dipped, and checks my metabolic markers every month. This is real medical care." },
];

/* ─── MWC vs Competitors Comparison ─── */
const WLCompetitorComparison = () => {
  const rows = [
    { feature: "Initial Evaluation", mwc: "In-person physician evaluation + metabolic labs", comp: "Online quiz or phone consult", diy: "None" },
    { feature: "Medical Supervision", mwc: "Board-certified physician oversight throughout", comp: "Limited or no physician involvement", diy: "None" },
    { feature: "Medications", mwc: "GLP-1 agonists (semaglutide, tirzepatide), appetite suppressants \u2014 prescribed based on labs and health history", comp: "OTC supplements, meal replacements", diy: "OTC supplements (unregulated)" },
    { feature: "Lab Work", mwc: "Comprehensive metabolic panel, thyroid, A1C, lipids, hormone levels", comp: "None or basic", diy: "None" },
    { feature: "Personalization", mwc: "Protocol customized to your metabolic profile, medications, health conditions, and goals", comp: "Generic calorie/macro plans", diy: "One-size-fits-all online plans" },
    { feature: "Monitoring", mwc: "Regular check-ins, lab monitoring, dosage adjustments", comp: "Weekly weigh-ins (self-reported)", diy: "Self-tracking only" },
    { feature: "Hormone Optimization", mwc: "Addresses underlying hormonal factors (low T, thyroid, cortisol) that sabotage weight loss", comp: "Not addressed", diy: "Not addressed" },
    { feature: "Expected Timeline", mwc: "Meaningful progress in 4-8 weeks with sustained results", comp: "Variable \u2014 high relapse rate", diy: "Variable \u2014 very high relapse rate" },
    { feature: "Who It's Best For", mwc: "Men who've tried dieting and exercise without lasting results, especially those over 40", comp: "Men looking for a structured eating plan without medical intervention", diy: "Men with mild weight loss goals and no underlying health concerns" },
  ];

  return (
    <section style={{ background: "#EBEAE8" }} className="py-20 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "#4A4A4A" }}>KNOW YOUR OPTIONS</p>
        <h2 className="font-bold uppercase tracking-wide text-2xl md:text-3xl" style={{ color: "#000033" }}>MWC VS. OTHER WEIGHT LOSS OPTIONS</h2>
        <div className="overflow-x-auto mt-10 -mx-6 px-6 md:mx-0 md:px-0">
          <table className="w-full text-left" style={{ minWidth: 700 }}>
            <thead>
              <tr>
                <th className="px-4 py-3 text-[13px] font-semibold uppercase" style={{ color: "#000033", background: "#F5F5F5" }}>Feature</th>
                <th className="px-4 py-3 text-[13px] font-semibold uppercase text-center" style={{ color: "#000033", background: "#F5F5F5", borderLeft: "3px solid #E8670A" }}>Men's Wellness Centers</th>
                <th className="px-4 py-3 text-[13px] font-semibold uppercase text-center" style={{ color: "#000033", background: "#F5F5F5" }}>Commercial Diet Programs</th>
                <th className="px-4 py-3 text-[13px] font-semibold uppercase text-center" style={{ color: "#000033", background: "#F5F5F5" }}>DIY / Self-Directed</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.feature}>
                  <td className="px-4 py-3 text-sm font-semibold" style={{ color: "#000033", borderBottom: "1px solid #E5E5E5" }}>{r.feature}</td>
                  <td className="px-4 py-3 text-sm font-medium" style={{ color: "#000033", borderBottom: "1px solid #E5E5E5", borderLeft: "3px solid #E8670A" }}>{r.mwc}</td>
                  <td className="px-4 py-3 text-sm italic" style={{ color: "#888", borderBottom: "1px solid #E5E5E5" }}>{r.comp}</td>
                  <td className="px-4 py-3 text-sm italic" style={{ color: "#888", borderBottom: "1px solid #E5E5E5" }}>{r.diy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

const FatBurningSolutions = () => (
  <section style={{ background: "#FFFFFF" }} className="py-20 px-6 md:px-8">
    <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="font-bold uppercase tracking-wide text-2xl md:text-3xl" style={{ color: "#000033" }}>FAT-BURNING SOLUTIONS</h2>
        <p className="mt-4 text-base leading-relaxed" style={{ color: "#4A4A4A" }}>
          Losing weight and keeping your energy up can feel like an uphill battle, especially as you get older. Our physician-supervised weight loss program combines medical expertise with proven medications designed to help you burn fat and feel great. Each plan is customized to your body, your goals, and your lifestyle.
        </p>
        <p className="mt-4 text-xs italic" style={{ color: "#888" }}>
          Each individual's treatment and/or results may vary based upon the circumstances and the member's specific situation.
        </p>
        <Link to="/book" className="inline-block mt-8 rounded-full px-10 py-4 text-sm font-bold uppercase tracking-wider" style={{ background: "#000033", color: "#FFFFFF", textDecoration: "none" }}>
          BOOK MY CONSULTATION
        </Link>
      </div>
      <img
        src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800"
        alt="Man training with battle ropes outdoors"
        className="rounded-xl w-full h-[400px] object-cover"
      />
    </div>
  </section>
);

const WeightLossService = () => (
  <ServicePageLayout
    title="WEIGHT LOSS & METABOLIC HEALTH"
    subtitle="Medical Weight Management"
    treatments={treatments.filter((t) => t.categorySlug === "weight-loss")}
    activeSlug="weight-loss"
    heroImage="https://images.pexels.com/photos/936094/pexels-photo-936094.jpeg?auto=compress&cs=tinysrgb&w=1600"
    comparisonRows={getComparisonDataForCategory("weight-loss")}
    faqs={weightLossFaqs}
    bottomCtaHeading="Find Out If Medical Weight Loss Is Right for You"
    bottomCtaSubtext="Your no-cost consultation includes metabolic testing and a personalized plan. Stop guessing \u2014 start losing weight with physician-guided care."
    testimonials={wlTestimonials}
    afterHeroContent={
      <HowItWorksSection
        eyebrow="SIMPLE 4-STEP PROCESS"
        heading="HOW IT WORKS"
        subheading="Most members complete their evaluation in a single 60-minute visit and leave with lab results in hand."
        steps={wlSteps}
        ctaText="BOOK MY CONSULTATION"
      />
    }
    afterCardsContent={<FatBurningSolutions />}
    afterComparisonContent={
      <>
        <WLCompetitorComparison />
        <DontWaitBanner />
      </>
    }
    beforeFaqContent={
      <ConsultationFormSection
        heading="READY TO START YOUR WEIGHT LOSS PROGRAM?"
        bgColor="#FFFFFF"
        checklistItems={[
          "Comprehensive health assessment",
          "Same-day lab results (no waiting)",
          "Personalized weight loss plan",
          "Transparent pricing, no surprise bills",
        ]}
      />
    }
  />
);

export default WeightLossService;
