"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion, type MotionStyle } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Full-bleed hero footage: a 5.5s arc-welding loop from the CRISP fabrication
 * programme, cut in two art-directed crops — 2:1 landscape for wide viewports,
 * 3:4 framed on the welder for phones, where the landscape file would
 * `object-cover` down to a meaningless vertical sliver.
 *
 * The crop is chosen in JS rather than with `media` on `<source>`: that
 * attribute is unreliable inside `<video>`, and a browser that ignores it takes
 * the *first* source — handing desktop the portrait crop. Failing towards the
 * poster is fine; failing towards the wrong crop is not.
 */
const SOURCES = {
  wide: {
    webm: "/video/hero-welding.webm",
    mp4: "/video/hero-welding.mp4",
    poster: "/video/hero-welding-poster.webp",
  },
  portrait: {
    webm: "/video/hero-welding-portrait.webm",
    mp4: "/video/hero-welding-portrait.mp4",
    poster: "/video/hero-welding-portrait-poster.webp",
  },
} as const;

/* Decided once per page load and cached at module scope: re-deriving it on
   every render would swap the source — and restart playback — the moment a
   phone is rotated or a desktop window is dragged across 640px. */
let cachedVariant: "wide" | "portrait" | null = null;
const noopSubscribe = () => () => {};
const readVariant = () => {
  cachedVariant ??= window.matchMedia("(max-width: 640px)").matches ? "portrait" : "wide";
  return cachedVariant;
};
const readVariantOnServer = () => null;

export default function HeroVideo({
  mediaStyle,
  controlStyle,
}: {
  /** Scroll transform for the footage layer only. */
  mediaStyle?: MotionStyle;
  /** Fade for the pause control, so it leaves with the rest of the hero copy. */
  controlStyle?: MotionStyle;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(true);

  // null on the server and for the first client paint, so the poster carries
  // the fold until we know which crop this viewport should get.
  const variant = useSyncExternalStore(noopSubscribe, readVariant, readVariantOnServer);

  // Autoplay can still be refused (iOS low-power mode, data saver). Reflect
  // what actually happened so the control never lies about its state.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduce) return;
    v.play().then(
      () => setPlaying(true),
      () => setPlaying(false),
    );
  }, [variant, reduce]);

  // Don't decode frames for a hero nobody is looking at.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduce) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) v.pause();
        else if (playing) void v.play().catch(() => {});
      },
      { threshold: 0.05 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [playing, reduce]);

  const src = SOURCES[variant ?? "wide"];

  function toggle() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  return (
    <>
      {/* Only the footage takes the scroll transform. The scrim and the pause
          control stay put — a button that drifts and scales is not a button. */}
      <motion.div className="absolute inset-0 z-0" style={mediaStyle}>
        {/* Poster sits underneath for the life of the page: it covers the first
            paint, reduced-motion, and any codec or autoplay refusal. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-indigo-ink bg-cover bg-center"
          style={{ backgroundImage: `url(${src.poster})` }}
        />

        {variant && !reduce && (
          <motion.video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ duration: 1.1, ease: EASE }}
            onCanPlay={() => setReady(true)}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={src.poster}
            // Decorative: the headline and the credit plate already name it.
            aria-hidden
            tabIndex={-1}
          >
            <source src={src.webm} type="video/webm" />
            <source src={src.mp4} type="video/mp4" />
          </motion.video>
        )}
      </motion.div>

      {/* One light, *neutral* scrim. Tinting with indigo washed the footage
          blue and flattened it; near-black at a third just takes the edge off
          the highlights. Legibility over the welder's pale shirt is carried by
          the type's own shadow (see `.hero-copy` in globals.css), not by
          drowning the picture. */}
      <div aria-hidden className="absolute inset-0 z-[2] bg-ink/38" />

      {/* Background video that cannot be stopped fails WCAG 2.2.2 once it runs
          past five seconds, and this loop does. */}
      {variant && !reduce && (
        <motion.button
          type="button"
          onClick={toggle}
          aria-pressed={!playing}
          style={controlStyle}
          // Icon-only on phones: the label would sit on top of the vertical
          // ticker sharing this row.
          className="group absolute right-5 bottom-6 z-[14] flex h-10 items-center justify-center gap-2.5 rounded-full border border-white/20 bg-indigo-ink/60 px-3.5 text-white/70 backdrop-blur-sm transition-colors duration-300 hover:border-cyan-brand/60 hover:text-white md:right-10 md:px-4 xl:right-16"
        >
          {playing ? (
            <svg width="9" height="11" viewBox="0 0 9 11" aria-hidden fill="currentColor">
              <rect width="3" height="11" rx="0.5" />
              <rect x="6" width="3" height="11" rx="0.5" />
            </svg>
          ) : (
            <svg width="9" height="11" viewBox="0 0 9 11" aria-hidden fill="currentColor">
              <path d="M0 .5v10l9-5z" />
            </svg>
          )}
          <span className="eyebrow sr-only md:not-sr-only">
            {playing ? "Pause footage" : "Play footage"}
          </span>
        </motion.button>
      )}
    </>
  );
}
