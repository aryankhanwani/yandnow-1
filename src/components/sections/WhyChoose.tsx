import { whyChoose } from "@/lib/site";
import { MaskLines, Reveal, RevealGroup, RevealItem } from "@/components/motion-primitives";

const LOOP = ["Assess", "Learn", "Apply", "Perform", "Improve"];

/**
 * Five reasons on a hairline grid. The sixth cell closes the grid with the
 * loop itself, so a three-up row never ends on an empty plate.
 */
export default function WhyChoose({
  eyebrow = "Why organisations choose us",
  lines = ["Built for the job,", "not the classroom."],
}: {
  eyebrow?: string;
  lines?: string[];
}) {
  return (
    <section className="bg-ink py-24 text-paper-warm md:py-32">
      <div className="shell">
        <Reveal>
          <p className="eyebrow text-cyan-brand">{eyebrow}</p>
        </Reveal>
        <MaskLines
          as="h2"
          className="display-lg mt-6 max-w-[22ch] font-semibold"
          lines={lines}
        />

        <RevealGroup
          className="mt-14 grid gap-px border border-white/12 bg-white/12 sm:grid-cols-2 md:mt-16 lg:grid-cols-3"
          stagger={0.06}
        >
          {whyChoose.map((w, i) => (
            <RevealItem
              key={w.title}
              className="group/cap relative bg-ink p-7 transition-colors duration-500 hover:bg-white/[0.035] md:p-8"
              y={18}
            >
              <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-white/35 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-[1.1875rem] leading-[1.25] font-semibold tracking-[-0.025em]">
                {w.title}
              </h3>
              {/* Drawn in from the left on hover — the whole micro-interaction. */}
              <span className="mt-3 block h-[2px] w-8 origin-left scale-x-0 bg-cyan-brand transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cap:scale-x-100" />
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/55 transition-colors duration-500 group-hover/cap:text-white/75">
                {w.body}
              </p>
            </RevealItem>
          ))}

          <RevealItem className="bg-indigo-brand p-7 md:p-8" y={18}>
            <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-cyan-soft uppercase">
              Behind every programme
            </span>
            <h3 className="mt-4 font-display text-[1.1875rem] leading-[1.25] font-semibold tracking-[-0.025em]">
              One loop, every time
            </h3>
            <ol className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2">
              {LOOP.map((step, i) => (
                <li key={step} className="flex items-center gap-2 text-[0.9375rem] text-white/80">
                  {step}
                  {i < LOOP.length - 1 && (
                    <span aria-hidden className="text-cyan-brand">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
