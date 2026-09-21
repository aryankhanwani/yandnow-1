/**
 * Wordmark. The "&" is set in the cyan to carry the second brand colour
 * without resorting to a gradient anywhere on the mark.
 */
export default function Logo({ className }: { className?: string }) {
  return (
    <span
      className={`font-display text-[1.375rem] leading-none font-bold tracking-[-0.045em] transition-colors duration-500 ${className ?? ""}`}
    >
      Y<span className="text-cyan-brand">&amp;</span>Now
    </span>
  );
}
