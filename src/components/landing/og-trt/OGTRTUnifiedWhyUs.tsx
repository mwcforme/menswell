const cards = [
  { title: "Licensed NPs & Physicians, Every Visit", body: "Licensed Virginia nurse practitioners and physicians. Not remote. Not an app. A real provider, face to face, every visit." },
  { title: "On-Site Labs, Same-Day Results", body: "Blood draw and full panel done in our center. Results back before you walk out the door. No outside lab visits. No waiting days." },
  { title: "Built for Men", body: "A men-only environment designed around your schedule, your privacy, and your goals. No group waiting rooms. No referral needed." },
  { title: "All Follow-Up Included", body: "Regular check-ins, lab work, and protocol adjustments. We do not write a script and disappear." },
];

export const OGTRTUnifiedWhyUs = () => {
  return (
    <section style={{ background: "#FFFFFF" }} className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#1B2A4A" }}>
            Why Virginia Men Choose Men's Wellness Centers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl p-8"
              style={{ background: "#f8f9fa", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <h3 className="font-bold text-lg mb-3" style={{ color: "#1B2A4A" }}>{card.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#555555" }}>{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
