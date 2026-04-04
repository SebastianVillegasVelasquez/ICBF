/**
 * progress-bar.js
 * Barra de progreso inyectable como singleton global.
 */

class ProgressBar {
  constructor() {
    // Referencias DOM — se asignan en renderTo()
    this._fillEl       = null;
    this._arrowEl      = null;
    this._percentageEl = null;
    this._mounted      = false;

    // Estado
    this.currentPercentage = 0;
  }

  /**
   * Inyecta el HTML de la barra en un elemento contenedor dado.
   * Llamar esto ANTES de update().
   * @param {HTMLElement} containerEl
   */
  renderTo(containerEl) {
    if (!containerEl) return;

    // Sin wrapper intermedio — los elementos van directo al target
    containerEl.innerHTML = `
      <div class="progress-bar-percentage">0%</div>
      <div class="progress-bar-track">
        <div class="progress-bar-fill"></div>
      </div>
    `;

    // El target mismo actúa como wrapper
    containerEl.classList.add('progress-bar-wrapper');

    this._fillEl       = containerEl.querySelector('.progress-bar-fill');
    this._percentageEl = containerEl.querySelector('.progress-bar-percentage');
    this._arrowEl      = null;
    this._mounted      = true;
  }
  /**
   * Actualiza el progreso.
   * @param {number} currentIndex  - Índice actual (0-based)
   * @param {number} totalRoutes   - Total de pantallas
   * @param {Set}    visitedSet    - Conjunto de índices visitados
   * @returns {number} Porcentaje calculado
   */
  update(currentIndex, totalRoutes, visitedSet) {
    if (!this._mounted) return 0;

    const pct = totalRoutes > 0
        ? Math.round((visitedSet.size / totalRoutes) * 100)
        : 0;

    this._percentageEl.textContent = `${pct}%`;
    this._fillEl.style.width = `${pct}%`;

    this.currentPercentage = pct;
    return pct;
  }

  /**
   * Desmonta la barra — llamar cuando navegas a pantalla sin barra.
   * Limpia referencias para que update() no intente escribir en DOM viejo.
   */
  unmount() {
    this._fillEl       = null;
    this._arrowEl      = null;
    this._percentageEl = null;
    this._mounted      = false;
  }

  getPercentage() {
    return this.currentPercentage;
  }
}

export const progressBar = new ProgressBar();
export { ProgressBar };