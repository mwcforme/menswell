/**
 * Display labels for booking enums. State storage now lives in
 * `src/domain/booking/bookingStore.ts` (Zustand + sessionStorage).
 *
 * PHI safety: there are no URL/query helpers here on purpose. Booking state
 * MUST NOT travel through the URL — see BookingRouteGuard.
 */

const LABELS = {
  location: {
    richmond: "Richmond",
    "newport-news": "Newport News",
    "virginia-beach": "Virginia Beach",
  } as Record<string, string>,
  symptom: {
    energy: "Low Energy / Fatigue",
    sexual: "Sexual Health Concerns",
    libido: "Sexual Health Concerns",
    weight: "Weight Gain / Difficulty Losing Weight",
    other: "Something else",
  } as Record<string, string>,
  duration: {
    lt6mo: "Less than 6 months",
    "6to12mo": "6 to 12 months",
    "1to2yr": "1 to 2 years",
    gt2yr: "More than 2 years",
  } as Record<string, string>,
};

export const labelFor = (
  field: "location" | "symptom" | "duration",
  value?: string,
) => (value ? LABELS[field][value] || value : "");
