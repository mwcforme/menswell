import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  Shield, RefreshCw, Clock, Heart, Target, Sparkles, Flame,
  TrendingDown, Gauge, Zap, Layers, Battery, Dna, Droplet, FlaskConical, Info,
} from "lucide-react";
import type { Treatment } from "@/data/treatments";

const iconMap: Record<string, any> = {
  Shield, RefreshCw, Clock, Heart, Target, Sparkles, Flame,
  TrendingDown, Gauge, Zap, Layers, Battery, Dna, Droplet, FlaskConical,
};

const TreatmentCard = ({ treatment, index = 0 }: { treatment: Treatment; index?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const IconComp = iconMap[treatment.icon];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
    >
      <Link
        to={treatment.link}
        className="block rounded-[14px] overflow-hidden cursor-pointer flex-col h-full"
        style={{
          background: "#FFFFFF",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          transition: "all 0.3s ease-out",
          display: "flex",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)";
          e.currentTarget.style.transform = "translateY(-4px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {/* Icon Area */}
        <div
          className="relative flex items-center justify-center"
          style={{ height: 200, background: "#F5F0EB" }}
        >
          {IconComp && <IconComp size={64} color="#000033" />}

          {/* Badges */}
          {treatment.badges.length > 0 && (
            <div className="absolute top-4 left-0 right-0 flex flex-wrap justify-center gap-2 px-4">
              {treatment.badges.map((badge) =>
                badge.isHighlight ? (
                  <span
                    key={badge.text}
                    className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-semibold"
                    style={{ background: "#E8670A", color: "#FFFFFF" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    {badge.text}
                  </span>
                ) : (
                  <span
                    key={badge.text}
                    className="rounded-full px-3.5 py-1.5 text-[12px] font-medium"
                    style={{ background: "#FFFFFF", border: "1px solid #E5E5E5", color: "#000033" }}
                  >
                    {badge.text}
                  </span>
                )
              )}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col flex-1">
          <h3
            className="font-bold uppercase leading-tight mb-3"
            style={{ fontSize: 20, letterSpacing: "0.5px", color: "#000033" }}
          >
            {treatment.name}
          </h3>
          <p
            className="text-sm leading-[1.7] flex-1"
            style={{
              color: "#666666",
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {treatment.description}
          </p>
          {treatment.note && (
            <p className="flex items-center gap-1.5 mt-3 italic" style={{ fontSize: 13, color: "#666666" }}>
              <Info size={14} /> {treatment.note}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default TreatmentCard;
