import { TextareaHTMLAttributes, forwardRef, useState } from "react";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  showError?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
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
        <textarea
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

TextArea.displayName = "TextArea";
export default TextArea;
