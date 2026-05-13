## Goal

Replace the current single-page `/quiz` with a multi-step, mobile-first TRT lead funnel modeled on jointitan.com/quiz, fully adapted to MWC's brand and compliance rules. Add a personalized `/quiz/approved` results page.

## Brand adaptations (locked by memory)

- **Colors:** Orange `#E8670A` (not Titan red) on Midnight Navy `#000814` (not pure black). Results page uses warm cream `#F5F0EB` over white.
- **Typography:** Oswald (display, ALL CAPS headings) + Inter (body). No Anton/Bebas.
- **Logo:** MWC wordmark only (`/logos/Text_Logo_white.png`), no globe.
- **Tone:** "men" not "guys", "Center" not "clinic", "Provider". No em-dashes anywhere in copy.
- **Compliance:** Drop the 10:00 countdown and the "20% or free" guarantee. Replace `$149→$49` with **"First visit on us."** TCPAConsent unchecked by default, gates submit. "Individual results vary" disclaimer on results page. No AI-generated faces.
- **Disqualification = soft route:** Anyone flagging a medical condition still completes lead capture. Submit tags the lead `needs_in_person_clearance` in GHL and routes them to `/book/lets-talk` instead of `/book/symptom`.

## Routing

- `/quiz` → multi-step funnel (replaces current page)
- `/quiz/approved` → personalized results page; redirect to `/quiz` if `mwc_quiz_v1.completed !== true`
- After completion, `/quiz` auto-redirects to `/quiz/approved`
- Dev-only "Reset Quiz" pill (bottom-right of `/quiz/approved`, only when `import.meta.env.DEV`)

## Step structure

```text
/quiz
 ├─ Step 1  SYMPTOM ASSESSMENT  (progress 0–60%)
 ├─ Transition A — "ANALYZING YOUR ASSESSMENT" (2.5s)
 ├─ Step 2  SAFETY CHECK         (progress 60–85%)
 ├─ Step 3  LEAD CAPTURE         (progress 85–100%)
 ├─ Transition B — "FINALIZING YOUR RESULTS" (~4s)
 └─ /quiz/approved
```

No back button. No step counter. Sticky orange CTA on quiz steps (mobile-first).

### Step 1 — Symptom Assessment
- Headline: `TAKE OUR 60-SECOND ASSESSMENT` / `TO SEE IF TRT IS RIGHT FOR YOU` (line 2 in orange).
- 7 categories, 23 symptoms total (per brief), each row a Navy-tinted card with Lucide icon + 0/1/2/3 segmented control. Selected number = orange fill, white text.
- **Sequential unlock** within each category (row N disabled until N-1 answered, opacity 40, smooth scroll-into-view on advance). Category 7 (Digestive) unlocks all rows simultaneously.
- Inline orange-red error "Please select an option." under any unanswered row when CTA pressed.
- CTA: `GET MY RESULTS` (orange, full-width sticky on mobile).

### Step 2 — Safety Check
- Headline: `QUICK SAFETY CHECK`
- Multi-select tile checkboxes. "None of the below" rendered first with divider; mutually exclusive with the 7 medical conditions (per brief, verbatim).
- CTA: `NEXT`. Branching:
  - "None of the below" only → Step 3 with `disqualified: false`.
  - Any medical condition → Step 3 with `disqualified: true` (soft route — still capture lead per user decision).

### Step 3 — Lead Capture
- Headline: `WHERE SHOULD WE SEND MY RESULTS?` (uses MWC "My" ownership language).
- Fields: **Full Name** (per MWC standard, not "First Name"), Email, Phone (auto-format `(XXX) XXX-XXXX`), State (US dropdown).
- TCPAConsent checkbox, unchecked, blocks submit. Standard MWC TCPA copy.
- Trust badge: "256-Bit Encrypted. Private. HIPAA-conscious." (no shield emoji, use Lucide Lock).
- One short testimonial card below.
- CTA: `SHOW MY RESULTS` → Transition B → `/quiz/approved`.

### Transitions
- A (post-Step 1, 2.5s) and B (post-Step 3, ~4s): full-screen Navy, centered logo, Oswald headline, orange spinner. B includes a 0→100% progress bar and three checklist items ticking off ("Confirming clinical eligibility", "Analyzing symptom patterns", "Preparing my personalized report").

## /quiz/approved (results page)

White background `#FFFFFF` body, sticky black topbar (logo left, phone right). 10 sections per the brief, with these MWC adjustments:

| # | Section | Notes |
|---|---|---|
| 1 | `[FIRST_NAME]'S ASSESSMENT RESULTS` | Personalized, Oswald all caps |
| 2 | Testosterone status card | Gradient slider with indicator dot. **No stock face image** (memory: no AI faces, prefer authentic). Use a clean clinical illustration or omit. |
| 3 | Top symptom categories | Render top 3–5 scoring categories with severity badges (Severe `#E11D2E` / Moderate `#F59E0B` / Mild `#10B981`). Hide zero-score categories. |
| 4 | "WHY ACT NOW" risk list | Per brief, qualitative phrasing per FTC compliance memory. |
| 5 | TRT outcome promise | Headline rewritten to avoid "feel like a man again" (banned tone). Use **"PROVEN TO RESTORE ENERGY, STRENGTH AND DRIVE."** Keep `130%+ in 6 months` claim with the clinical-studies fine print verbatim. |
| 6 | 3 Next-Steps cards | Adapted to MWC's in-person model: `1. SCHEDULE MY VISIT` / `2. IN-PERSON LABS AND EVALUATION` / `3. PERSONALIZED PROTOCOL` (face-to-face, not video). |
| 7 | Offer | **Drop countdown.** **Drop "guarantee" box.** Replace pricing with `FIRST VISIT ON US` block + included items. Primary CTA `BOOK MY CONSULT` → `/book/symptom` (or `/book/lets-talk` if disqualified). |
| 8 | 5 testimonials | Use the 5 quotes from the brief, attributed as "Verified MWC patient." Plain stacked cards (memory: high-conversion plain text format). |
| 9 | "WEEK BY WEEK" 3 columns | Per brief, qualitative outcomes only. |
| 10 | FAQ accordion | Per brief, with FAQPage JSON-LD schema. Use existing FAQUnified component (orange chevron). |

Plus footer: legal links (Privacy, Terms, HIPAA), © 2026.

## State + persistence

```ts
// src/lib/quizState.ts
type QuizAnswer = 0 | 1 | 2 | 3;
interface QuizState {
  symptoms: Record<string, QuizAnswer | null>;     // 23 keys
  safetyConditions: string[];                       // [] | ['none'] | ['prostate_cancer', ...]
  fullName: string; email: string; phone: string; state: string;
  consent: boolean;
  currentStep: 1 | 2 | 3 | 'processing' | 'finalizing' | 'approved';
  completed: boolean;
  disqualified: boolean;
  startedAt: string; completedAt?: string;
  totalScore: number;                               // 0–69
  categoryScores: Record<CategoryId, { sum: number; tier: 'None'|'Mild'|'Moderate'|'Severe' }>;
  utm: { source?:string; medium?:string; campaign?:string; term?:string; content?:string };
}
```

- Single `useQuizState` hook backed by `sessionStorage` key `mwc_quiz_v1`.
- Tier mapping per category sum: `0→None`, `1–2→Mild`, `3–5→Moderate`, `6+→Severe`.
- Persist on every change. Reset helper exposed for dev button.

## Submit pipeline (reuses existing infra)

On Step 3 submit, fire **one** call to the existing `useLeadSubmitController` (which already POSTs through `ghl-proxy` and triggers `meta-capi`):

- `source: "trt-quiz-v2"`
- `tags`: `quiz_score:N`, `quiz_bracket:severe|moderate|mild|minimal`, `quiz_tier_<category>:<tier>` for each scoring category, plus `needs_in_person_clearance` if disqualified.
- `note`: serialized symptom and safety summary so the clinical team sees it.
- `attribution` (UTMs + gclid/fbclid) is already auto-attached via `src/lib/attribution.ts`.

On success → Transition B → `/quiz/approved` with state already in sessionStorage. No new edge function needed.

## File plan

```text
src/pages/TRTQuiz.tsx                    REWRITE — becomes the multi-step shell
src/pages/TRTQuizApproved.tsx            NEW    — /quiz/approved results page
src/components/quiz/QuizShell.tsx        NEW    — progress bar, logo, sticky CTA frame
src/components/quiz/StepSymptoms.tsx     NEW
src/components/quiz/StepSafety.tsx       NEW
src/components/quiz/StepLead.tsx         NEW
src/components/quiz/TransitionScreen.tsx NEW    — used for both A and B
src/components/quiz/SymptomRow.tsx       NEW    — sequential-unlock segmented control
src/components/quiz/results/*.tsx        NEW    — TestosteroneCard, SymptomBadges,
                                                 NextSteps, Offer, WeekByWeek, ResultsFAQ
src/data/quizContent.ts                  NEW    — categories, symptoms, safety options,
                                                 FAQ items, testimonials, US states
src/lib/quizState.ts                     NEW    — useQuizState hook + scoring helpers
src/App.tsx                              EDIT   — add /quiz/approved route
src/data/landingPages.ts                 EDIT   — bump quiz entry
```

## Acceptance criteria (delta from brief)

All brief criteria PLUS:
- Renders cleanly at 360px width (MWC mobile floor) without horizontal scroll.
- TCPA checkbox unchecked by default and gates submit.
- No countdown timer present.
- No "guarantee or it's free" copy present.
- Disqualified leads still POST to GHL with the `needs_in_person_clearance` tag.
- Sticky CTA on quiz steps does not overlap last symptom row (uses `pb-32 safe-area-inset-bottom`).
- Single H1 per route. FAQPage JSON-LD on `/quiz/approved` matches visible text exactly.
- Final submit logs full payload via existing analytics + capi paths; no new console.log stub.

## Out of scope

- Nice-to-haves (Framer transitions, particle bg, print stylesheet) — defer until after baseline ships.
- New `/api/lead` endpoint — uses existing GHL proxy.
- Real testosterone-curve chart asset — use a simple SVG line illustration in code; commission real chart later.
