import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbBarProps {
  items: BreadcrumbItem[];
}

export const BreadcrumbBar = ({ items }: BreadcrumbBarProps) => (
  <nav
    aria-label="Breadcrumb"
    style={{
      background: "#1A1A2E",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      padding: "12px 0",
    }}
  >
    <ol className="max-w-6xl mx-auto px-4 md:px-6 flex items-center gap-1.5 text-[12px] list-none m-0 p-0">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <li key={i} className="flex items-center gap-1.5">
            {isLast ? (
              <span style={{ color: "rgba(255,255,255,0.7)" }} className="font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <>
                <Link
                  to={item.to || "/"}
                  className="hover:opacity-70 transition-opacity"
                  style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}
                >
                  {item.label}
                </Link>
                <ChevronRight size={12} style={{ color: "rgba(255,255,255,0.25)" }} aria-hidden="true" />
              </>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);
