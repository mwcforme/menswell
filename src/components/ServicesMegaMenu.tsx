import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const categories = [
  {
    title: "Testosterone Therapy",
    slug: "testosterone-therapy",
    links: [
      "Testosterone Replacement Therapy",
      "Enclomiphene Therapy",
      "Testosterone Pellets",
    ],
  },
  {
    title: "Sexual Health & ED",
    slug: "sexual-health",
    links: [
      "ED Medications (Sildenafil / Tadalafil)",
      "ICP Injections",
      "ED Troches",
      "PT-141 Peptide Injections",
    ],
  },
  {
    title: "Weight Loss",
    slug: "weight-loss",
    links: [
      "Semaglutide (GLP-1)",
      "Tirzepatide",
      "Phentermine",
      "Phentermine + Topiramate",
    ],
  },
  {
    title: "Wellness & Vitality",
    slug: "wellness-vitality",
    links: [
      "B-Complex Injections",
      "NAD+ Injections",
      "MIC Injections",
    ],
  },
];

interface ServicesMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const CategoryBlock = ({ title, slug, links, onClose }: { title: string; slug: string; links: string[]; onClose: () => void }) => (
  <div>
    <Link
      to={`/services/${slug}`}
      onClick={onClose}
      className="flex items-center gap-2 mb-3 group cursor-pointer"
      style={{ textDecoration: "none" }}
    >
      <span
        className="font-bold text-lg uppercase tracking-wide"
        style={{ color: "#000033" }}
      >
        {title}
      </span>
      <ArrowUpRight
        size={18}
        className="transition-transform duration-200 group-hover:translate-x-0.5"
        style={{ color: "#E8670A" }}
      />
    </Link>
    <div className="space-y-2">
      {links.map((link) => (
        <Link
          key={link}
          to={`/services/${slug}`}
          onClick={onClose}
          className="block text-sm font-normal transition-all duration-200 hover:pl-1"
          style={{ color: "#555", textDecoration: "none" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#000033"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#555"; }}
        >
          {link}
        </Link>
      ))}
    </div>
  </div>
);

export const ServicesMegaMenu = ({ isOpen, onClose, onMouseEnter, onMouseLeave }: ServicesMegaMenuProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div
      className="fixed left-0 right-0 z-[100]"
      style={{ top: 80 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="w-full"
        style={{
          background: "#FFFFFF",
          borderTop: "3px solid #E8670A",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          animation: "megaMenuIn 250ms ease-out forwards",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-8 py-10">
          {/* Top 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8">
            {categories.slice(0, 3).map((cat) => (
              <CategoryBlock key={cat.title} title={cat.title} slug={cat.slug} links={cat.links} onClose={onClose} />
            ))}
          </div>

          {/* Divider */}
          <div className="my-6" style={{ borderTop: "1px solid #eee" }} />

          {/* Bottom 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8">
            {categories.slice(3).map((cat) => (
              <CategoryBlock key={cat.title} title={cat.title} slug={cat.slug} links={cat.links} onClose={onClose} />
            ))}
          </div>

          {/* Bottom row */}
          <div
            className="mt-2 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4"
            style={{ borderTop: "1px solid #eee" }}
          >
            <Link
              to="/services"
              onClick={onClose}
              className="font-bold text-sm uppercase tracking-wide flex items-center gap-2 transition-all duration-200 hover:gap-3"
              style={{ color: "#000033", textDecoration: "none" }}
            >
              All Services
              <ArrowRight size={16} style={{ color: "#E8670A" }} />
            </Link>
            <button
              onClick={() => {
                onClose();
                if (window.location.pathname !== "/") {
                  navigate("/");
                  setTimeout(() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" }), 100);
                } else {
                  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="rounded-full px-6 py-2.5 text-[12px] font-semibold uppercase tracking-[0.06em] cursor-pointer transition-colors duration-200"
              style={{ background: "#000033", color: "#FFFFFF", border: "none" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,0,51,0.8)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#000033"; }}
            >
              Book a Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const megaMenuCategories = categories;
