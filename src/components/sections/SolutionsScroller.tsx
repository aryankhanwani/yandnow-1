"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import Frame from "@/components/Frame";
import { solutions } from "@/lib/site";
import { MaskLines, Reveal } from "@/components/motion-primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Desktop: one sticky photo column, six stacked images, cross-faded by
 * whichever entry currently owns the centre line. Mobile: the same content as
 * plain cards — a sticky pane on a 390px screen is a trap, not an effect.
 */
export default function SolutionsScroller() {
  const [active, setActive] = useState(0);

  return (
    <section id="solutions" className="relative bg-paper-warm pt-8 pb-24 md:pt-12 md:pb-32">
      <div className="shell">
        {/* Section head */}
        <div className="grid gap-8 border-b border-line pb-14 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Reveal>
              <p className="eyebrow text-indigo-brand">Solutions · 06</p>
            </Reveal>
            <MaskLines
              as="h2"
              className="display-lg mt-6 max-w-[20ch] font-semibold"
              lines={["Six verticals,", "one delivery spine."]}
            />
          </div>
          <Reveal delay={0.12}>
            <p className="max-w-[40ch] text-[0.9375rem] leading-relaxed text-ink-50">
              The audience changes. The method does not: diagnose the real gap, build
              the curriculum backwards from it, deliver on live equipment, then verify
              the outcome in the field.
            </p>
          </Reveal>
        </div>

        {/* ── Desktop: sticky photo + scrolling list ─────── */}
        <div className="mt-16 hidden lg:grid lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 xl:gap-24">
          <div className="relative">
            <div className="sticky top-[14vh]">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                {solutions.map((s, i) => (
                  <motion.div
                    key={s.slug}
                    className="absolute inset-0"
                    animate={{
                      opacity: active === i ? 1 : 0,
                      scale: active === i ? 1 : 1.045,
                    }}
                    transition={{ duration: 0.85, ease: EASE }}
                  >
                    <Frame
                      name={s.hero}
                      alt={`${s.title}: ${s.summary}`}
                      className="h-full w-full"
                      sizes="42vw"
                    />
                  </motion.div>
                ))}

                {/* Index plate */}
                <div className="absolute top-0 left-0 flex items-center gap-3 bg-paper-warm py-3 pr-5">
                  <span className="h-6 w-[3px] bg-indigo-brand" />
                  <span className="font-mono text-xs tracking-[0.14em] text-ink-50 tabular-nums">
                    {solutions[active].index} / 06
                  </span>
                </div>
              </div>

              {/* Progress rail */}
              <div className="mt-6 flex gap-1.5" aria-hidden>
                {solutions.map((s, i) => (
                  <span
                    key={s.slug}
                    className="relative h-[2px] flex-1 overflow-hidden bg-line"
                  >
                    <motion.span
                      className="absolute inset-0 origin-left bg-indigo-brand"
                      animate={{ scaleX: active >= i ? 1 : 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                    />
                  </span>
                ))}
              </div>

              <p className="mt-5 font-mono text-[0.625rem] tracking-[0.11em] text-ink-30 uppercase">
                Photographed on live programmes
              </p>
            </div>
          </div>

          <ul>
            {solutions.map((s, i) => (
              <Entry
                key={s.slug}
                solution={s}
                index={i}
                onEnter={setActive}
                isActive={active === i}
              />
            ))}
          </ul>
        </div>

        {/* ── Mobile: cards ──────────────────────────────── */}
        <ul className="mt-12 space-y-4 lg:hidden">
          {solutions.map((s) => (
            <li key={s.slug}>
              <Reveal y={18}>
                <Link
                  href={`/solutions/${s.slug}`}
                  className="group block overflow-hidden border border-line bg-white transition-colors duration-400 hover:border-indigo-brand/40"
                >
                  <Frame
                    name={s.hero}
                    alt={`${s.title}: ${s.summary}`}
                    className="aspect-[16/10] w-full"
                    sizes="100vw"
                  />
                  <div className="p-5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-indigo-brand tabular-nums">
                        {s.index}
                      </span>
                      <span className="h-px flex-1 bg-line" />
                    </div>
                    <h3 className="mt-3 font-display text-[1.375rem] font-semibold tracking-[-0.03em]">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-50">
                      {s.summary}
                    </p>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Entry({
  solution: s,
  index,
  onEnter,
  isActive,
}: {
  solution: (typeof solutions)[number];
  index: number;
  /** Stable state setter — safe as an effect dependency. */
  onEnter: (index: number) => void;
  isActive: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  // A narrow band at the middle of the viewport decides ownership, so the photo
  // changes at a predictable point rather than whenever an edge clips.
  const inView = useInView(ref, { margin: "-48% 0px -48% 0px" });

  useEffect(() => {
    if (inView) onEnter(index);
  }, [inView, index, onEnter]);

  return (
    <li
      ref={ref}
      className="border-b border-line first:border-t"
      onMouseEnter={() => onEnter(index)}
    >
      <Link
        href={`/solutions/${s.slug}`}
        className="group block py-11 xl:py-14"
        aria-current={isActive ? "true" : undefined}
      >
        <div className="flex items-start gap-6">
          <span
            className={`mt-[0.6rem] font-mono text-xs tracking-[0.14em] tabular-nums transition-colors duration-500 ${
              isActive ? "text-indigo-brand" : "text-ink-30"
            }`}
          >
            {s.index}
          </span>

          <div className="min-w-0 flex-1">
            <h3
              className={`font-display text-[clamp(1.6rem,2.5vw,2.25rem)] leading-[1.08] font-semibold tracking-[-0.032em] transition-colors duration-500 ${
                isActive ? "text-ink" : "text-ink-30"
              }`}
            >
              {s.title}
            </h3>

            {/* The body copy only opens for the active entry — keeps the column
                scannable and gives the scroll something to resolve. */}
            <motion.div
              initial={false}
              animate={{
                height: isActive || reduce ? "auto" : 0,
                opacity: isActive || reduce ? 1 : 0,
              }}
              transition={{ duration: 0.62, ease: EASE }}
              className="overflow-hidden"
            >
              <p className="pt-4 text-[1.0625rem] leading-relaxed text-ink-70">
                {s.summary}
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-2">
                {s.audience.slice(0, 3).map((a) => (
                  <li
                    key={a}
                    className="rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-medium text-ink-50"
                  >
                    {a}
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-indigo-brand">
                <span className="relative">
                  View this vertical
                  <span className="absolute -bottom-[3px] left-0 h-px w-full origin-left scale-x-0 bg-indigo-brand transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                </span>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                  <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </motion.div>
          </div>
        </div>
      </Link>
    </li>
  );
}
