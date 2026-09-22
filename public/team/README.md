# Leadership portraits

Drop one file per person here, named after their `slug` in
`src/lib/site.ts` → `leadership`, then set `photo` on that entry:

    public/team/asha-menon.webp   →   photo: "/team/asha-menon.webp"

- **Crop 4:5 portrait** (e.g. 1200×1500). The card renders `object-cover`, so
  anything else gets centre-cropped.
- **WebP**, quality ~78. Keep each file under ~200 KB.
- Leave `photo` unset and the card falls back to a monogram plate, so the
  section stays presentable until the photography arrives.
