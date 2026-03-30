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

        <!-- Personaje izquierdo -->
        <div class="video-character-side">
          <div class="character-placeholder">${characterLeft}</div>
        </div>

        <!-- Video + info -->
        <div class="video-center">

          <div class="video-wrapper">
            <video class="video-player" controls controlsList="nodownload">
              <source src="${videoUrl}" type="video/mp4">
              Tu navegador no soporta video HTML5.
            </video>
          </div>

          <div class="video-info">
            ${characterName ? `<h3 class="video-character-name">${characterName}</h3>` : ''}
            ${subtitle      ? `<p  class="video-subtitle">${subtitle}</p>`              : ''}
          </div>

        </div>

        <!-- Personaje derecho -->
        <div class="video-character-side">
          <div class="character-placeholder">${characterRight}</div>
        </div>

      </div>

    </div>
  `
}
