import { useState } from "react";
import { ArrowRight } from "lucide-react";

export const TRTInlineLeadMobile = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validatePhone = (v: string) => v.replace(/\D/g, "").length >= 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Required";
    if (!phone.trim() || !validatePhone(phone)) errs.phone = "Valid phone required";
    if (!location) errs.location = "Pick a location";
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      // Soft handoff: scroll to full form on validation issues
      document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const params = new URLSearchParams({
      name, phone, location, source: "landing-page-mobile-inline", service: "trt",
    });
    const urls: Record<string, string> = {
      richmond: "https://menswellnesscenters.com/thank-you-richmond/",
      "newport-news": "https://menswellnesscenters.com/thank-you-newport-news/",
      "virginia-beach": "https://menswellnesscenters.com/thank-you-virginia-beach/",
    };
    window.location.href = `${urls[location]}?${params.toString()}`;
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    height: 48,
    background: "#FFFFFF",
    border: "1.5px solid #D5D2CC",
    borderRadius: 8,
    padding: "0 14px",
    fontSize: 16,
    color: "#000033",
    outline: "none",
    fontFamily: "Inter, sans-serif",
  };

  return (
    <section
      className="md:hidden px-4 py-6"
      style={{ background: "#F5F0EB", borderTop: "1px solid #E5E0D9", borderBottom: "1px solid #E5E0D9" }}
    >
      <div
        className="rounded-2xl p-5"
        style={{ background: "#000033", boxShadow: "0 6px 20px rgba(0,0,51,0.18)" }}
      >
        <div
          className="uppercase text-[11px] font-bold mb-1"
          style={{ color: "#E8670A", letterSpacing: "0.12em", fontFamily: "Inter, sans-serif" }}
        >
          Same / Next-Day Appointments
        </div>
        <h3
          className="font-bold uppercase mb-4"
          style={{ fontFamily: "Oswald, sans-serif", color: "#FFFFFF", fontSize: 24, lineHeight: 1.1 }}
        >
          Book in 30 seconds
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputBase}
            aria-invalid={!!errors.name}
          />
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={inputBase}
            aria-invalid={!!errors.phone}
          />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ ...inputBase, appearance: "none" }}
            aria-invalid={!!errors.location}
          >
            <option value="">Choose location</option>
            <option value="richmond">Richmond / Glen Allen</option>
            <option value="newport-news">Newport News</option>
            <option value="virginia-beach">Virginia Beach</option>
          </select>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-full font-bold text-sm uppercase cursor-pointer border-none mt-1"
            style={{
              height: 52,
              background: "#E8670A",
              color: "#FFFFFF",
              letterSpacing: "0.08em",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Book My Consult <ArrowRight className="h-4 w-4" />
          </button>
          <p className="text-[12px] text-center mt-1" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "Inter, sans-serif" }}>
            Book entirely online. Licensed Virginia providers.
          </p>
        </form>
      </div>
    </section>
  );
};
