# Case Study Subpages — Design Spec
**Date:** 2026-04-14
**Project:** Solstice Illumina (celinavetsch05-sys/SolsticeIllumina)

---

## Overview

Four standalone HTML pages, one per case study, living in a `case-studies/` folder. Each page shares the homepage's design system — custom cursor, animated star canvas background, nav bar, and color tokens — and uses Layout B (sidebar + main column) with hover effects and the Full content structure (Brief + Colors + Gallery + Reflection).

---

## Files to Create

```
case-studies/
  mind-heart-finance.html
  by-vanessa.html
  nextra.html
  bali-invest.html
```

These paths match the existing `href` links in `index.html` exactly.

---

## Page Structure

### Navigation Bar
- Same fixed nav as homepage: logo left, links right, `Let's Talk` CTA button
- Active link: "Work" highlighted in `--lumina`

### Page Layout: Sidebar + Main

```
┌─────────────────────────────────────────────────────┐
│ NAV BAR (fixed, same as homepage)                   │
├──────────────┬──────────────────────────────────────┤
│              │                                      │
│   SIDEBAR    │   MAIN COLUMN                        │
│   (240px)    │   (flex: 1)                          │
│              │                                      │
│  ← Work      │   Eyebrow (Case Study 0X)            │
│              │   Project title (h1)                 │
│  Client      │   Tags row                           │
│  Scope       │   ─────────────────────              │
│  Year        │   Hero image (full width)            │
│  Tools       │   ─────────────────────              │
│  Result      │   THE BRIEF                          │
│              │   paragraph                          │
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
│              │   Next case → / ← Prev case          │
└──────────────┴──────────────────────────────────────┘
```

### Sidebar Details
- Sticky positioning (stays visible while scrolling)
- `← Work` link at top → scrolls to `/#cases` on homepage
- Meta blocks (Client, Scope, Year, Tools, Result) — each in a bordered card using `.sb-block` style

### Main Column Sections (in order)
1. **Eyebrow** — "Case Study 01" etc., small uppercase muted text
2. **Title** — `h1`, font-weight 200, `--stardust`, large
3. **Tags row** — pill tags matching homepage style
4. **Divider**
5. **Hero image** — full-width, 420px tall, rounded corners, with purple halo glow on hover
6. **Divider**
7. **The Brief** — section label in `--lumina`, 2–3 sentence paragraph in `--muted`
8. **Brand Colors** — section label + a row of color swatches (actual hex values from each project)
9. **Work** — section label + 2-column image grid of deliverable screenshots/mockups
10. **What I Learned** — section label + 1–2 sentence reflection
11. **Case navigation** — `← Prev case` / `Next case →` links at bottom

---

## Hover Effects

| Element | Resting | Hover |
|---|---|---|
| Sidebar meta cards | `border: var(--border)`, `bg: rgba(255,255,255,.02)` | `border: rgba(196,168,255,.35)`, `bg: rgba(107,63,160,.12)`, `translateX(3px)` |
| `← Work` link | color `--muted` | color `--lumina` |
| Hero image | standard border | `box-shadow: 0 0 32px rgba(107,63,160,.4)` |
| Tags | color `--muted`, `border: var(--border)` | color `--lumina`, `border: rgba(196,168,255,.4)` |
| Work grid images | standard | `translateY(-3px)`, `border-color: rgba(196,168,255,.3)` |
| Case nav links | color `--muted` | color `--lumina`, arrow shifts 4px |
| All transitions | — | `.2s–.3s ease` |

---

## Shared Assets (copied from homepage)

Each case study page must include:
- The animated star canvas (`#bgCanvas` + JS)
- The custom cursor (`.cursor` + `.trail-dot` + JS)
- The full CSS variable set (`:root { --void, --solstice, --lumina, ... }`)
- The nav bar HTML + CSS
- The hover listener for cursor scale

---

## Case Study Content

### 1. Mind Heart Finance (`mind-heart-finance.html`)
- **Eyebrow:** Case Study 01
- **Title:** Building a full brand identity for Mind Heart Finance
- **Tags:** Brand Strategy · Logo · Social Content
- **Scope:** Brand Strategy, Logo, Social Content
- **Year:** 2024
- **Tools:** Canva Pro
- **Result:** Full brand kit delivered
- **Brand colors:** `#4a90d9` (blue), `#5a9e6f` (green), `#e8855a` (coral), `#f5f0e8` (cream)
- **Brief:** Finance consulting brand needing a full identity — logo, colors, and Instagram content that builds trust and attracts clients.
- **Deliverables:** Logo, Instagram social posts (carousel/infographic style)
- **What I Learned:** Designing for the finance space requires balancing authority with approachability — every color and type choice signals credibility.

### 2. By Vanessa (`by-vanessa.html`)
- **Eyebrow:** Case Study 02
- **Title:** By Vanessa — branding a wellness & nutrition coach
- **Tags:** Identity · Instagram · Content Pillars
- **Scope:** Identity, Instagram, Content Pillars
- **Year:** 2024
- **Tools:** Canva Pro
- **Result:** Complete brand identity + content system
- **Brand colors:** `#8fa882` (sage), `#e8e4d9` (cream), `#2d3a2e` (dark green)
- **Brief:** A wellness and nutrition coach needed a brand that felt natural, warm, and growth-oriented — reflected in the tree logo and earthy palette.
- **Deliverables:** Logo (tree / "Energie im Wachstum"), Instagram posts, content pillars
- **What I Learned:** Wellness brands live and die by consistency — the content pillars were as important as the visual identity.

### 3. NEXTRA (`nextra.html`)
- **Eyebrow:** Case Study 03
- **Title:** NEXTRA — translating a product into a one-page visual story
- **Tags:** Product Design · Print · Layout
- **Scope:** Product card, print layout
- **Year:** 2024
- **Tools:** Canva Pro
- **Result:** Print-ready product card
- **Brand colors:** `#ffffff` (white), `#f5f0e8` (cream), `#2a2a2a` (near-black)
- **Brief:** A handmade wearable product (neck/face covering) needed a clean, icon-driven product card that explained features at a glance for customers.
- **Deliverables:** Product information card (print + digital)
- **What I Learned:** Information hierarchy in print is unforgiving — icons and layout do more work than words when shelf time is short.

### 4. Bali Invest (`bali-invest.html`)
- **Eyebrow:** Case Study 04
- **Title:** Bali Invest — designing an event graphic that does everything at once
- **Tags:** Event Graphic · Information Design · Social
- **Scope:** Event graphic, information design, social media
- **Year:** 2024
- **Tools:** Canva Pro
- **Result:** Event graphic used across social + digital
- **Brand colors:** `#c9a84c` (gold), `#1a3a2a` (deep green), `#ffffff` (white)
- **Brief:** A full-day investment event at Segara Seaside Resort needed one graphic that communicated venue, schedule, and brand — across Instagram and digital screens.
- **Deliverables:** Event promotion graphic with schedule
- **What I Learned:** Event graphics are information design problems first — the visual style only works if the hierarchy is airtight.

---

## Navigation Order (for prev/next links)
1. Mind Heart Finance → next: By Vanessa
2. By Vanessa → prev: Mind Heart Finance, next: NEXTRA
3. NEXTRA → prev: By Vanessa, next: Bali Invest
4. Bali Invest → prev: NEXTRA

---

## Implementation Notes
- All four pages share identical CSS and JS — extract into a shared `<style>` block at the top of each file (no separate `.css` file, consistent with homepage approach)
- Images go in `case-studies/images/` when Celina adds them — use gradient placeholders until then with comments showing what image goes where
- No framework, no build step — plain HTML/CSS/JS matching homepage
- Add `.superpowers/` to `.gitignore`
