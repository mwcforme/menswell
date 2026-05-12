import { useState, useEffect } from "react";

interface UnifiedMobileCTAProps {
  targetId?: string;
}

export const UnifiedMobileCTA = ({ targetId = "unified-lead-form" }: UnifiedMobileCTAProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show when hero is out of view
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const hero = document.getElementById("lp-hero");
    if (hero) observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  const scrollToForm = () => {
    const form = document.getElementById(targetId);
    if (form) form.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{ background: "#000033" }}
    >
      <button
        onClick={scrollToForm}
        className="w-full py-4 text-white font-bold text-sm uppercase tracking-wider cursor-pointer"
        style={{ background: "transparent", border: "none" }}
      >
        BOOK MY CONSULTATION
      </button>
    </div>
  );
};
