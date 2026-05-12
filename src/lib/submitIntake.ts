import type { IntakeState } from "@/types/intake";

export interface SubmitResult {
  ok: boolean;
  error?: string;
  payload?: IntakeState;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const postOnce = async (url: string, payload: IntakeState): Promise<SubmitResult> => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) return { ok: true, payload };
    return { ok: false, error: `HTTP ${res.status}`, payload };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Network error",
      payload,
    };
  }
};

/**
 * Submit the intake to VITE_WEBHOOK_URL (POST JSON).
 * - Stamps submitted_at + signature.signed_at with the same ISO timestamp.
 * - Retries once on network/5xx error after 1s backoff.
 * - When no webhook is configured, logs the payload and resolves ok after a
 *   600ms delay so the loading screen still demos correctly.
 */
export const submitIntake = async (state: IntakeState): Promise<SubmitResult> => {
  const now = new Date().toISOString();
  const payload: IntakeState = {
    ...state,
    submitted_at: now,
    signature: { ...state.signature, signed_at: now },
  };

  const url = import.meta.env.VITE_WEBHOOK_URL as string | undefined;

  if (!url) {
    // Demo mode — no webhook configured.
    // eslint-disable-next-line no-console
    console.log("[intake] VITE_WEBHOOK_URL not set. Payload:", payload);
    await sleep(600);
    return { ok: true, payload };
  }

  const first = await postOnce(url, payload);
  if (first.ok) return first;

  // Retry once after 1s backoff
  await sleep(1000);
  const second = await postOnce(url, payload);
  return second;
};
