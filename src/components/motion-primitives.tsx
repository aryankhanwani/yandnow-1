"use client";

import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  useEffect,
  useRef,
  type ElementType,
  type ReactNode,
  type ComponentPropsWithoutRef,
} from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ──────────────────────────────────────────────────────────
   Reveal — the single entrance primitive used site-wide.
   One curve, one distance, so the whole page feels authored
   by the same hand.
   ────────────────────────────────────────────────────────── */
export function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 22,
  once = true,
  className,
  amount = 0.35,
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  y?: number;
  once?: boolean;
  className?: string;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as as "div"] ?? motion.div;

  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.82, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/* Staggered container + child, for lists and grids. */
export function RevealGroup({
  children,
  className,
  stagger = 0.075,
  delay = 0,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  y = 24,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: ElementType;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as as "div"] ?? motion.div;
  return (
    <MotionTag
      className={className}
      variants={{
        hidden: reduce ? { opacity: 1 } : { opacity: 0, y },
        shown: { opacity: 1, y: 0, transition: { duration: 0.78, ease: EASE } },
      }}
    >
      {children}
    </MotionTag>
  );
}

/* ──────────────────────────────────────────────────────────
   MaskLines — headline lines that rise out of a clip.
   Split on explicit line breaks rather than words so the
   typography stays under our control.
   ────────────────────────────────────────────────────────── */
export function MaskLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  as = "h2",
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: ElementType;
}) {
  const reduce = useReducedMotion();
  const Tag = as as ElementType;

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        // Two things are load-bearing here.
        //
        // 1. The in-view trigger lives on the clip container, not the moving
        //    span: a span held at y:108% is clipped out of existence by its own
        //    parent, so an observer on it would never report a hit.
        //
        // 2. The descender room (`pb`) belongs on the INNER span, not the clip.
        //    Display text runs a line-height below 1, so glyph tails like g, p
        //    and y fall outside the line box and the clip shaves them off. Put
        //    the padding inside and the inner span grows to contain its own
        //    tails — which also keeps the 108% hidden offset correct, since it
        //    is a percentage of that same (now taller) box. Padding on the clip
        //    instead would make the box taller than the travel and leave the
        //    text peeking out before it animates.
        <motion.span
          key={i}
          className="-mb-[0.22em] block overflow-hidden"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span
            className={`block pb-[0.28em] ${lineClassName ?? ""}`}
            variants={{
              hidden: reduce ? { y: "0%", opacity: 1 } : { y: "108%", opacity: 0 },
              shown: {
                y: "0%",
                opacity: 1,
                transition: { duration: 1.0, delay: delay + i * 0.085, ease: EASE },
              },
            }}
          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}

/* ──────────────────────────────────────────────────────────
   Parallax — subtle depth, capped low. Anything more than
   ~14% of viewport height starts to feel like a gimmick.
   ────────────────────────────────────────────────────────── */
export function Parallax({
  children,
  distance = 70,
  className,
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(raw, { stiffness: 140, damping: 32, mass: 0.35 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

/* A scroll-scaled image wrapper: the frame stays put, the photo
   breathes inside it. Reads as depth without moving layout. */
export function ScaleInFrame({
  children,
  className,
  from = 1.14,
}: {
  children: ReactNode;
  className?: string;
  from?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [from, 1]);

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div style={reduce ? undefined : { scale }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Counter — counts once on entry, eased not linear, and
   written straight to the DOM node so the number ticking
   never triggers a React render per frame.
   ────────────────────────────────────────────────────────── */
export function Counter({
  to,
  suffix = "",
  className,
}: {
  to: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = numRef.current;
    if (!node) return;

    if (reduce) {
      node.textContent = formatNumber(to);
      return;
    }
    if (!inView) {
      node.textContent = formatNumber(0);
      return;
    }

    const controls = animate(0, to, {
      duration: 1.9,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = formatNumber(v);
      },
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref} className={className}>
      {/* Server-rendered with the final value so the metric is never blank. */}
      <span ref={numRef}>{formatNumber(to)}</span>
      {suffix}
    </span>
  );
}

export function formatNumber(n: number) {
  return new Intl.NumberFormat("en-IN").format(Math.round(n));
}

export function useScrollProgress(): MotionValue<number> {
  const { scrollYProgress } = useScroll();
  return useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.28 });
}

/* ──────────────────────────────────────────────────────────
   Magnetic — pointer-follow nudge for primary CTAs. Written
   straight to `style.transform` (not a motion value) so the
   pointer feels attached with no spring lag.
   ────────────────────────────────────────────────────────── */
export function Magnetic({
  children,
  strength = 0.22,
  className,
  ...rest
}: { strength?: number } & ComponentPropsWithoutRef<"div">) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  return (
    <div
      ref={ref}
      className={className}
      onPointerMove={(e) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }}
      onPointerLeave={() => {
        if (!ref.current) return;
        ref.current.style.transform = "translate3d(0,0,0)";
      }}
      style={{ transition: "transform 420ms cubic-bezier(0.22,1,0.36,1)" }}
      {...rest}
    >
      {children}
    </div>
  );
}

export { motion, useScroll, useTransform, useSpring, useInView, useReducedMotion };
