/**
 * ==========================================================
 *  NAVIGATION.JS
 *  Sistema de navegación automática del curso
 *
 *  Responsabilidades:
 *  - Generar menú lateral desde la configuración
 *  - Manejar clicks en navegación
 *  - Actualizar estado visual de navegación
 *  - Marcar páginas visitadas
 * ==========================================================
 */

import { course } from './course.config.js';

// ==========================================================
// UTILIDADES
// ==========================================================

/**
 * Genera una lista plana de todas las páginas del curso
 * con su índice global y referencia al módulo
 */
export function getFlatPageList() {
    const pages = [];
    let globalIndex = 0;

    course.modules.forEach((module, moduleIndex) => {
        module.pages.forEach((page, pageIndex) => {
            pages.push({
                ...page,
                moduleIndex,
                pageIndex,
                globalIndex: globalIndex++,
                moduleTitle: module.title
            });
        });
    });

    return pages;
}

/**
 * Obtiene el total de páginas del curso
 */
export function getTotalPages() {
    return getFlatPageList().length;
}

/**
 * Obtiene información de una página por su índice global
 */
export function getPageByIndex(index) {
    const pages = getFlatPageList();
    return pages[index] || null;
}

/**
 * Obtiene el título del curso
 */
export function getCourseTitle() {
    return course.title;
}

// ==========================================================
// GENERACIÓN DE MENÚ
// ==========================================================

/**
 * Genera el HTML del menú de navegación
 * @param {Function} onPageClick - Callback cuando se hace click en una página
 * @param {number} currentPageIndex - Índice de la página actual
 * @param {Set} visitedPages - Set de páginas visitadas
 */
export function renderNavigation(onPageClick, currentPageIndex = 0, visitedPages = new Set()) {
    const navContainer = document.getElementById('course-nav');
    
    if (!navContainer) {
        console.warn('Contenedor de navegación #course-nav no encontrado');
        return;
    }

    let html = '';
    let globalIndex = 0;

    course.modules.forEach((module, moduleIndex) => {
        // Título del módulo
        html += `<div class="nav-module">${module.title}</div>`;

        // Páginas del módulo
        module.pages.forEach((page, pageIndex) => {
            const isActive = globalIndex === currentPageIndex;
            const isVisited = visitedPages.has(globalIndex);
            
            let classes = 'nav-page';
            if (isActive) classes += ' active';
            if (isVisited && !isActive) classes += ' visited';

            html += `
                <div class="${classes}" 
                     data-page-index="${globalIndex}"
                     data-module-index="${moduleIndex}"
                     data-page-in-module="${pageIndex}">
                    ${page.title}
                </div>
            `;

            globalIndex++;
        });
    });

    navContainer.innerHTML = html;

    // Agregar event listeners a las páginas
    const pageElements = navContainer.querySelectorAll('.nav-page');
    pageElements.forEach(el => {
        el.addEventListener('click', () => {
            const pageIndex = parseInt(el.dataset.pageIndex, 10);
            if (typeof onPageClick === 'function') {
                onPageClick(pageIndex);
            }
        });
    });
}

/**
 * Actualiza el estado visual de la navegación sin regenerar todo
 * @param {number} currentPageIndex - Índice de la página actual
 * @param {Set} visitedPages - Set de páginas visitadas
 */
export function updateNavigationState(currentPageIndex, visitedPages = new Set()) {
    const navContainer = document.getElementById('course-nav');
    if (!navContainer) return;

    const pageElements = navContainer.querySelectorAll('.nav-page');
    
    pageElements.forEach(el => {
        const pageIndex = parseInt(el.dataset.pageIndex, 10);
        
        // Remover clases anteriores
        el.classList.remove('active', 'visited');
        
        // Aplicar nuevas clases
        if (pageIndex === currentPageIndex) {
            el.classList.add('active');
        } else if (visitedPages.has(pageIndex)) {
            el.classList.add('visited');
        }
    });
}
