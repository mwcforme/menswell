import { useEffect, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import "../intake/styles.css";
import { AppShell } from "../intake/components";
import { maskEmail, maskPhone, firstNameFromFull } from "../lib/maskContact";

interface GreetState {
  fullName?: string;
  email?: string;
  phone?: string;
}

const TRUST_BADGES = [
  "LegitScript",
  "HIPAA Secure",
  "3 Virginia Centers",
  "Since 2015",
];

const IntakeThanksPage = () => {
  const location = useLocation();
  const state = (location.state ?? {}) as GreetState;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const firstName = useMemo(
    () => firstNameFromFull(state.fullName ?? ""),
    [state.fullName]
  );
  const maskedEmail = useMemo(() => maskEmail(state.email ?? ""), [state.email]);
  const maskedPhone = useMemo(() => maskPhone(state.phone ?? ""), [state.phone]);

  const heading = firstName ? `You're all set, ${firstName}` : "You're all set";

  return (
    <AppShell currentStep={18} totalSteps={18} phaseIndex={5}>
      <div
        className="mx-auto text-center"
        style={{ maxWidth: 560, paddingTop: 24, paddingBottom: 32 }}
      >
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(32px, 8vw, 48px)",
            color: "#FFFFFF",
            letterSpacing: "0.04em",
            lineHeight: 1.05,
            textTransform: "uppercase",
          }}
        >
          {heading}
        </h1>
        <p
          className="mt-3 mx-auto"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 16,
            lineHeight: 1.55,
            color: "var(--text-on-dark)",
            maxWidth: 480,
          }}
        >
          Your provider will review this before your visit. We'll text your appointment
          confirmation and a map to the clinic.
        </p>

        {/* Contact cards */}
        <div className="mt-6 flex flex-col" style={{ gap: 12 }}>
          {state.email && (
            <ContactCard
              icon={<Mail size={18} color="var(--accent-orange)" strokeWidth={2} />}
              label="EMAIL"
              value={maskedEmail}
            />
          )}
          {state.phone && (
            <ContactCard
              icon={<Phone size={18} color="var(--accent-orange)" strokeWidth={2} />}
              label="PHONE"
              value={maskedPhone}
            />
          )}
        </div>

        {/* Trust badges */}
        <div
          className="mt-6 flex overflow-x-auto"
          style={{
            gap: 12,
            paddingBottom: 4,
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {TRUST_BADGES.map((b) => (
            <span
              key={b}
              style={{
                flex: "0 0 auto",
                padding: "6px 12px",
                borderRadius: 9999,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.04)",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--text-on-dark)",
                whiteSpace: "nowrap",
              }}
            >
              {b}
            </span>
          ))}
        </div>

        {/* Help link */}
        <div className="mt-6">
          <a
            href="tel:+17579379990"
            className="intake-secondary-link"
            style={{ fontSize: 14 }}
          >
            Need to change an answer? Text us at (757) 937-9990
          </a>
        </div>

        <div className="mt-8">
          <Link
            to="/"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 12,
              color: "var(--text-muted)",
              textDecoration: "underline",
              letterSpacing: "0.04em",
            }}
          >
            Return to mwcv3.com
          </Link>
        </div>
      </div>
    </AppShell>
  );
};

const ContactCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div
    className="flex items-center text-left"
    style={{
      background: "var(--card-white)",
      borderRadius: 16,
      padding: 20,
      boxShadow: "var(--card-shadow)",
      gap: 14,
    }}
  >
    <div
      className="flex items-center justify-center"
      style={{
        width: 40,
        height: 40,
        borderRadius: 9999,
        background: "var(--accent-orange-tint-10)",
        flex: "0 0 auto",
      }}
    >
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <div
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.08em",
          color: "var(--text-label)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      <div
        className="truncate"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 15,
          fontWeight: 500,
          color: "var(--text-primary)",
          marginTop: 2,
        }}
      >
        {value}
      </div>
    </div>
  </div>
);

export default IntakeThanksPage;
