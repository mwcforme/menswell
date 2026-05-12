import imgManifesto from "@/assets/lp/man-athletic-smiling.jpeg";

export const OGTRTManifesto = () => {
  const stats = [
    { num: "10,000+", label: "MEN TREATED" },
    { num: "Since 2015", label: "SERVING VIRGINIA" },
    { num: "4.9★", label: "AVERAGE RATING" },
  ];

  return (
    <section style={{ background: "#003366", padding: "clamp(48px, 8vw, 96px) 0" }}>
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "#FFFFFF" }}>
            Men's Health Care Was Broken.{" "}
            <span>We Fixed It.</span>
          </h2>
          <p className="text-base mt-4 leading-[1.7]" style={{ color: "rgba(255,255,255,0.70)" }}>
            Men's Wellness Centers has been treating Virginia men since 2015. Not through a screen. Not through the mail. Face-to-face, same physician, every visit.
          </p>
          <div className="flex gap-8 mt-8">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="text-2xl md:text-3xl font-bold" style={{ color: "#FFFFFF" }}>{s.num}</span>
                <span className="text-xs uppercase mt-1" style={{ color: "rgba(255,255,255,0.50)", letterSpacing: "0.08em" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <img src={imgManifesto} alt="Confident man after treatment" className="rounded-xl object-cover w-full h-[400px]" loading="lazy" />
        </div>
      </div>
    </section>
  );
};