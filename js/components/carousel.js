export function renderCarousel(data, id = 'carousel-0') {
    const slidesData = data.data?.slides || data.slides || [];

    const slidesHtml = slidesData.map((slide, i) => {
        const {icon = i + 1, title = '', objective = '', contents = []} = slide;
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
    <style>
.screen-carousel{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:15px 0;overflow:hidden;box-sizing:border-box}.carousel-container{position:relative;width:100%;max-width:1250px;margin:0 auto;padding:0 20px}.carousel-wrap{overflow:hidden;border-radius:20px;background:#ffffff;border:1px solid rgba(0,0,0,0.05);box-shadow:0px 15px 35px rgba(0,0,0,0.07)}.carousel-track{display:flex;transition:transform 0.5s cubic-bezier(0.4,0,0.2,1)}.carousel-slide{flex-shrink:0;width:100%;padding:clamp(25px,4vw,45px);display:flex;flex-direction:column;gap:15px;box-sizing:border-box;min-height:320px}.slide-title{font-size:clamp(1.2rem,2vw,1.5rem);font-weight:800;color:#1a1a1a;text-align:center;margin-bottom:5px}.slide-body{display:flex;flex-direction:column;gap:12px;max-width:1050px;margin:0 auto;width:100%}.slide-objective{font-size:clamp(0.9rem,1vw,1.05rem);line-height:1.4;color:#4a4a4a;text-align:center}.carousel-slide-contents{padding:0;margin:0;list-style:none;display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:10px}.carousel-content-item{font-size:0.9rem;color:#333;display:flex;align-items:flex-start;gap:8px;padding:10px;background:#fdfdfd;border-radius:8px}.carousel-btn{position:absolute;top:50%;transform:translateY(-50%);width:48px;height:48px;border-radius:50%;background:#000;color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:10;box-shadow:0 4px 10px rgba(0,0,0,0.2)}.carousel-btn.left{left:-5px}.carousel-btn.right{right:-5px}.carousel-dots{display:flex;justify-content:center;margin-top:15px;gap:8px}.carousel-dot{width:32px;height:32px;border-radius:50%;background:#fff;border:2px solid #eee;color:#888;font-weight:700;font-size:0.8rem;cursor:pointer;display:flex;align-items:center;justify-content:center}.carousel-dot.active{background:#000;border-color:#000;color:#fff}.carousel-footer{margin-top:20px;width:100%;display:flex;justify-content:center;align-items:center}.carousel-btn-continue{background:#ffd700;color:#000;border:none;padding:12px 55px;border-radius:30px;font-weight:800;font-size:1.1rem;display:flex;align-items:center;justify-content:center;gap:12px;cursor:pointer;box-shadow:0 6px 15px rgba(255,215,0,0.3);transition:all 0.3s ease;opacity:0;visibility:hidden;transform:translateY(10px)}.carousel-btn-continue.visible{opacity:1;visibility:visible;transform:translateY(0)}@media (max-width:1366px){.carousel-container{max-width:1100px}.carousel-btn.left{left:0}.carousel-btn.right{right:0}}@media (max-height:780px){.screen-carousel{padding:10px}.carousel-slide{padding:20px 30px;min-height:auto;gap:10px}.slide-title{font-size:1.25rem}.slide-body{gap:8px}.carousel-footer{margin-top:10px}.carousel-btn-continue{padding:10px 40px;font-size:1rem}}@media (max-width:768px){.screen-carousel{padding:10px}.carousel-slide{padding:25px 15px;min-height:auto}.carousel-btn-continue{width:80%;padding:14px 20px}}    </style>

    <div class="screen-carousel" data-booted="carousel">
        
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
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
          </button>
        </div>
        
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
            btn.dispatchEvent(new CustomEvent('carousel-continue', {bubbles: true}));
        });
    });
}