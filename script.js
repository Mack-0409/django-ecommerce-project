/* ============================================
   1.  TOAST NOTIFICATION
   ============================================ */
function showToast(icon, msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastIcon').textContent = icon;
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  clearTimeout(t._hide);
  t._hide = setTimeout(() => t.classList.remove('show'), 2800);
}

/* ============================================
   2.  HEADER SCROLL EFFECT
   ============================================ */
const header = document.getElementById('header');
const backBtn = document.getElementById('backToTop');

function handleScroll() {
  const s = window.scrollY;
  header.classList.toggle('scrolled', s > 60);
  backBtn.classList.toggle('visible', s > 500);
}

window.addEventListener('scroll', handleScroll);
handleScroll();

/* Back to top */
backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ============================================
   3.  HERO UNDERLINE — SCROLL PROGRESS
   ============================================ */
const titleUnderline = document.getElementById('titleUnderline');
const heroSection = document.getElementById('hero');

function updateUnderline() {
  const heroRect = heroSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const progress = Math.max(0, Math.min(1, 1 - (heroRect.bottom / windowHeight)));
  const width = progress * 280;
  titleUnderline.style.width = `${Math.min(width, 280)}px`;
  titleUnderline.style.opacity = Math.min(1, progress * 2);
}

window.addEventListener('scroll', updateUnderline);
window.addEventListener('resize', updateUnderline);
updateUnderline();

/* ============================================
   4.  COUNTER ANIMATION — HERO STATS
   ============================================ */
const statValues = document.querySelectorAll('.stat-value');

function animateCounters() {
  statValues.forEach(el => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const current = parseInt(el.textContent, 10) || 0;
    if (current >= target) return;
    const speed = 60;
    const increment = Math.ceil(target / speed);
    const next = Math.min(current + increment, target);
    el.textContent = next;
    if (next < target) requestAnimationFrame(animateCounters);
  });
}

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      heroObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

if (statValues.length) heroObserver.observe(heroSection);

/* ============================================
   5.  3D SHOE TILT — MOUSE MOVE & TOUCH
   ============================================ */
const shoeContainer = document.getElementById('shoeContainer');
const shoeImage = document.getElementById('shoeImage');
const shoeGlow = document.getElementById('shoeGlow');

function handleTilt(e) {
  const rect = shoeContainer.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = ((y - centerY) / centerY) * -12;
  const rotateY = ((x - centerX) / centerX) * 12;

  shoeImage.style.transform = `rotate(-8deg) scale(1.1) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  shoeImage.style.transition = 'transform 0.15s ease-out';

  const glowX = ((x - centerX) / centerX) * 20;
  const glowY = ((y - centerY) / centerY) * 20;
  shoeGlow.style.transform = `translate(${glowX}px, ${glowY}px)`;
}

function resetTilt() {
  shoeImage.style.transform = 'rotate(-8deg) scale(1.1) rotateX(0deg) rotateY(0deg)';
  shoeImage.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
  shoeGlow.style.transform = 'translate(0, 0)';
}

shoeContainer.addEventListener('mousemove', handleTilt);
shoeContainer.addEventListener('mouseleave', resetTilt);

/* Touch support */
shoeContainer.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  handleTilt({ clientX: touch.clientX, clientY: touch.clientY });
}, { passive: true });

shoeContainer.addEventListener('touchend', resetTilt);

/* ============================================
   6.  CATEGORY — HORIZONTAL SCROLL
   ============================================ */
const categoryStrip = document.getElementById('categoryStrip');
const scrollLeftBtn = document.getElementById('scrollLeft');
const scrollRightBtn = document.getElementById('scrollRight');

function scrollStrip(direction) {
  categoryStrip.scrollBy({ left: direction * 350, behavior: 'smooth' });
}

scrollLeftBtn.addEventListener('click', () => scrollStrip(-1));
scrollRightBtn.addEventListener('click', () => scrollStrip(1));

/* Scroll via mouse wheel */
categoryStrip.addEventListener('wheel', (e) => {
  if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
    e.preventDefault();
    categoryStrip.scrollBy({ left: e.deltaY, behavior: 'auto' });
  }
}, { passive: false });

/* Drag-to-scroll */
let isDragging = false;
let startX = 0;
let scrollStart = 0;

categoryStrip.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - categoryStrip.offsetLeft;
  scrollStart = categoryStrip.scrollLeft;
  categoryStrip.style.cursor = 'grabbing';
});

categoryStrip.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - categoryStrip.offsetLeft;
  categoryStrip.scrollLeft = scrollStart - (x - startX) * 1.5;
});

categoryStrip.addEventListener('mouseup', () => {
  isDragging = false;
  categoryStrip.style.cursor = 'grab';
});

categoryStrip.addEventListener('mouseleave', () => {
  isDragging = false;
  categoryStrip.style.cursor = 'grab';
});

categoryStrip.style.cursor = 'grab';

/* ============================================
   7.  SCROLL REVEAL — INTERSECTION OBSERVER
   ============================================ */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ============================================
   8.  FILTER TABS — ACTIVE STATE
   ============================================ */
document.querySelectorAll('.filter-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

/* ============================================
   9.  HAMBURGER MENU — MOBILE TOGGLE
   ============================================ */
document.getElementById('hamburger').addEventListener('click', function () {
  this.classList.toggle('active');
  const nav = document.querySelector('.nav');
  if (nav.style.display === 'flex') {
    nav.style.display = '';
  } else {
    nav.style.display = 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.top = '100%';
    nav.style.left = '0';
    nav.style.right = '0';
    nav.style.background = 'rgba(13, 15, 26, 0.98)';
    nav.style.padding = '24px 5%';
    nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.07)';
    nav.style.gap = '20px';
  }
});

/* ============================================
   10. HERO PARALLAX — SCROLL
   ============================================ */
const heroVisual = document.getElementById('heroVisual');

window.addEventListener('scroll', () => {
  const rect = heroSection.getBoundingClientRect();
  const progress = 1 - (rect.top / window.innerHeight);
  if (progress >= 0 && progress <= 1.2) {
    heroVisual.style.transform = `translateY(${progress * 40}px)`;
  }
});

/* ============================================
   11. CONSOLE BRANDING
   ============================================ */
console.log(
  '%c NOIR %c Premium Footwear ',
  'background:#FF4D4D;color:#fff;font-size:1.2rem;padding:4px 0 4px 8px;border-radius:4px 0 0 4px;font-weight:700;',
  'background:#0D0F1A;color:#F5F0E8;font-size:1.2rem;padding:4px 8px 4px 0;border-radius:0 4px 4px 0;font-weight:300;'
);
