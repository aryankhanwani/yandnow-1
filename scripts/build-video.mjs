/**
 * Encodes the home hero's background loop.
 *
 *   node scripts/build-video.mjs [path/to/source.mp4]
 *
 * Two art-directed crops of the same clip — 16:9 for wide viewports, 3:4 for
 * phones — plus a WebP poster for each.
 *
 * H.264 only, deliberately. Measured against this footage with SSIM, VP9 never
 * won: CRF 34 H.264 matched VP9 CRF 46 at ~87 KB smaller, so a WebM would have
 * been a second download that buys nothing. CRF 32 is the chosen point —
 * SSIM 0.988 against source, and visually identical once the hero's scrim is
 * over it, verified on the flat white walls where H.264 would band first.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";

const SRC =
  process.argv[2] ??
  "/Users/aryan/Projects/weldco/yandnow/public/hero-video-clean.mp4";
const OUT = "public/video";
const CRF = 32;

if (!fs.existsSync(SRC)) {
  console.error(`Source not found: ${SRC}`);
  process.exit(1);
}
fs.mkdirSync(OUT, { recursive: true });

const ff = (args) => execFileSync("ffmpeg", ["-v", "error", ...args], { stdio: "inherit" });

/** @type {{name:string, vf:string, posterAt:string}[]} */
const VARIANTS = [
  {
    name: "hero-lab",
    // Native 1280x720; upscaling a 720p source only costs bytes.
    vf: "fps=24,scale=1280:720:flags=lanczos",
    posterAt: "6.5",
  },
  {
    name: "hero-lab-portrait",
    // 3:4 centre crop. A 16:9 file object-covers down to a useless sliver on a
    // phone, so the tall viewport gets its own framing.
    vf: "crop=ih*3/4:ih,fps=24,scale=540:720:flags=lanczos",
    posterAt: "6.5",
  },
];

for (const v of VARIANTS) {
  ff([
    "-i", SRC, "-an", "-vf", v.vf,
    "-c:v", "libx264", "-profile:v", "high", "-level", "4.0", "-pix_fmt", "yuv420p",
    "-crf", String(CRF), "-preset", "veryslow", "-g", "48",
    "-movflags", "+faststart",
    "-y", `${OUT}/${v.name}.mp4`,
  ]);

  // Poster doubles as the reduced-motion and pre-load frame.
  ff(["-ss", v.posterAt, "-i", SRC, "-frames:v", "1", "-vf", v.vf.replace(/fps=24,?/, ""),
      "-y", `${OUT}/${v.name}-poster.png`]);

  const sharp = (await import("sharp")).default;
  await sharp(`${OUT}/${v.name}-poster.png`)
    .webp({ quality: 74 })
    .toFile(`${OUT}/${v.name}-poster.webp`);
  fs.unlinkSync(`${OUT}/${v.name}-poster.png`);

  const kb = (fs.statSync(`${OUT}/${v.name}.mp4`).size / 1024).toFixed(0);
  console.log(`${v.name}.mp4  ${kb} KB`);
}
