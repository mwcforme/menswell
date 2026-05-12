import { Phone, MessageSquareText } from "lucide-react";
import BookLayout from "@/components/book/BookLayout";
import { useBookingSync } from "@/lib/bookingState";

const PHONE_DISPLAY = "(866) 344-4955";
const PHONE_TEL = "tel:8663444955";
const SMS_HREF = "sms:8663444955";

/**
 * /book/lets-talk — Termination page for the "Something else" symptom path.
 *
 * Goal: phone conversion. These are still leads — they just don't fit our
 * three primary service buckets, so we want a human to triage. NOT a
 * disqualifier or a dead-end. Tag in GHL as lead_quality: needs_qualifying.
 *
 * Design follows the same AMD playbook as the schedule page:
 *   - 22px+ body, 32px+ headlines, sentence case
 *   - 3px slate borders on cards (visible boundaries)
 *   - 64px+ primary CTAs (call) and 64px+ secondary CTAs (text)
 *   - Sticky mobile tap-to-call bar
 *   - Two contact methods so the user picks whichever they're comfortable with
 */
const BookLetsTalk = () => {
  // Hydrate state so we can log/track the symptom value they picked (still
  // "other" but URL params persist forward for GHL).
  useBookingSync();

  const trackCallClick = () => {
    const dl = (window as unknown as { dataLayer?: unknown[] }).dataLayer;
    if (typeof window !== "undefined" && dl) {
      dl.push({ event: "phone_click", page: "lets-talk" });
    }
  };
  const trackSmsClick = () => {
    const dl = (window as unknown as { dataLayer?: unknown[] }).dataLayer;
    if (typeof window !== "undefined" && dl) {
      dl.push({ event: "sms_click", page: "lets-talk" });
    }
  };

  return (
    <BookLayout page="lets-talk" title="Let's talk it through | Men's Wellness Centers">
      <div className="px-4 md:px-6 pt-8 md:pt-14 pb-28 md:pb-16">
        <div className="mx-auto" style={{ maxWidth: 760 }}>
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <div
              className="inline-flex items-center gap-2 mb-4 md:mb-5"
              style={{
                padding: "6px 12px",
                borderRadius: 999,
                background: "rgba(232,103,10,0.12)",
                border: "1px solid rgba(232,103,10,0.35)",
                color: "#FFB07A",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: 999, background: "#22C55E" }} />
              Team available now
            </div>
            <h1
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(28px, 5vw, 44px)",
                color: "#FFFFFF",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                textWrap: "balance",
                marginBottom: 12,
              } as React.CSSProperties}
            >
              Let's talk it through.
            </h1>
            <p
              className="text-base md:text-lg"
              style={{
                color: "rgba(255,255,255,0.72)",
                fontWeight: 400,
                lineHeight: 1.5,
                maxWidth: 560,
                margin: "0 auto",
              }}
            >
              Every man's situation is different. A two-minute call is the
              fastest way to get matched with the right visit.
            </p>
          </div>

          {/* Contact cards — side by side on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {/* PRIMARY: Call */}
            <section
              style={{
                background: "#FFFFFF",
                borderRadius: 14,
                padding: "20px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  aria-hidden="true"
                  className="flex items-center justify-center flex-shrink-0"
                  style={{ width: 40, height: 40, borderRadius: 10, background: "#E8670A" }}
                >
                  <Phone size={20} strokeWidth={2.25} style={{ color: "#FFFFFF" }} />
                </span>
                <div>
                  <h2
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 700,
                      fontSize: 18,
                      color: "#0B1029",
                      lineHeight: 1.2,
                    }}
                  >
                    Call us
                  </h2>
                  <p style={{ color: "#5A6478", fontSize: 14, fontWeight: 500, lineHeight: 1.35, marginTop: 2 }}>
                    A real person picks up. No phone tree.
                  </p>
                </div>
              </div>

              <a
                href={PHONE_TEL}
                onClick={trackCallClick}
                className="flex items-center justify-center gap-2 transition-transform hover:-translate-y-[1px]"
                style={{
                  width: "100%",
                  minHeight: 60,
                  background: "#E8670A",
                  color: "#FFFFFF",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: 20,
                  borderRadius: 10,
                  textDecoration: "none",
                  padding: "14px 20px",
                  boxShadow: "0 6px 16px rgba(232,103,10,0.35)",
                  marginTop: "auto",
                }}
              >
                <Phone size={20} strokeWidth={2.5} />
                <span>{PHONE_DISPLAY}</span>
              </a>

            </section>

            {/* SECONDARY: Text */}
            <section
              style={{
                background: "#FFFFFF",
                borderRadius: 14,
                padding: "20px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  aria-hidden="true"
                  className="flex items-center justify-center flex-shrink-0"
                  style={{ width: 40, height: 40, borderRadius: 10, background: "#FFF5EE" }}
                >
                  <MessageSquareText size={20} strokeWidth={2.25} style={{ color: "#E8670A" }} />
                </span>
                <div>
                  <h2
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 700,
                      fontSize: 18,
                      color: "#0B1029",
                      lineHeight: 1.2,
                    }}
                  >
                    Prefer to text?
                  </h2>
                  <p style={{ color: "#5A6478", fontSize: 14, fontWeight: 500, lineHeight: 1.35, marginTop: 2 }}>
                    Same number. Replies in under 10 minutes.
                  </p>
                </div>
              </div>

              <a
                href={SMS_HREF}
                onClick={trackSmsClick}
                className="flex items-center justify-center gap-2 transition-transform hover:-translate-y-[1px]"
                style={{
                  width: "100%",
                  minHeight: 60,
                  background: "#FFFFFF",
                  color: "#0B1029",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: 20,
                  borderRadius: 10,
                  textDecoration: "none",
                  padding: "14px 20px",
                  border: "2px solid #0B1029",
                  marginTop: "auto",
                }}
              >
                <MessageSquareText size={20} strokeWidth={2.5} />
                <span>{PHONE_DISPLAY}</span>
              </a>

              <div
                className="flex items-center justify-center gap-2 mt-3"
                style={{ color: "#5A6478", fontSize: 13, fontWeight: 500 }}
              >
                <span>Standard messaging rates apply</span>
              </div>
            </section>
          </div>

          {/* Reassurance */}
          <p
            className="text-center mt-8 md:mt-10 mx-auto"
            style={{
              maxWidth: 520,
              color: "rgba(255,255,255,0.55)",
              fontSize: 14,
              fontWeight: 400,
              lineHeight: 1.55,
            }}
          >
            No pressure, no sales pitch. We'll listen, point you in the right
            direction, and book a visit if it's the right fit.
          </p>
        </div>
      </div>

      {/* STICKY MOBILE TAP-TO-CALL BAR */}
      <a
        href={PHONE_TEL}
        onClick={trackCallClick}
        aria-label={`Call ${PHONE_DISPLAY}`}
        className="md:hidden fixed inset-x-0 bottom-0 flex items-center justify-center gap-3 z-50"
        style={{
          background: "#E8670A",
          color: "#FFFFFF",
          fontFamily: "Inter, sans-serif",
          fontWeight: 700,
          fontSize: 22,
          textDecoration: "none",
          minHeight: 72,
          padding: "16px 20px",
          paddingBottom: "max(16px, env(safe-area-inset-bottom))",
          boxShadow: "0 -4px 12px rgba(0,0,0,0.25)",
        }}
      >
        <Phone size={24} strokeWidth={2.5} />
        <span>CALL {PHONE_DISPLAY}</span>
      </a>
    </BookLayout>
  );
};

export default BookLetsTalk;
