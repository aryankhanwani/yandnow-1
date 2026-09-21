"use client";

import { useRef } from "react";
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
                  range={[i / words.length, (i + 4) / words.length]}
                  reduce={!!reduce}
                >
                  {w}
                </Word>
              ))}
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
              <ArrowLink href="/about">How we work</ArrowLink>
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
