export function renderPostIntro(route) {
    const {
        moduleTitle = "",
        introText = "",
        subText = "",
        elements: [] = []
    } = route;

    return `
<div class="screen-module-summary container-fluid">

    <div class="row summary-container align-items-center">

        <div class="col-12 col-lg-7 summary-left">
            <div class="header-left">
                <h1 class="mod-number">${moduleTitle}</h1>
                <h2 class="mod-title">${introText}</h2>
                <h3 class="mod-subtitle">${subText}</h3>
                <div class="progress-bar-chevron">
                    <div class="progress-bar-percentage">20%</div>
                    <div class="progress-bar-fill" style="width: 80%;"></div>
                    <div class="progress-bar-arrow"></div>
                </div>
            </div>

            <div class="ecosystem-illustration">
                <img src="${window.resolvePath('assets/img/El-ecosistema-de-derechos.png')}" class="img-fluid" alt="El ecosistema de los derechos humanos">
            </div>
        </div>

        <div class="col-12 col-lg-5 summary-right">
            <div class="icbf-logo">
                <img src="${window.resolvePath('assets/img/logo.png')}" class="img-fluid" alt="Bienestar Familiar">
            </div>

            <ul class="topics-list">
    <li>
        <span>Derechos humanos</span>
        <div class="search-box">
            <img src="${window.resolvePath('assets/img/lupa.png')}" alt="Buscar">
        </div>
    </li>

    <li>
        <span>Igualdad y no discriminación</span>
        <div class="search-box">
            <img src="${window.resolvePath('assets/img/lupa.png')}" alt="Buscar">
        </div>
    </li>

    <li>
        <span>Derecho internacional humanitario</span>
        <div class="search-box">
            <img src="${window.resolvePath('assets/img/lupa.png')}" alt="Buscar">
        </div>
    </li>

  
</ul>

            <div class="button-wrapper">
                <button class="ingresar-btn btn-next-screen">
                    <span>Ingresar</span>
                    <div class="arrow-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e8c208" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </div>
                </button>
            </div>
        </div>

    </div>

    <div class="yellow-wave-footer"></div>
</div>
  `
}