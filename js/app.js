/**
 * app.js — Controlador principal de la aplicación (REFACTORIZADO)
 *
 * ARQUITECTURA:
 * ─────────────────────────────────────────────────────────────
 * 1. SCREEN REGISTRY: Registro centralizado de tipos de pantalla
 * 2. PROGRESS BAR: Módulo inyectable para barra de progreso
 * 3. CSS LOADER: Cargador inteligente de CSS con caché
 * 4. ROUTE RENDERER: Renderizador genérico que despacha por tipo
 * 5. LAYOUT SYSTEM: Controla layout + visibilidad de píldora
 *
 * Para agregar una pantalla nueva:
 *   → Agregar entrada a SCREEN_REGISTRY
 *   → Listo! El sistema se encarga del resto.
 */

import {buildRoutes, getCourseTitle, getFirstPageIndexByModuleId, getRoute, getTotalRoutes} from './router.js';
import {finishSCORM, getLocation, initSCORM, setCompleted, setIncomplete, setLocation, setProgress} from './scorm.js';
import {initSlideshow, renderSlideshow} from './components/slideshow.js';
import {initQuiz, renderQuiz} from './components/quiz.js';
// ── Renderizadores de pantallas ────────────────────────────
import {renderWelcome} from './screens/screen-module-intro.js';
import {renderVideo} from './screens/screen-video.js';
import {renderPostIntro} from "./screens/screen-post-intro.js";
import {renderScreenContentDefault} from './screens/screen-content-default.js';
import {renderHtmlInjectionScreen} from './screens/screen-html-injection.js';
import {renderModuleEnd} from "./screens/screen-end-module.js";

// ── Registro de componentes ────────────────────────────────────
import {initAccordion, renderAccordion} from './components/accordion.js';
import {initCards, renderCards} from './components/cards.js';
import {initCarousel, renderCarousel} from './components/carousel.js';
import {initChecklist, renderChecklist} from './components/checklist.js';
import {initComparisonTable, renderComparisonTable} from './components/comparison-table.js';
import {initDragDrop, renderDragDrop} from './components/drag-drop.js';
import {initHotspot, renderHotspot} from './components/hotspot.js';
import {initMultipleChoice, renderMultipleChoice} from './components/multiple-choice.js';
import {initTimeline, renderTimeline} from './components/timeline.js';
import {initToolbox, renderToolbox} from './components/toolbox.js';
import {initNarrativeScroll, renderNarrativeScroll} from './components/narrative-scroll.js';
import {progressBar} from './components/progress-bar.js';

if (!window.resolvePath) {
    window.resolvePath = function (path) {
        if (!path) return '';
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return `/${cleanPath}`;
    };
}

// ════════════════════════════════════════════════════════════════
// COMPONENTS REGISTRY — Mapeo de componentes
// ════════════════════════════════════════════════════════════════

const COMPONENTS = {
    'accordion': {render: renderAccordion, init: initAccordion},
    'cards': {render: renderCards, init: initCards},
    'carousel': {render: renderCarousel, init: initCarousel},
    'checklist': {render: renderChecklist, init: initChecklist},
    'comparison-table': {render: renderComparisonTable, init: initComparisonTable},
    'drag-drop': {render: renderDragDrop, init: initDragDrop},
    'hotspot': {render: renderHotspot, init: initHotspot},
    'multiple-choice': {render: renderMultipleChoice, init: initMultipleChoice},
    'timeline': {render: renderTimeline, init: initTimeline},
    'toolbox': {render: renderToolbox, init: initToolbox},
    'narrative-scroll': {render: renderNarrativeScroll, init: initNarrativeScroll},
    'slideshow': {render: renderSlideshow, init: initSlideshow},
    'quiz': {render: renderQuiz, init: initQuiz},
};

// ════════════════════════════════════════════════════════════════
// SCREEN REGISTRY — Registro centralizado de tipos de pantalla
// Cada tipo define: renderizador, CSS dinámico (si aplica), layout
// ════════════════════════════════════════════════════════════════

const SCREEN_REGISTRY = {
    'module-intro': {
        css: 'css/welcome.css',
        layout: 'full',
        showNav: false,
        render: (route) => renderWelcome(route)
    },
    'video': {
        css: 'css/video.css',
        layout: 'video',
        showNav: true,
        showPdf: true,
        render: (route) => renderVideo(route)
    },
    'post-intro': {
        css: 'css/post-intro.css',
        layout: 'full',
        showNav: false,
        showPdf: false,
        render: (route) => renderPostIntro(route)
    },
    'end-module': {
      css: 'css/end-module.css',
        layout: 'full',
        showNav: false,
        showPdf:false,
        render: (route) => renderModuleEnd(route)
    },
    'default-content': {
        css: 'css/content-default.css',
        layout: 'full',
        showNav: true,
        showPdf: false,
        render: (route) => renderScreenContentDefault(route)
    },
    "html-injection": {
        render: renderHtmlInjectionScreen,
        layout: 'full',
        showNav: true,
        showPdf: false,
        css: "css/html-injection.css",
    },
    'content': {
        css: 'css/components.css',
        layout: 'default',
        showNav: true,
        showPdf: true,
        render: (route) => renderContentScreen(route)
    },
    'custom': {
        css: null,
        layout: 'full',
        showNav: false,
        showPdf: false,
        render: (route) => renderCustomScreen(route)
    },
    default: {
        css: 'css/screens.css',
        layout: 'default',
        render: (route) => `<div class="screen screen-default">Pantalla por defecto</div>`
    }
};

// ════════════════════════════════════════════════════════════════
// ROUTE RENDERER — Renderizador genérico y escalable
// Despacha según tipo de pantalla usando SCREEN_REGISTRY
// ════════════════════════════════════════════════════════════════

async function renderRoute(route) {
    const appEl = document.getElementById('app');
    if (!appEl || !route) {
        throw new Error('No se pudo acceder al contenedor de app o ruta');
    }

    try {
        const screenDef = SCREEN_REGISTRY[route.type];

        if (!screenDef) {
            appEl.innerHTML = `<div class="page-error">Tipo de pantalla desconocido: "${route.type}"</div>`;
            return;
        }

        // 1. Cargar CSS dinámico (si aplica)
        if (screenDef.css) {
            const cssList = Array.isArray(screenDef.css) ? screenDef.css : [screenDef.css];
            console.log(cssList)
            try {
                await Promise.all(cssList.map(href => loadCSS(href)));
            } catch (err) {
                console.warn(`[renderRoute] CSS error`, err);
            }
        }

        // 2. Renderizar contenido con timeout de seguridad
        let html;
        try {
            if (route.type === 'custom') {
                html = await Promise.race([
                    renderCustomScreen(route),
                    new Promise((_, reject) =>
                        setTimeout(() => reject(new Error('Timeout')), 15000)
                    )
                ]);
            } else if (route.type === 'default-content' && route.htmlFile) {
                const fileContent = await loadHTMLFile(route);
                html = renderScreenContentDefault({
                    ...route,
                    contentHtml: fileContent
                });
            } else if (route.type === 'html-injection') {
                // Renderiza el shell vacío; el contenido se inyecta después del innerHTML
                html = screenDef.render(route);
            } else {
                html = screenDef.render(route);
            }
        } catch (err) {
            console.error(`[renderRoute] Error renderizando:`, err);
            html = `<div class="page-error"><strong>Error renderizando:</strong> ${err.message}</div>`;
        }

        /* ─────────────────────────────────────────────────────────
           3. APLICAR LAYOUT Y CONFIGURACIÓN DE PÍLDORA (Actualizado)
           ───────────────────────────────────────────────────────── */

        // Creamos un objeto de configuración combinando el registro y la ruta
        const screenConfig = {
            layout: screenDef.layout,
            // Si la ruta dice específicamente que oculte el nav, gana la ruta.
            // Si no dice nada, se usa la configuración por defecto del SCREEN_REGISTRY.
            showNav: route.hideNav === true ? false : screenDef.showNav,
            showPdf: screenDef.showPdf
        };

        applyLayout(screenConfig);

        // 4. Inyectar HTML
        appEl.innerHTML = html;

        requestAnimationFrame(() => {
            const fill = appEl.querySelector('.progress-bar-fill');

            if (fill) {
                const pct = fill.dataset.percentage || 0;

                // pequeño delay para animación
                setTimeout(() => {
                    fill.style.width = `${pct}%`;
                }, 100);
            }
        });

        if (route.type === 'html-injection' && route.htmlFile) {
            try {
                const fileContent = await loadHTMLFile(route);
                const slot = appEl.querySelector('.injection-slot');
                if (slot) slot.innerHTML = fileContent;
            } catch (err) {
                console.error(`[renderRoute] Error cargando htmlFile:`, err);
                const slot = appEl.querySelector('.injection-slot');
                if (slot) slot.innerHTML = `<div class="page-error"><strong>Error cargando contenido:</strong> ${err.message}</div>`;
            }
        }

        if (route.type === 'default-content' && route.htmlFile) {
            requestAnimationFrame(() => {
                // Solo ejecutamos el script de tarjetas de app.js si el archivo HTML NO trae sus propios scripts de tarjetas
                // (Para evitar que choquen entre sí)
                const traeScriptPropio = appEl.querySelector('script');

                if (!traeScriptPropio) {
                    inicializarTarjetasInfografia();
                }

                // ══ EJECUTAMOS LOS SCRIPTS DE LA REVISTA AUTOMÁTICAMENTE ══
                ejecutarScriptsInyectados(appEl);
            });
        }

        const progressContainer = appEl.querySelector('.progress-bar-target');

        if (progressContainer) {
            progressBar.renderTo(progressContainer);
            requestAnimationFrame(() => {
                progressBar.update(currentIndex, totalRoutes, visitedSet);
            });
        } else {
            progressBar.unmount();
        }

        // 5. Inicializar componentes (solo para pantallas de contenido)
        if (route.type === 'content' || route.type === 'default-content') {
            try {
                bootComponents(appEl);
            } catch (err) {
                console.error('[renderRoute] Error bootComponents:', err);
            }
        }

    } catch (err) {
        console.error("[renderRoute] Error fatal:", err);
        appEl.innerHTML = `<div class="page-error"><strong>Error crítico:</strong> ${err.message}</div>`;
    }
}

/* ─────────────────────────────────────────────────────────
   FUNCIONES DE APOYO Y UTILIDADES
   ───────────────────────────────────────────────────────── */

/**
 * Busca etiquetas <script> en un contenedor inyectado, las clona
 * y las ejecuta en el ámbito global.
 */
function ejecutarScriptsInyectados(contenedor) {
    if (!contenedor) return;

    const scripts = contenedor.querySelectorAll('script');

    scripts.forEach(scriptOriginal => {
        const scriptNuevo = document.createElement('script');
        scriptNuevo.textContent = scriptOriginal.textContent;

        Array.from(scriptOriginal.attributes).forEach(attr => {
            scriptNuevo.setAttribute(attr.name, attr.value);
        });

        document.body.appendChild(scriptNuevo);
        scriptNuevo.parentNode.removeChild(scriptNuevo);
    });
}

/**
 * Inicializa el comportamiento de acordeón de las tarjetas en las infografías.
 */
function inicializarTarjetasInfografia() {
    const headers = document.querySelectorAll('.js-toggle-card');
    if (headers.length === 0) return;

    headers.forEach(header => {
        // Clonamos para limpiar cualquier evento previo colgado
        const newHeader = header.cloneNode(true);
        header.parentNode.replaceChild(newHeader, header);

        newHeader.addEventListener('click', function() {
            const card   = this.closest('.info-card-float');
            const toggle = this.querySelector('.info-card-toggle');
            const isOpen = card.classList.contains('is-open');

            // Cerrar todas las demás tarjetas
            document.querySelectorAll('.info-card-float').forEach(c => {
                if (c !== card) {
                    c.classList.remove('is-open');
                    const t = c.querySelector('.info-card-toggle');
                    if (t) {
                        t.textContent = '+';
                        t.style.transform = 'rotate(0deg)';
                    }
                }
            });

            // Alternar la tarjeta actual
            if (!isOpen) {
                card.classList.add('is-open');
                toggle.textContent = '−';
                toggle.style.transform = 'rotate(180deg)';
            } else {
                card.classList.remove('is-open');
                toggle.textContent = '+';
                toggle.style.transform = 'rotate(0deg)';
            }
        });
    });
}

/**
 * Helper para cargar contenido de un archivo HTML externo vía Fetch.
 */
async function loadHTMLFile(route) {
    try {
        const resolvedPath = window.resolvePath(route.htmlFile);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        const res = await fetch(resolvedPath, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        let fragmentHtml = await res.text();
        fragmentHtml = resolveImageSrcInHTML(fragmentHtml);

        return fragmentHtml;
    } catch (err) {
        console.error("Error cargando el archivo HTML:", err);
        return `<div class="page-error"><strong>Error cargando contenido:</strong> ${err.message}</div>`;
    }
}

// ════════════════════════════════════════════════════════════════
// CSS LOADER — Cargador inteligente con caché + variables de ruta
// ════════════════════════════════════════════════════════════════

const cssCache = new Set();

const APP_VERSION = Date.now();

function loadCSS(href) {
    return new Promise((resolve) => {
        // 1. Normalizar la ruta base y crear la URL con versión
        const resolvedPath = window.resolvePath(href);
        const versionedHref = `${resolvedPath}?v=${APP_VERSION}`;

        // 2. Verificar si ya está en nuestro set de cache interno
        if (cssCache.has(resolvedPath)) {
            resolve();
            return;
        }

        // 3. Verificar si el elemento ya existe físicamente en el DOM (evita duplicados si se recarga la ruta)
        const alreadyInDOM = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
            .some(link => link.href.includes(resolvedPath));

        if (alreadyInDOM) {
            cssCache.add(resolvedPath);
            resolve();
            return;
        }

        // 4. Crear el elemento link
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = versionedHref;

        link.onload = () => {
            console.log(`[loadCSS] ✅ Cargado: ${resolvedPath}`);
            cssCache.add(resolvedPath);

            // Inyectamos variables CSS para asegurar que rutas dinámicas (imágenes) funcionen
            if (typeof injectCSSVariables === 'function') {
                injectCSSVariables();
            }
            resolve();
        };

        link.onerror = () => {
            console.error(`[loadCSS] ❌ Error cargando: ${resolvedPath}`);
            // Resolvemos de todos modos para no bloquear el renderizado de la página por un error de estilo
            resolve();
        };

        // 5. Inyectar en el head
        document.head.appendChild(link);
    });
}

/**
 * Inyecta variables CSS globales para rutas de assets
 * Necesario para que url() en CSS dinámicos funcione con subcarpetas
 */
function injectCSSVariables() {
    // Evitar inyectar múltiples veces
    if (document.getElementById('css-var-injection')) return;

    const basePath = window.COURSE_BASE_PATH || '';
    const assetsPath = basePath ? `${basePath}/assets` : '/assets';

    const styleEl = document.createElement('style');
    styleEl.id = 'css-var-injection';
    styleEl.textContent = `
        :root {
            --assets-path: '${assetsPath}';
            --base-path: '${basePath}';
        }
        
        /* Inyectar background-images con rutas absolutas */
        .welcome-hero {
            background-image: url('${assetsPath}/img/background-modulo-1.png') !important;
        }
        
        .front-page {
            background-image: url('${assetsPath}/img/front-page-background.png') !important;
        }
        
        .container.default-layout {
            background-image: url('${assetsPath}/img/background-pantalla-defecto.png') !important;
        }
        
        .screen-video {
            background-image: url('${assetsPath}/img/arbol.png') !important;
        }
        
        
        // .screen-default-content.no-background {
        // background-image: none !important;
        // background-color: #ffffff;
    }
    `;
    document.head.appendChild(styleEl);
}

/**
 * API para registrar backgrounds personalizados en pantallas futuras
 * @param {string} selector - Selector CSS
 * @param {string} imagePath - Ruta relativa (ej: "assets/img/bg.png")
 */
window.registerBackgroundImage = function (selector, imagePath) {
    const basePath = window.COURSE_BASE_PATH || '';
    const fullPath = basePath ? `${basePath}/${imagePath}` : `/${imagePath}`;

    const styleEl = document.createElement('style');
    styleEl.textContent = `${selector} { background-image: url('${fullPath}') !important; }`;
    document.head.appendChild(styleEl);
};

// ════════════════════════════════════════════════════════════════
// PROGRESS MANAGER — Gestor centralizado de barra de progreso
// SINGLETON que expone un API limpio
// ════════════════════════════════════════════════════════════════

class ProgressManager {
    constructor() {
        this.progressTextEl = document.getElementById('progress-percentage');
        this.chevron = document.getElementById('progress-chevron');
        this.progressFill = this.chevron?.querySelector('.progress-bar-fill');
        this.progressArrow = this.chevron?.querySelector('.progress-bar-arrow');
    }

    /**
     * Actualiza la barra de progreso de forma centralizada
     * @param {number} currentIndex - Índice actual de la pantalla
     * @param {number} totalRoutes - Total de rutas
     * @param {Set} visitedSet - Conjunto de índices visitados
     */
    update(currentIndex, totalRoutes, visitedSet) {
        // Matemática: empezar en 20% y repartir el 80% restante
        const basePct = 20;
        const avanceReal = visitedSet.size / totalRoutes;
        const pct = basePct + Math.round(avanceReal * (100 - basePct));

        // Aplicar cambios solo si los elementos existen
        if (this.progressTextEl) this.progressTextEl.textContent = `${pct}%`;
        if (this.progressFill) this.progressFill.style.width = `${pct}%`;
        if (this.progressArrow) this.progressArrow.style.left = `${pct}%`;

        return pct;
    }

    /**
     * Actualiza estado de botones de navegación
     * @param {boolean} isFirst
     * @param {boolean} isLast
     */
    updateNavButtons(isFirst, isLast) {
        const btnPrev = document.getElementById('btn-prev');
        const btnNext = document.getElementById('btn-next');
        if (btnPrev) btnPrev.disabled = isFirst;
        if (btnNext) btnNext.disabled = isLast;
    }
}

// Instancia única
const progressManager = new ProgressManager();

// ════════════════════════════════════════════════════════════════
// LOADING VEIL MANAGER — Controla el velo de carga global con resiliencia
// ════════════════════════════════════════════════════════════════

class LoadingVeilManager {
    constructor() {
        this.veil = document.getElementById('app-loading-veil');
        this.veilTimeout = null;
        this.maxWaitTime = 30000; // 30 segundos máximo
    }

    show() {
        if (this.veil) {
            this.veil.classList.remove('hidden');

            // Timeout de seguridad: si no se oculta en X segundos, ocultarlo automáticamente
            this.clearTimeout();
            this.veilTimeout = setTimeout(() => {
                console.warn('[LoadingVeil] Timeout: velo no se ocultó. Ocultando automáticamente.');
                this.hide();
            }, this.maxWaitTime);
        }
    }

    hide() {
        if (this.veil) {
            this.veil.classList.add('hidden');
            this.clearTimeout();
        }
    }

    clearTimeout() {
        if (this.veilTimeout) {
            clearTimeout(this.veilTimeout);
            this.veilTimeout = null;
        }
    }
}

const loadingVeil = new LoadingVeilManager();

// ════════════════════════════════════════════════════════════════
// LAYOUT SYSTEM — Aplica layouts dinámicos + control de píldora nav
// ════════════════════════════════════════════════════════════════

function applyLayout(screenConfig) {
    const appShell = document.querySelector('.app-shell');
    const pillNav = document.querySelector('.pill-nav');
    const btnPdf = document.querySelector('#btn-pdf');

    if (!appShell) return;

    appShell.classList.remove('layout-fullscreen', 'layout-video');

    const layoutType = screenConfig.layout;
    if (layoutType === 'full') {
        appShell.classList.add('layout-fullscreen');
    } else if (layoutType === 'video') {
        appShell.classList.add('layout-video');
    }

    if (pillNav) {
        const shouldShowNav = screenConfig.showNav !== false;
        pillNav.style.display = shouldShowNav ? 'flex' : 'none';
    }

    if (btnPdf) {
        const shouldShowPdf = screenConfig.showPdf !== false;
        btnPdf.style.display = shouldShowPdf ? 'flex' : 'none';
    }
}

// ════════════════════════════════════════════════════════════════
// CONTENT SCREEN RENDERER — Plantilla genérica para pantallas de contenido
// ════════════════════════════════════════════════════════════════

function renderContentScreen(route) {
    const title = route.title ? `<h2 class="content-screen-title">${route.title}</h2>` : '';
    const body = (route.components || []).map(comp => {
        const entry = COMPONENTS[comp.type];
        if (!entry) return `<p class="page-error">Componente desconocido: "${comp.type}"</p>`;
        try {
            return `<div class="component-wrapper" data-booted="${comp.type}">${entry.render(comp.data || {})}</div>`;
        } catch (err) {
            return `<p class="page-error">Error en "${comp.type}": ${err.message}</p>`;
        }
    }).join('');

    return `<div class="screen screen-content">${title}${body}</div>`;
}

// ════════════════════════════════════════════════════════════════
// CUSTOM SCREEN RENDERER — Carga HTML externo + CSS dinámico
// ════════════════════════════════════════════════════════════════

async function renderCustomScreen(route) {
    // Cargar CSS dinámico si está especificado
    if (route.css) {
        try {
            await loadCSS(route.css);
        } catch (err) {
            // Continuar sin fallar
        }
    }

    try {
        const resolvedPath = window.resolvePath(route.html);

        // Timeout de 10 segundos para fetch
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const res = await fetch(resolvedPath, {signal: controller.signal});
        clearTimeout(timeoutId);

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        let html = await res.text();

        // Resolver rutas de imágenes en HTML personalizado
        html = resolveImageSrcInHTML(html);

        return html;
    } catch (error) {
        return `<div class="page-error"><strong>Error cargando pantalla:</strong> ${error.message || error.name}</div>`;
    }
}

/**
 * Resuelve rutas de imágenes en HTML usando window.resolvePath()
 * @param {string} html - Contenido HTML
 * @returns {string} HTML con rutas resueltas
 */
function resolveImageSrcInHTML(html) {
    // Patrón para detectar src="assets/..." o src='assets/...'
    return html.replace(/src=["']([^"']*assets[^"']*)["']/g, (match, src) => {
        const resolved = window.resolvePath(src);
        return `src="${resolved}"`;
    });
}

// ════════════════════════════════════════════════════════════════
// COMPONENT BOOTSTRAPPER — Inicializa interactividad de componentes
// ════════════════════════════════════════════════════════════════

function bootComponents(container) {
    container.querySelectorAll('[data-booted]').forEach(el => {
        const name = el.dataset.booted;
        const entry = COMPONENTS[name];
        if (entry?.init) {
            try {
                entry.init(el);
            } catch (err) {
                console.error(`[Component Boot] Error en "${name}":`, err);
            }
        }
    });
}



// ════════════════════════════════════════════════════════════════
// NAVIGATION & STATE
// ════════════════════════════════════════════════════════════════

let currentIndex = 0;
let visitedSet = new Set();
let totalRoutes = 0;

async function navigateTo(index) {
    if (index < 0 || index >= totalRoutes) return;

    currentIndex = index;
    visitedSet.add(index);

    // Mostrar velo mientras se carga
    loadingVeil.show();

    try {
        const route = getRoute(index);
        if (!route) throw new Error(`Ruta no encontrada en índice ${index}`);

        await renderRoute(route);

        const btnPrev = document.getElementById('btn-prev');
        const btnNext = document.getElementById('btn-next');
        if (btnPrev) btnPrev.disabled = currentIndex === 0;
        if (btnNext) btnNext.disabled = currentIndex === totalRoutes - 1;

    } catch(err) {
        console.error('[navigateTo]', err);
    } finally {
        loadingVeil.hide();
    }
}

// ════════════════════════════════════════════════════════════════
// SCORM SYNC
// ════════════════════════════════════════════════════════════════

function syncSCORM() {
    try {
        setLocation(currentIndex);
        const pct = Math.round((visitedSet.size / totalRoutes) * 100);
        setProgress(pct);
        pct >= 100 ? setCompleted() : setIncomplete();
    } catch (_) {
        // No SCORM LMS — ignorar silenciosamente
    }
}

window.addEventListener('beforeunload', () => {
    try {
        finishSCORM();
    } catch (_) {
    }
});

// ════════════════════════════════════════════════════════════════
// PDF EXPORT
// ════════════════════════════════════════════════════════════════

async function exportPDF() {
    if (typeof html2pdf === 'undefined') {
        alert('La librería PDF no está disponible.');
        return;
    }

    const loading = document.createElement('div');
    loading.className = 'pdf-loading';
    loading.innerHTML = `<div class="pdf-spinner"></div><p>Generando PDF...</p>`;
    document.body.appendChild(loading);

    const courseTitle = getCourseTitle();
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'font-family:sans-serif;padding:24px;';
    wrapper.innerHTML = `<h1 style="color:#1a5c38;">${courseTitle}</h1><hr style="margin-bottom:24px;">`;

    for (let i = 0; i < totalRoutes; i++) {
        const route = getRoute(i);
        if (!route) continue;

        const section = document.createElement('div');
        section.style.cssText = 'margin-bottom:32px;page-break-inside:avoid;';

        if (route.type === 'cover') {
            section.innerHTML = `<h2 style="color:#c17f3a;">${route.module.title}</h2>
            ${route.module.description ? `<p>${route.module.description}</p>` : ''}`;
        } else if (route.type === 'page') {
            try {
                const res = await fetch(route.page.file);
                const text = await res.text();
                const body = text.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
                section.innerHTML = `<h2 style="color:#2e7d32;">${route.title}</h2>` + (body ? body[1] : text);
            } catch (_) {
                continue;
            }
        }

        wrapper.appendChild(section);
        loading.querySelector('p').textContent = `Procesando ${i + 1} / ${totalRoutes}...`;
        await new Promise(r => setTimeout(r, 10));
    }

    const opt = {
        margin: [10, 10, 10, 10],
        filename: `${courseTitle.replace(/\s+/g, '_')}.pdf`,
        image: {type: 'jpeg', quality: 0.9},
        html2canvas: {scale: 1.5, useCORS: true},
        jsPDF: {unit: 'mm', format: 'a4', orientation: 'portrait'}
    };

    try {
        await html2pdf().set(opt).from(wrapper).save();
    } catch (err) {
        console.error('[PDF Export] Error:', err);
        alert('Error generando PDF');
    } finally {
        document.body.removeChild(loading);
    }
}

// ════════════════════════════════════════════════════════════════
// MANEJO GLOBAL DE ERRORES - Prevenir que el velo se quede congelado
// ════════════════════════════════════════════════════════════════

// Capturar promesas rechazadas no manejadas
window.addEventListener('unhandledrejection', (event) => {
    console.error('[Global] Promesa rechazada no capturada:', event.reason);
    // Asegurar que el velo se oculte
    if (loadingVeil) {
        loadingVeil.hide();
    }
    // Mostrar error amigable al usuario
    const appEl = document.getElementById('app');
    if (appEl && !appEl.innerHTML.includes('page-error')) {
        appEl.innerHTML = `<div class="page-error"><strong>Error inesperado:</strong> Por favor recarga la página.</div>`;
    }
});

// Capturar errores globales no capturados
window.addEventListener('error', (event) => {
    console.error('[Global] Error no capturado:', event.error);
    // Ocultar velo en errores críticos
    if (loadingVeil) {
        loadingVeil.hide();
    }
});

// ════════════════════════════════════════════════════════════════
// INITIALIZATION
// ════════════════════════════════════════════════════════════════

window.addEventListener('DOMContentLoaded', async () => {
    try {
        // Inyectar variables CSS globales para assets desde el inicio
        injectCSSVariables();

        // Resolver rutas de imágenes en HTML estático
        const headerLogo = document.getElementById('header-logo');
        if (headerLogo) {
            headerLogo.src = window.resolvePath('assets/img/logo.png');
        }

        buildRoutes();
        totalRoutes = getTotalRoutes();

        if (totalRoutes === 0) {
            console.error('[app] No hay pantallas definidas en course.config.js');
            loadingVeil.hide();
            return;
        }

        const appEl = document.getElementById('app');

        // ── Event Delegation para clicks ──
        appEl.addEventListener('click', (event) => {
            // Botones de módulo
            const moduleBtn = event.target.closest('.module-btn');
            if (moduleBtn) {
                const moduleId = moduleBtn.dataset.module;
                const targetIndex = getFirstPageIndexByModuleId(moduleId);
                navigateTo(targetIndex);
                return;
            }

            // Botón siguiente pantalla
            const nextBtn = event.target.closest('.btn-next-screen');
            if (nextBtn) {
                navigateTo(currentIndex + 1);
                return;
            }

            // Pantalla de bienvenida: click en cualquier lugar = siguiente
            if (event.target.closest('.welcome-hero')) {
                navigateTo(currentIndex + 1);
            }
        });

        // ── Navegación global ──
        document.getElementById('btn-home')?.addEventListener('click', () => navigateTo(0));
        document.getElementById('btn-prev')?.addEventListener('click', () => navigateTo(currentIndex - 1));
        document.getElementById('btn-next')?.addEventListener('click', () => navigateTo(currentIndex + 1));
        document.getElementById('btn-pdf')?.addEventListener('click', exportPDF);

        // ── SCORM ──
        document.title = getCourseTitle();
        const scormActive = initSCORM();
        if (scormActive) {
            const saved = getLocation();
            if (saved !== null && !isNaN(saved) && saved < totalRoutes) {
                currentIndex = parseInt(saved, 10);
                for (let i = 0; i <= currentIndex; i++) visitedSet.add(i);
            }
        }

        // ── Navegar a la pantalla inicial ──
        await navigateTo(currentIndex);

        // ── Guardar API global (opcional, para debugging) ──
        window.courseApp = {
            navigateTo,
            getProgressBar: () => progressBar,
            getCurrentIndex: () => currentIndex,
            getTotalRoutes: () => totalRoutes
        };

    } catch (err) {
        console.error('[DOMContentLoaded] Error crítico:', err);
        // Ocultar velo de emergencia
        loadingVeil.hide();
        // Mostrar error
        const appEl = document.getElementById('app');
        if (appEl) {
            appEl.innerHTML = `<div class="page-error"><strong>Error al inicializar:</strong> ${err.message}</div>`;
        }
    }
});