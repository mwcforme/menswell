// Single source of truth for the /bookv2 mockup spec.
// Each annotation maps to a `data-spec-id` attribute on the live funnel.
// The dev team can read this file directly as a flat reference.

export type AnnotationType = "screen" | "field" | "button" | "behavior" | "copy";

export interface SpecAnnotation {
  id: string; // matches data-spec-id on the element
  step: number; // 1-8 (also includes 0 for chrome like progress bar)
  number: number; // visible numeric badge per step
  label: string;
  type: AnnotationType;
  required?: boolean;
  validation?: string;
  behavior?: string;
  copyRationale?: string;
  notes?: string;
}

export const STEP_NAMES: Record<number, string> = {
  0: "Chrome (header / progress / back)",
  1: "Step 1 — Name, Phone, Location",
  2: "Step 2 — Primary Concern",
  3: "Step 3 — Duration",
  4: "Step 4 — Prior Treatment",
  5: "Step 5 — Email",
  6: "Step 6 — Calendar & Time",
  7: "Step 7 — Verify (double opt-in)",
  8: "Step 8 — Confirmed",
};

export const SPEC_ANNOTATIONS: SpecAnnotation[] = [
  // ────────────────────────────────────────────────────────
  // Chrome (step 0)
  // ────────────────────────────────────────────────────────
  {
    id: "chrome-progressbar",
    step: 0,
    number: 1,
    label: "Progress bar (4 phases)",
    type: "behavior",
    behavior:
      "4 segments map to phases YOU (step 1) / YOUR VISIT (steps 2-4) / YOUR TIME (steps 5-6) / CONFIRMED (steps 7-8). Fill animates over 300ms. Verify (step 7) shows the final segment 50% filled; Confirmed (step 8) fills it 100%.",
    copyRationale:
      "Phase labels reduce perceived form length by grouping 8 sub-steps into 4 narrative chunks aligned with user intent.",
  },
  {
    id: "chrome-back",
    step: 0,
    number: 2,
    label: "Back button",
    type: "behavior",
    behavior:
      "Visible on steps 2-7. Hidden on step 1 (no prior step) and step 8 (booking is final). Reverses slide transition direction (right slide-in).",
  },

  // ────────────────────────────────────────────────────────
  // Step 1 — Name / Phone / Location
  // ────────────────────────────────────────────────────────
  {
    id: "step1-screen",
    step: 1,
    number: 1,
    label: "Screen 1 — Lead Capture",
    type: "screen",
    behavior:
      "Captures firstName, phone, location, smsConsent. Submits via 'Schedule My Consultation' CTA which advances to step 2.",
    copyRationale:
      "First screen sets cinematic dark hero tone; white card holds the form for contrast and clarity. Trust line + reviews above the card frame credibility before the ask.",
  },
  {
    id: "step1-firstname",
    step: 1,
    number: 2,
    label: "Full Name field",
    type: "field",
    required: true,
    validation: "Trimmed, non-empty string. No max length enforced.",
    behavior:
      "Stored as formData.firstName. Used in Step 8 confirmation heading ('You're Confirmed, {firstName}.').",
    copyRationale:
      "Label says 'Full Name' but state key is 'firstName' (legacy). Placeholder 'John' personalizes immediately and lowers friction vs 'Enter your full name'.",
  },
  {
    id: "step1-phone",
    step: 1,
    number: 3,
    label: "Phone Number field",
    type: "field",
    required: true,
    validation: "Trimmed, non-empty. No format mask applied at input level (mockup phase).",
    behavior:
      "Stored as formData.phone. Used downstream in Step 6 summary, Step 7 verification card, and Step 8 confirmation.",
    copyRationale:
      "Placeholder '(555) 555-5555' demonstrates expected US format without forcing a mask that breaks copy/paste.",
  },
  {
    id: "step1-location",
    step: 1,
    number: 4,
    label: "Location selector (3 cards)",
    type: "field",
    required: true,
    validation: "Must equal one of: 'richmond' | 'newport-news' | 'virginia-beach'.",
    behavior:
      "Single-select card group. Stored as formData.location (slug). Display label resolved via locationLabels map in BookingFunnelV2.",
    copyRationale:
      "Card-style picker (vs dropdown) reinforces in-person, multi-center positioning and is thumb-friendly on mobile.",
  },
  {
    id: "step1-consent",
    step: 1,
    number: 5,
    label: "TCPA SMS consent checkbox",
    type: "field",
    required: false,
    validation: "Optional. Default unchecked per legal/compliance-and-forms memory.",
    behavior:
      "Does NOT block CTA submission (consent is optional). Stored as formData.smsConsent.",
    copyRationale:
      "Required TCPA language verbatim: 'Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out.' Default unchecked is mandatory.",
  },
  {
    id: "step1-cta",
    step: 1,
    number: 6,
    label: "Primary CTA — Schedule My Consultation",
    type: "button",
    behavior:
      "Enabled only when firstName, phone, AND location are all truthy. SMS consent NOT required. Submits all four fields and advances to step 2.",
    copyRationale:
      "First-person 'My' framing per brand/copy-standards/ownership-language. Orange #E8670A fill per cta-standardization.",
  },
  {
    id: "step1-trustline",
    step: 1,
    number: 7,
    label: "Trust line (reviews + treated count)",
    type: "copy",
    copyRationale:
      "'4.9 Google Reviews · 10,000+ Men Treated' — exact static numbers per content/brand-metrics. Star icon in accent orange #E8670A.",
  },
  {
    id: "step1-trustbadges",
    step: 1,
    number: 8,
    label: "Trust badge row",
    type: "copy",
    copyRationale:
      "LegitScript / 3 VA Centers / Since 2015 / FDA-Approved Therapies — institutional credibility for the 45-65 male persona.",
  },

  // ────────────────────────────────────────────────────────
  // Step 2 — Primary Concern
  // ────────────────────────────────────────────────────────
  {
    id: "step2-screen",
    step: 2,
    number: 1,
    label: "Screen 2 — Primary Concern",
    type: "screen",
    behavior:
      "Single-select card list. Selection auto-advances to step 3 after 300ms (visual confirmation of choice before transition).",
    copyRationale:
      "Card-based qualification feels lower-friction than a dropdown and pre-qualifies intent for the provider.",
  },
  {
    id: "step2-heading",
    step: 2,
    number: 2,
    label: "Heading copy",
    type: "copy",
    copyRationale:
      "'What Brings You In?' — conversational, mirrors what a front-desk staff member would ask. Avoids clinical jargon.",
  },
  {
    id: "step2-cards",
    step: 2,
    number: 3,
    label: "Concern options (4)",
    type: "field",
    required: true,
    validation:
      "Stored as formData.primaryConcern. Allowed values: 'energy' | 'sex-drive' | 'weight' | 'other'.",
    behavior:
      "On click: setSelected → 300ms delay → onNext(value). Selected card animates to orange border + checkmark.",
    copyRationale:
      "4 options cover the dominant TRT/ED/Weight Loss verticals plus an 'Other' escape hatch for soft-pitch leads.",
  },

  // ────────────────────────────────────────────────────────
  // Step 3 — Duration
  // ────────────────────────────────────────────────────────
  {
    id: "step3-screen",
    step: 3,
    number: 1,
    label: "Screen 3 — Symptom Duration",
    type: "screen",
    behavior: "Single-select. Auto-advances to step 4 after 300ms on selection.",
    copyRationale:
      "Time-on-symptom helps the provider triage urgency and treatment depth without requiring clinical questions.",
  },
  {
    id: "step3-cards",
    step: 3,
    number: 2,
    label: "Duration options (4)",
    type: "field",
    required: true,
    validation:
      "Stored as formData.duration. Allowed values: '<6mo' | '6-12mo' | '1-2yr' | '2+yr'.",
    behavior: "Auto-advance with same 300ms confirm pattern as Step 2.",
    copyRationale:
      "Bucketed ranges (vs free text) keep the question scannable and respect that men in this demographic estimate, not measure.",
  },

  // ────────────────────────────────────────────────────────
  // Step 4 — Prior Treatment
  // ────────────────────────────────────────────────────────
  {
    id: "step4-screen",
    step: 4,
    number: 1,
    label: "Screen 4 — Prior Treatment",
    type: "screen",
    behavior: "Binary Yes/No. Auto-advances to step 5 after 300ms.",
    copyRationale:
      "Single binary signals whether to skip basics during the visit. Subtitle reassures both answers are equally welcome ('Either way, we'll build a plan that works for you.').",
  },
  {
    id: "step4-yes",
    step: 4,
    number: 2,
    label: "Yes button",
    type: "field",
    required: true,
    validation: "Stored as formData.priorTreatment = true.",
    behavior: "Selected state fills orange #E8670A with white text (high-emphasis).",
  },
  {
    id: "step4-no",
    step: 4,
    number: 3,
    label: "No button",
    type: "field",
    required: true,
    validation: "Stored as formData.priorTreatment = false (default).",
    behavior: "Same orange-fill selected state as Yes.",
  },

  // ────────────────────────────────────────────────────────
  // Step 5 — Email
  // ────────────────────────────────────────────────────────
  {
    id: "step5-screen",
    step: 5,
    number: 1,
    label: "Screen 5 — Email",
    type: "screen",
    behavior:
      "Email captured here (not Step 1) to defer the highest-friction field after the user has invested in 4 prior steps (sunk-cost commitment principle).",
    copyRationale:
      "Heading frames email as a benefit ('Where Should We Email Your Consultation Details?') rather than a data ask.",
  },
  {
    id: "step5-email",
    step: 5,
    number: 2,
    label: "Email field",
    type: "field",
    required: true,
    validation:
      "Trimmed, must contain '@' AND '.'. Lightweight client check; full RFC validation happens server-side.",
    behavior: "Stored as formData.email. CTA disabled until valid.",
  },
  {
    id: "step5-cta",
    step: 5,
    number: 3,
    label: "CTA — Pick My Time",
    type: "button",
    behavior: "Submits email and advances to step 6 (calendar).",
    copyRationale:
      "Forward-looking copy; the user is told what's next, not what they just did. First-person 'My'.",
  },

  // ────────────────────────────────────────────────────────
  // Step 6 — Calendar & Time
  // ────────────────────────────────────────────────────────
  {
    id: "step6-screen",
    step: 6,
    number: 1,
    label: "Screen 6 — Calendar & Time Picker",
    type: "screen",
    behavior:
      "Date and time selection. Past dates disabled. Selecting a date resets selectedTime. CTA enabled only when both date and time are chosen.",
  },
  {
    id: "step6-urgency",
    step: 6,
    number: 2,
    label: "Urgency banner (green dot + same-day copy)",
    type: "copy",
    copyRationale:
      "Same-day availability framed as a live status (green pulse dot) to drive immediate action without false scarcity.",
  },
  {
    id: "step6-trustrow",
    step: 6,
    number: 3,
    label: "Trust signal row",
    type: "copy",
    copyRationale:
      "'Private & Discreet · Physician-Led · Results Same Day' addresses the three top objections of the 45-65 male persona at the moment of commitment.",
  },
  {
    id: "step6-monthnav",
    step: 6,
    number: 4,
    label: "Month navigation",
    type: "behavior",
    behavior:
      "Previous month disabled when viewing current month/year. Next has no upper bound (mockup). Changing month clears selectedDay and selectedTime.",
  },
  {
    id: "step6-grid",
    step: 6,
    number: 5,
    label: "Calendar day grid",
    type: "field",
    required: true,
    validation: "Stored as selectedDay (number). Past dates disabled and rendered in grey.",
    behavior:
      "Available days show a small orange dot. Selected day fills orange #E8670A with white numeral.",
  },
  {
    id: "step6-times",
    step: 6,
    number: 6,
    label: "Available time slots",
    type: "field",
    required: true,
    validation: "Stored as formData.selectedTime (e.g. '9:00 AM').",
    behavior:
      "Hidden until a date is selected; placeholder copy 'Select a date above to see available times' shown in italic grey. Pill chips, single-select.",
  },
  {
    id: "step6-summary",
    step: 6,
    number: 7,
    label: "Booking summary line",
    type: "copy",
    copyRationale:
      "Echoes back firstName · phone · email so the user can double-check before final commit. Reduces post-confirmation 'did I enter that right?' anxiety.",
  },
  {
    id: "step6-reminder",
    step: 6,
    number: 8,
    label: "SMS reminder opt-in",
    type: "field",
    required: false,
    validation: "Default checked: true. Stored as formData.smsReminder.",
    behavior: "Separate from the Step 1 TCPA consent — this is appointment-specific.",
    copyRationale:
      "Default-on because a missed appointment is more costly to the user than an opt-out tap. STOP language included.",
  },
  {
    id: "step6-cta",
    step: 6,
    number: 9,
    label: "CTA — Confirm My Appointment",
    type: "button",
    behavior:
      "Enabled only when both date and time selected. Advances to Step 7 (Verify) — does NOT jump straight to confirmation.",
  },
  {
    id: "step6-nopressure",
    step: 6,
    number: 10,
    label: "'No Pressure. Just Answers.' section",
    type: "copy",
    copyRationale:
      "Three-card explainer placed below the fold to neutralize sales-pitch fears at the highest-anxiety step. First-person 'My' throughout.",
  },

  // ────────────────────────────────────────────────────────
  // Step 7 — Verify (double opt-in)
  // ────────────────────────────────────────────────────────
  {
    id: "step7-screen",
    step: 7,
    number: 1,
    label: "Screen 7 — Verify (double opt-in)",
    type: "screen",
    behavior:
      "VISUAL ONLY in current build. No backend send wired. Renders between Step 6 (Calendar) and Step 8 (Confirmed). User is expected to confirm via real email/SMS in production; in mockup they reach Step 8 only via a separate 'I've Confirmed' action (currently removed — needs product decision).",
    notes:
      "Pending product decision: how does the user advance from Verify to Confirmed without a CTA? Options: (a) auto-advance after N seconds, (b) require email/SMS link click, (c) restore an 'I've Confirmed' button.",
  },
  {
    id: "step7-icons",
    step: 7,
    number: 2,
    label: "Icon pair (Mail + MessageSquare)",
    type: "copy",
    copyRationale:
      "Dual icons mirror the dual-channel double opt-in (email AND phone), set the visual frame before the heading reads.",
  },
  {
    id: "step7-heading",
    step: 7,
    number: 3,
    label: "Heading — 'You're Almost There!'",
    type: "copy",
    copyRationale:
      "Bebas Neue, 48px, white. Maintains editorial hierarchy of Step 8. Per recent user feedback, may be replaced with 'Last Step' or 'One More Step' (pending decision).",
  },
  {
    id: "step7-body",
    step: 7,
    number: 4,
    label: "Body copy — confirmation instruction",
    type: "copy",
    copyRationale:
      "Explicit 'isn't booked until you click it' language enforces the double opt-in mental model and protects against no-shows.",
  },
  {
    id: "step7-helper",
    step: 7,
    number: 5,
    label: "Helper line with phone fallback",
    type: "copy",
    copyRationale:
      "Phone number rendered as tel: link in white for thumb-tap fallback if email/SMS doesn't arrive.",
  },
  {
    id: "step7-emailcard",
    step: 7,
    number: 6,
    label: "Email confirmation card",
    type: "copy",
    behavior: "Renders captured formData.email; falls back to 'your email' if empty.",
    copyRationale:
      "Echoing the captured email lets the user spot a typo before they go hunt for an email that won't arrive.",
  },
  {
    id: "step7-phonecard",
    step: 7,
    number: 7,
    label: "Phone confirmation card",
    type: "copy",
    behavior: "Renders captured formData.phone; falls back to 'your phone' if empty.",
    copyRationale:
      "Same typo-catch logic as the email card. Phone shown as-is (no formatting reformat).",
  },
  {
    id: "step7-resend",
    step: 7,
    number: 8,
    label: "Resend confirmation link",
    type: "behavior",
    behavior:
      "Currently console.logs the email/phone payload. No backend send wired — needs API integration.",
    notes: "Stub. Wire to backend resend endpoint with rate limiting.",
  },

  // ────────────────────────────────────────────────────────
  // Step 8 — Confirmed
  // ────────────────────────────────────────────────────────
  {
    id: "step8-screen",
    step: 8,
    number: 1,
    label: "Screen 8 — Confirmation",
    type: "screen",
    behavior:
      "Final state. On mount, console.logs the full booking payload (replace with API submit in production).",
  },
  {
    id: "step8-checkmark",
    step: 8,
    number: 2,
    label: "Animated checkmark",
    type: "copy",
    copyRationale:
      "SVG draw-on animation provides the tactile 'something just happened' moment. No sound.",
  },
  {
    id: "step8-heading",
    step: 8,
    number: 3,
    label: "Heading — 'You're Confirmed, {firstName}.'",
    type: "copy",
    copyRationale:
      "Personalization with captured firstName creates immediate ownership. Period after name is intentional (declarative, closed loop).",
  },
  {
    id: "step8-summary",
    step: 8,
    number: 4,
    label: "Appointment summary card",
    type: "copy",
    behavior: "Renders Date / Time / Location / Phone rows from formData.",
    copyRationale:
      "Receipt-style card so the user has a printable / screenshot-able artifact of their booking.",
  },
  {
    id: "step8-calendar",
    step: 8,
    number: 5,
    label: "Add-to-calendar buttons",
    type: "behavior",
    behavior:
      "Currently presentational. Need to wire to ICS download (Apple/Outlook) and Google Calendar deep link.",
    notes: "Stub buttons. Wire ICS generation + Google Calendar URL builder.",
  },
  {
    id: "step8-healthform",
    step: 8,
    number: 6,
    label: "Health form upsell card",
    type: "behavior",
    behavior:
      "Routes to /intake (Jotform embed). Conversion rate target: ~40% complete pre-visit.",
    copyRationale:
      "Frame as user benefit ('Skip the Waiting Room') not clinic convenience. 3-minute time anchor reduces friction.",
  },
  {
    id: "step8-expect",
    step: 8,
    number: 7,
    label: "What to Expect list",
    type: "copy",
    copyRationale:
      "Concrete preparation reduces day-of anxiety and no-show rate. Phone number repeated as final fallback.",
  },
  {
    id: "step8-referral",
    step: 8,
    number: 8,
    label: "Referral / share button",
    type: "behavior",
    behavior:
      "Uses Web Share API where available; falls back to clipboard copy + alert. Share URL hard-coded to /book.",
  },
  {
    id: "step8-trustfooter",
    step: 8,
    number: 9,
    label: "Trust badge footer",
    type: "copy",
    copyRationale:
      "Final reinforcement of credibility post-conversion to support social sharing decision.",
  },
];

// Helper: get all annotations for a given step (sorted by number).
export const getAnnotationsForStep = (step: number): SpecAnnotation[] =>
  SPEC_ANNOTATIONS.filter((a) => a.step === step || a.step === 0).sort(
    (a, b) => a.step - b.step || a.number - b.number,
  );
