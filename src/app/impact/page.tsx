import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import PartnerMarquee from "@/components/sections/PartnerMarquee";
import ArchiveExplorer from "@/components/sections/ArchiveExplorer";
import { caseStudies, programmes, storyFormat } from "@/lib/site";
import {
  MaskLines,
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/components/motion-primitives";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real work, real learning, real outcomes: Y&Now case studies with Tata Group, JSW Energy, Castrol India, BPCL and Jaquar, plus our programme archive.",
};

export default function ImpactPage() {
  const years = [...new Set(programmes.map((p) => p.year))].length;

  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        lines={["Real work.", "Real learning.", "Real outcomes."]}
        lede="Our approach is easiest to understand through the organisations we have built programmes for."
        photo="defence-assembly"
        photoAlt="Uniformed personnel assembled in a hall for a technical training briefing"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Case Studies", href: "/impact" },
        ]}
        meta={[
          { label: "Featured case studies", value: String(caseStudies.length).padStart(2, "0") },
          { label: "Programmes in the archive", value: String(programmes.length) },
          { label: "Programme years", value: String(years) },
        ]}
      />

      {/* Featured case studies */}
      <section className="bg-indigo-brand py-20 text-paper-warm md:py-28">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Reveal>
                <p className="eyebrow text-cyan-soft">Featured work</p>
              </Reveal>
              <MaskLines
                as="h2"
                className="display-md mt-6 max-w-[22ch] font-semibold"
                lines={["Organisations we have", "built programmes for."]}
              />
            </div>
            <Reveal delay={0.1}>
              <p className="max-w-[36ch] text-[0.9375rem] leading-relaxed text-white/60">
                Different sectors, different roles, one approach: start with the work,
                close the gap, then show what changed.
              </p>
            </Reveal>
          </div>

          <RevealGroup
            className="mt-12 grid gap-px border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-3 md:mt-14"
            stagger={0.06}
          >
            {caseStudies.map((c, i) => (
              <RevealItem key={c.client} className="flex flex-col bg-indigo-brand p-7 md:p-8" y={18}>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-cyan-soft tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-white/15" />
                  <span className="eyebrow text-white/45">{c.area}</span>
                </div>
                <h3 className="mt-6 font-display text-[1.375rem] leading-[1.15] font-semibold tracking-[-0.03em] md:text-[1.5rem]">
                  {c.client}
                </h3>
                <p className="mt-3 text-[1rem] leading-relaxed text-white/70">{c.body}</p>
              </RevealItem>
            ))}
            {/* Sixth cell: closes the 3-up grid and routes to the next step. */}
            <RevealItem y={18}>
              <Link
                href="/contact"
                className="group flex h-full flex-col justify-between gap-6 bg-indigo-deep p-7 transition-colors duration-300 hover:bg-indigo-ink md:p-8"
              >
                <span className="eyebrow text-cyan-brand">Have a similar requirement?</span>
                <span className="inline-flex items-center gap-2 font-display text-[1.375rem] font-semibold tracking-[-0.03em]">
                  Talk to Y&amp;Now
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* How we tell each story */}
      <section className="bg-ink py-24 text-paper-warm md:py-32">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow text-cyan-brand">How we tell each story</p>
            </Reveal>
            <MaskLines
              as="h2"
              className="display-md mt-6 max-w-[18ch] font-semibold"
              lines={["Six parts,", "every time."]}
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[40ch] text-[1.0625rem] leading-relaxed text-white/60">
                Every case study follows the same structure, so they can be compared —
                not just read.
              </p>
            </Reveal>
          </div>

          <ol className="border-t border-white/10">
            {storyFormat.map((f, i) => (
              <li key={f.title} className="border-b border-white/10">
                <Reveal y={14}>
                  <div className="grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-1 py-5 sm:grid-cols-[3rem_9rem_1fr] sm:items-baseline sm:gap-x-6 md:py-6">
                    <span className="font-mono text-xs tracking-[0.16em] text-cyan-brand tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-[1.1875rem] font-semibold tracking-[-0.025em]">
                      {f.title}
                    </h3>
                    <p className="col-start-2 text-[1rem] leading-relaxed text-white/60 sm:col-start-auto">
                      {f.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ArchiveExplorer programmes={programmes} />

      {/* Have a similar requirement? */}
      <section className="border-t border-line bg-paper py-16 md:py-20">
        <div className="shell grid gap-8 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow text-indigo-brand">Next step</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display-md mt-5 max-w-[22ch] font-semibold">
                Have a similar requirement?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[50ch] text-[1.0625rem] leading-relaxed text-ink-70">
                Most of these started as a single conversation about one specific gap.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.14}>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 font-medium text-paper-warm transition-colors duration-300 hover:bg-indigo-brand sm:px-7 sm:py-4"
            >
              Talk to Y&amp;Now
              <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>

      <PartnerMarquee />
    </>
  );
}
