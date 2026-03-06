/**
 * ==========================================================
 *  MAIN.JS
 *  Controlador principal del curso
 *
 *  Responsabilidades:
 *  - Navegación entre páginas
 *  - Carga dinámica de contenido
 *  - Actualización de UI
 *  - Comunicación con SCORM
 *  - Seguimiento de progreso
 * ==========================================================
 */

import {
    initSCORM,
    getLocation,
    setLocation,
    setProgress,
    setCompleted,
    setIncomplete,
    finishSCORM
} from './scorm.js';

import {
    getFlatPageList,
    getTotalPages,
    getPageByIndex,
    getCourseTitle,
    renderNavigation,
    updateNavigationState
} from './navigation.js';


// ==========================================================
// ESTADO DEL CURSO
// ==========================================================

let currentPageIndex = 0;
let visitedPages = new Set();
let totalPages = 0;
let pages = [];


// ==========================================================
// ELEMENTOS DEL DOM
// ==========================================================

let app;
let progressFill;
let progressText;
let pageNumText;
let currentLocationText;
let courseTitleElement;

let btnHome;
let btnPrev;
let btnNext;


// ==========================================================
// CARGA DE PÁGINAS
// ==========================================================

/**
 * Carga una página por su índice global
 * @param {number} index - Índice de la página a cargar
 */
export function loadPage(index) {
    // Validar índice
    if (index < 0 || index >= totalPages) {
        console.warn("Página fuera de rango:", index);
        return;
    }

    currentPageIndex = index;
    
    // Marcar como visitada
    visitedPages.add(index);

    const page = getPageByIndex(index);
    
    if (!page) {
        showError("Página no encontrada en la configuración");
        return;
    }

    fetch(page.file)
        .then(response => {
            if (!response.ok) {
                throw new Error(`No se pudo cargar: ${page.file}`);
            }
            return response.text();
        })
        .then(html => {
            if (!app) return;

            // Extraer solo el contenido del body si existe
            const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
            app.innerHTML = bodyMatch ? bodyMatch[1] : html;

            updateUI();
            updateNavigationState(currentPageIndex, visitedPages);
            syncSCORM();
        })
        .catch(error => {
            console.error("Error cargando página:", error);
            showError(error.message);
        });
}

/**
 * Muestra un mensaje de error amigable
 * @param {string} message - Mensaje de error
 */
function showError(message) {
    if (app) {
        app.innerHTML = `
            <div style="padding:40px;text-align:center;">
                <h2 style="color:#d32f2f;">Error cargando el contenido</h2>
                <p style="color:#666;">${message}</p>
                <p style="color:#999;font-size:0.9rem;">
                    Verifica que el archivo HTML existe en la ruta especificada en course.config.js
                </p>
            </div>
        `;
    }
}


// ==========================================================
// ACTUALIZACIÓN DE UI
// ==========================================================

function updateUI() {
    const page = getPageByIndex(currentPageIndex);

    // Calcular progreso basado en páginas visitadas
    const progress = (visitedPages.size / totalPages) * 100;

    // Actualizar barra de progreso
    if (progressFill) {
        progressFill.style.height = `${progress}%`;
    }

    if (progressText) {
        progressText.textContent = `${Math.round(progress)}%`;
    }

    // Actualizar número de página
    if (pageNumText) {
        pageNumText.textContent = currentPageIndex + 1;
    }

    // Actualizar ubicación actual
    if (currentLocationText && page) {
        currentLocationText.textContent = page.title;
    }

    // Actualizar estado de botones de navegación
    updateNavigationButtons();
}

/**
 * Actualiza el estado habilitado/deshabilitado de los botones
 */
function updateNavigationButtons() {
    if (btnPrev) {
        btnPrev.disabled = currentPageIndex === 0;
        btnPrev.style.opacity = currentPageIndex === 0 ? '0.5' : '1';
        btnPrev.style.cursor = currentPageIndex === 0 ? 'not-allowed' : 'pointer';
    }

    if (btnNext) {
        btnNext.disabled = currentPageIndex === totalPages - 1;
        btnNext.style.opacity = currentPageIndex === totalPages - 1 ? '0.5' : '1';
        btnNext.style.cursor = currentPageIndex === totalPages - 1 ? 'not-allowed' : 'pointer';
    }
}


// ==========================================================
// SINCRONIZACIÓN CON SCORM
// ==========================================================

function syncSCORM() {
    try {
        // Guardar ubicación actual
        setLocation(currentPageIndex);

        // Calcular progreso basado en páginas visitadas
        const percent = Math.round((visitedPages.size / totalPages) * 100);

        // Enviar progreso
        setProgress(percent);

        // Marcar estado del curso
        if (percent === 100) {
            setCompleted();
        } else {
            setIncomplete();
        }
    } catch (error) {
        console.warn("SCORM no disponible:", error);
    }
}


// ==========================================================
// NAVEGACIÓN
// ==========================================================

function setupNavigation() {
    // Botón inicio
    if (btnHome) {
        btnHome.onclick = () => loadPage(0);
    }

    // Botón anterior
    if (btnPrev) {
        btnPrev.onclick = () => {
            if (currentPageIndex > 0) {
                loadPage(currentPageIndex - 1);
            }
        };
    }

    // Botón siguiente
    if (btnNext) {
        btnNext.onclick = () => {
            if (currentPageIndex < totalPages - 1) {
                loadPage(currentPageIndex + 1);
            }
        };
    }

    // Renderizar menú lateral
    renderNavigation(loadPage, currentPageIndex, visitedPages);
}


// ==========================================================
// INICIALIZACIÓN
// ==========================================================

window.onload = () => {
    // Cargar datos de la configuración
    pages = getFlatPageList();
    totalPages = getTotalPages();

    if (totalPages === 0) {
        console.error("No hay páginas configuradas en course.config.js");
        return;
    }

    // Obtener elementos del DOM
    app = document.getElementById('app');
    progressFill = document.getElementById('progress-fill');
    progressText = document.getElementById('progress-text');
    pageNumText = document.getElementById('page-num');
    currentLocationText = document.getElementById('current-location');
    courseTitleElement = document.querySelector('.title');

    btnHome = document.getElementById('btn-home');
    btnPrev = document.getElementById('btn-prev');
    btnNext = document.getElementById('btn-next');

    // Actualizar título del curso
    if (courseTitleElement) {
        courseTitleElement.textContent = getCourseTitle();
    }

    // Actualizar título de la página del navegador
    document.title = getCourseTitle();

    // Configurar navegación
    setupNavigation();

    // Inicializar SCORM
    const scormReady = initSCORM();

    if (scormReady) {
        console.log("SCORM conectado");

        const savedPage = getLocation();

        if (savedPage !== null && !isNaN(savedPage) && savedPage < totalPages) {
            currentPageIndex = savedPage;
            // Marcar páginas anteriores como visitadas (asumiendo navegación secuencial)
            for (let i = 0; i <= savedPage; i++) {
                visitedPages.add(i);
            }
        }
    } else {
        console.log("SCORM no detectado (modo local)");
    }

    // Cargar página inicial
    loadPage(currentPageIndex);
};


// ==========================================================
// FINALIZAR SESIÓN SCORM
// ==========================================================

window.onbeforeunload = () => {
    try {
        finishSCORM();
    } catch (error) {
        console.warn("Error cerrando SCORM:", error);
    }
};
