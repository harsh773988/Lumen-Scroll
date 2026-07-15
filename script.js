const progressBar = document.querySelector('.progress-bar');
const layers = document.querySelectorAll('.parallax-layer');
const fadeItems = document.querySelectorAll('.fade-up');
const featureCards = document.querySelectorAll('.feature-card');
const orb = document.querySelector('.orb-layer');
const siteNav = document.querySelector('.site-nav');
const heroAmbient = document.querySelector('.hero-ambient');
const isMobile = window.matchMedia('(max-width: 720px)').matches;

function updateNav() {
  if (siteNav) {
    siteNav.classList.toggle('scrolled', window.scrollY > 24);
  }
}

function updatePointerGlow(event) {
  const x = (event.clientX / window.innerWidth) * 100;
  const y = (event.clientY / window.innerHeight) * 100;
  document.documentElement.style.setProperty('--pointer-x', `${x}%`);
  document.documentElement.style.setProperty('--pointer-y', `${y}%`);
}

function setupParallax() {
  gsap.registerPlugin(ScrollTrigger);

  layers.forEach((layer) => {
    const section = layer.closest('.section');
    if (!section) return;

    const speed = parseFloat(layer.dataset.speed || 0.3);
    const effectiveSpeed = isMobile ? speed * 0.45 : speed;

    gsap.to(layer, {
      yPercent: 18 * effectiveSpeed,
      xPercent: layer.classList.contains('cloud-layer') ? -6 * effectiveSpeed : 0,
      rotate: layer.classList.contains('orb-layer') ? 2 * effectiveSpeed : 0,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      },
    });
  });

  gsap.to(progressBar, {
    scaleX: 1,
    ease: 'none',
    transformOrigin: 'left center',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.2,
      onUpdate: (self) => {
        progressBar.style.transform = `scaleX(${self.progress})`;
      },
    },
  });

  fadeItems.forEach((item, index) => {
    gsap.fromTo(
      item,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.95,
        ease: 'power3.out',
        delay: index * 0.06,
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          once: true,
        },
      }
    );
  });

  gsap.fromTo(
    featureCards,
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: 0.85,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.feature-grid',
        start: 'top 80%',
        once: true,
      },
    }
  );

  gsap.fromTo(
    '.hero-pill',
    { opacity: 0, y: 12 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 }
  );

  gsap.to(heroAmbient, {
    yPercent: -8,
    rotate: 8,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  });
}

function addMouseParallax() {
  window.addEventListener('mousemove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;

    if (orb) {
      gsap.to(orb, {
        x: x * 18,
        y: y * 16,
        duration: 0.8,
        ease: 'power3.out',
      });
    }
  });
}

window.addEventListener('scroll', updateNav);
window.addEventListener('mousemove', updatePointerGlow);
window.addEventListener('load', () => {
  updateNav();
  setupParallax();
  addMouseParallax();
});