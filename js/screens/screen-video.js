/**
 * screen-video.js
 *
 * Pantalla de video.
 * Función pura: recibe la config del route, devuelve HTML string.
 * Los controles son nativos del navegador (play, pausa, volumen, pantalla completa).
 *
 * Campos en course.config.js (dentro del screen):
 *   videoUrl       : URL del video (.mp4 o embed)
 *   characterName  : Nombre del personaje que habla (debajo del video)
 *   subtitle       : Subtítulo o descripción
 *   characterLeft  : Placeholder personaje izquierdo
 *   characterRight : Placeholder personaje derecho
 */

export function renderVideo(route) {
  const {
    videoUrl       = '',
    characterName  = '',
    subtitle       = '',
    characterLeft  = 'Ayla',
    characterRight = 'Simón',
  } = route;

  return `
    <div class="screen screen-video">

      <div class="video-layout">

        <div class="video-center">

          <div class="video-wrapper">
            <img class="video-placeholder-img" src="/assets/img/video-plantilla.png" alt="video-plantilla">
          </div>
            
          <!-- Video player 
          <div class="video-info-drawer">
            <div class="video-info-content">
              ${characterName ? `<h3 class="video-character-name">${characterName}</h3>` : ''}
              ${subtitle      ? `<p  class="video-subtitle">${subtitle}</p>`              : ''}
            </div>
          </div>-->

        </div>

        </div>

    </div>
  `;
}
