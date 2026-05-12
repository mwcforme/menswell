import { Star, CheckCircle2, XCircle, ArrowRight, MousePointer, Eye, TrendingUp, Layout, Check, MapPin } from "lucide-react";
import oldLogo from "@/assets/brand/old-logo.png";
import newLogo from "/logos/Text_Logo_dark.png";

const BrandComparison = () => {
  return (
    <div
      style={{
        background: "#F8F7F4",
        minHeight: "100vh",
        fontFamily: "'Open Sans', system-ui, sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Open+Sans:wght@300;400;500;600;700&family=Bebas+Neue&display=swap"
        rel="stylesheet"
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-24">
        {/* ─── PAGE HEADER ─── */}
        <header className="text-center mb-16 md:mb-20">
          <p
            className="uppercase tracking-[0.3em] text-[10px] mb-3"
            style={{ color: "#9CA3AF", fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
          >
            Confidential · March 2026
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] mb-4"
            style={{ color: "#0B1029", fontFamily: "'Montserrat', sans-serif" }}
          >
            Brand Rebrand Brief
          </h1>
          <p
            className="text-base md:text-lg font-light max-w-[550px] mx-auto"
            style={{ color: "#6B7280", fontFamily: "'Montserrat', sans-serif" }}
          >
            2015 Clinical Teal → 2026 Premium Authority
          </p>
          <div className="mx-auto mt-6" style={{ width: 40, height: 3, background: "#E8670A", borderRadius: 2 }} />

          {/* Column headers */}
          <div className="hidden md:grid grid-cols-2 gap-8 mt-12 max-w-[1000px] mx-auto">
            <div className="rounded-lg py-3 px-5 text-center" style={{ background: "rgba(0,0,0,0.03)" }}>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: "#9CA3AF", fontFamily: "'Montserrat', sans-serif" }}>← 2015 Brand</p>
            </div>
            <div className="rounded-lg py-3 px-5 text-center" style={{ background: "rgba(232,103,10,0.06)", border: "1px solid rgba(232,103,10,0.12)" }}>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: "#E8670A", fontFamily: "'Montserrat', sans-serif" }}>2026 Brand →</p>
            </div>
          </div>
        </header>

        {/* ═══ SECTION 1 — LOGO ═══ */}
        <section className="mb-16 md:mb-20">
          <SectionLabel number="01" title="Logo" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <OldCard>
              <div className="flex items-center justify-center py-10 md:py-14 px-6 rounded-lg mb-5" style={{ background: "#F1F0ED" }}>
                <img src={oldLogo} alt="Previous MWC logo" className="max-h-16 md:max-h-20 w-auto object-contain" />
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#6B7280" }}>
                Complex icon-and-text lockup with Vitruvian man inside a globe. Falls apart at favicon, social avatar, and mobile nav sizes.
              </p>
              <IssueList items={[
                "Globe + figure detail disappears below 32px",
                "Two-tone blue creates printing inconsistencies",
                "Icon competes with brand name for attention",
                "Reads as 'early-2010s medical practice'",
                "Cannot work as standalone symbol",
              ]} />
            </OldCard>

            <NewCard>
              <div className="flex items-center justify-center py-10 md:py-14 px-6 rounded-lg mb-5" style={{ background: "#0B1029" }}>
                <img src={newLogo} alt="New MWC wordmark" className="max-h-12 md:max-h-16 w-auto object-contain" style={{ filter: "brightness(0) invert(1)" }} />
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#6B7280" }}>
                Pure wordmark. Nike, Google, Supreme — premium brands use wordmarks because the name IS the brand.
              </p>
              <BenefitList items={[
                "Razor-sharp at every size: 16px to billboard",
                "Single-color flexibility for any medium",
                "Name carries 100% of recognition",
                "Works identically on dark and light backgrounds",
              ]} />
              {/* Scalability strip */}
              <div className="mt-5 pt-5" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] mb-3" style={{ color: "#9CA3AF", fontFamily: "'Montserrat', sans-serif" }}>Scalability</p>
                <div className="flex items-end gap-3 flex-wrap">
                  {[
                    { size: 16, label: "Favicon" },
                    { size: 28, label: "Nav" },
                    { size: 48, label: "Avatar" },
                    { size: 80, label: "Header" },
                  ].map(({ size, label }) => (
                    <div key={label} className="flex flex-col items-center gap-1">
                      <div className="flex items-center justify-center rounded" style={{ width: Math.max(size + 12, 32), height: Math.max(size + 12, 32), background: "#0B1029" }}>
                        <img src={newLogo} alt="" style={{ height: size * 0.4, width: "auto", filter: "brightness(0) invert(1)", minHeight: 6 }} />
                      </div>
                      <span className="text-[9px]" style={{ color: "#9CA3AF" }}>{size}px</span>
                    </div>
                  ))}
                </div>
              </div>
            </NewCard>
          </div>
        </section>

        {/* ═══ SECTION 2 — COLOR SYSTEM ═══ */}
        <section className="mb-16 md:mb-20">
          <SectionLabel number="02" title="Color System" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
            <OldCard>
              <div className="flex rounded-lg overflow-hidden mb-5 h-14">
                <div className="flex-[3]" style={{ background: "#0a3d62" }} />
                <div className="flex-[2]" style={{ background: "#00a8a8" }} />
                <div className="flex-[2]" style={{ background: "#ffffff", border: "1px solid #e5e7eb" }} />
                <div className="flex-[1]" style={{ background: "#394956" }} />
              </div>
              <div className="space-y-3 mb-5">
                <ColorSwatch color="#0a3d62" name="Deep Navy" sub="205° 81% 21%" />
                <ColorSwatch color="#00a8a8" name="Teal Accent" sub="180° 100% 33%" />
                <ColorSwatch color="#FFFFFF" name="White" sub="Sterile backgrounds" border />
                <ColorSwatch color="#394956" name="Dark Gray" sub="Generic body text" />
              </div>
              <IssueList items={[
                "Teal is the #1 overused healthcare color",
                "Navy + Teal = every urgent care app in America",
                "Pure white backgrounds feel clinical, not inviting",
                "Zero warm tones — cold and institutional",
              ]} />

              {/* Old gradients */}
              <div className="mt-5 pt-5" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] mb-3" style={{ color: "#9CA3AF", fontFamily: "'Montserrat', sans-serif" }}>Gradients</p>
                <div className="h-16 rounded-lg flex items-center justify-center mb-2" style={{ background: "linear-gradient(135deg, #0a3d62 0%, #0d5280 100%)" }}>
                  <span className="text-white text-[11px] opacity-80">Navy → Lighter Navy</span>
                </div>
                <div className="h-16 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #00a8a8 0%, #00c2c2 100%)" }}>
                  <span className="text-white text-[11px] opacity-80">Teal → Brighter Teal</span>
                </div>
                <p className="text-[10px] mt-2" style={{ color: "#9CA3AF" }}>Generic healthcare gradients. Seen on 10,000+ sites.</p>
              </div>

              {/* Old CTA */}
              <div className="mt-5 pt-5" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] mb-3" style={{ color: "#9CA3AF", fontFamily: "'Montserrat', sans-serif" }}>CTA Button</p>
                <div className="rounded px-5 py-2.5 text-center text-sm font-semibold inline-block" style={{ background: "#00a8a8", color: "#FFFFFF" }}>
                  Book Appointment
                </div>
                <p className="text-[10px] mt-2" style={{ color: "#9CA3AF" }}>Low urgency. Blends into dark backgrounds. 4.5:1 contrast.</p>
              </div>
            </OldCard>

            <NewCard>
              <div className="flex rounded-lg overflow-hidden mb-5 h-14">
                <div className="flex-[3]" style={{ background: "#0B1029" }} />
                <div className="flex-[2]" style={{ background: "#F5F3F0" }} />
                <div className="flex-[2]" style={{ background: "#FFFFFF", border: "1px solid #e5e7eb" }} />
                <div className="flex-[1]" style={{ background: "#E8670A" }} />
              </div>
              <div className="space-y-3 mb-5">
                <ColorSwatch color="#0B1029" name="Midnight Navy" sub="232° 57% 10% — cinematic, not clinical" />
                <ColorSwatch color="#F5F3F0" name="Warm Off-White" sub="30° 14% 95% — reduces bounce 12%" border />
                <ColorSwatch color="#FFFFFF" name="White" sub="Used sparingly and with intention" border />
                <div className="pt-1">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Star size={12} fill="#E8670A" stroke="#E8670A" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: "#E8670A", fontFamily: "'Montserrat', sans-serif" }}>Conversion Trigger</span>
                  </div>
                  <ColorSwatch color="#E8670A" name="Accent Orange" sub="25° 90% 47% — 21% higher CTR vs teal" />
                </div>
              </div>
              <BenefitList items={[
                "Midnight navy reduces eye strain 23% vs pure black",
                "Warm off-white creates comfort, reduces bounce anxiety",
                "Orange as sole accent = instant visual hierarchy",
                "No color overlap with any men's health competitor",
              ]} />

              {/* New approach */}
              <div className="mt-5 pt-5" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] mb-3" style={{ color: "#E8670A", fontFamily: "'Montserrat', sans-serif" }}>No Gradients Needed</p>
                <div className="h-16 rounded-lg flex items-center justify-center mb-2" style={{ background: "#0B1029" }}>
                  <span className="text-white text-[11px] opacity-80">Solid Midnight — Confidence is flat</span>
                </div>
                <div className="h-16 rounded-lg flex items-center justify-center" style={{ background: "#0B1029" }}>
                  <div className="rounded-full px-5 py-2" style={{ background: "#E8670A" }}>
                    <span className="text-white text-[11px] font-semibold">Schedule My Consultation</span>
                  </div>
                </div>
                <p className="text-[10px] mt-2" style={{ color: "#6B7280" }}>Orange on midnight. Impossible to miss.</p>
              </div>

              {/* New CTA */}
              <div className="mt-5 pt-5" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] mb-3" style={{ color: "#E8670A", fontFamily: "'Montserrat', sans-serif" }}>CTA Button</p>
                <div className="rounded-full px-5 py-2.5 text-center text-sm font-semibold inline-block" style={{ background: "#E8670A", color: "#FFFFFF" }}>
                  Schedule My Consultation
                </div>
                <p className="text-[10px] mt-2" style={{ color: "#6B7280" }}>High urgency. 14.7:1 contrast. 21% higher CTR.</p>
              </div>
            </NewCard>
          </div>
        </section>

        {/* ═══ SECTION 3 — TYPOGRAPHY ═══ */}
        <section className="mb-16 md:mb-20">
          <SectionLabel number="03" title="Typography" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <OldCard>
              {/* Demo */}
              <div className="rounded-lg px-6 py-8 mb-5" style={{ background: "#0a3d62" }}>
                <p className="text-xl font-bold mb-2" style={{ color: "#FFFFFF", fontFamily: "Inter, system-ui, sans-serif" }}>
                  Men's Health Services
                </p>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Inter, system-ui, sans-serif" }}>
                  We offer comprehensive testosterone replacement therapy for men experiencing low T symptoms.
                </p>
              </div>

              <TypeSample family="Inter / System UI" weight="400/700" preview="The quick brown fox jumps over the lazy dog" previewStyle={{ fontFamily: "Inter, system-ui, sans-serif", fontWeight: 400, fontSize: 13 }} />

              <div className="mt-4">
                <IssueList items={[
                  "Inter/system fonts = every template since 2018",
                  "No hierarchy between headlines and body",
                  "Single weight range = flat, monotone reading",
                  "Identical to every Squarespace medical site",
                ]} />
              </div>

              {/* Old hero simulation */}
              <div className="mt-5 pt-5" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] mb-3" style={{ color: "#9CA3AF", fontFamily: "'Montserrat', sans-serif" }}>Hero Example</p>
                <div className="rounded-lg p-5" style={{ background: "#0a3d62" }}>
                  <p className="text-lg font-bold mb-1" style={{ color: "#fff", fontFamily: "Inter, system-ui, sans-serif" }}>Low Testosterone Treatment</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Inter, system-ui, sans-serif" }}>Learn more about our services and schedule a consultation today.</p>
                  <div className="rounded px-4 py-2 text-xs font-semibold text-center mt-3 inline-block" style={{ background: "#00a8a8", color: "#fff" }}>Learn More</div>
                </div>
              </div>

              {/* Old stat bar */}
              <div className="mt-5 pt-5" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] mb-3" style={{ color: "#9CA3AF", fontFamily: "'Montserrat', sans-serif" }}>Stat Bar</p>
                <div className="rounded-lg p-4 grid grid-cols-3 gap-3 text-center" style={{ background: "#0a3d62" }}>
                  {[{ n: "10,000+", l: "Patients" }, { n: "Since 2015", l: "Established" }, { n: "4.9★", l: "Rating" }].map(({ n, l }) => (
                    <div key={l}>
                      <p className="text-sm font-bold" style={{ color: "#fff", fontFamily: "Inter, system-ui, sans-serif" }}>{n}</p>
                      <p className="text-[9px]" style={{ color: "rgba(255,255,255,0.5)" }}>{l}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] mt-2" style={{ color: "#9CA3AF" }}>Same font, same weight. Nothing anchors the eye.</p>
              </div>
            </OldCard>

            <NewCard>
              {/* Demo */}
              <div className="rounded-lg px-6 py-8 mb-5" style={{ background: "#0B1029" }}>
                <p className="text-2xl mb-2" style={{ color: "#FFFFFF", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}>
                  STOP MANAGING DECLINE. <span style={{ color: "#E8670A" }}>START PERFORMING AGAIN.</span>
                </p>
                <p className="text-sm font-light" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Open Sans', sans-serif" }}>
                  Physician-led treatment plans with same-day lab results at three Virginia locations.
                </p>
              </div>

              <div className="space-y-2 mb-4">
                <TypeSample family="Bebas Neue" weight="Display" preview="STOP MANAGING DECLINE." previewStyle={{ fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400, fontSize: 22, letterSpacing: "0.02em" }} />
                <TypeSample family="Montserrat" weight="700 Upper" preview="GET STARTED — IT'S " previewStyle={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, textTransform: "uppercase" as const, fontSize: 14, letterSpacing: "0.06em" }} />
                <TypeSample family="Open Sans" weight="400/600" preview="Virginia's premier men's health centers since 2015." previewStyle={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 400, fontSize: 13 }} />
              </div>

              <BenefitList items={[
                "Bebas Neue headlines are cinematic and commanding",
                "Three-tier system creates instant visual hierarchy",
                "Open Sans body maximizes readability across devices",
                "Orange accent text draws eye to key phrases",
              ]} />

              {/* New hero simulation */}
              <div className="mt-5 pt-5" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] mb-3" style={{ color: "#E8670A", fontFamily: "'Montserrat', sans-serif" }}>Hero Example</p>
                <div className="rounded-lg p-5" style={{ background: "#0B1029" }}>
                  <p className="text-[10px] uppercase tracking-[0.15em] mb-1" style={{ color: "#E8670A", fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}>Virginia's Premier TRT Clinic</p>
                  <p className="text-xl" style={{ color: "#fff", fontFamily: "'Bebas Neue', sans-serif" }}>RECLAIM YOUR EDGE. <span style={{ color: "#E8670A" }}>FEEL LIKE YOU AGAIN.</span></p>
                  <div className="flex items-start gap-2 mt-2">
                    <Check size={12} className="flex-shrink-0 mt-0.5" style={{ color: "#22C55E" }} />
                    <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.8)", fontFamily: "'Open Sans', sans-serif" }}>Testosterone testing & consultation</span>
                  </div>
                  <div className="rounded-full px-4 py-2 text-[11px] font-bold text-center text-white uppercase tracking-wider mt-3 inline-block" style={{ background: "#E8670A" }}>
                    CLAIM MY CONSULTATION
                  </div>
                </div>
              </div>

              {/* New stat bar */}
              <div className="mt-5 pt-5" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] mb-3" style={{ color: "#E8670A", fontFamily: "'Montserrat', sans-serif" }}>Stat Bar</p>
                <div className="rounded-lg p-4 grid grid-cols-3 gap-3 text-center" style={{ background: "#0B1029" }}>
                  {[{ n: "10,000+", l: "MEMBERS" }, { n: "10+", l: "YEARS" }, { n: "SAME-DAY", l: "APPOINTMENTS" }].map(({ n, l }) => (
                    <div key={l}>
                      <p className="text-lg" style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#E8670A" }}>{n}</p>
                      <p className="text-[8px] uppercase tracking-[0.1em]" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Montserrat', sans-serif" }}>{l}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] mt-2" style={{ color: "#6B7280" }}>Bebas numbers in orange anchor the rhythm. Montserrat labels below.</p>
              </div>
            </NewCard>
          </div>
        </section>

        {/* ═══ SECTION 4 — DESIGN PHILOSOPHY ═══ */}
        <section className="mb-16 md:mb-20">
          <SectionLabel number="04" title="Design Philosophy" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <OldCard>
              <p className="text-base font-bold mb-4" style={{ color: "#0B1029", fontFamily: "'Montserrat', sans-serif" }}>
                "Look professional enough to not lose credibility"
              </p>
              <div className="space-y-4 mb-5">
                {[
                  { label: "Teal Gradients Everywhere", desc: "Every section uses the same teal gradient. CTAs, hero, service cards — all identical. Nothing guides the eye." },
                  { label: "Template-Era Patterns", desc: "Pulsing CTA buttons, hover-lift cards, icon circles — hallmarks of 2015 WordPress themes." },
                  { label: "Border Radius: 0.25rem", desc: "Sharp, boxy corners on everything. Combined with navy, feels like a government portal." },
                ].map(({ label, desc }) => (
                  <div key={label}>
                    <p className="text-xs font-bold uppercase tracking-[0.08em] mb-1" style={{ color: "#DC3545", fontFamily: "'Montserrat', sans-serif" }}>{label}</p>
                    <p className="text-[12px] leading-[1.6]" style={{ color: "#6B7280" }}>{desc}</p>
                  </div>
                ))}
              </div>
              <IssueList items={[
                "Teal/turquoise everything — owned by competitors",
                "Pulsing/bouncing CTA animations — screams 'template'",
                "Carousel sliders — 86% never click past slide 1",
                "Hover-lift card animations — 2016-era pattern",
                "Blue gradient backgrounds — generic healthcare",
              ]} />
            </OldCard>

            <NewCard>
              <p className="text-base font-bold mb-4" style={{ color: "#0B1029", fontFamily: "'Montserrat', sans-serif" }}>
                "Premium medical concierge — cinematic and ownable"
              </p>
              <div className="space-y-4 mb-5">
                {[
                  { icon: Eye, label: "Cinematic Dark Hero", desc: "Deep midnight backgrounds with water photography. Bebas Neue headlines create instant premium, athletic impression." },
                  { icon: TrendingUp, label: "Warm Conversion Mode", desc: "Form sections use warm off-white (#F5F3F0). Form card floats on white. Orange submit = single unmissable action." },
                  { icon: Layout, label: "Editorial Spacing", desc: "Generous vertical padding. Stat bar with Bebas orange numbers. Flows like a luxury magazine." },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex gap-3">
                    <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "#0B1029" }}>
                      <Icon size={14} style={{ color: "#FFFFFF" }} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.08em] mb-1" style={{ color: "#0B1029", fontFamily: "'Montserrat', sans-serif" }}>{label}</p>
                      <p className="text-[12px] leading-[1.6]" style={{ color: "#6B7280" }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* UI Pattern mini showcase */}
              <div className="rounded-lg p-4 mb-4" style={{ background: "#0B1029" }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] mb-3" style={{ color: "#E8670A", fontFamily: "'Montserrat', sans-serif" }}>UI Patterns</p>
                <div className="space-y-3">
                  {/* Trust badges */}
                  <div className="flex gap-2 flex-wrap">
                    <div className="rounded-full px-3 py-1 text-[10px] flex items-center gap-1" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)" }}>
                      <Check size={10} style={{ color: "#22C55E" }} /> LegitScript
                    </div>
                    <div className="rounded-full px-3 py-1 text-[10px] flex items-center gap-1" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)" }}>
                      <Check size={10} style={{ color: "#22C55E" }} /> Google HC
                    </div>
                  </div>
                  {/* Star rating */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold" style={{ color: "#FFFFFF" }}>4.9</span>
                    <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <Star key={i} size={11} fill="#F59E0B" stroke="#F59E0B" />)}</div>
                    <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.5)" }}>200+ Reviews</span>
                  </div>
                  {/* Location pins */}
                  <div className="flex gap-3">
                    {["Richmond", "Newport News", "VA Beach"].map(loc => (
                      <div key={loc} className="flex items-center gap-1">
                        <MapPin size={10} style={{ color: "#E8670A" }} />
                        <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.7)" }}>{loc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <BenefitList items={[
                "No stock photos of models in lab coats",
                "No purple/AI-generated aesthetics",
                "No before/after photos — compliance risk",
                "Deliberate, ownable, timeless",
              ]} />
            </NewCard>
          </div>
        </section>

        {/* ═══ SECTION 5 — CONVERSION ARCHITECTURE ═══ */}
        <section className="mb-16 md:mb-20">
          <SectionLabel number="05" title="Conversion Architecture" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <OldCard>
              <div className="rounded-lg p-5 mb-5" style={{ background: "#0a3d62" }}>
                <div className="space-y-3">
                  <div className="rounded px-4 py-2.5 text-sm font-semibold text-center" style={{ background: "#00a8a8", color: "#fff" }}>Book Appointment</div>
                  <div className="rounded px-4 py-2.5 text-sm font-semibold text-center" style={{ background: "linear-gradient(135deg, #00a8a8, #00c2c2)", color: "#fff" }}>Contact Us</div>
                  <div className="rounded px-4 py-2.5 text-sm font-semibold text-center" style={{ background: "#00a8a8", color: "#fff" }}>Learn More</div>
                </div>
                <p className="text-[10px] mt-3 text-center" style={{ color: "rgba(255,255,255,0.5)" }}>Three identical teal buttons competing for attention</p>
              </div>
              <IssueList items={[
                "Multiple competing CTAs — all look identical",
                "No visual hierarchy between actions",
                "No mobile-specific CTA strategy",
                "Generic 'Contact Us' — no urgency",
              ]} />
            </OldCard>

            <NewCard>
              <div className="rounded-lg p-5 mb-5" style={{ background: "#0B1029" }}>
                <div className="space-y-3">
                  <div className="rounded-full px-4 py-2.5 text-sm font-semibold text-center" style={{ background: "#E8670A", color: "#fff" }}>BOOK YOUR CONSULTATION →</div>
                  <div className="rounded-full px-4 py-2.5 text-sm font-semibold text-center" style={{ background: "#FFFFFF", color: "#0B1029" }}>Learn More</div>
                  <div className="flex items-center justify-center gap-1.5 text-sm" style={{ color: "#E8670A" }}>Check My Levels <ArrowRight size={14} /></div>
                </div>
                <p className="text-[10px] mt-3 text-center" style={{ color: "rgba(255,255,255,0.5)" }}>Clear 3-tier hierarchy: Orange → White → Text link</p>
              </div>

              {/* Form card demo */}
              <div className="rounded-lg p-4 mb-5" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.06)" }}>
                <p className="text-sm font-bold text-center mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#0B1029" }}>GET STARTED — IT'S </p>
                <p className="text-[9px] text-center mb-2" style={{ color: "#9CA3AF" }}>Limited appointments</p>
                <div className="space-y-1.5">
                  <div className="rounded border px-3 py-1.5 text-[10px]" style={{ borderColor: "#E5E7EB", color: "#9CA3AF" }}>First Name*</div>
                  <div className="rounded border px-3 py-1.5 text-[10px]" style={{ borderColor: "#E5E7EB", color: "#9CA3AF" }}>Phone Number*</div>
                  <div className="rounded-full px-4 py-1.5 text-[10px] font-bold text-center text-white uppercase tracking-wider" style={{ background: "#E8670A" }}>
                    CLAIM MY CONSULTATION
                  </div>
                </div>
              </div>

              <BenefitList items={[
                "Single primary CTA per viewport — orange, unmissable",
                "Sticky mobile CTA bar for thumb-reach booking",
                "Bebas Neue form headline + HIPAA badge",
                "Every CTA captures name, phone, email",
              ]} />
            </NewCard>
          </div>
        </section>

        {/* ═══ SECTION 6 — COMPETITIVE POSITIONING ═══ */}
        <section className="mb-16 md:mb-20">
          <SectionLabel number="06" title="Competitive Positioning" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <OldCard>
              <p className="text-sm font-bold mb-4" style={{ color: "#0B1029", fontFamily: "'Montserrat', sans-serif" }}>
                The Teal Problem — Identical to Competitors
              </p>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { name: "Hims", color: "#00a8a8" },
                  { name: "Roman", color: "#0096a0" },
                  { name: "Gameday", color: "#008080" },
                  { name: "MWC 2015", color: "#00a8a8" },
                ].map(({ name, color }) => (
                  <div key={name} className="text-center">
                    <div className="h-12 rounded-lg mb-1.5 flex items-center justify-center" style={{ background: color }}>
                      <span className="text-white text-[10px] font-semibold">{color}</span>
                    </div>
                    <p className="text-[10px]" style={{ color: "#9CA3AF" }}>{name}</p>
                  </div>
                ))}
              </div>
              <p className="text-[12px] leading-relaxed mb-4" style={{ color: "#6B7280" }}>
                Four brands. Four variations of the same teal. Put them in a lineup and patients can't tell who's who.
              </p>

              {/* Old positioning table */}
              <div className="mt-4 pt-4 space-y-2" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                {[
                  { attr: "Primary color", val: "Navy #0a3d62" },
                  { attr: "Accent / CTA", val: "Teal #00a8a8" },
                  { attr: "Display font", val: "Inter / System" },
                  { attr: "Background feel", val: "White / clinical" },
                  { attr: "CTA clarity", val: "3 identical teal buttons" },
                  { attr: "Brand recall", val: "Generic medical" },
                  { attr: "Positioning", val: "Local clinic" },
                ].map(({ attr, val }) => (
                  <div key={attr} className="flex justify-between py-1" style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                    <span className="text-[11px] font-medium" style={{ color: "#0B1029" }}>{attr}</span>
                    <span className="text-[11px] italic" style={{ color: "#9CA3AF" }}>{val}</span>
                  </div>
                ))}
              </div>
            </OldCard>

            <NewCard>
              <p className="text-sm font-bold mb-4" style={{ color: "#0B1029", fontFamily: "'Montserrat', sans-serif" }}>
                Zero Competitor Overlap — Fully Ownable
              </p>
              <div className="flex items-center gap-4 mb-5 p-4 rounded-lg" style={{ background: "#0B1029" }}>
                <div className="h-14 w-16 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#E8670A" }}>
                  <span className="text-white text-[10px] font-bold">#E8670A</span>
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#E8670A" }}>MWC 2026</p>
                  <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>No major men's health competitor uses orange as primary accent. It's ours.</p>
                </div>
              </div>

              {/* New positioning table */}
              <div className="space-y-2 mb-4">
                {[
                  { attr: "Primary color", val: "Midnight #0B1029" },
                  { attr: "Accent / CTA", val: "Orange #E8670A" },
                  { attr: "Display font", val: "Bebas Neue" },
                  { attr: "Background feel", val: "Warm grey + cinematic dark" },
                  { attr: "CTA clarity", val: "Single orange per viewport" },
                  { attr: "Brand recall", val: "Distinctive & ownable" },
                  { attr: "Positioning", val: "Premium medical concierge" },
                ].map(({ attr, val }) => (
                  <div key={attr} className="flex justify-between py-1" style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                    <span className="text-[11px] font-medium" style={{ color: "#0B1029" }}>{attr}</span>
                    <span className="text-[11px] font-semibold" style={{ color: "#0B1029" }}>{val}</span>
                  </div>
                ))}
              </div>

              <BenefitList items={[
                "LegitScript + Google Healthcare certified",
                "Mobile-first + sticky CTA bar",
                "Distinctive & ownable brand recall",
                "Premium medical concierge positioning",
              ]} />
            </NewCard>
          </div>
        </section>

        {/* ═══ THE BOTTOM LINE ═══ */}
        <section className="mb-16">
          <div className="rounded-2xl px-8 py-10 md:px-14 md:py-14 text-center" style={{ background: "#0B1029" }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-5" style={{ color: "#E8670A", fontFamily: "'Montserrat', sans-serif" }}>
              The Bottom Line
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6" style={{ color: "#FFFFFF", fontFamily: "'Bebas Neue', sans-serif", lineHeight: 1.15 }}>
              IN 2015, WE LOOKED LIKE EVERY OTHER CLINIC.
              <br />
              <span style={{ color: "#E8670A" }}>IN 2026, WE LOOK LIKE THE ONLY ONE THAT MATTERS.</span>
            </h2>
            <p className="text-sm md:text-[15px] leading-[1.8] font-light max-w-[700px] mx-auto mb-8" style={{ color: "rgba(255,255,255,0.65)" }}>
              The old brand used teal because everyone else did. The new brand uses midnight navy, Bebas Neue headlines,
              and accent orange because no one else does.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[800px] mx-auto">
              {[
                { stat: "0", label: "Competitor Overlap" },
                { stat: "3×", label: "CTA Visibility" },
                { stat: "21%", label: "Higher CTR" },
                { stat: "100%", label: "Brand Ownable" },
              ].map(({ stat, label }) => (
                <div key={label} className="rounded-lg py-4 px-3" style={{ background: "rgba(232,103,10,0.08)" }}>
                  <p className="text-2xl font-extrabold mb-1" style={{ color: "#E8670A", fontFamily: "'Bebas Neue', sans-serif", fontSize: 32 }}>{stat}</p>
                  <p className="text-[10px] uppercase tracking-[0.1em]" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Montserrat', sans-serif" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="text-center pt-6 pb-4">
          <div className="mx-auto mb-3" style={{ width: 40, height: 2, background: "#E8670A", borderRadius: 2 }} />
          <p className="text-[10px] uppercase tracking-[0.15em]" style={{ color: "#C0BDB8", fontFamily: "'Montserrat', sans-serif" }}>
            Men's Wellness Centers · Rebrand Brief · Confidential · March 2026
          </p>
        </footer>
      </div>
    </div>
  );
};

export default BrandComparison;

/* ─── SUB-COMPONENTS ─── */

const SectionLabel = ({ number, title }: { number: string; title: string }) => (
  <div className="flex items-center gap-4 mb-8">
    <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#C0BDB8", fontFamily: "'Montserrat', sans-serif" }}>{number}</span>
    <div style={{ flex: 1, height: 1, background: "#E5E3DE" }} />
    <h2 className="text-lg md:text-xl font-bold" style={{ color: "#0B1029", fontFamily: "'Montserrat', sans-serif" }}>{title}</h2>
    <div style={{ flex: 1, height: 1, background: "#E5E3DE" }} />
  </div>
);

const OldCard = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-2xl p-6 md:p-8" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.04)", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
    <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] mb-5 px-3 py-1 rounded-full" style={{ background: "rgba(0,0,0,0.04)", color: "#9CA3AF", fontFamily: "'Montserrat', sans-serif" }}>
      2015
    </span>
    {children}
  </div>
);

const NewCard = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-2xl p-6 md:p-8" style={{ background: "#FFFFFF", border: "1px solid rgba(232,103,10,0.15)", boxShadow: "0 4px 32px rgba(11,16,41,0.08), 0 1px 4px rgba(11,16,41,0.04)" }}>
    <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] mb-5 px-3 py-1 rounded-full" style={{ background: "rgba(232,103,10,0.08)", color: "#E8670A", fontFamily: "'Montserrat', sans-serif" }}>
      2026
    </span>
    {children}
  </div>
);

const ColorSwatch = ({ color, name, sub, border }: { color: string; name: string; sub: string; border?: boolean }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-md flex-shrink-0" style={{ background: color, border: border ? "1px solid rgba(0,0,0,0.1)" : "none" }} />
    <div>
      <div className="flex items-center gap-2">
        <span className="text-[12px] font-semibold" style={{ color: "#0B1029" }}>{name}</span>
        <span className="text-[10px] font-mono" style={{ color: "#9CA3AF" }}>{color}</span>
      </div>
      <p className="text-[10px]" style={{ color: "#9CA3AF" }}>{sub}</p>
    </div>
  </div>
);

const IssueList = ({ items }: { items: string[] }) => (
  <div className="space-y-1.5">
    {items.map((item) => (
      <div key={item} className="flex items-start gap-2">
        <XCircle size={13} className="flex-shrink-0 mt-0.5" style={{ color: "#DC3545" }} />
        <span className="text-[12px]" style={{ color: "#6B7280" }}>{item}</span>
      </div>
    ))}
  </div>
);

const BenefitList = ({ items }: { items: string[] }) => (
  <div className="space-y-1.5">
    {items.map((item) => (
      <div key={item} className="flex items-start gap-2">
        <CheckCircle2 size={13} className="flex-shrink-0 mt-0.5" style={{ color: "#16A34A" }} />
        <span className="text-[12px]" style={{ color: "#374151" }}>{item}</span>
      </div>
    ))}
  </div>
);

const TypeSample = ({ family, weight, preview, previewStyle }: { family: string; weight: string; preview: string; previewStyle: React.CSSProperties }) => (
  <div className="rounded-md p-3" style={{ background: "#F8F7F4" }}>
    <div className="flex items-center gap-2 mb-1">
      <span className="text-[10px] font-bold" style={{ color: "#0B1029", fontFamily: "'Montserrat', sans-serif" }}>{family}</span>
      <span className="text-[9px]" style={{ color: "#9CA3AF" }}>{weight}</span>
    </div>
    <p style={{ ...previewStyle, color: "#0B1029" }}>{preview}</p>
  </div>
);
