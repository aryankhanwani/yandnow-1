# YandNow — skill development platform

A scroll-driven marketing site for YandNow, built with Next.js 16 (App Router),
Tailwind v4 and Motion. Every page is statically prerendered.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static prerender of all 16 routes
npm run lint
```

## Pages

| Route | Contents |
| --- | --- |
| `/` | Full-bleed video hero, partner marquee, scroll-scrubbed position statement, sticky six-vertical scroller, metrics, four-step method, pinned horizontal gallery, footprint, testimonials |
| `/solutions` | Index of the six verticals + what every programme includes |
| `/solutions/[slug]` | One page per vertical — audience, modules, formats, gallery, related programmes, next-vertical link |
| `/about` | Principles, metrics, six-year timeline, method, trainers, FAQ |
| `/impact` | Verified outcomes, filterable programme archive, counting methodology |
| `/contact` | Enquiry form + direct details + FAQ |

Content lives in one place: [`src/lib/site.ts`](src/lib/site.ts) — verticals,
metrics, method, programme archive, partners, testimonials and FAQs.

## Design system

**Colour.** Brand indigo `#2E3191` and cyan `#27AAE1`, extended with
`indigo-ink` for dark plates and a warm-cool paper scale for light ones. Tokens
are declared in `@theme` in [`src/app/globals.css`](src/app/globals.css).

Sections alternate flat plates — paper, dark ink, indigo — rather than
gradients. Colour is applied as solid fills, hairline rules and the cyan accent;
the only `linear-gradient` in the codebase masks the marquee edges.

**Type.** Three faces, each with one job:

- **Manrope** 500–700 — display and headings (`--font-display`)
- **Inter** 400–500 — body copy (`--font-sans`)
- **JetBrains Mono** 400–500 — eyebrows, indices, metadata (`--font-mono`)

Nothing lighter than 400 or heavier than 700 ships. Display sizes use the
fluid `.display-xl/-lg/-md` clamps; body copy sits at 16–17px with 1.55–1.65
line height.

## Motion

Smooth scrolling is [Lenis](https://github.com/darkroomengineering/lenis),
mounted once in [`SmoothScroll.tsx`](src/components/SmoothScroll.tsx) with a
~1.05s cubic ease. It keeps `window.scrollY` authoritative, so Motion's
`useScroll` works without extra wiring.

All entrance and scroll-linked animation goes through
[`motion-primitives.tsx`](src/components/motion-primitives.tsx) — `Reveal`,
`RevealGroup`/`RevealItem`, `MaskLines`, `Parallax`, `ScaleInFrame`, `Counter` —
so the whole site shares one easing curve and one travel distance.
`prefers-reduced-motion` disables Lenis and flattens every primitive.

> `MaskLines` puts its in-view trigger on the **clip container**, not the moving
> span. A span held at `y: 108%` is clipped out of its parent's box, so an
> observer on it never reports an intersection.

## Hero video

The home hero is full-bleed footage: a 5.5s arc-welding loop from the CRISP
fabrication programme, cut from the archive's own `21-22/CRISP/Welder/7.mp4`.
Two art-directed crops live in `public/video` —

| File | Crop | Use |
| --- | --- | --- |
| `hero-welding.{mp4,webm}` | 1600×792 (~2:1) | viewports wider than 640px |
| `hero-welding-portrait.{mp4,webm}` | 720×960 (3:4) | phones, framed on the welder |

Each ships with a matching `.webp` poster. Both are silent, ~0.9–1.4 MB, and
the blown-out top of the original frame is cropped away so white type stays
legible over it.

The footage is held by a single flat **neutral** scrim (`bg-ink/38`) rather than
a brand-coloured one — an indigo wash tinted the whole clip blue and flattened
it. Legibility is carried the rest of the way by `.hero-copy`, a text shadow on
the hero type itself. Measured against the composited background at 1440px,
white text clears 6.5:1 on average and 3.4:1 over the brightest 2% of the frame
(the welder's pale shirt), so the large headline stays above the 3:1 AA
threshold even at its worst moment in the loop.

[`HeroVideo.tsx`](src/components/HeroVideo.tsx) handles the rest: it picks the
crop in JS (not via `media` on `<source>`, which browsers ignore
inconsistently — and when ignored, the *first* source wins, which would hand
desktop the portrait crop), pauses playback when the hero scrolls out of view,
reflects refused autoplay honestly in its control, and falls back to the poster
under `prefers-reduced-motion`. A visible pause button is not optional: a
background video longer than five seconds that cannot be stopped fails
WCAG 2.2.2.

To re-cut the loop, the encode used was:

```bash
ffmpeg -ss 1.40 -t 5.50 -i "<archive>/21-22/CRISP/Welder/7.mp4" \
  -vf "crop=iw:ih*0.88:0:ih*0.12,scale=1600:-2,fps=25" -an \
  -c:v libx264 -pix_fmt yuv420p -crf 26 -preset slow -movflags +faststart \
  public/video/hero-welding.mp4
```

## Photography

All 61 images come from the client's own programme archive (2020–2026) — no
stock. (The `hero-video*.mp4` files in the older `weldco/yandnow` project are
AI-generated corporate stock with holographic overlays; they are deliberately
not used here.) [`scripts/build-images.mjs`](scripts/build-images.mjs) holds the curated
manifest: which frame, at which aspect, and how much to trim off the bottom or
right edge to cut burnt-in GPS/date stamps out of frame.

```bash
ARCHIVE="/path/to/Photos for website" npm run images
```

It writes optimised webp into `public/img` and regenerates
`src/lib/photos.ts` with dimensions and blur placeholders. That file is
generated — edit the manifest, not the output. Photos are consumed through
[`Frame.tsx`](src/components/Frame.tsx), which wires up the placeholder,
intrinsic size and hairline border.

## Notes

- The contact form has no backend. It validates, then composes a `mailto:`
  draft — swap the handler in `ContactForm.tsx` for a POST when an endpoint
  exists.
- Metrics, testimonials and partner names are placeholder content pending real
  figures; programme titles, partners, places and years match the archive.
