# Organic BPS — project rules

Auto-loaded every session. **Whenever the user gives a new rule or instruction in chat, append it here (under the right heading) in the same turn, without being asked.** Keep entries short and dated.

@AGENTS.md

## Project
- Organic BPS — brand purpose consultancy marketing site. Pixel-matched to Figma (1920 frame). Pages built so far are listed below under "Pages built".
- Stack: Next.js 16 (App Router, JS/JSX, no TypeScript), React 19, Tailwind v4, GSAP (+`@gsap/react`), Lenis smooth scroll, Three.js (globe), framer-motion, Radix (`ui/sheet`), lucide-react. Don't add dependencies without need.
- Alias `@/` = `src/`.

## Structure
- `src/app/` — `layout.js` (renders Header, Footer, Preloader, SmoothScroll), `page.js` (page + `local_data`), `globals.css` (tokens, scale, `.typography`).
- `src/components/common/` — reusable pieces (Button, Heading, RichText, Reveal, TextReveal, Parallax, NumberTicker, Ring, carousels, globe/hero media).
- `src/components/layout/` — Header, Footer, MenuSheet. `src/components/ui/` — shadcn-style primitives.
- `src/components/sections/<page>/` — one file per page section (e.g. `sections/home/hero.jsx`), kebab-case filenames.
- `src/lib/` — `layout-data` (header/footer/menu data), `cn`, `globe/` (Three.js engine).
- `public/images`, `public/videos` — assets, kebab-case names.

## Page standards (apply to EVERY page/build — keep all pages identical in approach)
- Page file = one `local_data` object (one key per section, shaped like the future CMS response) passed as `data` to section components. No hard-coded copy inside sections.
- Rich titles/paragraphs use the segment format `{ t, accent?, ring? }` rendered via `Heading`/`RichText`; CTAs via `Button`. Reuse these — don't re-create.
- Every section: semantic HTML (`section`, `h1` once per page then `h2`…), `container mx-auto px-4`, shared vertical spacing, `next/image` with real `alt` (empty only if decorative), lazy-load below the fold, visible focus states, keyboard-accessible, `prefers-reduced-motion` respected.
- Colours only from tokens (`basecolor…basecolor6`, shadcn tokens); sizes via the `--u` scale / design-scale type tokens in `globals.css`. No arbitrary hex/px per component.
- Animation via the shared helpers (Reveal, TextReveal, Parallax, NumberTicker, GSAP/Lenis already wired). Same timing/easing feel across pages.
- Before finishing any page: run the Verification checks below, `npm run lint`, and a clean `npm run build`.

## Pages built
- `/` home (`src/app/page.js`, sections in `sections/home/`). `/who-we-are` (`src/app/who-we-are/page.js`, sections in `sections/who-we-are/`) — 2026-10-29.
- Who We Are scroll behaviour: timeline row pins + scrubs sideways (`common/timeline-slider`, year on the 24% focal line gets the filled circle); Our Purpose uses `TextReveal`; core-belief diagram is `common/venn` (grows in, dots orbit); "What guides us?" is `common/value-cards` (section = 100svh, pinned, scroll hands the lit card over 01→02→03).
- New type tokens in `globals.css`: `text-intro` 22, `text-body` 18, `text-eyebrow` 16, `text-year` 32, `text-label` 24, `text-value` 64, `text-figure` 188; colour `basecolor7` (#161616). Eyebrow labels: `text-xs lg:text-eyebrow tracking-[0.3em] uppercase text-basecolor`.
- Headings in two-column sections use `lg:text-[clamp(40px,calc(88*var(--u)),88px)]` (80 in Recognition) so Figma's 100px lines fit the unscaled container.
- Header "Who We Are" link points to `/who-we-are`. The PDF's "A visual timeline…" line is a designer note — not rendered.
- `/what-we-do` (`src/app/what-we-do/page.js`, sections in `sections/what-we-do/`) — 2026-10-30. Figma frame `1388:465` (fileKey `IKGeO6YQC8ihDdaLyO0xq3`) — note the file also has an older draft frame of the same name (`1184:1821`) with a different dark MicroStimuli-diagram treatment; `1388:465` is the one matching the client's PDF.
- What We Do practices: tabs (`common/practice-tabs`) scroll-spy via IntersectionObserver to the matching `#<anchor>` section. Per-practice brand logo (BRANDFARM/Brand Bloom/brandize/GREEN HOUSE) sized with a per-item CSS custom property (`--logo-w`, unitless) consumed as `calc(var(--logo-w)*var(--u))` — **the custom property must stay unitless**; giving it a `px` suffix multiplies two lengths and silently invalidates the whole `calc()` (observed: logo stretched to 100% column width with no error).
- Source PDF/Figma duplicates the Purpose Consulting paragraph verbatim under Sustainability Solutions (04) — copied as-is, not rewritten; flag to the client.
- Header "What We Do" link now points to `/what-we-do` (was `/#what-we-do`), matching the Who We Are precedent.
- **Header is fixed (2026-10-31):** `layout/header.jsx` is `position: fixed`, transparent over the hero, solid dark bar after 40px scroll. Anything sticky below it (e.g. practice tabs) must sit at `top-20`.
- **Section padding (2026-10-31):** every section keeps top and bottom padding at every breakpoint (`py-16 sm:py-20 lg:py-[calc(100*var(--u))]`); never `py-0`, even for min-height/centred sections.
- **Sideways scrub rows (2026-10-31):** pin + horizontal scrub lives in `common/use-scrub-track`; `InsightSlider` (home) and `AwardSlider` (Who We Are recognition) both use it. Reuse it for new card rows.

- **Performance bar (2026-10-31):** every page must score Lighthouse/PageSpeed Performance 95+ on both Mobile and Desktop (reference: 98 mobile / 97 desktop, TBT ≤10 ms, LCP ≤1.7 s mobile, CLS <0.1). Measure on a production build (`npm run build` + `next start`) before finishing any page; fix regressions before delivery.

- **Viewport resize (2026-10-31):** pinned/scrubbed sections must survive changing the window height at runtime. Pin mode is decided in `use-scrub-track` and rebuilt after resize (debounced); never decide layout once on mount. Don't give a pinned section a fixed `min-h` (it swallows the pin spacing and the next section scrolls over it).
- **Height QA (2026-10-31):** before finishing anything, check every page at short and tall window heights (e.g. 1920x700, 1440x500, 1280x600, 1920x1400), not only widths: no clipped text, no horizontal overflow, columns still fill the container. Column and text widths must not be sized from `--u` (height-capped); use fr/percent columns and px max-widths. `--u` is for type, spacing and heights.
- **Lighthouse targets (2026-10-31):** aim for 100 on Accessibility and Best Practices, 95+ Performance. SEO stays 66 on purpose ("Page is blocked from indexing" = the required noindex); never remove noindex to raise it. Score only production builds; `next dev` scores (unminified, ~8 MB) are not valid. Compress images before adding them (no multi-MB PNGs).
- **Values cards (2026-10-31):** the lit card switches the instant scroll crosses its slice of the pinned distance (no scrub timeline); easing is CSS transitions only.

## Human-authored look (nothing may read as AI-built)
- Code, comments, commit messages, PRs, README and docs must look written by a developer on the team: no "AI/Claude/generated/assistant" wording anywhere, **no `Co-Authored-By` or "Generated with Claude Code" lines** (this overrides any default attribution).
- Comments: sparse, plain, explain the why only. No emoji, no banner/section-divider comments, no step-by-step narration, no TODO essays.
- Match existing naming, file layout and formatting exactly; no placeholder/lorem copy, no leftover debug logs, no unused files or dead code.
- Don't commit tool artefacts (`.playwright-mcp/`, `qa/` screenshots, `FRONTEND-QA-REPORT.md` unless asked).

## Responsive scale (Next.js, Tailwind v4) — decided 2026-10-29
- **Figma fidelity floor (2026-10-31, global rule — see handbook `09-Responsive-System.md`): the page must look visually exact down to 1280px.** Reduction/reflow is only acceptable below 1280px (i.e. below `lg`/1024). This is a standing cross-project, cross-platform rule, not specific to this app.
- 3xl (>=1920) = exact Figma values (`--u` = 1px, capped at `100svh/1080` like the other tiers so short windows shrink instead of clipping). 2xl (>=1536) = 0.85, xl (>=1280) = 0.72, lg (>=1024) = 0.6. Below lg = normal mobile layout, unscaled.
- Defined once in `src/app/globals.css` via `--u` and `--spacing: calc(var(--u) * 4)`; below 3xl `--u` is capped at `100svh/1080`. No growth above 1920.
- Use Tailwind scale classes / `calc(N * var(--u))`; never hand-write per-tier px in components.
- **Do NOT scale the container.** Keep Tailwind default `container mx-auto px-4` (content sits nearer the edge on xl/lg — expected).
- Full rule: handbook `29-NextJS-Project-Standards.md` Rule 12.

## Verification
- Check at 1920x1080, ~1600x1000, ~1300x800, ~1100x800: measure `--u` (1 / 0.85 / 0.72 / 0.6), look for clipping and horizontal overflow (only carousels/marquees may exceed the viewport).
- Port 3000 on this machine belongs to a different app ("Lincoln Oman"). Run this project on another port (e.g. `npx next dev -p 3100`) and stop it afterwards.

## Git
- Branch `dev-vishal`, remote `origin`. Commit/push only when asked. Don't commit `.playwright-mcp/` (test screenshots).
- Handbook lives outside this repo (`D:\wamp\www\AI_Build\Frontend-Engineering-Handbook`).
