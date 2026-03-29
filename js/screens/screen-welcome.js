/**
 * screen-welcome.js
 * 
 * Module welcome screen.
 * Shows: welcome message + course title (top), module title + intro text + progress (center)
 * Clean, no graphics.
 * 
 * Config shape:
 *   {
 *     courseTitle: "Curso ICBF",
 *     moduleNumber: 1,
 *     moduleTitle: "Inicio y Generalidades",
 *     introText: "Bienvenido al primer módulo...",
 *     progressPercent: 0
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
        <!-- Top: Welcome message + course title -->
        <div class="welcome-header">
          <p class="welcome-greeting">Bienvenido al Módulo ${moduleNumber}</p>
          <h1 class="welcome-course">${courseTitle}</h1>
        </div>

        <!-- Center: Module title + intro + progress -->
        <div class="welcome-body">
          <h2 class="welcome-module-title">${moduleTitle}</h2>
          <p class="welcome-intro">${introText}</p>
          
          <div class="welcome-progress">
            <span class="progress-label">Progreso del curso</span>
            <div class="progress-bar-mini">
              <div class="progress-bar-mini-fill" style="width: ${progressPercent}%"></div>
              <span class="progress-bar-mini-text">${progressPercent}%</span>
            </div>
          </div>
        </div>

        <!-- Footer: Call to action or instructions -->
        <div class="welcome-footer">
          <p class="welcome-cta">Haz clic en "Adelante" para comenzar</p>
        </div>
      </div>
    `;
  }

  init() {
    // No interactivity needed, navigation buttons in pill-nav handle progression
  }
}
