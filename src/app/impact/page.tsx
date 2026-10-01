import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PartnerMarquee from "@/components/sections/PartnerMarquee";
import ArchiveExplorer from "@/components/sections/ArchiveExplorer";
import { metrics, programmes } from "@/lib/site";
import { Counter, MaskLines, Reveal } from "@/components/motion-primitives";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "The YandNow programme archive: fourteen delivered programmes from 2020 to 2026, with partners, trades and photographs from each cohort.",
};

export default function ImpactPage() {
  const years = [...new Set(programmes.map((p) => p.year))].length;

  return (
    <>
      <PageHero
        eyebrow="Impact"
        lines={["Every programme", "we have run."]}
        lede="No composite case studies and no stock imagery. This is the delivery record — partner, place, trades and photographs, filed by year."
        photo="defence-assembly"
        photoAlt="Uniformed personnel assembled in a hall for a technical training briefing"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Impact", href: "/impact" },
        ]}
        meta={[
          { label: "Programmes", value: String(programmes.length) },
          { label: "Programme years", value: String(years) },
          { label: "Photographs", value: "61 curated" },
        ]}
      />

      {/* Verified outcomes */}
      <section className="bg-indigo-brand py-20 text-paper-warm md:py-24">
        <div className="shell">
          <Reveal>
            <p className="eyebrow text-cyan-soft">Verified outcomes</p>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-y-12 border-t border-white/15 pt-12 lg:grid-cols-4 lg:gap-x-8">
            {metrics.map((m) => (
              <Reveal key={m.label}>
                <Counter
                  to={m.value}
                  suffix={m.suffix}
                  className="block font-display text-[clamp(2.25rem,4.6vw,3.75rem)] leading-none font-semibold tracking-[-0.045em] tabular-nums"
                />
                <p className="mt-3.5 text-[1.0625rem] font-medium">{m.label}</p>
                <p className="mt-1.5 max-w-[24ch] text-sm leading-relaxed text-white/55">
                  {m.note}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ArchiveExplorer programmes={programmes} />

      {/* Methodology note — credibility comes from stating the limits */}
      <section className="bg-ink py-24 text-paper-warm md:py-32">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow text-cyan-brand">How we count</p>
            </Reveal>
            <MaskLines
              as="h2"
              className="display-md mt-6 max-w-[18ch] font-semibold"
              lines={["The caveats,", "stated upfront."]}
            />
          </div>
          <div className="space-y-6 text-[1.0625rem] leading-relaxed text-white/60">
            <Reveal>
              <p>
                <span className="font-medium text-paper-warm">Trained</span> counts
                only trainees who completed a course and sat third-party assessment.
                Enrolments, walk-ins and awareness-session attendees are excluded, which
                is why our headline number is smaller than it could be.
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <p>
                <span className="font-medium text-paper-warm">Placement</span> is
                verified at 90 days by contacting the employer, not the trainee. Where
                we could not reach either, the case is counted as not placed.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p>
                <span className="font-medium text-paper-warm">Enterprise survival</span>{" "}
                for micro-entrepreneurship programmes is measured at twelve months and
                requires evidence of trading in the preceding quarter.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p>
                Figures are cumulative to March 2026. Where a programme is still running,
                only completed cohorts are included.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <PartnerMarquee />
    </>
  );
}
