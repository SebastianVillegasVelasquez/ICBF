export function renderWelcome(route) {
  const {
    moduleTitle = "",
    introText = "",
    subText=""
  } = route;

  return `
<div class="welcome-hero">

    <div class="hero-top">
        <div class="hero-left">
            <img src="/assets/img/Bienvenidos-al-curso.png" alt="Bienvenidos al curso">
        </div>
        <div class="hero-right">
            <img src="/assets/img/El-ecosistema-de-derechos.png" alt="El ecosistema de derechos">
        </div>
    </div>

    <div class="hero-center">
        <p class="module-one">${moduleTitle}</p>
        <p class="hero-text">${introText}</p>
        <p class="hero-subtext">${subText}</p>
        <div class="hero-progress-wrapper">
            <div class="progress-bar-chevron">
                <div class="progress-bar-fill"></div>
                <div class="progress-bar-percentage">20%</div>
                <div class="progress-bar-arrow"></div>
            </div>
        </div>
    </div>



</div>
  `
}

