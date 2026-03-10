/**
 * timeline.js — Vertical timeline component
 *
 * Config shape:
 * {
 *   "type": "timeline",
 *   "title": "...",
 *   "events": [
 *     { "year": "2005", "heading": "...", "body": "..." }
 *   ]
 * }
 */
export function renderTimeline(data) {
  const events = (data.events || []).map(ev => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      ${ev.year ? `<div class="timeline-year">${ev.year}</div>` : ''}
      <h4>${ev.heading}</h4>
      <p>${ev.body}</p>
    </div>
  `).join('');

  return `
    ${data.title ? `<h3 class="section-heading">${data.title}</h3>` : ''}
    ${data.intro ? `<p class="section-body">${data.intro}</p>` : ''}
    <div class="timeline">${events}</div>
  `;
}

export function initTimeline() { /* static */ }
