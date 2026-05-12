import { Star01 } from "@untitledui/icons";
import type { GHLVerticalConfig } from "@/data/ghl-config";

interface Props { config: GHLVerticalConfig }

const getInitials = (name: string) => name.split(" ").map(n => n[0]).join("");

const TestimonialCard = ({ t }: { t: { quote: string; name: string; location: string } }) => (
  <div className="bg-white rounded-2xl p-7 shadow-sm flex flex-col">
    <div className="flex items-center justify-between mb-4">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => <Star01 key={i} size={18} className="text-[#E8670A] fill-[#E8670A]" />)}
      </div>
      <span className="text-[11px] font-medium text-[#666] bg-[#F5F0EB] rounded-full px-2.5 py-1">Google Review</span>
    </div>
    <p className="text-[#000033] text-[15px] italic leading-relaxed mb-5 flex-1">"{t.quote}"</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ backgroundColor: "#000033" }}>
        {getInitials(t.name)}
      </div>
      <div>
        <p className="font-bold text-[#000033] text-sm">{t.name}</p>
        <p className="text-[#666] text-sm mt-0.5">{t.location}</p>
      </div>
    </div>
  </div>
);

const GHLTestimonials = ({ config }: Props) => (
  <section style={{ backgroundColor: "#F5F0EB" }} className="py-12 md:py-20">
    <div className="max-w-[1100px] mx-auto px-4">
      <h2 className="text-center font-bold text-[32px] md:text-4xl mb-8 md:mb-10" style={{ color: "#000033" }}>
        Real Members. Real Experiences.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {config.testimonials.slice(0, 3).map((t) => <TestimonialCard key={t.name} t={t} />)}
      </div>
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {config.testimonials.slice(3).map((t) => <TestimonialCard key={t.name} t={t} />)}
      </div>
    </div>
  </section>
);

export default GHLTestimonials;
