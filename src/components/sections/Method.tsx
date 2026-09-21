"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Frame from "@/components/Frame";
import { method } from "@/lib/site";
import { MaskLines, Reveal } from "@/components/motion-primitives";

/**
 * Four steps, each a full-height panel. The step number scrubs through a
 * sticky counter on the left while the panels pass — a progress read-out you
 * don't have to look for.
 */
export default function Method() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.5", "end 0.5"],
  });

  return (
    <section className="bg-ink text-paper-warm">
      <div className="shell pt-24 pb-4 md:pt-32">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Reveal>
              <p className="eyebrow text-cyan-brand">The method</p>
            </Reveal>
            <MaskLines
              as="h2"
              className="display-lg mt-6 max-w-[22ch] font-semibold"
              lines={["How a programme", "actually gets built."]}
            />
          </div>
          <Reveal delay={0.12}>
            <p className="max-w-[36ch] text-[0.9375rem] leading-relaxed text-white/55">
              Four stages, run in order, every time — whether the client is an OEM
              service network or a district livelihood mission.
            </p>
          </Reveal>
        </div>
      </div>

      <div ref={ref} className="shell relative">
        {/* Sticky rail */}
        <div className="pointer-events-none absolute inset-y-0 left-5 hidden w-px bg-white/10 md:left-10 lg:block xl:left-16">
          <motion.div
            className="absolute inset-x-0 top-0 origin-top bg-cyan-brand"
            style={{ height: "100%", scaleY: scrollYProgress }}
          />
        </div>

        <ol>
          {method.map((m, i) => (
            <Step key={m.step} item={m} isLast={i === method.length - 1} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Step({
  item,
  isLast,
}: {
  item: (typeof method)[number];
  isLast: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <li
      ref={ref}
      className={`grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-20 lg:py-24 ${
        isLast ? "" : "border-b border-white/10"
      }`}
    >
      <div className="lg:pl-[clamp(3rem,7vw,7rem)]">
        <Reveal>
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs tracking-[0.16em] text-cyan-brand tabular-nums">
              {item.step}
            </span>
            <span className="h-px flex-1 bg-white/10" />
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <h3 className="display-md mt-6 max-w-[18ch] font-semibold">{item.title}</h3>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-[48ch] text-[1.0625rem] leading-relaxed text-white/60">
            {item.body}
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.08} y={28}>
        <div className="overflow-hidden">
          <motion.div style={reduce ? undefined : { y: imgY }}>
            <Frame
              name={item.photo}
              alt={item.title}
              className="aspect-[16/11] w-full"
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
          </motion.div>
        </div>
      </Reveal>
    </li>
  );
}
