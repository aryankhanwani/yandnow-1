import Link from "next/link";
import type { ReactNode } from "react";

/**
 * The site's one text-link treatment: label, hairline underline that draws in
 * from the left, and an arrow that steps forward on hover.
 */
export default function ArrowLink({
  href,
  children,
  tone = "dark",
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: "dark" | "light" | "cyan";
  className?: string;
}) {
  const external = href.startsWith("http") || href.startsWith("mailto:");

  const tones = {
    dark: "text-ink hover:text-indigo-brand",
    light: "text-white/70 hover:text-cyan-brand",
    cyan: "text-cyan-brand hover:text-white",
  } as const;

  const rules = {
    dark: "bg-indigo-brand",
    light: "bg-cyan-brand",
    cyan: "bg-white",
  } as const;

  const inner = (
    <>
      <span className="relative">
        {children}
        <span
          className={`absolute -bottom-[3px] left-0 h-[1px] w-full origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 ${rules[tone]}`}
        />
      </span>
      <svg
        width="13"
        height="13"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden
        className="mt-[0.1em] shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
      >
        <path
          d="M3 11L11 3M11 3H5M11 3V9"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );

  const cls = `group inline-flex items-start gap-1.5 text-[0.9375rem] font-medium transition-colors duration-300 ${tones[tone]} ${className ?? ""}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
