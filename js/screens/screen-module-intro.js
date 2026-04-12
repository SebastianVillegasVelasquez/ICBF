export function renderWelcome(route) {
  const {
    moduleTitle = "",
    introText = "",
    subText = "",
    isIntroduction = false,
  } = route;

  // Definimos qué imágenes mostrar
  const renderImages = () => {
    if (isIntroduction) {
      return `
        <div class="col-10 col-sm-8 col-md-5 col-lg-5 text-center hero-left">
            <img src="${window.resolvePath('assets/img/Bienvenidos-al-curso.png')}" class="img-fluid" alt="Bienvenidos al curso">
        </div>
        <div class="col-10 col-sm-8 col-md-5 col-lg-5 text-center hero-right">
            <img src="${window.resolvePath('assets/img/El-ecosistema-de-derechos.png')}" class="img-fluid" alt="El ecosistema de derechos">
        </div>`;
    } else {
      // Si no es introducción, solo la segunda imagen centrada
      return `
        <div class="col-10 col-sm-8 col-md-6 col-lg-5 text-center">
            <img src="${window.resolvePath('assets/img/El-ecosistema-de-derechos.png')}" class="img-fluid" alt="El ecosistema de derechos">
        </div>`;
    }
  };

  return `
<div class="welcome-hero container-fluid">

    <div class="row justify-content-center align-items-center g-4 g-lg-5 hero-top">
        ${renderImages()}
    </div>

    <div class="row justify-content-center mt-4 mt-lg-5 hero-center">
        <div class="col-12 col-md-10 col-lg-8 text-center">
            ${!isIntroduction ? `
                <p class="module-one">${moduleTitle}</p>
                <p class="hero-text">${introText}</p>
                <p class="hero-subtext">${subText}</p>
            ` : ''}

            <div class="button-wrapper">
                <div class="hero-bottom-content">
                    <button class="ingresar-btn btn-next-screen next-screen-clickable attention-pulse">
                        <span>Empezar</span>
                        <svg class="arrow-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19" stroke="#569e9a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 5L19 12L12 19" stroke="#569e9a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>

</div>
`;
}