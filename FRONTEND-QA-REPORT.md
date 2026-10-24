# Frontend QA Report — Organic BPS

Date: 2026-10-24 · Next.js 16.4.3 (Turbopack), React 19.3, Node 26.11.1, npm 11.13.0 · Windows 11
Build mode: production (`next build` + `next start`, port 3100) · Lighthouse 13.5.0 (headless Chrome, default throttling)

## 1. Executive summary
**Verdict: FAIL (mobile LCP target) / PASS WITH WARNINGS otherwise.**
Single route (`/`, plus `/_not-found`); both prerendered. Lint: 0 errors. Build: success. `npm audit --omit=dev`: 0 vulnerabilities.
Issues found: 7 · fixed & verified: 4 · open: 3 · not tested: see §6.

## 2. Scorecard
| Category | Status | Notes |
|---|---|---|
| Build & lint | PASS | clean; 1 build warning: no font override metrics for `Google Sans` |
| Robots & indexing | PASS (after fix) | was FAIL: no robots.txt, no meta robots |
| Performance | FAIL (mobile) | desktop 93 / mobile 67, mobile LCP 9.4 s > 2.5 s |
| Console & network | PASS | only a DevTools "lazy image needs dimensions" issue |
| Accessibility | PARTIAL | Lighthouse 96; manual keyboard/screen-reader checks NOT performed |
| Security | PASS | 0 dep vulns; one low-risk `innerHTML` (static data) |
| HTML validation / responsive / visual / functional / cross-browser | NOT TESTED | browser-automation MCP disconnected mid-run |

## 3. Performance (Lighthouse lab, `/`)
| Run | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS | Weight |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| Mobile, before | 57 | 93 | 100 | 100 | 1.1 s | 9.3 s | 680 ms | 0 | 16.0 MB |
| Mobile, after | 67 | 96 | 100 | 66* | 1.1 s | 9.4 s | 300 ms | 0 | 7.2 MB |
| Desktop, after | 93 | – | – | – | – | 1.7 s | 80 ms | 0 | – |

\*SEO 66 is the **intended** result of `noindex` (is-crawlable fails); do not "fix".
Lab only; no field/INP data. Run-to-run variance is significant.

## 4. Issue register
| ID | Sev | Category | Description | Status |
|---|---|---|---|---|
| QA-01 | P1 | Indexing | No `robots.txt`, no meta robots (site indexable) | Fixed & verified: `public/robots.txt` (`Disallow: /`), `metadata.robots` in `src/app/layout.js`; served meta `noindex, nofollow, nocache` + googlebot tag confirmed |
| QA-02 | P1 | Performance | `whatwedo.mp4` (9 MB, `autoPlay`) downloaded on load though below the fold on mobile; page 16 MB | Fixed & verified: `hi-media.jsx` sets `src` only once section enters viewport; weight 16.0→7.2 MB, TBT 680→300 ms |
| QA-03 | P2 | A11y | Client carousel `<ul>` had `<li role="group">` children (axe `list`) | Fixed & verified: `client-carousel.jsx` now div/motion.div; audit no longer fails |
| QA-04 | P1 | Performance | Mobile LCP 9.4 s: LCP element is hero `<h1>`, hidden (opacity 0 blur `Reveal`) until hydration, which is slow under 4x CPU throttle | **Open** — render h1 visible in SSR HTML / drop entrance animation on LCP text. Design-affecting, not changed |
| QA-05 | P2 | Performance | Images are multi-MB PNGs (`greenstorm-1.png` 7.6 MB, `globe-poster.png` 4.6 MB…; `public/images` 44 MB); Lighthouse est. ~1 MB savings; `MainVideo.mp4` 5.9 MB with no poster | **Open** — re-export as WebP/AVIF at needed sizes, add video poster |
| QA-06 | P2 | A11y | `TextReveal` words start `#dcdcdc` on white (1.37:1) until scrolled; Lighthouse flags 10 nodes | **Open (potential)** — intended scroll-fill effect; consider a darker start colour |
| QA-07 | P3 | Security | `CardManager.js:52` builds markup via `innerHTML` with `pin.title/subtitle` | Potential — data is static in `page.js`; escape/`textContent` before wiring to CMS |

## 5. Other findings
- Metadata: title + description present, `<html lang="en">`, no canonical/OG tags (fine for noindex).
- `robots.txt` limitation: `Disallow` blocks crawling but not de-indexing, and prevents crawlers seeing `noindex`. If the site must stay private, use auth/IP restriction. Confirm this is a staging deploy before shipping the noindex policy to production.
- External link has `rel="noopener noreferrer"`. No secrets or `eval` found in src.
- Console: no errors/warnings (one DevTools issue: lazy-loaded image without explicit dimensions, source not identified).
- Breakpoint note: AGENTS.md says to read Next docs; none of the changes depend on new APIs.

## 6. Not performed
HTML validator run, axe on full DOM beyond Lighthouse, keyboard/focus testing, responsive viewport sweep (12 widths), visual/Figma comparison, interaction tests (menu sheet, sliders, globe), cross-browser (Firefox/Safari/Edge), security-header review beyond default Next headers (no CSP etc. seen). Chrome DevTools/Playwright MCP servers disconnected during the run; only Lighthouse CLI was used.

## 7. Files changed
`src/app/layout.js`, `src/components/common/hi-media.jsx`, `src/components/common/client-carousel.jsx`, `public/robots.txt`. Lint + build re-run clean after changes.
