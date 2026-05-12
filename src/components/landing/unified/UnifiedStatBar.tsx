const stats = [
  { label: "10,000+ Men Treated" },
  { label: "Since 2015 Serving Virginia" },
  { label: "4.9 Star Average Rating" },
  { label: "3 Virginia Centers" },
];

export const UnifiedStatBar = () => {
  return (
    <section style={{ background: "#1B2A4A" }} className="py-5">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 text-center">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-white text-sm md:text-base font-semibold tracking-wide"
            >
              {stat.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
