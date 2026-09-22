import Image from "next/image";
import { wordmark } from "@/lib/brand";

/**
 * The YandNow wordmark. Two files, not one recoloured file: the colour mark
 * carries the indigo/cyan/grey artwork as drawn, and the white mark is a
 * silhouette cut from the same source's alpha channel, so the figure and swoosh
 * survive as negative space instead of filling in.
 */
export default function Logo({
  tone = "colour",
  className,
  priority = false,
}: {
  tone?: "colour" | "white";
  className?: string;
  priority?: boolean;
}) {
  const src = tone === "white" ? wordmark.white : wordmark.colour;

  return (
    <Image
      src={src.src}
      alt="YandNow"
      width={src.w}
      height={src.h}
      priority={priority}
      // Height is set by the caller; width follows the artwork's ratio.
      className={`w-auto ${className ?? ""}`}
      sizes="180px"
    />
  );
}
