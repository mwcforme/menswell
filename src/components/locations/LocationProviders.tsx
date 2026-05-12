import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { User, ChevronDown } from "lucide-react";
import type { LocationData } from "@/data/locations";

interface Props {
  location: LocationData;
}

const BIO_PREVIEW_LENGTH = 220;

const ProviderCard = ({ provider }: { provider: { name: string; credentials: string; title: string; bio: string } }) => {
  const needsExpander = provider.bio.length > BIO_PREVIEW_LENGTH;
  const [expanded, setExpanded] = useState(false);
  const visibleBio = expanded || !needsExpander ? provider.bio : provider.bio.slice(0, BIO_PREVIEW_LENGTH).replace(/\s+\S*$/, "") + "…";

  return (
    <div className="flex flex-col items-center text-center md:items-start md:text-left">
      {/* Headshot placeholder */}
      <div
        className="flex items-center justify-center rounded-full mb-5 flex-shrink-0"
        style={{
          width: 120,
          height: 120,
          background: "linear-gradient(135deg, #151933 0%, #1e2448 100%)",
          border: "3px solid rgba(232,103,10,0.35)",
        }}
      >
        <User size={48} color="rgba(255,255,255,0.45)" strokeWidth={1.5} />
      </div>

      {/* Name */}
      <h3
        className="font-bold uppercase tracking-wide"
        style={{ color: "#000033", fontSize: "clamp(0.95rem, 2vw, 1.15rem)" }}
      >
        {provider.name}
      </h3>

      {/* Title pill */}
      <span
        className="inline-block mt-2 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest"
        style={{ background: "#151933", color: "#FFFFFF" }}
      >
        {provider.title}
      </span>

      {/* Credentials */}
      {provider.credentials && (
        <p className="mt-2 text-[12px] font-medium tracking-wide" style={{ color: "#E8670A" }}>
          {provider.credentials}
        </p>
      )}

      {/* Bio with expander */}
      <p className="mt-3 text-[13px] leading-relaxed" style={{ color: "#555555" }}>
        {visibleBio}
      </p>
      {needsExpander && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-1 mt-2 text-[12px] font-semibold uppercase tracking-wide border-none bg-transparent cursor-pointer transition-colors duration-200"
          style={{ color: "#E8670A" }}
        >
          {expanded ? "Show less" : "Read full bio +"}
          <ChevronDown
            size={13}
            style={{
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}
          />
        </button>
      )}
    </div>
  );
};

export const LocationProviders = ({ location }: Props) => {
  const contentRef = useScrollReveal();

  return (
    <section style={{ background: "#EBEAE8", padding: "80px 0" }}>
      <div ref={contentRef} className="max-w-5xl mx-auto px-4 md:px-6">
        {/* Shorter heading */}
        <h2
          className="font-bold uppercase leading-tight text-center mb-10 md:mb-14"
          style={{ color: "#000033", fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}
        >
          Your {location.city} Care Team
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {location.providers.map((provider, i) => (
            <div key={provider.name}>
              <ProviderCard provider={provider} />
              {/* Divider between cards on mobile */}
              {i < location.providers.length - 1 && (
                <hr
                  className="md:hidden mt-10"
                  style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.1)" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
