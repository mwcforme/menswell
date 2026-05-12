import AnimatedCheckmark from "./AnimatedCheckmark";
import { Phone, Check, CalendarPlus } from "lucide-react";

interface StepFourProps {
  firstName: string;
  phone: string;
  location: string;
  selectedDate: string;
  selectedTime: string;
}

const StepFour = ({ firstName, phone, location, selectedDate, selectedTime }: StepFourProps) => {
  return (
    <div className="flex min-h-[calc(100vh-60px)] flex-col items-center px-5 py-12" style={{ backgroundColor: "#EBEAE8" }}>
      <div className="w-full max-w-[560px]">
        <div className="mb-6">
          <AnimatedCheckmark />
        </div>

        <h2
          className="mb-8 text-center uppercase"
          style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 800, fontStyle: "italic", fontSize: "clamp(1.5rem, 5vw, 2.6rem)", color: "#000033", transform: "skewX(-3deg)" }}
        >
          You're Confirmed, {firstName}.
        </h2>

        <div className="mb-6 rounded-2xl bg-white p-5" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
          {[
            { label: "Date", value: selectedDate },
            { label: "Time", value: selectedTime },
            { label: "Location", value: location },
            { label: "Phone", value: phone },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between border-b py-3 last:border-0" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
              <span className="text-xs uppercase" style={{ color: "#555555", letterSpacing: "0.06em" }}>{row.label}</span>
              <span className="text-sm font-medium" style={{ color: "#1A1A2E" }}>{row.value}</span>
            </div>
          ))}
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {["Google Calendar", "Outlook", "Apple Calendar"].map((cal) => (
            <button
              key={cal}
              className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-medium transition-colors"
              style={{ border: "1px solid rgba(0,0,0,0.1)", color: "#555555" }}
            >
              <CalendarPlus className="h-3.5 w-3.5" /> {cal}
            </button>
          ))}
        </div>

        <div className="mb-8 rounded-2xl bg-white p-6 text-center" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
          <h3 className="mb-2 text-sm font-bold uppercase" style={{ color: "#000033", letterSpacing: "0.06em" }}>
            Want to Skip the Waiting Room?
          </h3>
          <p className="mb-4 text-sm" style={{ color: "#555555" }}>
            Complete a short health questionnaire now so your physician is fully prepared when you arrive. Takes about 3 minutes.
          </p>
          <button
            className="mx-auto mb-3 flex items-center justify-center rounded-full px-8 py-3 text-sm font-bold transition-all"
            style={{ backgroundColor: "#E8670A", color: "#fff" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.backgroundColor = "#D45A06"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.backgroundColor = "#E8670A"; }}
          >
            Finish My Health Form
          </button>
          <p className="text-xs" style={{ color: "#888888" }}>
            Or complete it later. We'll send you a link.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="mb-4 text-center text-xs font-bold uppercase" style={{ color: "#555555", letterSpacing: "0.1em" }}>
            What to Expect at Your Visit
          </h3>
          <div className="space-y-3">
            {["Arrive 15 minutes early", "Bring a photo ID", "Wear a short-sleeve shirt (for blood draw)"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
                <Check className="h-4 w-4 shrink-0" style={{ color: "#22C55E" }} />
                <span className="text-sm" style={{ color: "#1A1A2E" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="mb-2 text-xs" style={{ color: "#888888" }}>Questions?</p>
          <a href="tel:8663444955" className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: "#555555" }}>
            <Phone className="h-4 w-4" /> Call 866-344-4955
          </a>
        </div>
      </div>
    </div>
  );
};

export default StepFour;
