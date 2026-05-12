import { useEffect } from "react";
import AnimatedCheckmark from "../booking/AnimatedCheckmark";
import { Clock, CreditCard, Phone, Share2, Star, Shield, MapPin, Award, Lock } from "lucide-react";

interface V2StepFourProps {
  firstName: string;
  phone: string;
  email: string;
  location: string;
  locationLabel: string;
  selectedDate: string;
  selectedTime: string;
  primaryConcern: string;
  duration: string;
  priorTreatment: boolean;
  smsConsent: boolean;
  smsReminder: boolean;
}

const font = "'Montserrat', sans-serif";
const headingFont = "'Bebas Neue', sans-serif";

const V2StepFour = (props: V2StepFourProps) => {
  useEffect(() => {
    console.log("📋 Booking Payload:", {
      firstName: props.firstName,
      phone: props.phone,
      email: props.email,
      location: props.location,
      primaryConcern: props.primaryConcern,
      duration: props.duration,
      priorTreatment: props.priorTreatment,
      selectedDate: props.selectedDate,
      selectedTime: props.selectedTime,
      smsConsent: props.smsConsent,
      smsReminder: props.smsReminder,
    });
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: "Men's Wellness Centers, Consultation",
      text: "I just booked a no-cost consultation at Men's Wellness Centers. You should check it out.",
      url: "https://menswellnesscenters.com/book",
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch {}
    } else {
      await navigator.clipboard.writeText(shareData.url);
      alert("Link copied to clipboard!");
    }
  };

  const summaryRows = [
    { label: "Date", value: props.selectedDate },
    { label: "Time", value: props.selectedTime },
    { label: "Location", value: props.locationLabel },
    { label: "Phone", value: props.phone },
  ];

  const expectItems = [
    { icon: Clock, text: "Arrive 15 minutes early" },
    { icon: CreditCard, text: "Bring a photo ID" },
    { icon: Phone, text: "Wear a short-sleeve shirt (for blood draw)" },
    { icon: Phone, text: "Questions? Text or call (866) 344-4955" },
  ];

  return (
    <div className="flex flex-col items-center px-5 py-8 md:py-12" data-spec-id="step8-screen">
      <div className="w-full max-w-[480px]">
        <div className="mb-6" data-spec-id="step8-checkmark">
          <AnimatedCheckmark />
        </div>

        <h1
          data-spec-id="step8-heading"
          className="mb-8 text-center uppercase"
          style={{ fontFamily: headingFont, fontSize: "clamp(26px, 5.5vw, 38px)", color: "#fff", letterSpacing: "0.05em" }}
        >
          You're Confirmed, {props.firstName}.
        </h1>

        {/* Summary card — white */}
        <div
          data-spec-id="step8-summary"
          className="mb-6 rounded-2xl p-5"
          style={{ backgroundColor: "#FFFFFF", border: "1px solid #D1CCC5", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}
        >
          {summaryRows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between border-b py-3 last:border-0"
              style={{ borderColor: "#E5E2DD" }}
            >
              <span className="uppercase" style={{ fontFamily: font, fontWeight: 600, fontSize: 13, color: "#6B7280", letterSpacing: "0.08em" }}>
                {row.label}
              </span>
              <span style={{ fontFamily: font, fontWeight: 500, fontSize: 16, color: "#0B1029" }}>
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar add buttons — white cards */}
        <div className="mb-8 flex flex-col gap-2 md:flex-row" data-spec-id="step8-calendar">
          {["Google Calendar", "Outlook", "Apple Calendar"].map((cal) => (
            <button
              key={cal}
              className="flex flex-1 items-center justify-center gap-2 px-4 py-4 transition-all"
              style={{
                fontFamily: font, fontWeight: 600, fontSize: 14, color: "#0B1029",
                backgroundColor: "#FFFFFF",
                border: "2px solid #D1CCC5", borderRadius: 12, cursor: "pointer",
                minHeight: 48,
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(232,103,10,0.4)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#D1CCC5"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)"; }}
              aria-label={`Add to ${cal}`}
            >
              {cal}
            </button>
          ))}
        </div>

        {/* Health form upsell — white card with orange left accent */}
        <div
          data-spec-id="step8-healthform"
          className="mb-8 rounded-2xl p-6"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #D1CCC5",
            borderLeft: "4px solid #E8670A",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          }}
        >
          <h2 className="mb-2 uppercase" style={{ fontFamily: headingFont, fontSize: 20, color: "#0B1029", letterSpacing: "0.05em" }}>
            Want to Skip the Waiting Room?
          </h2>
          <p className="mb-4" style={{ fontFamily: font, fontSize: 15, color: "#6B7280", lineHeight: 1.6 }}>
            Complete a short health questionnaire now so your physician is fully prepared when you arrive. Takes about 3 minutes.
          </p>
          <button
            className="mb-3 flex w-full items-center justify-center uppercase transition-all"
            style={{
              height: 56, backgroundColor: "#E8670A", color: "#fff",
              fontFamily: font, fontWeight: 700, fontSize: 15, letterSpacing: "0.1em",
              cursor: "pointer", border: "none", borderRadius: 12, padding: "16px 24px",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(232,103,10,0.3)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
            aria-label="Finish my health form"
          >
            Finish My Health Form →
          </button>
          <p style={{ fontFamily: font, fontSize: 14, color: "#9CA3AF", textAlign: "center" }}>
            Or complete it later. We'll send you a link.
          </p>
        </div>

        {/* What to expect */}
        <div className="mb-8" data-spec-id="step8-expect">
          <h2 className="mb-4 text-center uppercase" style={{ fontFamily: headingFont, fontSize: 18, color: "#fff", letterSpacing: "0.05em" }}>
            What to Expect at Your Visit
          </h2>
          <div className="space-y-3">
            {expectItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <item.icon className="h-5 w-5 shrink-0" style={{ color: "#E8670A" }} />
                <span style={{ fontFamily: font, fontSize: 15, color: "#B8B6B2" }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Referral */}
        <div className="mb-8 text-center" data-spec-id="step8-referral">
          <p className="mb-2 uppercase" style={{ fontFamily: font, fontWeight: 600, fontSize: 13, color: "#AEB5BF", letterSpacing: "0.08em" }}>
            Know someone who could benefit?
          </p>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 transition-all"
            style={{ fontFamily: font, fontWeight: 500, fontSize: 15, color: "#fff", cursor: "pointer", background: "none", border: "none" }}
            aria-label="Share with a friend"
          >
            <Share2 className="h-4 w-4" /> Share this with a friend →
          </button>
        </div>

        {/* Trust footer */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-4" data-spec-id="step8-trustfooter">
          {[
            { icon: MapPin, label: "10,000+ Men Treated" },
            { icon: Star, label: "4.9 Google Reviews" },
            { icon: Shield, label: "LegitScript Certified" },
            { icon: Lock, label: "HIPAA Compliant" },
            { icon: Award, label: "CLIA Certified" },
          ].map((b) => (
            <span key={b.label} className="flex items-center gap-1" style={{ fontFamily: font, fontSize: 12, color: "#AEB5BF" }}>
              <b.icon className="h-3 w-3" /> {b.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default V2StepFour;
