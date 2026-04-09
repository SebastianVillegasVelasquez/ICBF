export function renderPostIntro(route) {
    const {
        moduleTitle = "",
        introText = "",
        subText = "",
        percentage = 0,
        topics = [],
        waveFooterColor = '#e8c208',
        GraphicResources = {}
    } = route;

    const {
        characterUrl,
        characterConfig,
        headerLogos
    } = GraphicResources;

    // ── Logos con fallback ──
    const logoRight = headerLogos?.rightUrl || 'assets/img/logo.png';

    // ── Variables CSS del personaje ──
    const char = characterConfig || {};
    const res  = char.responsive || {};

    const charVars = characterUrl ? `
        --char-x:         ${char.xOffset   || '0px'};
        --char-y:         ${char.yOffset   || '0px'};
        --char-scale:     ${char.scale     || 1};
        --char-mw:        ${char.maxWidth  || '100%'};

        --char-x-res:     ${res.xOffset    || char.xOffset  || '0px'};
        --char-y-res:     ${res.yOffset    || char.yOffset  || '0px'};
        --char-scale-res: ${res.scale      || char.scale    || 0.85};
        --char-mw-res:    ${res.maxWidth   || char.maxWidth || '80%'};
    ` : '';

    return `
<div class="screen-module-summary container-fluid" style="${charVars}">
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

            ${characterUrl ? `
            <div class="ecosystem-illustration">
                <img src="${window.resolvePath(characterUrl)}" class="img-fluid post-character" alt="Ilustración">
            </div>` : ''}
        </div>

        <div class="col-12 col-lg-5 summary-right">
            <div class="icbf-logo">
                <img src="${window.resolvePath(logoRight)}" class="img-fluid" alt="Bienestar Familiar">
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e8c208" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    </div>
    <div class="yellow-wave-footer" style="background: ${waveFooterColor}"></div>
</div>
`;
}