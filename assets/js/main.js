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


// ==========================================================
// ESTADO DEL CURSO
// ==========================================================

let currentPage = 0;

/**
 * Lista de páginas del curso.
 * Aquí el equipo puede agregar nuevas páginas.
 */
const pages = [
    'assets/pages/intro.html',
    'assets/pages/module1.html',
    'assets/pages/module2.html'
];


// ==========================================================
// ELEMENTOS DEL DOM
// ==========================================================

let app;
let progressFill;
let progressText;
let pageNumText;

let btnHome;
let btnPrev;
let btnNext;


// ==========================================================
// CARGA DE PÁGINAS
// ==========================================================

export function loadPage(index) {

    if (index < 0 || index >= pages.length) {
        console.warn("Página fuera de rango:", index);
        return;
    }

    currentPage = index;

    const pageUrl = pages[currentPage];

    fetch(pageUrl)

        .then(response => {

            if (!response.ok) {
                throw new Error(`No se pudo cargar: ${pageUrl}`);
            }

            return response.text();

        })

        .then(html => {

            if (!app) return;

            app.innerHTML = html;

            updateUI();
            syncSCORM();

        })

        .catch(error => {

            console.error("Error cargando página:", error);

            if (app) {
                app.innerHTML = `
                <div style="padding:40px;text-align:center;">
                    <h2>Error cargando el contenido</h2>
                    <p>${error.message}</p>
                </div>
                `;
            }

        });
}


// ==========================================================
// ACTUALIZACIÓN DE UI
// ==========================================================

function updateUI() {

    const progress = ((currentPage + 1) / pages.length) * 100;

    if (progressFill) {
        progressFill.style.height = `${progress}%`;
    }

    if (progressText) {
        progressText.textContent = `${Math.round(progress)}%`;
    }

    if (pageNumText) {
        pageNumText.textContent = currentPage + 1;
    }
}


// ==========================================================
// SINCRONIZACIÓN CON SCORM
// ==========================================================

function syncSCORM() {

    try {

        // Guardar ubicación
        setLocation(currentPage);

        // Calcular progreso
        const percent = Math.round(((currentPage + 1) / pages.length) * 100);

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

    if (btnHome) {
        btnHome.onclick = () => loadPage(0);
    }

    if (btnPrev) {
        btnPrev.onclick = () => loadPage(currentPage - 1);
    }

    if (btnNext) {
        btnNext.onclick = () => loadPage(currentPage + 1);
    }

}


// ==========================================================
// INICIALIZACIÓN
// ==========================================================

window.onload = () => {

    console.log("Inicializando curso...");

    // Obtener elementos del DOM

    app = document.getElementById('app');
    progressFill = document.getElementById('progress-fill');
    progressText = document.getElementById('progress-text');
    pageNumText = document.getElementById('page-num');

    btnHome = document.getElementById('btn-home');
    btnPrev = document.getElementById('btn-prev');
    btnNext = document.getElementById('btn-next');


    setupNavigation();


    // Inicializar SCORM

    const scormReady = initSCORM();

    if (scormReady) {

        console.log("SCORM conectado");

        const savedPage = getLocation();

        if (savedPage !== null && !isNaN(savedPage)) {
            currentPage = savedPage;
        }

    } else {

        console.log("SCORM no detectado (modo local)");

    }


    // Cargar página inicial

    loadPage(currentPage);

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