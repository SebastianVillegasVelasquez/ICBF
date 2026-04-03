export function renderPostIntro(route) {
    const {
        moduleTitle = "",
        introText = "",
        subText = ""
    } = route;

    return `
<div class="screen-module-summary">

    <div class="summary-container">

        <div class="summary-left">
            <div class="header-left">
                <h1 class="mod-number">${moduleTitle}</h1>
                <h2 class="mod-title">${introText}</h2>
                <h3 class="mod-subtitle">${subText}</h3>
                <div class="progress-bar-chevron">
                    <div class="progress-bar-percentage">80%</div>
                    <div class="progress-bar-fill" style="width: 80%;"></div>
                    <div class="progress-bar-arrow"></div>
                </div>
            </div>



            <div class="ecosystem-illustration">
                <img src="assets/img/El-ecosistema-de-derechos.png" alt="El ecosistema de los derechos humanos">
            </div>
        </div>

        <div class="summary-right">
            <div class="icbf-logo">
                <img src="assets/img/logo.png" alt="Bienestar Familiar">
            </div>

            <ul class="topics-list">
                <li><span>Derechos de mujeres y niñas</span> <div class="search-box">🔍</div></li>
                <li><span>Derechos de niños, niñas y adolescentes</span> <div class="search-box">🔍</div></li>
                <li><span>Derechos de la comunidad LGBTIQ+</span> <div class="search-box">🔍</div></li>
                <li><span>Derechos de pueblos y comunidades indígenas</span> <div class="search-box">🔍</div></li>
                <li><span>Derechos de las personas migrantes y refugiadas</span> <div class="search-box">🔍</div></li>
                <li><span>Personas con discapacidad y personas mayores</span> <div class="search-box">🔍</div></li>
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