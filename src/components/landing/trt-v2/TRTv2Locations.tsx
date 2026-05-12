import { MapPin, Phone, Clock } from "lucide-react";

const locations = [
  {
    slug: "richmond-va",
    name: "Men's Wellness Centers, Richmond",
    city: "Glen Allen",
    address: "4050 Innslake Dr, Suite 360",
    cityStateZip: "Glen Allen, VA 23060",
    phone: "(804) 346-4636",
    phoneHref: "tel:8043464636",
    hours: "Mon–Sat 9:00 AM – 5:00 PM",
  },
  {
    slug: "newport-news-va",
    name: "Men's Wellness Centers, Newport News",
    city: "Newport News",
    address: "827 Diligence Drive, Suite 206",
    cityStateZip: "Newport News, VA 23606",
    phone: "(757) 806-6263",
    phoneHref: "tel:7578066263",
    hours: "Mon–Sat 9:00 AM – 5:00 PM",
  },
  {
    slug: "virginia-beach-va",
    name: "Men's Wellness Centers, Virginia Beach",
    city: "Virginia Beach",
    address: "996 First Colonial Road",
    cityStateZip: "Virginia Beach, VA 23454",
    phone: "(757) 806-6263",
    phoneHref: "tel:7578066263",
    hours: "Mon–Sat 9:00 AM – 5:00 PM",
  },
];

export const TRTv2Locations = () => {
  const bookAt = (slug: string) => () => {
    const form = document.getElementById("booking");
    form?.scrollIntoView({ behavior: "smooth" });
    window.dispatchEvent(new CustomEvent("lp_trt_v2_cta_click", { detail: { location: "locations", clinic: slug } }));
    setTimeout(() => {
      const select = document.getElementById("booking-location") as HTMLSelectElement | null;
      if (select) select.value = slug;
    }, 400);
  };

  return (
    <section id="locations" style={{ background: "#FFFFFF" }}>
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
        <h2 className="font-bold uppercase text-center" style={{ fontFamily: "Oswald, sans-serif", color: "#000033", fontSize: "clamp(26px, 3vw, 38px)", letterSpacing: "0.02em" }}>
          3 Virginia Clinics
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {locations.map((l) => (
            <div key={l.slug} className="rounded-2xl p-6 flex flex-col" style={{ border: "1px solid #E5E5EA", background: "#FFFFFF" }}>
              <div className="font-bold uppercase" style={{ fontFamily: "Oswald, sans-serif", color: "#000033", fontSize: 22, letterSpacing: "0.02em" }}>
                {l.city}
              </div>
              <div className="text-xs mt-1 mb-4" style={{ color: "#7a7a8e", fontFamily: "Inter, sans-serif" }}>{l.name}</div>

              <div className="space-y-2.5 text-sm" style={{ color: "#1a1a2e", fontFamily: "Inter, sans-serif" }}>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: "#E8670A" }} />
                  <div>{l.address}<br />{l.cityStateZip}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 flex-shrink-0" style={{ color: "#E8670A" }} />
                  <span>{l.hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 flex-shrink-0" style={{ color: "#E8670A" }} />
                  <a href={l.phoneHref} className="underline underline-offset-2">{l.phone}</a>
                </div>
              </div>

              <div className="mt-5 pt-5 border-t flex flex-col gap-2" style={{ borderColor: "#E5E5EA" }}>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${l.name}, ${l.address}, ${l.cityStateZip}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold uppercase text-center py-2 rounded-full"
                  style={{ color: "#000033", border: "1px solid #000033", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif" }}
                >
                  Get Directions
                </a>
                <button
                  onClick={bookAt(l.slug)}
                  className="text-xs font-bold uppercase text-center py-2.5 rounded-full cursor-pointer"
                  style={{ background: "#E8670A", color: "#FFFFFF", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif", border: "none" }}
                >
                  Book at this location
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
