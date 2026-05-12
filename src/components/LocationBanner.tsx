import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";

const locations = [
  {
    name: "Richmond",
    slug: "richmond-va",
    address: "4050 Innslake Dr, Suite 360",
    cityState: "Glen Allen, VA 23060",
    phone: "(804) 346-4636",
    hours: "Mon–Sat",
  },
  {
    name: "Newport News",
    slug: "newport-news-va",
    address: "827 Diligence Drive, Suite 206",
    cityState: "Newport News, VA 23606",
    phone: "(757) 806-6263",
    phoneLabel: "Hampton Roads Scheduling",
    hours: "Mon–Sat (Closed Wed)",
  },
  {
    name: "Virginia Beach",
    slug: "virginia-beach-va",
    address: "996 First Colonial Road",
    cityState: "Virginia Beach, VA 23454",
    phone: "(757) 806-6263",
    phoneLabel: "Hampton Roads Scheduling",
    hours: "Mon–Sat",
  },
];

export const LocationBanner = () => {
  const contentRef = useScrollReveal();

  return (
    <section className="py-14 md:py-20" style={{ background: "#F5F4F2" }}>
      <div ref={contentRef} className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2
            className="font-bold uppercase"
            style={{ color: "#000033", fontSize: "clamp(1.5rem, 4vw, 2.75rem)" }}
          >
            Visit Us Today
          </h2>
          <p className="mt-2 md:mt-3 max-w-xl mx-auto text-[13px] md:text-base" style={{ color: "#555" }}>
            Three locations serving Richmond, Hampton Roads, and Virginia Beach. Appointments available.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {locations.map((loc) => (
            <div
              key={loc.name}
              className="text-center flex flex-col items-center px-5 py-6 md:py-8"
            >
              <h3 className="text-lg md:text-xl font-bold mb-1.5" style={{ color: "#000033" }}>
                {loc.name}
              </h3>

              <p className="text-[13px] md:text-sm leading-relaxed" style={{ color: "#555" }}>
                {loc.address}<br />
                {loc.cityState}
              </p>

              <a
                href={`tel:${loc.phone.replace(/[^0-9]/g, "")}`}
                className="text-[13px] mt-1.5 font-medium hover:opacity-80 transition-opacity cursor-pointer"
                style={{ color: "#000033", textDecoration: "none" }}
                aria-label={`Call Men's Wellness Centers ${loc.name} at ${loc.phone}`}
              >
                {loc.phone}
              </a>
              {loc.phoneLabel && (
                <span className="text-[11px] mt-0.5" style={{ color: "#888" }}>{loc.phoneLabel}</span>
              )}

              <p className="text-[12px] mt-1.5 font-medium" style={{ color: "#888" }}>
                {loc.hours}
              </p>

              <Link
                to={`/locations/${loc.slug}`}
                className="mt-5 block w-full max-w-[220px] rounded-full py-2.5 md:py-3 text-[13px] font-semibold uppercase tracking-wide text-center transition-opacity hover:opacity-90 cursor-pointer"
                style={{ background: "#E8670A", color: "#FFFFFF", textDecoration: "none" }}
                data-location={loc.slug.replace("-va", "")}
                data-cta-type="book"
              >
                Book at {loc.name}
              </Link>

              <Link
                to={`/locations/${loc.slug}`}
                className="mt-2 text-[12px] font-medium uppercase tracking-wide hover:opacity-70 transition-opacity cursor-pointer"
                style={{ color: "#000033", textDecoration: "none" }}
              >
                View Center Details &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
