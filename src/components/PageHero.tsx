import Link from "next/link";
import Frame from "./Frame";
import type { PhotoKey } from "@/lib/photos";
import { MaskLines, Reveal, StatNumber } from "./motion-primitives";

/**
 * Inner-page header. Dark plate, one photo, breadcrumb — consistent enough
 * that arriving on any subpage feels like the same site, not a template.
 */
export default function PageHero({
  eyebrow,
  lines,
  lede,
  photo,
  photoAlt,
  breadcrumb,
  meta,
}: {
  eyebrow: string;
  lines: string[];
  lede: string;
  photo: PhotoKey;
  photoAlt: string;
  breadcrumb?: { label: string; href: string }[];
  meta?: { label: string; value: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-indigo-ink text-paper-warm">
      <div className="shell pt-[132px] pb-16 md:pt-[168px] md:pb-24">
        {breadcrumb && (
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2">
              {breadcrumb.map((b, i) => (
                <span key={b.href} className="flex items-center gap-2">
                  {i > 0 && <span className="text-white/25">/</span>}
                  <Link
                    href={b.href}
                    className="eyebrow text-white/40 transition-colors hover:text-cyan-brand"
                  >
                    {b.label}
                  </Link>
                </span>
              ))}
            </nav>
          </Reveal>
        )}

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow text-cyan-brand">{eyebrow}</p>
            </Reveal>
            <MaskLines
              as="h1"
              className="display-lg mt-6 max-w-[20ch] font-semibold"
              lines={lines}
              delay={0.05}
            />
            <Reveal delay={0.16}>
              <p className="lede mt-8 max-w-[52ch] text-white/60">{lede}</p>
            </Reveal>

            {meta && (
              <Reveal delay={0.22}>
                {/* Value first, label under it. With the label on top, a
                    two-word label next to a three-word one wrapped to a second
                    line and shunted its value down, so the row of figures never
                    sat on a common baseline. This way the numbers always align
                    and the labels can wrap freely underneath. */}
                <dl className="mt-11 grid gap-x-8 gap-y-7 border-t border-white/12 pt-8 sm:grid-cols-3">
                  {meta.map((m) => {
                    // Figures get the display treatment and count up. Prose
                    // values ("Fixed · Mobile · In-plant") stay at text size —
                    // at 2.4rem they wrapped mid-word and read as broken.
                    const isFigure = /^[^0-9]{0,2}[0-9]/.test(m.value);
                    return (
                      <div key={m.label}>
                        <dd
                          className={
                            isFigure
                              ? "font-display text-[clamp(1.75rem,3vw,2.375rem)] leading-none font-semibold tracking-[-0.04em]"
                              : "font-display text-[1.125rem] leading-snug font-semibold tracking-[-0.02em]"
                          }
                        >
                          {isFigure ? <StatNumber value={m.value} /> : m.value}
                        </dd>
                        <dt className="mt-3 max-w-[22ch] text-[0.9375rem] leading-snug text-white/55">
                          {m.label}
                        </dt>
                      </div>
                    );
                  })}
                </dl>
              </Reveal>
            )}
          </div>

          <Reveal delay={0.1} y={30}>
            <Frame
              name={photo}
              alt={photoAlt}
              className="aspect-[4/3] w-full"
              sizes="(min-width: 1024px) 42vw, 100vw"
              priority
              quality={86}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
