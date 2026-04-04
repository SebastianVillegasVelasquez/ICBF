/**
 * screen-video.js
 *
 * Pantalla de video AUTOSUFICIENTE.
 * - Provee su propio logo + ilustraciones
 * - NO depende de layout.html global
 * - Función pura: recibe config, devuelve HTML string
 *
 * Campos en course.config.js:
 *   videoUrl       : URL del video
 *   characterName  : Nombre del personaje
 *   subtitle       : Descripción/subtítulo
 *   hideNav        : true si debe ocultar la píldora
 */

export function renderVideo(route) {
  const {
    videoUrl       = '',
    characterName  = '',
    subtitle       = '',
    hideNav        = false,
  } = route;

  // Logo local para esta pantalla
  const logoPath = window.resolvePath('assets/img/logo.png');

  return `
    <div class="screen screen-video">

      <!-- Logo local de esta pantalla -->
      <div class="screen-header">
        <img src="${logoPath}" alt="Logo" class="screen-logo" />
      </div>

      <!-- Contenido principal -->
      <div class="video-layout">

        <div class="video-center">

          <div class="video-wrapper">
            <img class="video-placeholder-img" src="${window.resolvePath('assets/img/video-plantilla.png')}" alt="video-plantilla">
          </div>

          <!-- Metadata del video -->
          ${characterName || subtitle ? `
            <div class="video-info-drawer">
              <div class="video-info-content">
                ${characterName ? `<h3 class="video-character-name">${characterName}</h3>` : ''}
                ${subtitle ? `<p class="video-subtitle">${subtitle}</p>` : ''}
              </div>
            </div>
          ` : ''}

        </div>

      </div>

    </div>
  `;
}

