/**
 * Mask an email like "john@test.com" → "j***@t***.com".
 * Keeps first char of local part, first char of domain, and TLD intact.
 */
export const maskEmail = (email: string): string => {
  if (!email || !email.includes("@")) return email || "";
  const [local, domain] = email.split("@");
  const dotIdx = domain.lastIndexOf(".");
  if (dotIdx < 0) return `${local[0] ?? ""}***@${domain[0] ?? ""}***`;
  const host = domain.slice(0, dotIdx);
  const tld = domain.slice(dotIdx); // includes the dot
  const localMasked = `${local[0] ?? ""}***`;
  const hostMasked = `${host[0] ?? ""}***`;
  return `${localMasked}@${hostMasked}${tld}`;
};

/**
 * Mask a phone like "(757) 937-9990" → "(***) ***-9990".
 * Falls back gracefully for partial inputs.
 */
export const maskPhone = (phone: string): string => {
  const digits = (phone || "").replace(/\D/g, "");
  if (digits.length < 4) return "(***) ***-****";
  const last4 = digits.slice(-4);
  return `(***) ***-${last4}`;
};

export const firstNameFromFull = (full: string): string => {
  if (!full) return "";
  const raw = full.trim().split(/\s+/)[0] ?? "";
  if (!raw) return "";
  // Title Case so "JOHN" or "john" both render as "John"
  return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
};
