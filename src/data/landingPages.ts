export type LpStatus = "live" | "draft" | "scaffold";
export type LpService = "trt" | "ed" | "weight-loss" | "general";

export interface LandingPageEntry {
  slug: string;
  name: string;
  service: LpService;
  status: LpStatus;
  primaryCta: string;
  notes?: string;
  updatedAt: string; // ISO date
}

/**
 * Internal directory of every paid-traffic landing page.
 * Append a new entry whenever a new LP variant ships. Keep `slug` unique.
 */
export const LANDING_PAGES: LandingPageEntry[] = [
  {
    slug: "/new",
    name: "TRT Hero (v1)",
    service: "trt",
    status: "live",
    primaryCta: "/book/symptom",
    notes: "Primary TRT funnel. Hero form posts to GHL via ghl-proxy.",
    updatedAt: "2026-05-13",
  },
];

export interface BookingStep {
  slug: string;
  name: string;
  description: string;
}

export const BOOKING_STEPS: BookingStep[] = [
  { slug: "/book/symptom", name: "Symptom", description: "User selects primary concern. Stores to URL state." },
  { slug: "/book/duration", name: "Duration", description: "How long the user has been dealing with the issue." },
  { slug: "/book/schedule", name: "Schedule", description: "Calendar slot picker. Renders real GHL availability only." },
  { slug: "/book/confirmed", name: "Confirmed", description: "Success page. Schedule conversion event fires here." },
  { slug: "/book/lets-talk", name: "Lets Talk", description: "Fallback when slot is taken or booking fails. Coordinator follow-up." },
];

export interface ComplianceLink {
  slug: string;
  name: string;
  required: boolean;
  exists: boolean;
  notes?: string;
}

export const COMPLIANCE_PAGES: ComplianceLink[] = [
  { slug: "/privacy", name: "Privacy Policy", required: true, exists: false, notes: "Required by Meta and Google before ad approval." },
  { slug: "/terms", name: "Terms of Service", required: true, exists: false, notes: "Required by Meta and Google before ad approval." },
  { slug: "/tcpa", name: "TCPA / SMS Disclosure", required: true, exists: false, notes: "Linked from every lead form." },
  { slug: "/accessibility", name: "Accessibility", required: false, exists: false },
];
