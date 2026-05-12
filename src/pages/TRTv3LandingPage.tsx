import { useEffect, useRef, useState } from "react";
import {
  Check,
  ArrowRight,
  Star,
  MapPin,
  Phone,
  Menu,
  X as CloseIcon,
  XCircle,
  Stethoscope,
  TestTube2,
  ShieldCheck,
  Activity,
  Building2,
  ChevronDown,
} from "lucide-react";

// Real MWC photography only — no stock or AI-generated images
import heroClinic from "@/assets/lp/trt-hero-clinic.jpg";
import providerPatient from "@/assets/lp/trt-provider-patient.jpg";
import firstVisitBloodwork from "@/assets/lp/first-visit-bloodwork.png";
import trtLab from "@/assets/lp/trt-lab.jpg";
import lobbyInnslake from "@/assets/lp/lobby-innslake.jpg";
import lobbyInterior from "@/assets/lp/lobby-interior.jpg";
import lobbyAtrium from "@/assets/lp/lobby-atrium.webp";
import drPapariello from "@/assets/lp/dr-popariello.jpeg";
import mwcTeam from "@/assets/lp/mwc-team-scrubs.webp";
import mwcTeamNew from "@/assets/lp/mwc-team-new.png";
import providerHeadshot from "@/assets/lp/provider-headshot.jpg";

/* ─── CONSTANTS ────────────────────────────────────────────── */

const PHONE = "866-344-4955";
const PHONE_HREF = "tel:+18663444955";
const PRICE = "$199/mo";
const FONT_DISPLAY = "'Oswald', sans-serif";
const FONT_BODY = "'Inter', system-ui, sans-serif";

/* ─── DATA ─────────────────────────────────────────────────── */

const OUTCOMES = [
  { icon: "⚡", label: "More Energy" },
  { icon: "🔥", label: "Stronger Libido" },
  { icon: "🧠", label: "Sharper Focus" },
  { icon: "💪", label: "Lean Muscle" },
];

const TRUST_CHECKS = [
  "Licensed Virginia providers",
  "Same-day appointments available",
  "3 in-person Virginia clinics",
  "FSA / HSA accepted",
];

const STATS = [
  { value: "10,000+", label: "Men Treated" },
  { value: "10+", label: "Years in Virginia" },
  { value: "Same-Day", label: "Appointments" },
  { value: "4.9★", label: "Google Rating" },
];

const SYMPTOMS = [
  "Constant fatigue no matter how much you sleep",
  "Lost drive, confidence, and motivation",
  "Brain fog that won't lift no matter what you try",
  "Gaining belly fat, losing muscle despite working out",
  'Your doctor says your labs are "normal." You know better.',
];

const STEPS = [
  {
    num: "01",
    title: "Same-Day Blood Work",
    desc: "Full testosterone panel drawn on-site and reviewed in minutes — not two weeks.",
  },
  {
    num: "02",
    title: "A Doctor Who Actually Listens",
    desc: "A hormone specialist sits with you, walks through every number, and explains exactly what's going on.",
  },
  {
    num: "03",
    title: "Your Personalized Plan",
    desc: "Your protocol is built around your labs and symptoms. Many patients start the same day.",
  },
];

const COMPARISONS = [
  { bad: "10-min video call", good: "Face-to-face doctor" },
  { bad: "2-week lab wait", good: "Results same visit" },
  { bad: "Cookie-cutter script", good: "Plan built for you" },
];

const RESULT_STATS = [
  { value: "2–5×", label: "Increase in total testosterone within 2 months*" },
  { value: "84%", label: "Of patients report meaningful symptom improvement*" },
];

const TESTIMONIALS = [
  {
    quote:
      "Energy is back to where it was a decade ago. Better sleep, focused at work, and the team picks up the phone when I call.",
    name: "Mark T.",
    city: "Richmond, VA",
  },
  {
    quote:
      "I was skeptical, but the in-person visit and same-day labs made it feel real. Body composition has shifted noticeably.",
    name: "James R.",
    city: "Virginia Beach, VA",
  },
  {
    quote:
      "Mood and motivation were the biggest changes. The physician walked me through every number — first time anyone has done that.",
    name: "David K.",
    city: "Newport News, VA",
  },
];

const PILLARS = [
  {
    Icon: Stethoscope,
    title: "Licensed Providers",
    desc: "Licensed Virginia nurse practitioners and physicians. Not remote. Not an app. A real provider, every visit.",
  },
  {
    Icon: TestTube2,
    title: "On-Site Labs",
    desc: "Blood draw and full panel done in-house. Results back before you walk out the door.",
  },
  {
    Icon: ShieldCheck,
    title: "Built For Men",
    desc: "A clinic designed around your schedule, your privacy, and your goals. Nothing else.",
  },
  {
    Icon: Activity,
    title: "Ongoing Monitoring",
    desc: "Regular check-ins, labs, and protocol adjustments. We don't write a script and disappear.",
  },
  {
    Icon: Building2,
    title: "No Telehealth Runaround",
    desc: "You see a real doctor in a real clinic. No app. No video call. No waiting on hold with a call center.",
  },
];

const FAQS = [
  {
    q: "How much does it cost?",
    a: "Treatment plans start at $199/month after your physician evaluation. Your initial consultation and on-site labs are included with your first visit. FSA/HSA accepted.",
  },
  {
    q: "Do I need a referral?",
    a: "No referral needed. Book directly online or by phone. Same-day and next-day appointments are regularly available.",
  },
  {
    q: "What happens during my first visit?",
    a: "You come in, get blood drawn on-site, sit with a physician who reviews your results and health history, and leave with a personalized plan. One visit, typically one hour.",
  },
  {
    q: "How quickly will I see results?",
    a: "Most patients notice changes in energy and mood within the first few weeks. Hormone levels typically normalize within 2–3 months. Your physician tracks your progress at every follow-up.",
  },
  {
    q: "Is my information confidential?",
    a: "Yes. Men's Wellness Centers is a fully HIPAA-compliant medical practice. Your records stay private.",
  },
];

const LOCATIONS = [
  {
    name: "Richmond",
    address: "4050 Innslake Dr, Suite 360\nGlen Allen, VA 23060",
    phone: "804-346-4636",
    value: "richmond",
  },
  {
    name: "Newport News",
    address: "827 Diligence Drive, Suite 206\nNewport News, VA 23606",
    phone: "757-806-6263",
    value: "newport-news",
  },
  {
    name: "Virginia Beach",
    address: "996 First Colonial Road\nVirginia Beach, VA 23454",
    phone: "757-806-6263",
    value: "virginia-beach",
  },
];

const MARQUEE_ITEMS = [
  "✦ Same-Day Blood Work",
  "✦ Licensed Virginia Providers",
  "✦ 10,000+ Men Treated",
  "✦ Physician-Led Care",
  "✦ In-Person Clinic",
  "✦ 4.9★ Rated",
  "✦ FSA/HSA Accepted",
  "✦ No Referral Needed",
  "✦ Results Same Visit",
  "✦ No Telehealth Runaround",
];

/* ─── LAYOUT CONSTANTS ─────────────────────────────────────── */
const BANNER_H = 36;
const HEADER_H = 64;
const TOTAL_OFFSET = BANNER_H + HEADER_H;

/* ─── UTILITY ──────────────────────────────────────────────── */

const smoothTo = (id: string) => () =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

/* ─── SHARED STYLE HELPERS ─────────────────────────────────── */

const eyebrow = (text: string, light = false) => (
  <p
    style={{
      fontFamily: FONT_BODY,
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: "0.18em",
      color: light ? "#E8670A" : "rgba(27,43,75,0.60)",
      textTransform: "uppercase",
      marginBottom: 12,
    }}
  >
    {text}
  </p>
);

const sectionHead = (
  text: string,
  color: string = "#1B2B4B",
  align: "left" | "center" = "left"
) => (
  <h2
    style={{
      fontFamily: FONT_DISPLAY,
      fontSize: "clamp(28px, 3.5vw, 44px)",
      fontWeight: 700,
      lineHeight: 1.08,
      letterSpacing: "0.01em",
      color,
      textAlign: align,
    }}
  >
    {text}
  </h2>
);

/* ─── MARQUEE CSS INJECTION ────────────────────────────────── */

/* ─── SECTION DIVIDER ──────────────────────────────────────── */
// Thin orange accent line — use between dark→light and light→dark transitions
const OrangeDivider = () => (
  <div style={{ height: 1, background: "#E8670A", opacity: 0.35, width: "100%" }} />
);

const MarqueeStyles = () => (
  <style>{`
    @keyframes marquee-scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .marquee-track {
      animation: marquee-scroll 30s linear infinite;
      will-change: transform;
    }
    .marquee-track:hover {
      animation-play-state: paused;
    }
  `}</style>
);

/* ─── LEAD FORM CARD (shared, reusable) ────────────────────── */

const LeadFormCard = ({ title = "Book My Consultation" }: { title?: string }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [tcpa, setTcpa] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const isValidEmail = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isValidPhone = (v: string) =>
    v.replace(/\D/g, "").length >= 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!isValidEmail(email)) errs.email = "Enter a valid email";
    if (!phone.trim()) errs.phone = "Phone is required";
    else if (!isValidPhone(phone)) errs.phone = "Enter a valid phone number";
    if (!location) errs.location = "Select a location";
    if (!tcpa) errs.tcpa = "You must consent to continue";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    const params = new URLSearchParams({
      name,
      email,
      phone,
      location,
      source: "lp-trt-v3",
      service: "trt",
    });
    const urls: Record<string, string> = {
      richmond: "https://menswellnesscenters.com/thank-you-richmond/",
      "newport-news":
        "https://menswellnesscenters.com/thank-you-newport-news/",
      "virginia-beach":
        "https://menswellnesscenters.com/thank-you-virginia-beach/",
    };
    window.location.href = `${urls[location]}?${params.toString()}`;
  };

  const baseInput: React.CSSProperties = {
    width: "100%",
    height: 50,
    background: "#FFFFFF",
    border: "1px solid #D9DEF0",
    borderRadius: 8,
    padding: "0 16px",
    fontSize: 15,
    color: "#1B2B4B",
    outline: "none",
    fontFamily: FONT_BODY,
    boxSizing: "border-box",
    transition: "border-color 200ms ease, box-shadow 200ms ease",
  };

  const focusIn = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.currentTarget.style.borderColor = "#E8670A";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,103,10,0.16)";
    e.currentTarget.style.background = "#fff";
  };
  const focusOut = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.currentTarget.style.borderColor = "#D9DEF0";
    e.currentTarget.style.boxShadow = "none";
    e.currentTarget.style.background = "#FFFFFF";
  };

  const FieldError = ({ msg }: { msg?: string }) =>
    msg ? (
      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: 11,
          color: "#D94444",
          marginTop: 4,
          textAlign: "left",
        }}
      >
        {msg}
      </p>
    ) : null;

  return (
    <div
      style={{
        background: "#F5F3F0",
        borderRadius: 20,
        padding: "32px 28px 24px",
        border: "1px solid #D9DEF0",
        boxShadow: "0 8px 32px rgba(27,43,75,0.12)",
        textAlign: "left",
      }}
    >
      <h3
        style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "0.02em",
          textTransform: "uppercase",
          color: "#1B2B4B",
          textAlign: "center",
          marginBottom: 6,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: 13,
          color: "#54595F",
          textAlign: "center",
          marginBottom: 22,
        }}
      >
        No commitment · No credit card to book
      </p>

      {/* Location selector — prominent first */}
      <div style={{ marginBottom: 12 }}>
        <label
          style={{
            fontFamily: FONT_BODY,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#1B2B4B",
            display: "block",
            marginBottom: 6,
          }}
        >
          Choose Your Clinic
        </label>
        <select
          aria-label="Preferred clinic location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onFocus={focusIn as React.FocusEventHandler<HTMLSelectElement>}
          onBlur={focusOut as React.FocusEventHandler<HTMLSelectElement>}
          style={{
            ...baseInput,
            height: 54,
            fontSize: 16,
            fontWeight: location ? 600 : 400,
            color: location ? "#0E1230" : "#999",
            appearance: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 14px center",
            paddingRight: 42,
          }}
        >
          <option value="" disabled>
            Select Location →
          </option>
          {LOCATIONS.map((l) => (
            <option key={l.value} value={l.value}>
              {l.name}, VA
            </option>
          ))}
        </select>
        <FieldError msg={errors.location} />
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        {/* Field label helper */}
        {([
          { label: "Full Name", type: "text", value: name, setter: setName, complete: "name", err: errors.name, ariaLabel: "Full name" },
          { label: "Email Address", type: "email", value: email, setter: setEmail, complete: "email", err: errors.email, ariaLabel: "Email address" },
          { label: "Phone Number", type: "tel", value: phone, setter: setPhone, complete: "tel", err: errors.phone, ariaLabel: "Phone number" },
        ] as const).map(({ label, type, value, setter, complete, err, ariaLabel }) => (
          <div key={label}>
            <label style={{ display: "block", fontFamily: FONT_BODY, fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#54595F", marginBottom: 6 }}>{label}</label>
            <input
              type={type}
              placeholder={label}
              aria-label={ariaLabel}
              value={value}
              onChange={(e) => setter(e.target.value)}
              onFocus={focusIn}
              onBlur={focusOut}
              style={baseInput}
              autoComplete={complete}
            />
            <FieldError msg={err} />
          </div>
        ))}

        {/* TCPA */}
        <div>
          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={tcpa}
              onChange={(e) => setTcpa(e.target.checked)}
              style={{
                width: 16,
                height: 16,
                marginTop: 2,
                flexShrink: 0,
                cursor: "pointer",
                accentColor: "#E8670A",
              }}
            />
            <span
              style={{
                fontFamily: FONT_BODY,
                fontSize: 11,
                color: "#54595F",
                lineHeight: 1.6,
              }}
            >
              I consent to receive appointment and marketing texts from
              Men's Wellness Centers. Msg frequency varies. Msg &amp; data
              rates may apply. Reply STOP to opt out or HELP for help.
              Consent is not required to receive services.{" "}
              <a
                href="/privacy-policy"
                style={{ color: "#1B2B4B" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            </span>
          </label>
          <FieldError msg={errors.tcpa} />
        </div>

        <button
          type="submit"
          disabled={submitting}
          style={{
            width: "100%",
            height: 56,
            background: submitting ? "#aaa" : "#E8670A",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            fontFamily: FONT_BODY,
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            cursor: submitting ? "default" : "pointer",
            transition: "background 0.15s, transform 0.1s",
            marginTop: 4,
          }}
          onMouseEnter={(e) => {
            if (!submitting) e.currentTarget.style.background = "#C95A20";
          }}
          onMouseLeave={(e) => {
            if (!submitting) e.currentTarget.style.background = "#E8670A";
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "scale(0.97)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {submitting ? "Submitting…" : "Claim My Free Consultation →"}
        </button>
      </form>

      {/* Trust row — above the fold in form */}
      <div
        style={{
          display: "flex",
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 18,
          paddingTop: 16,
          borderTop: "1px solid #EEEAE4",
          flexWrap: "wrap",
        }}
      >
        <img src="/images/badges/hipaa.png" alt="HIPAA Compliant" style={{ height: 42, opacity: 0.90 }} />
        <img src="/images/badges/clia.png" alt="CLIA Certified" style={{ height: 42, opacity: 0.90 }} />
        <img src="/images/badges/legitscript.png" alt="LegitScript Certified" style={{ height: 42, opacity: 0.90 }} />
      </div>
      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: 11,
          fontWeight: 600,
          color: "#54595F",
          textAlign: "center",
          marginTop: 8,
          letterSpacing: "0.04em",
        }}
      >
        HIPAA Compliant · CLIA Certified · LegitScript Verified
      </p>
      <p style={{ textAlign: "center", marginTop: 10 }}>
        <a
          href={PHONE_HREF}
          style={{
            fontFamily: FONT_BODY,
            fontSize: 14,
            fontWeight: 700,
            color: "#1B2B4B",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          📞 Call: {PHONE}
        </a>
      </p>
    </div>
  );
};

/* ─── URGENCY BANNER ───────────────────────────────────────── */

const UrgencyBanner = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 70,
      height: BANNER_H,
      background: "#E8670A",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
    }}
  >
    <span
      style={{
        fontFamily: FONT_BODY,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "#fff",
        whiteSpace: "nowrap",
      }}
    >
      ⚡ Same-Day Appointments — Limited This Week
    </span>
    <button
      onClick={smoothTo("form")}
      style={{
        fontFamily: FONT_BODY,
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        background: "#fff",
        color: "#E8670A",
        border: "none",
        borderRadius: 99,
        padding: "4px 12px",
        cursor: "pointer",
        flexShrink: 0,
      }}
      className="hidden sm:inline-flex items-center"
    >
      Book Now →
    </button>
  </div>
);

/* ─── HEADER ───────────────────────────────────────────────── */

const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookHovered, setBookHovered] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: BANNER_H,
        left: 0,
        right: 0,
        zIndex: 60,
        height: HEADER_H,
        background: scrolled ? "rgba(27,43,75,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid #E8670A" : "none",
        transition:
          "background 0.3s ease, backdrop-filter 0.3s ease, border-bottom 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 20px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img
          src="/logos/Text_Logo_white.png"
          alt="Men's Wellness Centers"
          style={{ height: 28, width: "auto" }}
        />

        {/* Desktop nav */}
        <div
          className="hidden md:flex"
          style={{ alignItems: "center", gap: 16 }}
        >
          <a
            href={PHONE_HREF}
            style={{
              fontFamily: FONT_BODY,
              fontSize: 13,
              fontWeight: 600,
              color: "rgba(255,255,255,0.80)",
              textDecoration: "none",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.80)")
            }
          >
            {PHONE}
          </a>
          <button
            onClick={smoothTo("form")}
            onMouseEnter={() => setBookHovered(true)}
            onMouseLeave={() => setBookHovered(false)}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "scale(0.97)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
            style={{
              fontFamily: FONT_BODY,
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              background: bookHovered ? "#C95A20" : "#E8670A",
              color: "#fff",
              border: "none",
              borderLeft: bookHovered
                ? "3px solid rgba(255,255,255,0.3)"
                : "3px solid transparent",
              borderRadius: 99,
              height: 42,
              padding: "0 22px",
              cursor: "pointer",
              transition:
                "background 0.15s, border-left 0.15s, transform 0.1s",
            }}
          >
            Book Now
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#fff",
            padding: 4,
          }}
        >
          {menuOpen ? <CloseIcon size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: HEADER_H,
            left: 0,
            right: 0,
            background: "rgba(27,43,75,0.99)",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            borderTop: "1px solid #D9DEF0",
          }}
        >
          <a
            href={PHONE_HREF}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: FONT_BODY,
              fontSize: 14,
              fontWeight: 600,
              color: "#fff",
              textDecoration: "none",
            }}
          >
            <Phone size={16} />
            {PHONE}
          </a>
          <button
            onClick={() => {
              setMenuOpen(false);
              smoothTo("form")();
            }}
            style={{
              fontFamily: FONT_BODY,
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              background: "#E8670A",
              color: "#fff",
              border: "none",
              borderRadius: 99,
              height: 46,
              cursor: "pointer",
              width: "100%",
            }}
          >
            Book My Consultation
          </button>
        </div>
      )}
    </header>
  );
};

/* ─── HERO ─────────────────────────────────────────────────── */

const Hero = () => (
  <section
    id="form"
    style={{
      position: "relative",
      minHeight: "100vh",
      paddingTop: TOTAL_OFFSET + 48,
      paddingBottom: 80,
      backgroundImage: `
        radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px),
        linear-gradient(135deg, rgba(27,43,75,0.92) 0%, rgba(27,43,75,0.75) 50%, rgba(27,43,75,0.60) 100%),
        url(${heroClinic})
      `,
      backgroundSize: "28px 28px, 100% 100%, cover",
      backgroundPosition: "0 0, 0 0, center 30%",
      backgroundAttachment: "scroll, scroll, fixed",
    }}
  >
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 20px",
      }}
    >
      <div
        className="grid grid-cols-1 lg:grid-cols-12"
        style={{ gap: 48, alignItems: "start" }}
      >
        {/* Left: headline + trust */}
        <div className="lg:col-span-7">
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.92)",
              border: "1px solid rgba(232,103,10,0.35)",
              borderRadius: 99,
              padding: "6px 14px",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#E8670A",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: FONT_BODY,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#C95A20",
              }}
            >
              Virginia's Premier Men's Health Clinic
            </span>
          </div>

          {/* H1 */}
          <h1
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: "clamp(52px, 7.5vw, 100px)",
              fontWeight: 800,
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: "#fff",
              margin: 0,
            }}
          >
            Testosterone
            <span style={{ display: "block", color: "#E8670A" }}>
              Done Right.
            </span>
          </h1>

          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: "clamp(15px, 1.6vw, 19px)",
              color: "rgba(255,255,255,0.90)",
              lineHeight: 1.65,
              marginTop: 20,
              maxWidth: 520,
            }}
          >
            In-person. Same-day labs. A real doctor who reads your results
            with you — not at you.
          </p>

          {/* Rating pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginTop: 22,
              padding: "10px 18px",
              borderRadius: 99,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            <div style={{ display: "flex", gap: 2 }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="#FFC107" stroke="#FFC107" />
              ))}
            </div>
            <span
              style={{
                fontFamily: FONT_BODY,
                fontSize: 14,
                fontWeight: 800,
                color: "#fff",
              }}
            >
              4.9
            </span>
            <span
              style={{
                fontFamily: FONT_BODY,
                fontSize: 12,
                color: "rgba(255,255,255,0.55)",
                fontWeight: 500,
              }}
            >
              200+ Google Reviews
            </span>
          </div>

          {/* Trust checklist */}
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "24px 0 0",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {TRUST_CHECKS.map((t) => (
              <li
                key={t}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: FONT_BODY,
                  fontSize: 15,
                  color: "rgba(255,255,255,0.90)",
                }}
              >
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "rgba(232,103,10,0.25)",
                    border: "1px solid rgba(232,103,10,0.50)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Check size={12} strokeWidth={3} color="#E8670A" />
                </span>
                {t}
              </li>
            ))}
          </ul>

          {/* Outcome pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 32,
            }}
          >
            {OUTCOMES.map((o) => (
              <button
                key={o.label}
                onClick={smoothTo("form")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: FONT_BODY,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#fff",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.13)",
                  borderRadius: 99,
                  height: 40,
                  padding: "0 16px",
                  cursor: "pointer",
                  transition: "border-color 0.15s, background 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#E8670A";
                  e.currentTarget.style.background =
                    "rgba(232,103,10,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(255,255,255,0.13)";
                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.07)";
                }}
              >
                {o.icon} {o.label}{" "}
                <ArrowRight size={12} style={{ opacity: 0.5 }} />
              </button>
            ))}
          </div>

          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 11,
              color: "rgba(255,255,255,0.65)",
              marginTop: 18,
            }}
          >
            Medically reviewed by licensed Virginia providers. Individual results vary.
          </p>
        </div>

        {/* Right: form card */}
        <div className="lg:col-span-5" style={{ position: "sticky", top: TOTAL_OFFSET + 16 }}>
          <LeadFormCard title="Book My Same-Day Visit" />
        </div>
      </div>
    </div>
  </section>
);

/* ─── PRESS BAR ────────────────────────────────────────────── */

const PressBar = () => (
  <section
    style={{
      background: "#FFFFFF",
      borderTop: "1px solid #E8E5E0",
      borderBottom: "1px solid #E8E5E0",
      padding: "20px 0",
    }}
  >
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        gap: 32,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontFamily: FONT_BODY,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(27,43,75,0.35)",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        Certified &amp; Compliant
      </span>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 32,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <img src="/images/badges/hipaa.png" alt="HIPAA Compliant" style={{ height: 32, opacity: 0.70 }} />
        <img src="/images/badges/clia.png" alt="CLIA Certified" style={{ height: 32, opacity: 0.70 }} />
        <img src="/images/badges/legitscript.png" alt="LegitScript Certified" style={{ height: 32, opacity: 0.70 }} />
        {[
          "Licensed in Virginia",
          "State-Licensed Practice",
          "Physician-Led Care",
        ].map((label) => (
          <span
            key={label}
            style={{
              fontFamily: FONT_BODY,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.04em",
              color: "rgba(27,43,75,0.50)",
              whiteSpace: "nowrap",
            }}
          >
            ✓ {label}
          </span>
        ))}
      </div>
    </div>
  </section>
);

/* ─── TRUST BAR ────────────────────────────────────────────── */

const TrustBar = () => (
  <section
    style={{
      background: "#1B2B4B",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
    }}
  >
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "56px 20px",
      }}
    >
      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.50)",
          textAlign: "center",
          marginBottom: 36,
        }}
      >
        Trusted by Virginia men since 2015
      </p>
      <div
        className="grid grid-cols-2 md:grid-cols-4"
        style={{ gap: "28px 16px", textAlign: "center" }}
      >
        {STATS.map((s) => (
          <div
            key={s.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "clamp(36px, 4.5vw, 54px)",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1,
                borderBottom: "3px solid #E8670A",
                paddingBottom: 6,
                display: "inline-block",
              }}
            >
              {s.value}
            </span>
            <span
              style={{
                fontFamily: FONT_BODY,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.13em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.48)",
              }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── MARQUEE ───────────────────────────────────────────────── */

const Marquee = () => {
  // Double the items for seamless loop
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div
      style={{
        background: "#E8670A",
        height: 40,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
      aria-hidden="true"
    >
      <div
        className="marquee-track"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          whiteSpace: "nowrap",
          willChange: "transform",
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: FONT_BODY,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#fff",
              padding: "0 28px",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ─── PROBLEM + HOW IT WORKS ───────────────────────────────── */

const ProblemSection = () => (
  <section
    id="symptoms"
    style={{ background: "#F5F3F0", padding: "96px 0" }}
  >
    <div
      className="grid grid-cols-1 md:grid-cols-2"
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 20px",
        gap: 64,
        alignItems: "start",
      }}
    >
      {/* Left: Problem agitation with image background */}
      <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", minHeight: 520 }}>
        {/* Full-height background image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${lobbyInnslake})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />
        {/* Dark gradient overlay — heavier at bottom so text is readable */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(27,43,75,0.55) 0%, rgba(27,43,75,0.92) 55%, rgba(27,43,75,0.98) 100%)",
          }}
        />
        {/* Content on top */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: "40px 32px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            minHeight: 520,
          }}
        >
          {eyebrow("Sound Familiar?")}
          <h2
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#fff",
              margin: "0 0 16px",
            }}
          >
            Tired of Feeling Like a Worse Version of Yourself?
          </h2>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 15,
              color: "rgba(255,255,255,0.78)",
              lineHeight: 1.7,
              marginBottom: 20,
            }}
          >
            You used to have energy. You used to have drive. Now you drag
            through the day, can't focus, can't sleep right, and the
            weight won't move no matter what you do. Your doctor says
            your labs are "normal." You know they're not.
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {SYMPTOMS.map((s) => (
              <li
                key={s}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  fontFamily: FONT_BODY,
                  fontSize: 14,
                  color: "rgba(255,255,255,0.88)",
                  lineHeight: 1.5,
                }}
              >
                <XCircle
                  size={16}
                  strokeWidth={2}
                  style={{ color: "#E8670A", flexShrink: 0, marginTop: 1 }}
                />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right: How it works */}
      <div>
        {eyebrow("The Fix")}
        {sectionHead("Here's How It Works in One Visit")}
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 15,
            color: "#54595F",
            lineHeight: 1.7,
            marginTop: 14,
          }}
        >
          No referrals. No waiting weeks. Book online, come in, leave
          with a plan.
        </p>

        <div
          style={{
            marginTop: 32,
            display: "flex",
            flexDirection: "column",
            gap: 0,
            borderLeft: "3px solid #E8670A",
            paddingLeft: 24,
          }}
        >
          {STEPS.map((s, idx) => (
            <div
              key={s.num}
              style={{
                paddingBottom: idx < STEPS.length - 1 ? 28 : 0,
              }}
            >
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: "#1B2B4B",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: FONT_DISPLAY,
                    fontSize: 13,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {s.num}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#1B2B4B",
                      margin: "0 0 4px",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: 14,
                      color: "#54595F",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div
          style={{
            marginTop: 32,
            background: "#1B2B4B",
            borderRadius: 14,
            padding: "20px 24px",
          }}
        >
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 12,
              fontWeight: 700,
              color: "#E8670A",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            What happens next?
          </p>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 14,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Most patients leave with a prescription the same day.
            Treatment starts at {PRICE}/month.
          </p>
        </div>

        <button
          onClick={smoothTo("form")}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginTop: 24,
            background: "#E8670A",
            color: "#fff",
            border: "none",
            borderRadius: 99,
            height: 54,
            padding: "0 30px",
            fontFamily: FONT_BODY,
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "background 0.15s, transform 0.1s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "#C95A20")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "#E8670A")
          }
        >
          Start Today — Book My Same-Day Visit{" "}
          <ArrowRight size={15} />
        </button>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 12,
            color: "#888",
            marginTop: 10,
          }}
        >
          📅 Appointments filling this week. Secure your slot.
        </p>
      </div>
    </div>
  </section>
);

/* ─── WHY US ────────────────────────────────────────────────── */

const WhyUs = () => (
  <section style={{ background: "#1B2B4B", padding: "96px 0" }}>
    <div
      className="grid grid-cols-1 md:grid-cols-2"
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 20px",
        gap: 64,
        alignItems: "center",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative" }}>
        <img
          src={providerPatient}
          alt="Face-to-face TRT consultation at Men's Wellness Centers Virginia"
          style={{
            borderRadius: 20,
            objectFit: "cover",
            width: "100%",
            aspectRatio: "4/3",
            display: "block",
            boxShadow:
              "0 20px 60px rgba(232,103,10,0.15), 0 4px 20px rgba(0,0,0,0.3)",
          }}
          loading="lazy"
        />
        {/* Credential badge overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            background: "#E8670A",
            borderRadius: 12,
            padding: "12px 20px",
          }}
        >
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.80)",
              margin: "0 0 2px",
            }}
          >
            Our Track Record
          </p>
          <p
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 16,
              fontWeight: 700,
              color: "#fff",
              margin: 0,
              letterSpacing: "0.02em",
            }}
          >
            10 YEARS · 10K+ PATIENTS · 4.9★
          </p>
        </div>
      </div>

      {/* Copy */}
      <div>
        {eyebrow("The MWC Difference")}
        {sectionHead(
          "Most Clinics Send You Home With a Lab Slip. We Don't.",
          "#fff"
        )}
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 15,
            color: "rgba(255,255,255,0.70)",
            lineHeight: 1.7,
            marginTop: 16,
          }}
        >
          On-site labs, a face-to-face consultation, and a personalized
          TRT protocol — all in one visit. Same provider, every
          follow-up. No app. No mail-order doctor. No middleman.
        </p>

        {/* Comparison rows */}
        <div
          style={{
            marginTop: 28,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {COMPARISONS.map((c) => (
            <div
              key={c.bad}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#FF8585",
                  background: "rgba(255,80,80,0.14)",
                  borderRadius: 99,
                  padding: "5px 12px",
                }}
              >
                ❌ {c.bad}
              </span>
              <ArrowRight
                size={13}
                style={{ color: "rgba(255,255,255,0.25)", flexShrink: 0 }}
              />
              <span
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#4DD884",
                  background: "rgba(46,204,113,0.14)",
                  borderRadius: 99,
                  padding: "5px 12px",
                }}
              >
                ✅ {c.good}
              </span>
            </div>
          ))}
        </div>

        {/* Mini stats row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px 36px",
            marginTop: 36,
            paddingTop: 28,
            borderTop: "1px solid #D9DEF0",
          }}
        >
          {[
            { num: "10,000+", label: "Men Treated" },
            { num: "Since 2015", label: "Serving Virginia" },
            { num: "4.9★", label: "Rating" },
            { num: "3", label: "VA Clinics" },
          ].map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: "clamp(20px, 2.5vw, 30px)",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1,
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.42)",
                  marginTop: 4,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ─── RESULTS ───────────────────────────────────────────────── */

const Results = () => (
  <section style={{ background: "#F5F3F0", padding: "96px 0" }}>
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 20px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        {eyebrow("Outcomes")}
        {sectionHead("Real Results From Real Patients", "#1B2B4B", "center")}
      </div>

      {/* Stat cards */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2"
        style={{ gap: 16, marginBottom: 24 }}
      >
        {RESULT_STATS.map((r) => (
          <div
            key={r.value}
            style={{
              background: "#FFFFFF",
              border: "1px solid #E8E5E0",
              borderLeft: "4px solid #E8670A",
              borderRadius: 20,
              padding: "40px 32px",
              textAlign: "left",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative large number bg */}
            <span
              style={{
                position: "absolute",
                top: -20,
                right: 20,
                fontFamily: FONT_DISPLAY,
                fontSize: 140,
                fontWeight: 900,
                color: "rgba(232,103,10,0.06)",
                lineHeight: 1,
                pointerEvents: "none",
                userSelect: "none",
              }}
              aria-hidden="true"
            >
              {r.value}
            </span>
            <div
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "clamp(56px, 8vw, 84px)",
                fontWeight: 800,
                color: "#E8670A",
                lineHeight: 1,
                position: "relative",
              }}
            >
              {r.value}
            </div>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 15,
                color: "#54595F",
                marginTop: 12,
                lineHeight: 1.5,
                position: "relative",
              }}
            >
              {r.label}
            </p>
          </div>
        ))}
      </div>

      {/* Lab photo strip */}
      <div
        style={{
          borderRadius: 16,
          overflow: "hidden",
          marginBottom: 24,
          position: "relative",
          height: 220,
        }}
      >
        <img
          src={trtLab}
          alt="On-site testosterone lab at Men's Wellness Centers"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
          loading="lazy"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(27,43,75,0.88) 0%, rgba(27,43,75,0.45) 60%, rgba(27,43,75,0.10) 100%)",
            display: "flex",
            alignItems: "center",
            padding: "0 40px",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#E8670A",
                marginBottom: 6,
              }}
            >
              On-Site Labs
            </p>
            <h3
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "clamp(20px, 2.5vw, 32px)",
                fontWeight: 700,
                color: "#fff",
                margin: 0,
              }}
            >
              Results Before You Leave.
              <br />
              Not Two Weeks Later.
            </h3>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div
        className="grid grid-cols-1 md:grid-cols-3"
        style={{ gap: 16, marginBottom: 32 }}
      >
        {TESTIMONIALS.map((t) => (
          <div
            key={t.name}
            style={{
              background: "#FFFFFF",
              border: "1px solid #E8E5E0",
              borderRadius: 20,
              padding: 28,
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative quote mark */}
            <span
              style={{
                position: "absolute",
                top: -20,
                left: 12,
                fontFamily: "Georgia, serif",
                fontSize: 130,
                lineHeight: 1,
                color: "rgba(27,43,75,0.05)",
                pointerEvents: "none",
                userSelect: "none",
              }}
              aria-hidden="true"
            >
              "
            </span>
            <div style={{ display: "flex", gap: 2, marginBottom: 16, position: "relative" }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="#FFC107" stroke="#FFC107" />
              ))}
            </div>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 14,
                color: "#1B2B4B",
                lineHeight: 1.7,
                flex: 1,
                position: "relative",
              }}
            >
              "{t.quote}"
            </p>
            <div
              style={{
                marginTop: 18,
                paddingTop: 16,
                borderTop: "1px solid #F0EDE8",
              }}
            >
              <div
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#1B2B4B",
                }}
              >
                {t.name}
              </div>
              <div
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 11,
                  color: "#888",
                  marginTop: 2,
                }}
              >
                {t.city}
              </div>
              <span
                style={{
                  display: "inline-block",
                  marginTop: 10,
                  fontFamily: FONT_BODY,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  background: "rgba(46,204,113,0.14)",
                  color: "#4DD884",
                  borderRadius: 4,
                  padding: "3px 8px",
                }}
              >
                ✓ Verified Review
              </span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <a
          href="https://www.google.com/search?q=Men%27s+Wellness+Centers+Virginia+reviews"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: FONT_BODY,
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            color: "#1B2B4B",
            background: "rgba(27,43,75,0.06)",
            border: "1px solid rgba(27,43,75,0.15)",
            borderRadius: 99,
            padding: "12px 24px",
            textDecoration: "none",
            transition: "background 0.15s, border-color 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(232,103,10,0.10)";
            e.currentTarget.style.borderColor = "rgba(232,103,10,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(27,43,75,0.06)";
            e.currentTarget.style.borderColor = "rgba(27,43,75,0.15)";
          }}
        >
          <Star size={14} fill="#FFC107" stroke="#FFC107" />
          Read All 200+ Google Reviews →
        </a>
      </div>

      {/* Outcome micro-CTAs */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "center",
        }}
      >
        {[
          "Want more energy →",
          "Want to lose fat →",
          "Want better focus →",
          "All of the above →",
        ].map((label) => (
          <button
            key={label}
            onClick={smoothTo("form")}
            style={{
              fontFamily: FONT_BODY,
              fontSize: 13,
              fontWeight: 600,
              color: "#fff",
              background: "#1B2B4B",
              border: "1px solid rgba(255,255,255,0.22)",
              borderRadius: 99,
              height: 42,
              padding: "0 20px",
              cursor: "pointer",
              transition: "border-color 0.15s, background 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#E8670A";
              e.currentTarget.style.background = "#253560";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
              e.currentTarget.style.background = "#1B2B4B";
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  </section>
);

/* ─── DOCTOR SECTION ────────────────────────────────────────── */

const DoctorSection = () => (
  <section style={{ background: "#F5F3F0", padding: "96px 0" }}>
    <div
      className="grid grid-cols-1 md:grid-cols-2"
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 20px",
        gap: 64,
        alignItems: "center",
      }}
    >
      {/* Left: headshot */}
      <div
        className="order-2 md:order-1"
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <div style={{ position: "relative", display: "inline-block" }}>
          <img
            src={drPapariello}
            alt="Dr. Steven Papariello, Medical Director at Men's Wellness Centers"
            style={{
              width: "min(320px, 100%)",
              aspectRatio: "3/4",
              objectFit: "cover",
              objectPosition: "top",
              borderRadius: 20,
              display: "block",
              boxShadow: "0 20px 60px rgba(27,43,75,0.15), 0 4px 20px rgba(0,0,0,0.10)",
            }}
            loading="lazy"
          />
          {/* Orange accent border */}
          <div
            style={{
              position: "absolute",
              bottom: -6,
              left: -6,
              right: 24,
              height: 6,
              background: "#E8670A",
              borderRadius: 99,
            }}
          />
        </div>
        {/* Credential badge */}
        <div
          style={{
            marginTop: 20,
            background: "#1B2B4B",
            borderRadius: 12,
            padding: "14px 24px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 16,
              fontWeight: 700,
              color: "#fff",
              margin: "0 0 4px",
              letterSpacing: "0.02em",
            }}
          >
            Steven Papariello, MD
          </p>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#E8670A",
              margin: 0,
            }}
          >
            Medical Director
          </p>
        </div>
      </div>

      {/* Right: copy */}
      <div className="order-1 md:order-2">
        {eyebrow("Physician-Led Care")}
        <h2
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: "clamp(26px, 3.5vw, 44px)",
            fontWeight: 700,
            lineHeight: 1.06,
            color: "#1B2B4B",
            margin: "0 0 18px",
          }}
        >
          You'll See a Real Doctor.
          <br />
          <span style={{ color: "#E8670A" }}>Not a PA on a Screen.</span>
        </h2>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 16,
            color: "#54595F",
            lineHeight: 1.75,
          }}
        >
          Every care plan at MWC is overseen by Dr. Steven Papariello,
          MD — our Medical Director and a specialist in men's hormone
          health. Your first visit is face-to-face. Your follow-ups are
          face-to-face. Your questions get real answers.
        </p>

        {/* Credential chips */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginTop: 28,
          }}
        >
          {[
            "Board-Reviewed Protocols",
            "Licensed in Virginia",
            "10+ Years Men's Health",
          ].map((chip) => (
            <span
              key={chip}
              style={{
                fontFamily: FONT_BODY,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.05em",
                color: "#1B2B4B",
                background: "transparent",
                border: "1.5px solid rgba(27,43,75,0.28)",
                borderRadius: 99,
                padding: "7px 16px",
              }}
            >
              ✓ {chip}
            </span>
          ))}
        </div>

        <button
          onClick={smoothTo("form")}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginTop: 32,
            background: "#E8670A",
            color: "#fff",
            border: "none",
            borderRadius: 99,
            height: 54,
            padding: "0 30px",
            fontFamily: FONT_BODY,
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "background 0.15s, transform 0.1s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "#C95A20")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "#E8670A")
          }
        >
          Book With Our Team <ArrowRight size={15} />
        </button>
      </div>
    </div>
  </section>
);

/* ─── PRICING ───────────────────────────────────────────────── */

const Pricing = () => (
  <section
    style={{
      background: "#1B2B4B",
      padding: "96px 0",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Diagonal lines texture overlay */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='20' x2='20' y2='0' stroke='rgba(255,255,255,0.06)' stroke-width='1'/%3E%3C/svg%3E")`,
        backgroundSize: "20px 20px",
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />

    <div
      className="grid grid-cols-1 md:grid-cols-2"
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 20px",
        gap: 64,
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Copy */}
      <div className="order-2 md:order-1">
        <h2
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: "clamp(30px, 3.8vw, 50px)",
            fontWeight: 800,
            lineHeight: 1.0,
            color: "#fff",
            margin: "0 0 16px",
          }}
        >
          Walk In Today.
          <br />
          Walk Out With a Plan.
        </h2>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 15,
            color: "rgba(255,255,255,0.80)",
            lineHeight: 1.65,
          }}
        >
          No commitment. No credit card to book. Walk into any of our 3
          Virginia centers for a same-day consultation.
        </p>

        {/* What's included checklist */}
        <div style={{ marginTop: 24 }}>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.70)",
              marginBottom: 14,
            }}
          >
            What's Included
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {[
              "On-site testosterone panel — results same visit",
              "Face-to-face physician consultation",
              "Personalized protocol built around your labs",
              "Ongoing monitoring & protocol adjustments",
              "FSA / HSA accepted · No contract · Cancel anytime",
            ].map((item) => (
              <li
                key={item}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  fontFamily: FONT_BODY,
                  fontSize: 14,
                  color: "#fff",
                  lineHeight: 1.5,
                }}
              >
                {/* Green checkmark circle */}
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.20)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  <Check size={12} strokeWidth={3} color="#fff" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={smoothTo("form")}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginTop: 32,
            background: "#E8670A",
            color: "#fff",
            border: "none",
            borderRadius: 99,
            height: 56,
            padding: "0 32px",
            fontFamily: FONT_BODY,
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "background 0.15s, transform 0.1s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "#C95A20")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "#E8670A")
          }
        >
          Book My Consultation <ArrowRight size={15} />
        </button>

        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 13,
            color: "rgba(255,255,255,0.72)",
            marginTop: 14,
          }}
        >
          Starting at {PRICE} after approval · FSA/HSA accepted
        </p>
      </div>

      {/* Image */}
      <div className="order-1 md:order-2">
        <img
          src={firstVisitBloodwork}
          alt="On-site testosterone blood panel at Men's Wellness Centers"
          style={{
            borderRadius: 20,
            objectFit: "cover",
            width: "100%",
            aspectRatio: "4/3",
            display: "block",
            boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
          }}
          loading="lazy"
        />
      </div>
    </div>
  </section>
);

/* ─── PILLARS ───────────────────────────────────────────────── */

const PillarCard = ({
  Icon,
  title,
  desc,
}: {
  Icon: React.ComponentType<any>;
  title: string;
  desc: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      style={{
        background: "#FFFFFF",
        border: "1px solid #E8E5E0",
        borderRadius: 16,
        padding: "28px 20px 24px",
        textAlign: "center",
        transition: "border-color 0.2s ease, background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "default",
      }}
      onMouseEnter={() => {
        if (ref.current) {
          ref.current.style.borderColor = "#E8670A";
          ref.current.style.background = "#FFFAF7";
          ref.current.style.transform = "translateY(-4px)";
          ref.current.style.boxShadow = "0 12px 32px rgba(232,103,10,0.12)";
        }
      }}
      onMouseLeave={() => {
        if (ref.current) {
          ref.current.style.borderColor = "#D9DEF0";
          ref.current.style.background = "#FFFFFF";
          ref.current.style.transform = "translateY(0)";
          ref.current.style.boxShadow = "none";
        }
      }}
    >
      <div
        style={{
          width: 76,
          height: 76,
          borderRadius: "50%",
          background: "#EAE6E0",
          border: "1px solid #D8D3CC",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 16px",
        }}
      >
        <Icon size={34} strokeWidth={1.5} color="#E8670A" />
      </div>
      <h3
        style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color: "#1B2B4B",
          margin: "0 0 8px",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: 13,
          color: "#54595F",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {desc}
      </p>
    </div>
  );
};

const Pillars = () => (
  <section style={{ background: "#F5F3F0", padding: "96px 0" }}>
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 20px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        {eyebrow("Why MWC")}
        <h2
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: "clamp(24px, 3.2vw, 40px)",
            fontWeight: 700,
            lineHeight: 1.1,
            color: "#1B2B4B",
          }}
        >
          Why 10,000+ Men Choose MWC Over Everyone Else
        </h2>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        style={{ gap: 16 }}
      >
        {PILLARS.map((p) => (
          <PillarCard key={p.title} {...p} />
        ))}
      </div>
    </div>
  </section>
);

/* ─── TEAM SECTION ──────────────────────────────────────────── */

const TeamSection = () => (
  <section style={{ background: "#1B2B4B", padding: "96px 0" }}>
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 20px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        {eyebrow("Our Team")}
        <h2
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: "clamp(26px, 3.5vw, 44px)",
            fontWeight: 700,
            lineHeight: 1.08,
            color: "#fff",
          }}
        >
          The People Behind Your Care
        </h2>
      </div>

      {/* Full-bleed team photo */}
      <div
        style={{
          borderRadius: 20,
          overflow: "hidden",
          maxHeight: 400,
        }}
      >
        <img
          src={mwcTeamNew}
          alt="Men's Wellness Centers team of licensed Virginia providers"
          style={{
            width: "100%",
            height: 400,
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
          }}
          loading="lazy"
        />
      </div>

      {/* Copy + CTA below photo */}
      <div
        style={{
          textAlign: "center",
          marginTop: 36,
          maxWidth: 680,
          margin: "36px auto 0",
        }}
      >
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 16,
            color: "rgba(255,255,255,0.72)",
            lineHeight: 1.75,
          }}
        >
          Men's Wellness Centers is staffed by licensed Virginia providers
          who specialize exclusively in men's health. Same provider every
          visit. No revolving door.
        </p>
        <a
          href="/providers"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginTop: 28,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.16)",
            color: "#fff",
            borderRadius: 99,
            height: 52,
            padding: "0 28px",
            fontFamily: FONT_BODY,
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "background 0.15s, border-color 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(232,103,10,0.18)";
            e.currentTarget.style.borderColor = "rgba(232,103,10,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)";
          }}
        >
          Meet Our Team <ArrowRight size={14} />
        </a>
      </div>
    </div>
  </section>
);

/* ─── LOCATIONS ─────────────────────────────────────────────── */

const Locations = () => (
  <section
    id="locations"
    style={{ background: "#FFFFFF", padding: "96px 0" }}
  >
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 20px",
      }}
    >
      {/* Section header with lobby photo */}
      <div
        style={{
          borderRadius: 16,
          overflow: "hidden",
          position: "relative",
          marginBottom: 48,
          height: 200,
        }}
      >
        <img
          src={lobbyInterior}
          alt="Men's Wellness Centers clinic lobby"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
          loading="lazy"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(5,6,30,0.90) 0%, rgba(5,6,30,0.55) 60%, rgba(5,6,30,0.20) 100%)",
            display: "flex",
            alignItems: "center",
            padding: "0 40px",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#E8670A",
                marginBottom: 8,
              }}
            >
              3 Virginia Locations
            </p>
            <h2
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "clamp(22px, 3vw, 38px)",
                fontWeight: 700,
                color: "#fff",
                margin: 0,
              }}
            >
              Same-Day Appointments at Every Clinic
            </h2>
          </div>
        </div>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-3"
        style={{ gap: 16 }}
      >
        {LOCATIONS.map((l) => (
          <div
            key={l.name}
            style={{
              background: "#FFFFFF",
              border: "1px solid #E8E5E0",
              borderRadius: 20,
              padding: 28,
              display: "flex",
              flexDirection: "column",
              transition: "border-color 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#E8670A";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#D9DEF0";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
              }}
            >
              <MapPin size={16} style={{ color: "#E8670A", flexShrink: 0 }} />
              <h3
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 20,
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  color: "#1B2B4B",
                  margin: 0,
                }}
              >
                {l.name}
              </h3>
            </div>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 14,
                color: "#54595F",
                lineHeight: 1.65,
                whiteSpace: "pre-line",
                flex: 1,
              }}
            >
              {l.address}
            </p>
            <a
              href={`tel:${l.phone}`}
              style={{
                display: "block",
                fontFamily: FONT_BODY,
                fontSize: 14,
                fontWeight: 700,
                color: "#1B2B4B",
                textDecoration: "none",
                marginTop: 12,
              }}
            >
              {l.phone}
            </a>
            <div
              style={{
                display: "inline-block",
                marginTop: 10,
                fontFamily: FONT_BODY,
                fontSize: 11,
                fontWeight: 700,
                background: "rgba(46,180,80,0.12)",
                color: "#1B7A3A",
                borderRadius: 99,
                padding: "4px 12px",
                alignSelf: "flex-start",
              }}
            >
              ● Same-Day Available
            </div>
            <button
              onClick={smoothTo("form")}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
              style={{
                marginTop: 20,
                background: "#E8670A",
                color: "#fff",
                border: "none",
                borderRadius: 99,
                height: 46,
                width: "100%",
                fontFamily: FONT_BODY,
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "background 0.15s, transform 0.1s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#C95A20")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#E8670A")
              }
            >
              Book at {l.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── FAQ ───────────────────────────────────────────────────── */

const FAQItem = ({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) => (
  <div
    style={{
      border: "1px solid rgba(255,255,255,0.10)",
      borderRadius: 12,
      overflow: "hidden",
    }}
  >
    <button
      onClick={onToggle}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 22px",
        background: open
          ? "rgba(255,255,255,0.07)"
          : "rgba(255,255,255,0.03)",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        transition: "background 0.15s",
      }}
    >
      <span
        style={{
          fontFamily: FONT_BODY,
          fontSize: 14,
          fontWeight: 600,
          color: "#fff",
          paddingRight: 16,
        }}
      >
        {q}
      </span>
      <ChevronDown
        size={16}
        style={{
          color: "rgba(255,255,255,0.45)",
          flexShrink: 0,
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease",
        }}
      />
    </button>
    {open && (
      <div style={{ padding: "0 22px 20px" }}>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 14,
            color: "rgba(255,255,255,0.68)",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {a}
        </p>
      </div>
    )}
  </div>
);

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section style={{ background: "#1B2B4B", padding: "96px 0" }}>
      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          {eyebrow("FAQ")}
          <h2
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: "clamp(24px, 3vw, 38px)",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            Common Questions
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAQS.map((f, i) => (
            <FAQItem
              key={f.q}
              q={f.q}
              a={f.a}
              open={openIdx === i}
              onToggle={() =>
                setOpenIdx(openIdx === i ? null : i)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── BOTTOM CTA + FALLBACK FORM ────────────────────────────── */

const BottomCTA = () => (
  <section
    style={{
      background: "#1B2B4B",
      padding: "96px 0",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Decorative confident man image — far right, faded */}
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        width: "40%",
        backgroundImage: `url(${lobbyAtrium})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        maskImage:
          "linear-gradient(to left, rgba(0,0,0,0.35) 0%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to left, rgba(0,0,0,0.35) 0%, transparent 100%)",
      }}
      aria-hidden="true"
    />
    <div
      style={{
        position: "relative",
        zIndex: 2,
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 20px",
      }}
    >
      {/* Big CTA */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <h2
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: "clamp(36px, 5vw, 68px)",
            fontWeight: 800,
            lineHeight: 1.0,
            color: "#fff",
            letterSpacing: "-0.02em",
          }}
        >
          Ready When You Are.
        </h2>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 18,
            color: "rgba(255,255,255,0.70)",
            marginTop: 14,
            lineHeight: 1.65,
            maxWidth: 520,
            margin: "14px auto 0",
          }}
        >
          Same-day appointments. No commitment. Walk in and get tested.
        </p>

        {/* 2 big CTA buttons */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            justifyContent: "center",
            marginTop: 36,
          }}
        >
          <button
            onClick={smoothTo("form")}
            onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#E8670A",
              color: "#fff",
              border: "none",
              borderRadius: 99,
              height: 60,
              padding: "0 36px",
              fontFamily: FONT_BODY,
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "background 0.15s, transform 0.1s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#C95A20")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "#E8670A")
            }
          >
            Book My Consultation <ArrowRight size={16} />
          </button>
          <a
            href={PHONE_HREF}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.18)",
              color: "#fff",
              borderRadius: 99,
              height: 60,
              padding: "0 36px",
              fontFamily: FONT_BODY,
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.14)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
            }
          >
            <Phone size={16} /> Call 866-344-4955
          </a>
        </div>

        {/* Trust badge row */}
        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 28,
          }}
        >
          <img
            src="/images/badges/hipaa.png"
            alt="HIPAA Compliant"
            style={{ height: 38, opacity: 0.88 }}
          />
          <img
            src="/images/badges/clia.png"
            alt="CLIA Certified"
            style={{ height: 38, opacity: 0.88 }}
          />
          <img
            src="/images/badges/legitscript.png"
            alt="LegitScript Certified"
            style={{ height: 38, opacity: 0.88 }}
          />
        </div>
      </div>

      {/* Full form fallback — for SEO + users who scroll */}
      <div style={{ maxWidth: 460, margin: "0 auto" }}>
        <LeadFormCard title="Claim Your Free Consultation" />
      </div>
    </div>
  </section>
);

/* ─── FOOTER ────────────────────────────────────────────────── */

const SiteFooter = () => (
  <footer
    style={{
      background: "#1B2B4B",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "36px 20px",
    }}
  >
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        alignItems: "center",
        textAlign: "center",
      }}
      className="md:flex-row md:justify-between md:text-left"
    >
      <img
        src="/logos/Text_Logo_white.png"
        alt="Men's Wellness Centers"
        style={{ height: 24, opacity: 0.70 }}
      />
      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: 11,
          color: "rgba(255,255,255,0.50)",
          maxWidth: 500,
          lineHeight: 1.65,
        }}
      >
        © 2026 Men's Wellness Centers. Individual results vary.
        Testimonials do not guarantee outcomes. Not a substitute for
        medical advice. *Based on internal patient data; results may
        vary.
      </p>
      <div
        style={{
          display: "flex",
          gap: 20,
          fontFamily: FONT_BODY,
          fontSize: 12,
          color: "rgba(255,255,255,0.36)",
        }}
      >
        <a
          href="/privacy-policy"
          style={{ color: "inherit", textDecoration: "none" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.70)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.36)")
          }
        >
          Privacy
        </a>
        <a
          href="/terms-of-service"
          style={{ color: "inherit", textDecoration: "none" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.70)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.36)")
          }
        >
          Terms
        </a>
        <a
          href={PHONE_HREF}
          style={{ color: "inherit", textDecoration: "none" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.70)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.36)")
          }
        >
          {PHONE}
        </a>
      </div>
    </div>
  </footer>
);

/* ─── MOBILE STICKY CTA ─────────────────────────────────────── */

const MobileCTA = () => (
  <div
    className="md:hidden"
    style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 65,
      display: "flex",
      gap: 10,
      padding: "10px 14px",
      background: "#1B2B4B",
      borderTop: "1px solid rgba(255,255,255,0.09)",
    }}
  >
    <a
      href={PHONE_HREF}
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        background: "rgba(255,255,255,0.09)",
        border: "1px solid rgba(255,255,255,0.14)",
        borderRadius: 99,
        height: 48,
        fontFamily: FONT_BODY,
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "#fff",
        textDecoration: "none",
      }}
    >
      <Phone size={15} /> Call
    </a>
    <button
      onClick={smoothTo("form")}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      style={{
        flex: 2.5,
        background: "#E8670A",
        border: "none",
        borderRadius: 99,
        height: 48,
        fontFamily: FONT_BODY,
        fontSize: 13,
        fontWeight: 800,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "#fff",
        cursor: "pointer",
        transition: "transform 0.1s",
      }}
    >
      Book My Consultation
    </button>
  </div>
);

/* ─── PAGE ROOT ─────────────────────────────────────────────── */

const TRTv3LandingPage = () => {
  useEffect(() => {
    document.title =
      "Physician-Led TRT in Virginia | Men's Wellness Centers";

    const setMeta = (
      selector: string,
      attr: string,
      value: string
    ) => {
      let el = document.querySelector(
        selector
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        const isProperty = selector.includes("property=");
        const key = (selector.match(/"([^"]+)"/) ?? [])[1] ?? "";
        if (isProperty) el.setAttribute("property", key);
        else el.setAttribute("name", key);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    setMeta(
      'meta[name="description"]',
      "content",
      "Same-day testosterone replacement therapy at 3 Virginia clinics. On-site labs, face-to-face physician consultation, and a personalized plan — all in one visit."
    );
    setMeta(
      'meta[property="og:title"]',
      "content",
      "Physician-Led TRT in Virginia | Men's Wellness Centers"
    );
    setMeta('meta[property="og:type"]', "content", "website");
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: FONT_BODY,
      }}
    >
      <MarqueeStyles />
      <UrgencyBanner />
      <SiteHeader />
      <main style={{ flex: 1 }}>
        <Hero />
        <PressBar />
        <TrustBar />
        <Marquee />
        <ProblemSection />
        <OrangeDivider />
        <WhyUs />
        <OrangeDivider />
        <Results />
        <OrangeDivider />
        <DoctorSection />
        <OrangeDivider />
        <Pricing />
        <OrangeDivider />
        <Pillars />
        <OrangeDivider />
        <TeamSection />
        <Locations />
        <FAQSection />
        <BottomCTA />
      </main>
      <SiteFooter />
      <MobileCTA />
    </div>
  );
};

export default TRTv3LandingPage;