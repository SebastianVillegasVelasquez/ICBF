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

    <div class="screen-header d-flex justify-content-between align-items-center">
      <div class="header-logo-wrapper">
        <img src="${window.resolvePath('assets/img/El-ecosistema-de-derechos.png')}" alt="Logo" class="screen-logo" />
      </div>
      <div class="header-illustration-wrapper">
        <img src="${window.resolvePath('assets/img/logo.png')}" alt="Ecosistema" class="screen-illustration" />
      </div>
    </div>

    <div class="video-layout container-fluid">
      <div class="row justify-content-center w-100">
        <div class="col-11 col-lg-10 video-center">
          <div class="video-wrapper">
            <img class="video-placeholder-img" src="${window.resolvePath('assets/img/video-plantilla.png')}" alt="video-plantilla">
          </div>
        </div>
      </div>
    </div>

  </div>
`;
}

