import Link from "next/link";
import { caseStudies, featuredWork } from "@/lib/site";
import { MaskLines, Reveal, RevealGroup, RevealItem } from "@/components/motion-primitives";

/** "Work we can show you" — three case studies, text-led, linking to the rest. */
export default function FeaturedWork() {
  const items = featuredWork
    .map((name) => caseStudies.find((c) => c.client === name))
    .filter((c): c is (typeof caseStudies)[number] => Boolean(c));

  return (
    <section className="bg-paper-warm py-24 md:py-32">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Reveal>
              <p className="eyebrow text-indigo-brand">Case studies</p>
            </Reveal>
            <MaskLines
              as="h2"
              className="display-lg mt-6 max-w-[18ch] font-semibold"
              lines={["Work we can", "show you."]}
            />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-[36ch] text-[0.9375rem] leading-relaxed text-ink-50">
              Each one started as a conversation about one specific gap — and ended
              with a programme built around the people doing the work.
            </p>
          </Reveal>
        </div>

        <RevealGroup
          className="mt-14 grid gap-px border border-line bg-line md:mt-16 md:grid-cols-3"
          stagger={0.07}
        >
          {items.map((c, i) => (
            <RevealItem key={c.client} className="flex flex-col bg-paper-warm p-7 md:p-8" y={18}>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-indigo-brand tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-line" />
                <span className="eyebrow text-ink-30">{c.area}</span>
              </div>
              <h3 className="mt-6 font-display text-[1.5rem] leading-[1.15] font-semibold tracking-[-0.03em] md:text-[1.625rem]">
                {c.client}
              </h3>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-70">{c.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <Link
            href="/impact"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 font-medium text-paper-warm transition-colors duration-300 hover:bg-indigo-brand"
          >
            View all case studies
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
