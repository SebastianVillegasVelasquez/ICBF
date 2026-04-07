export function renderScreenContentDefault(route) {
    const {
        contentHtml = "",
        hideBackground = false,
        GraphicResources = {}
    } = route;

    const {
        backgroundUrl,
        backgroundConfig,
        characterUrl,
        characterConfig,
        headerLogos
    } = GraphicResources;

    // 1. Logos del Header (con fallback por si no vienen en el dict)
    const logoLeft = headerLogos?.leftUrl || 'assets/img/El-ecosistema-de-derechos.png';
    const logoRight = headerLogos?.rightUrl || 'assets/img/logo.png';

    // 2. Procesamiento de Variables CSS para el Personaje (Normal y Responsive)
    const char = characterConfig || {};
    const res = char.responsive || {};
    const side = char.side === 'left' ? 'left' : 'right';

    const charVars = `
        --char-side: ${side};
        --char-x: ${char.xOffset || '0px'};
        --char-y: ${char.yOffset || '0px'};
        --char-scale: ${char.scale || 1};
        --char-mw: ${char.maxWidth || '450px'};
        
        --char-x-res: ${res.xOffset || char.xOffset || '0px'};
        --char-y-res: ${res.yOffset || char.yOffset || '0px'};
        --char-scale-res: ${res.scale || char.scale || 0.8};
        --char-mw-res: ${res.maxWidth || char.maxWidth || '350px'};
    `;

    // 3. Estilo de Fondo
    let dynamicBgStyle = "";
    if (backgroundUrl && !hideBackground) {
        dynamicBgStyle = `
            background-image: url('${window.resolvePath(backgroundUrl)}');
            background-size: ${backgroundConfig?.size || 'cover'};
            background-position: ${backgroundConfig?.position || 'center'};
        `;
    }

    let characterHtml = "";
    if (characterUrl) {
        characterHtml = `
            <div class="dynamic-character">
                <img src="${window.resolvePath(characterUrl)}" alt="Personaje">
            </div>
        `;
    }

    return `
    <div class="screen screen-default-content" style="${dynamicBgStyle} ${charVars}">
        
        <header class="screen-header">
            <div class="header-img-left">
                <img src="${window.resolvePath(logoLeft)}" alt="Logo Izquierdo">
            </div>
            <div class="header-img-right">
                <img src="${window.resolvePath(logoRight)}" alt="Logo Derecho">
            </div>
        </header>

        <main class="main-layout">
            <div class="content-slot">
                ${contentHtml}
            </div>
        </main>

        ${characterHtml}
    </div>`;
}