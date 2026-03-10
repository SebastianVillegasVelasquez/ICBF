/**
 * toolbox.js — Toolbox (non-interactive reference resource)
 *
 * Config shape:
 * {
 *   "type": "toolbox",
 *   "title": "...",
 *   "items": [
 *     { "icon": "svgString", "title": "...", "body": "..." }
 *   ]
 * }
 */

const TOOL_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>`;

export function renderToolbox(data) {
  const items = (data.items || []).map(item => `
    <div class="toolbox-item">
      <div class="toolbox-icon">${item.icon || TOOL_ICON}</div>
      <div>
        <h4>${item.title}</h4>
        <p>${item.body}</p>
      </div>
    </div>
  `).join('');

  return `
    ${data.title ? `<h3 class="section-heading">${data.title}</h3>` : ''}
    ${data.intro ? `<p class="section-body">${data.intro}</p>` : ''}
    <div class="toolbox">${items}</div>
  `;
}

export function initToolbox() { /* static */ }

/**
 * bibliography.js — Bibliography list (kept in toolbox.js for simplicity)
 *
 * Config shape:
 * {
 *   "type": "bibliography",
 *   "title": "...",
 *   "refs": [
 *     { "authors": "...", "year": "...", "title": "...", "source": "...", "url": "..." }
 *   ]
 * }
 */
export function renderBibliography(data) {
  const refs = (data.refs || []).map(ref => `
    <div class="bib-item">
      ${ref.authors ? `<strong>${ref.authors}</strong>` : ''}
      ${ref.year ? ` (${ref.year}).` : ''}
      ${ref.title ? ` ${ref.title}.` : ''}
      ${ref.source ? ` <em>${ref.source}.</em>` : ''}
      ${ref.url ? ` <a href="${ref.url}" target="_blank" rel="noopener">${ref.url}</a>` : ''}
    </div>
  `).join('');

  return `
    ${data.title ? `<h3 class="section-heading">${data.title}</h3>` : ''}
    ${data.intro ? `<p class="section-body">${data.intro}</p>` : ''}
    <div class="bibliography">${refs}</div>
  `;
}

export function initBibliography() { /* static */ }
