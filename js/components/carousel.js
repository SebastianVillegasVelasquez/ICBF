/**
 * carousel.js — Carousel / Slider component
 *
 * Config shape:
 * {
 *   "type": "carousel",
 *   "title": "...",
 *   "slides": [
 *     { "heading": "...", "body": "..." }
 *   ]
 * }
 */
export function renderCarousel(data, id = 'carousel-0') {
  const slides = (data.slides || []).map(slide => `
    <div class="carousel-slide">
      ${slide.heading ? `<h4>${slide.heading}</h4>` : ''}
      <p>${slide.body}</p>
    </div>
  `).join('');

  const dots = (data.slides || []).map((_, i) =>
    `<span class="carousel-dot ${i === 0 ? 'active' : ''}" data-idx="${i}"></span>`
  ).join('');

  return `
    ${data.title ? `<h3 class="section-heading">${data.title}</h3>` : ''}
    ${data.intro ? `<p class="section-body">${data.intro}</p>` : ''}
    <div class="carousel-wrap" id="${id}">
      <div class="carousel-track">${slides}</div>
    </div>
    <div class="carousel-controls">
      <button class="carousel-btn" data-carousel="${id}" data-dir="-1">&#8592;</button>
      <div class="carousel-dots">${dots}</div>
      <button class="carousel-btn" data-carousel="${id}" data-dir="1">&#8594;</button>
    </div>
  `;
}

export function initCarousel(container) {
  container.querySelectorAll('.carousel-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const carouselId = btn.dataset.carousel;
      const wrap = container.querySelector(`#${carouselId}`);
      const track = wrap.querySelector('.carousel-track');
      const slides = track.querySelectorAll('.carousel-slide');
      const dots = container.querySelectorAll(`.carousel-dot`);
      const total = slides.length;

      // Derive current index from transform
      const currentTransform = track.style.transform || 'translateX(0%)';
      const match = currentTransform.match(/-?[\d.]+/);
      const currentPct = match ? parseFloat(match[0]) : 0;
      let current = Math.round(Math.abs(currentPct) / 100);

      const dir = parseInt(btn.dataset.dir, 10);
      current = (current + dir + total) % total;

      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    });
  });

  container.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.addEventListener('click', () => {
      const carouselId = dot.closest('.carousel-controls') ?
        dot.closest('.carousel-controls').querySelector('.carousel-btn').dataset.carousel : null;
      if (!carouselId) return;
      const wrap = container.querySelector(`#${carouselId}`);
      const track = wrap.querySelector('.carousel-track');
      const dots = container.querySelectorAll('.carousel-dot');
      track.style.transform = `translateX(-${i * 100}%)`;
      dots.forEach((d, j) => d.classList.toggle('active', j === i));
    });
  });
}
