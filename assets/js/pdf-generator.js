/**
 * ==========================================================
 *  PDF-GENERATOR.JS
 *  Generador de PDF del curso completo
 *
 *  Responsabilidades:
 *  - Cargar todas las páginas del curso
 *  - Combinar contenido en un contenedor temporal
 *  - Generar PDF usando html2pdf.js
 *  - Manejar errores sin romper la navegación
 * ==========================================================
 */

import { course } from './course.config.js';
import { getFlatPageList, getCourseTitle } from './navigation.js';

/**
 * Muestra el indicador de carga del PDF
 */
function showLoading(message = 'Generando PDF...', progress = '') {
    // Remover loading anterior si existe
    hideLoading();

    const loadingEl = document.createElement('div');
    loadingEl.id = 'pdf-loading';
    loadingEl.className = 'pdf-loading';
    loadingEl.innerHTML = `
        <div class="pdf-loading-spinner"></div>
        <div class="pdf-loading-text">${message}</div>
        <div class="pdf-loading-progress">${progress}</div>
    `;
    document.body.appendChild(loadingEl);
}

/**
 * Actualiza el progreso del loading
 */
function updateLoadingProgress(progress) {
    const progressEl = document.querySelector('.pdf-loading-progress');
    if (progressEl) {
        progressEl.textContent = progress;
    }
}

/**
 * Oculta el indicador de carga
 */
function hideLoading() {
    const loadingEl = document.getElementById('pdf-loading');
    if (loadingEl) {
        loadingEl.remove();
    }
}

/**
 * Carga el contenido HTML de una página
 * @param {string} url - URL del archivo HTML
 * @returns {Promise<string>} - Contenido HTML
 */
async function fetchPageContent(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error cargando ${url}`);
        }
        const html = await response.text();
        
        // Extraer solo el contenido del body si existe
        const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        return bodyMatch ? bodyMatch[1] : html;
    } catch (error) {
        console.warn(`No se pudo cargar la página: ${url}`, error);
        return null;
    }
}

/**
 * Genera el PDF del curso completo
 */
export async function generateCoursePDF() {
    const pages = getFlatPageList();
    const courseTitle = getCourseTitle();

    if (pages.length === 0) {
        alert('No hay páginas configuradas para generar el PDF');
        return;
    }

    showLoading('Preparando contenido del curso...', `0 de ${pages.length} páginas`);

    // Crear contenedor temporal para el PDF
    const pdfContainer = document.createElement('div');
    pdfContainer.id = 'pdf-temp-container';
    pdfContainer.style.cssText = `
        position: absolute;
        left: -9999px;
        top: 0;
        width: 210mm;
        background: white;
        padding: 20mm;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    `;

    // Agregar título del curso
    pdfContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #6b4a9a;">
            <h1 style="color: #6b4a9a; font-size: 24px; margin: 0 0 10px 0;">${courseTitle}</h1>
            <p style="color: #666; font-size: 12px; margin: 0;">Documento generado el ${new Date().toLocaleDateString('es-ES')}</p>
        </div>
    `;

    let loadedCount = 0;
    let failedPages = [];

    // Cargar todas las páginas
    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        updateLoadingProgress(`${i + 1} de ${pages.length} páginas`);

        const content = await fetchPageContent(page.file);

        if (content) {
            // Agregar separador de módulo si es la primera página del módulo
            const isFirstPageOfModule = i === 0 || pages[i - 1].moduleTitle !== page.moduleTitle;
            
            if (isFirstPageOfModule) {
                pdfContainer.innerHTML += `
                    <div style="margin-top: ${i > 0 ? '40px' : '20px'}; margin-bottom: 15px; padding: 10px 15px; background: #f3e8ff; border-left: 4px solid #6b4a9a;">
                        <h2 style="color: #6b4a9a; font-size: 16px; margin: 0;">${page.moduleTitle}</h2>
                    </div>
                `;
            }

            // Agregar título de página
            pdfContainer.innerHTML += `
                <div style="margin-top: 20px; margin-bottom: 10px;">
                    <h3 style="color: #333; font-size: 14px; margin: 0; padding-bottom: 5px; border-bottom: 1px solid #ddd;">${page.title}</h3>
                </div>
            `;

            // Agregar contenido de la página
            pdfContainer.innerHTML += `
                <div style="margin-bottom: 20px; font-size: 12px; line-height: 1.6; color: #333;">
                    ${content}
                </div>
            `;

            loadedCount++;
        } else {
            failedPages.push(page.title);
        }
    }

    document.body.appendChild(pdfContainer);

    // Verificar si html2pdf está disponible
    if (typeof html2pdf === 'undefined') {
        hideLoading();
        alert('Error: La librería html2pdf.js no está cargada');
        pdfContainer.remove();
        return;
    }

    // Generar el nombre del archivo
    const fileName = courseTitle
        .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]/g, '')
        .replace(/\s+/g, '_')
        .substring(0, 50);

    showLoading('Generando PDF...', 'Esto puede tardar unos segundos');

    // Configuración de html2pdf
    const opt = {
        margin: [10, 10, 10, 10],
        filename: `${fileName}.pdf`,
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            logging: false
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait' 
        },
        pagebreak: { 
            mode: ['avoid-all', 'css', 'legacy'] 
        }
    };

    try {
        await html2pdf().set(opt).from(pdfContainer).save();
        
        hideLoading();
        
        // Mostrar resumen
        if (failedPages.length > 0) {
            console.warn('Páginas que no se pudieron cargar:', failedPages);
            alert(`PDF generado con ${loadedCount} páginas.\n\nAlgunas páginas no se pudieron incluir: ${failedPages.join(', ')}`);
        }
    } catch (error) {
        console.error('Error generando PDF:', error);
        hideLoading();
        alert('Error al generar el PDF. Por favor, intenta de nuevo.');
    } finally {
        // Limpiar contenedor temporal
        pdfContainer.remove();
    }
}
