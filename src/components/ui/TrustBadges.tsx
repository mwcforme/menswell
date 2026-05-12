import { Lock, Award, CheckCircle } from "lucide-react";

const badges = [
  { icon: Lock, label: "HIPAA Compliant" },
  { icon: Award, label: "Board Certified" },
  { icon: CheckCircle, label: "FDA Approved Rx" },
];

export const TrustBadges = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {badges.map((badge) => (
        <div
          key={badge.label}
          className="flex items-center gap-2 rounded-lg"
          style={{
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(255,255,255,0.15)",
            padding: "8px 16px",
          }}
        >
          <badge.icon className="h-4 w-4 text-white" />
          <span
            className="text-white uppercase font-medium"
            style={{ fontSize: "11px", letterSpacing: "1px" }}
          >
            {badge.label}
          </span>
        </div>
      ))}
    </div>
  );
};
