/**
 * app.js — Controlador principal de la aplicación (REFACTORIZADO)
 *
 * ARQUITECTURA:
 * ─────────────────────────────────────────────────────────────
 * 1. SCREEN REGISTRY: Registro centralizado de tipos de pantalla
 * 2. PROGRESS MANAGER: Gestor único de barra de progreso (SINGLETON)
 * 3. CSS LOADER: Cargador inteligente de CSS con caché
 * 4. ROUTE RENDERER: Renderizador genérico que despacha por tipo
 * 5. CLEAN ROUTER: Enrutador simple y declarativo
 *
 * Para agregar una pantalla nueva:
 *   → Agregar entrada a SCREEN_REGISTRY
 *   → Listo! El sistema se encarga del resto.
 */

import {buildRoutes, getCourseTitle, getRoute, getTotalRoutes} from './router.js';
import {finishSCORM, getLocation, initSCORM, setCompleted, setIncomplete, setLocation, setProgress} from './scorm.js';

// ════════════════════════════════════════════════════════════════
// PATH RESOLUTION — Ya está definida en index.html
// ════════════════════════════════════════════════════════════════
// window.COURSE_BASE_PATH y window.resolvePath() se definen en index.html
// Verificar disponibilidad como fallback
if (!window.resolvePath) {
    window.resolvePath = function(path) {
        if (!path) return '';
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return `/${cleanPath}`;
    };
}

// ── Renderizadores de pantallas ────────────────────────────
import {renderWelcome} from './screens/screen-module-intro.js';
import {renderVideo} from './screens/screen-video.js';
import {renderPostIntro} from "./screens/screen-post-intro.js";
import {renderScreenContentDefault} from './screens/screen-content-default.js';
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

import {getFirstPageIndexByModuleId} from './router.js';

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
};

// ════════════════════════════════════════════════════════════════
// SCREEN REGISTRY — Registro centralizado de tipos de pantalla
// Cada tipo define: renderizador, CSS dinámico (si aplica), layout
// ════════════════════════════════════════════════════════════════

const SCREEN_REGISTRY = {
    'module-intro': {
        css: 'css/welcome.css',
        layout: 'full',
        render: (route) => renderWelcome(route)
    },
    'video': {
        css: 'css/screens.css',
        layout: 'video',
        render: (route) => renderVideo(route)
    },
    'post-intro': {
        css: 'css/post-intro.css',
        layout: 'full',
        render: (route) => renderPostIntro(route)
    },
    'content': {
        css: 'css/components.css',
        layout: 'default',
        render: (route) => renderContentScreen(route)
    },
    'custom': {
        css: null,
        layout: 'full',
        render: (route) => renderCustomScreen(route)
    },
    'default-layout': {
        css: 'css/content-default.css',
        layout: 'full',
        render: (route) => renderScreenContentDefault(route)
    },
    default: {
        css: 'css/screens.css',
        layout: 'default',
        render: (route) => `<div class="screen screen-default">Pantalla por defecto</div>`
    }
};

// ════════════════════════════════════════════════════════════════
// CSS LOADER — Cargador inteligente con caché + variables de ruta
// ════════════════════════════════════════════════════════════════

const cssCache = new Set();

function loadCSS(href) {
    return new Promise((resolve, reject) => {
        const resolvedHref = window.resolvePath(href);

        if (cssCache.has(resolvedHref) || document.querySelector(`link[href="${resolvedHref}"]`)) {
            resolve();
            return;
        }

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = resolvedHref;

        link.onload = () => {
            cssCache.add(resolvedHref);
            // Inyectar variables CSS con base path para que url() funcione en CSS dinámico
            injectCSSVariables();
            resolve();
        };

        link.onerror = () => {
            console.error(`[CSS Loader] Error cargando ${resolvedHref}`);
            reject(new Error(`CSS load failed: ${resolvedHref}`));
        };

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
    `;
    document.head.appendChild(styleEl);
}

/**
 * API para registrar backgrounds personalizados en pantallas futuras
 * @param {string} selector - Selector CSS
 * @param {string} imagePath - Ruta relativa (ej: "assets/img/bg.png")
 */
window.registerBackgroundImage = function(selector, imagePath) {
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
// LOADING VEIL MANAGER — Controla el velo de carga global
// ════════════════════════════════════════════════════════════════

class LoadingVeilManager {
    constructor() {
        this.veil = document.getElementById('app-loading-veil');
    }

    show() {
        if (this.veil) {
            this.veil.classList.remove('hidden');
        }
    }

    hide() {
        if (this.veil) {
            this.veil.classList.add('hidden');
        }
    }
}

const loadingVeil = new LoadingVeilManager();

// ════════════════════════════════════════════════════════════════
// LAYOUT SYSTEM — Aplica layouts dinámicos
// ════════════════════════════════════════════════════════════════

function applyLayout(layoutType) {
    const appShell = document.querySelector('.app-shell');
    const mainCard = document.querySelector('.main-card')
    if (!appShell) return;

    // Remover todas las clases de layout
    appShell.classList.remove('layout-fullscreen', 'layout-video');

    // Aplicar la requerida
    if (layoutType === 'full') {
        appShell.classList.add('layout-fullscreen');

    } else if (layoutType === 'video') {
        appShell.classList.add('layout-video');
    }
    // 'default' no aplica ninguna clase
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
        await loadCSS(route.css);
    }

    try {
        const resolvedPath = window.resolvePath(route.html);
        const res = await fetch(resolvedPath);
        if (!res.ok) {
            throw new Error(`No se pudo cargar: ${res.statusText}`);
        }
        let html = await res.text();

        // Resolver rutas de imágenes en HTML personalizado
        html = resolveImageSrcInHTML(html);

        return html;
    } catch (error) {
        console.error("[Custom Screen] Error:", error);
        return `<div class="page-error">No se pudo cargar la pantalla. Revisa: ${route.html}</div>`;
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
// ROUTE RENDERER — Renderizador genérico y escalable
// Despacha según tipo de pantalla usando SCREEN_REGISTRY
// ════════════════════════════════════════════════════════════════

async function renderRoute(route) {
    const appEl = document.getElementById('app');
    if (!appEl || !route) return;

    try {
        const screenDef = SCREEN_REGISTRY[route.type];

        if (!screenDef) {
            appEl.innerHTML = `<div class="page-error">Tipo de pantalla desconocido: "${route.type}"</div>`;
            return;
        }

        // 1. Cargar CSS dinámico (si aplica)
        if (screenDef.css) {
            await loadCSS(screenDef.css);
        }

        // 2. Renderizar contenido
        let html;
        if (route.type === 'custom') {
            html = await renderCustomScreen(route);
        } else {
            html = screenDef.render(route);
        }

        // 3. Aplicar layout
        applyLayout(screenDef.layout);

        // 4. Inyectar HTML
        appEl.innerHTML = html;

        // 5. Inicializar componentes (solo para pantallas de contenido)
        if (route.type === 'content') {
            bootComponents(appEl);
        }

    } catch (err) {
        console.error("[Route Render] Error:", err);
        appEl.innerHTML = `<div class="page-error">Error al renderizar pantalla: ${err.message}</div>`;
    }
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
        // Renderizar la ruta
        await renderRoute(getRoute(index));

        // Actualizar progreso
        progressManager.update(currentIndex, totalRoutes, visitedSet);
        progressManager.updateNavButtons(currentIndex === 0, currentIndex === totalRoutes - 1);

        // Sincronizar con SCORM
        syncSCORM();
    } finally {
        // Ocultar velo
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
    } catch (_) { }
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
// INITIALIZATION
// ════════════════════════════════════════════════════════════════

window.addEventListener('DOMContentLoaded', async () => {
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
        getProgressManager: () => progressManager,
        getCurrentIndex: () => currentIndex,
        getTotalRoutes: () => totalRoutes
    };
});