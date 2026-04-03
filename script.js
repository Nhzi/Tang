/* Tang — Landing Page JavaScript */

// ===================== NAVBAR SCROLL =====================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ===================== HAMBURGER MENU =====================
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===================== SCROLL REVEAL =====================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===================== COUNTER ANIMATION =====================
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const step = 16;
  const steps = duration / step;
  let current = 0;

  const increment = target / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    const display = target >= 1000
      ? Math.round(current).toLocaleString()
      : Math.round(current);
    el.textContent = `${prefix}${display}${suffix}`;
  }, step);
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-value[data-target]').forEach(animateCounter);
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

const statsSection = document.getElementById('stats');
if (statsSection) statsObserver.observe(statsSection);

// ===================== SMOOTH ANCHOR SCROLL =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offset = 80; // navbar height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ===================== CTA FORM =====================
const ctaForm = document.querySelector('.cta-form');
if (ctaForm) {
  const btn = ctaForm.querySelector('button');
  const input = ctaForm.querySelector('input');

  btn.addEventListener('click', () => {
    const email = input.value.trim();
    if (!email || !email.includes('@')) {
      input.style.borderColor = '#f87171';
      input.focus();
      return;
    }
    input.style.borderColor = '#4ade80';
    btn.textContent = '🎉 You\'re on the list!';
    btn.disabled = true;
    input.disabled = true;
  });

  input.addEventListener('input', () => {
    input.style.borderColor = '';
  });
}
