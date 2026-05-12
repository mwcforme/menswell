import { Check, UserCheck01, Microscope, Sliders04, ActivityHeart } from "@untitledui/icons";
import teamPhoto from "@/assets/lp/mwc-team-scrubs.webp";

const bullets = [
  "10,000+ members treated across 10 years of practice",
  "Your treatment is managed by a licensed physician from start to finish",
  "Comprehensive in-center testing with results reviewed in-visit",
  "Long-term optimization focus, not quick fixes",
];

const features = [
  { icon: UserCheck01, title: "Real Doctor-Patient Relationship", desc: "Face-to-face with the same licensed physician every visit. Not a PA on a screen." },
  { icon: Microscope, title: "Comprehensive Testing", desc: "On-site labs with results reviewed in-visit. No waiting days for a phone call." },
  { icon: Sliders04, title: "Personalized Protocols", desc: "Your treatment plan is designed for your body, your symptoms, your goals." },
  { icon: ActivityHeart, title: "Ongoing Monitoring", desc: "We track your levels and health markers to help support the best possible outcomes." },
];

const GHLTRTDifference = () => (
  <section className="overflow-hidden">
    {/* Top: Navy band with headline + bullets */}
    <div style={{ backgroundColor: "#000033" }} className="py-10 md:py-16 px-6 md:px-16">
      <div className="max-w-[1170px] mx-auto">
        <p className="text-white/70 text-sm uppercase tracking-widest mb-2">In-Person Only</p>
        <h2
          style={{ fontFamily: "'Bebas Neue', cursive" }}
          className="text-[40px] md:text-[48px] text-white leading-none mb-4"
        >
          The MWC Difference
        </h2>
        <p className="text-white/80 text-[15px] leading-relaxed mb-8 max-w-2xl">
          All care is in-person at our Virginia centers in Richmond, Newport News, or Virginia Beach. Real care requires real medicine.
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3 text-white/90 text-[15px]">
              <Check size={16} className="text-[#2ECC71] mt-0.5 flex-shrink-0" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Bottom: Team photo + feature cards side by side */}
    <div className="grid md:grid-cols-2">
      {/* Left: Team photo */}
      <div style={{ backgroundColor: "#F5F0EB" }} className="p-8 md:p-12 flex flex-col justify-center">
        <div className="rounded-xl overflow-hidden">
          <img
            src={teamPhoto}
            alt="Men's Wellness Centers Virginia medical team in branded scrubs"
            className="w-full h-[240px] md:h-[420px] object-cover object-top"
            loading="lazy"
          />
        </div>
        {/* CRO-14: caption 14px */}
        <p className="text-[#999] text-sm mt-3 tracking-wide uppercase">Our Virginia Medical Team</p>
      </div>

      {/* Right: Feature cards */}
      <div className="bg-white py-12 px-8 md:px-12 flex flex-col justify-center">
        <p className="text-[#666] text-sm uppercase tracking-widest mb-6">Why Men Choose Us</p>
        <div className="space-y-6">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "rgba(232,103,10,0.1)" }}
              >
                <f.icon size={18} style={{ color: "#E8670A" }} />
              </div>
              <div>
                {/* CRO-14: title 18px */}
                <h4 className="font-bold text-[#000033] text-lg mb-1">{f.title}</h4>
                <p className="text-[#666] text-[15px] leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default GHLTRTDifference;
