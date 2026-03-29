/**
 * screen-welcome.js
 * 
 * Pantalla de bienvenida al módulo.
 * - Arriba: Mensaje de bienvenida + nombre del curso
 * - Centro: Título del módulo + texto introductorio + indicador de progreso
 * - Diseño limpio, sin elementos gráficos
 * 
 * Config:
 *   {
 *     courseTitle: "Ley 1257",
 *     moduleNumber: 1,
 *     moduleTitle: "Introducción",
 *     introText: "Bienvenido...",
 *     progressPercent: 25
 *   }
 */

import { Screen } from './screen-base.js';

export class WelcomeScreen extends Screen {
  render() {
    const {
      courseTitle = 'Curso ICBF',
      moduleNumber = 1,
      moduleTitle = 'Módulo',
      introText = 'Bienvenido a este módulo.',
      progressPercent = 0
    } = this.config;

    return `
      <div class="screen screen-welcome">
        <!-- Parte superior: Mensaje de bienvenida + nombre del curso -->
        <div class="welcome-header">
          <p class="welcome-greeting">Bienvenido al Módulo ${moduleNumber}</p>
          <h1 class="welcome-course-title">${courseTitle}</h1>
        </div>

        <!-- Centro: Título del módulo + texto + progreso -->
        <div class="welcome-body">
          <h2 class="welcome-module-title">${moduleTitle}</h2>
          <p class="welcome-intro-text">${introText}</p>
          
          <!-- Indicador de progreso del curso -->
          <div class="welcome-progress-section">
            <label class="progress-label">Progreso del curso</label>
            <div class="progress-indicator">
              <div class="progress-indicator-fill" style="width: ${progressPercent}%"></div>
            </div>
            <span class="progress-percentage">${progressPercent}%</span>
          </div>
        </div>

        <!-- Footer: Instrucción de navegación -->
        <div class="welcome-footer">
          <p class="welcome-instruction">Haz clic en "Adelante" para continuar</p>
        </div>
      </div>
    `;
  }

  init() {
    // No hay interactividad específica - el menú de navegación (pill-nav) maneja la progresión
  }
}
