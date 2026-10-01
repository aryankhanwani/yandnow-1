"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Frame from "@/components/Frame";
import type { Programme } from "@/lib/site";
import { MaskLines, Reveal } from "@/components/motion-primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Filterable archive. Layout animation moves surviving rows rather than
 * re-mounting the list, so a filter change reads as a sort, not a page swap.
 */
export default function ArchiveExplorer({ programmes }: { programmes: Programme[] }) {
  const verticals = useMemo(
    () => ["All", ...new Set(programmes.map((p) => p.vertical))],
    [programmes],
  );
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(programmes[0]?.title ?? null);

  const shown =
    filter === "All" ? programmes : programmes.filter((p) => p.vertical === filter);

  return (
    <section className="bg-paper-warm py-24 md:py-32">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Reveal>
              <p className="eyebrow text-indigo-brand">More work</p>
            </Reveal>
            <MaskLines
              as="h2"
              className="display-lg mt-6 max-w-[18ch] font-semibold"
              lines={["The programme", "archive, by year."]}
            />
          </div>

          {/* Filter chips */}
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by solution area">
              {verticals.map((v) => {
                const active = filter === v;
                return (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setFilter(v)}
                    aria-pressed={active}
                    className={`rounded-full border px-4 py-2 text-[0.8125rem] font-medium transition-colors duration-300 ${
                      active
                        ? "border-ink bg-ink text-paper-warm"
                        : "border-line bg-paper-warm text-ink-50 hover:border-ink-30 hover:text-ink"
                    }`}
                  >
                    {v}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <p className="mt-8 font-mono text-[0.6875rem] tracking-[0.12em] text-ink-30 uppercase tabular-nums">
          {shown.length} {shown.length === 1 ? "programme" : "programmes"}
        </p>

        <motion.ul layout className="mt-4 border-t border-line">
          <AnimatePresence initial={false} mode="popLayout">
            {shown.map((p) => {
              const isOpen = expanded === p.title;
              return (
                <motion.li
                  key={p.title}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="border-b border-line"
                >
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : p.title)}
                    aria-expanded={isOpen}
                    className="group grid w-full gap-x-6 gap-y-2 py-7 text-left md:grid-cols-[6.5rem_1fr_11rem_auto] md:items-baseline"
                  >
                    <span className="font-mono text-xs tracking-[0.14em] text-indigo-brand tabular-nums">
                      {p.year}
                    </span>

                    <span
                      className={`font-display text-[1.25rem] leading-[1.25] font-semibold tracking-[-0.03em] transition-colors duration-300 md:text-[1.4375rem] ${
                        isOpen ? "text-ink" : "text-ink-70 group-hover:text-ink"
                      }`}
                    >
                      {p.title}
                    </span>

                    <span className="text-[0.9375rem] text-ink-50">{p.partner}</span>

                    <span className="hidden justify-self-end md:block">
                      <span className="relative block h-3.5 w-3.5">
                        <span className="absolute top-1/2 left-0 block h-[1.5px] w-full -translate-y-1/2 bg-indigo-brand" />
                        <motion.span
                          className="absolute top-0 left-1/2 block h-full w-[1.5px] -translate-x-1/2 bg-indigo-brand"
                          animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }}
                          transition={{ duration: 0.4, ease: EASE }}
                        />
                      </span>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-6 pb-9 md:grid-cols-[6.5rem_1fr] md:gap-x-6">
                          <div className="hidden md:block" />
                          <div>
                            <dl className="flex flex-wrap gap-x-10 gap-y-4">
                              <div>
                                <dt className="eyebrow text-ink-30">Solution area</dt>
                                <dd className="mt-1.5 text-[0.9375rem] font-medium">
                                  {p.vertical}
                                </dd>
                              </div>
                              <div>
                                <dt className="eyebrow text-ink-30">Location</dt>
                                <dd className="mt-1.5 text-[0.9375rem] font-medium">
                                  {p.place}
                                </dd>
                              </div>
                              <div>
                                <dt className="eyebrow text-ink-30">Trades</dt>
                                <dd className="mt-1.5 text-[0.9375rem] font-medium">
                                  {p.trades.join(" · ")}
                                </dd>
                              </div>
                            </dl>

                            <div
                              className={`mt-7 grid gap-3 ${
                                p.photos.length > 2 ? "sm:grid-cols-3" : "sm:grid-cols-2"
                              }`}
                            >
                              {p.photos.map((ph) => (
                                <Frame
                                  key={ph}
                                  name={ph}
                                  alt={`${p.title} — ${p.partner}`}
                                  className="aspect-[4/3] w-full"
                                  sizes="(min-width: 640px) 28vw, 100vw"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
