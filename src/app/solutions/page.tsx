import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Frame from "@/components/Frame";
import PartnerMarquee from "@/components/sections/PartnerMarquee";
import WhyChoose from "@/components/sections/WhyChoose";
import { learners, solutions } from "@/lib/site";
import {
  MaskLines,
  Reveal,
  RevealGroup,
  RevealItem,
  StatNumber,
} from "@/components/motion-primitives";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Practical learning for every audience: corporate training, CSR programmes, industry solutions, defence programmes, school solutions, micro-entrepreneurship and courses for learners.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        lines={["Find the route", "that fits your goal."]}
        lede="Six solution areas for organisations, plus courses for individual learners. Start where you sit — or tell us the outcome you need and we will point you to the right route."
        photo="engine-cohort"
        photoAlt="A cohort of technicians gathered around a heavy-vehicle engine on a training stand"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
        ]}
        meta={[
          { label: "Solution areas", value: "06" },
          { label: "Audiences we serve", value: "07" },
          { label: "Steps in every programme", value: "05" },
        ]}
      />

      {/* Vertical index — alternating full-width rows */}
      <section className="bg-paper-warm">
        <ul>
          {solutions.map((s, i) => (
            <li key={s.slug} className="border-b border-line">
              <Link href={`/solutions/${s.slug}`} className="group block">
                <div
                  className={`shell grid items-center gap-7 py-12 md:gap-8 md:py-14 lg:grid-cols-2 lg:gap-16 lg:py-20 ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="overflow-hidden">
                    <Frame
                      name={s.hero}
                      alt={`${s.title}: ${s.summary}`}
                      className="aspect-[16/11] w-full"
                      imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                      sizes="(min-width: 1024px) 46vw, 100vw"
                    />
                  </div>

                  <div>
                    <Reveal>
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs tracking-[0.16em] text-indigo-brand tabular-nums">
                          {s.index}
                        </span>
                        <span className="h-px w-12 bg-line" />
                        <span className="eyebrow text-ink-30">{s.short}</span>
                      </div>
                    </Reveal>

                    <Reveal delay={0.06}>
                      <h2 className="display-md mt-6 max-w-[18ch] font-semibold">
                        {s.title}
                      </h2>
                    </Reveal>

                    <Reveal delay={0.1}>
                      <p className="mt-5 max-w-[50ch] text-[1.0625rem] leading-relaxed text-ink-70">
                        {s.summary}
                      </p>
                    </Reveal>

                    <Reveal delay={0.14}>
                      <ul className="mt-7 space-y-2.5 border-t border-line pt-6">
                        {s.cover.slice(0, 3).map((c) => (
                          <li key={c} className="flex items-start gap-3">
                            <span className={`mt-[0.6rem] h-[2px] w-4 shrink-0 ${s.accent === "cyan" ? "bg-cyan-brand" : "bg-indigo-brand"}`} />
                            <span className="text-[0.9375rem] leading-relaxed text-ink-70">{c}</span>
                          </li>
                        ))}
                      </ul>
                    </Reveal>

                    <Reveal delay={0.18}>
                      <span className="mt-8 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink">
                        <span className="relative">
                          {s.linkLabel}
                          <span className="absolute -bottom-[3px] left-0 h-px w-full origin-left scale-x-0 bg-indigo-brand transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                        </span>
                        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                          <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </Reveal>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* For learners — individual courses, kept on this page */}
      <section id="learners" className="scroll-mt-24 bg-paper py-24 md:py-32">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Reveal>
                <p className="eyebrow text-indigo-brand">For learners</p>
              </Reveal>
              <MaskLines
                as="h2"
                className="display-lg mt-6 max-w-[20ch] font-semibold"
                lines={[...learners.headline]}
              />
            </div>
            <Reveal delay={0.1}>
              <p className="max-w-[40ch] text-[0.9375rem] leading-relaxed text-ink-50">
                {learners.lede}
              </p>
            </Reveal>
          </div>

          {/* Start with where you are */}
          <Reveal>
            <p className="eyebrow mt-14 text-ink-30 md:mt-16">Start with where you are</p>
          </Reveal>
          <RevealGroup
            className="mt-6 grid gap-px border border-line bg-line md:grid-cols-3"
            stagger={0.07}
          >
            {learners.paths.map((p, i) => (
              <RevealItem key={p.title} className="bg-paper-warm p-7 md:p-8" y={18}>
                <span className="font-mono text-xs tracking-[0.16em] text-indigo-brand tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-[1.3125rem] leading-[1.2] font-semibold tracking-[-0.03em]">
                  {p.title}
                </h3>
                <p className="mt-3 text-[1rem] leading-relaxed text-ink-70">{p.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-14 grid gap-12 md:mt-16 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
            <div className="grid gap-10 sm:grid-cols-2">
              <Reveal>
                <p className="eyebrow text-ink-30">What you can expect</p>
                <ul className="mt-5 space-y-3">
                  {learners.expect.map((e) => (
                    <li key={e} className="flex items-start gap-3">
                      <span className="mt-[0.6rem] h-[2px] w-4 shrink-0 bg-cyan-brand" />
                      <span className="text-[1rem] leading-relaxed text-ink-70">{e}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="eyebrow text-ink-30">Who this is for</p>
                <ul className="mt-5 space-y-3">
                  {learners.audience.map((a) => (
                    <li key={a} className="flex items-start gap-3">
                      <span className="mt-[0.6rem] h-[2px] w-4 shrink-0 bg-indigo-brand" />
                      <span className="text-[1rem] leading-relaxed text-ink-70">{a}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="bg-indigo-brand p-7 text-paper-warm md:p-9">
                <p className="eyebrow text-cyan-soft">You are not imagining it</p>
                <StatNumber
                  value={learners.stat.value}
                  className="mt-6 block font-display text-[clamp(2.75rem,6vw,4.25rem)] leading-[0.92] font-semibold tracking-[-0.045em]"
                />
                <p className="mt-5 text-[1.0625rem] leading-relaxed font-medium">
                  {learners.stat.label}
                </p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/65">
                  {learners.stat.body}
                </p>
                <p className="mt-5 font-mono text-[0.625rem] tracking-[0.11em] text-white/45 uppercase">
                  Source · {learners.stat.source}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Find your course */}
          <Reveal delay={0.08}>
            <div className="mt-14 flex flex-col gap-6 border-t border-line pt-10 md:mt-16 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-display text-[1.5rem] leading-[1.15] font-semibold tracking-[-0.03em] md:text-[1.75rem]">
                  Find your course
                </h3>
                <p className="mt-2 max-w-[52ch] text-[1rem] leading-relaxed text-ink-70">
                  Tell us where you are and where you want to go. We will share the
                  current catalogue and help you pick the route that fits your next step.
                </p>
              </div>
              <Link
                href="/contact"
                className="group inline-flex shrink-0 items-center gap-3 self-start rounded-full bg-ink px-6 py-3.5 font-medium text-paper-warm transition-colors duration-300 hover:bg-indigo-brand md:self-auto"
              >
                Find a course
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <WhyChoose eyebrow="Whichever route you take" lines={["Why organisations", "choose us."]} />

      <PartnerMarquee />
    </>
  );
}
