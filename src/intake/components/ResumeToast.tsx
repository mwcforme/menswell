interface ResumeToastProps {
  onResume: () => void;
  onStartOver: () => void;
}

const ResumeToast = ({ onResume, onStartOver }: ResumeToastProps) => (
  <div
    className="mx-auto mb-4 w-full"
    style={{
      maxWidth: 560,
      background: "var(--card-white)",
      borderRadius: 12,
      padding: 16,
      boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
    }}
    role="status"
  >
    <p
      className="mb-3"
      style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 16,
        letterSpacing: "0.06em",
        color: "var(--text-primary)",
        textTransform: "uppercase",
      }}
    >
      Pick up where you left off?
    </p>
    <p
      className="mb-3"
      style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: 13,
        color: "var(--text-body)",
      }}
    >
      We saved your previous answers on this device.
    </p>
    <div className="flex gap-2">
      <button
        type="button"
        onClick={onResume}
        className="intake-cta"
        style={{ height: 44, fontSize: 13 }}
      >
        Resume
      </button>
      <button
        type="button"
        onClick={onStartOver}
        style={{
          flex: 1,
          height: 44,
          borderRadius: 9999,
          border: "1.5px solid var(--input-border)",
          background: "transparent",
          color: "var(--text-body)",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          cursor: "pointer",
        }}
      >
        Start over
      </button>
    </div>
  </div>
);

export default ResumeToast;
