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
    <style>
      .slideshow-wrapper { width: 100%; height: 100%; box-sizing: border-box; padding: 0.5rem 0; }
      .slideshow-header-bar { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
      .slideshow-counter { font-size: 13px; font-weight: 700; color: #ffffff; background: #E8B800; padding: 4px 12px; border-radius: 20px; white-space: nowrap; }
      .slideshow-progress-track { flex: 1; height: 10px; background: #e5e7eb; border-radius: 10px; overflow: hidden; }
      .slideshow-progress-fill { height: 100%; background: linear-gradient(90deg, #E8B800 70%, #3aafa9 100%); border-radius: 10px; transition: width 0.4s ease; }
      .slideshow-card { background: #ffffff; border: none; border-left: 6px solid #E8B800; border-radius: 0 16px 16px 0; padding: 2.5rem 3rem; box-sizing: border-box; min-height: 320px; box-shadow: 0 4px 24px rgba(0,0,0,0.07); }
      .slideshow-slide { display: none; flex-direction: column; }
      .slideshow-slide.active { display: flex; animation: slideIn 0.35s ease; }
      @keyframes slideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      .slideshow-label { display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #5a4200; background: #FFF3B0; border-left: 3px solid #E8B800; padding: 4px 12px; border-radius: 0 4px 4px 0; margin-bottom: 1.1rem; width: fit-content; }
      .slideshow-title { font-size: 26px; font-weight: 800; color: #1a1a2e; margin: 0 0 1.25rem 0; line-height: 1.25; }
      .slideshow-body { font-size: 15.5px; color: #374151; line-height: 1.8; }
      .slideshow-body p { margin: 0 0 1rem 0; }
      .slideshow-body p:last-child { margin-bottom: 0; }
      .slideshow-nav { display: flex; align-items: center; justify-content: space-between; margin-top: 1.75rem; gap: 1rem; }
      .slideshow-btn { font-size: 13px; font-weight: 700; padding: 10px 24px; border-radius: 30px; border: 2px solid #E8B800; background: transparent; color: #5a4200; cursor: pointer; transition: background 0.18s, color 0.18s; }
      .slideshow-btn:hover:not(:disabled) { background: #E8B800; color: #ffffff; }
      .slideshow-btn:disabled { opacity: 0.25; cursor: default; border-color: #d1d5db; color: #9ca3af; }
      .slideshow-dots { display: flex; gap: 8px; align-items: center; }
      .slideshow-dot { width: 10px; height: 10px; border-radius: 50%; background: #e5e7eb; border: 2px solid #d1d5db; padding: 0; cursor: pointer; transition: background 0.2s, transform 0.2s; }
      .slideshow-dot.active { background: #E8B800; border-color: #E8B800; transform: scale(1.4); }
    </style>

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

            const slides = wrapper.querySelectorAll('.slideshow-slide');
            const dots = wrapper.querySelectorAll('.slideshow-dot');
            const counter = wrapper.querySelector('.slideshow-counter');
            const fill = wrapper.querySelector('.slideshow-progress-fill');
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