# Aniket Kumar Ray — Portfolio

Dark, cinematic personal portfolio for a Product Manager working on AI products. Built with React 18, Vite, TypeScript (strict), Tailwind CSS v4, GSAP ScrollTrigger, Framer Motion and Lenis.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview    # serve dist/ locally
npm run lint       # eslint
npm run test       # vitest (utilities)
```

Node 18+ is required. `ffmpeg-static` is installed as a dev dependency, so no system FFmpeg is needed for the asset scripts.

## Asset pipeline

Heavy originals live in `source-assets/` (not served). Compressed web versions are generated into `public/`.

```bash
npm run assets     # mine.jpg -> mine_pic.webp, demo videos -> 720p H.264 + posters, og-image.png
npm run frames     # hero-video.mp4 -> public/frames (1280x720) + public/frames-mobile (960x540) + video-poster.webp
```

- `npm run assets` skips outputs that already exist; pass `-- --force` to regenerate.
- `npm run frames` writes `src/data/frames.json` with the frame count; the hero reads it at build time.
- Frame density defaults to 12 fps (120 frames for the 10s source, ~2.8 MB desktop / ~1.5 MB mobile). Override with `FRAMES_FPS=24 npm run frames`.
- Bump `FRAME_VERSION` in `src/components/hero/Hero.tsx` when regenerating frames so the `?v=` cache-buster changes.

If a frame set is missing the hero falls back to the poster image.

## Editing content

Everything is in **`src/data/profile.ts`** — name, contact, about copy, stats, experience, education, certifications, awards, skills, tool logos, projects and nav links. Components never hard-code profile data.

- **Projects / case studies:** add a slug to `src/data/slugs.ts` (used by the sitemap), then a matching entry in `projects`. Each project has `problem`, `approach`, `results`, `metrics` and an `architecture` graph (`nodes` + `edges`) that is rendered as an SVG diagram automatically.
- **Awards with images:** set `image: '/awards/your-file.webp'` on an award to render a photo above the text.
- **Resume PDF:** replace `public/Aniket_Kumar_Ray_Resume.pdf`.
- **Profile photo:** replace `source-assets/mine.jpg` and run `npm run assets -- --force`.

## Environment

Copy `.env.example` to `.env`:

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Canonical URL for SEO tags and the sitemap |
| `VITE_FORM_ENDPOINT` | Formspree (or compatible JSON) endpoint for both contact forms. Leave empty to fall back to a pre-filled `mailto:` |
| `VITE_PLAUSIBLE_DOMAIN` | Enables Plausible analytics in production builds |

## Deploy

**Vercel:** import the repo, framework = Vite. `vercel.json` already contains the SPA rewrite and immutable cache headers for `/frames`, `/frames-mobile`, `/fonts` and `/assets`.

**Netlify:** build command `npm run build`, publish directory `dist`. `public/_redirects` and `public/_headers` cover SPA routing and caching.

Set the env variables above in the hosting dashboard.

## Structure

```
src/
  components/
    bento/      About-section bento cards (gallery, intro, tools marquee, photo, video, music)
    hero/       Scroll-scrubbed canvas frame sequence
    layout/     Nav, Footer
    sections/   About, Experience, Projects, Skills, Education, Contact, ContactForm
    ui/         Button, TextReveal, Cursor, Preloader, Toast, Seo, ArchitectureDiagram, ...
  data/         profile.ts (content), types.ts, slugs.ts, frames.json
  hooks/        useLenis, useReducedMotion, useFramePreloader, useMagnetic, useInView, useContactForm
  lib/          gsap.ts (plugin registration), utils.ts
  pages/        Home, CaseStudy, NotFound
  styles/       tokens.css (design tokens + @font-face), index.css (Tailwind theme, components, keyframes)
scripts/        generate-frames.mjs, prepare-assets.mjs
```

## Accessibility and motion

- `prefers-reduced-motion` disables Lenis, the frame scrub, the custom cursor and all reveal animations via a single `ReducedMotionProvider`.
- All interactive elements have hover, focus-visible and active states; a skip link targets `#main`.
- Headings use real DOM text (the canvas is decorative) and sections are labelled with `aria-labelledby`.

## Performance notes

- Initial JS ≈ 173 KB gzip (React + router + GSAP + Framer Motion); sections below the fold, case-study pages and the music player are code-split.
- Fonts are self-hosted woff2 with `font-display: swap`; the display font and body weight are preloaded.
- Videos are H.264 720p with posters, `preload="none"`, and load/pause via IntersectionObserver.
- Run `npx vite build --mode analyze` to open a bundle treemap.
