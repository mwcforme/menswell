import { InputHTMLAttributes, forwardRef, useState } from "react";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  /** Show error only after first blur or external trigger */
  showError?: boolean;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, showError, id, onBlur, className, ...rest }, ref) => {
    const [touched, setTouched] = useState(false);
    const visibleError = (showError || touched) && error ? error : "";
    const reactId = useState(() => `intake-${Math.random().toString(36).slice(2, 9)}`)[0];
    const inputId = id ?? reactId;

    return (
      <div className="w-full">
        <label htmlFor={inputId} className="intake-label mb-2 block">
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          aria-invalid={!!visibleError}
          aria-describedby={visibleError ? `${inputId}-error` : undefined}
          className={`intake-input ${visibleError ? "intake-input--error" : ""} ${className ?? ""}`}
          onBlur={(e) => {
            setTouched(true);
            onBlur?.(e);
          }}
          {...rest}
        />
        {visibleError && (
          <p
            id={`${inputId}-error`}
            aria-live="polite"
            style={{
              marginTop: 6,
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 12,
              color: "var(--error-red)",
            }}
          >
            {visibleError}
          </p>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";
export default TextField;
