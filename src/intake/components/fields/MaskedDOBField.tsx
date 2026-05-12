import { ChangeEvent, useState } from "react";
import TextField from "./TextField";

const formatDOB = (raw: string) => {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
};

export const validateDOB = (value: string): string | "" => {
  if (!value) return "";
  const m = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return "Use format MM/DD/YYYY";
  const [, mm, dd, yyyy] = m;
  const month = +mm;
  const day = +dd;
  const year = +yyyy;
  const now = new Date().getFullYear();
  if (month < 1 || month > 12) return "Invalid month";
  if (day < 1 || day > 31) return "Invalid day";
  if (year < 1920 || year > now) return `Year must be 1920–${now}`;
  return "";
};

interface MaskedDOBFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  showError?: boolean;
  required?: boolean;
}

const MaskedDOBField = ({
  label = "DATE OF BIRTH",
  value,
  onChange,
  error,
  showError,
  required,
}: MaskedDOBFieldProps) => {
  const [internal, setInternal] = useState(value);

  const handle = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDOB(e.target.value);
    setInternal(formatted);
    onChange(formatted);
  };

  return (
    <TextField
      label={label}
      type="text"
      autoComplete="bday"
      inputMode="numeric"
      placeholder="MM/DD/YYYY"
      value={internal}
      onChange={handle}
      error={error}
      showError={showError}
      required={required}
      maxLength={10}
    />
  );
};

export default MaskedDOBField;
