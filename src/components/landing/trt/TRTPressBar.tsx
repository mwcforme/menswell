const logos = ["NBC NEWS", "FORBES", "YAHOO!", "MEN'S FITNESS", "FOX"];

export const TRTPressBar = () => (
  <section
    className="py-5"
    style={{
      background: "#F5F0EB",
      borderTop: "1px solid rgba(0,0,0,0.08)",
      borderBottom: "1px solid rgba(0,0,0,0.08)",
    }}
  >
    <div className="max-w-[1200px] mx-auto px-6 flex items-center gap-6 md:gap-12 overflow-x-auto">
      <span
        className="hidden md:block text-xs uppercase flex-shrink-0"
        style={{ color: "#888888", letterSpacing: "0.15em", fontFamily: "Inter, sans-serif" }}
      >
        As Seen In
      </span>
      <div className="flex items-center gap-10 md:gap-12 mx-auto md:mx-0">
        {logos.map((name) => (
          <span
            key={name}
            className="flex-shrink-0 font-bold text-base uppercase cursor-default transition-opacity duration-200 hover:opacity-90"
            style={{
              color: "rgba(0,0,51,0.60)",
              letterSpacing: "0.08em",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  </section>
);
