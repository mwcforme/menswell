import imgDoctor from "@/assets/lp/dr-popariello.jpeg";
import imgLobby from "@/assets/lp/lobby-innslake.jpg";
import imgGymConfident from "@/assets/lp/man-gym-confident.jpeg";
import imgTeam from "@/assets/lp/mwc-team.webp";

const pillars = [
  { title: "Licensed Physicians", desc: "Board-certified Virginia physicians. Not PAs, not nurses on a screen. A real doctor, every visit.", image: imgDoctor },
  { title: "On-Site Labs", desc: "Blood draw and full panel done in our center. Results back before you walk out the door.", image: imgLobby },
  { title: "Built for Men", desc: "A men-only environment designed around your schedule, your privacy, and your goals.", image: imgGymConfident },
  { title: "Ongoing Monitoring", desc: "Regular check-ins, lab work, and protocol adjustments. We don't write a script and disappear.", image: imgTeam },
];

export const OGTRTPillars = () => (
  <section style={{ background: "#f8f9fa", padding: "clamp(48px, 8vw, 96px) 0" }}>
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "#003366" }}>Everything You Need to Get Your Health Back</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((p) => (
          <div key={p.title} className="rounded-xl overflow-hidden text-center transition-all duration-300" style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="flex justify-center mt-6">
              <img src={p.image} alt={p.title} className="w-[140px] h-[140px] rounded-full object-cover" style={{ border: "3px solid #e9ecef" }} loading="lazy" />
            </div>
            <h3 className="font-bold text-base mt-4" style={{ color: "#003366" }}>{p.title}</h3>
            <p className="text-sm px-5 pb-6 mt-2 leading-relaxed" style={{ color: "#555555" }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);