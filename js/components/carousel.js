export function renderCarousel(data, id = 'carousel-0') {
    const slidesData = data.data?.slides || data.slides || [];

    const slidesHtml = slidesData.map((slide, i) => {
        const { icon = i+1, title = '', objective = '', contents = [] } = slide;
        const contentsHtml = contents.map(item => `<li class="carousel-content-item">${item}</li>`).join('');

        return `
          <div class="carousel-slide ${i === 0 ? 'active' : ''}">
            <div class="slide-header">
              <div class="carousel-slide-icon">${icon}</div>
              <h4 class="slide-title">${title}</h4>
            </div>
            
            <div class="slide-body">
              <p class="slide-objective"><strong>Objetivo:</strong> ${objective}</p>
              ${contents.length > 0 ? `
                <div class="slide-contents-box">
                  <h5>Contenidos:</h5>
                  <ul class="carousel-slide-contents">${contentsHtml}</ul>
                </div>
              ` : ''}
            </div>
          </div>
        `;
    }).join('');

    const dotsHtml = slidesData.map((_, i) =>
        `<button class="carousel-dot ${i === 0 ? 'active' : ''}" data-idx="${i}">${i + 1}</button>`
    ).join('');

    return `
    ${data.title ? `<h3 class="section-heading">${data.title}</h3>` : ''}

    <div class="carousel-container" id="${id}">
      
      <button class="carousel-btn left" data-carousel="${id}" data-dir="-1">&#8592;</button>

      <div class="carousel-wrap">
        <div class="carousel-track">
          ${slidesHtml}
        </div>
      </div>

      <button class="carousel-btn right" data-carousel="${id}" data-dir="1">&#8594;</button>

    </div>

    <div class="carousel-dots">
      ${dotsHtml}
    </div>

    <div class="carousel-footer">
      <button class="carousel-btn-continue" id="continue-${id}">
        Continuar
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
      </button>
    </div>
  `;
}

export function initCarousel(container) {
    container.querySelectorAll('.carousel-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const carouselId = btn.dataset.carousel;
            const wrap = container.querySelector(`#${carouselId}`);
            const track = wrap.querySelector('.carousel-track');
            const dots = container.querySelectorAll(`.carousel-dot`);
            const continueBtn = container.querySelector(`#continue-${carouselId}`);
            const slides = track.querySelectorAll('.carousel-slide');
            const total = slides.length;

            const currentTransform = track.style.transform || 'translateX(0%)';
            const match = currentTransform.match(/-?[\d.]+/);
            const currentPct = match ? parseFloat(match[0]) : 0;
            let current = Math.round(Math.abs(currentPct) / 100);

            const dir = parseInt(btn.dataset.dir, 10);
            current = (current + dir + total) % total;

            track.style.transform = `translateX(-${current * 100}%)`;
            dots.forEach((d, i) => d.classList.toggle('active', i === current));

            if (continueBtn) {
                if (current === total - 1) continueBtn.classList.add('visible');
                else continueBtn.classList.remove('visible');
            }
        });
    });

    container.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.addEventListener('click', () => {
            const carouselContainer = dot.closest('.screen-carousel') || container;
            const wrap = carouselContainer.querySelector('.carousel-container');
            const track = wrap.querySelector('.carousel-track');
            const dots = carouselContainer.querySelectorAll('.carousel-dot');
            const continueBtn = carouselContainer.querySelector('.carousel-btn-continue');
            const slides = track.querySelectorAll('.carousel-slide');
            const total = slides.length;

            track.style.transform = `translateX(-${i * 100}%)`;
            dots.forEach((d, j) => d.classList.toggle('active', j === i));

            if (continueBtn) {
                if (i === total - 1) continueBtn.classList.add('visible');
                else continueBtn.classList.remove('visible');
            }
        });
    });

    container.querySelectorAll('.carousel-btn-continue').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.dispatchEvent(new CustomEvent('carousel-continue', { bubbles: true }));
        });
    });
}