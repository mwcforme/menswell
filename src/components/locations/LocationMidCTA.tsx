export const LocationMidCTA = () => (
  <div className="py-10 text-center" style={{ background: "transparent" }}>
    <button
      onClick={() => document.getElementById("location-cta")?.scrollIntoView({ behavior: "smooth" })}
      className="inline-flex items-center justify-center font-bold uppercase tracking-wider text-[13px] border-none cursor-pointer"
      style={{
        background: "#EA580C",
        color: "#FFFFFF",
        padding: "16px 32px",
        borderRadius: 9999,
        transition: "transform 200ms ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      BOOK MY CONSULTATION
    </button>
  </div>
);
