import { ComparisonTable } from "@/components/shared/ComparisonTable";

export const LocationComparison = () => {
  return (
    <ComparisonTable
      cta={
        <button
          onClick={() => document.getElementById("location-cta")?.scrollIntoView({ behavior: "smooth" })}
          className="inline-flex items-center justify-center rounded-full font-semibold uppercase cursor-pointer border-none transition-all duration-200 hover:scale-[1.02]"
          style={{
            background: "#F97316",
            color: "#FFFFFF",
            padding: "16px 32px",
            fontSize: 13,
            letterSpacing: "0.05em",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#EA580C")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#F97316")}
          data-cta-type="book"
        >
          BOOK MY CONSULTATION
        </button>
      }
    />
  );
};
