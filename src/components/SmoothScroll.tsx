"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Lenis drives the page scroll so wheel, trackpad and keyboard input all share
 * one eased position. Framer Motion's scroll listeners read `window.scrollY`,
 * which Lenis keeps authoritative — so no extra wiring is needed for the
 * scroll-linked sections.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      // ~1s to settle: long enough to read as momentum, short enough to feel direct.
      duration: 1.05,
      easing: (t) => 1 - Math.pow(1 - t, 3.2),
      wheelMultiplier: 0.92,
      touchMultiplier: 1.6,
      syncTouch: false,
      autoRaf: true,
      anchors: { offset: -88 },
    });

    // Let motion's useScroll recompute after Lenis settles layout.
    const onResize = () => lenis.resize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      lenis.destroy();
    };
  }, []);

  // Land at the top on navigation — Lenis keeps its own position otherwise.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
