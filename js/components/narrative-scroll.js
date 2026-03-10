/**
 * narrative-scroll.js — Step-by-step narrative component
 *
 * Config shape:
 * {
 *   "type": "narrative-scroll",
 *   "title": "...",
 *   "steps": [
 *     { "heading": "...", "body": "..." }
 *   ]
 * }
 */
export function renderNarrativeScroll(data) {
  const steps = (data.steps || []).map((step, i) => `
    <div class="narrative-scroll">
      <div class="ns-block">
        <div class="ns-step">${i + 1}</div>
        <div class="ns-content">
          ${step.heading ? `<h4>${step.heading}</h4>` : ''}
          <p>${step.body}</p>
        </div>
      </div>
    </div>
  `).join('');

  return `
    ${data.title ? `<h3 class="section-heading">${data.title}</h3>` : ''}
    ${data.intro ? `<p class="section-body">${data.intro}</p>` : ''}
    ${steps}
  `;
}

export function initNarrativeScroll() { /* static */ }
