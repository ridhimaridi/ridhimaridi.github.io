// ===== Starfield generation =====
(function createStars() {
  const container = document.getElementById('stars');
  if (!container) return;
  const count = window.innerWidth < 600 ? 90 : 180;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2.2 + 0.4;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.top = Math.random() * 100 + '%';
    star.style.left = Math.random() * 100 + '%';
    star.style.setProperty('--d', (Math.random() * 3 + 2) + 's');
    star.style.animationDelay = (Math.random() * 4) + 's';
    frag.appendChild(star);
  }
  container.appendChild(frag);
})();

// ===== Mobile menu =====
(function mobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  const close = () => {
    toggle.classList.remove('open');
    links.classList.remove('open');
  };

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
})();

// ===== Navbar shrink on scroll + active link highlight =====
(function navbarScroll() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('main section[id]');

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);

    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ===== Reveal on scroll =====
(function revealOnScroll() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 0.08 + 's';
    observer.observe(el);
  });
})();

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();
