import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface SavedIndicatorProps {
  /** Change this value (e.g. a serialized state hash or counter) to trigger the indicator */
  trigger: unknown;
}

/**
 * Debounced "Saved" pill. Waits 400ms of quiet time after the last change
 * before flashing — keeps it from flickering during rapid typing.
 */
const SavedIndicator = ({ trigger }: SavedIndicatorProps) => {
  const [visible, setVisible] = useState(false);
  const firstRender = useRef(true);
  const debounceRef = useRef<number | null>(null);
  const hideRef = useRef<number | null>(null);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    if (hideRef.current) window.clearTimeout(hideRef.current);

    debounceRef.current = window.setTimeout(() => {
      setVisible(true);
      hideRef.current = window.setTimeout(() => setVisible(false), 1200);
    }, 400);

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      if (hideRef.current) window.clearTimeout(hideRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute flex items-center gap-1.5"
          style={{ right: 16, bottom: 12 }}
          aria-live="polite"
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 9999,
              backgroundColor: "var(--success-green)",
            }}
          />
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              color: "var(--success-green)",
              letterSpacing: "0.04em",
            }}
          >
            Saved
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SavedIndicator;
