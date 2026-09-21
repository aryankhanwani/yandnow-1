import Frame from "@/components/Frame";
import {
  MaskLines,
  Parallax,
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/components/motion-primitives";

const REGIONS = [
  { name: "Madhya Pradesh", note: "Bhopal hub · 6 centres" },
  { name: "Maharashtra", note: "Pune · Nashik" },
  { name: "Assam", note: "Dibrugarh · Guwahati" },
  { name: "Karnataka", note: "Bhadravathi cluster" },
  { name: "Gujarat", note: "Ahmedabad · Rajkot" },
  { name: "Meghalaya", note: "Shillong cluster" },
  { name: "Telangana", note: "Mobile units" },
  { name: "Odisha", note: "Remuna · Balasore" },
  { name: "Punjab", note: "On-unit defence" },
  { name: "Himachal Pradesh", note: "Camp delivery" },
  { name: "Andhra Pradesh", note: "Transport academy" },
  { name: "+ 8 more states", note: "Programme-linked" },
];

/**
 * Reach, told as a register rather than a map — a stylised map would invite
 * questions about borders we have no business answering.
 */
export default function Reach() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper-warm">
      <div className="shell grid gap-16 py-24 md:py-32 lg:grid-cols-[1fr_0.8fr] lg:gap-24">
        <div>
          <Reveal>
            <p className="eyebrow text-cyan-brand">Footprint</p>
          </Reveal>
          <MaskLines
            as="h2"
            className="display-lg mt-6 max-w-[18ch] font-semibold"
            lines={["We go where", "the cohort is."]}
          />
          <Reveal delay={0.12}>
            <p className="lede mt-7 max-w-[46ch] text-white/60">
              Nineteen states, fixed centres and mobile training units. If a district
              has the demand but no infrastructure, the unit is driven in and the
              classroom arrives with it.
            </p>
          </Reveal>

          <RevealGroup
            className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-10 sm:grid-cols-3"
            stagger={0.045}
          >
            {REGIONS.map((r) => (
              <RevealItem key={r.name} y={16}>
                <p className="text-[0.9375rem] font-medium">{r.name}</p>
                <p className="mt-0.5 font-mono text-[0.625rem] tracking-[0.1em] text-white/35 uppercase">
                  {r.note}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Offset photo pair with opposed parallax — depth without a gradient
            or a drop shadow in sight. */}
        <div className="relative lg:pt-10">
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            <Parallax distance={40} className="pt-10 lg:pt-16">
              <Frame
                name="mobile-classroom"
                alt="Trainees seated inside a mobile training unit around a display screen"
                className="aspect-[3/4] w-full"
                sizes="(min-width: 1024px) 20vw, 45vw"
              />
            </Parallax>
            <Parallax distance={-40}>
              <Frame
                name="hcv-hands-on"
                alt="Trainees working hands-on with a heavy commercial vehicle engine"
                className="aspect-[3/4] w-full"
                sizes="(min-width: 1024px) 20vw, 45vw"
              />
            </Parallax>
          </div>

          <Reveal delay={0.2}>
            <div className="mt-8 border border-white/12 p-6">
              <p className="font-display text-[2.5rem] leading-none font-semibold tracking-[-0.04em]">
                12
              </p>
              <p className="mt-3 text-[0.9375rem] font-medium">Mobile training units</p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/50">
                Each fitted with a live engine rig, diagnostic bench and seating for
                sixteen — commissioned, maintained and staffed by us.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
