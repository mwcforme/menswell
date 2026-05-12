import { useState } from "react";
import { ShieldAlert, Phone } from "lucide-react";

interface DQSoftLandingProps {
  phone: string;
}

const DQSoftLanding = ({ phone }: DQSoftLandingProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-60px)] flex-col items-center justify-center px-5 py-12" style={{ backgroundColor: "#EBEAE8" }}>
      <div className="w-full max-w-[520px] text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(245,158,11,0.15)" }}>
          <ShieldAlert className="h-10 w-10" style={{ color: "#F59E0B" }} />
        </div>

        <h2
          className="mb-4 uppercase"
          style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 800, fontStyle: "italic", fontSize: "clamp(1.3rem, 4vw, 2rem)", color: "#000033", transform: "skewX(-3deg)" }}
        >
          We Want to Make Sure You Get the Right Care
        </h2>

        <p className="mb-4" style={{ color: "#555555", fontSize: 15, lineHeight: 1.7 }}>
          Based on your answers, we'd like to have one of our physicians review your information before scheduling. We'll reach out within 1 business day to discuss your options and the best path forward.
        </p>

        <p className="mb-8 text-sm italic" style={{ color: "#888888" }}>
          This is not a rejection. Many members with these conditions still qualify for treatment through alternative approaches.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="tel:8663444955"
            className="flex flex-1 items-center justify-center gap-2 rounded-full py-4 font-bold transition-all"
            style={{ backgroundColor: "#E8670A", color: "#fff", fontSize: 15 }}
          >
            <Phone className="h-4 w-4" /> Call Us Now: 866-344-4955
          </a>
          <button
            onClick={() => setShowConfirmation(true)}
            className="flex flex-1 items-center justify-center rounded-full py-4 font-medium transition-all"
            style={{ border: "1px solid rgba(0,0,0,0.15)", color: "#1A1A2E", backgroundColor: "#fff", fontSize: 15 }}
          >
            We'll Call You
          </button>
        </div>

        {showConfirmation && (
          <div className="mt-4 animate-fade-in rounded-xl bg-white p-4" style={{ border: "1px solid rgba(232,103,10,0.3)" }}>
            <p className="text-sm" style={{ color: "#1A1A2E" }}>
              We have your number ({phone}). Expect a call within 1 business day.
            </p>
          </div>
        )}

        <p className="mt-8 text-xs" style={{ color: "#888888" }}>
          Questions? Call <a href="tel:8663444955" className="underline" style={{ color: "#555555" }}>866-344-4955</a>. We're here to help.
        </p>
      </div>
    </div>
  );
};

export default DQSoftLanding;
