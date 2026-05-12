import { MapPin, Phone, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const locations = [
  { name: "Richmond, VA", address: "4050 Innslake Dr, Suite 360, Glen Allen", phone: "804-346-4636", slug: "/locations/richmond-va" },
  { name: "Newport News, VA", address: "827 Diligence Dr, Suite 206", phone: "757-806-6263", slug: "/locations/newport-news-va" },
  { name: "Virginia Beach, VA", address: "996 First Colonial Road", phone: "757-806-6263", slug: "/locations/virginia-beach-va" },
];

interface LocationsMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const LocationsMegaMenu = ({ isOpen, onClose, onMouseEnter, onMouseLeave }: LocationsMegaMenuProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div
      className="fixed z-[100]"
      style={{ top: 80, left: "50%", transform: "translateX(-50%)" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="w-[440px] rounded-b-2xl"
        style={{
          background: "#FFFFFF",
          borderTop: "3px solid #E8670A",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          animation: "megaMenuIn 250ms ease-out forwards",
          padding: "20px 24px 24px",
        }}
      >
        <p className="text-[11px] uppercase tracking-[0.15em] font-semibold mb-3" style={{ color: "#999" }}>
          Our Virginia Centers
        </p>

        <div className="space-y-1">
          {locations.map((loc) => (
            <div
              key={loc.name}
              className="flex items-start gap-3 p-3.5 rounded-xl cursor-pointer transition-colors duration-200 hover:bg-[#f5f4f2]"
              onClick={() => { onClose(); navigate(loc.slug); }}
            >
              <MapPin size={20} style={{ color: "#E8670A", marginTop: 2 }} className="flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[15px]" style={{ color: "#000033" }}>{loc.name}</p>
                <p className="text-[12px]" style={{ color: "#777" }}>{loc.address}</p>
                <a
                  href={`tel:${loc.phone.replace(/-/g, "")}`}
                  className="text-[12px] hover:opacity-70 transition-opacity"
                  style={{ color: "#999", textDecoration: "none" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {loc.phone}
                </a>
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wide flex-shrink-0 mt-1" style={{ color: "#E8670A" }}>
                View <ArrowUpRight size={12} style={{ display: "inline", verticalAlign: "middle" }} />
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => { onClose(); navigate("/locations"); }}
          className="w-full mt-3 rounded-full py-3 text-[12px] font-semibold uppercase tracking-[0.06em] cursor-pointer transition-colors duration-200"
          style={{ background: "#000033", color: "#FFFFFF", border: "none" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,0,51,0.8)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#000033"; }}
        >
          View All Locations
        </button>
      </div>
    </div>
  );
};
