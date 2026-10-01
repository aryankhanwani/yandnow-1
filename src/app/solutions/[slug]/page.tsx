import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Frame from "@/components/Frame";
import { programmes, solutions, solutionBySlug } from "@/lib/site";
import {
  MaskLines,
  Parallax,
  Reveal,
  RevealGroup,
  RevealItem,
  StatNumber,
} from "@/components/motion-primitives";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = solutionBySlug(slug);
  if (!s) return {};
  return { title: s.title, description: s.lede };
}

export default async function SolutionPage({ params }: PageProps<"/solutions/[slug]">) {
  const { slug } = await params;
  const s = solutionBySlug(slug);
  if (!s) notFound();

  const i = solutions.findIndex((x) => x.slug === s.slug);
  const next = solutions[(i + 1) % solutions.length];
  // Pages with their own "work in practice" list lead with that; the rest
  // fall back to the archive entries filed under the same solution area.
  const related = s.work ? [] : programmes.filter((p) => p.vertical === s.short).slice(0, 3);
  // Areas have 1–3 archived programmes. A fixed 3-up grid left one or two
  // dead cells showing the divider colour, so the track follows the count and
  // the cards scale up to fill the row instead.
  const relatedCols =
    related.length === 1
      ? "md:grid-cols-1"
      : related.length === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-3";
  const roomy = related.length < 3;
  const solo = related.length === 1;
  const accentText = s.accent === "cyan" ? "text-cyan-brand" : "text-indigo-brand";
  const accentBg = s.accent === "cyan" ? "bg-cyan-brand" : "bg-indigo-brand";
  const stepCols =
    s.steps && s.steps.items.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3";
  const statIsFigure = s.stat ? /^[^0-9]{0,2}[0-9]/.test(s.stat.value) : false;

  return (
    <>
      <PageHero
        eyebrow={`Solution ${s.index} · ${s.short}`}
        lines={s.headline}
        lede={s.lede}
        photo={s.hero}
        photoAlt={`${s.title}: ${s.summary}`}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: s.short, href: `/solutions/${s.slug}` },
        ]}
        meta={s.meta}
        cta={{ label: s.ctaLabel, href: "/contact" }}
      />

      {/* What we cover */}
      <section className="bg-paper-warm py-20 md:py-28">
        <div className="shell grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-20">
          <div className="lg:w-[13rem]">
            <p className="eyebrow text-ink-30">What we cover</p>
            <span className="mt-5 block h-px w-full bg-line" />
          </div>
          <div>
            {s.coverIntro && (
              <Reveal>
                <p className="lede mb-10 max-w-[56ch] text-ink-70">{s.coverIntro}</p>
              </Reveal>
            )}
            <RevealGroup className="grid gap-x-10 gap-y-6 sm:grid-cols-2 md:gap-y-7" stagger={0.06}>
              {s.cover.map((a) => (
                <RevealItem key={a} y={16} className="flex items-start gap-4">
                  <span className={`mt-[0.65rem] h-[2px] w-6 shrink-0 ${accentBg}`} />
                  <span className="font-display text-[1.125rem] leading-snug font-medium tracking-[-0.02em] md:text-[1.1875rem]">
                    {a}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* How we approach it — numbered rows with hairline separators */}
      <section className="border-t border-line bg-paper py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <p className={`eyebrow ${accentText}`}>How we approach it</p>
          </Reveal>
          <MaskLines
            as="h2"
            className="display-md mt-6 max-w-[22ch] font-semibold"
            lines={["What sits behind", "the programme."]}
          />

          <ul className="mt-12 border-t border-line md:mt-14">
            {s.approach.map((o, idx) => (
              <li key={o.title} className="border-b border-line">
                <Reveal y={16}>
                  <div className="grid gap-4 py-8 md:grid-cols-[4rem_1fr_1.15fr] md:items-baseline md:gap-8 md:py-9">
                    <span className="font-mono text-xs tracking-[0.16em] text-ink-30 tabular-nums">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-[1.375rem] leading-[1.15] font-semibold tracking-[-0.03em] md:text-[1.5rem]">
                      {o.title}
                    </h3>
                    <div className="space-y-4">
                      {o.body.map((para) => (
                        <p key={para} className="text-[1.0625rem] leading-relaxed text-ink-70">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-wrap items-center gap-2.5 md:mt-14 md:gap-3">
              <p className="eyebrow mr-2 w-full text-ink-30 sm:w-auto">Built for</p>
              {s.audience.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-line bg-paper-warm px-4 py-2 text-[0.8125rem] font-medium text-ink-70"
                >
                  {f}
                </span>
              ))}
            </div>
          </Reveal>

          {s.scope && (
            <Reveal delay={0.14}>
              <p className="mt-8 max-w-[70ch] border-l-2 border-line pl-4 text-[0.875rem] leading-relaxed text-ink-50">
                {s.scope}
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {/* Steps — a short sequence, where the page has one */}
      {s.steps && (
        <section className="bg-paper-warm py-20 md:py-28">
          <div className="shell">
            <Reveal>
              <p className={`eyebrow ${accentText}`}>{s.steps.eyebrow}</p>
            </Reveal>
            <MaskLines
              as="h2"
              className="display-md mt-6 max-w-[22ch] font-semibold"
              lines={s.steps.title}
            />
            <RevealGroup
              className={`mt-12 grid gap-px border border-line bg-line md:mt-14 ${stepCols}`}
              stagger={0.07}
            >
              {s.steps.items.map((st, idx) => (
                <RevealItem key={st.title} className="bg-paper-warm p-7 md:p-8" y={18}>
                  <span className={`font-mono text-xs tracking-[0.16em] tabular-nums ${accentText}`}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-display text-[1.375rem] leading-[1.15] font-semibold tracking-[-0.03em]">
                    {st.title}
                  </h3>
                  <p className="mt-3 text-[1rem] leading-relaxed text-ink-70">{st.body}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* List and / or supporting figure, on the brand band */}
      {(s.list || s.stat) && (
        <section className="bg-indigo-brand py-20 text-paper-warm md:py-28">
          <div
            className={`shell grid gap-14 ${s.list && s.stat ? "lg:grid-cols-[1.15fr_0.85fr] lg:gap-20" : ""}`}
          >
            {s.list && (
              <div>
                <Reveal>
                  <p className="eyebrow text-cyan-soft">{s.list.eyebrow}</p>
                </Reveal>
                <MaskLines
                  as="h2"
                  className="display-md mt-6 max-w-[22ch] font-semibold"
                  lines={s.list.title}
                />
                {s.list.intro && (
                  <Reveal delay={0.08}>
                    <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-white/65">
                      {s.list.intro}
                    </p>
                  </Reveal>
                )}
                <RevealGroup
                  className="mt-10 grid gap-x-8 gap-y-4 border-t border-white/15 pt-8 sm:grid-cols-2"
                  stagger={0.045}
                >
                  {s.list.items.map((item) => (
                    <RevealItem key={item} y={14} className="flex items-start gap-3">
                      <span className="mt-[0.6rem] h-[2px] w-4 shrink-0 bg-cyan-brand" />
                      <span className="text-[1rem] leading-relaxed font-medium">{item}</span>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            )}

            {s.stat && (
              <Reveal delay={0.1} className={s.list ? "lg:pt-2" : ""}>
                <div
                  className={
                    s.list
                      ? "border border-white/15 p-7 md:p-9"
                      : "grid gap-8 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-20"
                  }
                >
                  <div>
                    <p className="eyebrow text-cyan-soft">{s.stat.eyebrow}</p>
                    {statIsFigure ? (
                      <StatNumber
                        value={s.stat.value}
                        className="mt-6 block font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.92] font-semibold tracking-[-0.045em]"
                      />
                    ) : (
                      <p className="mt-6 font-display text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.05] font-semibold tracking-[-0.035em]">
                        {s.stat.value}
                      </p>
                    )}
                  </div>
                  <div className={s.list ? "mt-5" : ""}>
                    <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-white/75">
                      {s.stat.label}
                    </p>
                    {s.stat.body && (
                      <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-white/55">
                        {s.stat.body}
                      </p>
                    )}
                    {s.stat.source && (
                      <p className="mt-4 font-mono text-[0.625rem] tracking-[0.11em] text-white/45 uppercase">
                        Source · {s.stat.source}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* Gallery — offset masonry with opposed parallax */}
      <section className="bg-ink py-20 text-paper-warm md:py-28">
        <div className="shell">
          <Reveal>
            <p className="eyebrow text-cyan-brand">In action</p>
          </Reveal>
          <MaskLines
            as="h2"
            className="display-md mt-6 max-w-[20ch] font-semibold"
            lines={["Photographed on", "live programmes."]}
          />

          {/* Three columns, each photo at its own ratio. The stagger comes from
              column offsets, not from cropping anything into a shape. */}
          <div className="mt-12 grid grid-cols-2 items-start gap-3 sm:gap-4 md:mt-14 lg:grid-cols-3 lg:gap-6">
            {s.gallery.map((g, idx) => (
              <Parallax
                key={g}
                distance={idx % 2 === 0 ? 24 : -24}
                className={idx % 3 === 1 ? "lg:pt-14" : ""}
              >
                <Frame
                  name={g}
                  alt={`${s.title} programme photograph`}
                  className="w-full"
                  fit="natural"
                  sizes="(min-width: 1024px) 30vw, 46vw"
                />
              </Parallax>
            ))}
          </div>
        </div>
      </section>

      {/* Work in practice */}
      {s.work && (
        <section className="bg-paper-warm py-20 md:py-28">
          <div className="shell">
            <Reveal>
              <p className={`eyebrow ${accentText}`}>{s.work.eyebrow}</p>
            </Reveal>
            <MaskLines
              as="h2"
              className="display-md mt-6 max-w-[22ch] font-semibold"
              lines={s.work.title}
            />
            <RevealGroup
              className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
              stagger={0.06}
            >
              {s.work.items.map((w) => (
                <RevealItem key={w.client} className="bg-paper-warm p-7 md:p-8" y={18}>
                  <h3 className="font-display text-[1.3125rem] leading-[1.2] font-semibold tracking-[-0.025em]">
                    {w.client}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-70">{w.body}</p>
                </RevealItem>
              ))}
              {/* Fills the last cell of the 3-up grid and routes onward. */}
              <RevealItem y={18}>
                <Link
                  href="/impact"
                  className="group flex h-full flex-col justify-between gap-6 bg-ink p-7 text-paper-warm transition-colors duration-300 hover:bg-indigo-brand md:p-8"
                >
                  <span className="eyebrow text-cyan-brand">Case studies</span>
                  <span className="inline-flex items-center gap-2 font-display text-[1.3125rem] font-semibold tracking-[-0.025em]">
                    View all case studies
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </RevealItem>
            </RevealGroup>
          </div>
        </section>
      )}

      {/* Related programmes */}
      {related.length > 0 && (
        <section className="bg-paper-warm py-20 md:py-28">
          <div className="shell">
            <Reveal>
              <p className={`eyebrow ${accentText}`}>Delivered</p>
            </Reveal>
            <MaskLines
              as="h2"
              className="display-md mt-6 max-w-[22ch] font-semibold"
              lines={["Recent programmes", "in this area."]}
            />

            <RevealGroup
              className={`mt-12 grid gap-px border border-line bg-line ${relatedCols}`}
              stagger={0.07}
            >
              {related.map((p) =>
                solo ? (
                  // A lone card owns the full row, so its content runs across
                  // that width instead of hugging the left edge of it.
                  <RevealItem key={p.title} className="bg-paper-warm p-7 md:p-10" y={18}>
                    <div className="grid gap-x-10 gap-y-5 md:grid-cols-[8rem_1fr_auto] md:items-start">
                      <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-ink-30 tabular-nums">
                        {p.year}
                      </p>
                      <div>
                        <h3 className="max-w-[26ch] font-display text-[1.375rem] leading-[1.25] font-semibold tracking-[-0.025em] md:text-[1.625rem]">
                          {p.title}
                        </h3>
                        <p className="mt-3 text-[0.9375rem] text-ink-50">
                          {p.partner} · {p.place}
                        </p>
                      </div>
                      <ul className="flex flex-wrap gap-1.5 md:justify-end">
                        {p.trades.map((t) => (
                          <li
                            key={t}
                            className="rounded-full border border-line px-2.5 py-1 text-[0.75rem] text-ink-50"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </RevealItem>
                ) : (
                  <RevealItem
                    key={p.title}
                    className={`bg-paper-warm ${roomy ? "p-7 md:p-9" : "p-7"}`}
                    y={18}
                  >
                    <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-ink-30 tabular-nums">
                      {p.year}
                    </p>
                    <h3
                      className={`mt-4 font-display leading-[1.25] font-semibold tracking-[-0.025em] ${
                        roomy ? "text-[1.3125rem]" : "text-[1.1875rem]"
                      }`}
                    >
                      {p.title}
                    </h3>
                    <p className="mt-3 text-sm text-ink-50">
                      {p.partner} · {p.place}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {p.trades.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-line px-2.5 py-1 text-[0.75rem] text-ink-50"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </RevealItem>
                ),
              )}
            </RevealGroup>

            <Reveal delay={0.1}>
              <Link
                href="/impact"
                className="group mt-10 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink"
              >
                <span className="relative">
                  View all case studies
                  <span className="absolute -bottom-[3px] left-0 h-px w-full origin-left scale-x-0 bg-indigo-brand transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                </span>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                  <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* Close — the page's one primary action, restated */}
      <section className="border-t border-line bg-paper-warm py-16 md:py-20">
        <div className="shell grid gap-8 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
          <div>
            <Reveal>
              <p className={`eyebrow ${accentText}`}>Next step</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display-md mt-5 max-w-[22ch] font-semibold">{s.close.title}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[54ch] text-[1.0625rem] leading-relaxed text-ink-70">
                {s.close.body}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.14}>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 font-medium text-paper-warm transition-colors duration-300 hover:bg-indigo-brand sm:px-7 sm:py-4"
            >
              {s.ctaLabel}
              <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden className="shrink-0 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Next solution */}
      <section className="border-t border-line bg-paper">
        <Link href={`/solutions/${next.slug}`} className="group block">
          <div className="shell grid items-center gap-8 py-16 md:grid-cols-[1fr_auto] md:py-20">
            <div>
              <p className="eyebrow text-ink-30">Next solution · {next.index}</p>
              <h2 className="display-md mt-5 max-w-[20ch] font-semibold transition-colors duration-500 group-hover:text-indigo-brand">
                {next.title}
              </h2>
              <p className="mt-4 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-50">
                {next.summary}
              </p>

              {/* Styled as a button but rendered as a span: the whole block is
                  already one <Link>, and nesting an anchor inside an anchor is
                  invalid and breaks keyboard navigation. */}
              <span className="mt-8 inline-flex items-center gap-3 rounded-full border border-ink/15 px-6 py-3.5 font-medium text-ink transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper-warm">
                {next.linkLabel}
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden
                  className="transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                >
                  <path
                    d="M2 7h10M8 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
            <div className="overflow-hidden md:w-[22rem]">
              <Frame
                name={next.hero}
                alt={next.title}
                className="aspect-[4/3] w-full"
                imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                sizes="(min-width: 768px) 22rem, 100vw"
              />
            </div>
          </div>
        </Link>
      </section>
    </>
  );
}
