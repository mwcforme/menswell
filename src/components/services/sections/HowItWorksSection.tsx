import { Link } from "react-router-dom";

export interface Step {
  number: string;
  title: string;
  subtitle: string;
  body: string;
}

const defaultSteps: Step[] = [
  {
    number: "01",
    title: "BOOK MY VISIT",
    subtitle: "TAKES 2 MINUTES",
    body: "Schedule online or call now. Appointments often available. Choose Richmond, Newport News, or Virginia Beach.",
  },
  {
    number: "02",
    title: "GET TESTED ON-SITE",
    subtitle: "RESULTS BEFORE YOU LEAVE",
    body: "Quick, on-site blood work measures your testosterone, PSA, and key health markers. No waiting days for results.",
  },
  {
    number: "03",
    title: "MEET YOUR PHYSICIAN",
    subtitle: "FACE-TO-FACE REVIEW",
    body: "Your Virginia-licensed physician reviews results with you personally, answers your questions, and creates a treatment plan.",
  },
  {
    number: "04",
    title: "START FEELING BETTER",
    subtitle: "ONGOING SUPPORT INCLUDED",
    body: "If treatment is appropriate, you may begin the same day. All follow-up visits, labs, and adjustments included. No surprise fees.",
  },
];

interface Props {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  steps?: Step[];
  ctaText?: string;
}

const HowItWorksSection = ({
  eyebrow = "SIMPLE. FAST. PROFESSIONAL.",
  heading = "FROM FIRST CALL TO FEELING BETTER",
  subheading = "Most members complete their evaluation and know their results in a single 60-minute visit.",
  steps = defaultSteps,
  ctaText = "BOOK MY CONSULTATION",
}: Props) => (
  <section style={{ background: "#EBEAE8" }} className="py-20 px-6 md:px-8">
    <div className="max-w-[1200px] mx-auto text-center">
      <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "#4A4A4A" }}>
        {eyebrow}
      </p>
      <h2 className="font-bold uppercase tracking-wide text-2xl md:text-3xl" style={{ color: "#000033" }}>
        {heading}
      </h2>
      <p className="mt-4 text-base max-w-[600px] mx-auto" style={{ color: "#4A4A4A" }}>
        {subheading}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {steps.map((step, i) => (
          <div
            key={step.number}
            className="rounded-xl p-6 text-left"
            style={{ background: "#FFFFFF", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
          >
            <span
              className="text-sm font-bold"
              style={{ color: i < 3 ? "#E8670A" : "#000033" }}
            >
              {step.number}
            </span>
            <h3 className="font-bold text-[15px] uppercase mt-3" style={{ color: "#000033" }}>
              {step.title}
            </h3>
            <p className="text-xs uppercase tracking-wider mt-1" style={{ color: "#4A4A4A" }}>
              {step.subtitle}
            </p>
            <p className="text-sm mt-3 leading-relaxed" style={{ color: "#4A4A4A" }}>
              {step.body}
            </p>
          </div>
        ))}
      </div>

      <Link
        to="/book"
        className="inline-block mt-10 rounded-full px-10 py-4 text-sm font-bold uppercase tracking-wider transition-opacity duration-200"
        style={{ background: "#000033", color: "#FFFFFF", textDecoration: "none" }}
      >
        {ctaText}
      </Link>
    </div>
  </section>
);

export default HowItWorksSection;
