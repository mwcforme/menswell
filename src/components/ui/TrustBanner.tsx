import { Shield, Lock, Award, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const trustItems = [
  { icon: Lock, label: "HIPAA Compliant" },
  { icon: Award, label: "Board Certified Physicians" },
];

interface TrustBannerProps {
  variant?: "full" | "compact" | "inline";
  showEmergency?: boolean;
}

export const TrustBanner = ({ variant = "inline", showEmergency = false }: TrustBannerProps) => {
  if (variant === "compact") {
    return (
      <div className="bg-muted/50 border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            {trustItems.map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <item.icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "full") {
    return (
      <div className="bg-muted border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-6">
              {trustItems.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
            {showEmergency && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <span>Not for emergencies. <Link to="/telehealth-consent" className="text-primary hover:underline">Call 911</Link></span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default inline variant
  return (
    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 md:gap-x-8 py-4">
      {trustItems.map((item, index) => (
        <div key={item.label} className="flex items-center gap-2">
          <item.icon className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">
            {item.label}
          </span>
          {index < trustItems.length - 1 && (
            <span className="hidden md:block w-px h-3 bg-border ml-6 md:ml-8" />
          )}
        </div>
      ))}
    </div>
  );
};
