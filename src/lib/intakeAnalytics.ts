// Lightweight GTM/dataLayer hooks for the intake funnel.
// Safe no-ops when window.dataLayer is not present.

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const push = (event: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
};

export const trackStepView = (step: number) =>
  push({ event: "intake_step_view", step });

export const trackSubmitted = () => push({ event: "intake_submitted" });

export const trackSubmitError = (error?: string) =>
  push({ event: "intake_submit_error", error });
