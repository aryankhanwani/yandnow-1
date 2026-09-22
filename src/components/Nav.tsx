"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { nav, site, solutions } from "@/lib/site";
import Logo from "./Logo";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Nav() {
  const pathname = usePathname();
  const [condensed, setCondensed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  // Which desktop nav item has its dropdown showing (only Solutions has one).
  const [menu, setMenu] = useState<string | null>(null);
  const { scrollY } = useScroll();

  // Condense past the fold; hide on downward scroll, reveal the moment the
  // user reverses — the header should never be more than a flick away.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setCondensed(y > 24);
    setHidden(y > 220 && y > prev && !open);
  });

  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    return () => document.documentElement.classList.remove("lenis-stopped");
  }, [open]);

  // Every page opens on a dark hero plate, so the header inverts to light
  // type until the paper backdrop appears beneath it.
  const onDark = !condensed || open;

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? "-105%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div
          className={[
            "transition-[background-color,backdrop-filter,border-color] duration-500",
            condensed && !open
              ? "border-b border-line/80 bg-paper-warm/80 backdrop-blur-xl"
              : "border-b border-transparent",
          ].join(" ")}
        >
          <div className="shell flex h-[76px] items-center justify-between gap-6">
            <Link
              href="/"
              aria-label={`${site.name} — home`}
              className="group relative z-10 -ml-1 flex items-center gap-2.5 px-1 py-2"
            >
              {/* Both tones are rendered and cross-faded: swapping `src` on a
                  single <Image> flashes while the new file decodes. */}
              <span className="relative block h-[30px] md:h-[35px]">
                <Logo
                  tone="colour"
                  priority
                  className={`h-full transition-opacity duration-500 ${onDark ? "opacity-0" : "opacity-100"}`}
                />
                <Logo
                  tone="white"
                  priority
                  className={`absolute inset-0 h-full transition-opacity duration-500 ${onDark ? "opacity-100" : "opacity-0"}`}
                />
              </span>
            </Link>

            <nav
              className="hidden items-center gap-1 md:flex"
              onMouseLeave={() => setMenu(null)}
            >
              {nav.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);
                const hasMenu = item.href === "/solutions";

                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setMenu(hasMenu ? item.href : null)}
                    // Focus counts as intent too, so the panel is reachable by
                    // keyboard; blurring out of the whole group closes it.
                    onFocus={() => setMenu(hasMenu ? item.href : null)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                        setMenu(null);
                      }
                    }}
                  >
                    <Link
                      href={item.href}
                      aria-expanded={hasMenu ? menu === item.href : undefined}
                      className={`group relative flex items-center gap-1.5 px-3.5 py-2 text-[0.9375rem] font-medium transition-colors duration-300 ${
                        onDark
                          ? "text-white/70 hover:text-white"
                          : "text-ink-70 hover:text-ink"
                      }`}
                    >
                      {item.label}
                      {hasMenu && (
                        <svg
                          width="9"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                          aria-hidden
                          className={`mt-px transition-transform duration-300 ${
                            menu === item.href ? "rotate-180" : ""
                          }`}
                        >
                          <path
                            d="M1 1l4 4 4-4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                      <span
                        className={[
                          "absolute inset-x-3.5 -bottom-0.5 h-[1.5px] origin-left transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          onDark ? "bg-cyan-brand" : "bg-indigo-brand",
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        ].join(" ")}
                      />
                    </Link>

                    {hasMenu && (
                      <AnimatePresence>
                        {menu === item.href && (
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.28, ease: EASE }}
                            className="absolute top-full left-0 pt-3"
                          >
                            <div className="w-[18rem] overflow-hidden rounded-xl border border-line bg-paper-warm p-2 shadow-[0_18px_50px_-18px_rgb(12_13_28/0.28)]">
                              {solutions.map((s) => (
                                <Link
                                  key={s.slug}
                                  href={`/solutions/${s.slug}`}
                                  onClick={() => setMenu(null)}
                                  className="flex items-baseline gap-3 rounded-lg px-3 py-2.5 transition-colors duration-200 hover:bg-paper"
                                >
                                  <span className="font-mono text-[0.625rem] tracking-[0.14em] text-ink-30 tabular-nums">
                                    {s.index}
                                  </span>
                                  <span className="min-w-0 text-[0.9375rem] font-medium text-ink">
                                    {s.title}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}

              <Link
                href="/contact"
                className={`ml-3 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.9375rem] font-medium transition-colors duration-300 ${
                  onDark
                    ? "bg-paper-warm text-ink hover:bg-cyan-brand"
                    : "bg-ink text-paper-warm hover:bg-indigo-brand"
                }`}
              >
                Start a programme
                <Arrow />
              </Link>
            </nav>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-10 -mr-2 flex h-11 w-11 items-center justify-center md:hidden"
            >
              <span className="relative block h-3 w-6">
                <motion.span
                  className={`absolute left-0 block h-[1.5px] w-6 ${onDark ? "bg-paper-warm" : "bg-ink"}`}
                  animate={{ top: open ? 5 : 0, rotate: open ? 45 : 0 }}
                  transition={{ duration: 0.36, ease: EASE }}
                />
                <motion.span
                  className={`absolute left-0 block h-[1.5px] w-6 ${onDark ? "bg-paper-warm" : "bg-ink"}`}
                  animate={{ top: open ? 5 : 11, rotate: open ? -45 : 0 }}
                  transition={{ duration: 0.36, ease: EASE }}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-indigo-ink text-paper-warm md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.62, ease: EASE }}
          >
            <div className="shell flex h-full flex-col pt-28 pb-10">
              <motion.nav
                className="flex flex-col"
                initial="hidden"
                animate="shown"
                variants={{ shown: { transition: { staggerChildren: 0.055, delayChildren: 0.18 } } }}
              >
                {nav.map((item) => (
                  <motion.div
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, y: 26 },
                      shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                    }}
                    className="border-b border-white/10"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-5 font-display text-[2rem] tracking-[-0.035em]"
                    >
                      {item.label}
                      <Arrow className="text-cyan-brand" />
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.42, duration: 0.6 }}
              >
                <p className="eyebrow text-cyan-brand">Six verticals</p>
                <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                  {solutions.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/solutions/${s.slug}`}
                        onClick={() => setOpen(false)}
                        className="block py-1 text-[0.9375rem] text-white/65 transition-colors hover:text-white"
                      >
                        {s.short}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className="mt-auto pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-cyan-brand px-6 py-4 font-medium text-indigo-ink"
                >
                  Start a programme
                  <Arrow />
                </Link>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-5 block font-mono text-xs tracking-[0.1em] text-white/50 uppercase"
                >
                  {site.email}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M3 11L11 3M11 3H5M11 3V9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
