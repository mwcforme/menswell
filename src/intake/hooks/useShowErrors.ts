import { useState, useCallback } from "react";

/**
 * "Show errors after first blur OR first CTA tap" UX helper.
 * - markBlur(field) flips that field's flag
 * - revealAll() flips a global flag (call from CTA click before validation)
 * - shouldShow(field) returns true when either flag is set
 */
export const useShowErrors = () => {
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [revealed, setRevealed] = useState(false);

  const markBlur = useCallback((field: string) => {
    setTouched((t) => (t[field] ? t : { ...t, [field]: true }));
  }, []);

  const revealAll = useCallback(() => setRevealed(true), []);

  const shouldShow = useCallback(
    (field: string) => revealed || !!touched[field],
    [revealed, touched]
  );

  return { markBlur, revealAll, shouldShow };
};
