export function renderWelcome(route) {
  const {
    moduleTitle = "",
    introText = "",
    subText = "",
    percentage = 0,
  } = route;

  const isModuleOne = /1/.test(moduleTitle);

  return `
<div class="welcome-hero container-fluid">

    <div class="row justify-content-center align-items-center g-4 g-lg-5 hero-top">
        ${isModuleOne ? `
        <div class="col-10 col-sm-8 col-md-5 col-lg-5 text-center hero-left">
            <img src="${window.resolvePath('assets/img/Bienvenidos-al-curso.png')}" class="img-fluid" alt="Bienvenidos al curso">
        </div>` : ''}
        <div class="col-10 col-sm-8 ${isModuleOne ? 'col-md-5 col-lg-5' : 'col-md-6 col-lg-5'} text-center hero-right">
            <img src="${window.resolvePath('assets/img/El-ecosistema-de-derechos.png')}" class="img-fluid" alt="El ecosistema de derechos">
        </div>
    </div>

    <div class="row justify-content-center mt-4 mt-lg-5 hero-center">
        <div class="col-12 col-md-10 col-lg-8 text-center">
            <p class="module-one">${moduleTitle}</p>
            <p class="hero-text">${introText}</p>
            <p class="hero-subtext">${subText}</p>

            <div class="hero-progress-wrapper">
                <div class="progress-bar-percentage">${percentage}%</div>
                <div class="progress-bar-track">
                    <div class="progress-bar-fill" data-percentage="${percentage}"></div>
                </div>
            </div>

            <div class="button-wrapper">
                <div class="col-12 col-md-10 col-lg-8 text-center">
                    <div class="hero-bottom-content">
                        <button class="ingresar-btn btn-next-screen next-screen-clickable">Empezar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
`;
}