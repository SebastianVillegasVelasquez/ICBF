/**
 * screen-video.js
 * 
 * Pantalla de reproductor de video.
 * - Reproductor video 16:9 centrado con controles básicos (play/pausa, volumen, pantalla completa)
 * - Debajo: nombre del personaje + subtítulo
 * - Laterales: sugerencia de ilustraciones de personajes (Ayla y Simón)
 * - Solo tiene menú de navegación (pill-nav)
 * 
 * Config:
 *   {
 *     videoUrl: "https://...",
 *     videoTitle: "Título",
 *     characterName: "Nombre del Personaje",
 *     subtitle: "Subtítulo o descripción",
 *     characterLeft: "Ayla",
 *     characterRight: "Simón"
 *   }
 */

import { Screen } from './screen-base.js';

export class VideoScreen extends Screen {
  render() {
    const {
      videoUrl = '',
      videoTitle = 'Reproductor de Video',
      characterName = 'Personaje',
      subtitle = 'Subtítulo',
      characterLeft = 'Ayla',
      characterRight = 'Simón'
    } = this.config;

    return `
      <div class="screen screen-video">
        <!-- Contenedor principal con laterales de personajes -->
        <div class="video-main-wrapper">
          
          <!-- Personaje izquierdo (sugerencia) -->
          <div class="video-character-side video-character-left">
            <div class="character-placeholder">${characterLeft}</div>
          </div>

          <!-- Centro: Reproductor de video -->
          <div class="video-center-content">
            <!-- Contenedor de video 16:9 -->
            <div class="video-container">
              <div class="video-wrapper">
                <video
                  class="video-player"
                  controls
                  controlsList="nodownload"
                  poster
                >
                  <source src="${videoUrl}" type="video/mp4">
                  Tu navegador no soporta video HTML5.
                </video>
              </div>
            </div>

            <!-- Información del video: nombre del personaje + subtítulo -->
            <div class="video-info">
              <h3 class="video-character-name">${characterName}</h3>
              <p class="video-subtitle">${subtitle}</p>
            </div>

            <!-- Título del video (opcional) -->
            <div class="video-meta">
              <span class="video-title">${videoTitle}</span>
            </div>
          </div>

          <!-- Personaje derecho (sugerencia) -->
          <div class="video-character-side video-character-right">
            <div class="character-placeholder">${characterRight}</div>
          </div>

        </div>
      </div>
    `;
  }

  init() {
    // Controles nativos de HTML5 video
    const video = this.el.querySelector('.video-player');
    if (video) {
      video.addEventListener('play', () => {
        console.log('[video] Reproduciendo');
      });
      video.addEventListener('pause', () => {
        console.log('[video] Pausado');
      });
    }
  }
}
