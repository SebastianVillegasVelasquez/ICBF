import { Screen } from './screen-base.js';

export class CarouselScreen extends Screen {
  constructor(config = {}) {
    super(config);
    this.config = config.data || config; // Soporta ambas estructuras
    this.currentSlide = 0;
  }

  render() {
    const { slides = [] } = this.config;

    if (slides.length === 0) {
      return '<div class="screen screen-carousel"><p>No hay diapositivas disponibles</p></div>';
    }

    // Los dots ahora muestran el número
    const dotsHtml = slides
        .map((_, i) => `<button class="carousel-dot ${i === 0 ? 'active' : ''}" data-slide="${i}">${i + 1}</button>`)
        .join('');

    const slidesHtml = slides
        .map((slide, i) => this.renderSlide(slide, i === 0))
        .join('');

    return `
      <div class="screen screen-carousel container-fluid">
    <div class="carousel-container">
      
      <div class="carousel-wrap">
        <div class="carousel-track">
          ${slidesHtml}
        </div>
      </div>

      <button class="carousel-btn left carousel-arrow--prev" aria-label="Anterior">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      
      <button class="carousel-btn right carousel-arrow--next" aria-label="Siguiente">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>

    <div class="carousel-dots">
      ${dotsHtml}
    </div>

    <div class="carousel-footer">
      <button class="carousel-btn-continue" id="carousel-continue">
        <span>Continuar</span>
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
      </button>
    </div>
</div>
    `;
  }

  renderSlide(slide, isActive = false) {
    const { icon = '', title = '', objective = '', contents = [] } = slide;

    const contentsHtml = contents
        .map(item => `<li class="carousel-content-item">${item}</li>`)
        .join('');

    return `
      <div class="carousel-slide ${isActive ? 'active' : ''}">
        
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
  }

  init() {
    const track = this.el.querySelector('.carousel-track');
    const prevBtn = this.el.querySelector('.carousel-arrow--prev');
    const nextBtn = this.el.querySelector('.carousel-arrow--next');
    const dots = this.el.querySelectorAll('.carousel-dot');
    const continueBtn = this.el.querySelector('#carousel-continue');
    const { slides = [] } = this.config;

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const index = (this.currentSlide - 1 + slides.length) % slides.length;
        this.goToSlide(index, track);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const index = (this.currentSlide + 1) % slides.length;
        this.goToSlide(index, track);
      });
    }

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const slideIndex = parseInt(dot.dataset.slide, 10);
        this.goToSlide(slideIndex, track);
      });
    });

    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        this.el.dispatchEvent(new CustomEvent('carousel-continue', { bubbles: true }));
      });
    }

    this.toggleContinueBtn(continueBtn, slides.length);
  }

  goToSlide(index, track) {
    const slides = this.el.querySelectorAll('.carousel-slide');
    const dots = this.el.querySelectorAll('.carousel-dot');
    const continueBtn = this.el.querySelector('#carousel-continue');
    const totalSlides = slides.length;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    this.currentSlide = index;
    slides[index].classList.add('active');
    dots[index].classList.add('active');

    if (track) {
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    this.toggleContinueBtn(continueBtn, totalSlides);
  }

  toggleContinueBtn(btn, total) {
    if (!btn) return;
    if (this.currentSlide === total - 1) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }
}