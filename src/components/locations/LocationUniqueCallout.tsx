import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { LocationData } from "@/data/locations";

interface Props {
  location: LocationData;
}

export const LocationUniqueCallout = ({ location }: Props) => {
  const contentRef = useScrollReveal();

  if (!location.uniqueCallout) return null;

  return (
    <section className="py-16 md:py-24" style={{ background: "#151933" }}>
      <div ref={contentRef} className="max-w-3xl mx-auto px-4 md:px-6 text-center">
        {location.militaryFriendly && (
          <p className="text-[11px] uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
            Proud to serve active duty, veterans &amp; military families across Hampton Roads
          </p>
        )}
        <p className="text-[14px] md:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
          {location.uniqueCallout}
        </p>
      </div>
    </section>
  );
};
