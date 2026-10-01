import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Frame from "@/components/Frame";
import Method from "@/components/sections/Method";
import PartnerMarquee from "@/components/sections/PartnerMarquee";
import Faq from "@/components/Faq";
import Leadership from "@/components/sections/Leadership";
import Link from "next/link";
import { advisers, beliefs, faqs, leadership } from "@/lib/site";
import {
  MaskLines,
  Parallax,
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/components/motion-primitives";

export const metadata: Metadata = {
  title: "About",
  description:
    "Y&Now is a learning brand built around practical outcomes — helping people and organisations build useful skills, grow with confidence and stay ready for what comes next.",
};

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
    body: "Corporate, CSR, industry, defence, school and micro-enterprise programmes all running concurrently across the country.",
    photo: "two-wheeler-lab" as const,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Y&Now"
        lines={["Practical learning", "with a clear purpose."]}
        lede="We help people and organisations build useful skills, grow with confidence, and stay ready for what comes next."
        photo="welding-shopfloor"
        photoAlt="A welding workshop floor with equipment laid out and trainees at the benches"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
        meta={[
          { label: "Solution areas", value: "06" },
          { label: "Audiences we serve", value: "07" },
          { label: "Quality management", value: "ISO 9001:2015" },
        ]}
      />

      {/* Who we are */}
      <section className="bg-paper-warm py-24 md:py-32">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow text-indigo-brand">Who we are</p>
            </Reveal>
            <MaskLines
              as="h2"
              className="display-lg mt-6 max-w-[18ch] font-semibold"
              lines={["A learning brand", "built around", "practical outcomes."]}
            />
          </div>

          <div className="lg:pt-14">
            <Reveal>
              <p className="lede max-w-[56ch] text-ink-70">
                We design programmes that make learners more job-ready, help teams
                perform better, and build organisational capability that holds up over
                time.
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-6 max-w-[56ch] text-[1.0625rem] leading-relaxed text-ink-70">
                We work across corporate, community, industrial, institutional and
                learner settings — with the same method behind each one.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 border-t border-line pt-8">
                <p className="eyebrow text-ink-30">Why our work matters</p>
                <p className="mt-4 max-w-[56ch] text-[1.0625rem] leading-relaxed text-ink-70">
                  The distance between learning something and doing it is still too
                  wide. We help people build relevant skills, perform better in role,
                  and move toward better opportunities with more confidence.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-10 border border-line bg-paper p-6 md:p-7">
                <p className="eyebrow text-indigo-brand">Credentials</p>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-70">
                  Y&amp;Now is a registered trademark associated with BroadArks
                  Technology Private Limited. Our quality management practices follow
                  ISO 9001:2015.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission and vision */}
      <section className="bg-indigo-brand py-20 text-paper-warm md:py-28">
        <div className="shell grid gap-12 md:grid-cols-2 md:gap-0">
          {[
            [
              "Our mission",
              "To make practical learning easier to access, easier to apply, and more useful for real work.",
            ],
            [
              "Our vision",
              "A future where more people can turn learning into opportunity, confidence and better work.",
            ],
          ].map(([label, text], i) => (
            <Reveal
              key={label}
              delay={i * 0.08}
              className={i === 1 ? "border-t border-white/15 pt-12 md:border-t-0 md:border-l md:pt-0 md:pl-12 lg:pl-16" : "md:pr-12 lg:pr-16"}
            >
              <p className="eyebrow text-cyan-soft">{label}</p>
              <p className="mt-6 max-w-[26ch] font-display text-[clamp(1.5rem,2.8vw,2.25rem)] leading-[1.2] font-medium tracking-[-0.028em]">
                {text}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* What we believe */}
      <section className="bg-paper py-24 md:py-32">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
            <div>
              <Reveal>
                <p className="eyebrow text-indigo-brand">What we believe</p>
              </Reveal>
              <MaskLines
                as="h2"
                className="display-lg mt-6 max-w-[20ch] font-semibold"
                lines={["Five beliefs behind", "every programme."]}
              />
            </div>
            <Reveal delay={0.1}>
              <p className="max-w-[34ch] text-[0.9375rem] leading-relaxed text-ink-50">
                They shape what we build, how we teach it, and how we judge whether it
                worked.
              </p>
            </Reveal>
          </div>

          <RevealGroup
            className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 md:mt-16 lg:grid-cols-3"
            stagger={0.07}
          >
            {beliefs.map((p, i) => (
              <RevealItem key={p.title} className="bg-paper-warm p-7 md:p-9" y={18}>
                <span className="font-mono text-xs tracking-[0.16em] text-indigo-brand tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-[1.3125rem] leading-[1.2] font-semibold tracking-[-0.03em] md:text-[1.375rem]">
                  {p.title}
                </h3>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-70">
                  {p.body}
                </p>
              </RevealItem>
            ))}
            {/* Sixth cell: closes the grid with the loop the beliefs add up to. */}
            <RevealItem className="flex flex-col justify-between gap-6 bg-ink p-7 text-paper-warm md:p-9" y={18}>
              <span className="eyebrow text-cyan-brand">In practice</span>
              <p className="font-display text-[1.3125rem] leading-[1.3] font-semibold tracking-[-0.03em]">
                Assess, learn, apply, perform, improve — then start the next cycle with
                better evidence.
              </p>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-paper-warm py-24 md:py-32">
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
        lines={["The people", "behind Y&Now."]}
        intro="Experience across media, learning and development, finance and systems — focused on one question: does the learning change what people can do?"
        advisers={advisers}
      />

      {/* Work with us */}
      <section className="border-t border-line bg-paper-warm py-16 md:py-20">
        <div className="shell grid gap-8 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow text-indigo-brand">Work with us</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display-md mt-5 max-w-[24ch] font-semibold">
                The conversation starts the same way.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[54ch] text-[1.0625rem] leading-relaxed text-ink-70">
                Whether you are building a workforce programme, a community initiative
                or your own next skill, tell us what you are trying to achieve.
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

      <Faq items={faqs} />
      <PartnerMarquee />
    </>
  );
}
