import { AnimatePresence, motion, useDragControls, type PanInfo } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface ConsentDrawerProps {
  open: boolean;
  title: string;
  body: string;
  onClose: () => void;
}

const ConsentDrawer = ({ open, title, body, onClose }: ConsentDrawerProps) => {
  const dragControls = useDragControls();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const handleDragEnd = (_e: unknown, info: PanInfo) => {
    // Dismiss if user dragged > 100px down or flicked with downward velocity > 500
    if (info.offset.y > 100 || info.velocity.y > 500) onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              zIndex: 100,
            }}
          />
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="consent-drawer-title"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={handleDragEnd}
            style={{
              position: "fixed",
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 101,
              background: "var(--card-white)",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              maxHeight: "85vh",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 -8px 32px rgba(0,0,0,0.25)",
            }}
          >
            {/* Drag handle area — only this region initiates the swipe */}
            <div
              onPointerDown={(e) => dragControls.start(e)}
              style={{
                padding: "10px 0 6px",
                cursor: "grab",
                touchAction: "none",
              }}
              aria-hidden
            >
              <div
                className="mx-auto"
                style={{
                  width: 40,
                  height: 4,
                  background: "var(--input-border)",
                  borderRadius: 9999,
                }}
              />
            </div>
            <div className="flex items-start justify-between" style={{ padding: "6px 20px 0" }}>
              <h3 id="consent-drawer-title" className="intake-h2" style={{ fontSize: 22 }}>
                {title}
              </h3>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                style={{
                  background: "var(--input-bg)",
                  border: "none",
                  borderRadius: 9999,
                  width: 36,
                  height: 36,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={18} color="var(--text-primary)" />
              </button>
            </div>
            <div
              style={{
                overflow: "auto",
                padding: "12px 20px 24px",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 14,
                color: "var(--text-body)",
                lineHeight: 1.6,
                whiteSpace: "pre-wrap",
              }}
            >
              {body}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConsentDrawer;
