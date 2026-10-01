import { metrics } from "@/lib/site";
import { Counter, RevealGroup, RevealItem, ScaleInFrame } from "@/components/motion-primitives";
import Frame from "@/components/Frame";

export default function Metrics() {
  return (
    <section className="relative overflow-hidden bg-indigo-brand text-paper-warm">
      <div className="shell py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
          <div>
            <p className="eyebrow text-cyan-soft">By the numbers</p>
            <h2 className="display-md mt-6 max-w-[24ch] font-semibold">
              Six years of delivery, counted honestly.
            </h2>
          </div>
          <p className="max-w-[38ch] text-[0.9375rem] leading-relaxed text-white/60">
            Figures below are cumulative to March 2026 and reflect only cohorts that
            completed third-party assessment. Placement is verified at 90 days, not
            self-reported.
          </p>
        </div>

        <RevealGroup
          className="mt-16 grid grid-cols-2 gap-y-12 border-t border-white/15 pt-12 lg:grid-cols-4 lg:gap-x-8"
          stagger={0.09}
        >
          {metrics.map((m) => (
            <RevealItem key={m.label} className="px-0 lg:px-2">
              <Counter
                to={m.value}
                suffix={m.suffix}
                className="block font-display text-[clamp(2.6rem,5.4vw,4.25rem)] leading-[0.92] font-semibold tracking-[-0.045em] tabular-nums"
              />
              <p className="mt-4 text-[1.0625rem] font-medium">{m.label}</p>
              <p className="mt-1.5 max-w-[24ch] text-sm leading-relaxed text-white/55">
                {m.note}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      {/* Full-bleed band of the work itself */}
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {(
          [
            ["engine-cohort", "Technicians working through a heavy-vehicle engine teardown"],
            ["healthcare-lab", "Two trainees running samples in a pathology lab"],
            ["defence-assembly", "Uniformed personnel assembled for a technical briefing"],
            ["tailoring-floor", "A tailoring floor mid-session, machines in use"],
          ] as const
        ).map(([key, alt]) => (
          <ScaleInFrame key={key} className="aspect-[4/3]" from={1.16}>
            <Frame
              name={key}
              alt={alt}
              className="h-full w-full"
              sizes="(min-width: 1024px) 25vw, 50vw"
              ring={false}
            />
          </ScaleInFrame>
        ))}
      </div>
    </section>
  );
}
