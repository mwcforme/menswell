import { ChangeEvent } from "react";
import TextField from "./TextField";

interface EmailFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  showError?: boolean;
  required?: boolean;
}

const EmailField = ({
  label = "EMAIL",
  value,
  onChange,
  error,
  showError,
  required,
}: EmailFieldProps) => (
  <TextField
    label={label}
    type="email"
    autoComplete="email"
    inputMode="email"
    placeholder="you@example.com"
    value={value}
    onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    error={error}
    showError={showError}
    required={required}
  />
);

export default EmailField;
