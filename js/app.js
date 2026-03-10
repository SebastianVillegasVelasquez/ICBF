/**
 * app.js — Main application controller
 *
 * Responsibilities:
 * - Bootstrap the course on page load
 * - Drive navigation (prev/next/home/direct)
 * - Update all UI: header, sidebar, progress
 * - Handle slide-out nav menu
 * - Integrate with SCORM wrapper
 * - PDF export
 */

import { buildRoutes, getRoute, getTotalRoutes, getCourseTitle } from './router.js';
import { renderModuleCover, renderSectionPage, initPageComponents } from './modules/module-renderer.js';
import { initSCORM, getLocation, setLocation, setProgress, setCompleted, setIncomplete, finishSCORM } from './scorm.js';

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
    console.error('No hay rutas en course.config.js');
    return;
  }

  // Cache DOM
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

  // Course title
  const title = getCourseTitle();
  if (courseTitleEl) courseTitleEl.textContent = title;
  document.title = title;

  // SCORM
  const scormActive = initSCORM();
  if (scormActive) {
    const saved = getLocation();
    if (saved !== null && !isNaN(saved) && saved < totalRoutes) {
      currentIndex = saved;
      for (let i = 0; i <= saved; i++) visitedSet.add(i);
    }
  }

  // Wire buttons
  if (btnHome) btnHome.addEventListener('click', () => navigateTo(0));
  if (btnPrev) btnPrev.addEventListener('click', () => navigateTo(currentIndex - 1));
  if (btnNext) btnNext.addEventListener('click', () => navigateTo(currentIndex + 1));
  if (btnPdf)  btnPdf.addEventListener('click',  exportPDF);
  if (btnMenu) btnMenu.addEventListener('click',  toggleSlideNav);
  if (menuOverlay) menuOverlay.addEventListener('click', closeSlideNav);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSlideNav(); });
  document.getElementById('btn-close-menu')?.addEventListener('click', closeSlideNav);

  // Build side navigation
  buildSideNav();
  buildSlideNav();

  // Load first page
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

function renderRoute(route) {
  if (!appEl) return;

  if (route.type === 'cover') {
    const progress = calcModuleProgress(route.moduleIndex);
    appEl.innerHTML = renderModuleCover(route.module, route.moduleIndex, progress);
    initPageComponents(appEl, route, () => navigateTo(currentIndex + 1));

  } else if (route.type === 'section') {
    appEl.innerHTML = renderSectionPage(route.page);
    initPageComponents(appEl, route.page, null);

  } else if (route.type === 'html') {
    appEl.innerHTML = `<div style="padding:40px;text-align:center;color:#999;">Cargando...</div>`;
    fetch(route.page.file)
      .then(r => { if (!r.ok) throw new Error(r.statusText); return r.text(); })
      .then(html => {
        const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        appEl.innerHTML = body ? body[1] : html;
        initPageComponents(appEl, route.page, null);
      })
      .catch(err => {
        appEl.innerHTML = `<div style="padding:40px;color:#c00;">Error: ${err.message}</div>`;
      });
  }
}

// ── UI Updates ─────────────────────────────────────────────
function updateUI(route) {
  const pct = Math.round((visitedSet.size / totalRoutes) * 100);

  // Progress text + segmented bar
  if (progressTextEl) progressTextEl.textContent = `${pct}%`;
  if (segProgressEl) {
    const SEG = 10;
    const filled = Math.round((pct / 100) * SEG);
    segProgressEl.innerHTML = Array.from({ length: SEG }, (_, i) =>
      `<span class="seg-block ${i < filled ? 'filled' : ''}"></span>`
    ).join('');
  }

  // Module chip
  if (moduleChipEl && route.module) {
    moduleChipEl.textContent = route.module.title;
  }

  // Header location + page number
  if (currentLocationEl) currentLocationEl.textContent = route.title || '—';
  if (pageNumEl) pageNumEl.textContent = currentIndex + 1;

  // Prev/Next buttons
  if (btnPrev) { btnPrev.disabled = currentIndex === 0; }
  if (btnNext) { btnNext.disabled = currentIndex === totalRoutes - 1; }
}

function calcModuleProgress(moduleIndex) {
  let total = 0;
  let visited = 0;
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
  nav.innerHTML = generateNavHTML('sidebar-nav-module', 'sidebar-nav-page');
  nav.querySelectorAll('.sidebar-nav-page').forEach(el => {
    el.addEventListener('click', () => navigateTo(parseInt(el.dataset.idx, 10)));
  });
}

function updateSideNavState() {
  const nav = document.getElementById('sidebar-nav');
  if (!nav) return;
  nav.querySelectorAll('.sidebar-nav-page').forEach(el => {
    const idx = parseInt(el.dataset.idx, 10);
    el.classList.toggle('active', idx === currentIndex);
    el.classList.toggle('visited', visitedSet.has(idx) && idx !== currentIndex);
  });
}

function buildSlideNav() {
  const body = document.getElementById('slide-nav-content');
  if (!body) return;
  body.innerHTML = generateNavHTML('snav-module', 'snav-page');
  body.querySelectorAll('.snav-page').forEach(el => {
    el.addEventListener('click', () => { navigateTo(parseInt(el.dataset.idx, 10)); closeSlideNav(); });
  });
}

function updateSlideNavState() {
  const body = document.getElementById('slide-nav-content');
  if (!body) return;
  body.querySelectorAll('.snav-page').forEach(el => {
    const idx = parseInt(el.dataset.idx, 10);
    el.classList.toggle('active', idx === currentIndex);
    el.classList.toggle('visited', visitedSet.has(idx) && idx !== currentIndex);
  });
}

/** Generate nav HTML for both sidebar and slide-nav */
function generateNavHTML(moduleClass, pageClass) {
  let html = '';
  let lastModuleIndex = -1;

  for (let i = 0; i < totalRoutes; i++) {
    const route = getRoute(i);
    if (!route) continue;

    if (route.moduleIndex !== lastModuleIndex) {
      html += `<div class="${moduleClass}">${route.module.title}</div>`;
      lastModuleIndex = route.moduleIndex;
    }

    const isActive  = i === currentIndex;
    const isVisited = visitedSet.has(i) && !isActive;
    html += `<div class="${pageClass} ${isActive ? 'active' : ''} ${isVisited ? 'visited' : ''}"
                  data-idx="${i}">${route.title}</div>`;
  }
  return html;
}

// ── Slide Nav toggle ───────────────────────────────────────
function toggleSlideNav() {
  if (slideNav && slideNav.classList.contains('active')) closeSlideNav();
  else openSlideNav();
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
  } catch (_) { /* not in SCORM context */ }
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
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'font-family:sans-serif;padding:24px;';
  wrapper.innerHTML = `<h1 style="color:#1a5c38;">${courseTitle}</h1><hr style="margin-bottom:24px;">`;

  for (let i = 0; i < totalRoutes; i++) {
    const route = getRoute(i);
    if (!route) continue;

    const section = document.createElement('div');
    section.style.cssText = 'margin-bottom:32px;page-break-inside:avoid;';

    if (route.type === 'section') {
      section.innerHTML = `<h2 style="color:#2e7d32;">${route.title}</h2>` + renderSectionPage(route.page);
    } else if (route.type === 'cover') {
      section.innerHTML = `<h2 style="color:#c17f3a;">${route.module.title}</h2>
        ${route.module.description ? `<p>${route.module.description}</p>` : ''}`;
    } else if (route.type === 'html') {
      try {
        const res = await fetch(route.page.file);
        const text = await res.text();
        const body = text.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        section.innerHTML = `<h2 style="color:#2e7d32;">${route.title}</h2>` + (body ? body[1] : '');
      } catch (_) { continue; }
    }
    wrapper.appendChild(section);
    loading.querySelector('p').textContent = `Procesando ${i + 1} / ${totalRoutes}...`;
    await new Promise(r => setTimeout(r, 10));
  }

  const opt = {
    margin: [10, 10, 10, 10],
    filename: `${courseTitle.replace(/\s+/g, '_')}.pdf`,
    image: { type: 'jpeg', quality: 0.9 },
    html2canvas: { scale: 1.5, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  try {
    await html2pdf().set(opt).from(wrapper).save();
  } catch (err) {
    console.error('PDF error:', err);
    alert('Error generando PDF');
  } finally {
    document.body.removeChild(loading);
  }
}
