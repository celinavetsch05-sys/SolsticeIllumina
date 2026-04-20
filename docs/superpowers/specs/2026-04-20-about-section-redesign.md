# About Section Redesign

**Date:** 2026-04-20
**Status:** Approved — ready for implementation

---

## Summary

Redesign the About section (03) with updated copy, clearer text hierarchy using named blocks with dividers, and a quieter skills layout. Education block stays.

---

## Copy

**Title:** Guided by *clarity*

**Intro block:**
> I'm Celina, a designer based in Bali, originally from Germany. I design brand identities, websites, and content that make businesses easier to understand and easier to trust.

**Approach block:**
> I handle the full process myself, so your brand stays consistent from first idea to final output. With a background in both graphic and web design, I focus on work that not only looks right but functions clearly in real use.

**Perspective block (quote, italic, lumina color):**
> Good design isn't decoration, it's communication.

No em dashes anywhere. No vague words like "system" or "solution."

---

## Layout Structure

```
[eyebrow: 03 · About]
[title: Guided by clarity]   ← full-width, above grid

[grid: 220px | 1fr, gap 4rem]
  LEFT: planet/orb SVG (unchanged)
  RIGHT:
    [block: Intro]     ← tiny label + paragraph + hairline divider
    [block: Approach]  ← tiny label + paragraph + hairline divider
    [block: Perspective] ← tiny label + italic lumina-colored quote, no divider after

[skills footer: 4-column grid, full-width, above education]
  Design | Web | Content | Tools

[education block: border-left timeline style]
```

---

## Skills Content

| Column    | Items |
|-----------|-------|
| Design    | Logo Design, Brand Identity, Typography, Layout, Print |
| Web       | Websites one-page to full-scale, Landing Pages, Responsive Design, HTML / CSS, UX Basics |
| Content   | Social Media, Photo Editing, Video Editing, Content Strategy |
| Tools     | Figma, Adobe Suite, Canva Pro, Webflow |

Skills are plain text lists — no pill tags, no hover effects. Category labels in `--lumina` uppercase, items in muted opacity.

---

## CSS Changes

- `.about-text`: flex column, no gap (spacing handled by `.text-block` padding)
- `.text-block`: `padding-bottom: 1.4rem`, `border-bottom: 1px solid rgba(196,168,255,.08)`, `margin-bottom: 1.4rem`
- `.text-block:last-of-type`: no border, no margin
- `.block-tag`: `font-size: .47rem`, `letter-spacing: .32em`, uppercase, `color: var(--muted)`, sans-serif
- `.block-p`: `font-size: .93rem`, `line-height: 1.8`, sans-serif, `font-weight: 300`, `max-width: 480px`
- `.block-perspective .block-p`: italic, Georgia, `color: var(--lumina)`, `font-size: 1rem`
- `.skills-footer`: `display: grid`, `grid-template-columns: repeat(4,1fr)`, `gap: 1.5rem`, `margin-top: 2.8rem`, `padding-top: 2rem`, `border-top: 1px solid rgba(196,168,255,.1)`
- `.skill-col-label`: `font-size: .47rem`, uppercase, `color: var(--lumina)`, `margin-bottom: .6rem`
- `.skill-col-list span`: `font-size: .68rem`, `color: rgba(240,236,255,.42)`, block display
- Remove: `.skills-clusters`, `.skill-cluster`, `.skill-cluster-label`, `.skill-pills`, `.skill-pill`, `.skill-pill:hover`, `.skills-grid`, `.about-quote`

---

## Education Block

Keep existing HTML and CSS unchanged:
- School: OfG Schule der Gestaltung, University of Arts
- Degree: Double Degree, Graphic Design & Web Design, 2024
- Detail: Visual communication · Branding · Typography · UX · Responsive interfaces

---

## What Does NOT Change

- Section background (`rgba(10,6,26,.65)`)
- Planet/orb SVG illustration
- `.about-grid` grid columns and gap
- Education block CSS
- Mobile breakpoint (`@media (max-width: 740px)`)
