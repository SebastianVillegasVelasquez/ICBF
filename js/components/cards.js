/**
 * cards.js — Card grid component
 *
 * Config shape:
 * {
 *   "type": "cards",
 *   "title": "...",
 *   "items": [
 *     { "icon": "svgString", "title": "...", "body": "..." }
 *   ]
 * }
 */

const DEFAULT_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z"/></svg>`;

export function renderCards(data) {
  const cards = (data.items || []).map(item => `
    <div class="card-item">
      <div class="card-item-icon">${item.icon || DEFAULT_ICON}</div>
      <h4>${item.title}</h4>
      <p>${item.body}</p>
    </div>
  `).join('');

  return `
    ${data.title ? `<h3 class="section-heading">${data.title}</h3>` : ''}
    ${data.intro ? `<p class="section-body">${data.intro}</p>` : ''}
    <div class="cards-grid">${cards}</div>
  `;
}

export function initCards() { /* no JS interaction needed */ }
