import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Frame from "@/components/Frame";
import Method from "@/components/sections/Method";
import PartnerMarquee from "@/components/sections/PartnerMarquee";
import Faq from "@/components/Faq";
import Leadership from "@/components/sections/Leadership";
import { faqs, leadership, metrics } from "@/lib/site";
import {
  Counter,
  MaskLines,
  Parallax,
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/components/motion-primitives";

export const metadata: Metadata = {
  title: "About",
  description:
    "YandNow is a skill development organisation delivering hands-on technical training across India — six verticals, nineteen states, fixed and mobile centres.",
};

const PRINCIPLES = [
  {
    title: "Practicals are 70% of contact hours",
    body: "A trade is muscle memory before it is theory. If a module cannot be demonstrated on equipment, it does not go into the curriculum.",
  },
  {
    title: "Assessment is somebody else's job",
    body: "We do not grade our own work. Every certification runs through an independent assessor, so the credential means something to an employer who has never heard of us.",
  },
  {
    title: "Delivery travels to the cohort",
    body: "Trainees drop out over bus fare far more often than over difficulty. Mobile units and in-plant blocks exist to remove that reason.",
  },
  {
    title: "The outcome is a job, not a certificate",
    body: "We track placement at 90 days and enterprise survival at 12 months, and we report what comes back — including the numbers we would rather not publish.",
  },
];

const TIMELINE = [
  {
    year: "2020",
    title: "First cohorts at CRISP, Bhopal",
    body: "Plumbing, RAC and sheet-metal foundation courses run through the pandemic year, with Reliance Foundation support.",
    photo: "plumbing-workshop" as const,
  },
  {
    year: "2021–22",
    title: "Into machining and welding",
    body: "CNC, welding and tractor-mechanic trades added with CRISP and GIZ — the start of our industrial workshop capability.",
    photo: "cnc-operation" as const,
  },
  {
    year: "2022–23",
    title: "Dealer networks and the North East",
    body: "Automotive service training with ASDC, Veedol and IOCL across Indore and Pune, alongside enterprise programmes in Meghalaya.",
    photo: "car-lift-training" as const,
  },
  {
    year: "2023–24",
    title: "Defence and healthcare",
    body: "On-unit technical training for armed forces and CAPF personnel, and the first allied-healthcare cohorts.",
    photo: "defence-engine-class" as const,
  },
  {
    year: "2024–25",
    title: "Training at your doorstep",
    body: "Mobile training units commissioned at scale — live engine rigs driven into districts with demand but no infrastructure.",
    photo: "mobile-training-unit" as const,
  },
  {
    year: "2025–26",
    title: "Nineteen states",
    body: "Corporate, CSR, industry, defence, school and micro-enterprise verticals all running concurrently across the country.",
    photo: "two-wheeler-lab" as const,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About YandNow"
        lines={["We are a training", "company, not a", "certificate mill."]}
        lede="YandNow began in 2020 with a handful of foundation trades in Bhopal. Six years on we run six verticals across nineteen states — and the test has never changed: can the person we trained do the job on Monday without supervision?"
        photo="welding-shopfloor"
        photoAlt="A welding workshop floor with equipment laid out and trainees at the benches"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
        meta={[
          { label: "Founded", value: "2020" },
          { label: "Verticals", value: "Six" },
          { label: "States", value: "Nineteen" },
        ]}
      />

      {/* Principles */}
      <section className="bg-paper-warm py-24 md:py-32">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Reveal>
                <p className="eyebrow text-indigo-brand">How we hold ourselves</p>
              </Reveal>
              <MaskLines
                as="h2"
                className="display-lg mt-6 max-w-[20ch] font-semibold"
                lines={["Four rules we", "do not bend."]}
              />
            </div>
            <Reveal delay={0.1}>
              <p className="max-w-[34ch] text-[0.9375rem] leading-relaxed text-ink-50">
                They cost us work occasionally. They are also the reason partners hand
                us second and third programmes.
              </p>
            </Reveal>
          </div>

          <RevealGroup
            className="mt-16 grid gap-px border border-line bg-line md:grid-cols-2"
            stagger={0.07}
          >
            {PRINCIPLES.map((p, i) => (
              <RevealItem key={p.title} className="bg-paper-warm p-8 md:p-10" y={18}>
                <span className="font-mono text-xs tracking-[0.16em] text-indigo-brand tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-[1.375rem] leading-[1.18] font-semibold tracking-[-0.03em]">
                  {p.title}
                </h3>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-70">
                  {p.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Numbers band */}
      <section className="bg-indigo-brand py-20 text-paper-warm md:py-24">
        <div className="shell grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
          {metrics.map((m) => (
            <Reveal key={m.label}>
              <Counter
                to={m.value}
                suffix={m.suffix}
                className="block font-display text-[clamp(2.25rem,4.4vw,3.5rem)] leading-none font-semibold tracking-[-0.045em] tabular-nums"
              />
              <p className="mt-3 text-[0.9375rem] font-medium">{m.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-paper py-24 md:py-32">
        <div className="shell">
          <Reveal>
            <p className="eyebrow text-indigo-brand">Track record</p>
          </Reveal>
          <MaskLines
            as="h2"
            className="display-lg mt-6 max-w-[18ch] font-semibold"
            lines={["Six years,", "in order."]}
          />

          <ol className="mt-16 border-t border-line">
            {TIMELINE.map((t, i) => (
              <li key={t.year} className="border-b border-line">
                <div className="grid gap-6 py-10 md:grid-cols-[7rem_1fr_16rem] md:items-start md:gap-10 lg:grid-cols-[8rem_1fr_20rem]">
                  <Reveal>
                    <span className="font-mono text-xs tracking-[0.16em] text-indigo-brand tabular-nums">
                      {t.year}
                    </span>
                  </Reveal>

                  <Reveal delay={0.05}>
                    <h3 className="font-display text-[1.5rem] leading-[1.12] font-semibold tracking-[-0.032em] md:text-[1.75rem]">
                      {t.title}
                    </h3>
                    <p className="mt-4 max-w-[54ch] text-[1.0625rem] leading-relaxed text-ink-70">
                      {t.body}
                    </p>
                  </Reveal>

                  <Reveal delay={0.1} y={20}>
                    <Parallax distance={i % 2 === 0 ? 18 : -18}>
                      <Frame
                        name={t.photo}
                        alt={t.title}
                        className="aspect-[4/3] w-full"
                        sizes="(min-width: 1024px) 20rem, (min-width: 768px) 16rem, 100vw"
                      />
                    </Parallax>
                  </Reveal>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Method />

      {/* Trainers */}
      <section className="bg-paper-warm py-24 md:py-32">
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow text-indigo-brand">The people</p>
            </Reveal>
            <MaskLines
              as="h2"
              className="display-md mt-6 max-w-[20ch] font-semibold"
              lines={["Trainers who have", "done the job."]}
            />
            <Reveal delay={0.12}>
              <p className="lede mt-7 max-w-[48ch]">
                Our instructors come off shopfloors, service bays and labs, not out of
                lecture halls. Every trainer holds a trade qualification, carries a
                minimum of five years of site experience, and is re-assessed annually
                on both craft and instruction.
              </p>
            </Reveal>

            <RevealGroup className="mt-11 grid gap-x-8 gap-y-7 sm:grid-cols-2" stagger={0.07}>
              {[
                ["180+", "Certified trainers on roll"],
                ["5 yrs", "Minimum floor experience"],
                ["Annual", "Re-assessment on craft"],
                ["1:12", "Trainer to trainee ratio"],
              ].map(([stat, label]) => (
                <RevealItem key={label} y={16}>
                  <p className="font-display text-[1.75rem] leading-none font-semibold tracking-[-0.04em] text-indigo-brand tabular-nums">
                    {stat}
                  </p>
                  <p className="mt-2 text-[0.9375rem] text-ink-50">{label}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Parallax distance={32} className="pt-10">
              <Frame
                name="component-demo"
                alt="A trainer walking a group through engine components on a bench"
                className="aspect-[3/4] w-full"
                sizes="(min-width: 1024px) 24vw, 46vw"
              />
            </Parallax>
            <Parallax distance={-32}>
              <Frame
                name="pathology-training"
                alt="Two trainees operating laboratory equipment under supervision"
                className="aspect-[3/4] w-full"
                sizes="(min-width: 1024px) 24vw, 46vw"
              />
            </Parallax>
          </div>
        </div>
      </section>

      <Leadership
        people={leadership}
        intro="Two seats, both operational. Neither of us has an office we cannot be pulled out of when a programme needs a decision on the ground."
      />

      <Faq items={faqs} />
      <PartnerMarquee />
    </>
  );
}
