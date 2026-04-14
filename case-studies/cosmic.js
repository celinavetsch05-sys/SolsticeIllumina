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
