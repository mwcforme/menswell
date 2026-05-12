import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { LocationData } from "@/data/locations";

interface Props {
  location: LocationData;
}

export const LocationAreasServed = ({ location }: Props) => {
  const contentRef = useScrollReveal();

  return (
    <section style={{ background: "#EBEAE8", padding: "80px 0" }}>
      <div ref={contentRef} className="max-w-5xl mx-auto px-4 md:px-6">
        <h2
          className="font-bold uppercase leading-tight text-center mb-4"
          style={{ color: "#000033", fontSize: "clamp(1.15rem, 3vw, 1.75rem)" }}
        >
          SERVING {location.city.toUpperCase()} AND SURROUNDING COMMUNITIES
        </h2>
        <p className="text-[14px] leading-relaxed max-w-2xl mx-auto text-center mb-8" style={{ color: "#666" }}>
          {location.areasServedIntro}
        </p>

        {location.militaryFriendly && (
          <p className="text-[13px] leading-relaxed max-w-2xl mx-auto text-center mb-8" style={{ color: "#555" }}>
            We're proud to serve active duty service members, veterans, and military families across Hampton Roads. Our direct-pay model means no Tricare referrals or VA wait times for men who want to take action now.
          </p>
        )}

        {/* Area tags — even grid */}
        <div
          className="grid justify-center mb-8"
          style={{
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 10,
            maxWidth: 800,
            margin: "0 auto 32px",
          }}
        >
          {location.areasServedWithTimes.map((area) => (
            <span
              key={area.area}
              className="inline-flex items-center justify-center text-center rounded-full whitespace-nowrap"
              style={{
                padding: "10px 16px",
                fontSize: 12,
                fontWeight: 500,
                background: "rgba(15,42,74,0.05)",
                border: "1px solid rgba(15,42,74,0.15)",
                color: "#000033",
                minHeight: 44,
              }}
            >
              {area.area} <span className="ml-1" style={{ color: "#999" }}>({area.time})</span>
            </span>
          ))}
        </div>

        {location.drivingContext.length > 0 && (
          <p className="text-center text-[12px] mb-6" style={{ color: "#999" }}>
            {location.drivingContext.join(" · ")}
          </p>
        )}

      </div>
    </section>
  );
};
