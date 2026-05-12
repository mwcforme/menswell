const team = [
  { name: "Christopher Stainback, PA", title: "Physician Assistant" },
  { name: "Caitlin Weilbaecher, FNP-C", title: "Nurse Practitioner" },
  { name: "Chansila Harris, FNP-C", title: "Nurse Practitioner" },
  { name: "Bonnie Grimes, FNP-C", title: "Nurse Practitioner" },
  { name: "Tonya Belknap-Tufaro, FNP-C", title: "Nurse Practitioner" },
  { name: "Meredith Kash, FNP-C", title: "Nurse Practitioner" },
  { name: "Mariana Herrera, MSN, FNP-C", title: "Nurse Practitioner" },
];

export const TeamSection = () => {
  return (
    <section id="team" className="py-14 md:py-20" style={{ background: "#EBEAE8" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 md:mb-10 gap-3">
          <div>
            <p
              className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] mb-2"
              style={{ color: "#888888" }}
            >
              Our Medical Team
            </p>
            <h2
              className="font-bold uppercase leading-tight"
              style={{ color: "#000033", fontSize: "clamp(1.15rem, 3vw, 1.75rem)" }}
            >
              Board-Certified Providers at Every Location
            </h2>
          </div>
          <a
            href="/providers"
            className="rounded-full px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.06em] transition-all duration-200 self-start md:self-auto flex-shrink-0 cursor-pointer"
            style={{ background: "transparent", border: "1px solid #000033", color: "#000033", textDecoration: "none" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#000033"; e.currentTarget.style.color = "#FFFFFF"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#000033"; }}
          >
            Meet Our Providers
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4 md:gap-y-5">
          {team.map((member) => (
            <div key={member.name}>
              <p className="font-semibold text-[13px] md:text-sm" style={{ color: "#000033" }}>
                {member.name}
              </p>
              <p className="text-[11px] md:text-xs" style={{ color: "#888888" }}>
                {member.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
