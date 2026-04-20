# About Section Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the About section's CSS and HTML to implement the approved Option B design — named text blocks with dividers, a 4-column plain-text skills footer, and updated copy.

**Architecture:** All changes are in `index.html`. CSS block is updated in-place (old about/skill classes replaced, new text-block/skills-footer classes added). HTML block is replaced in-place. No new files.

**Tech Stack:** Vanilla HTML/CSS, single-file site.

**Spec:** `docs/superpowers/specs/2026-04-20-about-section-redesign.md`

---

### Task 1: Replace About CSS

**Files:**
- Modify: `index.html` — CSS block, lines ~632–730 (the `#about` through `.edu-detail` rules)

- [ ] **Step 1: Remove old about-specific CSS and replace with new**

Find and replace the entire CSS block from `#about {` through the closing brace of `.edu-detail` with this:

```css
    #about { background: rgba(10,6,26,.65); }
    .about-grid {
      display: grid;
      grid-template-columns: 220px 1fr;
      gap: 4rem;
      align-items: start;
      margin-top: 0;
    }
    @media (max-width: 740px) { .about-grid { grid-template-columns: 1fr; } }
    .about-visual {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: .5rem;
    }
    /* Text blocks with dividers */
    .about-text { display: flex; flex-direction: column; }
    .text-block {
      padding-bottom: 1.4rem;
      border-bottom: 1px solid rgba(196,168,255,.08);
      margin-bottom: 1.4rem;
    }
    .text-block:last-of-type { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
    .block-tag {
      font-size: .47rem;
      letter-spacing: .32em;
      text-transform: uppercase;
      color: var(--muted);
      font-family: sans-serif;
      margin-bottom: .55rem;
    }
    .block-p {
      font-size: .93rem;
      color: rgba(240,236,255,.82);
      line-height: 1.8;
      font-family: sans-serif;
      font-weight: 300;
      max-width: 480px;
    }
    .block-perspective .block-p {
      font-style: italic;
      font-family: Georgia, serif;
      font-size: 1rem;
      color: var(--lumina);
      font-weight: 400;
    }
    /* Skills footer: 4-column plain text */
    .skills-footer {
      margin-top: 2.8rem;
      padding-top: 2rem;
      border-top: 1px solid rgba(196,168,255,.1);
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }
    @media (max-width: 740px) { .skills-footer { grid-template-columns: repeat(2, 1fr); } }
    .skill-col-label {
      font-size: .47rem;
      letter-spacing: .28em;
      text-transform: uppercase;
      color: var(--lumina);
      font-family: sans-serif;
      margin-bottom: .6rem;
    }
    .skill-col-list { display: flex; flex-direction: column; gap: .22rem; }
    .skill-col-list span {
      font-size: .68rem;
      color: rgba(240,236,255,.42);
      font-family: sans-serif;
      line-height: 1.5;
    }
    /* Education timeline */
    .edu-block {
      margin-top: 2.5rem;
      padding: 1.1rem 1.3rem;
      border-left: 2px solid rgba(196,168,255,.2);
      position: relative;
    }
    .edu-block::before {
      content: '';
      position: absolute;
      left: -5px; top: 1.3rem;
      width: 8px; height: 8px;
      border-radius: 50%;
      background: var(--lumina);
      box-shadow: 0 0 8px rgba(196,168,255,.55);
    }
    .edu-school {
      font-size: .88rem;
      color: rgba(240,236,255,.8);
      font-family: sans-serif;
      font-weight: 400;
      margin-bottom: .2rem;
    }
    .edu-degree {
      font-size: .72rem;
      color: var(--lumina);
      font-family: sans-serif;
      margin-bottom: .3rem;
    }
    .edu-detail {
      font-size: .64rem;
      color: rgba(240,236,255,.35);
      font-family: sans-serif;
      line-height: 1.6;
    }
```

- [ ] **Step 2: Verify no old about CSS classes remain**

Search the `<style>` block for these class names — none should exist after the replacement:
`.skills-clusters`, `.skill-cluster`, `.skill-cluster-label`, `.skill-pills`, `.skill-pill`, `.skills-grid`, `.about-quote`, `.about-text .sec-body`

---

### Task 2: Replace About HTML

**Files:**
- Modify: `index.html` — HTML block, `<section id="about">` through `</section>`

- [ ] **Step 1: Replace the entire about section HTML**

Find and replace everything from `<section id="about">` through its closing `</section>` with:

```html
<section id="about">
  <div class="sec-inner">
    <p class="sec-eyebrow">03 · About</p>
    <h2 class="sec-title">Guided by <em>clarity</em></h2>

    <div class="about-grid">

      <div class="about-visual">
        <svg viewBox="0 0 300 300" width="260" height="260" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="150" cy="150" r="125" stroke="rgba(196,168,255,0.1)" stroke-width="0.8"/>
          <circle cx="150" cy="150" r="85"  stroke="rgba(196,168,255,0.15)" stroke-width="0.8"/>
          <circle cx="150" cy="150" r="46"  stroke="rgba(196,168,255,0.2)" stroke-width="0.8"/>
          <circle cx="150" cy="150" r="20"  fill="url(#ag)"/>
          <ellipse cx="150" cy="150" rx="85" ry="26" stroke="rgba(212,168,71,0.28)" stroke-width="0.8" transform="rotate(-32 150 150)"/>
          <circle cx="150" cy="27"  r="4"   fill="#c4a8ff" opacity="0.8"/>
          <circle cx="258" cy="198" r="3"   fill="#d4a847" opacity="0.7"/>
          <circle cx="52"  cy="94"  r="2.5" fill="#8de8d8" opacity="0.6"/>
          <circle cx="220" cy="62"  r="2"   fill="#f0ecff" opacity="0.7"/>
          <circle cx="82"  cy="242" r="2"   fill="#c4a8ff" opacity="0.5"/>
          <defs>
            <radialGradient id="ag" cx="38%" cy="34%">
              <stop offset="0%" stop-color="#e8d8ff"/>
              <stop offset="55%" stop-color="#9b59d8"/>
              <stop offset="100%" stop-color="#3d1f6e"/>
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div class="about-text">

        <div class="text-block">
          <p class="block-tag">Intro</p>
          <p class="block-p">I'm Celina, a designer based in Bali, originally from Germany. I design brand identities, websites, and content that make businesses easier to understand and easier to trust.</p>
        </div>

        <div class="text-block">
          <p class="block-tag">Approach</p>
          <p class="block-p">I handle the full process myself, so your brand stays consistent from first idea to final output. With a background in both graphic and web design, I focus on work that not only looks right but functions clearly in real use.</p>
        </div>

        <div class="text-block block-perspective">
          <p class="block-tag">Perspective</p>
          <p class="block-p">Good design isn't decoration, it's communication.</p>
        </div>

      </div>
    </div>

    <div class="skills-footer">
      <div>
        <p class="skill-col-label">Design</p>
        <div class="skill-col-list">
          <span>Logo Design</span>
          <span>Brand Identity</span>
          <span>Typography</span>
          <span>Layout</span>
          <span>Print</span>
        </div>
      </div>
      <div>
        <p class="skill-col-label">Web</p>
        <div class="skill-col-list">
          <span>Websites, one-page to full-scale</span>
          <span>Landing Pages</span>
          <span>Responsive Design</span>
          <span>HTML / CSS</span>
          <span>UX Basics</span>
        </div>
      </div>
      <div>
        <p class="skill-col-label">Content</p>
        <div class="skill-col-list">
          <span>Social Media</span>
          <span>Photo Editing</span>
          <span>Video Editing</span>
          <span>Content Strategy</span>
        </div>
      </div>
      <div>
        <p class="skill-col-label">Tools</p>
        <div class="skill-col-list">
          <span>Figma</span>
          <span>Adobe Suite</span>
          <span>Canva Pro</span>
          <span>Webflow</span>
        </div>
      </div>
    </div>

    <div class="edu-block">
      <div class="edu-school">OfG Schule der Gestaltung, University of Arts</div>
      <div class="edu-degree">Double Degree, Graphic Design &amp; Web Design, 2024</div>
      <div class="edu-detail">Visual communication · Branding · Typography · UX · Responsive interfaces</div>
    </div>

  </div>
</section>
```

---

### Task 3: Verify and Commit

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Verify the section at localhost**

Open the site at localhost and scroll to section 03. Confirm:
- Title "Guided by clarity" appears full-width above the grid
- Three text blocks (Intro / Approach / Perspective) with hairline dividers
- Perspective text is italic and lumina-colored
- Skills footer is a 4-column plain text grid below the about-grid
- "Websites, one-page to full-scale" appears as first item in Web column
- Education block with glowing dot appears below skills

- [ ] **Step 2: Commit and push**

```bash
git add index.html docs/superpowers/specs/2026-04-20-about-section-redesign.md docs/superpowers/plans/2026-04-20-about-section-redesign.md
git commit -m "feat: redesign About section with structured text blocks and plain-text skills

- Named text blocks (Intro / Approach / Perspective) with hairline dividers
- Updated copy: Germany origin, full-process framing, no em dashes
- Skills moved to quiet 4-column footer row, plain text, no pill tags
- Web column adds 'Websites, one-page to full-scale'
- Education block unchanged

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
git push
```
