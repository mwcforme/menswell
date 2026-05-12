export const OGTRTStatBar = () => {
  const stats = [
    { value: "10,000+", label: "Men Treated" },
    { value: "Since 2015", label: "Serving Virginia" },
    { value: "4.9★", label: "Average Rating" },
    { value: "3", label: "Virginia Clinics" },
  ];

  return (
    <section style={{ background: "#004883" }}>
      <div className="max-w-[1200px] mx-auto px-6 py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <p className="text-xl md:text-2xl font-bold" style={{ color: "#ffffff" }}>{s.value}</p>
              <p className="text-[13px] mt-0.5" style={{ color: "rgba(255,255,255,0.75)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};