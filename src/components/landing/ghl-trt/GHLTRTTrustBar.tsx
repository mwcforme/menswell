import { ShieldTick, MarkerPin02, CalendarCheck02, MedicalCircle } from "@untitledui/icons";

const items = [
  {
    icon: ShieldTick,
    title: "LegitScript Certified (2025)",
    desc: "Independently Verified Healthcare Provider",
  },
  {
    icon: MarkerPin02,
    title: "Local Virginia Clinics",
    desc: "Richmond, Newport News, Virginia Beach",
  },
  {
    icon: CalendarCheck02,
    title: "Trusted Since 2015",
    desc: "Over a decade serving Virginia",
  },
  {
    icon: MedicalCircle,
    title: "Medical Expertise",
    desc: "Licensed Medical Professionals",
  },
];

const GHLTRTTrustBar = () => (
  <section className="bg-white py-16">
    <div className="max-w-[1170px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "rgba(0,0,51,0.08)" }}
          >
            <item.icon size={22} style={{ color: "#000033" }} />
          </div>
          <div>
            <p className="font-bold text-sm text-[#000033]">{item.title}</p>
            <p className="text-[13px] text-[#666] mt-0.5">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default GHLTRTTrustBar;
