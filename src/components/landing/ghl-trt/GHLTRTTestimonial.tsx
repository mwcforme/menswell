import { Star01 } from "@untitledui/icons";

const testimonials = [
  {
    quote: "Six months on TRT and I finally feel like myself again. Energy is up, mood is stable, and I'm sleeping through the night for the first time in years.",
    name: "Mark B.",
    location: "Richmond, VA",
  },
  {
    quote: "The nursing staff here is top-notch. They walk you through everything, answer every question, and actually follow up after your visits. Never experienced that anywhere else.",
    name: "Howard B.",
    location: "Virginia Beach, VA",
  },
  {
    quote: "From the front desk to the physician, every person I've dealt with has been professional and genuinely helpful. You can tell they care about results, not just billing.",
    name: "Douglas H.",
    location: "Newport News, VA",
  },
  {
    quote: "Got my labs back in two days and started treatment the same week. No runaround, no waiting months. The team moves fast and knows what they're doing.",
    name: "James R.",
    location: "Richmond, VA",
  },
  {
    quote: "I feel stronger and more focused than I have in years. My wife says I'm a different person. Should've done this years ago.",
    name: "Steve P.",
    location: "Chesapeake, VA",
  },
  {
    quote: "I was hesitant about hormone therapy but the doctor laid everything out honestly. No pressure, just facts. Three months in and I wish I'd started sooner.",
    name: "David K.",
    location: "Norfolk, VA",
  },
];

const getInitials = (name: string) => name.split(" ").map(n => n[0]).join("");

const TestimonialCard = ({ t }: { t: typeof testimonials[0] }) => (
  <div className="bg-white rounded-2xl p-7 shadow-sm flex flex-col">
    <div className="flex items-center justify-between mb-4">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star01 key={i} size={18} className="text-[#E8670A] fill-[#E8670A]" />
        ))}
      </div>
      {/* CRO-04: Google badge */}
      <span className="text-[11px] font-medium text-[#666] bg-[#F5F0EB] rounded-full px-2.5 py-1">
        Google Review
      </span>
    </div>
    <p className="text-[#000033] text-[15px] italic leading-relaxed mb-5 flex-1">
      "{t.quote}"
    </p>
    <div className="flex items-center gap-3">
      {/* CRO-04: initial avatar */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
        style={{ backgroundColor: "#000033" }}
      >
        {getInitials(t.name)}
      </div>
      <div>
        <p className="font-bold text-[#000033] text-sm">{t.name}</p>
        <p className="text-[#666] text-sm mt-0.5">{t.location}</p>
      </div>
    </div>
  </div>
);

const GHLTRTTestimonial = () => (
  <section style={{ backgroundColor: "#F5F0EB" }} className="py-12 md:py-20">
    <div className="max-w-[1100px] mx-auto px-4">
      {/* CRO-15: H2 consistency */}
      <h2
        className="text-center font-bold text-[32px] md:text-4xl mb-8 md:mb-10"
        style={{ color: "#000033" }}
      >
        Real Members. Real Experiences.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.slice(0, 3).map((t) => (
          <TestimonialCard key={t.name} t={t} />
        ))}
      </div>

      {/* Remaining testimonials visible only on md+ */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {testimonials.slice(3).map((t) => (
          <TestimonialCard key={t.name} t={t} />
        ))}
      </div>
    </div>
  </section>
);

export default GHLTRTTestimonial;
