/**
 * hotspot.js — Image hotspot interaction
 *
 * Config shape:
 * {
 *   "type": "hotspot",
 *   "title": "...",
 *   "image": "path/to/img.jpg",
 *   "imageAlt": "Description",
 *   "points": [
 *     { "x": 30, "y": 45, "label": "1", "heading": "...", "body": "..." }
 *   ]
 * }
 */
let hotspotCounter = 0;

export function renderHotspot(data) {
  const id = `hs-${hotspotCounter++}`;

  // Use a placeholder if no image provided
  const imgSrc = data.image || `/placeholder.svg?width=800&height=400`;
  const imgAlt = data.imageAlt || 'Imagen interactiva';

  const points = (data.points || []).map((pt, i) => `
    <button
      class="hotspot-point"
      style="left:${pt.x}%;top:${pt.y}%;"
      data-point="${i}"
      aria-label="${pt.heading || 'Punto ' + (i + 1)}"
    >${pt.label || i + 1}</button>
    <div class="hotspot-popup" id="${id}-popup-${i}">
      <button class="hotspot-close-btn" data-close="${i}">&times;</button>
      ${pt.heading ? `<h4>${pt.heading}</h4>` : ''}
      <p>${pt.body || ''}</p>
    </div>
  `).join('');

  return `
    ${data.title ? `<h3 class="section-heading">${data.title}</h3>` : ''}
    ${data.intro ? `<p class="section-body">${data.intro}</p>` : ''}
    <div class="hotspot-wrap" id="${id}">
      <img src="${imgSrc}" alt="${imgAlt}" class="hotspot-img">
      ${points}
    </div>
  `;
}

export function initHotspot(container) {
  container.querySelectorAll('.hotspot-wrap').forEach(wrap => {
    const id = wrap.id;

    wrap.querySelectorAll('.hotspot-point').forEach(pt => {
      pt.addEventListener('click', e => {
        e.stopPropagation();
        const idx = pt.dataset.point;

        // Close all popups first
        wrap.querySelectorAll('.hotspot-popup').forEach(p => p.classList.remove('visible'));
        wrap.querySelectorAll('.hotspot-point').forEach(p => p.classList.remove('active'));

        const popup = wrap.querySelector(`#${id}-popup-${idx}`);
        if (popup) {
          popup.classList.add('visible');
          pt.classList.add('active');

          // Position popup near point but keep in bounds
          const ptRect = pt.getBoundingClientRect();
          const wrapRect = wrap.getBoundingClientRect();
          const left = ptRect.left - wrapRect.left;
          const top = ptRect.top - wrapRect.top;
          popup.style.left = (left + 20) + 'px';
          popup.style.top = Math.max(0, top - 20) + 'px';
        }
      });
    });

    wrap.querySelectorAll('.hotspot-close-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const popup = btn.closest('.hotspot-popup');
        if (popup) popup.classList.remove('visible');
        wrap.querySelectorAll('.hotspot-point').forEach(p => p.classList.remove('active'));
      });
    });

    // Close on outside click
    document.addEventListener('click', () => {
      wrap.querySelectorAll('.hotspot-popup').forEach(p => p.classList.remove('visible'));
      wrap.querySelectorAll('.hotspot-point').forEach(p => p.classList.remove('active'));
    });
  });
}
