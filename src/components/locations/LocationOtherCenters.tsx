import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { allLocations } from "@/data/locations";

interface Props {
  currentSlug: string;
}

export const LocationOtherCenters = ({ currentSlug }: Props) => {
  const others = allLocations.filter((l) => l.slug !== currentSlug);

  return (
    <section style={{ background: "#FFFFFF", padding: "80px 0" }}>
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <h2
          className="font-bold uppercase leading-tight text-center mb-8"
          style={{ color: "#000033", fontSize: "clamp(1rem, 2.5vw, 1.35rem)" }}
        >
          VISIT OUR OTHER CENTERS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {others.map((loc) => (
            <Link
              key={loc.slug}
              to={`/locations/${loc.slug}`}
              className="group flex flex-col p-5 md:p-6 rounded-xl transition-all duration-200"
              style={{
                background: "#FAFAF9",
                textDecoration: "none",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.10)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
              }}
            >
              {/* Header with map pin */}
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="flex items-center justify-center rounded-full flex-shrink-0"
                  style={{ width: 36, height: 36, background: "rgba(249,115,22,0.1)" }}
                >
                  <MapPin size={18} style={{ color: "#F97316" }} />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-[15px] uppercase tracking-wide" style={{ color: "#000033" }}>
                    {loc.city}, {loc.state}
                  </p>
                  <p className="text-[12px] mt-0.5" style={{ color: "#888" }}>
                    {loc.address}
                  </p>
                </div>
              </div>

              {/* Google rating */}
              <div className="flex items-center gap-1.5 mb-4">
                <Star size={14} fill="#F59E0B" color="#F59E0B" />
                <span className="text-[12px] font-semibold" style={{ color: "#000033" }}>
                  {loc.googleRating}
                </span>
                <span className="text-[12px]" style={{ color: "#888" }}>
                  ({loc.googleReviewCount} reviews)
                </span>
              </div>

              {/* Tier 2 button */}
              <span
                className="inline-flex items-center justify-center gap-1.5 rounded-full font-semibold uppercase self-start transition-all duration-200"
                style={{
                  background: "#0F2A4A",
                  color: "#FFFFFF",
                  padding: "10px 20px",
                  fontSize: 11,
                  letterSpacing: "0.05em",
                }}
              >
                View Center
                <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
