# Case Studies Subpages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build four case study subpages (plain HTML/CSS/JS) sharing a sidebar+main layout, cosmic design system, and full content per the design spec.

**Architecture:** Two shared files (`cosmic.js`, `case-study.css`) eliminate duplication across the four HTML pages. Each HTML page links the shared files and provides only page-specific content. No framework, no build step.

**Tech Stack:** Plain HTML5, CSS3 (variables, clamp, grid, flexbox, sticky), vanilla JS (canvas API, requestAnimationFrame, mousemove events)

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `case-studies/cosmic.js` | Create | Star canvas animation + custom cursor + trail (extracted from index.html with load listener + mobile disable) |
| `case-studies/case-study.css` | Create | All shared CSS: reset, tokens, nav, layout, sidebar, section styles, hover effects, responsive |
| `case-studies/mind-heart-finance.html` | Create | Case Study 01 — Mind Heart Finance content |
| `case-studies/by-vanessa.html` | Create | Case Study 02 — By Vanessa content |
| `case-studies/nextra.html` | Create | Case Study 03 — NEXTRA content |
| `case-studies/bali-invest.html` | Create | Case Study 04 — Bali Invest content |
| `case-studies/images/` | Create (empty) | Placeholder folder for Celina's real images |

---

## Task 1: Create folder structure and `cosmic.js`

**Files:**
- Create: `case-studies/cosmic.js`
- Create: `case-studies/images/.gitkeep`

- [ ] **Step 1: Create the folder structure**

```bash
mkdir -p case-studies/images
touch case-studies/images/.gitkeep
```

- [ ] **Step 2: Create `case-studies/cosmic.js`**

Write the following to `case-studies/cosmic.js`:

```js
/* cosmic.js — star canvas + custom cursor (shared across all case study pages) */

const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let W, H, stars = [], t = 0, mx = 0.5, my = 0.5;

function resize() {
  W = canvas.width  = canvas.offsetWidth;
  H = canvas.height = document.body.scrollHeight;
  stars = [];
  for (let i = 0; i < 260; i++) {
    stars.push({
      x:   Math.random() * W,
      y:   Math.random() * H,
      r:   Math.random() * 1.3 + 0.2,
      a:   Math.random() * 0.85 + 0.1,
      spd: Math.random() * 0.004 + 0.001,
      ph:  Math.random() * Math.PI * 2
    });
  }
}

function aurora(yb, hue, alpha, off) {
  ctx.beginPath();
  for (let i = 0; i <= 14; i++) {
    const x = (i / 14) * W;
    const y = yb
      + Math.sin(i * 0.7  + t * 0.35 + off)       * 55
      + Math.sin(i * 0.28 + t * 0.18 + off * 1.4) * 38
      + Math.sin(mx * 3.5 + i * 0.45)              * 22;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
  ctx.fillStyle = `hsla(${hue},68%,52%,${alpha})`;
  ctx.fill();
}

function frame(ts) {
  t = ts * 0.001;
  ctx.clearRect(0, 0, W, H);
  const yOff = H * 0.28 + window.scrollY * 0.12 + my * H * 0.12;
  aurora(yOff,       268, 0.052, 0);
  aurora(yOff + 65,  242, 0.042, 1.3);
  aurora(yOff + 125, 278, 0.032, 2.6);
  aurora(yOff + 35,  178, 0.026, 0.9);
  for (const s of stars) {
    const p = Math.sin(ts * s.spd + s.ph) * 0.38 + 0.62;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(240,236,255,${s.a * p * 0.8})`;
    ctx.fill();
  }
  requestAnimationFrame(frame);
}

/* Custom cursor + trail */
const cur = document.getElementById('cur');
const trailPool = [];
for (let i = 0; i < 18; i++) {
  const d = document.createElement('div');
  d.className = 'trail-dot';
  document.body.appendChild(d);
  trailPool.push(d);
}
let trailPos = [];

window.addEventListener('mousemove', e => {
  mx = e.clientX / window.innerWidth;
  my = e.clientY / window.innerHeight;
  cur.style.left = e.clientX + 'px';
  cur.style.top  = e.clientY + 'px';
  trailPos.unshift({ x: e.clientX, y: e.clientY });
  if (trailPos.length > 18) trailPos.pop();
  trailPool.forEach((d, i) => {
    const p = trailPos[i];
    if (p) {
      d.style.left    = p.x + 'px';
      d.style.top     = p.y + 'px';
      d.style.opacity = (1 - i / 18) * 0.55;
    } else {
      d.style.opacity = '0';
    }
  });
});

/* Cursor scale on hover — applies to links, buttons, work grid images */
document.querySelectorAll('a, button, .cs-work-img').forEach(el => {
  el.addEventListener('mouseenter', () => cur.classList.add('hovering'));
  el.addEventListener('mouseleave', () => cur.classList.remove('hovering'));
});

/* Recalculate canvas height on resize AND after images finish loading */
window.addEventListener('resize', resize);
window.addEventListener('load', resize);
resize();
requestAnimationFrame(frame);
```

- [ ] **Step 3: Commit**

```bash
git add case-studies/
git commit -m "feat: add cosmic.js and images placeholder folder"
```

---

## Task 2: Create `case-study.css`

**Files:**
- Create: `case-studies/case-study.css`

- [ ] **Step 1: Create `case-studies/case-study.css`**

Write the following to `case-studies/case-study.css`:

```css
/* ── RESET + TOKENS ── */
* { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --void: #04051a;
  --solstice: #6b3fa0;
  --lumina: #c4a8ff;
  --gold: #d4a847;
  --iris: #8de8d8;
  --stardust: #f0ecff;
  --muted: #7a6e9a;
  --border: rgba(196,168,255,0.13);
}

html { scroll-behavior: smooth; }

body {
  background: var(--void);
  color: var(--stardust);
  font-family: Georgia, serif;
  overflow-x: hidden;
  cursor: none;
}

/* ── CURSOR ── */
.cursor {
  position: fixed;
  width: 18px; height: 18px;
  border-radius: 50%;
  background: rgba(196,168,255,0.75);
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%,-50%);
  mix-blend-mode: screen;
  transition: transform .15s;
}
.cursor.hovering { transform: translate(-50%,-50%) scale(2.2); }
.trail-dot {
  position: fixed;
  width: 3px; height: 3px;
  border-radius: 50%;
  background: rgba(196,168,255,0.45);
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%,-50%);
}

/* ── CANVAS ── */
#bgCanvas {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 0;
  pointer-events: none;
}

/* ── NAV ── */
nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  padding: 1.4rem 4rem;
  background: rgba(4,5,26,0.88);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--border);
}
.nav-inner {
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-logo {
  font-size: 1.05rem;
  font-weight: 300;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--stardust);
  text-decoration: none;
}
.nav-logo span { color: var(--lumina); }
.nav-links {
  display: flex;
  gap: 2.5rem;
  list-style: none;
}
.nav-links a {
  font-size: .7rem;
  letter-spacing: .28em;
  text-transform: uppercase;
  color: var(--muted);
  text-decoration: none;
  font-family: sans-serif;
  transition: color .2s;
  position: relative;
}
.nav-links a:hover { color: var(--lumina); }
/* Active state — distinct from hover via ::after dot */
.nav-links a.active { color: var(--lumina); }
.nav-links a.active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px; height: 4px;
  border-radius: 50%;
  background: var(--lumina);
}
.nav-cta {
  padding: .55rem 1.4rem;
  border: 1px solid rgba(196,168,255,.35);
  border-radius: 30px;
  font-size: .68rem;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--lumina);
  background: transparent;
  cursor: pointer;
  font-family: sans-serif;
  transition: background .2s, transform .15s;
}
.nav-cta:hover { background: rgba(196,168,255,.09); transform: translateY(-1px); }

/* ── SHARED TYPOGRAPHY ── */
.sec-eyebrow {
  font-size: .63rem;
  letter-spacing: .4em;
  text-transform: uppercase;
  color: var(--muted);
  font-family: sans-serif;
  margin-bottom: 1rem;
}
.sec-body {
  font-size: .93rem;
  color: var(--muted);
  line-height: 1.85;
  font-family: sans-serif;
  font-weight: 300;
}
.divider { border: none; border-top: 1px solid var(--border); margin: 2rem 0; }

/* .case-tag resting state (matches index.html) */
.case-tag {
  font-size: .58rem;
  letter-spacing: .18em;
  text-transform: uppercase;
  padding: .22rem .65rem;
  border: 1px solid var(--border);
  border-radius: 20px;
  color: var(--muted);
  font-family: sans-serif;
  transition: color .2s, border-color .2s;
  display: inline-block;
}
/* Hover — new rule in case-study.css only; index.html's .case-tag is not modified */
.case-tag:hover {
  color: var(--lumina);
  border-color: rgba(196,168,255,.4);
}

/* ── PAGE LAYOUT ── */
.cs-page {
  position: relative;
  z-index: 1;
  padding-top: 6rem;
  min-height: 100vh;
}
.cs-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 3rem 6rem;
  display: flex;
  gap: 4rem;
  align-items: flex-start;
}

/* ── SIDEBAR ── */
.cs-sidebar {
  width: 240px;
  flex-shrink: 0;
  position: sticky;
  top: 6rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.cs-sidebar-back {
  font-size: .66rem;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: var(--muted);
  text-decoration: none;
  font-family: sans-serif;
  transition: color .2s;
  margin-bottom: .3rem;
  display: inline-block;
}
.cs-sidebar-back:hover { color: var(--lumina); }

/* Sidebar meta blocks — reuse .skill-card visual treatment from index.html */
.skill-card {
  padding: 1.1rem 1.2rem;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: rgba(255,255,255,.02);
  transition: border-color .3s, background .3s;
}
.skill-card:hover {
  border-color: rgba(196,168,255,.35);
  background: rgba(107,63,160,.12);
}
.skill-card-title {
  font-size: .65rem;
  letter-spacing: .28em;
  text-transform: uppercase;
  color: var(--lumina);
  font-family: sans-serif;
  margin-bottom: .5rem;
}
.skill-card-body {
  font-size: .78rem;
  color: var(--muted);
  line-height: 1.6;
  font-family: sans-serif;
}

/* ── MAIN COLUMN ── */
.cs-main { flex: 1; min-width: 0; }

.cs-title {
  font-size: clamp(1.8rem, 3.5vw, 3rem);
  font-weight: 200;
  letter-spacing: .06em;
  color: var(--stardust);
  line-height: 1.15;
  margin-bottom: .8rem;
}
.cs-tags {
  display: flex;
  gap: .45rem;
  flex-wrap: wrap;
  margin-bottom: .5rem;
}

/* ── HERO IMAGE ── */
.cs-hero {
  width: 100%;
  height: clamp(220px, 40vh, 420px);
  border-radius: 12px;
  border: 1px solid var(--border);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
  font-size: .65rem;
  letter-spacing: .25em;
  color: var(--muted);
  text-transform: uppercase;
  transition: box-shadow .3s, border-color .3s;
  background-size: cover;
  background-position: center;
}
.cs-hero:hover {
  box-shadow: 0 0 32px rgba(196,168,255,.28);
  border-color: rgba(196,168,255,.3);
}

/* ── SECTIONS ── */
.cs-section { margin-top: 2.5rem; }

/* ── BRAND COLORS ── */
.cs-colors { display: flex; gap: .75rem; flex-wrap: wrap; }
.cs-swatch-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .4rem;
  flex: 1;
  min-width: 60px;
}
.cs-swatch {
  width: 100%;
  height: 32px;
  border-radius: 8px;
  border: 1px solid rgba(196,168,255,.25);
}
.cs-swatch-hex {
  font-size: .63rem;
  letter-spacing: .15em;
  color: var(--muted);
  font-family: sans-serif;
  text-align: center;
}

/* ── WORK GRID ── */
.cs-work-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.cs-work-img {
  border-radius: 10px;
  border: 1px solid var(--border);
  overflow: hidden;
  aspect-ratio: 4/3;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
  font-size: .6rem;
  letter-spacing: .2em;
  color: var(--muted);
  text-transform: uppercase;
  transition: transform .2s, border-color .2s;
  background-size: cover;
  background-position: center;
}
.cs-work-img:hover {
  transform: translateY(-3px);
  border-color: rgba(196,168,255,.3);
}

/* ── CASE NAVIGATION ── */
.cs-case-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
}
.cs-nav-link {
  font-size: .66rem;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: var(--muted);
  text-decoration: none;
  font-family: sans-serif;
  transition: color .2s;
  display: inline-flex;
  align-items: center;
  gap: .4rem;
}
.cs-nav-link:hover { color: var(--lumina); }
.cs-nav-arrow { transition: transform .2s; display: inline-block; }
.cs-nav-link.next:hover .cs-nav-arrow { transform: translateX(4px); }
.cs-nav-link.prev:hover .cs-nav-arrow { transform: translateX(-4px); }

/* ── RESPONSIVE: below 900px — sidebar becomes horizontal meta strip ── */
@media (max-width: 900px) {
  .cs-inner { flex-direction: column; gap: 2rem; padding: 2rem 2rem 5rem; }
  .cs-sidebar {
    width: 100%;
    position: static;
    flex-direction: row;
    flex-wrap: wrap;
    gap: .6rem;
  }
  .cs-sidebar-back { width: 100%; margin-bottom: 0; }
  .skill-card { flex: 1; min-width: 120px; padding: .7rem .9rem; }
}

/* ── MOBILE: below 768px — hide nav links, restore system cursor ── */
@media (max-width: 768px) {
  nav { padding: 1.2rem 1.5rem; }
  .nav-links { display: none; }
  .cs-inner { padding: 2rem 1.5rem 4rem; }
  .cs-work-grid { grid-template-columns: 1fr; }
  body { cursor: auto; }
  .cursor, .trail-dot { display: none; }
}
```

- [ ] **Step 2: Verify CSS loads correctly**

Open `case-studies/mind-heart-finance.html` in a browser (you'll create this next — skip for now; come back to verify after Task 3).

- [ ] **Step 3: Commit**

```bash
git add case-studies/case-study.css
git commit -m "feat: add shared case-study.css"
```

---

## Task 3: Build `mind-heart-finance.html`

**Files:**
- Create: `case-studies/mind-heart-finance.html`

- [ ] **Step 1: Create `case-studies/mind-heart-finance.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mind Heart Finance — Celina Vetsch</title>
  <link rel="stylesheet" href="case-study.css">
</head>
<body>

<div class="cursor" id="cur"></div>
<canvas id="bgCanvas"></canvas>

<nav>
  <div class="nav-inner">
    <a class="nav-logo" href="/">Solstice <span>Illumina</span></a>
    <ul class="nav-links">
      <li><a href="/#portfolio">Work</a></li>
      <li><a href="/#cases" class="active">Case Studies</a></li>
      <li><a href="/#about">About</a></li>
      <li><a href="/#contact">Contact</a></li>
    </ul>
    <button class="nav-cta" onclick="window.location.href='/#contact'">Let's Talk</button>
  </div>
</nav>

<main class="cs-page">
  <div class="cs-inner">

    <aside class="cs-sidebar">
      <a class="cs-sidebar-back" href="/#cases">← Case Studies</a>
      <div class="skill-card">
        <div class="skill-card-title">Scope</div>
        <div class="skill-card-body">Brand Strategy, Logo, Social Content</div>
      </div>
      <div class="skill-card">
        <div class="skill-card-title">Year</div>
        <div class="skill-card-body">2024</div>
      </div>
      <div class="skill-card">
        <div class="skill-card-title">Deliverable</div>
        <div class="skill-card-body">Full brand kit — logo, colors, social content templates</div>
      </div>
    </aside>

    <article class="cs-main">
      <p class="sec-eyebrow">Case Study 01</p>
      <h1 class="cs-title">Building a full brand identity for Mind Heart Finance</h1>
      <div class="cs-tags">
        <span class="case-tag">Brand Strategy</span>
        <span class="case-tag">Logo</span>
        <span class="case-tag">Social Content</span>
      </div>

      <hr class="divider">

      <!--
        HERO IMAGE SLOT
        Suggested: brand system overview / logo on brand-colored background
        To activate: replace the style attribute with:
          style="background-image: url('images/mhf-hero.jpg')"
        and remove the placeholder text inside the div
      -->
      <div class="cs-hero" style="background: linear-gradient(135deg,#0d1a38,#1a2d58);">
        Add hero image — images/mhf-hero.jpg
      </div>

      <hr class="divider">

      <div class="cs-section">
        <p class="sec-eyebrow">The Brief</p>
        <p class="sec-body">A finance consulting brand needed a full identity that builds trust while staying approachable — logo, color palette, and Instagram content designed to attract and educate clients.</p>
      </div>

      <div class="cs-section">
        <p class="sec-eyebrow">Brand Colors</p>
        <div class="cs-colors">
          <div class="cs-swatch-wrap">
            <div class="cs-swatch" style="background:#4a90d9;"></div>
            <span class="cs-swatch-hex">#4a90d9</span>
          </div>
          <div class="cs-swatch-wrap">
            <div class="cs-swatch" style="background:#5a9e6f;"></div>
            <span class="cs-swatch-hex">#5a9e6f</span>
          </div>
          <div class="cs-swatch-wrap">
            <div class="cs-swatch" style="background:#e8855a;"></div>
            <span class="cs-swatch-hex">#e8855a</span>
          </div>
          <div class="cs-swatch-wrap">
            <div class="cs-swatch" style="background:#f5f0e8;"></div>
            <span class="cs-swatch-hex">#f5f0e8</span>
          </div>
        </div>
      </div>

      <div class="cs-section">
        <p class="sec-eyebrow">Work</p>
        <div class="cs-work-grid">
          <!--
            IMAGE SLOT: Logo lockup
            To activate: replace style with background-image: url('images/mhf-logo.jpg')
          -->
          <div class="cs-work-img" style="background: linear-gradient(135deg,#1a0e38,#2a1a58);">
            Logo lockup — images/mhf-logo.jpg
          </div>
          <!--
            IMAGE SLOT: Instagram post example
            To activate: replace style with background-image: url('images/mhf-social.jpg')
          -->
          <div class="cs-work-img" style="background: linear-gradient(135deg,#0a1a28,#0d2a40);">
            Instagram post — images/mhf-social.jpg
          </div>
        </div>
      </div>

      <div class="cs-section">
        <p class="sec-eyebrow">What I Learned</p>
        <p class="sec-body">Designing for the finance space requires balancing authority with approachability — every color and type choice signals credibility to the client's audience. [Personalise with a specific design decision you made.]</p>
      </div>

      <nav class="cs-case-nav">
        <!-- No prev on first case — left side intentionally absent -->
        <a class="cs-nav-link next" href="by-vanessa.html" style="margin-left:auto;">
          Next case <span class="cs-nav-arrow">→</span>
        </a>
      </nav>
    </article>

  </div>
</main>

<script src="cosmic.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

Open `case-studies/mind-heart-finance.html` directly in your browser. Check:
- Stars and aurora render in the background
- Custom purple cursor and trail follow mouse movement
- Fixed nav shows with "Case Studies" active (lumina colour + dot below)
- Sidebar shows: ← Case Studies / Scope / Year / Deliverable cards
- Sidebar cards glow on hover (no slide)
- Hero placeholder renders at correct height
- Hero glows on hover
- Brand color swatches + hex labels display
- Work grid shows two placeholder cells that lift on hover
- "Next case →" appears right-aligned; arrow shifts on hover
- Resize window below 900px: sidebar becomes horizontal strip
- Resize below 768px: nav links hidden, system cursor restored

- [ ] **Step 3: Commit**

```bash
git add case-studies/mind-heart-finance.html
git commit -m "feat: add Mind Heart Finance case study page"
```

---

## Task 4: Build `by-vanessa.html`

**Files:**
- Create: `case-studies/by-vanessa.html`

- [ ] **Step 1: Create `case-studies/by-vanessa.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>By Vanessa — Celina Vetsch</title>
  <link rel="stylesheet" href="case-study.css">
</head>
<body>

<div class="cursor" id="cur"></div>
<canvas id="bgCanvas"></canvas>

<nav>
  <div class="nav-inner">
    <a class="nav-logo" href="/">Solstice <span>Illumina</span></a>
    <ul class="nav-links">
      <li><a href="/#portfolio">Work</a></li>
      <li><a href="/#cases" class="active">Case Studies</a></li>
      <li><a href="/#about">About</a></li>
      <li><a href="/#contact">Contact</a></li>
    </ul>
    <button class="nav-cta" onclick="window.location.href='/#contact'">Let's Talk</button>
  </div>
</nav>

<main class="cs-page">
  <div class="cs-inner">

    <aside class="cs-sidebar">
      <a class="cs-sidebar-back" href="/#cases">← Case Studies</a>
      <div class="skill-card">
        <div class="skill-card-title">Scope</div>
        <div class="skill-card-body">Identity, Instagram, Content Pillars</div>
      </div>
      <div class="skill-card">
        <div class="skill-card-title">Year</div>
        <div class="skill-card-body">2024</div>
      </div>
      <div class="skill-card">
        <div class="skill-card-title">Deliverable</div>
        <div class="skill-card-body">Brand identity system + Instagram content pillars</div>
      </div>
    </aside>

    <article class="cs-main">
      <p class="sec-eyebrow">Case Study 02</p>
      <h1 class="cs-title">By Vanessa — branding a wellness &amp; nutrition coach</h1>
      <div class="cs-tags">
        <span class="case-tag">Identity</span>
        <span class="case-tag">Instagram</span>
        <span class="case-tag">Content Pillars</span>
      </div>

      <hr class="divider">

      <!--
        HERO IMAGE SLOT
        Suggested: logo + brand palette overview / best Instagram post mockup
        To activate: replace style with background-image: url('images/vanessa-hero.jpg')
      -->
      <div class="cs-hero" style="background: linear-gradient(135deg,#0a1a0d,#142a18);">
        Add hero image — images/vanessa-hero.jpg
      </div>

      <hr class="divider">

      <div class="cs-section">
        <p class="sec-eyebrow">The Brief</p>
        <p class="sec-body">A wellness and nutrition coach needed a brand that felt natural, warm, and growth-oriented — approachable for everyday clients while still feeling credible and professional. The tagline "Energie im Wachstum" (Energy in Growth) anchored the identity direction.</p>
      </div>

      <div class="cs-section">
        <p class="sec-eyebrow">Brand Colors</p>
        <div class="cs-colors">
          <div class="cs-swatch-wrap">
            <div class="cs-swatch" style="background:#8fa882;"></div>
            <span class="cs-swatch-hex">#8fa882</span>
          </div>
          <div class="cs-swatch-wrap">
            <div class="cs-swatch" style="background:#e8e4d9;"></div>
            <span class="cs-swatch-hex">#e8e4d9</span>
          </div>
          <div class="cs-swatch-wrap">
            <div class="cs-swatch" style="background:#2d3a2e;"></div>
            <span class="cs-swatch-hex">#2d3a2e</span>
          </div>
        </div>
      </div>

      <div class="cs-section">
        <p class="sec-eyebrow">Work</p>
        <div class="cs-work-grid">
          <!--
            IMAGE SLOT: Logo (tree / "By Vanessa — Energie im Wachstum")
            To activate: replace style with background-image: url('images/vanessa-logo.jpg')
          -->
          <div class="cs-work-img" style="background: linear-gradient(135deg,#0a1a0d,#1a2e1a);">
            Logo — images/vanessa-logo.jpg
          </div>
          <!--
            IMAGE SLOT: Instagram nutrition post
            To activate: replace style with background-image: url('images/vanessa-social.jpg')
          -->
          <div class="cs-work-img" style="background: linear-gradient(135deg,#121a0e,#1e2e14);">
            Instagram post — images/vanessa-social.jpg
          </div>
        </div>
      </div>

      <div class="cs-section">
        <p class="sec-eyebrow">What I Learned</p>
        <p class="sec-body">Wellness brands live and die by consistency — the content pillars were as important as the visual identity itself.</p>
      </div>

      <nav class="cs-case-nav">
        <a class="cs-nav-link prev" href="mind-heart-finance.html">
          <span class="cs-nav-arrow">←</span> Mind Heart Finance
        </a>
        <a class="cs-nav-link next" href="nextra.html">
          Next case <span class="cs-nav-arrow">→</span>
        </a>
      </nav>
    </article>

  </div>
</main>

<script src="cosmic.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

Open `case-studies/by-vanessa.html`. Check:
- "Case Study 02" eyebrow
- Both ← prev and → next case nav links are visible and work
- Sage / cream / dark green swatches all readable (cream and dark green both have the border)
- All hover effects match Task 3

- [ ] **Step 3: Commit**

```bash
git add case-studies/by-vanessa.html
git commit -m "feat: add By Vanessa case study page"
```

---

## Task 5: Build `nextra.html`

**Files:**
- Create: `case-studies/nextra.html`

- [ ] **Step 1: Create `case-studies/nextra.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NEXTRA — Celina Vetsch</title>
  <link rel="stylesheet" href="case-study.css">
</head>
<body>

<div class="cursor" id="cur"></div>
<canvas id="bgCanvas"></canvas>

<nav>
  <div class="nav-inner">
    <a class="nav-logo" href="/">Solstice <span>Illumina</span></a>
    <ul class="nav-links">
      <li><a href="/#portfolio">Work</a></li>
      <li><a href="/#cases" class="active">Case Studies</a></li>
      <li><a href="/#about">About</a></li>
      <li><a href="/#contact">Contact</a></li>
    </ul>
    <button class="nav-cta" onclick="window.location.href='/#contact'">Let's Talk</button>
  </div>
</nav>

<main class="cs-page">
  <div class="cs-inner">

    <aside class="cs-sidebar">
      <a class="cs-sidebar-back" href="/#cases">← Case Studies</a>
      <div class="skill-card">
        <div class="skill-card-title">Scope</div>
        <div class="skill-card-body">Product card, print layout</div>
      </div>
      <div class="skill-card">
        <div class="skill-card-title">Year</div>
        <div class="skill-card-body">2024</div>
      </div>
      <div class="skill-card">
        <div class="skill-card-title">Deliverable</div>
        <div class="skill-card-body">Print-ready product information card (digital + print)</div>
      </div>
    </aside>

    <article class="cs-main">
      <p class="sec-eyebrow">Case Study 03</p>
      <h1 class="cs-title">NEXTRA — translating a product into a one-page visual story</h1>
      <div class="cs-tags">
        <span class="case-tag">Product Design</span>
        <span class="case-tag">Print</span>
        <span class="case-tag">Layout</span>
      </div>

      <hr class="divider">

      <!--
        HERO IMAGE SLOT
        Suggested: full product card at a slight angle on dark background
        To activate: replace style with background-image: url('images/nextra-hero.jpg')
      -->
      <div class="cs-hero" style="background: linear-gradient(135deg,#1a1208,#2a200e);">
        Add hero image — images/nextra-hero.jpg
      </div>

      <hr class="divider">

      <div class="cs-section">
        <p class="sec-eyebrow">The Brief</p>
        <p class="sec-body">NEXTRA is a handmade neck protection scarf. The product card needed to explain its features and use cases quickly using icons and clean layout, for both print and digital distribution.</p>
      </div>

      <div class="cs-section">
        <p class="sec-eyebrow">Brand Colors</p>
        <div class="cs-colors">
          <div class="cs-swatch-wrap">
            <div class="cs-swatch" style="background:#ffffff;"></div>
            <span class="cs-swatch-hex">#ffffff</span>
          </div>
          <div class="cs-swatch-wrap">
            <div class="cs-swatch" style="background:#f5f0e8;"></div>
            <span class="cs-swatch-hex">#f5f0e8</span>
          </div>
          <div class="cs-swatch-wrap">
            <!-- near-black swatch — border ensures visibility on --void -->
            <div class="cs-swatch" style="background:#2a2a2a;"></div>
            <span class="cs-swatch-hex">#2a2a2a</span>
          </div>
        </div>
      </div>

      <div class="cs-section">
        <p class="sec-eyebrow">Work</p>
        <div class="cs-work-grid">
          <!--
            IMAGE SLOT: Product card front
            To activate: replace style with background-image: url('images/nextra-card.jpg')
          -->
          <div class="cs-work-img" style="background: linear-gradient(135deg,#1a1208,#2e2210);">
            Product card — images/nextra-card.jpg
          </div>
          <!--
            IMAGE SLOT: Icon detail / close-up of layout
            To activate: replace style with background-image: url('images/nextra-detail.jpg')
          -->
          <div class="cs-work-img" style="background: linear-gradient(135deg,#12100a,#201c10);">
            Icon detail — images/nextra-detail.jpg
          </div>
        </div>
      </div>

      <div class="cs-section">
        <p class="sec-eyebrow">What I Learned</p>
        <p class="sec-body">Information hierarchy in print is unforgiving — icons and layout do more work than words when a customer has seconds to decide.</p>
      </div>

      <nav class="cs-case-nav">
        <a class="cs-nav-link prev" href="by-vanessa.html">
          <span class="cs-nav-arrow">←</span> By Vanessa
        </a>
        <a class="cs-nav-link next" href="bali-invest.html">
          Next case <span class="cs-nav-arrow">→</span>
        </a>
      </nav>
    </article>

  </div>
</main>

<script src="cosmic.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

Open `case-studies/nextra.html`. Check:
- "Case Study 03" eyebrow
- All three NEXTRA swatches are visible — especially the near-black `#2a2a2a` swatch which must show the border
- Both prev and next case nav links work correctly

- [ ] **Step 3: Commit**

```bash
git add case-studies/nextra.html
git commit -m "feat: add NEXTRA case study page"
```

---

## Task 6: Build `bali-invest.html`

**Files:**
- Create: `case-studies/bali-invest.html`

- [ ] **Step 1: Create `case-studies/bali-invest.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bali Invest — Celina Vetsch</title>
  <link rel="stylesheet" href="case-study.css">
</head>
<body>

<div class="cursor" id="cur"></div>
<canvas id="bgCanvas"></canvas>

<nav>
  <div class="nav-inner">
    <a class="nav-logo" href="/">Solstice <span>Illumina</span></a>
    <ul class="nav-links">
      <li><a href="/#portfolio">Work</a></li>
      <li><a href="/#cases" class="active">Case Studies</a></li>
      <li><a href="/#about">About</a></li>
      <li><a href="/#contact">Contact</a></li>
    </ul>
    <button class="nav-cta" onclick="window.location.href='/#contact'">Let's Talk</button>
  </div>
</nav>

<main class="cs-page">
  <div class="cs-inner">

    <aside class="cs-sidebar">
      <a class="cs-sidebar-back" href="/#cases">← Case Studies</a>
      <div class="skill-card">
        <div class="skill-card-title">Scope</div>
        <div class="skill-card-body">Event graphic, information design, social media</div>
      </div>
      <div class="skill-card">
        <div class="skill-card-title">Year</div>
        <div class="skill-card-body">2024</div>
      </div>
      <div class="skill-card">
        <div class="skill-card-title">Deliverable</div>
        <div class="skill-card-body">Event promotion graphic deployed across Instagram and digital screens</div>
      </div>
    </aside>

    <article class="cs-main">
      <p class="sec-eyebrow">Case Study 04</p>
      <h1 class="cs-title">Bali Invest — designing an event graphic that does everything at once</h1>
      <div class="cs-tags">
        <span class="case-tag">Event Graphic</span>
        <span class="case-tag">Information Design</span>
        <span class="case-tag">Social</span>
      </div>

      <hr class="divider">

      <!--
        HERO IMAGE SLOT
        Suggested: full event graphic at high resolution
        To activate: replace style with background-image: url('images/bali-hero.jpg')
      -->
      <div class="cs-hero" style="background: linear-gradient(135deg,#0a1a10,#1a2e18);">
        Add hero image — images/bali-hero.jpg
      </div>

      <hr class="divider">

      <div class="cs-section">
        <p class="sec-eyebrow">The Brief</p>
        <p class="sec-body">A full-day investment event at Segara Seaside Resort in Bali needed one graphic that communicated venue, schedule, and brand — compressed into a single social-ready visual.</p>
      </div>

      <div class="cs-section">
        <p class="sec-eyebrow">Brand Colors</p>
        <div class="cs-colors">
          <div class="cs-swatch-wrap">
            <div class="cs-swatch" style="background:#c9a84c;"></div>
            <span class="cs-swatch-hex">#c9a84c</span>
          </div>
          <div class="cs-swatch-wrap">
            <div class="cs-swatch" style="background:#1a3a2a;"></div>
            <span class="cs-swatch-hex">#1a3a2a</span>
          </div>
          <div class="cs-swatch-wrap">
            <!-- white swatch — border ensures visibility on --void -->
            <div class="cs-swatch" style="background:#ffffff;"></div>
            <span class="cs-swatch-hex">#ffffff</span>
          </div>
        </div>
      </div>

      <div class="cs-section">
        <p class="sec-eyebrow">Work</p>
        <div class="cs-work-grid">
          <!--
            IMAGE SLOT: Full event graphic with schedule
            To activate: replace style with background-image: url('images/bali-graphic.jpg')
          -->
          <div class="cs-work-img" style="background: linear-gradient(135deg,#0a1a10,#162a1a);">
            Event graphic — images/bali-graphic.jpg
          </div>
          <!--
            IMAGE SLOT: Detail crop showing schedule / information layout
            To activate: replace style with background-image: url('images/bali-detail.jpg')
          -->
          <div class="cs-work-img" style="background: linear-gradient(135deg,#0e1a08,#1a2a10);">
            Detail crop — images/bali-detail.jpg
          </div>
        </div>
      </div>

      <div class="cs-section">
        <p class="sec-eyebrow">What I Learned</p>
        <p class="sec-body">Event graphics are information design problems first — the visual style only works if the hierarchy is airtight.</p>
      </div>

      <nav class="cs-case-nav">
        <a class="cs-nav-link prev" href="nextra.html">
          <span class="cs-nav-arrow">←</span> NEXTRA
        </a>
        <!-- Last case — right side links back to all case studies -->
        <a class="cs-nav-link next" href="/#cases">
          Back to all case studies <span class="cs-nav-arrow">→</span>
        </a>
      </nav>
    </article>

  </div>
</main>

<script src="cosmic.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

Open `case-studies/bali-invest.html`. Check:
- "Case Study 04" eyebrow
- Gold / deep green / white swatches all readable (white and dark green both have the border)
- Right case nav reads "Back to all case studies →" and links to `/#cases`
- Left case nav reads "← NEXTRA" and links to `nextra.html`

- [ ] **Step 3: Commit**

```bash
git add case-studies/bali-invest.html
git commit -m "feat: add Bali Invest case study page"
```

---

## Task 7: Final cross-page verification and push

**Files:** None (verification and push only)

- [ ] **Step 1: Verify case study links from homepage**

Open `index.html` in your browser. Scroll to the Case Studies section. Click each case study row:
- Row 1 → opens `case-studies/mind-heart-finance.html` ✓
- Row 2 → opens `case-studies/by-vanessa.html` ✓
- Row 3 → opens `case-studies/nextra.html` ✓
- Row 4 → opens `case-studies/bali-invest.html` ✓

- [ ] **Step 2: Verify full navigation chain**

Navigate the full prev/next chain in both directions:
- MHF → By Vanessa → NEXTRA → Bali Invest (→ back to cases)
- Bali Invest → NEXTRA → By Vanessa → MHF (no prev link on first)

- [ ] **Step 3: Verify responsive at 900px and 768px**

On any case study page, open browser dev tools, set width to 900px:
- Sidebar becomes horizontal strip of chips across the top

Set width to 768px:
- Nav links disappear
- Work grid becomes single column
- System cursor is restored

- [ ] **Step 4: Push to GitHub (triggers Vercel deploy)**

```bash
git push
```

- [ ] **Step 5: Confirm Vercel deployed successfully**

Check your Vercel dashboard — a new deployment should appear within ~30 seconds. Visit the live URL and click through all four case study pages to confirm they load correctly on Vercel (not just locally).
