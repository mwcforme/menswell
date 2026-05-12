const stats = [
  { value: "10,000+", label: "Members Across Virginia" },
  { value: "10+", label: "Years of Experience" },
  { value: "Same-Day", label: "Appointments Available" },
];

const GHLTRTStatBar = () => (
  <section style={{ backgroundColor: "#000033" }} className="py-10 md:py-16">
    <div className="max-w-[1170px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 text-center">
      {stats.map((s, i) => (
        <div key={i} className={i < stats.length - 1 ? "border-b sm:border-b-0 border-white/10 pb-4 sm:pb-0" : ""}>
          <p
            style={{ fontFamily: "'Bebas Neue', cursive", color: "#E8670A" }}
            className="text-[28px] md:text-[64px] leading-none"
          >
            {s.value}
          </p>
          <p className="text-white/80 text-sm font-medium mt-1 md:mt-2 uppercase tracking-wider">{s.label}</p>
        </div>
      ))}
    </div>
  </section>
);

export default GHLTRTStatBar;
