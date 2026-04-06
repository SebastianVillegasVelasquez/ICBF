// screens/html-injection.js

export function renderHtmlInjectionScreen(route) {
    return `
    <div class="screen screen-html-injection">
        <header class="screen-header">
            <div class="header-logo header-logo--left">
                <img src="${window.resolvePath('assets/img/El-ecosistema-de-derechos.png')}" alt="Ecosistema">
            </div>
            <div class="header-logo header-logo--right">
                <img src="${window.resolvePath('assets/img/logo.png')}" alt="Logo">
            </div>
        </header>
        <main class="injection-main">
            <div class="injection-viewport">
                <div class="injection-slot">
                    <!-- El contenido se inyecta aquí vía renderRoute -->
                </div>
            </div>
        </main>
    </div>`;
}