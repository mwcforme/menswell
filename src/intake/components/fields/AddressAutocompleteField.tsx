import { useEffect, useMemo, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { US_STATES } from "@/intake/data/usStates";

interface Suggestion {
  street: string;
  city: string;
  state: string;
  postal_code: string;
}

const MOCK: Suggestion[] = [
  { street: "1100 W Main St", city: "Richmond", state: "VA", postal_code: "23220" },
  { street: "200 Granby St", city: "Norfolk", state: "VA", postal_code: "23510" },
  { street: "4101 Granby St", city: "Norfolk", state: "VA", postal_code: "23504" },
  { street: "12000 Jefferson Ave", city: "Newport News", state: "VA", postal_code: "23602" },
  { street: "499 Viking Dr", city: "Virginia Beach", state: "VA", postal_code: "23452" },
  { street: "2200 Colonial Ave", city: "Roanoke", state: "VA", postal_code: "24015" },
  { street: "5800 Wesleyan Dr", city: "Virginia Beach", state: "VA", postal_code: "23455" },
  { street: "100 N 1st St", city: "Richmond", state: "VA", postal_code: "23219" },
];

interface AddressAutocompleteFieldProps {
  street: string;
  city: string;
  state: string;
  postal_code: string;
  onChange: (next: { street: string; city: string; state: string; postal_code: string }) => void;
  onBlur?: (field: string) => void;
  errors: Record<string, string>;
  showError: (field: string) => boolean;
}

const inputStyle = (hasError: boolean): React.CSSProperties => ({
  width: "100%",
});

const fieldErrText = (msg: string) => (
  <p
    aria-live="polite"
    style={{
      marginTop: 6,
      fontFamily: "'Montserrat', sans-serif",
      fontSize: 12,
      color: "var(--error-red)",
    }}
  >
    {msg}
  </p>
);

const AddressAutocompleteField = ({
  street,
  city,
  state,
  postal_code,
  onChange,
  onBlur,
  errors,
  showError,
}: AddressAutocompleteFieldProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(street);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(street);
  }, [street]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onDocClick);
    return () => window.removeEventListener("mousedown", onDocClick);
  }, []);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return MOCK.slice(0, 5);
    return MOCK.filter(
      (m) =>
        m.street.toLowerCase().includes(q) ||
        m.city.toLowerCase().includes(q) ||
        m.postal_code.includes(q)
    ).slice(0, 6);
  }, [query]);

  const pick = (s: Suggestion) => {
    onChange(s);
    setQuery(s.street);
    setOpen(false);
  };

  const stError = showError("address.street") && errors["address.street"];
  const cityErr = showError("address.city") && errors["address.city"];
  const stateErr = showError("address.state") && errors["address.state"];
  const zipErr = showError("address.postal_code") && errors["address.postal_code"];

  return (
    <div className="space-y-4">
      <div ref={wrapperRef} className="w-full" style={{ position: "relative" }}>
        <label htmlFor="addr-street" className="intake-label mb-2 block">
          STREET ADDRESS
        </label>
        <div style={{ position: "relative" }}>
          <input
            id="addr-street"
            type="text"
            autoComplete="off"
            placeholder="Start typing your address…"
            className={`intake-input ${stError ? "intake-input--error" : ""}`}
            style={{ paddingLeft: 40 }}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onChange({ street: e.target.value, city, state, postal_code });
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => onBlur?.("address.street")}
          />
          <MapPin
            size={16}
            color="var(--text-label)"
            strokeWidth={2}
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          />
        </div>
        {stError && fieldErrText(errors["address.street"])}

        {open && matches.length > 0 && (
          <div
            role="listbox"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "100%",
              marginTop: 6,
              background: "var(--card-white)",
              border: "1px solid var(--input-border)",
              borderRadius: 12,
              boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
              zIndex: 20,
              overflow: "hidden",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            {matches.map((m) => (
              <button
                key={`${m.street}-${m.postal_code}`}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  pick(m);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  padding: "10px 14px",
                  background: "transparent",
                  border: "none",
                  textAlign: "left",
                  cursor: "pointer",
                  fontSize: 14,
                  color: "var(--text-primary)",
                  borderBottom: "1px solid var(--divider)",
                }}
              >
                <MapPin size={14} color="var(--accent-orange)" strokeWidth={2} />
                <span>
                  {m.street},{" "}
                  <span style={{ color: "var(--text-body)" }}>
                    {m.city}, {m.state} {m.postal_code}
                  </span>
                </span>
              </button>
            ))}
            <div
              style={{
                padding: "8px 14px",
                fontSize: 11,
                color: "var(--text-label)",
                background: "var(--input-bg)",
                letterSpacing: "0.04em",
              }}
            >
              Mockup suggestions · pick one or keep typing
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2" style={{ gap: 12 }}>
        <div>
          <label htmlFor="addr-city" className="intake-label mb-2 block">
            CITY
          </label>
          <input
            id="addr-city"
            className={`intake-input ${cityErr ? "intake-input--error" : ""}`}
            autoComplete="address-level2"
            value={city}
            onChange={(e) => onChange({ street, city: e.target.value, state, postal_code })}
            onBlur={() => onBlur?.("address.city")}
          />
          {cityErr && fieldErrText(errors["address.city"])}
        </div>
        <div>
          <label htmlFor="addr-state" className="intake-label mb-2 block">
            STATE
          </label>
          <select
            id="addr-state"
            value={state}
            onChange={(e) =>
              onChange({ street, city, state: e.target.value, postal_code })
            }
            onBlur={() => onBlur?.("address.state")}
            className={`intake-input ${stateErr ? "intake-input--error" : ""}`}
            autoComplete="address-level1"
            style={{
              appearance: "none",
              WebkitAppearance: "none",
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
              paddingRight: 36,
            }}
          >
            <option value="">—</option>
            {US_STATES.map((s) => (
              <option key={s.code} value={s.code}>
                {s.code}
              </option>
            ))}
          </select>
          {stateErr && fieldErrText(errors["address.state"])}
        </div>
      </div>

      <div>
        <label htmlFor="addr-zip" className="intake-label mb-2 block">
          ZIP CODE
        </label>
        <input
          id="addr-zip"
          className={`intake-input ${zipErr ? "intake-input--error" : ""}`}
          autoComplete="postal-code"
          inputMode="numeric"
          maxLength={10}
          value={postal_code}
          onChange={(e) =>
            onChange({ street, city, state, postal_code: e.target.value })
          }
          onBlur={() => onBlur?.("address.postal_code")}
        />
        {zipErr && fieldErrText(errors["address.postal_code"])}
      </div>
    </div>
  );
};

export default AddressAutocompleteField;
