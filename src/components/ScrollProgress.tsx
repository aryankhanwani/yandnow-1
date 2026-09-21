"use client";

import { motion } from "motion/react";
import { useScrollProgress } from "./motion-primitives";

/** A 2px spring-damped read-out of page position. */
export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-cyan-brand"
      style={{ scaleX: progress }}
    />
  );
}
