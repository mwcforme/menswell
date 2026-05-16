import { trackCro } from "@/hooks/useAnalytics";
import { GBP_REVIEWS_URL } from "@/data/testimonials";
import { COPY } from "@/data/copy";

interface Stat {
  value: string;
  label: string;
  slug: string;
  scrollTo?: string;
  href?: string;
}

const stats: Stat[] = [
  { value: "10,000+", label: "Men Treated\nSince 2015", slug: "credibility_band_count", scrollTo: "results" },
  { value: "3", label: "Virginia\nCenters", slug: "credibility_band_locations", scrollTo: "locations" },
  { value: "4.9★", label: "Google Rating\n200+ Reviews", slug: "credibility_band_reviews", href: GBP_REVIEWS_URL },
  { value: COPY.badge.offerValue, label: COPY.badge.offerLabel, slug: "credibility_band_offer", scrollTo: "hero" },
];

export const CredibilityBand = () => {
  const handleClick = (s: Stat) => () => {
    trackCro(s.slug);
    if (s.href) return;
    if (s.scrollTo) {
      document.getElementById(s.scrollTo)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section style={{ background: "#0A1628" }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 text-center" style={{ paddingTop: 28, paddingBottom: 28, gap: "12px 0" }}>
        {stats.map((s, i) => {
          const inner = (
            <div className="flex flex-col items-center gap-2 px-2">
              <div
                className="font-bold uppercase"
                style={{
                  fontFamily: "Oswald, sans-serif",
                  color: "#FFFFFF",
                  fontSize: "clamp(28px, 4vw, 44px)",
                  lineHeight: 1,
                  letterSpacing: "-0.01em",
                }}
              >
                {s.value}
              </div>
              <div
                className="uppercase whitespace-pre-line"
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: "rgba(255,255,255,0.65)",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  fontWeight: 600,
                  lineHeight: 1.4,
                }}
              >
                {s.label}
              </div>
            </div>
          );

          // On mobile (2-col grid): right border on col 0, bottom border on row 0
          // On desktop (4-col): right border on all except last
          const isLastInRow = (i + 1) % 2 === 0;
          const isFirstRow = i < 2;
          const dividerStyle: React.CSSProperties = {
            borderRight: !isLastInRow ? "1px solid var(--c-border-on-dark)" : "none",
            borderBottom: isFirstRow ? "1px solid var(--c-border-on-dark)" : "none",
            paddingTop: 16,
            paddingBottom: 16,
          };

          if (s.href) {
            return (
              <a
                key={s.slug}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cro={s.slug}
                onClick={handleClick(s)}
                className="block hover:opacity-80 transition-opacity cursor-pointer"
                style={{ ...dividerStyle, textDecoration: "none" }}
              >
                {inner}
              </a>
            );
          }

          return (
            <button
              key={s.slug}
              type="button"
              data-cro={s.slug}
              onClick={handleClick(s)}
              className="hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-none"
              style={dividerStyle}
            >
              {inner}
            </button>
          );
        })}
      </div>
    </section>
  );
};
