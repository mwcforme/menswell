/**
 * Approved wording map for CTAs, badges, and offer copy.
 *
 * SINGLE SOURCE OF TRUTH. Do NOT hardcode CTA/badge labels in components,
 * import from here instead. The word "free" is BANNED across all surfaces;
 * use "no-cost" / "no obligation" / "no commitment" only.
 *
 * If a new phrase is needed, add it here so it can be reviewed in one place.
 */

export const COPY = {
  cta: {
    /** Primary booking CTA. Used by header, hero, locations, results, sticky bar, final CTA. */
    bookConsult: "Book My Consult",
    /** Inline link variant (e.g. inside FAQ answers). */
    bookConsultInline: "Book a no-cost consult",
    /** Phone CTA prefix. */
    callNow: "Call Now",
  },
  badge: {
    /** Hero pill / trust chip describing the offer. */
    noCostConsult: "No-cost consult",
    /** Stat-card value used in CredibilityBand. */
    offerValue: "No-Cost",
    /** Stat-card label paired with offerValue. */
    offerLabel: "Initial Consult\nNo Obligation",
  },
  offer: {
    /** Hero subhead under the H1. */
    heroSubhead: "No-cost consult. No commitment, no pressure.",
    /** Final CTA / WL / ED subhead. */
    finalSubhead: "No-cost consult. Same- or next-day visits.",
    /** Manifesto / proof closer. */
    manifestoTag: "No-obligation consult. Individual results vary.",
    /** Reschedule reassurance bullet. */
    cancelReschedule: "Cancel or reschedule at no charge, anytime.",
  },
} as const;

export type CopyKey = typeof COPY;
