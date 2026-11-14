/* The machinery. The words and films live in content.js. */

const REELS = SITE.reels;
const EDITING = () => document.documentElement.classList.contains('editing');
const pathOf = new WeakMap();
REELS.forEach((r, ri) => r.items.forEach((it, ii) => pathOf.set(it, `reels.${ri}.items.${ii}`)));


const $ = (s, el = document) => el.querySelector(s);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const esc = s => s.replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
const calm = matchMedia('(prefers-reduced-motion: reduce)');
const ASPECT = 2.39;
const first = it => typeof it.v === 'string' ? it.v : it.v ? it.v[0][0] : null;
const count = it => Array.isArray(it.v) ? `${it.v.length} ${it.unit}` : it.photos ? `${it.photos.length} photos` : '';

/* ---------- navigation ---------- */
const NAV = [...REELS.map(r => [r.id, r.title]), ['work', SITE.work.title], ['about', SITE.about.title]];
$('#nav').innerHTML = NAV.map(([id, t]) => `<a href="#${id}">${esc(t)}</a>`).join('');
const menuBtn = $('.menu-btn');
const setMenu = open => { document.body.classList.toggle('menu-open', open); menuBtn.setAttribute('aria-expanded', open); menuBtn.textContent = open ? 'Close' : 'Menu'; };
menuBtn.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
$('#nav').addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

/* ---------- words that sit in the page itself ---------- */
const put = (sel, path, val) => { const el = $(sel); el.textContent = val; if (path) el.dataset.edit = path; else delete el.dataset.edit; };
const mailto = `mailto:${SITE.about.email}`;
document.querySelector('.mark').textContent = SITE.hero.name;
put('.name', 'hero.name', SITE.hero.name);
put('.hero-pitch', 'hero.pitch', SITE.hero.pitch);
put('.hero-detail', 'hero.detail', SITE.hero.detail);
put('.avail', 'hero.available', SITE.hero.available);
put('#hero-mail', 'hero.button', SITE.hero.button); $('#hero-mail').href = mailto;
put('#work h2', 'work.title', SITE.work.title);
put('#work .reel-head p', 'work.lede', SITE.work.lede);
$('.services').innerHTML = SITE.work.services.map((x, i) => `<li><b data-edit="work.services.${i}.t">${esc(x.t)}</b><span data-edit="work.services.${i}.d">${esc(x.d)}</span></li>`).join('');
put('#work-mail', 'work.button', SITE.work.button); $('#work-mail').href = mailto;
put('#about h2', 'about.title', SITE.about.title);
$('.about-text').innerHTML = SITE.about.paragraphs.map((p, i) => `<p data-edit="about.paragraphs.${i}">${esc(p)}</p>`).join('');
$('.contact').innerHTML =
  `<a href="${esc(mailto)}"><span>Email</span><b data-edit="about.email">${esc(SITE.about.email)}</b></a>` +
  `<a href="https://instagram.com/${esc(SITE.about.instagram.replace(/^@/, ''))}" rel="noopener"><span>Instagram</span><b data-edit="about.instagram">${esc(SITE.about.instagram)}</b></a>` +
  (SITE.about.vimeo ? `<a href="https://vimeo.com/${esc(SITE.about.vimeo.replace(/^@/, ''))}" rel="noopener"><span>Vimeo</span><b data-edit="about.vimeo">${esc(SITE.about.vimeo)}</b></a>` : '');

/* ---------- thumbnails ---------- */
function thumb(img, id) {
  const sizes = ['maxresdefault', 'hqdefault'];
  let i = 0;
  const go = () => { img.src = `https://i.ytimg.com/vi/${id}/${sizes[i]}.jpg`; };
  img.onload = () => {
    if (img.naturalWidth < 200 && i < sizes.length - 1) { i++; go(); return; }
    img.classList.add('ok');
  };
  img.onerror = () => { if (i < sizes.length - 1) { i++; go(); } };
  go();
}

/* ---------- the strip: one reel of film pulled through the lens ---------- */
const strips = [];

function Strip(reel, section) {
  const el = $('.strip', section), info = $('.info-in', section), flare = $('.flare', el);
  const frames = [...el.querySelectorAll('.frame')];
  const n = frames.length;
  let p = 0, target = 0, W = 0, Wo = 0, H = 0, s = 0, gap = 2, raf = 0, last = 0, cur = -1, glow = 0;
  let ptype = 'mouse', drag = null, dragged = false, iw = 0, pad = 20;

  const bump = d => { d = Math.abs(d); return d >= 1 ? 0 : 0.5 + 0.5 * Math.cos(Math.PI * d); };

  function measure() {
    W = el.clientWidth;
    const small = W < 720;
    gap = small ? 1 : 2;
    const minSliver = small ? 5 : 14;
    Wo = Math.min(W * (small ? 0.8 : 0.56), innerHeight * 0.62 * ASPECT, W - gap * (n - 1) - minSliver * (n - 1));
    H = Wo / ASPECT;
    s = (W - gap * (n - 1) - Wo) / (n - 1);
    el.style.height = H + 'px';
    frames.forEach(f => { f.style.width = Wo + 'px'; f.style.height = H + 'px'; });
    flare.style.height = H + 'px';
    pad = parseFloat(getComputedStyle($('.reel-head', section)).paddingLeft) || 20;
    /* reserve room for the longest description so the page never jumps */
    const keep = cur; let tall = 0; info.parentElement.style.minHeight = '';
    for (cur = 0; cur < n; cur++) { describe(); tall = Math.max(tall, info.parentElement.offsetHeight); }
    info.parentElement.style.minHeight = tall + 'px';
    cur = -1; iw = info.offsetWidth;
    layout();
  }

  function layout() {
    let x = 0, lens = 0, left = 0;
    for (let i = 0; i < n; i++) {
      const b = bump(i - p), w = s + (Wo - s) * b;
      const f = frames[i];
      f.style.transform = `translate3d(${x}px,0,0) scaleX(${w / Wo})`;
      f.firstElementChild.style.opacity = 0.42 + 0.58 * b * b;
      lens += b * (x + w / 2); left += b * x;
      x += w + gap;
    }
    flare.style.transform = `translate3d(${lens - W}px,0,0)`;
    flare.style.opacity = clamp(glow, 0, 1);
    info.style.transform = `translate3d(${clamp(left, pad, Math.max(pad, W - iw - pad))}px,0,0)`;
    const now = clamp(Math.round(p), 0, n - 1);
    if (now !== cur) { cur = now; describe(); }
  }

  function describe() {
    const it = reel.items[cur], at = pathOf.get(it);
    frames.forEach((f, i) => f.setAttribute('aria-current', i === cur));
    info.innerHTML =
      `<h3 data-edit="${at}.t">${esc(it.t)}</h3>` +
      (count(it) ? `<p class="count"${it.unit ? ` data-edit="${at}.unit" data-prefix="${it.v.length} "` : ''}>${count(it)}</p>` : '') +
      (it.d || EDITING() ? `<p class="desc" data-edit="${at}.d">${esc(it.d || '')}</p>` : '') +
      `<div class="acts"><button class="play" type="button">${it.photos ? 'See photos' : Array.isArray(it.v) ? 'Play from the start' : 'Play film'}</button>` +
      `<button class="step" type="button" data-step="-1" ${cur === 0 ? 'disabled' : ''}>Previous</button>` +
      `<button class="step" type="button" data-step="1" ${cur === n - 1 ? 'disabled' : ''}>Next</button>` +
      `<span class="pos">${cur + 1} of ${n}</span></div>`;
  }

  function tick(t) {
    const dt = Math.min(50, t - (last || t)); last = t;
    const before = p;
    p += (target - p) * (calm.matches ? 1 : 1 - Math.exp(-dt / 90));
    const speed = Math.abs(p - before) / Math.max(dt, 1) * 1000;
    glow += ((0.22 + speed * 0.5) - glow) * 0.2;
    if (Math.abs(target - p) < 0.0015) p = target;
    layout();
    if (p !== target || Math.abs(glow - 0.22) > 0.01) raf = requestAnimationFrame(tick);
    else { raf = 0; last = 0; }
  }
  const run = () => { if (!raf) raf = requestAnimationFrame(tick); };
  const go = v => { target = clamp(v, 0, n - 1); run(); };

  const play = i => openPlayer(reel.items[i], 0, frames[i]);

  /* pointer: a mouse sweeps the lens across the strip, a finger drags the film through it */
  el.addEventListener('pointerdown', e => {
    ptype = e.pointerType; dragged = false;
    if (ptype === 'mouse') return;
    drag = {x: e.clientX, y: e.clientY, p0: p, on: false, t: e.timeStamp, lx: e.clientX, v: 0};
  });
  el.addEventListener('pointermove', e => {
    if (e.pointerType === 'mouse') {
      ptype = 'mouse';
      const r = el.getBoundingClientRect();
      go((e.clientX - r.left) / W * n - 0.5);
      return;
    }
    if (!drag) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (!drag.on && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) { drag.on = true; dragged = true; try { el.setPointerCapture(e.pointerId); } catch (_) {} }
    if (drag.on) {
      const dt = Math.max(1, e.timeStamp - drag.t);
      drag.v = drag.v * 0.6 + ((e.clientX - drag.lx) / dt) * 0.4; drag.t = e.timeStamp; drag.lx = e.clientX;
      go(drag.p0 - dx / (Wo * 0.55));
    }
  });
  const endDrag = () => {
    if (drag && drag.on) go(Math.round(target - clamp(drag.v * 0.45, -1.2, 1.2)));
    drag = null;
  };
  el.addEventListener('pointerup', endDrag);
  el.addEventListener('pointercancel', endDrag);
  el.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') go(Math.round(target)); });

  el.addEventListener('click', e => {
    const f = e.target.closest('.frame'); if (!f) return;
    const i = frames.indexOf(f);
    if (dragged) { dragged = false; return; }
    if (e.detail === 0) return play(i);                  // keyboard
    if (ptype === 'mouse') return play(clamp(Math.round(target), 0, n - 1));
    if (i === cur) play(i); else go(i);                  // touch: first tap opens the frame, second plays
  });
  el.addEventListener('focusin', e => {
    const f = e.target.closest('.frame');
    if (f && f.matches(':focus-visible')) go(frames.indexOf(f));
  });
  el.addEventListener('keydown', e => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    const i = clamp(frames.indexOf(document.activeElement) + d, 0, n - 1);
    frames[i].focus(); e.preventDefault();
  });
  info.addEventListener('click', e => {
    if (e.target.closest('.play')) play(cur);
    const st = e.target.closest('.step');
    if (st) { go(Math.round(target) + +st.dataset.step); }
  });

  measure();
  return {measure, redescribe: () => { describe(); iw = info.offsetWidth; }};
}

/* ---------- build the reels ---------- */
$('#reels').innerHTML = REELS.map((r, ri) => `
  <section class="reel" id="${r.id}">
    <header class="reel-head"><h2 data-lens data-edit="reels.${ri}.title">${esc(r.title)}</h2><p data-edit="reels.${ri}.lede">${esc(r.lede)}</p></header>
    <div class="strip" role="group" aria-label="${esc(r.title)}. Use the left and right arrow keys to move between films.">
      ${r.items.map((it, i) => `<button class="frame" type="button" style="--h:${(i * 47 + r.id.length * 31) % 360}" aria-label="${esc(it.t)}${count(it) ? ', ' + count(it) : ''}"><img alt="" decoding="async" ${it.pos ? `style="object-position:${it.pos}"` : ''}></button>`).join('')}
      <div class="flare" aria-hidden="true"></div>
    </div>
    <div class="info"><div class="info-in" aria-live="polite"></div></div>
  </section>`).join('');

REELS.forEach(r => {
  const section = document.getElementById(r.id);
  section.querySelectorAll('.frame img').forEach((img, i) => {
    const it = r.items[i];
    if (it.photos) { img.onload = () => img.classList.add('ok'); img.src = it.photos[0][0]; }
    else thumb(img, first(it));
  });
  strips.push(Strip(r, section));
});

/* ---------- the lens: type desqueezes as it reaches the middle of the screen ---------- */
const lensEls = [...document.querySelectorAll('[data-lens]')];
const nameEl = $('.name');
let intro = calm.matches ? 1 : 0, introStart = 0, lensRaf = 0;
const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

nameEl.innerHTML = `<span>${esc(SITE.hero.name)}</span>`;
function fitName() {
  /* size the name so that, fully desqueezed, it spans the frame */
  const box = nameEl.parentElement, room = box.clientWidth - 2 * parseFloat(getComputedStyle(box).paddingLeft);
  nameEl.style.fontVariationSettings = '"wdth" 150';
  nameEl.style.fontSize = '100px';
  const w = nameEl.firstElementChild.getBoundingClientRect().width;
  nameEl.style.fontSize = Math.min(100 * room / w, innerHeight * 0.4) + 'px';
}

function lens() {
  lensRaf = 0;
  const vh = innerHeight;
  for (const el of lensEls) {
    const r = el.getBoundingClientRect();
    if (r.bottom < -200 || r.top > vh + 200) continue;
    const hero = el.dataset.lens === 'hero';
    const mid = (r.top + r.bottom) / 2;
    let t = 1 - clamp(Math.abs(mid - vh * (hero ? 0.4 : 0.46)) / (vh * (hero ? 0.6 : 0.5)), 0, 1);
    t = t * t * (3 - 2 * t);
    if (hero) t *= ease(intro);
    const max = +el.dataset.max || 150;
    el.style.fontVariationSettings = `"wdth" ${(50 + (max - 50) * t).toFixed(1)}`;
  }
  $('.hero').style.setProperty('--intro', ease(intro));
}
const askLens = () => { if (!lensRaf) lensRaf = requestAnimationFrame(lens); };

function fitHeads() {
  /* cap each heading's widest state so it never overflows a narrow screen */
  for (const el of lensEls) {
    if (el === nameEl) continue;
    const room = el.parentElement.clientWidth - parseFloat(getComputedStyle(el.parentElement).paddingLeft) * 2;
    el.style.fontVariationSettings = '"wdth" 50'; const w0 = el.offsetWidth;
    el.style.fontVariationSettings = '"wdth" 150'; const w1 = el.offsetWidth;
    el.dataset.max = w1 <= room ? 150 : Math.max(55, Math.floor(50 + 100 * (room - w0) / (w1 - w0)));
    el.style.fontVariationSettings = '"wdth" 50';
  }
}

function playIntro(t) {
  if (!introStart) introStart = t;
  intro = clamp((t - introStart - 250) / 1500, 0, 1);
  lens();
  if (intro < 1) requestAnimationFrame(playIntro);
}

function relayout() { fitName(); fitHeads(); strips.forEach(s => s.measure()); lens(); }
addEventListener('scroll', askLens, {passive: true});
let rw = innerWidth;
addEventListener('resize', () => { if (innerWidth !== rw || !('ontouchstart' in window)) { rw = innerWidth; relayout(); } });
relayout();
(document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
  relayout();
  if (!calm.matches) requestAnimationFrame(playIntro);
});

/* hero flare follows the pointer */
const hero = $('.hero');
hero.addEventListener('pointermove', e => {
  const r = hero.getBoundingClientRect();
  hero.style.setProperty('--fx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
});

/* ---------- player ---------- */
const dlg = $('#player'), pVid = $('.p-vid', dlg), pParts = $('.p-parts', dlg);
let playing = null, opener = null;

function showPart(i) {
  const it = playing;
  if (it.photos) {
    pVid.className = 'p-vid photos';
    pVid.innerHTML = it.photos.map(ph => `<img src="${ph[0]}" alt="${esc(ph[1])}">`).join('');
    $('.p-yt', dlg).hidden = true;
    return;
  }
  const id = typeof it.v === 'string' ? it.v : it.v[i][0];
  pVid.className = 'p-vid';
  pVid.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" title="${esc(it.t)}" allow="autoplay; fullscreen; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
  const yt = $('.p-yt', dlg); yt.hidden = false; yt.href = `https://www.youtube.com/watch?v=${id}`;
  pParts.querySelectorAll('button').forEach((b, j) => b.setAttribute('aria-pressed', j === i));
}

function openPlayer(it, i, from) {
  playing = it; opener = from;
  const at = pathOf.get(it);
  put('#p-title', at && at + '.t', it.t);
  put('.p-desc', at && at + '.d', it.d || '');
  pParts.innerHTML = Array.isArray(it.v) ? it.v.map((v, j) => `<li><button type="button" data-j="${j}" data-edit="${at}.v.${j}.1">${esc(v[1])}</button></li>`).join('') : '';
  pParts.hidden = !Array.isArray(it.v);
  showPart(i);
  dlg.showModal();
}
pParts.addEventListener('click', e => { const b = e.target.closest('button'); if (b) showPart(+b.dataset.j); });
dlg.addEventListener('click', e => { if (e.target === dlg || e.target.closest('.p-close')) dlg.close(); });
dlg.addEventListener('close', () => { pVid.innerHTML = ''; playing = null; if (opener) opener.focus({preventScroll: true}); });

/* hooks for the editor */
window.siteRelayout = relayout;
window.siteRedescribe = () => strips.forEach(st => st.redescribe());

/* showreel: shows up once SITE.showreel has a YouTube ID */
if (SITE.showreel) {
  const btn = $('#hero-reel');
  btn.hidden = false;
  btn.addEventListener('click', () => openPlayer({t: 'Showreel', d: '', v: SITE.showreel}, 0, btn));
}
