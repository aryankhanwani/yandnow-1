"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import Frame from "@/components/Frame";
import type { PhotoKey } from "@/lib/photos";
import { MaskLines, Reveal } from "@/components/motion-primitives";

const PLATES: { key: PhotoKey; caption: string; place: string }[] = [
  { key: "cnc-operation", caption: "CNC setup and first-article check", place: "CRISP · Bhopal" },
  { key: "defence-engine-class", caption: "Vehicle maintenance, on-unit", place: "Defence · Assam" },
  { key: "healthcare-lab", caption: "Pathology technician training", place: "BPCL · Madhya Pradesh" },
  { key: "two-wheeler-lab", caption: "Two-wheeler service bay", place: "Gulf Oil · Gujarat" },
  { key: "tailoring-hands", caption: "Tailoring enterprise cohort", place: "NABARD · Bhopal" },
  { key: "site-safety-cohort", caption: "Site safety induction", place: "NAREDCO · Maharashtra" },
  { key: "welding-bay", caption: "Arc welding practical", place: "CRISP · Bhopal" },
  { key: "vision-screening", caption: "Free vision screening camp", place: "Essilor · Meghalaya" },
  { key: "mobile-training-unit", caption: "Training at your doorstep", place: "Ashok Leyland · Telangana" },
];

/**
 * A vertical scroll that reads horizontally: the section is pinned for its own
 * height and the track translates on scroll progress, damped by a spring so
 * trackpad flicks don't snap. Below `lg` it degrades to a native swipe rail —
 * the honest behaviour on touch.
 */
export default function HorizontalGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref });

  // Translate far enough to clear the track, minus one viewport.
  const raw = useTransform(scrollYProgress, [0.06, 0.94], ["0%", "-72%"]);
  const x = useSpring(raw, { stiffness: 160, damping: 34, mass: 0.4 });

  return (
    <section className="bg-paper">
      <div className="shell pt-24 pb-10 md:pt-32">
        <div className="grid gap-8 border-b border-line pb-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Reveal>
              <p className="eyebrow text-indigo-brand">In the field</p>
            </Reveal>
            <MaskLines
              as="h2"
              className="mt-6 max-w-[18ch] font-display text-[clamp(2.5rem,6.2vw,5.25rem)] leading-[0.96] font-semibold tracking-[-0.04em]"
              lines={["Not stock photos.", "Our own cohorts."]}
            />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-[34ch] text-[0.9375rem] leading-relaxed text-ink-50">
              Every image on this site was taken on a live YandNow programme between
              2020 and 2026.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ── Desktop: pinned horizontal track ───────────── */}
      <div ref={ref} className="relative hidden h-[320vh] lg:block">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          <motion.div
            className="flex gap-6 pl-[max(1.25rem,calc((100vw-88rem)/2+4rem))]"
            style={reduce ? undefined : { x }}
          >
            {PLATES.map((p) => (
              <figure key={p.key} className="w-[clamp(20rem,30vw,30rem)] shrink-0">
                <Frame
                  name={p.key}
                  alt={p.caption}
                  className="aspect-[4/3] w-full"
                  sizes="30vw"
                />
                <figcaption className="mt-4 flex items-start gap-3">
                  <span className="mt-[0.45rem] h-[2px] w-6 shrink-0 bg-cyan-brand" />
                  <span>
                    <span className="block text-[0.9375rem] font-medium text-ink">
                      {p.caption}
                    </span>
                    <span className="mt-0.5 block font-mono text-[0.625rem] tracking-[0.11em] text-ink-30 uppercase">
                      {p.place}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}

            <div className="flex w-[26rem] shrink-0 items-center pr-16">
              <div>
                <p className="display-md max-w-[16ch] font-semibold">
                  Fourteen programmes, archived in full.
                </p>
                <Link
                  href="/impact"
                  className="group mt-7 inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 font-medium text-paper-warm transition-colors duration-300 hover:bg-indigo-brand"
                >
                  Open the archive
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Mobile: native swipe rail ──────────────────── */}
      <div className="lg:hidden">
        <div
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-10 [scrollbar-width:none] md:px-10 [&::-webkit-scrollbar]:hidden"
          role="region"
          aria-label="Programme photographs"
        >
          {PLATES.map((p) => (
            <figure key={p.key} className="w-[78vw] max-w-sm shrink-0 snap-start">
              <Frame
                name={p.key}
                alt={p.caption}
                className="aspect-[4/3] w-full"
                sizes="78vw"
              />
              <figcaption className="mt-3">
                <span className="block text-sm font-medium text-ink">{p.caption}</span>
                <span className="mt-0.5 block font-mono text-[0.625rem] tracking-[0.11em] text-ink-30 uppercase">
                  {p.place}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="shell pb-16">
          <Link
            href="/impact"
            className="inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 font-medium text-paper-warm"
          >
            Open the archive
          </Link>
        </div>
      </div>
    </section>
  );
}
