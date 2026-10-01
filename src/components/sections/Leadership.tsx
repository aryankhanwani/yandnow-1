import Image from "next/image";
import type { Leader } from "@/lib/site";
import { MaskLines, Reveal, RevealGroup, RevealItem } from "@/components/motion-primitives";

/**
 * Leadership cards. Portraits are optional by design: a card with no `photo`
 * renders a monogram plate instead of a broken frame, so the section ships
 * before the photography does.
 */
export default function Leadership({
  people,
  eyebrow = "Leadership",
  lines = ["The people", "accountable for it."],
  intro,
  advisers,
}: {
  people: Leader[];
  eyebrow?: string;
  lines?: string[];
  intro?: string;
  advisers?: readonly { name: string; bio: string }[];
}) {
  return (
    <section className="border-t border-line bg-paper py-24 md:py-32">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Reveal>
              <p className="eyebrow text-indigo-brand">{eyebrow}</p>
            </Reveal>
            <MaskLines
              as="h2"
              className="display-lg mt-6 max-w-[20ch] font-semibold"
              lines={lines}
            />
          </div>
          {intro && (
            <Reveal delay={0.1}>
              <p className="max-w-[36ch] text-[0.9375rem] leading-relaxed text-ink-50">
                {intro}
              </p>
            </Reveal>
          )}
        </div>

        {/* Column count follows the headcount so two or four people don't
            leave a hole in a three-up grid. */}
        <RevealGroup
          className={`mt-14 grid gap-12 sm:grid-cols-2 md:mt-16 lg:gap-14 ${
            people.length === 4
              ? "xl:grid-cols-4 xl:gap-10"
              : people.length > 2
                ? "lg:grid-cols-3"
                : ""
          }`}
          stagger={0.1}
        >
          {people.map((person) => (
            <RevealItem key={person.slug} y={22}>
              <article className="flex flex-col">
                <Portrait person={person} />

                <div className="mt-6 sm:mt-7">
                  <h3 className="font-display text-[1.5rem] leading-[1.15] font-semibold tracking-[-0.03em] md:text-[1.625rem]">
                    {person.name}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-snug font-medium text-indigo-brand">
                    {person.role}
                  </p>

                  <p className="mt-5 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-70">
                    {person.bio}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    {person.focus.map((f) => (
                      <span
                        key={f}
                        className="rounded-full border border-line bg-paper-warm px-3 py-1.5 text-xs font-medium text-ink-50"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  {person.linkedin && (
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="group mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-ink transition-colors duration-300 hover:text-indigo-brand"
                    >
                      <span className="relative">
                        LinkedIn
                        <span className="absolute -bottom-[3px] left-0 h-px w-full origin-left scale-x-0 bg-indigo-brand transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                      </span>
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden
                        className="mt-[0.1em] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
                      >
                        <path
                          d="M3 11L11 3M11 3H5M11 3V9"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        {advisers && advisers.length > 0 && (
          <div className="mt-20 grid gap-8 border-t border-line pt-12 md:mt-24 lg:grid-cols-[auto_1fr] lg:gap-20">
            <div className="lg:w-[13rem]">
              <Reveal>
                <p className="eyebrow text-indigo-brand">Advisers</p>
              </Reveal>
            </div>
            <RevealGroup className="grid gap-10 sm:grid-cols-2 sm:gap-12" stagger={0.08}>
              {advisers.map((a) => (
                <RevealItem key={a.name} y={18}>
                  <h3 className="font-display text-[1.375rem] leading-[1.15] font-semibold tracking-[-0.03em] md:text-[1.5rem]">
                    {a.name}
                  </h3>
                  <span className="mt-4 block h-[2px] w-8 bg-cyan-brand" />
                  <p className="mt-4 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-70">
                    {a.bio}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        )}
      </div>
    </section>
  );
}

function Portrait({ person }: { person: Leader }) {
  if (person.photo) {
    return (
      <div className="relative aspect-[4/5] w-full max-w-[11rem] sm:max-w-[20rem] overflow-hidden bg-ink/[0.04]">
        <Image
          src={person.photo}
          alt={`${person.name}, ${person.role}`}
          fill
          sizes="(min-width: 640px) 20rem, 11rem"
          className="object-cover"
        />
        <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/10" />
      </div>
    );
  }

  // No portrait yet: a monogram plate, so the grid keeps its rhythm instead of
  // collapsing or showing an empty frame.
  const initials = person.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div
      className="relative flex aspect-[4/5] w-full max-w-[11rem] sm:max-w-[20rem] items-center justify-center overflow-hidden bg-indigo-ink"
      role="img"
      aria-label={`${person.name} — portrait to follow`}
    >
      <span
        aria-hidden
        className="font-display text-[clamp(2.25rem,6vw,4.5rem)] leading-none font-semibold tracking-[-0.05em] text-white/15"
      >
        {initials || "&"}
      </span>
      <span
        aria-hidden
        className="absolute bottom-5 left-5 h-8 w-[3px] bg-cyan-brand"
      />
      <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
    </div>
  );
}
