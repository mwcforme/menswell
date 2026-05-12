import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { LocationData } from "@/data/locations";
import type { CityServiceConfig } from "@/data/city-services";

const SvgStar = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="#F59E0B" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M10 0.5L12.94 6.46L19.5 7.41L14.75 12.04L15.88 18.57L10 15.47L4.12 18.57L5.25 12.04L0.5 7.41L7.06 6.46L10 0.5Z" />
  </svg>
);

interface Props {
  location: LocationData;
  service: CityServiceConfig;
}

export const CityServiceTestimonials = ({ location, service }: Props) => {
  const ref = useScrollReveal();

  // Filter testimonials by service treatment tag if available, fallback to all
  const filtered = location.testimonials.filter(
    (t) => t.treatment?.toLowerCase().includes(service.serviceShortName.toLowerCase())
  );
  const testimonials = filtered.length >= 2 ? filtered : location.testimonials.slice(0, 3);

  return (
    <section ref={ref} style={{ background: "#1A1A2E", padding: "80px 0" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-bold text-lg uppercase tracking-[0.1em]" style={{ color: "#FFFFFF" }}>
            WHAT {location.city.toUpperCase()} MEMBERS SAY ABOUT {service.serviceShortName}
          </h2>
          <div className="flex justify-center gap-1 mt-3">
            {[...Array(5)].map((_, i) => <SvgStar key={i} />)}
          </div>
          <p className="text-sm font-normal mt-2" style={{ color: "rgba(255,255,255,0.75)" }}>
            {location.googleRating} · {location.googleReviewCount}{" "}
            <span className="font-semibold" style={{ color: "#FFFFFF" }}>Google</span> Reviews
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-xl p-5 md:p-7"
              style={{ background: "#252540" }}
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, si) => <SvgStar key={si} />)}
              </div>
              <p className="text-[13px] md:text-sm leading-relaxed italic" style={{ color: "rgba(255,255,255,0.85)" }}>
                "{t.quote}"
              </p>
              <div className="w-10 h-[1px] my-4" style={{ background: "rgba(255,255,255,0.12)" }} />
              <p className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>{t.name}</p>
              <p className="text-[13px] mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>{t.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
