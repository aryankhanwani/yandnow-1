import Image from "next/image";
import { clientLogos, LOGO_H } from "@/lib/brand";

/**
 * CSS-only marquee (two identical halves, translate -50%). No JS, no layout
 * thrash, and it pauses on hover so a mark can actually be read.
 *
 * Every asset is pre-normalised to one height with an optical correction for
 * aspect ratio (see scripts/build-brand.mjs), so rendering them all at a single
 * CSS height reads as even visual weight rather than a row of mismatched
 * squares and long wordmarks.
 *
 * Always on a light plate. A dark variant meant inverting the marks to white
 * silhouettes, and four of the 33 (Indian Army, IndianOil, North Eastern
 * Council, TotalEnergies) ship artwork with an opaque background rather than
 * alpha — those inverted into solid white blobs. Recolouring somebody else's
 * trademark to fit our background was the wrong instinct anyway.
 */
export default function PartnerMarquee() {
  const row = [...clientLogos, ...clientLogos];

  return (
    <section
      className="marquee-host relative overflow-hidden border-y border-line bg-paper py-7"
      aria-label="Clients, partners and funders"
    >
      <div className="shell mb-6">
        <p className="eyebrow text-ink-30">Delivered with</p>
      </div>

      <div className="relative flex w-max" style={{ ["--marquee-duration" as string]: "96s" }}>
        <div className="marquee-track flex w-max items-center">
          {row.map((logo, i) => (
            <span
              key={`${logo.slug}-${i}`}
              className="flex shrink-0 items-center justify-center px-7 sm:px-9"
            >
              <Image
                src={`/logos/${logo.slug}.webp`}
                alt={logo.name}
                width={logo.w}
                height={logo.h}
                // Only the first pass needs alt text; the clone is decorative.
                aria-hidden={i >= clientLogos.length}
                // Full colour, always — see `.logo-mark` in globals.css.
                className="logo-mark h-9 w-auto object-contain sm:h-11 lg:h-12"
                sizes={`${Math.round((logo.w / LOGO_H) * 48)}px`}
              />
            </span>
          ))}
        </div>
      </div>

      {/* Edge masks so marks fade rather than being sliced at the viewport. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28"
        style={{
          background: "linear-gradient(to right, #f6f6f8, transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28"
        style={{
          background: "linear-gradient(to left, #f6f6f8, transparent)",
        }}
      />
    </section>
  );
}
