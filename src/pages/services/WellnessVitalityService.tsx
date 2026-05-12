import { Link } from "react-router-dom";
import { Atom, Heart, Shield, Flame, Zap, FlaskConical, Syringe } from "lucide-react";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import { treatments, wellnessVitalityFaqs, getComparisonDataForCategory } from "@/data/treatments";
import HowItWorksSection from "@/components/services/sections/HowItWorksSection";
import DontWaitBanner from "@/components/services/sections/DontWaitBanner";
import ConsultationFormSection from "@/components/services/sections/ConsultationFormSection";

const wvSteps = [
  { number: "01", title: "BOOK YOUR VISIT", subtitle: "TELL US YOUR GOALS", body: "Schedule your wellness consultation. Tell us your goals \u2014 whether it's better recovery, deeper sleep, sharper focus, or all of the above." },
  { number: "02", title: "HEALTH ASSESSMENT", subtitle: "BASELINE LABS", body: "Comprehensive lab work evaluating your biomarkers, inflammatory markers, nutrient levels, and hormone profile. We establish your baseline so we can measure improvement." },
  { number: "03", title: "YOUR WELLNESS PROTOCOL", subtitle: "TAILORED TO YOUR LABS", body: "Your physician designs a custom protocol \u2014 peptide therapy, NAD+, vitamin injections, and other evidence-based therapies \u2014 tailored to your labs, goals, and lifestyle." },
  { number: "04", title: "OPTIMIZE & MONITOR", subtitle: "MEASURABLE RESULTS", body: "Regular biomarker tracking shows measurable improvement. Your protocol is refined over time as your body responds. This is optimization, not guesswork." },
];

const wvTestimonials = [
  { name: "Jason K.", location: "Mechanicsville, VA", date: "March 2026", pill: "Wellness", quote: "I started the peptide therapy protocol (BPC-157 and CJC/Ipamorelin) after a shoulder injury was taking forever to heal. Within 6 weeks, the inflammation was significantly reduced and my recovery in the gym accelerated. I'm 49 and recovering faster than I did at 39. The science behind this is real." },
  { name: "Tyler W.", location: "Glen Allen, VA", date: "February 2026", pill: "Wellness", quote: "The NAD+ therapy combined with the vitamin protocol has been noticeable. Better mental clarity, deeper sleep, and I'm not hitting that 2 PM wall anymore. The team at MWC tracks my biomarkers so we can actually measure the improvements \u2014 not just guess. My inflammatory markers are down 40% since starting." },
  { name: "Derek C.", location: "Suffolk, VA", date: "January 2026", pill: "Wellness", quote: "I was spending $300/month at a vitamin bar getting random IV drips with no lab work behind them. When I switched to MWC, they ran a full panel first and found I was actually deficient in D3 and had elevated homocysteine. Now my protocol targets what I actually need, and I have the lab results to prove it's working." },
];

/* ─── MWC vs Competitors Comparison ─── */
const WVCompetitorComparison = () => {
  const rows = [
    { feature: "Initial Evaluation", mwc: "Physician evaluation + comprehensive labs", comp: "None or brief intake form", diy: "None" },
    { feature: "Medical Supervision", mwc: "Board-certified physician oversight. Protocols based on lab results", comp: "Nurse or tech administration. No physician evaluation", diy: "None \u2014 self-directed" },
    { feature: "Available Therapies", mwc: "Peptide therapy (BPC-157, CJC/Ipamorelin, etc.), NAD+, vitamin injections (B12, D3, glutathione, MIC), custom protocols", comp: "IV drips, B12 shots, glutathione. Limited menu", diy: "OTC supplements \u2014 bioavailability varies widely" },
    { feature: "Personalization", mwc: "Protocols tailored to your labs, goals, and health profile", comp: "Minimal \u2014 choose from a menu", diy: "None \u2014 guessing at dosages and combinations" },
    { feature: "Lab Monitoring", mwc: "Regular lab work to track biomarkers and adjust protocols", comp: "None", diy: "None" },
    { feature: "Quality Assurance", mwc: "Pharmaceutical-grade compounds from CLIA-certified sources", comp: "Variable quality control", diy: "Unregulated supplement industry" },
    { feature: "Expected Benefits", mwc: "Improved recovery, deeper sleep, sustained energy, cognitive clarity, anti-aging effects \u2014 tracked via biomarkers", comp: "Temporary energy boost, hydration", diy: "Variable \u2014 often minimal measurable benefit" },
    { feature: "Who It's Best For", mwc: "Men who want evidence-based wellness optimization with measurable results and physician oversight", comp: "Men looking for occasional wellness boosts (post-travel, hangover recovery)", diy: "Men with basic supplement needs and no complex health goals" },
  ];

  return (
    <section style={{ background: "#EBEAE8" }} className="py-20 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "#4A4A4A" }}>KNOW YOUR OPTIONS</p>
        <h2 className="font-bold uppercase tracking-wide text-2xl md:text-3xl" style={{ color: "#000033" }}>MWC VS. OTHER WELLNESS OPTIONS</h2>
        <div className="overflow-x-auto mt-10 -mx-6 px-6 md:mx-0 md:px-0">
          <table className="w-full text-left" style={{ minWidth: 700 }}>
            <thead>
              <tr>
                <th className="px-4 py-3 text-[13px] font-semibold uppercase" style={{ color: "#000033", background: "#F5F5F5" }}>Feature</th>
                <th className="px-4 py-3 text-[13px] font-semibold uppercase text-center" style={{ color: "#000033", background: "#F5F5F5", borderLeft: "3px solid #E8670A" }}>Men's Wellness Centers</th>
                <th className="px-4 py-3 text-[13px] font-semibold uppercase text-center" style={{ color: "#000033", background: "#F5F5F5" }}>Retail IV/Vitamin Bars</th>
                <th className="px-4 py-3 text-[13px] font-semibold uppercase text-center" style={{ color: "#000033", background: "#F5F5F5" }}>DIY Supplements</th>
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

const VitaminOverview = () => (
  <section style={{ background: "#FFFFFF" }} className="py-20 px-6 md:px-8">
    <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="font-bold uppercase tracking-wide text-2xl md:text-3xl" style={{ color: "#000033" }}>
          WHY VITAMIN INJECTIONS OUTPERFORM ORAL SUPPLEMENTS
        </h2>
        <p className="mt-4 text-base leading-relaxed" style={{ color: "#4A4A4A" }}>
          High-dose B vitamins, NAD+, and MIC compounds hit differently when they go straight into the muscle. When taken orally, vitamins pass through your digestive system where absorption can be inconsistent, especially if you're dealing with gut health issues, stress, or age-related changes.
        </p>
        <p className="mt-4 text-base leading-relaxed" style={{ color: "#4A4A4A" }}>
          Intramuscular injections bypass digestion entirely, delivering nutrients directly to your bloodstream at full potency. The result: faster energy, better immune response, and more consistent results.
        </p>
        <p className="mt-4 text-base leading-relaxed" style={{ color: "#4A4A4A" }}>
          Whether you're recovering from illness, fighting daily fatigue, or optimizing for peak performance, our physician-supervised vitamin therapy gives your system exactly what it needs, without waiting for oral supplements to absorb.
        </p>
        <Link to="/book" className="inline-block mt-8 rounded-full px-10 py-4 text-sm font-bold uppercase tracking-wider" style={{ background: "#000033", color: "#FFFFFF", textDecoration: "none" }}>
          BOOK MY CONSULTATION
        </Link>
      </div>
      <img
        src="https://images.pexels.com/photos/2379886/pexels-photo-2379886.jpeg?auto=compress&cs=tinysrgb&w=800"
        alt="Active man hiking outdoors"
        className="rounded-xl w-full h-[400px] object-cover"
      />
    </div>
  </section>
);

/* ─── Vitamin Shots Section (moved from weight-loss) ─── */
const VitaminShotsGrid = () => (
  <section style={{ background: "#EBEAE8" }} className="py-20 px-6 md:px-8">
    <div className="max-w-[1200px] mx-auto">
      <h2 className="font-bold uppercase tracking-wide text-2xl md:text-3xl text-center" style={{ color: "#000033" }}>WHAT'S IN OUR VITAMIN SHOTS</h2>
      <p className="mt-3 text-base text-center" style={{ color: "#4A4A4A" }}>Physician-prescribed, pharmaceutical-grade formulations tailored to your labs.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {[
          { icon: Zap, name: "B12 (METHYLCOBALAMIN)", ingredients: "Methylcobalamin (active B12)", body: "Sustained energy, nervous system support, red blood cell production, cognitive function." },
          { icon: Shield, name: "D3 (CHOLECALCIFEROL)", ingredients: "Vitamin D3 (high-dose injection)", body: "Bone health, immune function, testosterone support, mood regulation." },
          { icon: FlaskConical, name: "GLUTATHIONE", ingredients: "L-Glutathione (master antioxidant)", body: "Detoxification, cellular repair, immune support, anti-aging, liver health." },
          { icon: Flame, name: "MIC (LIPOTROPIC)", ingredients: "Methionine, Inositol, Choline + B12", body: "Fat metabolism, liver support, energy, weight loss support." },
          { icon: Heart, name: "TRI-IMMUNE BOOST", ingredients: "Glutathione, Zinc, Vitamin C", body: "Immune system support, antioxidant protection, illness recovery." },
          { icon: Atom, name: "NAD+", ingredients: "NAD+ (IV or injection)", body: "Cellular energy, DNA repair, cognitive clarity, anti-aging, addiction recovery support." },
        ].map((item) => (
          <div key={item.name} className="rounded-xl p-6" style={{ background: "#FFFFFF", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <item.icon size={28} color="#000033" className="mb-4" />
            <h3 className="font-bold text-[15px] uppercase" style={{ color: "#000033" }}>{item.name}</h3>
            <p className="text-xs mt-1 italic" style={{ color: "#888" }}>{item.ingredients}</p>
            <p className="text-sm mt-2 leading-relaxed" style={{ color: "#4A4A4A" }}>{item.body}</p>
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

const WellnessVitalityService = () => (
  <ServicePageLayout
    title="WELLNESS & VITALITY"
    subtitle="Energy & Longevity"
    treatments={treatments.filter((t) => t.categorySlug === "wellness-vitality")}
    activeSlug="wellness-vitality"
    heroImage="https://images.pexels.com/photos/3888342/pexels-photo-3888342.jpeg?auto=compress&cs=tinysrgb&w=1600"
    comparisonRows={getComparisonDataForCategory("wellness-vitality")}
    faqs={wellnessVitalityFaqs}
    bottomCtaHeading="Start Your Personalized Wellness Protocol"
    bottomCtaSubtext="From peptide therapy to NAD+ to vitamin injections \u2014 discover the protocol that fits your goals. Book your no-cost consultation today."
    testimonials={wvTestimonials}
    afterHeroContent={
      <HowItWorksSection steps={wvSteps} />
    }
    afterCardsContent={
      <>
        <VitaminOverview />
        <VitaminShotsGrid />
      </>
    }
    afterComparisonContent={
      <>
        <WVCompetitorComparison />
        <DontWaitBanner />
      </>
    }
    beforeFaqContent={
      <ConsultationFormSection
        heading="READY TO BOOST YOUR ENERGY AND VITALITY?"
        bgColor="#EBEAE8"
        checklistItems={[
          "Comprehensive health assessment",
          "Same-day lab results (no waiting)",
          "Personalized wellness plan",
          "Transparent pricing, no surprise bills",
        ]}
      />
    }
  />
);

export default WellnessVitalityService;
