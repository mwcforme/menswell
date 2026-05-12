import { Star } from "lucide-react";

const trustBadges = [
  "Doctor Prescribed",
  "Happiness Guaranteed",
  "Clinically Proven",
  "100% Online",
];

export const LandingSocialProof = () => (
  <section style={{ background: "#EBEAE8", borderTop: "1px solid rgba(0,0,0,0.08)", borderBottom: "1px solid rgba(0,0,0,0.08)" }} className="py-5">
    <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Rating */}
      <div className="flex items-center gap-2.5">
        <span className="text-2xl font-bold" style={{ color: "#000033" }}>4.9</span>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={18} fill="#D4A017" color="#D4A017" />
          ))}
        </div>
        <span className="text-sm font-medium" style={{ color: "#555" }}>1.5k reviews</span>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {trustBadges.map((label) => (
          <span
            key={label}
            className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide"
            style={{ background: "rgba(0,0,51,0.07)", color: "#000033", letterSpacing: "0.04em" }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  </section>
);
