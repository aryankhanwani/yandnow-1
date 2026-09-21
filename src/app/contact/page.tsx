import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Faq from "@/components/Faq";
import { faqs, site, solutions } from "@/lib/site";
import { Reveal } from "@/components/motion-primitives";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a skill-development programme with YandNow. Tell us the role you need filled or the mandate you need delivered.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        lines={["Tell us what", "the floor needs."]}
        lede="Send the role you are struggling to fill, or the mandate you need delivered. We reply within two working days with a scope, a timeline and a number."
        photo="engine-briefing"
        photoAlt="A trainer briefing a group of technicians around a training rig"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <section className="bg-paper-warm py-20 md:py-28">
        <div className="shell grid gap-14 lg:grid-cols-[1fr_0.72fr] lg:gap-20">
          <ContactForm verticals={solutions.map((s) => s.title)} />

          {/* Direct details */}
          <div className="lg:pt-2">
            <Reveal>
              <div className="border-t border-line pt-8">
                <p className="eyebrow text-ink-30">Prefer to write directly</p>
                <a
                  href={`mailto:${site.email}`}
                  className="group mt-4 block font-display text-[1.375rem] font-semibold tracking-[-0.03em] transition-colors duration-300 hover:text-indigo-brand"
                >
                  {site.email}
                </a>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="mt-2 block text-[1.0625rem] text-ink-70 transition-colors duration-300 hover:text-indigo-brand"
                >
                  {site.phone}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-10 border-t border-line pt-8">
                <p className="eyebrow text-ink-30">Offices</p>
                <address className="mt-4 space-y-1 text-[1.0625rem] not-italic text-ink-70">
                  {site.address.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
                <p className="mt-4 text-[0.9375rem] text-ink-50">
                  Mon – Sat, 09:00 – 18:30 IST
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-10 border border-line bg-paper p-7">
                <p className="eyebrow text-indigo-brand">What helps us reply fast</p>
                <ul className="mt-5 space-y-3.5">
                  {[
                    "The trade or role, and roughly how many people",
                    "Where they are — district or plant location",
                    "Whether budget is CSR, corporate or scheme-linked",
                    "When you need the first cohort to start",
                  ].map((l) => (
                    <li key={l} className="flex items-start gap-3">
                      <span className="mt-[0.6rem] h-[2px] w-4 shrink-0 bg-cyan-brand" />
                      <span className="text-[0.9375rem] leading-relaxed text-ink-70">
                        {l}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Faq items={faqs} />
    </>
  );
}
