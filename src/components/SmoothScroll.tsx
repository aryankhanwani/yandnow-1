"use client";

import { useEffect, useRef } from "react";
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
  const lenisRef = useRef<Lenis | null>(null);

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
    lenisRef.current = lenis;

    // Let motion's useScroll recompute after Lenis settles layout.
    const onResize = () => lenis.resize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Land at the top on navigation. This has to go through Lenis, not
  // `window.scrollTo`: Lenis keeps its own `animatedScroll` and writes it back
  // every frame, so a raw scrollTo gets reverted and the new page opens
  // mid-way down wherever the previous one was left.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      // Reduced motion: no Lenis instance, so the browser owns the scroll.
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname]);

  return null;
}
