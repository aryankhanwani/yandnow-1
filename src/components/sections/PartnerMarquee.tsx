import { partners } from "@/lib/site";

/**
 * CSS-only marquee (two identical halves, translate -50%). No JS, no layout
 * thrash, and it pauses on hover so a name can actually be read.
 */
export default function PartnerMarquee({
  tone = "light",
}: {
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  const row = [...partners, ...partners];

  return (
    <section
      className={[
        "marquee-host relative overflow-hidden border-y py-6",
        dark ? "border-white/10 bg-indigo-ink" : "border-line bg-paper",
      ].join(" ")}
      aria-label="Partners and funders"
    >
      <div className="shell mb-5">
        <p className={`eyebrow ${dark ? "text-white/30" : "text-ink-30"}`}>
          Delivered with
        </p>
      </div>

      <div className="relative flex w-max" style={{ ["--marquee-duration" as string]: "52s" }}>
        <div className="marquee-track flex w-max items-center">
          {row.map((p, i) => (
            <span key={`${p}-${i}`} className="flex items-center">
              <span
                className={[
                  "px-7 font-display text-[1.0625rem] font-medium tracking-[-0.02em] whitespace-nowrap transition-colors duration-300 sm:text-[1.1875rem]",
                  dark ? "text-white/45 hover:text-white" : "text-ink-50 hover:text-indigo-brand",
                ].join(" ")}
              >
                {p}
              </span>
              <span
                aria-hidden
                className={`h-1 w-1 rounded-full ${dark ? "bg-cyan-brand/40" : "bg-cyan-brand/60"}`}
              />
            </span>
          ))}
        </div>
      </div>

      {/* Edge fades done as solid-colour masks, not gradients on the content. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28"
        style={{
          background: `linear-gradient(to right, ${dark ? "#16173d" : "#f6f6f8"}, transparent)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28"
        style={{
          background: `linear-gradient(to left, ${dark ? "#16173d" : "#f6f6f8"}, transparent)`,
        }}
      />
    </section>
  );
}
