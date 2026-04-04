/**
 * renderSlideshow(data)
 * Genera el HTML del componente slideshow.
 *
 * @param {Object} data
 * @param {Array}  data.slides  - Array de { label, title, body } donde body es HTML string
 * @returns {string} HTML inyectable
 */
export function renderSlideshow(data) {
    const slides = data.slides || [];

    return `
    <div class="slideshow-wrapper" data-booted="slideshow" data-total="${slides.length}">
      <div class="slideshow-header-bar">
        <span class="slideshow-counter">Slide 1 / ${slides.length}</span>
        <div class="slideshow-progress-track">
          <div class="slideshow-progress-fill" style="width: ${slides.length ? (1 / slides.length) * 100 : 100}%"></div>
        </div>
      </div>

      <div class="slideshow-card">
        ${slides.map((slide, i) => `
          <div class="slideshow-slide${i === 0 ? ' active' : ''}" data-slide="${i}" aria-hidden="${i !== 0}">
            ${slide.label ? `<span class="slideshow-label">${slide.label}</span>` : ''}
            ${slide.title ? `<h3 class="slideshow-title">${slide.title}</h3>` : ''}
            <div class="slideshow-body">${slide.body || ''}</div>
          </div>
        `).join('')}
      </div>

      <div class="slideshow-nav">
        <button class="slideshow-btn" data-dir="-1" disabled>&#8592; Anterior</button>
        <div class="slideshow-dots">
          ${slides.map((_, i) => `
            <button class="slideshow-dot${i === 0 ? ' active' : ''}" data-goto="${i}" aria-label="Ir a slide ${i + 1}"></button>
          `).join('')}
        </div>
        <button class="slideshow-btn" data-dir="1" ${slides.length <= 1 ? 'disabled' : ''}>Siguiente &#8594;</button>
      </div>
    </div>
  `;
}

/**
 * initSlideshow(container)
 * Inicializa los eventos del slideshow dentro del contenedor dado.
 *
 * @param {HTMLElement} container
 */
export function initSlideshow(container) {


    const wrappers = container.classList.contains('slideshow-wrapper')
        ? [container]
        : Array.from(container.querySelectorAll('.slideshow-wrapper'));

    wrappers.forEach((wrapper, wi) => {

        const slides  = wrapper.querySelectorAll('.slideshow-slide');
        const dots    = wrapper.querySelectorAll('.slideshow-dot');
        const counter = wrapper.querySelector('.slideshow-counter');
        const fill    = wrapper.querySelector('.slideshow-progress-fill');
        const btnPrev = wrapper.querySelector('[data-dir="-1"]');
        const btnNext = wrapper.querySelector('[data-dir="1"]');

        if (!btnPrev || !btnNext) {
            console.error('[Slideshow] ❌ Botones no encontrados — revisa que el HTML tenga data-dir="-1" y data-dir="1"');
            return;
        }

        const total = parseInt(wrapper.dataset.total, 10);
        let current = 0;

        function goTo(idx) {
            console.log(`[Slideshow] goTo(${idx}) — current: ${current}, total: ${total}`);
            if (idx < 0 || idx >= total) {
                console.warn(`[Slideshow] índice fuera de rango: ${idx}`);
                return;
            }

            slides[current].classList.remove('active');
            slides[current].setAttribute('aria-hidden', 'true');
            dots[current]?.classList.remove('active');

            current = idx;

            slides[current].classList.add('active');
            slides[current].setAttribute('aria-hidden', 'false');
            dots[current]?.classList.add('active');

            if (counter) counter.textContent = `Slide ${current + 1} / ${total}`;
            if (fill) fill.style.width = `${((current + 1) / total) * 100}%`;
            btnPrev.disabled = current === 0;
            btnNext.disabled = current === total - 1;
        }

        btnPrev.addEventListener('click', () => {
            goTo(current - 1);
        });

        btnNext.addEventListener('click', () => {
            goTo(current + 1);
        });

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                goTo(i);
            });
        });

    });
}