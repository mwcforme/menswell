import { ChangeEvent, useState } from "react";
import TextField from "./TextField";

export const formatPhone = (raw: string) => {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

interface PhoneFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  showError?: boolean;
  required?: boolean;
}

const PhoneField = ({
  label = "PHONE",
  value,
  onChange,
  error,
  showError,
  required,
}: PhoneFieldProps) => {
  const [internal, setInternal] = useState(formatPhone(value));

  const handle = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setInternal(formatted);
    onChange(formatted.replace(/\D/g, ""));
  };

  return (
    <TextField
      label={label}
      type="tel"
      autoComplete="tel"
      inputMode="tel"
      placeholder="(555) 555-5555"
      value={internal}
      onChange={handle}
      error={error}
      showError={showError}
      required={required}
      maxLength={14}
    />
  );
};

export default PhoneField;
