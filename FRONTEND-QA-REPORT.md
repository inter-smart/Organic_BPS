# Frontend QA Report — Organic BPS

Date: 2026-10-26 · Next.js 16.4.3 (Turbopack), React 19, Node 26, npm 11 · Windows 11
Build mode: production (`next build` + `next start`, port 3100) · Lighthouse CLI (headless Chrome, default throttling) · Playwright (Chromium)
Scope of this run: current `dev-vishal` working tree (px/Tailwind-container migration, carousel, hero-fit, intro loader, Lenis smooth scroll, parallax).

## 1. Executive summary
**Verdict: PASS WITH WARNINGS — except mobile/desktop LCP & mobile performance score, which FAIL their targets.**
Routes: `/` (+ `/_not-found`), both prerendered; `/` tested. Build: success. Lint: 0 errors. `npm audit --omit=dev`: 0 vulnerabilities.
Issues found this run: 6 · fixed & verified: 3 · open / accepted: 3.

## 2. Scorecard
| Category | Status | Notes |
|---|---|---|
| Build & lint | PASS | build + ESLint clean; 1 harmless build warning (no font override metrics for `Google Sans`) |
| Robots & indexing | PASS | `/robots.txt` = `User-agent: *` / `Disallow: /`; served `meta robots noindex, nofollow, nocache` + `googlebot noindex, nofollow, noarchive` |
| Performance | FAIL | see §3 — LCP bounded by the intro loader; mobile score < 85 |
| Console & network | PASS | 0 errors/warnings at 390 and 1440 (prod, after scroll-through); 0 failed requests |
| HTML / structure | PASS (partial) | 1 `h1`, sane h1→h2→h3 order, `lang="en"`, no duplicate IDs, no broken `#anchors`, every img has `alt`, no unnamed buttons/links. Nu validator NOT run |
| Security | PASS | 0 dep vulns; `innerHTML` in globe cards now escapes text; no `eval`/secrets; external link has `rel="noopener noreferrer"` |
| Accessibility | PARTIAL | Lighthouse 96; Esc closes menu dialog, focus ring visible, carousel arrows labelled. Screen-reader testing NOT performed |
| Responsive | PASS | 11 widths (320…1920): no horizontal overflow, no clipped text, hero = viewport height at every width |
| Visual / Figma | PARTIAL | client carousel compared to Figma node 1471:9; rest not pixel-compared |
| Functional | PASS (partial) | anchor nav, menu sheet, carousel next, loader→page flow verified; globe interaction, hero slides not exercised |
| Cross-browser | NOT TESTED | Chromium only |

## 3. Performance (Lighthouse lab, `/`, production build)
| Run | Perf | A11y | BP | SEO | FCP | LCP (simulated) | TBT | CLS |
|---|--:|--:|--:|--:|--:|--:|--:|--:|
| Mobile | 42–53 | 96 | 100 | 66* | 1.1–2.3 s | 9.5 s (observed 1.4–4.4 s) | 630–1270 ms | 0 |
| Desktop | 84–89 | 96 | 100 | 66* | 0.3–0.4 s | 1.7–1.8 s (observed ~4.0 s) | 50–150 ms | 0.003 |

\*SEO 66 is the **intended** result of `noindex` (is-crawlable); do not "fix".
Variance between runs is large (mobile 47–53). Lab only; no field/INP data. Previous report (2026-10-24, before loader/Lenis): mobile 67, desktop 93.

## 4. Issue register
| ID | Sev | Category | Description | Status |
|---|---|---|---|---|
| QA-01 | P1 | Performance | **LCP is gated by the intro loader**: hero content is hidden until the curtain lifts (~3 s), so observed LCP ≈ 4.4 s (> 2.5 s) and mobile simulated LCP 9.5 s | **Open — design trade-off.** Options: shorter loader, show once per session, or render the h1 outside the gate. Needs product decision |
| QA-02 | P1 | Performance | Mobile TBT 630–820 ms: ~1.5 s scripting in the shared React/framer-motion/GSAP chunk; `MainVideo.mp4` 6 MB (no poster) and `hi-photo-1.png` 1 MB on first load; `public/images` is multi-MB PNGs | **Open** — WebP/AVIF re-export, video poster, lazy hi-photo |
| QA-03 | P2 | Console | Preload warning: header logo preloaded at `sizes=254px` while the loader logo requested `350px` (duplicate logo request) | **Fixed & verified** — header/loader logo now share `sizes="350px"`; 0 console warnings after |
| QA-04 | P2 | Security | `CardManager.js` built markup via `innerHTML` with unescaped `pin.title/subtitle` | **Fixed** (HTML-escaped) — static data today; not exercised with hostile input |
| QA-05 | P2 | A11y | `TextReveal` words start `#dcdcdc` on white (1.37:1) until scrolled; Lighthouse color-contrast flag | **Open (potential)** — intentional scroll-fill effect; darker start colour would pass |
| QA-06 | P3 | Content | 5 footer links are placeholder `href="#"` (socials, privacy, terms) | **Open** — needs real URLs from client |
| QA-07 | P3 | Build | `Failed to find font override values for font Google Sans` build warning; `adjustFontFallback:false` has no effect under Turbopack, so the option was not kept | Accepted limitation |
| QA-08 | P1 | Responsive | Hero was fixed 1080 px (taller than laptop screens); founder copy overlapped the portrait at 1280–1440 | **Fixed & verified** earlier in this session (`h-svh`; text width capped) — re-verified at 11 widths |

## 5. Verified this run
- Anchors `#home #how-we-do #what-we-do #why-we-do #who-we-are #contact` all exist; header link scrolls the section to top (Lenis, y = 0).
- Menu sheet opens as `dialog`, closes on Escape. Play/pause control removed from client carousel (0 matching buttons).
- Preloader: scroll locked until done, `data-intro="done"` set, reveals play afterwards.
- Responsive widths tested: 320, 360, 390, 430, 576, 768, 1024, 1280, 1440, 1600, 1920 (viewport heights 640–1080).

## 6. Not performed
W3C Nu HTML validation, screen-reader and full keyboard-trap pass, Firefox/Safari/Edge, landscape-phone layouts, hero multi-slide behaviour, globe drag/zoom, HTTP security headers beyond Next defaults (no CSP seen), field/INP data, pixel comparison of sections other than the client carousel.

## 7. Files changed in this run
`src/lib/globe/CardManager.js`, `src/components/layout/header.jsx`, `src/components/common/preloader.jsx` (logo stays visible from SSR, shorter minimum duration). Lint + production build re-run clean after changes.

## 8. Addendum — responsive + layout pass (production build, port 3100)
Change set: Figma desktop layout now holds from **1024 px** up and scales proportionally (`--u = 100vw/1920`, Tailwind `--spacing` = 4·u at ≥1024); section heights/paddings follow the Figma frames (What-we-do 1024, Globe 1030, Activation 1035, Clients pt 96/pb 63 at 1920); `xl:` design classes moved to `lg:`.

**Widths tested (12):** 320, 375, 390, 430, 576, 768, 1024, 1280, 1366, 1440, 1600, 1920 (9 sections each; screenshots reviewed at 390, 768, 1024, 1280, 1366, 1440, 1920).
Result at every width: **no horizontal overflow, no clipped text, no console errors/warnings, no failed requests.**

| ID | Sev | Finding | Status |
|---|---|---|---|
| QA-09 | P1 | Client carousel stage collapsed to 0 height at ≥1024 (arbitrary `calc()` height); console "fill + height 0" warnings | Fixed & verified (`lg:h-[calc(621.5*var(--u))]`) — cards render at 1024/1366/1920 |
| QA-10 | P2 | Header nav links wrapped onto two lines at 1024 | Fixed & verified (`whitespace-nowrap`) |
| QA-11 | P2 | "purpose" ring word split mid-word in narrow headings (Greenstorm @1024) | Fixed & verified (`whitespace-nowrap` on the ring word) |
| QA-12 | P3 | Dev server (port 3000) served stale CSS after `globals.css` edit (no `--u`), producing a 0-height carousel there | Environment: restart `npm run dev` to pick up the new CSS; production build verified |
| QA-13 | P2 | Mobile Lighthouse 42 (TBT 1.27 s) after adding Lenis/GSAP/pin work; desktop 89 | **Open** — see QA-01/02; candidates: lazy-load GSAP plugins per section, drop Lenis on touch |

Not performed in this pass: landscape phones, real touch devices, Firefox/Safari, screen reader.

## 9. Addendum — short laptop windows (e.g. 1270×552)
Reported: insights scrub broken on a 1270×552 laptop window, footer broken, horizontal scrollbar. Reproduced on the production build.

| ID | Sev | Finding | Status |
|---|---|---|---|
| QA-14 | P1 | Scaling used viewport **width** only, so 1080-design-px sections (e.g. 1270 wide → 840 px) were taller than a 552 px window; sections did not fit and pins were skipped | Fixed & verified — `--u = min(100vw/1920, 100svh/1080)`; text tokens now derive from `--u` with px floors. At 1270×552 every ≥1024 section is ≤ viewport height |
| QA-15 | P1 | Insights: with `u` shrunk, the 4 cards fit the screen → scrub distance 0 (no animation); on non-fitting screens the row pin sat inside a transformed Reveal wrapper, so `position:fixed` scrolled away with the page | Fixed & verified — card width/gap use viewport width (25.052vw / 2.135vw); row-pin now pins the slider wrapper; pin length ≥ 0.9×viewport height. Section pins (`fixed`, top 0) and scrubs at 1270×552, 1280×600, 1536×730, 1920×1080; row pin verified at 768 and 390 |
| QA-16 | P2 | Footer bottom bar had a fixed 91u height, so the two-line copyright was clipped on short windows; credit text unscaled | Fixed & verified — `min-h` + padding, scaled text; no clipped text at any tested size |
| QA-17 | P2 | Horizontal scrollbar | Not reproduced at any tested size after the fixes (scrollWidth == clientWidth at all 14 sizes, every section, footer and during the insights pin). Likely tied to the stale-CSS dev server / earlier pin width; restart `npm run dev` |

**Sizes tested (14):** 320×640, 375×812, 390×844, 430×932, 576×800, 768×1024, 1024×600, **1270×552**, 1280×720, 1366×768, 1440×900, 1536×730, 1600×900, 1920×1080 — horizontal scroll 0, no overflowing/clipped text, no console errors/warnings, no failed requests.

## 10. Addendum — globe load freeze
| ID | Sev | Finding | Status |
|---|---|---|---|
| QA-18 | P1 | Scrolling into why-we-do froze the page: the globe booted at 400 px from the viewport and compiled shaders + uploaded three 4096 px textures (mipmaps) in one 520 ms main-thread task, right as Lenis was animating | Fixed & verified — globe now boots when the page is idle after the intro loader (or earlier if it nears the viewport), calls `compileAsync` and uploads textures one per frame before the first render. Scrolling from the hero to the globe: 0 long tasks, 0 frame gaps >60 ms (was one 520 ms task) |

Responsive re-run (14 sizes: 320×640 … 1270×552 … 1920×1080): horizontal scroll 0, no overflow/clipped text, footer not clipped, globe renders, no console errors/warnings. Long tasks while at the globe section: none at 9 sizes, 52–85 ms at 375/390/430/768/1270 (down from 520 ms; headless software WebGL, real GPUs are faster).
