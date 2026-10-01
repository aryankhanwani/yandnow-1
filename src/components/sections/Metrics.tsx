import { metrics } from "@/lib/site";
import { RevealGroup, RevealItem, ScaleInFrame, StatNumber } from "@/components/motion-primitives";
import Frame from "@/components/Frame";

export default function Metrics() {
  return (
    <section className="relative overflow-hidden bg-indigo-brand text-paper-warm">
      <div className="shell py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
          <div>
            <p className="eyebrow text-cyan-soft">The skills gap</p>
            <h2 className="display-md mt-6 max-w-[24ch] font-semibold">
              <span className="block">The gap is measurable.</span>
              <span className="block text-white/60">So is the work of closing it.</span>
            </h2>
          </div>
          <p className="max-w-[38ch] text-[0.9375rem] leading-relaxed text-white/60">
            Three published figures that explain why practical, role-based learning
            matters — for employers, for institutions and for the people looking for
            their next step.
          </p>
        </div>

        <RevealGroup
          className="mt-16 grid gap-y-12 border-t border-white/15 pt-12 sm:grid-cols-3 sm:gap-x-8"
          stagger={0.09}
        >
          {metrics.map((m) => (
            <RevealItem key={m.label} className="px-0 lg:px-2">
              <StatNumber
                value={m.value}
                className="block font-display text-[clamp(2.6rem,5.4vw,4.25rem)] leading-[0.92] font-semibold tracking-[-0.045em] tabular-nums"
              />
              <p className="mt-4 max-w-[28ch] text-[1.0625rem] leading-snug font-medium">{m.label}</p>
              <p className="mt-2 font-mono text-[0.625rem] tracking-[0.11em] text-white/45 uppercase">
                Source · {m.note}
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
