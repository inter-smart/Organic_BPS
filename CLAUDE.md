# Organic BPS — project rules

Auto-loaded every session. **Whenever the user gives a new rule or instruction in chat, append it here (under the right heading) in the same turn, without being asked.** Keep entries short and dated.

@AGENTS.md

## Project
- Organic BPS — brand purpose consultancy marketing site. Pixel-matched to Figma (1920 frame). Pages built so far are listed below under "Pages built".
- Stack: Next.js 16 (App Router, JS/JSX, no TypeScript), React 19, Tailwind v4, GSAP (+`@gsap/react`), Lenis smooth scroll, Three.js (globe), framer-motion, Radix (`ui/sheet`), lucide-react. Don't add dependencies without need.
- Alias `@/` = `src/`.

## Commands
- `npm run dev` (use `npx next dev -p 3100`, port 3000 is taken), `npm run build`, `npm start`, `npm run lint`. There is no test runner; verification is lint + clean build + the checks under "Verification".
- `.env` needs `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_API_TOKEN` for the API helpers (`src/lib/api.js`). `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` (reCAPTCHA v3, contact form) is optional: when empty the form skips the captcha.

## Structure
- `src/app/` — `layout.js` (renders Header, Footer, Preloader, SmoothScroll), `page.js` (page + `local_data`), `globals.css` (tokens, scale, `.typography`).
- `src/components/common/` — reusable pieces (Button, Heading, RichText, Reveal, TextReveal, Parallax, NumberTicker, Ring, carousels, globe/hero media).
- `src/components/layout/` — Header, Footer, MenuSheet. `src/components/ui/` — shadcn-style primitives.
- `src/components/sections/<page>/` — one file per page section (e.g. `sections/home/hero.jsx`), kebab-case filenames.
- `src/lib/` — `layout-data` (header/footer/menu data), `cn`, `globe/` (Three.js engine).
- `src/lib/api.js` (shared `request`) + `src/lib/api-calls.js` (2026-11-16) — `apiGet(path, { params, signal })` / `apiPost(path, body, { signal })` for the PHP backend. Never throw; always return `{ data, error }` (`error` = `{ status, message, errors }`). Base URL `NEXT_PUBLIC_API_URL`; the Bearer token is `NEXT_PUBLIC_API_TOKEN` for server and browser calls (exposed by design; there are no proxy route handlers). `apiGet` takes `cache` (2026-11-18): default `true` = server fetch revalidates every 300 s, `false` = no-store (used for `blogs/filter`); POST is never cached.
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

- `/privacy` (`src/app/privacy/page.js`, sections in `sections/privacy/`) — 2026-11-04. Figma frame `1572:4308` (fileKey `IKGeO6YQC8ihDdaLyO0xq3`). Sticky "On this page" card (`sections/privacy/contents`, client leaf) follows the policy section in view; the policy body is one HTML string in `local_data.policy.content` (h3 + p + ul) rendered with `dangerouslySetInnerHTML` inside `.typography.policy-copy` (numbers, rules and bullets come from CSS in `globals.css`); the contents card list is read from the h3 ids. Use the same pattern for other long text pages (Terms). All 12 sections render in full (the Figma frame clips them in an inner scroller). The Figma "Rectangle 34626886" image sits under the hero image and is not used. Footer Privacy link now points to `/privacy`; Terms of use is still `#`.
- New tokens (2026-11-04): `basecolor9` #6f6f6f body grey, `basecolor11` #e5e5e5 rules, `basecolor12` #f7f7f5 soft card, `basecolor13` #e7e4e1 card border, `basecolor14` darker brand red for text under 18.66px bold on light backgrounds (plain `basecolor` #da4d47 is 4.09:1 on white and fails). Figma greys #a7a7a7 (inactive index) also fails contrast, so `basecolor9` is used instead.

- `/blog` (`src/app/blog/page.js`, sections in `sections/blog/`) — 2026-11-04. Figma frame `1572:3325` (fileKey `IKGeO6YQC8ihDdaLyO0xq3`). Banner topic buttons (`topic-rail`) and the listing filters share state through `blog-filter` (context); picking a banner topic filters the list and scrolls to `#latest-thinking`. Featured slider uses `embla-carousel-react` (handbook ch.29: Embla only for new sliders); it keeps one article per category and shuffles the order once after mount via `useSyncExternalStore` (server renders the fixed order, so no hydration mismatch). Listing: category pills + search + paged grid (`pageSize` in data); the "View More" button only renders when more articles exist. Slider author is one placeholder (Anjali Menon, from the Figma frame) for every slide; article `href`s are `#` until the detail page exists; the 9 article summaries/images come from the Figma frame, so the list has 9 items although the design says 42.
- Contrast rule (2026-11-04): white text on the brand red `#da4d47` is 4.09:1 and fails AA for small text. Red bands with white copy use `bg-basecolor14` (privacy CTA, blog newsletter). Small red text on light backgrounds uses `text-basecolor14`; active filter pills use `bg-basecolor14`. Tokens added: `basecolor15` #f6f3ef cream section, `basecolor16` #d9d6d1 pill border.
- Spacing scale gotcha: Tailwind `size-6`/`p-2.5` etc. are multiplied by `--u` (spacing is `calc(var(--u)*4)`), so they shrink below lg. Controls that must stay 24px+ (target size) need `min-h-[24px] min-w-[24px]`.

- `/blog/[slug]` detail (`src/app/blog/[slug]/page.js`, sections in `sections/blog-detail/`) reads `apiGet("blogs/<slug>")` (no Suspense wrapper; a missing blog calls `notFound()`). `mapDetail` in `lib/blog-api.js` shapes hero, author, related and the body HTML (`p.lead` from `main_title`, `content`, `aside` from `box_content`, `content2`), which goes into `.typography.article-copy` (numbers, quote card and the questions box come from CSS in `globals.css`). Related thinking only renders when the API returns related blogs. Topic pill links to `/blog#topic=<Label>`. With `cacheComponents` on, do not export `dynamicParams` from a route.

- `/why-purpose` (`src/app/why-purpose/page.js`, sections in `sections/why-purpose/`) — 2026-11-04. Figma frame `1577:5007` (fileKey `IKGeO6YQC8ihDdaLyO0xq3`); the header/footer inside the frame are the shared ones. Header "Why Purpose" link now points to `/why-purpose` (was `/#why-purpose`). The "Shared direction" diagram is positioned in design px scaled with `--u` at lg (840 x 620) and becomes a stacked list below lg; labels use `
` line breaks from data. Design colours and fonts are exact (user request): tokens `basecolor17`–`26` hold the design greys/reds, Roboto is loaded in `layout.js` (`font-roboto`) for the growth paragraph, Shared direction label, equation tiles and the perspectives block, Inter (`font-inter`) for the authentic paragraphs. Only small text on light backgrounds stays on `basecolor14` (card links, eyebrow, Purpose tile, Authenticity tile) because the design red fails AA there. The diagram animates via `.dg-*` classes in `globals.css` (staged entrance once `[data-diagram]` is revealed, orbit spin, dot pulse; reduced motion = static). Equation tiles reveal one by one. Perspectives is an Embla slider (`perspectives-slider.jsx`); the design has 3 cards, so 3 more come from the blog list to make it slide. Figma's `users-round` export carried a stray frame outline, so the Values card reuses the clean `users-round-2.svg`. The three perspective cards link to `/blog` until real articles exist; the CTA button reads "Let’s talk" (the design has the typo "Lets Talk").
- 404 page (`src/app/not-found.js`, sections in `sections/not-found/`) — 2026-11-04. Figma frame `1572:4708` (named "405" in the file, content is the 404 screen). It is the global not-found, so every unknown URL and every `notFound()` call renders it inside the normal header/footer layout; the hero photo is the shared `/images/privacy/hero.jpg`. Lighthouse cannot audit a 404 document (it errors with ERRORED_DOCUMENT_REQUEST), so check it with axe, the overflow sweep and a trace instead.

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

## Session start (2026-11-03)
- At the start of every session, before the first reply: activate ponytail (full) and caveman, and use graphify. These are chat-working modes only; they never change how code, comments, commits or docs are written.
- graphify: if `graphify-out/graph.json` exists, answer codebase questions with `graphify query` first. Never run a full `/graphify .` (corpus is 3M+ words, mostly `.playwright-mcp` and `public`); build and update on `src` only (`/graphify src`, then `--update`).

## Changes from branch `dev-abish` (merged 2026-11-03, commits 1d56d9f, 75ef500)
Follow these in new builds; they replace the older behaviour described above where they overlap.
- **Header hides on scroll (supersedes the plain fixed/solid header):** `layout/header.jsx` hides on forward scroll and returns on reverse scroll (accumulated thresholds: hide 20px, show 10px, always visible within 80px of the top, kept visible while a `[role="dialog"]` is open or when focus enters it). Classes `.header-smooth`, `.header-hidden`, `.header-visible` live in `globals.css` (transform-only, 0.48s). Solid `bg-basecolor7/90` bar + shadow once past the top. Nav is centred (`mx-auto`); the header CTA button was removed (CTA stays inside `MenuSheet`). Sticky elements below the header still sit at `top-20`, but expect the header to be off-screen while scrolling down.
- **Custom scrollbar (`globals.css`):** 3px wide, white track, `--basecolor` thumb with pill radius, no arrow buttons; Firefox fallback via `scrollbar-width: thin` inside `@supports not selector(::-webkit-scrollbar)`. The thumb hover (`#c43f39`) and track (`#ffff`) are raw hex, outside the token rule — move to tokens when next touched.
- **Timeline (`common/timeline-slider`) rewritten on GSAP ScrollTrigger + `gsap.matchMedia`:** starts at index 0, milestones inside the visible area light up one by one at a calm scroll pace, then the row glides left so the next item becomes active; the track stops at `trackWidth - containerWidth` (last item flush right, no empty space). Year click and arrow keys navigate to that milestone. Reduced motion = no pin, native scroll. It no longer uses `use-scrub-track` or the 24% focal line.
- **Client carousel (`common/client-carousel`):** neighbours now face inward (concave arc, outer cards nearer the viewer and larger). Perspective 585; poses per |offset|: 0 `{0,0,0}`, 1 `{40°, x1.04, z-37}`, 2 `{58°, x1.81, z45}`, 3 `{60°, x2.4, z140}`; scaled by card width / 156. Stage height is capped with `min(348*var(--u), …)`. Slide lookup uses `[role=group]`, not `li`.
- **Globe (`src/lib/globe/`):** pin is one combined canvas texture (grey halo disc + thin border + red dot) instead of separate glow and core sprites. Card hover/click/focus events are routed through the shared emitter; `globe.css`, `CardManager`, `LeaderLine`, `PinManager`, `index.js` were reworked together, so change them as a set. `GlobeImpact` stat labels are `text-sm` on mobile.
- **Hero (Who We Are):** content block is bottom-aligned (`justify-end`), lead copy gets `3xl:text-[25px]`.
- **What We Do practices / page data:** same structure, only reformatted; copy and ids unchanged.
- **Formatting:** all touched files were run through Prettier (80 cols, double quotes, trailing commas, multi-line JSX props). Keep that style in files you edit; don't reformat untouched files in the same commit.
- **Do not repeat:** `PinManager.js` picked up a BOM (`﻿`) at the top and `.playwright-mcp/` screenshots were committed. Save files as UTF-8 without BOM and keep screenshots out of git.

## Sticky below header (2026-11-05)
- Use `.below-header-sticky` (not `top-20`): it sits at `--header-h` (measured live by `layout/header.jsx`) while the header shows and at `top: 0` while it is hidden, so there is no gap.

## Git
- Branch `dev-vishal`, remote `origin`. Commit/push only when asked. Don't commit `.playwright-mcp/` (test screenshots).
- Handbook lives outside this repo (`D:\wamp\www\AI_Build\Frontend-Engineering-Handbook`).

## Breakpoint (2026-11-05)
- Tailwind `lg` is 960px (`--breakpoint-lg` in globals.css), matching the container step; JS matchMedia/scale thresholds use 960 too. Between 960 and 1023 the desktop (`lg:`) styles apply, not sm/md.

## Home data (2026-11-16)
- `src/app/page.js` holds only the static section titles (`local_data`: ring, accents, line breaks) and passes each section its raw API object (`sliders`, `section_one`…`section_eight`) plus the related list (`map_details`, `loyalty_status`, `partners`, `gallery`, `blogs`) and its title. Sections read the API field names themselves and call the `lib/cms-text.js` helpers (same as Who We Are). `ClientCarousel` and `InsightSlider` read `image`/`image_alt_tag` and `title`/`small_description` directly. There is no `home-data.js` and no fallback copy: a missing section renders nothing, an API failure renders no sections.
- The ring replaces the "o" in titles only, never in descriptions; `RichText` renders it only for segments with `ring: true`.

## Who We Are API (2026-11-16)
- `/who-we-are` is read in `app/who-we-are/page.js` and each section reads the API fields itself (no mapper, no fallback copy; a missing block renders nothing, an API failure renders no sections). Section titles are static, kept in `local_data` in the page file (like home); `parseTitle` (`lib/utils.js`) is available for API titles. `timeline-slider`, `value-cards` and `award-slider` read the API field names directly (`year`/`description`, `title`/`description`).

## Why Purpose API (2026-11-16)
- `/why-purpose` reads `apiGet("why-purpose")` in `app/why-purpose/page.js` (wrapped in `Suspense` like home). Section titles are static in `local_data`; each section reads the API fields itself, no fallback copy. Icons from the CMS are remote SVGs, so their `<Image>`s use `unoptimized`.
- Perspectives: heading comes from the API; the article cards and slider labels stay static in `local_data` (plus blog-data) until the API supplies them. The hero CTA has no link until the CMS sets `button_link`.

## What We Do API (2026-11-16)
- `/what-we-do` reads `apiGet("what-we-do")` (Suspense-wrapped). Titles, scroll link and per-practice logo size/alt (`local_data.practices.logos`, by practice order; `--logo-w` stays unitless) are static. Section anchors and tab links come from `slug(section_title)`; service icons are remote SVGs (`unoptimized`). The API still repeats the Purpose Consulting paragraph under Sustainability.

## Contact API (2026-11-16)
- `/contact` reads `apiGet("contact")` in `app/contact/page.js`. Title line breaks/accents and the map button label are static in `local_data`; everything else (banner, enquiry copy, email/phone, office list, explore options for the form select, careers email) comes from the API with no fallback copy. The form still has no submit endpoint. Hero uses `banner_top_image` as a single avatar.
- Form submit (2026-11-17): reCAPTCHA v3 token (`g-recaptcha-response`, from `common/recaptcha`) is added to the payload and verified by the backend; the badge is hidden in CSS and the Google notice sits above the button. `contact-form` calls `apiPost("contact-enquiry")` straight from the browser (no route handler). Validation is the shared zod schema `lib/contact-schema.js` (client submit); rules follow the QA matrix (name letters only, phone optional but 7-15 digits when given, message 2-2000 with no markup/code). Field map: `organisation`→`organization`, `phone`→`phone_number`, `topic`→`explore_together`.
- Titles (2026-11-16): hero, enquiry, locations and careers headings come from the API (`banner_title`, `section_one.subtitle`, `section_two.title`, `section_three.title`) through `parseTitle` (`<span>` = accent, `<br>`/`</br>` = line break). The static title arrays in `local_data` are commented out.

## Privacy API (2026-11-16)
- `/privacy` reads `apiGet("policy/privacy-policy")` (`data.policy`) in `app/privacy/page.js`, Suspense-wrapped. Hero, section heading, help note, CTA and the 12 policy sections come from the API; the scroll link and contents-card labels are static. Section ids are `slug(title)`; each `contents[].description` HTML goes straight into `.policy-copy`. Intro paragraphs are taken as plain text (the API HTML carries its own Tailwind classes, which would not be generated). Only the desktop `banner` image is used.

## Layout API (2026-11-17)
- Header and footer are rendered by `components/layout/site-chrome.jsx` (async, Suspense-wrapped in `app/layout.js`). It reads `apiGet("site-settings")` (header/footer button label+link, footer title/text/welcome) and `apiGet("social-links")` (sorted by `sort_order`, remote SVG icons, `unoptimized`, open in a new tab). A `null` button link falls back to `/contact`; a missing button name hides the button. Logo, nav links, legal links, copyright and credit stay static in `lib/layout-data.js`. Email, phone and `map_link` from site-settings are not used.

## Blog API (2026-11-17)
- `/blog` reads `apiGet("blogs")` in `app/blog/page.js` (no Suspense wrapper); `lib/blog-api.js` maps API blogs to the card shape. Banner, titles, categories (slug), featured blogs, first page of articles and newsletter copy come from the API; labels are static; the listing labels are written directly in `listing.jsx`.
- Topic, search (500 ms debounce, `use-blog-list`) and "View More" call `blogs/filter` straight from the browser (`listing.jsx`, no proxy route; the Bearer token is `NEXT_PUBLIC_API_TOKEN`). `/blogs` leaves the featured blog out of the list, `/blogs/filter` includes it.
- Cards link to `/blog/<slug>`; the detail page still only knows the static article.

## Metadata (2026-11-17)
- Every API page exports `generateMetadata` → `buildMetadata(cmsMeta(source), "/route")` (`lib/seo.js`) and renders `<MetaTags html={source.other_meta_tags} />` (`components/common/meta-tags`). Source is `data.banner` (home, why-purpose, what-we-do, who-we-are, contact, blog), `data.policy` (privacy, terms) or `data.blog` (blog detail). The page fetch is wrapped in `cache()` so metadata and page share one request. How We Work, About and 404 have no CMS meta.
- `lib/meta-tags.js` parses the CMS `other_meta_tags` string (pure, allowlisted): title/description/keywords/robots/canonical and unsafe http-equiv are ignored; og/twitter/hreflang/name tags go through Next Metadata, the rest through `<MetaTags>`.
- Env: `NEXT_PUBLIC_SITE_URL` (required, `data/seo.js`) and `NEXT_PUBLIC_APP_ENV=production` on live only. Anything else stays noindex three ways: layout robots meta, `app/robots.js`, `X-Robots-Tag` header in `next.config.mjs`. `app/sitemap.js` lists static routes plus blog slugs.

## Security headers (2026-11-19)
- `next.config.mjs` `headers()` sends `Strict-Transport-Security: max-age=31536000; includeSubDomains` on every route in every environment; `X-Robots-Tag` noindex is still added only when `NEXT_PUBLIC_APP_ENV` is not `production`. If a reverse proxy (Nginx/Apache/Cloudflare) fronts the app, it must pass the header through or set it too, and HTTP must redirect to HTTPS.

## Why Purpose labels (2026-11-17)
- `local_data` is gone from `app/why-purpose/page.js`; the static aria labels, hero scroll link, authentic image alt and slider labels are constants inside their section files.
- (2026-11-17) Same for home, who-we-are, what-we-do, contact, privacy, terms and blog: no `local_data` in the page files. Static section titles, scroll links and aria labels are constants in the section files (so earlier notes saying titles are "static in `local_data`" no longer apply). how-we-work, about and 404 still use `local_data` (no API).

## Loaders (2026-11-18)
- Every loading state (`loading.js`, page-level `Suspense` fallback, `app/layout.js`) renders `common/route-loader` (logo + rotating ring loader). No skeletons; never `fallback={null}`.
