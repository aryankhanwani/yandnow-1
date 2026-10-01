import Link from "next/link";
import Frame from "@/components/Frame";
import { solutions } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-indigo-ink text-paper-warm">
      <div className="shell grid min-h-[100svh] items-center gap-12 pt-[132px] pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <p className="eyebrow text-cyan-brand">Error 404</p>
          <h1 className="display-lg mt-6 max-w-[16ch] font-semibold">
            This route does not lead anywhere.
          </h1>
          <p className="lede mt-7 max-w-[44ch] text-white/60">
            The link is broken or the page has moved. Start with one of our six
            solution areas below, or go back to the homepage.
          </p>

          <ul className="mt-10 grid gap-x-8 gap-y-3 border-t border-white/12 pt-8 sm:grid-cols-2">
            {solutions.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/solutions/${s.slug}`}
                  className="group flex items-baseline gap-3 py-1 text-[0.9375rem] text-white/65 transition-colors duration-300 hover:text-cyan-brand"
                >
                  <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-white/30 tabular-nums">
                    {s.index}
                  </span>
                  {s.short}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-paper-warm px-7 py-4 font-medium text-ink transition-colors duration-300 hover:bg-cyan-brand"
          >
            Back to the homepage
            <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <Frame
          name="engine-cutaway"
          alt="An engine cutaway rig used for technical training"
          className="aspect-[4/3] w-full"
          sizes="(min-width: 1024px) 44vw, 100vw"
        />
      </div>
    </section>
  );
}
