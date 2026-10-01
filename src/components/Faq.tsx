"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MaskLines, Reveal } from "./motion-primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Faq({
  items,
}: {
  items: readonly { q: string; a: string }[];
}) {
  // Single-open accordion: two open answers at once makes the column
  // impossible to scan.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow text-indigo-brand">Common questions</p>
          </Reveal>
          <MaskLines
            as="h2"
            className="display-md mt-6 max-w-[14ch] font-semibold"
            lines={["Before you", "ask us."]}
          />
        </div>

        <ul className="border-t border-line">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-start gap-5 py-7 text-left"
                  >
                    <span className="mt-[0.45rem] font-mono text-[0.6875rem] tracking-[0.14em] text-ink-30 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`flex-1 font-display text-[1.1875rem] leading-[1.35] font-semibold tracking-[-0.025em] transition-colors duration-300 md:text-[1.3125rem] ${
                        isOpen ? "text-ink" : "text-ink-70 group-hover:text-ink"
                      }`}
                    >
                      {item.q}
                    </span>
                    {/* Plus → minus, rotating the vertical stroke out. */}
                    <span className="relative mt-2 block h-3.5 w-3.5 shrink-0">
                      <span className="absolute top-1/2 left-0 block h-[1.5px] w-full -translate-y-1/2 bg-indigo-brand" />
                      <motion.span
                        className="absolute top-0 left-1/2 block h-full w-[1.5px] -translate-x-1/2 bg-indigo-brand"
                        animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }}
                        transition={{ duration: 0.4, ease: EASE }}
                      />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[62ch] pr-8 pb-8 pl-10 text-[1.0625rem] leading-relaxed text-ink-70">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
