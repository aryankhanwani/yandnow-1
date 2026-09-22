"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { testimonials } from "@/lib/site";
import { MaskLines, Reveal } from "@/components/motion-primitives";
import Frame from "@/components/Frame";

const EASE = [0.22, 1, 0.36, 1] as const;
const PHOTOS = ["engine-briefing", "volunteer-cohort", "defence-mobile-unit"] as const;
const INTERVAL = 7000;

export default function Testimonials() {
  const [i, setI] = useState(0);
  // Which way the last change went, so the quote slides with the arrow rather
  // than always entering from the same side.
  const [dir, setDir] = useState(1);
  const [manual, setManual] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  // Only advance while the section is actually on screen — otherwise a visitor
  // returns to a quote several steps along from the one they left.
  const inView = useInView(sectionRef, { amount: 0.4 });

  const go = useCallback((step: number) => {
    setDir(step);
    setI((v) => (v + step + testimonials.length) % testimonials.length);
  }, []);

  const select = useCallback((next: number) => {
    setDir(next > i ? 1 : -1);
    setI(next);
  }, [i]);

  // Autoplay, until the visitor takes over. Touching an arrow or a dot is a
  // clear signal they are driving, so the timer stops for good rather than
  // yanking the quote out from under them a few seconds later.
  useEffect(() => {
    if (manual || reduce || !inView) return;
    const t = setInterval(() => {
      setDir(1);
      setI((v) => (v + 1) % testimonials.length);
    }, INTERVAL);
    return () => clearInterval(t);
  }, [manual, reduce, inView]);

  const t = testimonials[i];
  const autoplaying = !manual && !reduce;

  function handle(action: () => void) {
    setManual(true);
    action();
  }

  return (
    <section ref={sectionRef} className="bg-paper-warm py-24 md:py-32">
      <div className="shell">
        <Reveal>
          <p className="eyebrow text-indigo-brand">What partners say</p>
        </Reveal>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <MaskLines
            as="h2"
            className="display-md max-w-[26ch] font-semibold"
            lines={["Judged on delivery,", "not on the pitch."]}
          />

          <Reveal delay={0.12}>
            <div className="flex items-center gap-3">
              <Arrow
                dir="prev"
                onClick={() => handle(() => go(-1))}
                label="Previous quote"
              />
              <Arrow
                dir="next"
                onClick={() => handle(() => go(1))}
                label="Next quote"
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 border-t border-line pt-12 lg:grid-cols-[1fr_0.62fr] lg:gap-20">
          <div className="flex min-h-[19rem] flex-col justify-between">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.blockquote
                key={i}
                custom={dir}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -28 }}
                transition={{ duration: 0.5, ease: EASE }}
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

            <div className="mt-10 flex items-center gap-2">
              {testimonials.map((item, idx) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => handle(() => select(idx))}
                  aria-label={`Show quote from ${item.name}`}
                  aria-current={idx === i}
                  className="group relative h-8 px-1"
                >
                  <span
                    className={`relative block h-[2px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      idx === i ? "w-12 bg-line" : "w-6 bg-line group-hover:bg-ink-30"
                    }`}
                  >
                    {/* On the active dash, the fill doubles as a countdown to
                        the next slide. */}
                    {idx === i && (
                      <motion.span
                        key={`${i}-${autoplaying}`}
                        className="absolute inset-0 origin-left bg-indigo-brand"
                        initial={{ scaleX: autoplaying ? 0 : 1 }}
                        animate={{ scaleX: 1 }}
                        transition={
                          autoplaying
                            ? { duration: INTERVAL / 1000, ease: "linear" }
                            : { duration: 0.4, ease: EASE }
                        }
                      />
                    )}
                  </span>
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

function Arrow({
  dir,
  onClick,
  label,
}: {
  dir: "prev" | "next";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper-warm"
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden
        className={`transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          dir === "next"
            ? "group-hover:translate-x-0.5"
            : "rotate-180 group-hover:-translate-x-0.5"
        }`}
      >
        <path
          d="M2 7h10M8 3l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
