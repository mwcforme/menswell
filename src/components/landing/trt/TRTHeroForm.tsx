import { useState } from "react";
import { Lock, Loader2 } from "lucide-react";
import { useLeadSubmitController } from "@/domain/leads/useLeadSubmitController";
import { heroLeadSchema, type HeroLeadInput } from "@/domain/leads/leadFormSchema";
import { getBookingState, toQueryString } from "@/lib/bookingState";

const formatPhone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};

export const TRTHeroForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [tcpa, setTcpa] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const controller = useLeadSubmitController<HeroLeadInput>({
    schema: heroLeadSchema,
    source: "landing-page-hero",
    toLeadInput: (v) => {
      const [first, ...rest] = v.name.trim().split(/\s+/);
      return {
        firstName: first || "Guest",
        lastName: rest.join(" ") || undefined,
        email: v.email,
        phone: v.phone,
      };
    },
    onSuccess: (_r, v) => {
      // Persist service tag and route to symptom step with full state in URL.
      const merged = getBookingState();
      const qs = toQueryString({ ...merged, location: v.location, service: "trt" });
      // Use replace-style nav via window so back-button doesn't trap on the LP form.
      window.location.assign(`/book/symptom?${qs}`);
    },
    // Hero form shows inline errors only — keep the legacy "no toast" behavior.
    toastOnError: false,
  });

  const errors = controller.fieldErrors;
  const isSubmitting = controller.isSubmitting;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void controller.submit({ name, phone, email, location, tcpa });
  };

  const inputBase = (field: string): React.CSSProperties => ({
    width: "100%",
    height: 50,
    background: "rgba(11,16,41,0.6)",
    border: `1px solid ${focused === field ? "#E8670A" : "rgba(245,240,235,0.20)"}`,
    borderRadius: 8,
    padding: "0 16px",
    fontSize: 15,
    color: "#F5F0EB",
    outline: "none",
    fontFamily: "Inter, sans-serif",
    transition: "border-color 150ms ease",
  });

  return (
    <div
      className="rounded-2xl p-7 md:p-8 w-full"
      style={{
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.12)",
        maxWidth: 420,
        boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
      }}
    >
      <h2
        className="font-bold uppercase"
        style={{
          fontFamily: "Oswald, sans-serif",
          fontSize: 22,
          color: "#F5F0EB",
          fontWeight: 700,
          letterSpacing: "0.05em",
          lineHeight: 1.15,
        }}
      >
        Book My Consult
      </h2>
      <p
        className="mt-1.5 mb-5"
        style={{ color: "rgba(245,240,235,0.70)", fontFamily: "Inter, sans-serif", fontSize: 14 }}
      >
        Same or next day. Takes 30 seconds.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        <div>
          <label htmlFor="hf-name" className="sr-only">Full Name</label>
          <input
            id="hf-name"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused(null)}
            style={inputBase("name")}
            autoComplete="name"
          />
          {errors.name && <p className="text-xs mt-1" style={{ color: "#FF8A8A" }}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="hf-phone" className="sr-only">Phone Number</label>
          <input
            id="hf-phone"
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            onFocus={() => setFocused("phone")}
            onBlur={() => setFocused(null)}
            style={inputBase("phone")}
            autoComplete="tel"
            inputMode="tel"
          />
          {errors.phone && <p className="text-xs mt-1" style={{ color: "#FF8A8A" }}>{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="hf-email" className="sr-only">Email Address</label>
          <input
            id="hf-email"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value.slice(0, 255))}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
            style={inputBase("email")}
            autoComplete="email"
            inputMode="email"
          />
          {errors.email && <p className="text-xs mt-1" style={{ color: "#FF8A8A" }}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="hf-loc" className="sr-only">Location</label>
          <select
            id="hf-loc"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={() => setFocused("location")}
            onBlur={() => setFocused(null)}
            style={{
              ...inputBase("location"),
              color: location ? "#F5F0EB" : "rgba(245,240,235,0.50)",
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23F5F1E8' opacity='0.6' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 14px center",
              paddingRight: 40,
            }}
          >
            <option value="" disabled style={{ color: "#0B1029" }}>Location</option>
            <option value="virginia-beach" style={{ color: "#0B1029" }}>Virginia Beach</option>
            <option value="newport-news" style={{ color: "#0B1029" }}>Newport News</option>
            <option value="richmond" style={{ color: "#0B1029" }}>Richmond</option>
          </select>
          {errors.location && <p className="text-xs mt-1" style={{ color: "#FF8A8A" }}>{errors.location}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full uppercase font-bold cursor-pointer inline-flex items-center justify-center gap-2"
          style={{
            height: 56,
            background: "#E8670A",
            color: "#FFFFFF",
            fontSize: 14,
            border: "none",
            borderRadius: 8,
            letterSpacing: "0.08em",
            fontFamily: "Inter, sans-serif",
            marginTop: 4,
            opacity: isSubmitting ? 0.85 : 1,
            cursor: isSubmitting ? "wait" : "pointer",
            transition: "background-color 180ms ease, transform 180ms ease",
          }}
          onMouseEnter={(e) => { if (!isSubmitting) { e.currentTarget.style.background = "#CF5B09"; e.currentTarget.style.transform = "scale(1.01)"; } }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#E8670A"; e.currentTarget.style.transform = "scale(1)"; }}
        >
          {isSubmitting && <Loader2 size={16} className="animate-spin" />}
          {isSubmitting ? "Booking..." : "Book My Consult"}
        </button>

        <label className="flex items-start gap-3 cursor-pointer -m-2 p-2 rounded-lg transition-colors hover:bg-white/5">
          <input
            type="checkbox"
            checked={tcpa}
            onChange={(e) => setTcpa(e.target.checked)}
            className="mt-0.5 flex-shrink-0 w-6 h-6 min-w-[24px] min-h-[24px] rounded border border-white/30 bg-transparent cursor-pointer"
            style={{ accentColor: "#E8670A" }}
          />
          <span style={{ color: "rgba(245,240,235,0.55)", fontSize: 12, lineHeight: 1.45 }}>
            I agree to receive SMS/calls about my appointment. Reply STOP to opt out. Msg & data rates may apply.
          </span>
        </label>
        {errors.tcpa && <p className="text-xs" style={{ color: "#FF8A8A" }}>{errors.tcpa}</p>}
        {controller.error && !Object.keys(errors).length && (
          <p className="text-xs" style={{ color: "#FF8A8A" }}>{controller.error}</p>
        )}
      </form>

      <p className="text-center mt-4 inline-flex items-center justify-center gap-1.5 w-full" style={{ color: "rgba(245,240,235,0.60)", fontFamily: "Inter, sans-serif", fontSize: 12 }}>
        <Lock size={12} /> HIPAA secure. No spam, ever.
      </p>
    </div>
  );
};
