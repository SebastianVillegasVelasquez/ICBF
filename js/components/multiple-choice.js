/**
 * multiple-choice.js — Multiple choice quiz component
 *
 * Config shape:
 * {
 *   "type": "multiple-choice",
 *   "title": "...",
 *   "questions": [
 *     {
 *       "question": "...",
 *       "options": ["A", "B", "C", "D"],
 *       "correct": 0,
 *       "feedback": { "correct": "...", "incorrect": "..." }
 *     }
 *   ]
 * }
 */
let mcCounter = 0;

export function renderMultipleChoice(data) {
  const id = `mc-${mcCounter++}`;

  const questions = (data.questions || []).map((q, qi) => {
    const options = (q.options || []).map((opt, oi) => `
      <div class="mc-option" data-qi="${qi}" data-oi="${oi}" data-correct="${oi === q.correct}" role="radio" aria-checked="false" tabindex="0">
        <div class="mc-radio"><div class="mc-radio-dot"></div></div>
        <span class="mc-text">${opt}</span>
      </div>
    `).join('');

    return `
      <div class="mc-block" data-qi="${qi}" style="margin-bottom:28px;">
        <p class="mc-question">${qi + 1}. ${q.question}</p>
        <div class="mc-options" role="radiogroup">${options}</div>
        <div class="mc-feedback" id="${id}-fb-${qi}"></div>
        <button class="mc-check-btn" data-qi="${qi}" data-id="${id}">Verificar respuesta</button>
      </div>
    `;
  }).join('');

  return `
    ${data.title ? `<h3 class="section-heading">${data.title}</h3>` : ''}
    ${data.intro ? `<p class="section-body">${data.intro}</p>` : ''}
    <div id="${id}">${questions}</div>
  `;
}

export function initMultipleChoice(container) {
  container.querySelectorAll('.mc-option').forEach(opt => {
    const select = () => {
      const qi = opt.dataset.qi;
      // Deselect all in this question
      container.querySelectorAll(`.mc-option[data-qi="${qi}"]`).forEach(o => {
        o.classList.remove('selected');
        o.setAttribute('aria-checked', 'false');
      });
      opt.classList.add('selected');
      opt.setAttribute('aria-checked', 'true');
    };
    opt.addEventListener('click', select);
    opt.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); select(); } });
  });

  container.querySelectorAll('.mc-check-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const qi = btn.dataset.qi;
      const id = btn.dataset.id;
      const wrap = container.querySelector(`#${id}`);
      const block = wrap.querySelector(`.mc-block[data-qi="${qi}"]`);
      const selected = block.querySelector('.mc-option.selected');
      const fb = container.querySelector(`#${id}-fb-${qi}`);

      if (!selected) {
        fb.textContent = 'Selecciona una respuesta.';
        fb.className = 'mc-feedback show incorrect-fb';
        return;
      }

      const isCorrect = selected.dataset.correct === 'true';

      // Apply visual feedback
      block.querySelectorAll('.mc-option').forEach(o => {
        o.classList.remove('selected', 'correct', 'incorrect');
        if (o.dataset.correct === 'true') o.classList.add('correct');
      });
      if (!isCorrect) selected.classList.add('incorrect');

      fb.className = `mc-feedback show ${isCorrect ? 'correct-fb' : 'incorrect-fb'}`;
      fb.textContent = isCorrect ? 'Correcto!' : 'Incorrecto. Intenta de nuevo.';
      btn.disabled = isCorrect;
    });
  });
}
