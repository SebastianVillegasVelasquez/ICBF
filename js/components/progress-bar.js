/**
 * progress-bar.js
 *
 * Módulo independiente para la barra de progreso.
 * - Estado global pero inyectable
 * - Se monta/desmonta donde sea necesario
 * - No depende de index.html (aunque por defecto renderiza en .progress-bar-container)
 */

class ProgressBar {
  constructor(containerSelector = '.progress-bar-container') {
    this.containerSelector = containerSelector;
    this.container = null;
    this.chevron = null;
    this.percentageEl = null;
    this.fillEl = null;
    this.arrowEl = null;
    this.currentPercentage = 0;
    this._init();
  }

  _init() {
    this.container = document.querySelector(this.containerSelector);
    if (!this.container) {
      console.warn(`[ProgressBar] Contenedor no encontrado: ${this.containerSelector}`);
      return;
    }

    this.chevron = this.container.querySelector('#progress-chevron');
    this.percentageEl = this.container.querySelector('#progress-percentage');
    this.fillEl = this.container.querySelector('.progress-bar-fill');
    this.arrowEl = this.container.querySelector('.progress-bar-arrow');
  }

  /**
   * Actualiza el progreso basado en índice actual y total
   * @param {number} currentIndex - Índice actual (0-based)
   * @param {number} totalRoutes - Total de pantallas
   * @param {Set} visitedSet - Conjunto de índices visitados
   * @returns {number} Porcentaje calculado
   */
  update(currentIndex, totalRoutes, visitedSet) {
    // Re-buscar elementos por si se montaron después
    if (!this.percentageEl) this._init();

    // Matemática: empezar en 20% y repartir el 80% restante
    const basePct = 20;
    const avanceReal = visitedSet.size / totalRoutes;
    const pct = basePct + Math.round(avanceReal * (100 - basePct));

    // Aplicar cambios solo si los elementos existen
    if (this.percentageEl) this.percentageEl.textContent = `${pct}%`;
    if (this.fillEl) this.fillEl.style.width = `${pct}%`;
    if (this.arrowEl) this.arrowEl.style.left = `${pct}%`;

    this.currentPercentage = pct;
    return pct;
  }

  /**
   * Obtiene el porcentaje actual
   * @returns {number}
   */
  getPercentage() {
    return this.currentPercentage;
  }

  /**
   * Monta la barra en un contenedor específico
   * @param {string} selector - Selector CSS del contenedor
   */
  mount(selector) {
    this.containerSelector = selector;
    this._init();
  }

  /**
   * Desmonta la barra (oculta el contenedor)
   */
  unmount() {
    if (this.container) {
      this.container.style.display = 'none';
    }
  }

  /**
   * Muestra la barra
   */
  show() {
    if (this.container) {
      this.container.style.display = 'block';
    }
  }

  /**
   * Renderiza la barra en un contenedor personalizado
   * Útil si necesitas mover la barra a otra ubicación dinámicamente
   * @param {HTMLElement} containerEl - Elemento DOM donde inyectar
   * @returns {void}
   */
  renderTo(containerEl) {
    if (!containerEl) return;

    const html = `
      <div class="progress-bar-chevron" id="progress-chevron">
        <div class="progress-bar-fill"></div>
        <div class="progress-bar-percentage" id="progress-percentage">0%</div>
        <div class="progress-bar-arrow"></div>
      </div>
    `;
    containerEl.innerHTML = html;
    this.container = containerEl;
    this._init();
  }
}

// Singleton global
export const progressBar = new ProgressBar();

export { ProgressBar };

