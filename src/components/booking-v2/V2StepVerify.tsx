import { Mail, MessageSquare } from "lucide-react";

interface V2StepVerifyProps {
  email: string;
  phone: string;
}

const font = "'Montserrat', sans-serif";
const display = "'Bebas Neue', sans-serif";

const V2StepVerify = ({ email, phone }: V2StepVerifyProps) => {
  const handleResend = () => {
    console.log("[V2] Resend confirmation requested for:", { email, phone });
  };

  return (
    <div className="mx-auto w-full max-w-[480px] px-5 pt-6 pb-10" data-spec-id="step7-screen">
      {/* Icon pair */}
      <div className="mb-6 flex items-center justify-center gap-4" data-spec-id="step7-icons">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full"
          style={{ backgroundColor: "rgba(232,103,10,0.12)" }}
        >
          <Mail className="h-7 w-7" style={{ color: "#E8670A" }} strokeWidth={2} />
        </div>
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full"
          style={{ backgroundColor: "rgba(232,103,10,0.12)" }}
        >
          <MessageSquare className="h-7 w-7" style={{ color: "#E8670A" }} strokeWidth={2} />
        </div>
      </div>

      {/* Heading */}
      <h1
        data-spec-id="step7-heading"
        className="text-center uppercase"
        style={{
          fontFamily: display,
          fontSize: 48,
          lineHeight: 1.05,
          letterSpacing: "0.02em",
          color: "#FFFFFF",
          marginBottom: 18,
        }}
      >
        You're Almost There!
      </h1>

      {/* Body copy */}
      <p
        data-spec-id="step7-body"
        className="text-center"
        style={{
          fontFamily: font,
          fontSize: 18,
          lineHeight: 1.55,
          color: "#E8E6E3",
          marginBottom: 16,
        }}
      >
        Check your email and phone right now. We sent a confirmation link to both. Your appointment
        isn't booked until you click it.
      </p>

      {/* Helper */}
      <p
        data-spec-id="step7-helper"
        className="text-center"
        style={{
          fontFamily: font,
          fontSize: 15,
          lineHeight: 1.5,
          color: "#AEB5BF",
          marginBottom: 28,
        }}
      >
        Don't see it within a few minutes? Check spam, or call us at{" "}
        <a
          href="tel:18663444955"
          style={{ color: "#FFFFFF", textDecoration: "underline" }}
        >
          1-866-344-4955
        </a>
        .
      </p>

      {/* Info cards */}
      <div className="mb-7 space-y-3">
        <div
          data-spec-id="step7-emailcard"
          className="flex items-center gap-4 rounded-2xl p-4"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #D1CCC5",
          }}
        >
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: "rgba(232,103,10,0.10)" }}
          >
            <Mail className="h-5 w-5" style={{ color: "#E8670A" }} />
          </div>
          <div className="min-w-0 flex-1">
            <p
              style={{
                fontFamily: font,
                fontSize: 13,
                fontWeight: 600,
                color: "#6B7280",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: 2,
              }}
            >
              Check your email
            </p>
            <p
              className="truncate"
              style={{
                fontFamily: font,
                fontSize: 16,
                fontWeight: 600,
                color: "#0B1029",
              }}
            >
              {email || "your email"}
            </p>
          </div>
        </div>

        <div
          data-spec-id="step7-phonecard"
          className="flex items-center gap-4 rounded-2xl p-4"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #D1CCC5",
          }}
        >
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: "rgba(232,103,10,0.10)" }}
          >
            <MessageSquare className="h-5 w-5" style={{ color: "#E8670A" }} />
          </div>
          <div className="min-w-0 flex-1">
            <p
              style={{
                fontFamily: font,
                fontSize: 13,
                fontWeight: 600,
                color: "#6B7280",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: 2,
              }}
            >
              Check your phone
            </p>
            <p
              style={{
                fontFamily: font,
                fontSize: 16,
                fontWeight: 600,
                color: "#0B1029",
              }}
            >
              {phone || "your phone"}
            </p>
          </div>
        </div>
      </div>

      {/* Resend */}
      <div className="text-center">
        <button
          type="button"
          onClick={handleResend}
          data-spec-id="step7-resend"
          style={{
            fontFamily: font,
            fontSize: 15,
            fontWeight: 500,
            color: "#AEB5BF",
            background: "none",
            border: "none",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Resend confirmation
        </button>
      </div>
    </div>
  );
};

export default V2StepVerify;
