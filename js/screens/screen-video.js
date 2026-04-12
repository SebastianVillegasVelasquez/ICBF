export function renderVideo(route) {
  const { videoUrl = '' } = route;

  // Ruta del marco, inyectada dinámicamente
  const marcoPath = window.resolvePath('assets/img/marco-video.png');

  return `
  <div class="screen screen-video">

    <header class="screen-header">
        <img src="${window.resolvePath('assets/img/El-ecosistema-de-derechos.png')}" alt="Logo Izquierdo" class="screen-logo" />
        <img src="${window.resolvePath('assets/img/logo.png')}" alt="Logo Derecho" class="screen-illustration" />
    </header>

    <div class="video-layout">
      <div class="video-center">
          <div class="video-frame-container" style="--frame: url('${marcoPath}');">
          
          <div class="video-wrapper">
            <video src="${videoUrl}" controls class="main-video"></video>
          </div>
          
        </div>
      </div>
    </div>

  </div>
`;
}