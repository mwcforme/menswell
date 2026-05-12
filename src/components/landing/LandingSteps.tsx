interface Step {
  number: string;
  title: string;
  desc: string;
}

interface LandingStepsProps {
  steps: Step[];
}

export const LandingSteps = ({ steps }: LandingStepsProps) => (
  <section className="py-12 md:py-16" style={{ background: "#FFFFFF" }}>
    <div className="max-w-[960px] mx-auto px-6">
      <h2
        className="font-bold text-2xl text-center mb-2"
        style={{ color: "#000033" }}
      >
        How It Works
      </h2>
      <p
        className="text-sm text-center mb-14 uppercase font-medium"
        style={{ color: "#888888", letterSpacing: "0.1em" }}
      >
        3 steps. One visit. Same-day answers.
      </p>

      {/* Desktop: horizontal timeline */}
      <div className="hidden md:block relative">
        {/* Connecting line */}
        <div
          className="absolute h-[1px] top-[24px] left-[17%] right-[17%]"
          style={{ background: "#D1D1CB", zIndex: 0 }}
        />

        <div className="flex justify-between relative" style={{ zIndex: 1 }}>
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-center"
              style={{ width: "33.333%" }}
            >
              {/* Circle */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: "#FFFFFF",
                  border: "2px solid #E8670A",
                }}
              >
                <span
                  className="font-bold text-sm"
                  style={{ color: "#E8670A", letterSpacing: "0.08em" }}
                >
                  {step.number}
                </span>
              </div>

              <h3
                className="font-bold text-base text-center mt-5"
                style={{ color: "#000033" }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm text-center mt-2 max-w-[240px] leading-relaxed"
                style={{ color: "#4A4A4A" }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="md:hidden relative">
        {/* Vertical connecting line */}
        <div
          className="absolute w-[1px] top-[24px] bottom-[24px] left-[23px]"
          style={{ background: "#D1D1CB", zIndex: 0 }}
        />

        <div className="flex flex-col" style={{ zIndex: 1 }}>
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="flex flex-row gap-5 relative"
              style={{
                zIndex: 1,
                paddingBottom: i < steps.length - 1 ? 32 : 0,
              }}
            >
              {/* Circle */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: "#FFFFFF",
                  border: "2px solid #E8670A",
                }}
              >
                <span
                  className="font-bold text-sm"
                  style={{ color: "#E8670A", letterSpacing: "0.08em" }}
                >
                  {step.number}
                </span>
              </div>

              <div className="flex flex-col pt-1">
                <h3
                  className="font-bold text-base text-left"
                  style={{ color: "#000033" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm text-left leading-relaxed mt-1"
                  style={{ color: "#4A4A4A" }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
