/**
 * checklist.js — Interactive checklist component
 *
 * Config shape:
 * {
 *   "type": "checklist",
 *   "title": "...",
 *   "items": [ "text1", "text2" ]
 * }
 */
export function renderChecklist(data) {
  const items = (data.items || []).map((text, i) => `
    <div class="checklist-item" data-idx="${i}" role="checkbox" aria-checked="false" tabindex="0">
      <div class="checklist-box">
        <span class="checklist-check">&#10003;</span>
      </div>
      <span class="checklist-text">${text}</span>
    </div>
  `).join('');

  return `
    ${data.title ? `<h3 class="section-heading">${data.title}</h3>` : ''}
    ${data.intro ? `<p class="section-body">${data.intro}</p>` : ''}
    <div class="checklist" id="checklist-comp">${items}</div>
    <p class="checklist-progress" id="checklist-prog">0 / ${(data.items || []).length} completados</p>
  `;
}

export function initChecklist(container) {
  const items = container.querySelectorAll('.checklist-item');
  const prog = container.querySelector('#checklist-prog');
  const total = items.length;

  function updateProgress() {
    const checked = container.querySelectorAll('.checklist-item.checked').length;
    if (prog) prog.textContent = `${checked} / ${total} completados`;
  }

  items.forEach(item => {
    const toggle = () => {
      item.classList.toggle('checked');
      const isChecked = item.classList.contains('checked');
      item.setAttribute('aria-checked', isChecked.toString());
      updateProgress();
    };
    item.addEventListener('click', toggle);
    item.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); } });
  });
}
