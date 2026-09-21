import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Frame from "@/components/Frame";
import PartnerMarquee from "@/components/sections/PartnerMarquee";
import { solutions } from "@/lib/site";
import { MaskLines, Reveal, RevealGroup, RevealItem } from "@/components/motion-primitives";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Six skill-development verticals: corporate training, CSR programmes, industry solutions, defence programmes, school solutions and micro-entrepreneurship.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        lines={["Six ways we", "build capability."]}
        lede="One delivery spine, six audiences. Pick the vertical that matches your mandate — or tell us the outcome and we will tell you which one it belongs in."
        photo="engine-cohort"
        photoAlt="A cohort of technicians gathered around a heavy-vehicle engine on a training stand"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
        ]}
        meta={[
          { label: "Verticals", value: "06" },
          { label: "Delivery modes", value: "Fixed · Mobile · In-plant" },
          { label: "Certification", value: "NSQF-aligned" },
        ]}
      />

      {/* Vertical index — alternating full-width rows */}
      <section className="bg-paper-warm">
        <ul>
          {solutions.map((s, i) => (
            <li key={s.slug} className="border-b border-line">
              <Link href={`/solutions/${s.slug}`} className="group block">
                <div
                  className={`shell grid items-center gap-8 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20 ${
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
                      <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
                        {s.outcomes.map((o) => (
                          <div key={o.label}>
                            <dt className="font-display text-[1.5rem] leading-none font-semibold tracking-[-0.035em] text-indigo-brand tabular-nums">
                              {o.stat}
                            </dt>
                            <dd className="mt-1.5 text-[0.8125rem] text-ink-50">
                              {o.label}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </Reveal>

                    <Reveal delay={0.18}>
                      <span className="mt-9 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink">
                        <span className="relative">
                          Open {s.short.toLowerCase()}
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

      {/* Cross-cutting capabilities */}
      <section className="bg-ink py-24 text-paper-warm md:py-32">
        <div className="shell">
          <Reveal>
            <p className="eyebrow text-cyan-brand">Regardless of vertical</p>
          </Reveal>
          <MaskLines
            as="h2"
            className="display-lg mt-6 max-w-[22ch] font-semibold"
            lines={["What every", "programme includes."]}
          />

          <RevealGroup
            className="mt-16 grid gap-px border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.06}
          >
            {[
              ["Curriculum design", "Written backwards from an observable competency and mapped to NSQF levels."],
              ["Equipment & consumables", "Live rigs, tooling and materials supplied and maintained by us, not borrowed."],
              ["Certified trainers", "Trade-qualified instructors with floor experience, assessed annually."],
              ["Third-party assessment", "Independent assessors through the relevant Sector Skill Council."],
              ["Placement support", "Employer introductions, interview preparation and 90-day verification."],
              ["Reporting & audit trail", "Geo-tagged attendance, assessment records and tracer studies as standard."],
            ].map(([title, body]) => (
              <RevealItem key={title} className="bg-ink p-8" y={18}>
                <h3 className="font-display text-[1.1875rem] font-semibold tracking-[-0.025em]">
                  {title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/55">
                  {body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <PartnerMarquee />
    </>
  );
}
