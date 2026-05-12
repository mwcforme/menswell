interface SurveyProgressBarProps {
  labels: string[];
  currentIndex: number; // 0-based index of active phase
}

const SurveyProgressBar = ({ labels, currentIndex }: SurveyProgressBarProps) => {
  const font = "'Montserrat', sans-serif";
  return (
    <div className="w-full px-4 pt-3 pb-1">
      <div className="flex gap-1">
        {labels.map((_, i) => (
          <div
            key={i}
            className="relative h-1 flex-1 overflow-hidden"
            style={{ borderRadius: 2, backgroundColor: "rgba(255,255,255,0.08)" }}
          >
            <div
              className="absolute inset-y-0 left-0"
              style={{
                width: i < currentIndex ? "100%" : i === currentIndex ? "100%" : "0%",
                backgroundColor: "#E8670A",
                borderRadius: 2,
                transition: "width 300ms ease-out",
              }}
            />
          </div>
        ))}
      </div>
      <p
        className="mt-2 text-center uppercase"
        style={{
          fontFamily: font,
          fontWeight: 600,
          fontSize: 11,
          color: "#AEB5BF",
          letterSpacing: "0.1em",
        }}
      >
        {labels[currentIndex]}
      </p>
    </div>
  );
};

export default SurveyProgressBar;
