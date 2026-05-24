// ── TWEAKS defaults
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentColor": "#ff0d00",
  "projectLayout": "list",
  "showCursor": true,
  "bgColor": "#080808"
}/*EDITMODE-END*/;
let tweaks = {...TWEAK_DEFAULTS};

function applyTweaks() {
  document.documentElement.style.setProperty('--accent', tweaks.accentColor);
  document.documentElement.style.setProperty('--accent-dim', tweaks.accentColor + '20');
  document.documentElement.style.setProperty('--accent-glow', tweaks.accentColor + '55');
}
applyTweaks();

// ── NAV scroll
const navEl = document.getElementById('nav');
window.addEventListener('scroll', () => {
  navEl.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── TICKER
const skills = ['Laravel', 'PHP', 'MySQL', 'Vue.js', 'REST API', 'Docker', 'Git', 'Tailwind', 'Linux', 'Redis'];
const ticker = document.getElementById('ticker-inner');
const items = [...skills, ...skills].map(s => `<span class="ticker-item"><span>→</span>${s.toUpperCase()}</span>`).join('');
ticker.innerHTML = items + items; // double for seamless loop

// ── TYPEWRITER
const roles = ['Fullstack Developer', 'Laravel Expert', 'PHP Engineer', 'API Architect'];
let roleIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-role');

function typeRole() {
  const cur = roles[roleIdx];
  if (!deleting) {
    typedEl.textContent = cur.slice(0, ++charIdx);
    if (charIdx === cur.length) { deleting = true; setTimeout(typeRole, 1800); return; }
  } else {
    typedEl.textContent = cur.slice(0, --charIdx);
    if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; }
  }
  setTimeout(typeRole, deleting ? 50 : 80);
}
setTimeout(typeRole, 1400);

// ── SCROLL REVEAL
const revealEls = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => obs.observe(el));

// ── SKILL BARS
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.pct + '%';
      });
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
const sg = document.getElementById('skills-grid');
if (sg) skillObs.observe(sg);

// ── FILTER BUTTONS
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      const show = filter === 'all' || card.dataset.cat === filter;
      card.style.opacity = show ? '1' : '0.25';
      card.style.pointerEvents = show ? '' : 'none';
    });
  });
});

// ── TESTIMONIALS CAROUSEL
let curTesti = 0;
const track = document.getElementById('testi-track');
const cards = track.querySelectorAll('.testi-card');
const nav = document.getElementById('testi-nav');

cards.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goTo(i));
  nav.appendChild(dot);
});

function goTo(idx) {
  curTesti = idx;
  const cardWidth = cards[0].offsetWidth + 24;
  track.style.transform = `translateX(-${idx * cardWidth}px)`;
  nav.querySelectorAll('.testi-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
}

setInterval(() => goTo((curTesti + 1) % cards.length), 4000);

// ── TWEAKS PANEL
window.addEventListener('message', e => {
  if (e.data.type === '__activate_edit_mode') { document.getElementById('tweaks-panel').style.display = 'flex'; }
  if (e.data.type === '__deactivate_edit_mode') { document.getElementById('tweaks-panel').style.display = 'none'; }
});
window.parent.postMessage({ type: '__edit_mode_available' }, '*');

document.getElementById('tweak-accent').addEventListener('input', e => {
  tweaks.accentColor = e.target.value;
  applyTweaks();
  window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { accentColor: e.target.value }}, '*');
});
document.getElementById('tweak-layout').addEventListener('change', e => {
  tweaks.projectLayout = e.target.value;
  window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { projectLayout: e.target.value }}, '*');
});