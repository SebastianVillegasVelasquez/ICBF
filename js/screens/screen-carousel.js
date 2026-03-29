/**
 * screen-carousel.js
 * 
 * Carousel screen with 5 slides (one per module).
 * Each slide: icon + title + objective + contents list.
 * Dots pagination, left/right arrows, "Continuar" button.
 * 
 * Config shape:
 *   {
 *     slides: [
 *       {
 *         icon: "🏠",
 *         title: "Módulo 1",
 *         objective: "Objetivo del módulo...",
 *         contents: ["Contenido 1", "Contenido 2", ...]
 *       },
 *       ...
 *     ]
 *   }
 */

import { Screen } from './screen-base.js';

export class CarouselScreen extends Screen {
  constructor(config = {}) {
    super(config);
    this.currentSlide = 0;
  }

  render() {
    const { slides = [] } = this.config;

    if (slides.length === 0) {
      return '<div class="screen screen-carousel"><p>No slides available</p></div>';
    }

    const dotsHtml = slides
      .map((_, i) => `<button class="carousel-dot ${i === 0 ? 'active' : ''}" data-slide="${i}" aria-label="Slide ${i + 1}"></button>`)
      .join('');

    const slidesHtml = slides
      .map((slide, i) => this.renderSlide(slide, i === 0))
      .join('');

    return `
      <div class="screen screen-carousel">
        <!-- Carousel container -->
        <div class="carousel-wrapper">
          <!-- Slides -->
          <div class="carousel-slides">
            ${slidesHtml}
          </div>

          <!-- Navigation arrows -->
          <button class="carousel-arrow carousel-arrow--prev" aria-label="Anterior slide">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
          </button>
          <button class="carousel-arrow carousel-arrow--next" aria-label="Siguiente slide">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
          </button>
        </div>

        <!-- Dots pagination -->
        <div class="carousel-dots">
          ${dotsHtml}
        </div>

        <!-- Call to action -->
        <div class="carousel-footer">
          <button class="carousel-btn-continue" id="carousel-continue">
            Continuar
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
          </button>
        </div>
      </div>
    `;
  }

  renderSlide(slide, isActive = false) {
    const { icon = '●', title = '', objective = '', contents = [] } = slide;

    const contentsHtml = contents
      .map(item => `<li class="carousel-content-item">${item}</li>`)
      .join('');

    return `
      <div class="carousel-slide ${isActive ? 'active' : ''}" data-slide-index="${this.currentSlide}">
        <div class="carousel-slide-icon">${icon}</div>
        <h3 class="carousel-slide-title">${title}</h3>
        <p class="carousel-slide-objective">${objective}</p>
        ${contents.length > 0 ? `<ul class="carousel-slide-contents">${contentsHtml}</ul>` : ''}
      </div>
    `;
  }

  init() {
    const prevBtn = this.el.querySelector('.carousel-arrow--prev');
    const nextBtn = this.el.querySelector('.carousel-arrow--next');
    const dots = this.el.querySelectorAll('.carousel-dot');
    const continueBtn = this.el.querySelector('#carousel-continue');
    const { slides = [] } = this.config;

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.goToSlide((this.currentSlide - 1 + slides.length) % slides.length));
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.goToSlide((this.currentSlide + 1) % slides.length));
    }

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const slideIndex = parseInt(dot.dataset.slide, 10);
        this.goToSlide(slideIndex);
      });
    });

    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        console.log('[carousel] Continue button clicked');
        // Trigger navigation in app.js (via custom event or callback)
        this.el.dispatchEvent(new CustomEvent('carousel-continue', { detail: { slideIndex: this.currentSlide } }));
      });
    }
  }

  goToSlide(index) {
    const slides = this.el.querySelectorAll('.carousel-slide');
    const dots = this.el.querySelectorAll('.carousel-dot');

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    this.currentSlide = index;
    slides[index].classList.add('active');
    dots[index].classList.add('active');
  }

  destroy() {
    // Clean up event listeners if needed
  }
}
