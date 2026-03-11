/**
 * app.js — Main application controller
 *
 * CHANGES FROM PREVIOUS VERSION:
 *   - renderRoute() now only handles 'cover' and 'page' types.
 *     'page' routes always fetch their HTML file from disk.
 *   - Removed all JSON-section rendering (renderSectionPage / initPageComponents
 *     from module-renderer are no longer called for content pages).
 *   - After fetching an HTML file, initComponentsInContainer() scans for
 *     [data-component] attributes and boots the matching JS component.
 *   - Sidebar nav and slide nav still show module group labels, but they are
 *     visually hidden via CSS class 'nav-module-hidden' — the tracking dots
 *     and visited state are preserved. To re-show labels, remove that class
 *     from the CSS or change the generateNavHTML() call below.
 *   - SCORM tracking and PDF export are unchanged.
 */

import { buildRoutes, getRoute, getTotalRoutes, getCourseTitle } from './router.js';
import { renderModuleCover } from './modules/module-renderer.js';
import { initSCORM, getLocation, setLocation, setProgress, setCompleted, setIncomplete, finishSCORM } from './scorm.js';

// ── Component registry ─────────────────────────────────────
// Each entry maps a data-component name to { render, init }.
// render(data) → HTML string
// init(container) → wires events inside the rendered HTML
//
// To add a new component:
//   1. Create /js/components/my-component.js with renderX and initX exports
//   2. Import them below and add an entry to COMPONENT_REGISTRY
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

const COMPONENT_REGISTRY = {
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

/**
 * initComponentsInContainer(container)
 *
 * Scans a DOM container for [data-component] elements.
 * For each one found:
 *   1. Reads data-config (and optional data-headers, data-items, data-zones,
 *      data-image, data-image-alt) to build a config object.
 *   2. Calls component.render(config) to inject HTML into the element.
 *   3. Calls component.init(element) to wire up interactive behaviour.
 *
 * HTML pages only need:
 *   <div data-component="accordion" data-config='[{"heading":"...","body":"..."}]'></div>
 *
 * The render functions expect a config object shaped like the old JSON sections.
 * We normalise the flat data-* attributes into that shape here so components
 * remain unchanged.
 */
function initComponentsInContainer(container) {
  container.querySelectorAll('[data-component]').forEach(el => {
    const name      = el.dataset.component;
    const component = COMPONENT_REGISTRY[name];

    if (!component) {
      console.warn(`[app] Unknown component: "${name}"`);
      return;
    }

    try {
      // Build the config object that render* functions expect.
      // data-config holds either an array (items/steps/slides/events/questions/refs)
      // or can be supplemented by data-headers for comparison-table.
      const rawConfig  = el.dataset.config  ? JSON.parse(el.dataset.config)  : [];
      const rawHeaders = el.dataset.headers ? JSON.parse(el.dataset.headers) : null;
      const rawItems   = el.dataset.items   ? JSON.parse(el.dataset.items)   : null;
      const rawZones   = el.dataset.zones   ? JSON.parse(el.dataset.zones)   : null;

      // Normalise into the shape each render* expects.
      // Each component has its own array key name; we map it here so
      // components stay unchanged.
      const ARRAY_KEY = {
        'accordion':        'items',
        'cards':            'items',
        'carousel':         'slides',
        'checklist':        'items',
        'comparison-table': 'rows',
        'drag-drop':        'items',    // zones comes from rawZones
        'hotspot':          'points',
        'multiple-choice':  'questions',
        'narrative-scroll': 'steps',
        'timeline':         'events',
        'toolbox':          'items',
      };

      const config = {
        // Map the parsed array to the correct key for this component
        [ARRAY_KEY[name]]: rawConfig,
        // comparison-table also needs headers
        ...(rawHeaders ? { headers: rawHeaders } : {}),
        // drag-drop also needs zones
        ...(rawZones   ? { zones:   rawZones   } : {}),
        // hotspot needs image url and alt text
        ...(el.dataset.image    ? { image:    el.dataset.image    } : {}),
        ...(el.dataset.imageAlt ? { imageAlt: el.dataset.imageAlt } : {}),
      };

      // Render HTML into the element
      el.innerHTML = component.render(config);

      // Wire up interactivity
      component.init(el);

    } catch (err) {
      console.error(`[app] Error initializing component "${name}":`, err);
      el.innerHTML = `<div class="page-error"><strong>Error en componente "${name}"</strong><p>${err.message}</p></div>`;
    }
  });
}

// ── State ──────────────────────────────────────────────────
let currentIndex = 0;
let visitedSet   = new Set();
let totalRoutes  = 0;

// ── DOM refs ───────────────────────────────────────────────
let appEl, progressTextEl, moduleChipEl, segProgressEl,
    pageNumEl, currentLocationEl, courseTitleEl,
    btnHome, btnPrev, btnNext, btnPdf, btnMenu,
    slideNav, menuOverlay;

// ── Init ───────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  buildRoutes();
  totalRoutes = getTotalRoutes();

  if (totalRoutes === 0) {
    console.error('[app] No hay rutas en course.config.js');
    return;
  }

  // Cache DOM references
  appEl             = document.getElementById('app');
  progressTextEl    = document.getElementById('progress-text');
  moduleChipEl      = document.getElementById('module-chip');
  segProgressEl     = document.getElementById('seg-progress');
  pageNumEl         = document.getElementById('page-num');
  currentLocationEl = document.getElementById('current-location');
  courseTitleEl     = document.getElementById('course-title');
  btnHome           = document.getElementById('btn-home');
  btnPrev           = document.getElementById('btn-prev');
  btnNext           = document.getElementById('btn-next');
  btnPdf            = document.getElementById('btn-pdf');
  btnMenu           = document.getElementById('btn-menu');
  slideNav          = document.getElementById('slide-nav');
  menuOverlay       = document.getElementById('menu-overlay');

  // Set course title in header and browser tab
  const title = getCourseTitle();
  if (courseTitleEl) courseTitleEl.textContent = title;
  document.title = title;

  // SCORM — restore saved position if available
  const scormActive = initSCORM();
  if (scormActive) {
    const saved = getLocation();
    if (saved !== null && !isNaN(saved) && saved < totalRoutes) {
      currentIndex = parseInt(saved, 10);
      // Mark all preceding pages as visited so progress is accurate
      for (let i = 0; i <= currentIndex; i++) visitedSet.add(i);
    }
  }

  // Wire navigation buttons
  if (btnHome) btnHome.addEventListener('click', () => navigateTo(0));
  if (btnPrev) btnPrev.addEventListener('click', () => navigateTo(currentIndex - 1));
  if (btnNext) btnNext.addEventListener('click', () => navigateTo(currentIndex + 1));
  if (btnPdf)  btnPdf.addEventListener('click',  exportPDF);
  if (btnMenu) btnMenu.addEventListener('click',  toggleSlideNav);
  if (menuOverlay) menuOverlay.addEventListener('click', closeSlideNav);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSlideNav(); });
  document.getElementById('btn-close-menu')?.addEventListener('click', closeSlideNav);

  // Build both navigation lists
  buildSideNav();
  buildSlideNav();

  // Load the first (or restored) page
  navigateTo(currentIndex);
});

// ── Navigation ─────────────────────────────────────────────
function navigateTo(index) {
  if (index < 0 || index >= totalRoutes) return;

  currentIndex = index;
  visitedSet.add(index);

  const route = getRoute(index);
  if (!route) return;

  renderRoute(route);
  updateUI(route);
  updateSideNavState();
  updateSlideNavState();
  syncSCORM();
}

/**
 * renderRoute(route)
 *
 * 'cover' → renders the auto-generated module cover using module-renderer.
 * 'page'  → fetches the HTML file and injects it, then boots data-component elements.
 */
function renderRoute(route) {
  if (!appEl) return;

  if (route.type === 'cover') {
    // Auto-generated cover — no file fetch needed
    const progress = calcModuleProgress(route.moduleIndex);
    appEl.innerHTML = renderModuleCover(route.module, route.moduleIndex, progress);

    // The "Ingresar" button on the cover advances to the next route
    appEl.querySelector('.btn-enter-module')?.addEventListener('click', () => {
      navigateTo(currentIndex + 1);
    });

  } else if (route.type === 'page') {
    // Show a brief loading state while fetching
    appEl.innerHTML = `<div class="page-loading">Cargando...</div>`;

    fetch(route.page.file)
      .then(r => {
        if (!r.ok) throw new Error(`${r.status} ${r.statusText} — ${route.page.file}`);
        return r.text();
      })
      .then(html => {
        // Extract only the <body> content if the file is a full HTML document,
        // otherwise use the raw HTML (partials / fragments are fine too).
        const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        appEl.innerHTML = bodyMatch ? bodyMatch[1] : html;

        // Boot any interactive components declared in the fetched HTML
        initComponentsInContainer(appEl);
      })
      .catch(err => {
        appEl.innerHTML = `
          <div class="page-error">
            <strong>Error al cargar la pagina</strong>
            <p>${err.message}</p>
          </div>`;
      });
  }
}

// ── UI Updates ─────────────────────────────────────────────
function updateUI(route) {
  const pct = Math.round((visitedSet.size / totalRoutes) * 100);

  // Sidebar progress percentage + segmented bar
  if (progressTextEl) progressTextEl.textContent = `${pct}%`;
  if (segProgressEl) {
    const SEG    = 10;
    const filled = Math.round((pct / 100) * SEG);
    segProgressEl.innerHTML = Array.from({ length: SEG }, (_, i) =>
      `<span class="seg-block ${i < filled ? 'filled' : ''}"></span>`
    ).join('');
  }

  // Module chip label in sidebar
  if (moduleChipEl && route.module) {
    moduleChipEl.textContent = route.module.title;
  }

  // Header breadcrumb + page counter
  if (currentLocationEl) currentLocationEl.textContent = route.title || '—';
  if (pageNumEl) pageNumEl.textContent = currentIndex + 1;

  // Disable Prev/Next at boundaries
  if (btnPrev) btnPrev.disabled = currentIndex === 0;
  if (btnNext) btnNext.disabled = currentIndex === totalRoutes - 1;
}

/** Per-module completion percentage used by the cover screen */
function calcModuleProgress(moduleIndex) {
  let total = 0, visited = 0;
  for (let i = 0; i < totalRoutes; i++) {
    const r = getRoute(i);
    if (r && r.moduleIndex === moduleIndex) {
      total++;
      if (visitedSet.has(i)) visited++;
    }
  }
  return total > 0 ? Math.round((visited / total) * 100) : 0;
}

// ── Sidebar Nav ────────────────────────────────────────────
function buildSideNav() {
  const nav = document.getElementById('sidebar-nav');
  if (!nav) return;
  // 'hidden-modules' = true hides module group labels, keeping only page items.
  // Change to false to show module labels again.
  nav.innerHTML = generateNavHTML('sidebar-nav-module', 'sidebar-nav-page', true);
  nav.querySelectorAll('.sidebar-nav-page').forEach(el => {
    el.addEventListener('click', () => navigateTo(parseInt(el.dataset.idx, 10)));
  });
}

function updateSideNavState() {
  const nav = document.getElementById('sidebar-nav');
  if (!nav) return;
  nav.querySelectorAll('.sidebar-nav-page').forEach(el => {
    const idx = parseInt(el.dataset.idx, 10);
    el.classList.toggle('active',  idx === currentIndex);
    el.classList.toggle('visited', visitedSet.has(idx) && idx !== currentIndex);
  });
}

function buildSlideNav() {
  const body = document.getElementById('slide-nav-content');
  if (!body) return;
  // Same flag: true = hide module labels in the slide-out panel
  body.innerHTML = generateNavHTML('snav-module', 'snav-page', true);
  body.querySelectorAll('.snav-page').forEach(el => {
    el.addEventListener('click', () => {
      navigateTo(parseInt(el.dataset.idx, 10));
      closeSlideNav();
    });
  });
}

function updateSlideNavState() {
  const body = document.getElementById('slide-nav-content');
  if (!body) return;
  body.querySelectorAll('.snav-page').forEach(el => {
    const idx = parseInt(el.dataset.idx, 10);
    el.classList.toggle('active',  idx === currentIndex);
    el.classList.toggle('visited', visitedSet.has(idx) && idx !== currentIndex);
  });
}

/**
 * generateNavHTML(moduleClass, pageClass, hideModuleLabels)
 *
 * Builds the HTML for both nav lists from the flat routes array.
 *
 * hideModuleLabels = true  → module group headers get class 'nav-module-hidden'
 *                            (visually hidden, but the DOM element stays for
 *                             potential re-use or screen-reader grouping)
 * hideModuleLabels = false → module headers are fully visible
 *
 * Completion tracking (visited/active classes on page items) always works
 * regardless of whether module labels are shown.
 */
function generateNavHTML(moduleClass, pageClass, hideModuleLabels = false) {
  let html = '';
  let lastModuleIndex = -1;

  for (let i = 0; i < totalRoutes; i++) {
    const route = getRoute(i);
    if (!route) continue;

    // Emit a module group header when the module changes
    if (route.moduleIndex !== lastModuleIndex) {
      const hiddenClass = hideModuleLabels ? ' nav-module-hidden' : '';
      html += `<div class="${moduleClass}${hiddenClass}" aria-hidden="${hideModuleLabels}">${route.module.title}</div>`;
      lastModuleIndex = route.moduleIndex;
    }

    const isActive  = i === currentIndex;
    const isVisited = visitedSet.has(i) && !isActive;
    html += `<div class="${pageClass}${isActive ? ' active' : ''}${isVisited ? ' visited' : ''}"
                  data-idx="${i}"
                  role="button"
                  tabindex="0"
                  aria-current="${isActive ? 'page' : 'false'}">${route.title}</div>`;
  }
  return html;
}

// ── Slide Nav toggle ───────────────────────────────────────
function toggleSlideNav() {
  slideNav?.classList.contains('active') ? closeSlideNav() : openSlideNav();
}
function openSlideNav() {
  slideNav?.classList.add('active');
  menuOverlay?.classList.add('active');
  btnMenu?.classList.add('open');
}
function closeSlideNav() {
  slideNav?.classList.remove('active');
  menuOverlay?.classList.remove('active');
  btnMenu?.classList.remove('open');
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
