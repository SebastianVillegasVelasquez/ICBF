/**
 * accordion.js — Accordion / Reveal component
 *
 * Config shape:
 * {
 *   "type": "accordion",
 *   "title": "...",
 *   "items": [
 *     { "heading": "...", "body": "..." }
 *   ]
 * }
 */
export function renderAccordion(data) {
  const items = (data.items || []).map((item, i) => `
    <div class="accordion-item">
      <button class="accordion-trigger" data-idx="${i}" aria-expanded="false">
        <span>${item.heading}</span>
        <span class="accordion-arrow">&#9660;</span>
      </button>
      <div class="accordion-body" id="acc-body-${i}">
        <div class="accordion-body-inner">${item.body}</div>
      </div>
    </div>
  `).join('');

  return `
    ${data.title ? `<h3 class="section-heading">${data.title}</h3>` : ''}
    ${data.intro ? `<p class="section-body">${data.intro}</p>` : ''}
    <div class="accordion" role="list">${items}</div>
  `;
}

export function initAccordion(container) {
  container.querySelectorAll('.accordion-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.dataset.idx;
      const body = container.querySelector(`#acc-body-${idx}`);
      const isOpen = btn.classList.contains('open');

      // Close all
      container.querySelectorAll('.accordion-trigger').forEach(b => {
        b.classList.remove('open');
        b.setAttribute('aria-expanded', 'false');
      });
      container.querySelectorAll('.accordion-body').forEach(b => {
        b.style.maxHeight = '0';
      });

      // Open clicked (toggle)
      if (!isOpen) {
        btn.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}
