import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import type { LocationData } from "@/data/locations";

interface Props {
  location: LocationData;
}

export const LocationNAP = ({ location }: Props) => {
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${location.address}, ${location.cityStateZip}`
  )}`;

  return (
    <section style={{ background: "#FFFFFF", padding: "64px 0" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Map */}
          <div className="rounded-xl overflow-hidden" style={{ minHeight: 400 }}>
            <iframe
              src={location.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 400 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Google Maps showing Men's Wellness Centers ${location.city} location`}
            />
          </div>

          {/* Info */}
          <div>
            <h2
              className="font-bold uppercase leading-tight mb-6"
              style={{ color: "#000033", fontSize: "clamp(1.15rem, 3vw, 1.5rem)" }}
            >
              {location.centerName}
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <MapPin size={18} style={{ color: "#000033", marginTop: 2 }} />
                <div>
                  <p className="font-semibold text-[14px]" style={{ color: "#000033" }}>{location.address}</p>
                  <p className="text-[13px]" style={{ color: "#666" }}>{location.cityStateZip}</p>
                </div>
              </div>

              <a
                href={`tel:${location.phone.replace(/[^0-9]/g, "")}`}
                className="flex items-center gap-3 font-semibold text-[14px] hover:opacity-80 transition-opacity"
                style={{ color: "#000033", textDecoration: "none" }}
                aria-label={`Call Men's Wellness Centers ${location.city} at ${location.phone}`}
              >
                <Phone size={18} style={{ color: "#000033" }} />
                {(location.region === "Hampton Roads" || location.region === "Coastal Virginia") ? (
                  <span>Hampton Roads Scheduling: {location.phone}</span>
                ) : (
                  location.phone
                )}
              </a>

              <a
                href={`mailto:${location.email}`}
                className="flex items-center gap-3 text-[14px] hover:opacity-80 transition-opacity"
                style={{ color: "#000033", textDecoration: "none" }}
              >
                <Mail size={18} style={{ color: "#000033" }} />
                {location.email}
              </a>
            </div>

            {/* Hours */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={16} style={{ color: "#000033" }} />
                <h3 className="font-bold text-[13px] uppercase tracking-wide" style={{ color: "#000033" }}>
                  Hours
                </h3>
              </div>
              <div className="space-y-1.5">
                {location.hours.map((h) => (
                  <div key={h.day} className="flex justify-between text-[13px]">
                    <span style={{ color: "#555" }}>{h.day}</span>
                    <span className="font-medium" style={{ color: h.hours === "Closed" ? "#999" : "#000033" }}>
                      {h.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: "#0F2A4A",
                  color: "#FFFFFF",
                  padding: "12px 24px",
                  fontSize: 12,
                  letterSpacing: "0.05em",
                  textDecoration: "none",
                }}
              >
                Get Directions <ExternalLink size={12} />
              </a>
            </div>

            {/* Parking */}
            <p className="mt-6 text-[12px] leading-relaxed" style={{ color: "#999" }}>
              {location.parking}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
