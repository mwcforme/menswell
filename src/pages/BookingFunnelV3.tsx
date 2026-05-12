import { useState } from "react";
import { BatteryLow, HeartCrack, TrendingDown, HelpCircle, Syringe, Pill, Apple, Stethoscope, Check, ArrowRight, Phone, MessageSquare, ArrowLeft, Mail, Send, CheckCircle2 } from "lucide-react";
import V2Header from "@/components/booking-v2/V2Header";

const font = "'Montserrat', sans-serif";
const headingFont = "'Bebas Neue', sans-serif";

const concerns = [
  { value: "low-energy", label: "Low energy / fatigue", icon: BatteryLow },
  { value: "low-sex-drive", label: "Low sex drive / ED", icon: HeartCrack },
  { value: "weight-gain", label: "Weight gain / difficulty losing weight", icon: TrendingDown },
  { value: "other", label: "Other", icon: HelpCircle },
];

const services = [
  { value: "trt", label: "Testosterone Replacement Therapy", icon: Syringe },
  { value: "ed", label: "Erectile Dysfunction", icon: Pill },
  { value: "weight-loss", label: "Weight Loss", icon: Apple },
  { value: "other", label: "Other", icon: Stethoscope },
];

type Screen = "concern" | "service" | "calendar" | "contact";

const PHONE = "(866) 344-4955";
const PHONE_HREF = "tel:8663444955";
const SMS_HREF = "sms:8663444955";

const Card = ({
  options, selected, onSelect, title, subtitle,
}: {
  options: typeof concerns;
  selected: string;
  onSelect: (v: string) => void;
  title: string;
  subtitle: string;
}) => (
  <div className="flex flex-col items-center px-5 pt-6 md:pt-10">
    <div className="mb-6 text-center">
      <h1 className="mb-2 uppercase" style={{ fontFamily: headingFont, fontSize: "clamp(28px,6vw,42px)", color: "#fff", letterSpacing: "0.05em", lineHeight: 1.1 }}>
        Your Consultation Is Waiting
      </h1>
      <p style={{ fontFamily: font, fontSize: 15, color: "#B8B6B2" }}>
        Licensed physician. No obligation. No pressure.
      </p>
    </div>

    <div className="w-full max-w-[480px] p-6 md:p-8" style={{ backgroundColor: "#FFFFFF", borderRadius: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
      <h2 className="mb-2 text-center uppercase" style={{ fontFamily: headingFont, fontSize: "clamp(22px,5vw,32px)", color: "#0B1029", letterSpacing: "0.05em", lineHeight: 1.1 }}>
        {title}
      </h2>
      <p className="mb-6 text-center" style={{ fontFamily: font, fontSize: 14, color: "#6B7280" }}>{subtitle}</p>

      <div className="space-y-3">
        {options.map((o) => {
          const isSelected = selected === o.value;
          const Icon = o.icon;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onSelect(o.value)}
              className="flex w-full items-center gap-4 px-5 transition-all"
              style={{
                minHeight: 56,
                fontFamily: font, fontWeight: isSelected ? 700 : 600, fontSize: 15,
                color: "#0B1029",
                backgroundColor: isSelected ? "rgba(232,103,10,0.06)" : "#FFFFFF",
                border: isSelected ? "2px solid #E8670A" : "2px solid #D1CCC5",
                borderRadius: 12, cursor: "pointer",
                boxShadow: isSelected ? "0 0 0 3px rgba(232,103,10,0.1)" : "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              <Icon className="h-5 w-5 shrink-0" style={{ color: "#E8670A" }} />
              <span className="flex-1 text-left">{o.label}</span>
              {isSelected && <Check className="h-[18px] w-[18px] shrink-0" style={{ color: "#E8670A" }} />}
            </button>
          );
        })}
      </div>
    </div>
  </div>
);

const CONTACT_EMAIL = "hello@menswellnesscenters.com";

const ContactScreen = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const canSend = name.trim() && contact.trim() && message.trim();

  const handleSend = () => {
    if (!canSend) return;
    const subject = encodeURIComponent(`New contact request from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nPhone/Email: ${contact}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", height: 52, borderRadius: 10, backgroundColor: "#F5F3F0",
    border: "1px solid #D1CCC5", color: "#0B1029", padding: "12px 16px",
    fontSize: 16, outline: "none", fontFamily: font, fontWeight: 400,
  };

  return (
    <div className="flex flex-col items-center px-5 pt-6 md:pt-10">
      <div className="w-full max-w-[480px] p-6 md:p-8" style={{ backgroundColor: "#FFFFFF", borderRadius: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
        <h1 className="mb-3 text-center uppercase" style={{ fontFamily: headingFont, fontSize: "clamp(26px,5.5vw,38px)", color: "#0B1029", letterSpacing: "0.05em", lineHeight: 1.1 }}>
          Let's Talk First
        </h1>
        <p className="mb-6 text-center" style={{ fontFamily: font, fontSize: 15, color: "#4B5563", lineHeight: 1.55 }}>
          Our contact center can match you with the right provider. Reach us whichever way works best.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <a href={PHONE_HREF} className="flex flex-col items-center justify-center gap-1 transition-all"
            style={{ minHeight: 80, borderRadius: 12, backgroundColor: "#E8670A", color: "#fff",
              fontFamily: font, fontWeight: 700, fontSize: 13, textDecoration: "none", padding: 12 }}>
            <Phone className="h-5 w-5" />
            <span className="uppercase" style={{ letterSpacing: "0.08em" }}>Call</span>
            <span style={{ fontWeight: 500, fontSize: 12, opacity: 0.9 }}>{PHONE}</span>
          </a>
          <a href={SMS_HREF} className="flex flex-col items-center justify-center gap-1 transition-all"
            style={{ minHeight: 80, borderRadius: 12, backgroundColor: "#FFFFFF", color: "#0B1029",
              border: "2px solid #0B1029",
              fontFamily: font, fontWeight: 700, fontSize: 13, textDecoration: "none", padding: 12 }}>
            <MessageSquare className="h-5 w-5" />
            <span className="uppercase" style={{ letterSpacing: "0.08em" }}>Text</span>
            <span style={{ fontWeight: 500, fontSize: 12, opacity: 0.7 }}>{PHONE}</span>
          </a>
        </div>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1" style={{ backgroundColor: "#E5E7EB" }} />
          <span style={{ fontFamily: font, fontSize: 12, color: "#9CA3AF", letterSpacing: "0.1em" }} className="uppercase">
            Or send a message
          </span>
          <div className="h-px flex-1" style={{ backgroundColor: "#E5E7EB" }} />
        </div>

        {sent ? (
          <div className="rounded-xl p-5 text-center" style={{ backgroundColor: "#F5F3F0", border: "1px solid #D1CCC5" }}>
            <CheckCircle2 className="mx-auto mb-2 h-8 w-8" style={{ color: "#E8670A" }} />
            <p style={{ fontFamily: font, fontWeight: 600, fontSize: 16, color: "#0B1029" }}>
              Message ready to send
            </p>
            <p className="mt-1" style={{ fontFamily: font, fontSize: 14, color: "#6B7280" }}>
              We'll respond within 1 business day.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <input type="text" placeholder="Your name" value={name}
              onChange={(e) => setName(e.target.value)} style={inputStyle} aria-label="Your name" />
            <input type="text" placeholder="Phone or email" value={contact}
              onChange={(e) => setContact(e.target.value)} style={inputStyle} aria-label="Phone or email" />
            <textarea placeholder="How can we help?" value={message}
              onChange={(e) => setMessage(e.target.value)} rows={4}
              style={{ ...inputStyle, height: "auto", minHeight: 110, paddingTop: 12, resize: "vertical" }}
              aria-label="Message" />
            <button type="button" onClick={handleSend} disabled={!canSend}
              className="flex w-full items-center justify-center gap-2 uppercase transition-all"
              style={{ height: 52, borderRadius: 12,
                backgroundColor: canSend ? "#0B1029" : "#D1CCC5", color: "#fff",
                fontFamily: font, fontWeight: 700, fontSize: 14, letterSpacing: "0.1em",
                cursor: canSend ? "pointer" : "default", border: "none",
                opacity: canSend ? 1 : 0.6 }}>
              <Send className="h-4 w-4" /> Send Message
            </button>
            <p className="flex items-center justify-center gap-1.5 pt-1"
              style={{ fontFamily: font, fontSize: 12, color: "#9CA3AF" }}>
              <Mail className="h-3 w-3" /> Or email {CONTACT_EMAIL}
            </p>
          </div>
        )}

        <p className="mt-6 text-center" style={{ fontFamily: font, fontSize: 13, color: "#9CA3AF" }}>
          Mon–Fri · 8am–8pm ET · Confidential
        </p>
      </div>
    </div>
  );
};

const CalendarPlaceholder = ({ concern, service }: { concern: string; service: string }) => (
  <div className="flex flex-col items-center px-5 pt-6 md:pt-10">
    <div className="w-full max-w-[480px] p-6 md:p-8" style={{ backgroundColor: "#FFFFFF", borderRadius: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
      <h1 className="mb-2 text-center uppercase" style={{ fontFamily: headingFont, fontSize: "clamp(24px,5.5vw,36px)", color: "#0B1029", letterSpacing: "0.05em" }}>
        Pick My Time
      </h1>
      <p className="mb-6 text-center" style={{ fontFamily: font, fontSize: 14, color: "#6B7280" }}>
        Calendar widget will load here.
      </p>
      <div className="rounded-xl p-4" style={{ backgroundColor: "#F5F3F0", border: "1px solid #D1CCC5", fontFamily: font, fontSize: 14, color: "#4B5563" }}>
        <p><strong>Concern:</strong> {concerns.find(c => c.value === concern)?.label}</p>
        <p><strong>Service:</strong> {services.find(s => s.value === service)?.label}</p>
      </div>
    </div>
  </div>
);

const BookingFunnelV3 = () => {
  const [screen, setScreen] = useState<Screen>("concern");
  const [concern, setConcern] = useState("");
  const [service, setService] = useState("");

  const handleConcern = (v: string) => {
    setConcern(v);
    setTimeout(() => {
      if (v === "other") setScreen("contact");
      else setScreen("service");
    }, 250);
  };

  const handleService = (v: string) => {
    setService(v);
    setTimeout(() => {
      if (v === "other") setScreen("contact");
      else setScreen("calendar");
    }, 250);
  };

  const goBack = () => {
    if (screen === "service") setScreen("concern");
    else if (screen === "calendar") setScreen("service");
    else if (screen === "contact") {
      // back to whichever question triggered it
      if (service === "other") { setService(""); setScreen("service"); }
      else { setConcern(""); setScreen("concern"); }
    }
  };

  return (
    <div className="bookv2-funnel flex min-h-screen flex-col" style={{ backgroundColor: "#0B1029" }}>
      <V2Header />
      <main className="flex flex-1 flex-col">
        {screen !== "concern" && (
          <div className="mx-auto w-full max-w-lg px-5 pt-3">
            <button type="button" onClick={goBack}
              className="flex items-center gap-1"
              style={{ fontFamily: font, fontWeight: 500, fontSize: 14, color: "#B8B6B2", background: "none", border: "none", cursor: "pointer" }}>
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          </div>
        )}

        {screen === "concern" && (
          <Card options={concerns} selected={concern} onSelect={handleConcern}
            title="What Brings You In?" subtitle="Select your primary concern." />
        )}
        {screen === "service" && (
          <Card options={services} selected={service} onSelect={handleService}
            title="Which Service?" subtitle="Select the service you're interested in." />
        )}
        {screen === "calendar" && <CalendarPlaceholder concern={concern} service={service} />}
        {screen === "contact" && <ContactScreen />}

        <div className="py-6 text-center">
          <span style={{ fontFamily: font, fontSize: 13, color: "#AEB5BF" }}>
            Questions? Text or call{" "}
            <a href={PHONE_HREF} style={{ color: "#AEB5BF", textDecoration: "underline" }}>{PHONE}</a>
          </span>
        </div>
      </main>
    </div>
  );
};

export default BookingFunnelV3;
