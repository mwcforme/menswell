import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle, Phone } from "lucide-react";
import { TRT2Footer } from "@/components/landing/trt2/TRT2Footer";

const steps = [
  "A team member will text you within 1 hour to confirm your appointment.",
  "Save this number so you don't miss it: 866-344-4955.",
  "Bring a valid ID to your visit — no fasting or prior labs needed.",
];

const TRT2ThankYou = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || "";

  useEffect(() => {
    document.title = "Consultation Request Received | Men's Wellness Centers";
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "Inter, sans-serif", background: "#000033" }}>
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-[520px] w-full text-center">
          <img
            src="/logos/Text_Logo_white.png"
            alt="Men's Wellness Centers"
            className="h-8 mx-auto mb-10"
          />

          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "rgba(46,204,113,0.15)" }}
          >
            <CheckCircle className="h-8 w-8" style={{ color: "#2ECC71" }} />
          </div>

          <h1
            className="font-bold uppercase"
            style={{
              fontFamily: "Oswald, sans-serif",
              fontSize: "clamp(28px, 5vw, 42px)",
              color: "#FFFFFF",
              fontWeight: 700,
            }}
          >
            We Got Your Request{name ? `, ${name}` : ""}!
          </h1>

          <p className="text-base mt-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
            A member of our team will text you within 1 hour to schedule your testosterone test. Keep your phone close.
          </p>

          {/* Next steps */}
          <div className="mt-8 text-left space-y-4">
            <p className="text-xs font-semibold uppercase" style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em" }}>
              What Happens Next
            </p>
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  <span className="text-xs font-bold" style={{ color: "#FFFFFF" }}>{i + 1}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>{step}</p>
              </div>
            ))}
          </div>

          <a
            href="tel:8663444955"
            className="mt-10 inline-flex items-center gap-2 rounded-full px-8 font-bold text-sm uppercase"
            style={{
              height: 52,
              background: "#E8670A",
              color: "#FFFFFF",
              letterSpacing: "0.08em",
              textDecoration: "none",
            }}
          >
            <Phone className="h-4 w-4" /> Call Us Now: 866-344-4955
          </a>
        </div>
      </main>
      <TRT2Footer />
    </div>
  );
};

export default TRT2ThankYou;
