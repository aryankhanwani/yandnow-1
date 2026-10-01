"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import ArrowLink from "@/components/ArrowLink";

const TEXT =
  "Most training ends at a certificate. Ours ends when someone can do the job unsupervised — because that is the only outcome an employer, a jawan, or a woman starting a workshop can actually use.";

/**
 * Scroll-scrubbed paragraph: each word lifts from faint to full ink as the
 * block crosses the viewport. The effect is the reading pace, so it must never
 * outrun the scroll — hence the word-indexed ranges rather than a timer.
 */
export default function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.82", "end 0.58"],
  });

  const words = TEXT.split(" ");

  // Each word brightens over a 4-word-wide window. Naively that window is
  // `[i/n, (i+4)/n]`, which runs past 1 for the last four words — so scroll
  // ended before they finished and the tail of the sentence stayed grey. Scale
  // the step so the final word's window closes exactly at progress 1.
  const LEAD = 4;
  const step = 1 / (words.length - 1 + LEAD);

  return (
    <section className="bg-paper-warm pt-24 pb-20 md:pt-32 md:pb-24">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[auto_1fr] lg:gap-20">
          <div className="lg:w-[13rem]">
            <p className="eyebrow text-ink-30">Our position</p>
            <span className="mt-5 block h-px w-full bg-line lg:w-full" />
          </div>

          <div ref={ref}>
            <p className="font-display text-[clamp(1.5rem,3.15vw,2.5rem)] leading-[1.24] font-medium tracking-[-0.028em]">
              {words.map((w, i) => (
                <Word
                  key={`${w}-${i}`}
                  progress={scrollYProgress}
                  range={[i * step, (i + LEAD) * step]}
                  reduce={!!reduce}
                >
                  {w}
                </Word>
              ))}
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 font-medium text-paper-warm transition-colors duration-300 hover:bg-indigo-brand"
              >
                How we work
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden
                  className="transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                >
                  <path
                    d="M2 7h10M8 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <ArrowLink href="/impact">Programme archive</ArrowLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
  reduce,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  reduce: boolean;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);

  return (
    <span className="relative mr-[0.26em] inline-block">
      {reduce ? (
        <span>{children}</span>
      ) : (
        <motion.span style={{ opacity }} className="inline-block">
          {children}
        </motion.span>
      )}
    </span>
  );
}
