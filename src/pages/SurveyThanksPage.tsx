import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import V2Header from "@/components/booking-v2/V2Header";
import SurveyCard from "@/components/survey/SurveyCard";
import "@/intake/styles.css";

const font = "'Montserrat', sans-serif";

interface ThanksState {
  location?: string;
  contactId?: string | null;
}

const SurveyThanksPage = () => {
  const { state } = useLocation();
  const s = (state || {}) as ThanksState;

  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // eslint-disable-next-line no-console
    console.info("survey_followup_comment", {
      contact_id: s.contactId ?? null,
      location: s.location ?? null,
      comment,
      submitted_at: new Date().toISOString(),
    });
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: "#0B1029" }}>
      <V2Header />

      <main className="flex flex-1 flex-col">
        <SurveyCard
          title={submitted ? "Got It — Thank You" : "Thanks For The Honest Feedback"}
          subtitle={
            submitted
              ? "A team member will reach out if a follow-up is needed."
              : "We'd rather hear it from you than read it on the internet. Tell us what fell short — we read every word."
          }
        >
          {!submitted ? (
            <>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What could we have done better?"
                rows={5}
                className="w-full"
                style={{
                  borderRadius: 10,
                  padding: "14px 16px",
                  fontFamily: font,
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#0B1029",
                  backgroundColor: "#F5F3F0",
                  border: "1.5px solid #D1CCC5",
                  outline: "none",
                  resize: "none",
                  lineHeight: 1.5,
                }}
              />

              <button
                type="button"
                onClick={handleSubmit}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 transition-all"
                style={{
                  height: 56,
                  borderRadius: 9999,
                  fontFamily: font,
                  fontWeight: 700,
                  fontSize: 15,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                  backgroundColor: "#E8670A",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Send Feedback
              </button>

              <p
                className="mt-4 text-center"
                style={{ fontFamily: font, fontSize: 12, color: "#9CA3AF" }}
              >
                Or call us directly at{" "}
                <a href="tel:8663444955" style={{ color: "#E8670A", textDecoration: "underline" }}>
                  (866) 344-4955
                </a>
              </p>
            </>
          ) : (
            <Link
              to="/"
              className="inline-flex w-full items-center justify-center gap-2"
              style={{
                height: 56,
                borderRadius: 9999,
                fontFamily: font,
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                backgroundColor: "#E8670A",
                border: "none",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Done
            </Link>
          )}
        </SurveyCard>

        <div className="py-6 text-center">
          <span style={{ fontFamily: font, fontSize: 13, color: "#AEB5BF" }}>
            Men's Wellness Centers · Virginia
          </span>
        </div>
      </main>
    </div>
  );
};

export default SurveyThanksPage;
