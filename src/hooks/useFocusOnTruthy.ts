import { useEffect, useRef } from "react";

/**
 * Move keyboard focus to a button when `trigger` becomes truthy, and
 * smooth-scroll it into view ONLY if it's not already fully visible.
 * Avoids the "snap" that vanilla `.scrollIntoView()` causes on mobile
 * when the target is already on screen.
 *
 * Usage:
 *   const ref = useFocusOnTruthy(selectedSlot);
 *   <button ref={ref}>Confirm</button>
 */
export function useFocusOnTruthy<T extends HTMLElement>(trigger: unknown) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!trigger) return;
    const el = ref.current;
    if (!el) return;
    el.focus({ preventScroll: true });
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const fullyVisible = r.top >= 0 && r.bottom <= vh;
    if (!fullyVisible) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }
  }, [trigger]);

  return ref;
}
