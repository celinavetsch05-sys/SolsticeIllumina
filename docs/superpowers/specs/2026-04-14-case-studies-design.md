# Case Study Subpages — Design Spec
**Date:** 2026-04-14 (revised after two Opus review rounds)
**Project:** Solstice Illumina (celinavetsch05-sys/SolsticeIllumina)

---

## Overview

Four standalone HTML pages, one per case study, living in a `case-studies/` folder. Each page shares the homepage's design system and uses Layout B (sidebar + main column) with hover effects and the Full content structure (Brief + Colors + Gallery + Reflection).

Two shared external files extracted to avoid duplication across five pages:
- `case-studies/cosmic.js` — animated star canvas + custom cursor logic (shared by all case study pages; can be linked from the homepage later if `index.html` adopts the same extraction)
- `case-studies/case-study.css` — all layout, sidebar, section, and hover styles

---

## Files to Create

```
case-studies/
  mind-heart-finance.html
  by-vanessa.html
  nextra.html
  bali-invest.html
  cosmic.js
  case-study.css
  images/           ← placeholder folder; Celina adds real images here
```

These paths match the existing `href` links in `index.html` exactly.

---

## Page Structure

### Navigation Bar
- Same fixed nav as homepage: logo left, links right, `Let's Talk` CTA button
- Active nav link: **"Case Studies"** highlighted in `--lumina` with a visible "you are here" signal distinct from hover — use a `::after` dot (4px, `--lumina`, centered below the text) so active and hovered links don't look identical (not "Work" — "Work" goes to `#portfolio`, a different section)

### Responsive Layout

**Desktop (≥ 900px): Sidebar + Main**

```
┌─────────────────────────────────────────────────────┐
│ NAV BAR (fixed, same as homepage)                   │
├──────────────┬──────────────────────────────────────┤
│              │                                      │
│   SIDEBAR    │   MAIN COLUMN                        │
│   (240px)    │   (flex: 1)                          │
│   sticky     │                                      │
│   top: 6rem  │   Eyebrow (Case Study 0X)            │
│              │   Project title (h1)                 │
│  ← Case      │   Tags row (.case-tag reused)        │
│    Studies   │   ─────────────────────              │
│              │   Hero image                         │
│  Scope       │   ─────────────────────              │
│  Year        │   THE BRIEF                          │
│  Deliverable │   paragraph                          │
│              │   ─────────────────────              │
│              │   BRAND COLORS                       │
│              │   color swatch row                   │
│              │   ─────────────────────              │
│              │   WORK                               │
│              │   2-col image grid                   │
│              │   ─────────────────────              │
│              │   WHAT I LEARNED                     │
│              │   paragraph                          │
│              │   ─────────────────────              │
│              │   Prev / Next case nav               │
└──────────────┴──────────────────────────────────────┘
```

**Mobile (< 900px): Stacked**

The sidebar drops `position: sticky` and stacks above the main column as a **horizontal meta strip** — Scope / Year / Deliverable displayed as inline-block chips in a wrapping flex row. No vertical sidebar on mobile. No "Client" field — the page title already names the client.

Also on mobile (< 768px):
- `body { cursor: auto }` — restore default cursor
- `.cursor`, `.trail-dot` — `display: none`

### Sidebar Details (desktop)
- `position: sticky; top: 6rem` — clears the fixed nav (~61px + breathing room)
- `← Case Studies` link at top → `href="/#cases"` (not `/#portfolio`)
- **No "Client" field** — the page title already names the client; repeating it in the sidebar is redundant. Fields: Scope / Year / Deliverable only.
- Meta blocks reuse the **`.skill-card` visual treatment** from `index.html` exactly: `padding: 1.1rem 1.2rem; border: 1px solid var(--border); border-radius: 12px; background: rgba(255,255,255,.02)` — no new class needed
- Sidebar label field text in `--lumina` (matches `.skill-card-title`), value text in `--muted`

### Main Column Sections (in order)
1. **Eyebrow** — reuse `.sec-eyebrow` class: `.63rem`, `.4em` letter-spacing, `--muted`, uppercase, sans-serif
2. **Title** — `h1`, `font-weight: 200`, `--stardust`, `clamp(1.8rem, 3.5vw, 3rem)` (matches `.sec-title`)
3. **Tags row** — reuse existing `.case-tag` class from `index.html` exactly (`.58rem`, `.18em`, `border-radius: 20px`, `--muted`)
4. **Divider** — reuse `.divider` class
5. **Hero image** — `height: clamp(220px, 40vh, 420px)`, full width, `border-radius: 12px`, gradient placeholder until real image added
6. **Divider**
7. **The Brief** — section label in `.sec-eyebrow` style, paragraph in `.sec-body` style (`--muted`, sans-serif, `line-height: 1.85`)
8. **Brand Colors** — section label + flex row of color swatches. Each swatch: `height: 32px`, `border-radius: 8px`, `flex: 1`. **All swatches must have `border: 1px solid rgba(196,168,255,.25)`** so light/near-black colors read against `--void`. Each swatch shows its hex code below in `.sec-eyebrow` styling (`.63rem`, `--muted`, sans-serif)
9. **Work** — section label + 2-column image grid. Each cell: gradient placeholder with comment marking what image goes here. On hover: `translateY(-3px)`, `border-color: rgba(196,168,255,.3)`
10. **What I Learned** — section label + paragraph
11. **Case navigation** — see below

---

## Case Navigation (Prev / Next)

| Page | Left | Right |
|---|---|---|
| Mind Heart Finance | *(hidden)* | `Next case → By Vanessa` |
| By Vanessa | `← Mind Heart Finance` | `Next case → NEXTRA` |
| NEXTRA | `← By Vanessa` | `Next case → Bali Invest` |
| Bali Invest | `← NEXTRA` | `→ Back to all case studies` (links to `/#cases`) |

- The missing side is **hidden entirely** (not disabled or replaced with a blank)
- The single remaining link is aligned to its natural side (left link left-aligned, right link right-aligned)

---

## Hover Effects

| Element | Resting | Hover |
|---|---|---|
| Sidebar meta cards | `border: var(--border)`, `bg: rgba(255,255,255,.02)` | `border: rgba(196,168,255,.35)`, `bg: rgba(107,63,160,.12)` — **no translateX** (cards aren't clickable) |
| `← Case Studies` link | `color: --muted` | `color: --lumina` |
| Hero image | standard border | `box-shadow: 0 0 32px rgba(196,168,255,.28)` (uses `--lumina` not `--solstice`) |
| Tags (`.case-tag`) | `color: --muted`, `border: var(--border)` | `color: --lumina`, `border: rgba(196,168,255,.4)` — this hover rule is **new**, added in `case-study.css` only; `index.html`'s `.case-tag` is not modified |
| Work grid images | standard | `translateY(-3px)`, `border-color: rgba(196,168,255,.3)` |
| Case nav links | `color: --muted` | `color: --lumina`, arrow shifts `4px` |
| All transitions | — | `.2s–.3s ease` |

---

## Shared Assets (`cosmic.js`)

Extracted from `index.html` verbatim:
- Star canvas animation (`#bgCanvas` + resize logic)
- Custom cursor (`.cursor`, `.trail-dot`, mouse tracking)
- Hover listener for cursor scale (applied to nav links, tags, cards, case nav links)

**On case study pages specifically:**
- Add `window.addEventListener('load', resize)` in addition to the standard `resize` event — images may load after initial layout and leave the canvas height short on taller pages
- Below 768px: `body { cursor: auto }`, `.cursor { display: none }`, `.trail-dot { display: none }`

---

## Case Study Content

### 1. Mind Heart Finance (`mind-heart-finance.html`)
- **Eyebrow:** Case Study 01
- **Title:** Building a full brand identity for Mind Heart Finance
- **Tags:** Brand Strategy · Logo · Social Content
- **Scope:** Brand Strategy, Logo, Social Content
- **Year:** 2024
- **Deliverable:** Full brand kit (logo, colors, social content templates)
- **Brand colors:** `#4a90d9` (blue) · `#5a9e6f` (green) · `#e8855a` (coral) · `#f5f0e8` (cream)
- **The Brief:** A finance consulting brand needed a full identity that builds trust while staying approachable — logo, color palette, and Instagram content designed to attract and educate clients.
- **Work images:** Logo lockup, Instagram post examples (infographic/carousel style)
- **What I Learned:** *(Celina to personalise — e.g. a specific color or type decision made for the target audience of younger entrepreneurs vs. institutional clients)*

### 2. By Vanessa (`by-vanessa.html`)
- **Eyebrow:** Case Study 02
- **Title:** By Vanessa — branding a wellness & nutrition coach
- **Tags:** Identity · Instagram · Content Pillars
- **Scope:** Identity, Instagram, Content Pillars
- **Year:** 2024
- **Deliverable:** Brand identity system + Instagram content pillars
- **Brand colors:** `#8fa882` (sage) · `#e8e4d9` (cream) · `#2d3a2e` (dark green)
- **The Brief:** A wellness and nutrition coach needed a brand that felt natural, warm, and growth-oriented — approachable for everyday clients while still feeling credible and professional. The tagline "Energie im Wachstum" (Energy in Growth) anchored the identity direction.
- **Work images:** Logo (tree / "By Vanessa — Energie im Wachstum"), Instagram nutrition posts
- **What I Learned:** Wellness brands live and die by consistency — the content pillars were as important as the visual identity itself.
- **Note:** "Energie im Wachstum" is German ("Energy in Growth") — include the English gloss on first use for non-German readers.

### 3. NEXTRA (`nextra.html`)
- **Eyebrow:** Case Study 03
- **Title:** NEXTRA — translating a product into a one-page visual story
- **Tags:** Product Design · Print · Layout
- **Scope:** Product card, print layout
- **Year:** 2024
- **Deliverable:** Print-ready product information card (digital + print)
- **Brand colors:** `#ffffff` (white) · `#f5f0e8` (cream) · `#2a2a2a` (near-black) — **all swatches must have the standard `rgba(196,168,255,.25)` border** (near-black is near-invisible on `--void` without it)
- **The Brief:** NEXTRA is a handmade neck protection scarf. The product card needed to explain its features and use cases quickly using icons and clean layout, for both print and digital distribution.
- **Work images:** Product card front, icon detail
- **What I Learned:** Information hierarchy in print is unforgiving — icons and layout do more work than words when a customer has seconds to decide.

### 4. Bali Invest (`bali-invest.html`)
- **Eyebrow:** Case Study 04
- **Title:** Bali Invest — designing an event graphic that does everything at once
- **Tags:** Event Graphic · Information Design · Social
- **Scope:** Event graphic, information design, social media
- **Year:** 2024
- **Deliverable:** Event promotion graphic deployed across Instagram and digital screens
- **Brand colors:** `#c9a84c` (gold) · `#1a3a2a` (deep green) · `#ffffff` (white)
- **The Brief:** A full-day investment event at Segara Seaside Resort in Bali needed one graphic that communicated venue, schedule, and brand — compressed into a single social-ready visual.
- **Work images:** Event graphic with schedule, detail crop
- **What I Learned:** Event graphics are information design problems first — the visual style only works if the hierarchy is airtight.

---

## Case Navigation Order
1. Mind Heart Finance → next: By Vanessa
2. By Vanessa → prev: Mind Heart Finance → next: NEXTRA
3. NEXTRA → prev: By Vanessa → next: Bali Invest
4. Bali Invest → prev: NEXTRA → right side: Back to all case studies (`/#cases`)

---

## Implementation Notes
- All four HTML pages link to shared `case-study.css` and `cosmic.js` — no per-page duplication of styles or canvas/cursor logic
- Images go in `case-studies/images/` — gradient placeholders used until Celina adds real screenshots, with inline comments marking what each placeholder represents
- No framework, no build step — plain HTML/CSS/JS
- "Tools: Canva Pro" omitted from sidebar — repeated across all four cases, adds little. Tools can be mentioned naturally in The Brief if relevant.
