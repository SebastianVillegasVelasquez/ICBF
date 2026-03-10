/**
 * comparison-table.js — Comparison table component
 *
 * Config shape:
 * {
 *   "type": "comparison-table",
 *   "title": "...",
 *   "headers": ["Col A", "Col B", "Col C"],
 *   "rows": [
 *     ["cell", "cell", "cell"]
 *   ]
 * }
 */
export function renderComparisonTable(data) {
  const headers = (data.headers || []).map(h => `<th>${h}</th>`).join('');
  const rows = (data.rows || []).map(row =>
    `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`
  ).join('');

  return `
    ${data.title ? `<h3 class="section-heading">${data.title}</h3>` : ''}
    ${data.intro ? `<p class="section-body">${data.intro}</p>` : ''}
    <table class="comparison-table">
      <thead><tr>${headers}</tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

export function initComparisonTable() { /* static */ }
