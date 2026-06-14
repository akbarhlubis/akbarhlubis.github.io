// NAV scroll
const navEl = document.getElementById('nav');
window.addEventListener('scroll', () => {
  navEl.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// THEME TOGGLE
const themeToggle = document.getElementById('theme-toggle');
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'light' ? 'dark' : 'light');
});

// NAV TOGGLE (hamburger)
const toggleBtn = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

function setNavOpen(isOpen) {
  toggleBtn.classList.toggle('active', isOpen);
  navLinks.classList.toggle('open', isOpen);
  toggleBtn.setAttribute('aria-expanded', String(isOpen));
}

toggleBtn.addEventListener('click', () => {
  setNavOpen(!navLinks.classList.contains('open'));
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => setNavOpen(false));
});

document.addEventListener('click', (e) => {
  if (!navEl.contains(e.target)) setNavOpen(false);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setNavOpen(false);
});

// TICKER
const skills = ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'REST API', 'Docker', 'Linux', 'Git', 'Tailwind', 'AI Automation'];
const ticker = document.getElementById('ticker-inner');
const tickerItems = skills.map(s => `<span class="ticker-item"><span>→</span>${s.toUpperCase()}</span>`).join('');
ticker.innerHTML = tickerItems + tickerItems;

// TYPEWRITER
const roles = ['Web Developer', 'Laravel Developer', 'Systems Operations Specialist', 'Prompt Engineer', 'Troubleshooting Support'];
const typedEl = document.getElementById('typed-role');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  typedEl.textContent = roles[0];
} else {
  let roleIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function typeRole() {
    const cur = roles[roleIdx];
    if (!deleting) {
      typedEl.textContent = cur.slice(0, ++charIdx);
      if (charIdx === cur.length) {
        deleting = true;
        setTimeout(typeRole, 1800);
        return;
      }
    } else {
      typedEl.textContent = cur.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }
    setTimeout(typeRole, deleting ? 50 : 80);
  }

  setTimeout(typeRole, 1400);
}

// SCROLL REVEAL
const revealEls = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => obs.observe(el));

// FILTER BUTTONS
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.setAttribute('aria-pressed', String(btn.classList.contains('active')));
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.filter-btn').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      const show = filter === 'all' || card.dataset.cat === filter;
      card.hidden = !show;
      card.setAttribute('aria-hidden', String(!show));
    });
  });
});

// TESTIMONIALS CAROUSEL
let curTesti = 0;
const track = document.getElementById('testi-track');
const cards = track.querySelectorAll('.testi-card');
const trackWrap = document.getElementById('testi-track-wrap');
const nav = document.getElementById('testi-nav');
let carouselTimer = null;

function updateCarousel(index, animate = true) {
  curTesti = index;
  const gap = parseFloat(getComputedStyle(track).gap) || 24;
  const cardWidth = cards[0].getBoundingClientRect().width + gap;
  if (!animate) track.style.transition = 'none';
  track.style.transform = `translateX(-${index * cardWidth}px)`;
  if (!animate) requestAnimationFrame(() => {
    track.style.transition = '';
  });
  nav.querySelectorAll('.testi-dot').forEach((d, i) => d.classList.toggle('active', i === index));
}

cards.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', `Show testimonial ${i + 1}`);
  dot.addEventListener('click', () => updateCarousel(i));
  nav.appendChild(dot);
});

function startCarousel() {
  if (prefersReducedMotion.matches || cards.length < 2 || carouselTimer) return;
  carouselTimer = setInterval(() => updateCarousel((curTesti + 1) % cards.length), 7000);
}

function stopCarousel() {
  if (!carouselTimer) return;
  clearInterval(carouselTimer);
  carouselTimer = null;
}

trackWrap.addEventListener('mouseenter', stopCarousel);
trackWrap.addEventListener('mouseleave', startCarousel);
trackWrap.addEventListener('focusin', stopCarousel);
trackWrap.addEventListener('focusout', () => {
  window.setTimeout(() => {
    if (!trackWrap.contains(document.activeElement)) startCarousel();
  }, 0);
});

window.addEventListener('resize', () => updateCarousel(curTesti, false));

updateCarousel(0, false);
startCarousel();
