import { useEffect, useRef } from "react";

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: { threshold?: number; staggerChildren?: boolean; staggerDelay?: number }
) {
  const ref = useRef<T>(null);
  const { threshold = 0.1, staggerChildren = false, staggerDelay = 100 } = options ?? {};

  useEffect(() => {
    // Respect reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    // Use only opacity + clip-path for CLS-safe reveals
    el.style.opacity = "0";
    el.style.willChange = "opacity";
    el.style.transition = `opacity 600ms cubic-bezier(0.16,1,0.3,1)`;

    if (staggerChildren) {
      Array.from(el.children).forEach((child, i) => {
        const c = child as HTMLElement;
        c.style.opacity = "0";
        c.style.willChange = "opacity";
        c.style.transition = `opacity 600ms cubic-bezier(0.16,1,0.3,1) ${i * staggerDelay}ms`;
      });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";

          if (staggerChildren) {
            Array.from(el.children).forEach((child) => {
              (child as HTMLElement).style.opacity = "1";
            });
          }

          setTimeout(() => {
            el.style.willChange = "auto";
            if (staggerChildren) {
              Array.from(el.children).forEach((child) => {
                (child as HTMLElement).style.willChange = "auto";
              });
            }
          }, 1200);

          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, staggerChildren, staggerDelay]);

  return ref;
}
