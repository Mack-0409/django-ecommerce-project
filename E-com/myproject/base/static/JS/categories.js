const categoryStrip = document.getElementById('categoryStrip');
const scrollLeftBtn = document.getElementById('scrollLeft');
const scrollRightBtn = document.getElementById('scrollRight');

function scrollStrip(direction) {
  categoryStrip.scrollBy({ left: direction * 350, behavior: 'smooth' });
}

scrollLeftBtn.addEventListener('click', () => scrollStrip(-1));
scrollRightBtn.addEventListener('click', () => scrollStrip(1));

categoryStrip.addEventListener('wheel', (e) => {
  if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
    e.preventDefault();
    categoryStrip.scrollBy({ left: e.deltaY, behavior: 'auto' });
  }
}, { passive: false });

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
