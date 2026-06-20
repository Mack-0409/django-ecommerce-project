/* ============================================
   1.  HERO UNDERLINE — SCROLL PROGRESS
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
   2.  COUNTER ANIMATION — HERO STATS
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
   3.  3D SHOE TILT — MOUSE MOVE & TOUCH
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

shoeContainer.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  handleTilt({ clientX: touch.clientX, clientY: touch.clientY });
}, { passive: true });

shoeContainer.addEventListener('touchend', resetTilt);

/* ============================================
   4.  HERO PARALLAX — SCROLL
   ============================================ */
const heroVisual = document.getElementById('heroVisual');

window.addEventListener('scroll', () => {
  const rect = heroSection.getBoundingClientRect();
  const progress = 1 - (rect.top / window.innerHeight);
  if (progress >= 0 && progress <= 1.2) {
    heroVisual.style.transform = `translateY(${progress * 40}px)`;
  }
});
