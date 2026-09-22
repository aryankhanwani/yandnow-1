import Image from "next/image";
import { photos, type PhotoKey } from "@/lib/photos";

/**
 * Every photo on the site goes through here: blur placeholder from the build
 * manifest, correct intrinsic size, and a hairline that keeps light images
 * from bleeding into the paper background.
 */
export default function Frame({
  name,
  alt,
  className,
  imgClassName,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  quality = 82,
  fit = "cover",
  ring = true,
}: {
  name: PhotoKey;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  /**
   * "cover" fills whatever box the caller sizes. "natural" lets the photo keep
   * its own ratio — use it in galleries, where forcing one aspect onto a mixed
   * set of landscape and portrait sources re-crops the subject out of frame.
   */
  fit?: "cover" | "natural";
  /**
   * The hairline stops light photos bleeding into paper. Turn it off where
   * frames butt against each other — two adjacent rings read as a seam.
   */
  ring?: boolean;
}) {
  const p = photos[name];

  return (
    <div className={`relative overflow-hidden bg-ink/[0.04] ${className ?? ""}`}>
      <Image
        src={p.src}
        alt={alt}
        width={p.w}
        height={p.h}
        placeholder="blur"
        blurDataURL={p.blur}
        sizes={sizes}
        priority={priority}
        quality={quality}
        className={`w-full ${
          fit === "cover" ? "h-full object-cover" : "h-auto"
        } ${imgClassName ?? ""}`}
      />
      {ring && (
        <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/10" />
      )}
    </div>
  );
}
