import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Faq from "@/components/Faq";
import { enquiryTypes, faqs, site } from "@/lib/site";
import { Reveal } from "@/components/motion-primitives";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Y&Now about workforce training, a CSR programme, an industry, defence or school programme, a platform demo or a learner enquiry.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        lines={["Let’s build the right", "learning route."]}
        lede="Tell us what you are trying to solve. We will get it to the right team and come back with a next step, not a brochure."
        photo="engine-briefing"
        photoAlt="A trainer briefing a group of technicians around a training rig"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <section className="bg-paper-warm py-20 md:py-28">
        <div className="shell grid gap-14 lg:grid-cols-[1fr_0.72fr] lg:gap-20">
          <ContactForm enquiryTypes={enquiryTypes} email={site.email} />

          {/* Direct details */}
          <div className="lg:pt-2">
            <Reveal>
              <div className="border-t border-line pt-8">
                <p className="eyebrow text-ink-30">Or reach us directly</p>
                <a
                  href={`mailto:${site.email}`}
                  className="group mt-4 block font-display text-[1.25rem] font-semibold tracking-[-0.03em] break-all transition-colors duration-300 hover:text-indigo-brand sm:text-[1.375rem]"
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
                <p className="eyebrow text-ink-30">Office</p>
                <address className="mt-4 space-y-1 text-[1.0625rem] not-italic text-ink-70">
                  {site.address.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-10 border border-line bg-paper p-6 md:p-7">
                <p className="eyebrow text-indigo-brand">What helps us reply fast</p>
                <ul className="mt-5 space-y-3.5">
                  {[
                    "The outcome you need to change",
                    "Who the programme is for, and roughly how many people",
                    "Where things stand today",
                    "When you would like to start",
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
