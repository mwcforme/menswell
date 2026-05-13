import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { TRT_FAQS } from "@/data/faqs";

export const TRTFAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  const scrollToForm = () => {
    document.getElementById("hero-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section id="faq" style={{ background: "#F5F0EB" }}>
      <div className="max-w-[820px] mx-auto px-6 py-16 md:py-24">
        <h2
          className="font-bold uppercase text-center"
          style={{
            fontFamily: "Oswald, sans-serif",
            color: "#000033",
            fontSize: "clamp(26px, 3vw, 38px)",
            letterSpacing: "0.02em",
          }}
        >
          Frequently Asked Questions
        </h2>

        <div className="mt-10 space-y-3">
          {TRT_FAQS.map((f, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            return (
              <div
                key={f.q}
                className="rounded-xl overflow-hidden"
                style={{ background: "#FFFFFF", border: "1px solid #E5E5EA" }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 cursor-pointer"
                  style={{ color: "#000033", fontFamily: "Inter, sans-serif" }}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className="font-semibold text-base">{f.q}</span>
                  <ChevronDown
                    className="h-5 w-5 flex-shrink-0 transition-transform duration-200"
                    style={{
                      color: "#E8670A",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>
                {isOpen && (
                  <div
                    id={panelId}
                    className="px-5 pb-5 text-sm leading-relaxed"
                    style={{ color: "#1a1a2e", fontFamily: "Inter, sans-serif" }}
                  >
                    <p>{f.a}</p>
                    <p className="mt-3">
                      <button
                        onClick={scrollToForm}
                        className="inline-flex items-center gap-1 font-semibold cursor-pointer"
                        style={{
                          color: "#E8670A",
                          background: "none",
                          border: "none",
                          padding: 0,
                          fontFamily: "Inter, sans-serif",
                          fontSize: "inherit",
                        }}
                      >
                        → Book a no-cost consult
                      </button>
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
