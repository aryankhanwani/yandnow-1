"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import HeroVideo from "@/components/HeroVideo";
import { solutions } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // The footage drifts and swells slightly slower than the copy on the way out,
  // so the hero reads as depth rather than as one sliding plane.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const copyFade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  // Once the control has faded out it must stop catching clicks.
  const controlHits = useTransform(copyFade, (v) => (v < 0.06 ? "none" : "auto"));
  const veil = useTransform(scrollYProgress, [0, 1], [0, 0.55]);

  return (
    <section
      ref={ref}
      className="relative isolate min-h-[100svh] overflow-hidden bg-indigo-ink text-paper-warm"
    >
      {/* ── Full-bleed footage ─────────────────────────── */}
      <HeroVideo
        mediaStyle={reduce ? undefined : { y: mediaY, scale: mediaScale }}
        controlStyle={reduce ? undefined : { opacity: copyFade, pointerEvents: controlHits }}
      />

      <motion.div
        className="shell relative z-10 grid min-h-[100svh] grid-rows-[auto_1fr_auto] pt-[104px] pb-8"
        style={reduce ? undefined : { opacity: copyFade }}
      >
        {/* ── Row 1: eyebrow ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          className="hero-copy flex flex-wrap items-center gap-x-4 gap-y-2"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-cyan-brand opacity-75" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-cyan-brand" />
          </span>
          <p className="eyebrow text-cyan-brand">Skill development · India</p>
          <span className="hidden h-px w-14 bg-white/25 sm:block" />
          <p className="eyebrow text-white/45">Since 2020</p>
        </motion.div>

        {/* ── Row 2: headline over the footage ───────────── */}
        <motion.div
          className="flex max-w-[60rem] flex-col justify-center py-10"
          style={reduce ? undefined : { y: copyY }}
        >
          <h1 className="display-xl hero-copy font-semibold">
            {["Skills that hold", "up on the floor."].map((line, i) => (
              // Same trick as MaskLines: the descender room lives on the inner
              // span so the clip box grows to contain the tail of the "p" in
              // "up", and the 110% hidden offset stays measured against that
              // same box.
              <span key={line} className="-mb-[0.22em] block overflow-hidden">
                <motion.span
                  className="block pb-[0.28em]"
                  initial={reduce ? { y: 0 } : { y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.15, delay: 0.24 + i * 0.09, ease: EASE }}
                >
                  {i === 1 ? (
                    <>
                      up on the <span className="text-cyan-brand">floor.</span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.62, ease: EASE }}
            className="mt-7 max-w-[46rem]"
          >
            {/* max-width in `ch` must live on the paragraph itself: on the
                wrapper it resolves against the parent's 16px, not the lede's
                own size, so the measure drifted wider as the font scaled up. */}
            <p className="lede hero-copy max-w-[58ch] text-white/85">
              We train welders, technicians, lab staff and machine operators — on
              live equipment, where the work actually happens.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-1">
              <Link
                href="/solutions"
                className="group inline-flex items-center gap-3 rounded-full bg-paper-warm px-7 py-4 font-medium text-ink transition-colors duration-300 hover:bg-cyan-brand"
              >
                Explore six verticals
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden
                  className="transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
                >
                  <path
                    d="M3 11L11 3M11 3H5M11 3V9"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link
                href="/impact"
                className="group inline-flex items-center gap-2 py-4 font-medium text-white/80 transition-colors duration-300 hover:text-white"
              >
                <span className="relative">
                  See the programmes
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-cyan-brand transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                </span>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Row 3: footage credit, rotating vertical, scroll cue ── */}
        <div className="flex flex-col gap-5 border-t border-white/15 pt-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95, ease: EASE }}
            className="hero-copy flex items-center gap-3"
          >
            <span className="h-8 w-[3px] shrink-0 bg-cyan-brand" />
            <p className="font-mono text-[0.625rem] leading-relaxed tracking-[0.11em] text-white/60 uppercase">
              Advanced manufacturing
              <br />
              Technology &amp; robotics labs
            </p>
          </motion.div>

          <VerticalTicker />

          {/* No scroll cue here: the pause control owns this corner, and the
              progress bar in the header already reports position. */}
          <span className="hidden lg:block lg:w-40" aria-hidden />
        </div>
      </motion.div>

      {/* Dim veil as the hero exits */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[15] bg-indigo-ink"
        style={reduce ? undefined : { opacity: veil }}
      />
    </section>
  );
}

/* Cycles the six verticals so the fold states the full scope. */
function VerticalTicker() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % solutions.length), 2600);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1 }}
      className="hero-copy flex min-w-0 flex-col items-start gap-y-0.5 sm:flex-row sm:items-center sm:gap-x-3"
    >
      <p className="eyebrow shrink-0 text-white/40">We work in</p>
      <span className="relative block h-6 w-full min-w-[13rem] overflow-hidden sm:w-[15rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={solutions[i].slug}
            initial={{ y: reduce ? 0 : 22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: reduce ? 0 : -22, opacity: 0 }}
            transition={{ duration: 0.52, ease: EASE }}
            className="absolute inset-0 flex items-center font-display text-[1.0625rem] font-medium tracking-[-0.02em] text-paper-warm"
          >
            {solutions[i].title}
          </motion.span>
        </AnimatePresence>
      </span>
      {/* Decorative caret. Hidden on phones, where the stacked layout would
          drop it onto a line of its own. */}
      <span
        aria-hidden
        className="hidden h-[1.05rem] w-[2px] bg-cyan-brand sm:block"
        style={{ animation: "blink 1.1s steps(1) infinite" }}
      />
    </motion.div>
  );
}
