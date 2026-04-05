export function renderInfographic() {
    const {content}

    return `
    <div class="screen screen-default-content">
        <header class="screen-header">
            <div class="header-img-left">
                <img src="${window.resolvePath('assets/img/El-ecosistema-de-derechos.png')}" alt="Ecosistema">
            </div>
            <div class="header-img-right">
                <img src="${window.resolvePath('assets/img/logo.png')}" alt="Logo">
            </div>
        </header>

        <main class="main-layout">
            <div class="content-slot">
                ${contentHtml}
            </div>
        </main>
    </div> `
}