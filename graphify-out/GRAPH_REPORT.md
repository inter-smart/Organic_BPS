# Graph Report - Organic_BPS  (2026-10-30)

## Corpus Check
- 141 files · ~155,935 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: .css 2, (none) 1, .ico 1)

## Summary
- 372 nodes · 912 edges · 23 communities (14 shown, 9 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 25 edges (avg confidence: 0.86)
- Token cost: 102,567 input · 0 output

## Community Hubs (Navigation)
- Page Sections & UI Components
- Dependencies & Tooling Config
- App Shell & Intro Animation
- Navigation & Scroll Sliders
- QA Findings & Indexing Policy
- Lighthouse Accessibility Audit
- shadcn Component Config
- Globe Animation & Camera Controls
- Project Stack Rules (AGENTS/CLAUDE)
- Globe View & Leader Lines
- Globe Asset Loading & Card Manager
- Globe Scene Construction
- Globe Geometry Utilities
- Globe Pin Interaction
- Globe GLSL Shaders
- Globe Animation Manager
- README Boilerplate Notes
- JS Path Aliases
- Next.js Config
- App Directory Convention
- Common Components Convention
- Layout Components Convention
- Lib Directory Convention

## God Nodes (most connected - your core abstractions)
1. `Reveal()` - 39 edges
2. `Heading()` - 35 edges
3. `RichLines()` - 32 edges
4. `createGlobeComponent()` - 28 edges
5. `next` - 24 edges
6. `Button()` - 21 edges
7. `Frontend QA Report — Organic BPS` - 20 edges
8. `react` - 19 edges
9. `Parallax()` - 19 edges
10. `cn()` - 18 edges

## Surprising Connections (you probably didn't know these)
- `QA-05: TextReveal low-contrast start colour` --semantically_similar_to--> `color-contrast audit failure (score 0)`  [INFERRED] [semantically similar]
  FRONTEND-QA-REPORT.md → qa/lighthouse-mobile/report.html
- `Frontend QA Report — Organic BPS` --references--> `robots.txt — Disallow all crawling`  [EXTRACTED]
  FRONTEND-QA-REPORT.md → public/robots.txt
- `Pre-launch noindex/disallow policy` --rationale_for--> `robots.txt — Disallow all crawling`  [EXTRACTED]
  FRONTEND-QA-REPORT.md → public/robots.txt
- `RootLayout()` --calls--> `Footer()`  [EXTRACTED]
  src/app/layout.js → src/components/layout/footer.jsx
- `Button()` --calls--> `cn()`  [EXTRACTED]
  src/components/common/button.jsx → src/lib/utils.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Who We Are page composed from timeline, venn, value-cards and TextReveal** — claude_who_we_are_page, claude_timeline_slider, claude_venn, claude_value_cards, claude_text_reveal [EXTRACTED 1.00]
- **Mobile performance regression tied to loader, scripting weight and pin work** — frontend_qa_report_qa01, frontend_qa_report_qa02, frontend_qa_report_qa13 [EXTRACTED 1.00]
- **--u scale rule, handbook citation and verification checklist jointly define the scaling system** — claude_responsive_scale_rule, claude_handbook_rule_12, claude_verification_rule [INFERRED 0.85]

## Communities (23 total, 9 thin omitted)

### Community 0 - "Page Sections & UI Components"
Cohesion: 0.14
Nodes (42): next, local_data, page(), local_data, metadata, page(), Button(), buttonVariants (+34 more)

### Community 1 - "Dependencies & Tooling Config"
Cohesion: 0.05
Nodes (47): eslintConfig, dependencies, class-variance-authority@^0.7.1, clsx@^2.1.1, cn@^0.5.0, framer-motion@^14.6.0, gsap@^3.15.0, @gsap/react@^2.1.2 (+39 more)

### Community 2 - "App Shell & Intro Animation"
Cohesion: 0.10
Nodes (24): gsap, react, googleSans, inter, metadata, RootLayout(), INTRO_EVENT, subscribe() (+16 more)

### Community 3 - "Navigation & Scroll Sliders"
Cohesion: 0.18
Nodes (18): @gsap/react, InsightSlider(), TimelineSlider(), dim, lit, ValueCards(), MenuSheet(), Sheet() (+10 more)

### Community 4 - "QA Findings & Indexing Policy"
Cohesion: 0.10
Nodes (20): Handbook 29-NextJS-Project-Standards.md Rule 12, Frontend QA Report — Organic BPS, Performance Scorecard Category, QA-01: LCP gated by intro loader, QA-02: Mobile TBT from scripting + unoptimized media, QA-03: Duplicate logo preload warning, QA-04: innerHTML unescaped pin title/subtitle, QA-06: Placeholder footer links (+12 more)

### Community 5 - "Lighthouse Accessibility Audit"
Cohesion: 0.11
Nodes (17): / Home Page, src/components/sections/<page>, TextReveal component, common/timeline-slider, common/value-cards, common/venn (core-belief diagram), /who-we-are Page, Accessibility Scorecard Category (+9 more)

### Community 6 - "shadcn Component Config"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 7 - "Globe Animation & Camera Controls"
Cohesion: 0.21
Nodes (7): three, CameraController, getSharedTextures(), createInactivityTimer(), latLngToVector3(), prefersReducedMotion(), slerpVectors()

### Community 8 - "Project Stack Rules (AGENTS/CLAUDE)"
Cohesion: 0.12
Nodes (15): generate-agent-files.js, node_modules/next/dist/docs/, Framer Motion, Git Workflow Rule (dev-vishal), GSAP + @gsap/react, Lenis Smooth Scroll, lucide-react, Next.js 16 (App Router) (+7 more)

### Community 9 - "Globe View & Leader Lines"
Cohesion: 0.16
Nodes (6): GlobeView(), ICON_PATHS, TEXTURE_PATHS, defaultConfig, resolveConfig(), LeaderLine

### Community 10 - "Globe Asset Loading & Card Manager"
Cohesion: 0.18
Nodes (4): AssetLoader, CardManager, escapeHtml(), createGlobeComponent()

### Community 12 - "Globe Geometry Utilities"
Cohesion: 0.25
Nodes (7): clampRectToViewport(), createEmitter(), normalize2D(), projectToScreen(), rectsOverlap(), smoothstep(), surfaceVisibility()

### Community 14 - "Globe GLSL Shaders"
Cohesion: 0.33
Nodes (6): atmosphereFragmentShader, atmosphereVertexShader, earthFragmentShader, earthVertexShader, starsFragmentShader, starsVertexShader

### Community 16 - "README Boilerplate Notes"
Cohesion: 0.50
Nodes (4): create-next-app bootstrap, Geist font, next/font, Vercel deployment

## Knowledge Gaps
- **36 isolated node(s):** `generate-agent-files.js`, `node_modules/next/dist/docs/`, `Next.js 16 (App Router)`, `React 19`, `Tailwind v4` (+31 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 94 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Frontend QA Report — Organic BPS` connect `QA Findings & Indexing Policy` to `Project Stack Rules (AGENTS/CLAUDE)`, `Lighthouse Accessibility Audit`?**
  _High betweenness centrality (0.250) - this node is a cross-community bridge._
- **Are the 19 inferred relationships involving `createGlobeComponent()` (e.g. with `.loadIcons()` and `.loadLocations()`) actually correct?**
  _`createGlobeComponent()` has 19 INFERRED edges - model-reasoned connections that need verification._
- **What connects `generate-agent-files.js`, `node_modules/next/dist/docs/`, `Next.js 16 (App Router)` to the rest of the system?**
  _36 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Page Sections & UI Components` be split into smaller, more focused modules?**
  _Cohesion score 0.14407502131287298 - nodes in this community are weakly interconnected._
- **Why does `QA-03: Duplicate logo preload warning` connect `QA Findings & Indexing Policy` to `App Shell & Intro Animation`, `Navigation & Scroll Sliders`?**
  _High betweenness centrality (0.144) - this node is a cross-community bridge._
- **Should `Dependencies & Tooling Config` be split into smaller, more focused modules?**
  _Cohesion score 0.05254901960784314 - nodes in this community are weakly interconnected._
- **Why does `next` connect `Page Sections & UI Components` to `Dependencies & Tooling Config`, `App Shell & Intro Animation`, `Navigation & Scroll Sliders`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._