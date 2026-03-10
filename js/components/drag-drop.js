/**
 * drag-drop.js — Drag and drop categorization component
 *
 * Config shape:
 * {
 *   "type": "drag-drop",
 *   "title": "...",
 *   "instruction": "...",
 *   "items": ["Item A", "Item B"],
 *   "zones": [
 *     { "label": "Category 1", "accepts": ["Item A"] },
 *     { "label": "Category 2", "accepts": ["Item B"] }
 *   ]
 * }
 */
let dndCounter = 0;

export function renderDragDrop(data) {
  const id = `dnd-${dndCounter++}`;
  const items = (data.items || []).map((item, i) =>
    `<div class="dnd-item" draggable="true" data-item="${i}" data-text="${item}">${item}</div>`
  ).join('');

  const zones = (data.zones || []).map((zone, i) => `
    <div class="dnd-target-col">
      <div class="dnd-col-label">${zone.label}</div>
      <div class="dnd-drop-zone" data-zone="${i}" data-accepts='${JSON.stringify(zone.accepts)}'></div>
    </div>
  `).join('');

  return `
    ${data.title ? `<h3 class="section-heading">${data.title}</h3>` : ''}
    ${data.instruction ? `<p class="section-body">${data.instruction}</p>` : ''}
    <div id="${id}">
      <div class="dnd-wrap">
        <div class="dnd-source-col">
          <div class="dnd-col-label">Elementos</div>
          <div class="dnd-items" id="${id}-source">${items}</div>
        </div>
        ${zones}
      </div>
      <button class="dnd-check-btn" data-dnd="${id}">Verificar</button>
      <div class="dnd-result" id="${id}-result"></div>
    </div>
  `;
}

export function initDragDrop(container) {
  let draggedItem = null;

  container.querySelectorAll('.dnd-item').forEach(item => {
    item.addEventListener('dragstart', e => {
      draggedItem = item;
      item.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });
    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
      draggedItem = null;
    });
  });

  const allZones = [...container.querySelectorAll('.dnd-drop-zone'), ...container.querySelectorAll('[id$="-source"]')];

  allZones.forEach(zone => {
    zone.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      zone.classList.add('dragover');
    });
    zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
    zone.addEventListener('drop', e => {
      e.preventDefault();
      zone.classList.remove('dragover');
      if (draggedItem) zone.appendChild(draggedItem);
    });
  });

  container.querySelectorAll('.dnd-check-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const dndId = btn.dataset.dnd;
      const wrap = container.querySelector(`#${dndId}`);
      const zones = wrap.querySelectorAll('.dnd-drop-zone');
      let correct = 0;
      let total = 0;

      zones.forEach(zone => {
        const accepts = JSON.parse(zone.dataset.accepts || '[]');
        zone.querySelectorAll('.dnd-item').forEach(item => {
          total++;
          if (accepts.includes(item.dataset.text)) correct++;
        });
      });

      const result = wrap.querySelector(`#${dndId}-result`);
      result.classList.add('show');
      if (correct === total && total > 0) {
        result.className = 'dnd-result show success';
        result.textContent = `Correcto! Colocaste ${correct}/${total} elementos en la categoria correcta.`;
      } else {
        result.className = 'dnd-result show partial';
        result.textContent = `${correct}/${total} elementos correctos. Intenta de nuevo.`;
      }
    });
  });
}
