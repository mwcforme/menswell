import { ComparisonTable } from "@/components/shared/ComparisonTable";

export const Comparison = () => {
  return (
    <ComparisonTable
      sectionPadding="56px 0"
      cta={
        <a
          href="/book"
          className="inline-block rounded-full px-10 py-3.5 text-[13px] font-semibold uppercase cursor-pointer transition-opacity duration-200 hover:opacity-90"
          style={{ background: "#E8670A", color: "#FFFFFF", textDecoration: "none" }}
        >
          Book My Consultation
        </a>
      }
    />
  );
};
