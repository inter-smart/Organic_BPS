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
| Mobile | 47–53 | 96 | 100 | 66* | 1.1–2.3 s | 9.5 s (observed 1.4–4.4 s) | 630–820 ms | 0 |
| Desktop | 84 | 96 | 100 | 66* | 0.4 s | 1.8 s (observed 4.4 s) | 150 ms | 0.003 |

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
