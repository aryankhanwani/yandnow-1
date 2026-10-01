import Image from "next/image";
import { wordmark } from "@/lib/brand";

/**
 * The YandNow wordmark. Two files, not one recoloured file: the colour mark
 * carries the indigo/cyan/grey artwork as drawn, and the silhouette is cut from
 * the same source's alpha channel, so the figure and swoosh survive as negative
 * space instead of filling in.
 *
 * On dark grounds we render that silhouette as grey rather than pure white —
 * dimming the white artwork keeps the mark from out-shouting the headline type
 * it sits beside, while staying well clear of the contrast floor.
 */
export default function Logo({
  tone = "colour",
  className,
  priority = false,
}: {
  tone?: "colour" | "grey";
  className?: string;
  priority?: boolean;
}) {
  const grey = tone === "grey";
  const src = grey ? wordmark.white : wordmark.colour;

  return (
    <Image
      src={src.src}
      alt="Y&Now"
      width={src.w}
      height={src.h}
      priority={priority}
      // Height is set by the caller; width follows the artwork's ratio.
      className={`w-auto ${className ?? ""}`}
      // Pure white reads as a flare on dark; 78% brightness lands it at a
      // neutral light grey (~#c6c6c6) without touching the artwork files.
      style={grey ? { filter: "brightness(0.78)" } : undefined}
      sizes="180px"
    />
  );
}
