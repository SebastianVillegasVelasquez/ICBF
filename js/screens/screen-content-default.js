export function renderScreenContentDefault(route) {
    const { contentHtml = "" } = route;

    return `
    <div class="container default-layout">
        <div class="header-layer">
            <div class="img-left">
                <img src="${window.resolvePath('assets/img/El-ecosistema-de-derechos.png')}" alt="Ecosistema">
            </div>
            <div class="img-right">
                <img src="${window.resolvePath('assets/img/logo.png')}" alt="Logo">
            </div>
        </div>

        <div class="main-layout">
            <div class="content-slot">
                ${contentHtml}
            </div>
        </div>
    </div> `;
}