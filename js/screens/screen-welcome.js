/**
 * screen-welcome.js
 *
 * Pantalla de bienvenida al módulo.
 * Función pura: recibe la config del route, devuelve HTML string.
 *
 * Campos en course.config.js (dentro del screen):
 *   courseTitle  : Nombre del curso
 *   moduleNumber : Número del módulo
 *   moduleTitle  : Título del módulo
 *   introText    : Texto introductorio
 */

export function renderWelcome(route) {
  const {
    courseTitle  = 'Curso',
    moduleNumber = 1,
    moduleTitle  = 'Módulo',
    introText    = '',
  } = route;

  return {
    layout:'full',
    'html':`
    <div class="screen screen-welcome">

      <div class="welcome-top">
        <div class="welcome-left">
          <p class="welcome-message">Bienvenido</p>
        </div>

        <div class="welcome-right">
          <h1 class="welcome-course-title">${courseTitle}</h1>
        </div>
      </div>

      <div class="welcome-center">
        <p class="welcome-tag">Módulo ${moduleNumber}</p>
        <h2 class="welcome-module-title">${moduleTitle}</h2>
        <p class="welcome-intro-text">${introText}</p>
      </div>

    </div>
  `
}
}
