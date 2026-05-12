import { Link } from "react-router-dom";
import { ArrowRight, LinkIcon, MailQuestion, Sparkles } from "lucide-react";
import V2Header from "@/components/booking-v2/V2Header";
import "@/intake/styles.css";

const headingFont = "'Bebas Neue', sans-serif";
const font = "'Montserrat', sans-serif";

const WARM_URL =
  "/survey/start?contact_id=demo123&location=virginia-beach&first_name=John";
const COLD_URL = "/survey/start";

const SurveyMockupIntro = () => {
  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: "#0B1029" }}>
      <V2Header />

      <main className="flex flex-1 flex-col items-center px-5 pt-8 pb-16 md:pt-14">
        <div
          className="w-full max-w-[680px] p-6 md:p-10"
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 20,
            boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
          }}
        >
          <div
            className="mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1"
            style={{
              backgroundColor: "rgba(232,103,10,0.10)",
              color: "#E8670A",
              fontFamily: font,
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            <Sparkles className="h-3 w-3" /> Mockup · Choose a flow
          </div>

          <h1
            className="mb-3 uppercase"
            style={{
              fontFamily: headingFont,
              fontSize: "clamp(28px, 5.5vw, 40px)",
              color: "#0B1029",
              letterSpacing: "0.04em",
              lineHeight: 1.05,
            }}
          >
            Patient Satisfaction Survey
          </h1>

          <p
            className="mb-6"
            style={{
              fontFamily: font,
              fontSize: 15,
              lineHeight: 1.6,
              color: "#4B5563",
            }}
          >
            This mockup demonstrates two ways a patient can land on the survey. The
            experience changes based on whether we already know who they are. A
            "Yes" on the recommend question routes to the appropriate Google review
            page for their location; a "No" routes to a private feedback page.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {/* WARM */}
            <Link
              to={WARM_URL}
              className="group block rounded-2xl border-2 p-5 transition-all hover:-translate-y-0.5"
              style={{
                borderColor: "#E8670A",
                backgroundColor: "rgba(232,103,10,0.04)",
              }}
            >
              <div
                className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full"
                style={{ backgroundColor: "#E8670A", color: "#fff" }}
              >
                <LinkIcon className="h-4 w-4" />
              </div>
              <p
                className="mb-1 uppercase"
                style={{
                  fontFamily: font,
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "#E8670A",
                }}
              >
                Source 1 · GHL link (warm)
              </p>
              <h2
                className="mb-2"
                style={{
                  fontFamily: headingFont,
                  fontSize: 22,
                  color: "#0B1029",
                  letterSpacing: "0.03em",
                }}
              >
                Tokenized link from GHL
              </h2>
              <p
                className="mb-3"
                style={{ fontFamily: font, fontSize: 13.5, lineHeight: 1.55, color: "#4B5563" }}
              >
                Patient clicks{" "}
                <code
                  style={{
                    fontSize: 12,
                    background: "#F3F4F6",
                    padding: "1px 6px",
                    borderRadius: 4,
                    color: "#0B1029",
                  }}
                >
                  menswellnesscenters.com/l/V03hUCh1P
                </code>
                . The token tells us their name and location, so we skip the
                location and identity steps — just 3 quick questions.
              </p>
              <span
                className="inline-flex items-center gap-1.5"
                style={{
                  fontFamily: font,
                  fontWeight: 600,
                  fontSize: 13,
                  color: "#E8670A",
                }}
              >
                Try the warm flow <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            {/* COLD */}
            <Link
              to={COLD_URL}
              className="group block rounded-2xl border-2 p-5 transition-all hover:-translate-y-0.5"
              style={{
                borderColor: "#E5E7EB",
                backgroundColor: "#FAFAFA",
              }}
            >
              <div
                className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full"
                style={{ backgroundColor: "#0B1029", color: "#fff" }}
              >
                <MailQuestion className="h-4 w-4" />
              </div>
              <p
                className="mb-1 uppercase"
                style={{
                  fontFamily: font,
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "#0B1029",
                }}
              >
                Source 2 · Cold link
              </p>
              <h2
                className="mb-2"
                style={{
                  fontFamily: headingFont,
                  fontSize: 22,
                  color: "#0B1029",
                  letterSpacing: "0.03em",
                }}
              >
                Untokenized / shared link
              </h2>
              <p
                className="mb-3"
                style={{ fontFamily: font, fontSize: 13.5, lineHeight: 1.55, color: "#4B5563" }}
              >
                No token means we don't know who they are. After the 3 rating
                questions, we ask which Center they visited and one identity
                field (email or phone) to attribute the response.
              </p>
              <span
                className="inline-flex items-center gap-1.5"
                style={{
                  fontFamily: font,
                  fontWeight: 600,
                  fontSize: 13,
                  color: "#0B1029",
                }}
              >
                Try the cold flow <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>

          <div
            className="mt-6 rounded-lg p-4"
            style={{
              backgroundColor: "#F8FAFC",
              border: "1px solid #E5E7EB",
            }}
          >
            <p
              className="mb-1 uppercase"
              style={{
                fontFamily: font,
                fontWeight: 700,
                fontSize: 10,
                letterSpacing: "0.14em",
                color: "#6B7280",
              }}
            >
              How redirects work
            </p>
            <p style={{ fontFamily: font, fontSize: 13, lineHeight: 1.55, color: "#4B5563" }}>
              "Would you recommend us?" → <strong>Yes</strong> sends the patient
              to the Google review page for their location (Virginia Beach,
              Newport News, or Richmond). <strong>No</strong> routes to a
              private "thanks for the feedback" page so we can improve.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SurveyMockupIntro;
