export function renderPostIntro(route) {
    const {
        moduleTitle = "",
        introText = "",
        subText = "",
        topics = [],
        waveFooterColor = '#e8c208',
        // Capturamos ambas posibles fuentes de datos
        characterImageConfig = {},
        GraphicResources = {}
    } = route;

    // 1. Extraemos la URL (Prioridad al diccionario directo, luego a GraphicResources)
    const characterUrl = characterImageConfig.url || GraphicResources.characterUrl;

    // 2. Extraemos la configuración (Mezclamos para que siempre haya datos)
    const char = {...GraphicResources.characterConfig, ...characterImageConfig};
    const res = char.responsive || {};

    // 3. Logos
    const logoRight = GraphicResources.headerLogos?.rightUrl || 'assets/img/logo.png';

    // 4. Construcción de Variables CSS dinámicas
    const charVars = characterUrl ? `
        --char-x:         ${char.xOffset || '0px'};
        --char-y:         ${char.yOffset || '0px'};
        --char-scale:     ${char.scale || 1};
        --char-mw:        ${char.maxWidth || '500px'};
        --char-side:      ${char.side === 'right' ? 'right: 0;' : 'left: 0;'};

        --char-x-res:     ${res.xOffset || char.xOffset || '0px'};
        --char-y-res:     ${res.yOffset || char.yOffset || '0px'};
        --char-scale-res: ${res.scale || char.scale || 0.85};
        --char-mw-res:    ${res.maxWidth || char.maxWidth || '400px'};
    ` : '';

    return `
<div class="screen-module-summary container-fluid" style="${charVars}">
    <div class="row summary-container align-items-center">
        
        <div class="col-12 col-lg-7 summary-left">
            <div class="header-left">
                <h1 class="mod-number">${moduleTitle}</h1>
                <h2 class="mod-title">${introText}</h2>
                <h3 class="mod-subtitle">${subText}</h3>
            </div>

            ${characterUrl ? `
            <div class="character-container">
                <img src="${window.resolvePath(characterUrl)}" class="post-character" alt="Personaje">
            </div>` : ''}
        </div>

        <div class="col-12 col-lg-5 summary-right">
            <div class="icbf-logo">
                <img src="${window.resolvePath(logoRight)}" class="img-fluid" alt="Logo">
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
                <button class="ingresar-btn-intro btn-next-screen next-screen-clickable">
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