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
  return { title: s.title, description: s.summary };
}

export default async function SolutionPage({ params }: PageProps<"/solutions/[slug]">) {
  const { slug } = await params;
  const s = solutionBySlug(slug);
  if (!s) notFound();

  const i = solutions.findIndex((x) => x.slug === s.slug);
  const next = solutions[(i + 1) % solutions.length];
  const related = programmes.filter((p) => p.vertical === s.short).slice(0, 3);
  const accentText = s.accent === "cyan" ? "text-cyan-brand" : "text-indigo-brand";

  return (
    <>
      <PageHero
        eyebrow={`Vertical ${s.index} · ${s.short}`}
        lines={s.title.split(" ").length > 2 ? splitTitle(s.title) : [s.title]}
        lede={s.lede}
        photo={s.hero}
        photoAlt={`${s.title}: ${s.summary}`}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: s.short, href: `/solutions/${s.slug}` },
        ]}
        meta={s.outcomes.map((o) => ({ label: o.label, value: o.stat }))}
      />

      {/* Who it's for */}
      <section className="bg-paper-warm py-20 md:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[auto_1fr] lg:gap-20">
          <div className="lg:w-[13rem]">
            <p className="eyebrow text-ink-30">Built for</p>
            <span className="mt-5 block h-px w-full bg-line" />
          </div>
          <RevealGroup className="grid gap-x-10 gap-y-7 sm:grid-cols-2" stagger={0.06}>
            {s.audience.map((a) => (
              <RevealItem key={a} y={16} className="flex items-start gap-4">
                <span className={`mt-[0.65rem] h-[2px] w-6 shrink-0 ${s.accent === "cyan" ? "bg-cyan-brand" : "bg-indigo-brand"}`} />
                <span className="font-display text-[1.1875rem] font-medium tracking-[-0.025em]">
                  {a}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Offerings — numbered rows with hairline separators */}
      <section className="border-t border-line bg-paper py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <p className={`eyebrow ${accentText}`}>What we deliver</p>
          </Reveal>
          <MaskLines
            as="h2"
            className="display-md mt-6 max-w-[22ch] font-semibold"
            lines={["The modules inside", "this vertical."]}
          />

          <ul className="mt-14 border-t border-line">
            {s.offerings.map((o, idx) => (
              <li key={o.title} className="border-b border-line">
                <Reveal y={16}>
                  <div className="grid gap-4 py-9 md:grid-cols-[4rem_1fr_1.15fr] md:items-baseline md:gap-8">
                    <span className="font-mono text-xs tracking-[0.16em] text-ink-30 tabular-nums">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-[1.375rem] leading-[1.15] font-semibold tracking-[-0.03em] md:text-[1.5rem]">
                      {o.title}
                    </h3>
                    <p className="text-[1.0625rem] leading-relaxed text-ink-70">
                      {o.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={0.1}>
            <div className="mt-14 flex flex-wrap items-center gap-3">
              <p className="eyebrow mr-2 text-ink-30">Delivery formats</p>
              {s.formats.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-line bg-paper-warm px-4 py-2 text-[0.8125rem] font-medium text-ink-70"
                >
                  {f}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery — offset masonry with opposed parallax */}
      <section className="bg-ink py-20 text-paper-warm md:py-28">
        <div className="shell">
          <Reveal>
            <p className="eyebrow text-cyan-brand">From this vertical</p>
          </Reveal>
          <MaskLines
            as="h2"
            className="display-md mt-6 max-w-[20ch] font-semibold"
            lines={["Photographed on", "live cohorts."]}
          />

          {/* Three columns, each photo at its own ratio. The stagger comes from
              column offsets, not from cropping anything into a shape. */}
          <div className="mt-14 grid grid-cols-2 items-start gap-4 lg:grid-cols-3 lg:gap-6">
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
              lines={["Recent programmes", "in this vertical."]}
            />

            <RevealGroup className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3" stagger={0.07}>
              {related.map((p) => (
                <RevealItem key={p.title} className="bg-paper-warm p-7" y={18}>
                  <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-ink-30 tabular-nums">
                    {p.year}
                  </p>
                  <h3 className="mt-4 font-display text-[1.1875rem] leading-[1.25] font-semibold tracking-[-0.025em]">
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
              ))}
            </RevealGroup>

            <Reveal delay={0.1}>
              <Link
                href="/impact"
                className="group mt-10 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink"
              >
                <span className="relative">
                  See the full archive
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

      {/* Next vertical */}
      <section className="border-t border-line bg-paper">
        <Link href={`/solutions/${next.slug}`} className="group block">
          <div className="shell grid items-center gap-8 py-16 md:grid-cols-[1fr_auto] md:py-20">
            <div>
              <p className="eyebrow text-ink-30">Next vertical · {next.index}</p>
              <h2 className="display-md mt-5 max-w-[20ch] font-semibold transition-colors duration-500 group-hover:text-indigo-brand">
                {next.title}
              </h2>
              <p className="mt-4 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-50">
                {next.summary}
              </p>
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

/** Break a title into two display lines at the midpoint word boundary. */
function splitTitle(title: string): string[] {
  const words = title.split(" ");
  if (words.length < 3) return [title];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}
