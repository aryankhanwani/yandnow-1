import Link from "next/link";
import { nav, site, solutions } from "@/lib/site";
import Logo from "./Logo";
import { MaskLines, Reveal } from "./motion-primitives";
import ArrowLink from "./ArrowLink";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-indigo-ink text-paper-warm">
      {/* Oversized CTA */}
      <div className="shell border-b border-white/10 pt-24 pb-20 md:pt-36 md:pb-28">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow text-cyan-brand">Next step</p>
            </Reveal>
            <MaskLines
              as="h2"
              className="display-lg mt-6 max-w-[16ch] font-semibold"
              lines={["Tell us what you are", "trying to improve."]}
            />
            <Reveal delay={0.12}>
              <p className="lede mt-7 max-w-[46ch] text-white/60">
                Share the outcome you need, who it is for, and where things stand
                today. We will point you to the right programme, route or platform.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-cyan-brand px-7 py-4 font-medium text-indigo-ink transition-colors duration-300 hover:bg-white"
                >
                  Talk to Y&amp;Now
                  <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <a
                  href={`mailto:${site.email}`}
                  className="font-mono text-xs tracking-[0.12em] text-white/50 uppercase underline decoration-white/20 decoration-1 underline-offset-[6px] transition-colors hover:text-white hover:decoration-cyan-brand"
                >
                  {site.email}
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:pt-4">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-9 min-[420px]:grid-cols-2">
              <div>
                <dt className="eyebrow text-white/35">Reach us</dt>
                <dd className="mt-3 space-y-1 text-[0.9375rem] text-white/70">
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="block transition-colors hover:text-cyan-brand">
                    {site.phone}
                  </a>
                  <a href={`mailto:${site.email}`} className="block transition-colors hover:text-cyan-brand">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-white/35">Office</dt>
                <dd className="mt-3 space-y-1 text-[0.9375rem] text-white/70">
                  {site.address.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-white/35">Follow</dt>
                <dd className="mt-3 flex flex-col items-start gap-1.5 text-[0.9375rem]">
                  {site.social.map((s) => (
                    <ArrowLink key={s.label} href={s.href} tone="light">
                      {s.label}
                    </ArrowLink>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-white/35">Credentials</dt>
                <dd className="mt-3 text-[0.9375rem] text-white/70">
                  ISO 9001:2015
                  <br />
                  quality management
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>

      {/* Sitemap */}
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo tone="grey" className="h-7" />
          <p className="mt-4 max-w-[30ch] text-sm leading-relaxed text-white/45">
            {site.tagline} Practical skills for real work — for organisations,
            communities and learners.
          </p>
        </div>

        <div>
          <p className="eyebrow text-white/35">Solutions</p>
          <ul className="mt-4 space-y-2">
            {solutions.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/solutions/${s.slug}`}
                  className="text-sm text-white/60 transition-colors duration-300 hover:text-cyan-brand"
                >
                  {s.short}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-white/35">Company</p>
          <ul className="mt-4 space-y-2">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="text-sm text-white/60 transition-colors duration-300 hover:text-cyan-brand"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-between gap-6">
          <p className="font-mono text-[0.6875rem] leading-relaxed tracking-[0.1em] text-white/30 uppercase">
            Y&amp;Now is a registered trademark
            <br />
            associated with {site.legal}
          </p>
        </div>
      </div>

      <div className="shell flex flex-col gap-3 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[0.6875rem] tracking-[0.1em] text-white/30 uppercase">
          © {year} {site.legal}
        </p>
        <p className="font-mono text-[0.6875rem] tracking-[0.1em] text-white/30 uppercase">
          Photography from live programmes, 2020–2026
        </p>
      </div>

      {/* Colossal wordmark, clipped — the only purely decorative element. */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="-mb-[0.18em] translate-y-[0.1em] text-center font-display text-[22vw] leading-[0.78] font-bold tracking-[-0.055em] text-white/[0.045]">
          Y&amp;NOW
        </p>
      </div>
    </footer>
  );
}
