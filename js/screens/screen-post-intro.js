export function renderPostIntro(route) {
    const {
        moduleTitle = "",
        introText = "",
        subText = "",
        percentage = 0,
        topics = [],
        characterImageConfig = {
            url: "",
            size: ""
        },
        waveFooterColor = '#e8c208'
    } = route;

    return `
<div class="screen-module-summary container-fluid">
    <div class="row summary-container align-items-center">
        <div class="col-12 col-lg-7 summary-left">
            <div class="header-left">
                <h1 class="mod-number">${moduleTitle}</h1>
                <h2 class="mod-title">${introText}</h2>
                <h3 class="mod-subtitle">${subText}</h3>
                
                <div class="hero-progress-wrapper">
                    <div class="progress-bar-percentage">${percentage}%</div>
                    <div class="progress-bar-track">
                        <div class="progress-bar-fill" style="width: ${percentage}%"></div>
                    </div>
                </div>
            </div>

            <div class="ecosystem-illustration">
                <img src="${window.resolvePath(characterImageConfig.url)}" class="img-fluid" alt="Ilustración">
            </div>
        </div>

        <div class="col-12 col-lg-5 summary-right">
            <div class="icbf-logo">
                <img src="${window.resolvePath('assets/img/logo.png')}" class="img-fluid" alt="Bienestar Familiar">
            </div>

            <ul class="topics-list">
                ${topics.map(topic => `
                    <li>
                        <span>${topic}</span>
                        <div class="search-box">
                            <img src="${window.resolvePath('assets/img/lupa.png')}" alt="Buscar">
                        </div>
                    </li>
                `).join('')}
            </ul>

            <div class="button-wrapper-post">
                <button class="ingresar-btn-intro btn-next-screen">
                    <span>Ingresar</span>
                    <div class="arrow-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e8c208" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </div>
                </button>

                <!-- <button class="download-mod-btn">
                    <div class="download-icon-circle">
<svg id="Capa_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.37 23.26"><g id="FINAL"><path d="M9.62,13.86c-.64,0-1.24-.3-1.63-.8L.43,3.33C-.27,2.43-.1,1.13.8.43,1.7-.27,3-.1,3.7.8l5.92,7.63L15.53.8c.7-.9,2-1.07,2.9-.37.9.7,1.07,2,.37,2.9l-7.55,9.73c-.39.5-.99.8-1.63.8Z" fill="#fedb02"/><path d="M17.3,23.26H2.07C.92,23.26,0,22.33,0,21.19s.92-2.07,2.07-2.07h15.24c1.14,0,2.07.92,2.07,2.07s-.92,2.07-2.07,2.07Z" fill="#fedb02"/></g></svg>                    </div>
                    <span>Descarga el módulo<br>completo aquí</span>
                </button> -->
            </div>
        </div>
    </div>
    <div class="yellow-wave-footer" style="background: ${waveFooterColor}"></div>
</div>
`;
}