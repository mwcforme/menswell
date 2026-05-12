import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingSteps } from "@/components/landing/LandingSteps";
import { LandingBenefits } from "@/components/landing/LandingBenefits";
import { LandingTestimonials } from "@/components/landing/LandingTestimonials";
import { LandingFinalCTA } from "@/components/landing/LandingFinalCTA";
import { useEffect } from "react";

const WeightLossLandingPage = () => {
  useEffect(() => {
    document.title = "Medical Weight Loss Virginia | Physician-Supervised | Men's Wellness Centers";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Physician-supervised weight loss programs for men in Virginia. Nutrient-rich vitamin injections, metabolic testing, and custom protocols.");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      <main className="flex-1">
        <LandingHero
          headline="Medical Weight Loss. Built on Lab Work."
          subheadline="Your physician runs the labs, builds the plan, and monitors every pound. Stimulant-free vitamin injections at 3 Virginia centers."
          benefits={[
            "Stimulant-free vitamin injections",
            "Full metabolic and hormone panel, on-site",
            "Your plan comes from your bloodwork, not a template",
            "Your physician tracks your progress, not an app",
          ]}
          bgImageUrl="https://images.pexels.com/photos/4048182/pexels-photo-4048182.jpeg?auto=compress&cs=tinysrgb&w=1920"
        />
        <LandingSteps
          steps={[
            { number: "01", title: "Full Workup", desc: "Metabolic panel, hormone levels, body composition. Your physician sees the full picture at our on-site lab." },
            { number: "02", title: "Your Protocol", desc: "Based on your labs, not a generic plan. Vitamin injections, hormone optimization, and a roadmap that fits your life." },
            { number: "03", title: "Track It Together", desc: "Regular check-ins with your physician. We measure progress and adjust the plan as your body changes." },
          ]}
        />
        <LandingBenefits
          sectionTitle="Why Us"
          sectionSubtitle="What's different about losing weight here."
          cards={[
            { title: "Physician-Run, Not App-Run", desc: "A licensed physician designs your plan and monitors you in person. No chatbots, no generic PDF." },
            { title: "Stimulant-Free Injections", desc: "Our nutrient-rich vitamin injections boost metabolism and energy without stimulants or harsh side effects." },
            { title: "Your Hormones Might Be the Problem", desc: "Low T tanks your metabolism. We test your hormones on-site and can treat both issues at the same center." },
            { title: "Built for Men's Bodies", desc: "Men lose weight differently. Our programs account for male metabolism, hormones, and muscle preservation." },
          ]}
        />
        <LandingTestimonials
          testimonials={[
            { quote: "Down 30 pounds in 4 months. The injections gave me energy I haven't had in years, and the physician actually monitors everything.", name: "Brian K.", location: "Richmond, VA" },
            { quote: "I tried every diet. Turns out my testosterone was tanked and my metabolism was shot. They fixed both.", name: "Steve P.", location: "Newport News, VA" },
            { quote: "No gimmicks, no supplements you don't need. Just a physician who looks at your labs and tells you exactly what to do.", name: "Mark D.", location: "Virginia Beach, VA" },
          ]}
        />
        <LandingFinalCTA
          headline="Ready to See Your Labs?"
          subheadline="Book a no-cost consultation at any of our 3 Virginia centers. Your physician starts with bloodwork, not guesswork."
        />
      </main>
      <LandingFooter />
    </div>
  );
};

export default WeightLossLandingPage;
