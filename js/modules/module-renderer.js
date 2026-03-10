/**
 * module-renderer.js
 *
 * Renders a full page (cover or section page) from course config data.
 * Works with both legacy HTML-file pages and new JSON-driven sections.
 */

import { renderSection, initSections } from './interaction-renderer.js';

/**
 * Build the HTML for a module cover page
 * @param {object} module  - module config object
 * @param {number} moduleIndex
 * @param {number} progressPercent
 * @returns {string}
 */
export function renderModuleCover(module, moduleIndex, progressPercent = 0) {
  const SEG_TOTAL = 10;
  const filled = Math.round((progressPercent / 100) * SEG_TOTAL);
  const segBlocks = Array.from({ length: SEG_TOTAL }, (_, i) =>
    `<span class="sb ${i < filled ? 'filled' : ''}"></span>`
  ).join('');

  const PIN_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;

  const listIcons = [
    `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`,
    `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>`,
    `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/></svg>`,
  ];

  const highlights = (module.highlights || []).map((text, i) => `
    <div class="cover-list-item">
      <div class="cover-list-icon">${listIcons[i % listIcons.length]}</div>
      <div class="cover-list-text">${text}</div>
    </div>
  `).join('');

  return `
    <div class="module-cover">
      <div class="module-cover-left">
        <div class="module-cover-badge">
          <div class="module-cover-icon">${PIN_ICON}</div>
          <div class="module-cover-title-pill">${module.title}</div>
          <div class="module-cover-progress">
            ${progressPercent}%
            <div class="seg-bar-inline">${segBlocks}</div>
          </div>
        </div>
        ${module.description ? `<p class="module-cover-body">${module.description}</p>` : ''}
        ${highlights ? `<div class="module-cover-list">${highlights}</div>` : ''}
        <button class="enter-btn" id="btn-enter-module">
          Ingresar
          <div class="enter-icon">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
          </div>
        </button>
      </div>
    </div>
  `;
}

/**
 * Render a section page (with one or more interaction components)
 * @param {object} page  - page config object (has sections array)
 * @returns {string}
 */
export function renderSectionPage(page) {
  const sections = (page.sections || []).map((section, i) =>
    `<div class="section-block">${renderSection(section, i)}</div>`
  ).join('');

  return sections || `<p style="color:#999;">Esta pagina no tiene contenido configurado.</p>`;
}

/**
 * After injecting HTML, initialise all interactive components
 * @param {HTMLElement} container
 * @param {object} page  - page config
 * @param {Function} onEnterModule  - callback when "Ingresar" is clicked on a cover
 */
export function initPageComponents(container, page, onEnterModule) {
  // Init all interaction components
  initSections(container);

  // Wire "Ingresar" button on module cover
  const enterBtn = container.querySelector('#btn-enter-module');
  if (enterBtn && typeof onEnterModule === 'function') {
    enterBtn.addEventListener('click', onEnterModule);
  }
}
