/**
 * app.js — Controlador principal de la aplicación
 *
 * El shell (index.html) contiene permanentemente:
 *   - Barra de progreso (arriba izquierda)
 *   - Menú de navegación vertical (pill-nav, derecha)
 *
 * Cada pantalla definida en course.config.js se inyecta en #app.
 * Tres tipos de pantalla:
 *   - 'welcome'  → renderWelcome()
 *   - 'video'    → renderVideo()
 *   - 'content'  → renderContent() — plantilla con componentes
 *
 * Para agregar un componente nuevo al registro:
 *   1. Crea /js/components/mi-componente.js con renderX e initX
 *   2. Impórtalo aquí y agrégalo a COMPONENTS
 */

import { buildRoutes, getRoute, getTotalRoutes, getCourseTitle } from './router.js';
import { initSCORM, getLocation, setLocation, setProgress, setCompleted, setIncomplete, finishSCORM } from './scorm.js';

// ── Renderizadores de pantallas ────────────────────────────
import { renderWelcome } from './screens/screen-welcome.js';
import { renderVideo }   from './screens/screen-video.js';

// ── Registro de componentes ────────────────────────────────
// Para agregar uno nuevo: importa y añade una entrada aquí.
import { renderAccordion,       initAccordion }       from './components/accordion.js';
import { renderCards,           initCards }           from './components/cards.js';
import { renderCarousel,        initCarousel }        from './components/carousel.js';
import { renderChecklist,       initChecklist }       from './components/checklist.js';
import { renderComparisonTable, initComparisonTable } from './components/comparison-table.js';
import { renderDragDrop,        initDragDrop }        from './components/drag-drop.js';
import { renderHotspot,         initHotspot }         from './components/hotspot.js';
import { renderMultipleChoice,  initMultipleChoice }  from './components/multiple-choice.js';
import { renderTimeline,        initTimeline }        from './components/timeline.js';
import { renderToolbox,         initToolbox }         from './components/toolbox.js';
import { renderNarrativeScroll, initNarrativeScroll } from './components/narrative-scroll.js';

const COMPONENTS = {
  'accordion':        { render: renderAccordion,       init: initAccordion },
  'cards':            { render: renderCards,           init: initCards },
  'carousel':         { render: renderCarousel,        init: initCarousel },
  'checklist':        { render: renderChecklist,       init: initChecklist },
  'comparison-table': { render: renderComparisonTable, init: initComparisonTable },
  'drag-drop':        { render: renderDragDrop,        init: initDragDrop },
  'hotspot':          { render: renderHotspot,         init: initHotspot },
  'multiple-choice':  { render: renderMultipleChoice,  init: initMultipleChoice },
  'timeline':         { render: renderTimeline,        init: initTimeline },
  'toolbox':          { render: renderToolbox,         init: initToolbox },
  'narrative-scroll': { render: renderNarrativeScroll, init: initNarrativeScroll },
};

// ── Estado ─────────────────────────────────────────────────
let currentIndex = 0;
let visitedSet   = new Set();
let totalRoutes  = 0;

// ── Referencias DOM ────────────────────────────────────────
let appEl, progressTextEl, progressFill, progressArrow, btnPrev, btnNext;

// ── Inicio ─────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  buildRoutes();
  totalRoutes = getTotalRoutes();

  if (totalRoutes === 0) {
    console.error('[app] No hay pantallas definidas en course.config.js');
    return;
  }

  appEl          = document.getElementById('app');
  progressTextEl = document.getElementById('progress-percentage');
  const chevron  = document.getElementById('progress-chevron');
  progressFill   = chevron?.querySelector('.progress-bar-fill');
  progressArrow  = chevron?.querySelector('.progress-bar-arrow');
  btnPrev        = document.getElementById('btn-prev');
  btnNext        = document.getElementById('btn-next');

  document.title = getCourseTitle();

  const scormActive = initSCORM();
  if (scormActive) {
    const saved = getLocation();
    if (saved !== null && !isNaN(saved) && saved < totalRoutes) {
      currentIndex = parseInt(saved, 10);
      for (let i = 0; i <= currentIndex; i++) visitedSet.add(i);
    }
  }

  document.getElementById('btn-home')?.addEventListener('click', () => navigateTo(0));
  btnPrev?.addEventListener('click', () => navigateTo(currentIndex - 1));
  btnNext?.addEventListener('click', () => navigateTo(currentIndex + 1));
  document.getElementById('btn-pdf')?.addEventListener('click', exportPDF);

  navigateTo(currentIndex);
});

// ── Navegación ─────────────────────────────────────────────
function navigateTo(index) {
  if (index < 0 || index >= totalRoutes) return;
  currentIndex = index;
  visitedSet.add(index);
  renderRoute(getRoute(index));
  updateProgressBar();
  syncSCORM();
}

// ── Renderizado de pantallas ────────────────────────────────
// Cada tipo de pantalla produce HTML y lo inyecta en #app.
// La barra de progreso y el menú de navegación siempre están
// presentes en el shell (index.html) — no forman parte de la pantalla.
function renderRoute(route) {
  if (!appEl || !route) return;

  if (route.type === 'welcome') {
    appEl.innerHTML = renderWelcome(route);

  } else if (route.type === 'video') {
    appEl.innerHTML = renderVideo(route);

  } else if (route.type === 'content') {
    // Plantilla genérica: renderiza la lista de componentes definidos en route.components[]
    appEl.innerHTML = renderContentScreen(route);
    bootComponents(appEl);

  } else {
    appEl.innerHTML = `<div class="page-error"><strong>Tipo de pantalla desconocido:</strong> ${route.type}</div>`;
  }
}

// ── Plantilla de contenido ──────────────────────────────────
// Itera sobre route.components[] y renderiza cada uno en orden.
// Cada componente es: { type: 'carousel', data: { ... } }
function renderContentScreen(route) {
  const title = route.title ? `<h2 class="content-screen-title">${route.title}</h2>` : '';
  const body  = (route.components || []).map(comp => {
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

// Inicializa la interactividad de los componentes ya renderizados.
function bootComponents(container) {
  container.querySelectorAll('[data-booted]').forEach(el => {
    const name  = el.dataset.booted;
    const entry = COMPONENTS[name];
    if (entry?.init) {
      try { entry.init(el); }
      catch (err) { console.error(`[app] init error "${name}":`, err); }
    }
  });
}

// ── Barra de progreso ───────────────────────────────────────
function updateProgressBar() {
  const pct = Math.round((visitedSet.size / totalRoutes) * 100);
  if (progressTextEl) progressTextEl.textContent = `${pct}%`;
  if (progressFill)   progressFill.style.width   = `${pct}%`;
  if (progressArrow)  progressArrow.style.left   = `${pct}%`;
  if (btnPrev) btnPrev.disabled = currentIndex === 0;
  if (btnNext) btnNext.disabled = currentIndex === totalRoutes - 1;
}

// ── SCORM ──────────────────────────────────────────────────
function syncSCORM() {
  try {
    setLocation(currentIndex);
    const pct = Math.round((visitedSet.size / totalRoutes) * 100);
    setProgress(pct);
    pct >= 100 ? setCompleted() : setIncomplete();
  } catch (_) { /* Not running inside a SCORM LMS — safe to ignore */ }
}

window.addEventListener('beforeunload', () => {
  try { finishSCORM(); } catch (_) {}
});

// ── PDF Export ─────────────────────────────────────────────
async function exportPDF() {
  if (typeof html2pdf === 'undefined') {
    alert('La libreria PDF no esta disponible.');
    return;
  }

  const loading = document.createElement('div');
  loading.className = 'pdf-loading';
  loading.innerHTML = `<div class="pdf-spinner"></div><p>Generando PDF...</p>`;
  document.body.appendChild(loading);

  const courseTitle = getCourseTitle();
  const wrapper     = document.createElement('div');
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
        const res  = await fetch(route.page.file);
        const text = await res.text();
        const body = text.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        section.innerHTML = `<h2 style="color:#2e7d32;">${route.title}</h2>` + (body ? body[1] : text);
      } catch (_) { continue; }
    }

    wrapper.appendChild(section);
    loading.querySelector('p').textContent = `Procesando ${i + 1} / ${totalRoutes}...`;
    await new Promise(r => setTimeout(r, 10));
  }

  const opt = {
    margin:     [10, 10, 10, 10],
    filename:   `${courseTitle.replace(/\s+/g, '_')}.pdf`,
    image:      { type: 'jpeg', quality: 0.9 },
    html2canvas: { scale: 1.5, useCORS: true },
    jsPDF:      { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  try {
    await html2pdf().set(opt).from(wrapper).save();
  } catch (err) {
    console.error('[app] PDF error:', err);
    alert('Error generando PDF');
  } finally {
    document.body.removeChild(loading);
  }
}
