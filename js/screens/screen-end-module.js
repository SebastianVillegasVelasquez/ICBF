// 🔹 1. RENDER
export function renderModuleEnd(route) {
    const {
        moduleTitle = "",
        introText = "",
        subText="",
        percentage = 0
    } = route;

    return `
<div class="welcome-hero container-fluid">

    <div class="row justify-content-center align-items-center g-4 g-lg-5 hero-top">
        <div class="col-10 col-sm-8 col-md-5 col-lg-5 text-center hero-left">
            <img src="${window.resolvePath('assets/img/lo-lograste.png')}" class="img-fluid" alt="Lo lograste">
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

            <!-- 🔥 BOTONES -->
            <div class="module-actions mt-4 d-flex flex-column flex-sm-row justify-content-center gap-3">

                <button data-action="next"  class="btn-module btn-next">
                    Siguiente módulo
                </button>

                <button data-action="prev" class="btn-module btn-back">
                    Volver
                </button>

                <button class="download-mod-btn">
                    <div class="download-icon-circle">
<svg id="Capa_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.37 23.26"><g id="FINAL"><path d="M9.62,13.86c-.64,0-1.24-.3-1.63-.8L.43,3.33C-.27,2.43-.1,1.13.8.43,1.7-.27,3-.1,3.7.8l5.92,7.63L15.53.8c.7-.9,2-1.07,2.9-.37.9.7,1.07,2,.37,2.9l-7.55,9.73c-.39.5-.99.8-1.63.8Z" fill="#fedb02"/><path d="M17.3,23.26H2.07C.92,23.26,0,22.33,0,21.19s.92-2.07,2.07-2.07h15.24c1.14,0,2.07.92,2.07,2.07s-.92,2.07-2.07,2.07Z" fill="#fedb02"/></g></svg>                    </div>
                    <span>Descarga el módulo<br>completo aquí</span>
                </button>

            </div>
            
        </div>
    </div>

</div>
`;
}