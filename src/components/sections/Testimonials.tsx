"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { testimonials } from "@/lib/site";
import { MaskLines, Reveal } from "@/components/motion-primitives";
import Frame from "@/components/Frame";

const EASE = [0.22, 1, 0.36, 1] as const;
const PHOTOS = ["engine-briefing", "volunteer-cohort", "defence-mobile-unit"] as const;

export default function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];

  return (
    <section className="bg-paper-warm py-24 md:py-32">
      <div className="shell">
        <Reveal>
          <p className="eyebrow text-indigo-brand">What partners say</p>
        </Reveal>
        <MaskLines
          as="h2"
          className="display-md mt-6 max-w-[26ch] font-semibold"
          lines={["Judged on delivery,", "not on the pitch."]}
        />

        <div className="mt-14 grid gap-10 border-t border-line pt-12 lg:grid-cols-[1fr_0.62fr] lg:gap-20">
          <div className="flex min-h-[19rem] flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <p className="font-display text-[clamp(1.375rem,2.6vw,2.125rem)] leading-[1.3] font-medium tracking-[-0.028em] text-balance">
                  <span className="text-cyan-brand">“</span>
                  {t.quote}
                  <span className="text-cyan-brand">”</span>
                </p>
                <footer className="mt-8 flex items-center gap-3">
                  <span className="h-[2px] w-7 bg-indigo-brand" />
                  <span className="text-[0.9375rem]">
                    <span className="font-medium text-ink">{t.name}</span>
                    <span className="text-ink-50"> · {t.org}</span>
                  </span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            {/* Controls */}
            <div className="mt-10 flex items-center gap-2">
              {testimonials.map((item, idx) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setI(idx)}
                  aria-label={`Show quote from ${item.name}`}
                  aria-current={idx === i}
                  className="group relative h-8 px-1"
                >
                  <span
                    className={`block h-[2px] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      idx === i
                        ? "w-12 bg-indigo-brand"
                        : "w-6 bg-line group-hover:bg-ink-30"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-3 font-mono text-[0.6875rem] tracking-[0.12em] text-ink-30 tabular-nums">
                {String(i + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={i}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75, ease: EASE }}
              >
                <Frame
                  name={PHOTOS[i]}
                  alt=""
                  className="h-full w-full"
                  sizes="(min-width: 1024px) 32vw, 100vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
