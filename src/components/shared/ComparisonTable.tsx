import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CheckCircle, XCircle } from "lucide-react";

export interface ComparisonRow {
  feature: string;
  us: string;
  them: string;
}

const DEFAULT_ROWS: ComparisonRow[] = [
  { feature: "Lab Work", us: "Same-day, on-site, 15-min results", them: "Mail-in kit, 5-10 day wait" },
  { feature: "Provider Visit", us: "Face-to-face, every time", them: "Video call, rotating providers" },
  { feature: "Physical Exam", us: "Comprehensive, in-person", them: "None" },
  { feature: "Treatment Start", us: "Same day as first visit", them: "2-4 weeks after ordering" },
  { feature: "Follow-Up Care", us: "Unlimited in-person visits", them: "Scheduled video calls" },
  { feature: "Pricing", us: "All-inclusive, no hidden fees", them: "Monthly subscription + add-ons" },
  { feature: "Facility", us: "Private, men-only clinical centers", them: "No physical facility" },
  { feature: "Emergency Questions", us: "Call your center directly", them: "Submit a ticket" },
  { feature: "Initial Consultation + Labs", us: "Included at no cost", them: "Paid or not offered" },
];

interface ComparisonTableProps {
  title?: string;
  rows?: ComparisonRow[];
  cta?: React.ReactNode;
  sectionPadding?: string;
}

export const ComparisonTable = ({
  title = "THE DIFFERENCE IS IN THE DETAILS",
  rows = DEFAULT_ROWS,
  cta,
  sectionPadding = "80px 0",
}: ComparisonTableProps) => {
  const compRef = useScrollReveal({ staggerChildren: true, staggerDelay: 60 });

  return (
    <section style={{ background: "#EBEAE8", padding: sectionPadding, scrollMarginTop: 100 }}>
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2
            className="font-bold uppercase leading-tight"
            style={{ color: "#000033", fontSize: "clamp(1.15rem, 3vw, 1.75rem)" }}
          >
            {title}
          </h2>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-hidden rounded-xl" style={{ background: "#FFFFFF" }}>
          <div
            className="grid grid-cols-3 px-6 py-4"
            style={{ background: "#000033" }}
          >
            <span className="font-semibold text-xs uppercase tracking-[0.12em]" style={{ color: "#FFFFFF" }}>Feature</span>
            <span className="font-semibold text-xs uppercase tracking-[0.12em]" style={{ color: "#FFFFFF" }}>Men's Wellness Centers</span>
            <span className="font-medium text-xs uppercase tracking-[0.12em]" style={{ color: "rgba(255,255,255,0.5)" }}>Online TRT Services</span>
          </div>
          <div ref={compRef}>
            {rows.map((row, i) => (
              <div key={i} className="grid grid-cols-3 px-6 py-4 items-center" style={{ borderBottom: i < rows.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
                <span className="font-semibold text-sm" style={{ color: "#000033" }}>{row.feature}</span>
                <span className="text-sm font-semibold flex items-center gap-2" style={{ color: "#000033" }}>
                  <CheckCircle size={20} style={{ color: "#22C55E", flexShrink: 0 }} /> {row.us}
                </span>
                <span className="text-sm italic flex items-center gap-2" style={{ color: "#999" }}>
                  <XCircle size={20} style={{ color: "#EF4444", flexShrink: 0 }} /> {row.them}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile stacked */}
        <div className="md:hidden space-y-3">
          {rows.map((row) => (
            <div key={row.feature} className="rounded-xl p-4" style={{ background: "#FFFFFF" }}>
              <p className="text-[11px] font-semibold uppercase tracking-wide mb-1.5" style={{ color: "#999" }}>{row.feature}</p>
              <p className="font-semibold text-[14px] leading-snug flex items-center gap-2" style={{ color: "#000033" }}>
                <CheckCircle size={18} style={{ color: "#22C55E", flexShrink: 0 }} /> {row.us}
              </p>
              <p className="text-[13px] italic mt-1.5 flex items-center gap-2" style={{ color: "#999" }}>
                <XCircle size={18} style={{ color: "#EF4444", flexShrink: 0 }} /> vs. {row.them}
              </p>
            </div>
          ))}
        </div>

        {cta && (
          <div className="text-center mt-8 md:mt-10">
            {cta}
          </div>
        )}
      </div>
    </section>
  );
};
