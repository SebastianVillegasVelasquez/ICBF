// ════════════════════════════════════════════════════════════════
// QUIZ COMPONENT
// ════════════════════════════════════════════════════════════════

/**
 * renderQuiz(data)
 *
 * @param {Object}   data
 * @param {string}   data.title        - Título del quiz
 * @param {string}   [data.description]- Descripción o instrucción
 * @param {Array}    data.questions    - Array de objetos pregunta (del banco)
 */
export function renderQuiz(data) {
    const questions = data.questions || [];
    const total = questions.length;

    const questionsHtml = questions.map((q, i) => `
    <div class="quiz-question-block"
         data-index="${i}"
         data-correct="${q.correct}"
         data-feedback-correct="${encodeURIComponent(q.feedback.correct)}"
         data-feedback-incorrect="${encodeURIComponent(q.feedback.incorrect)}">
      <p class="quiz-question-text">
        <span class="quiz-question-num">${i + 1}.</span> ${q.question}
      </p>
      <div class="quiz-options">
        ${q.options.map((opt, oi) => `
          <button class="quiz-option" data-question="${i}" data-option="${oi}">
            <span class="quiz-option-letter">${String.fromCharCode(65 + oi)}</span>
            <span class="quiz-option-text">${opt}</span>
          </button>
        `).join('')}
      </div>
      <div class="quiz-feedback" id="quiz-feedback-${i}" aria-live="polite"></div>
    </div>
  `).join('');

    return `
    <style>
      .quiz-wrapper { width: 100%; box-sizing: border-box; padding: 0.5rem 0; }
      .quiz-header-bar { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.75rem; }
      .quiz-counter { font-size: 13px; font-weight: 700; color: #ffffff; background: #E8B800; padding: 4px 12px; border-radius: 20px; white-space: nowrap; font-variant-numeric: tabular-nums; }
      .quiz-progress-track { flex: 1; height: 10px; background: #e5e7eb; border-radius: 10px; overflow: hidden; }
      .quiz-progress-fill { height: 100%; background: linear-gradient(90deg, #E8B800 70%, #3aafa9 100%); border-radius: 10px; transition: width 0.4s ease; }
      .quiz-title { font-size: 24px; font-weight: 800; color: #1a1a2e; margin: 0 0 0.5rem 0; letter-spacing: -0.01em; }
      .quiz-description { font-size: 15px; color: #6b7280; margin: 0 0 2rem 0; line-height: 1.6; }
      .quiz-questions-list { display: flex; flex-direction: column; gap: 2rem; }
      .quiz-question-block { background: #ffffff; border-left: 6px solid #E8B800; border-radius: 0 16px 16px 0; padding: 1.75rem 2rem; box-shadow: 0 4px 24px rgba(0,0,0,0.06); box-sizing: border-box; }
      .quiz-question-text { font-size: 16px; font-weight: 600; color: #1a1a2e; margin: 0 0 1.25rem 0; line-height: 1.5; }
      .quiz-question-num { color: #E8B800; margin-right: 4px; }
      .quiz-options { display: flex; flex-direction: column; gap: 0.6rem; }
      .quiz-option { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 10px; border: 2px solid #e5e7eb; background: #fafafa; cursor: pointer; text-align: left; transition: border-color 0.15s, background 0.15s; width: 100%; }
      .quiz-option:hover:not(:disabled) { border-color: #E8B800; background: #FFFBEA; }
      .quiz-option.selected { border-color: #E8B800; background: #FFF3B0; }
      .quiz-option.correct { border-color: #16a34a; background: #f0fdf4; }
      .quiz-option.incorrect { border-color: #dc2626; background: #fef2f2; }
      .quiz-option:disabled { cursor: default; }
      .quiz-option-letter { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; background: #e5e7eb; font-size: 12px; font-weight: 700; color: #374151; flex-shrink: 0; transition: background 0.15s, color 0.15s; }
      .quiz-option.selected .quiz-option-letter { background: #E8B800; color: #ffffff; }
      .quiz-option.correct .quiz-option-letter { background: #16a34a; color: #ffffff; }
      .quiz-option.incorrect .quiz-option-letter { background: #dc2626; color: #ffffff; }
      .quiz-option-text { font-size: 14px; color: #374151; line-height: 1.4; }
      .quiz-feedback { margin-top: 1rem; font-size: 13.5px; line-height: 1.55; border-radius: 8px; padding: 0; max-height: 0; overflow: hidden; transition: max-height 0.3s ease, padding 0.3s ease; }
      .quiz-feedback.is-correct, .quiz-feedback.is-incorrect { max-height: 200px; padding: 10px 14px; }
      .quiz-feedback.is-correct { background: #f0fdf4; color: #15803d; border-left: 3px solid #16a34a; }
      .quiz-feedback.is-incorrect { background: #fef2f2; color: #b91c1c; border-left: 3px solid #dc2626; }
      .quiz-actions { margin-top: 2.5rem; display: flex; justify-content: flex-end; }
      .quiz-submit-btn { font-size: 14px; font-weight: 700; padding: 12px 32px; border-radius: 30px; border: 2px solid #E8B800; background: #E8B800; color: #5a4200; cursor: pointer; transition: background 0.18s, color 0.18s, opacity 0.18s; letter-spacing: 0.03em; }
      .quiz-submit-btn:hover:not(:disabled) { background: #d4a800; border-color: #d4a800; }
      .quiz-submit-btn:disabled { opacity: 0.35; cursor: default; }
      .quiz-result { display: none; margin-top: 2rem; padding: 2rem; border-radius: 16px; text-align: center; }
      .quiz-result.visible { display: block; }
      .quiz-result-score { font-size: 48px; font-weight: 800; letter-spacing: -0.02em; line-height: 1; margin-bottom: 0.4rem; }
      .quiz-result-label { font-size: 20px; font-weight: 700; margin-bottom: 0.3rem; }
      .quiz-result-pct { font-size: 14px; opacity: 0.75; }
      .result-high { background: #f0fdf4; color: #15803d; border: 2px solid #16a34a; }
      .result-mid  { background: #FFFBEA; color: #92400e; border: 2px solid #E8B800; }
      .result-low  { background: #fef2f2; color: #b91c1c; border: 2px solid #dc2626; }
    </style>

    <div class="quiz-wrapper" data-booted="quiz" data-total="${total}">
      <div class="quiz-header-bar">
        <span class="quiz-counter">0 / ${total} respondidas</span>
        <div class="quiz-progress-track">
          <div class="quiz-progress-fill" style="width: 0%"></div>
        </div>
      </div>

      ${data.title ? `<h2 class="quiz-title">${data.title}</h2>` : ''}
      ${data.description ? `<p class="quiz-description">${data.description}</p>` : ''}

      <div class="quiz-questions-list">
        ${questionsHtml}
      </div>

      <div class="quiz-actions">
        <button class="quiz-submit-btn" disabled>Calificar quiz</button>
      </div>

      <div class="quiz-result" id="quiz-result" aria-live="polite"></div>
    </div>
  `;
}

/**
 * initQuiz(container)
 * Inicializa la interactividad del quiz.
 * container = el elemento con data-booted="quiz"
 */
export function initQuiz(container) {
    const total     = parseInt(container.dataset.total, 10);
    const answers   = new Array(total).fill(null); // respuesta seleccionada por pregunta
    const locked    = new Array(total).fill(false); // preguntas ya respondidas (bloqueadas)

    const counter   = container.querySelector('.quiz-counter');
    const fill      = container.querySelector('.quiz-progress-fill');
    const submitBtn = container.querySelector('.quiz-submit-btn');
    const resultEl  = container.querySelector('#quiz-result');

    // ── Selección de opción ──────────────────────────────────────
    container.querySelectorAll('.quiz-option').forEach(btn => {
        btn.addEventListener('click', () => {
            const qi  = parseInt(btn.dataset.question, 10);
            const oi  = parseInt(btn.dataset.option, 10);

            if (locked[qi]) return; // ya respondida, no hacer nada

            // Marcar selección visual en el grupo
            const block = container.querySelector(`.quiz-question-block[data-index="${qi}"]`);
            block.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            answers[qi] = oi;
            updateProgress();
        });
    });

    // ── Progreso ─────────────────────────────────────────────────
    function updateProgress() {
        const answered = answers.filter(a => a !== null).length;
        const pct = Math.round((answered / total) * 100);

        counter.textContent = `${answered} / ${total} respondidas`;
        fill.style.width = `${pct}%`;
        submitBtn.disabled = answered < total;
    }

    // ── Calificar ────────────────────────────────────────────────
    submitBtn.addEventListener('click', () => {
        let score = 0;

        container.querySelectorAll('.quiz-question-block').forEach((block, qi) => {
            const q         = getQuestionData(container, qi);
            const selected  = answers[qi];
            const isCorrect = selected === q.correct;

            if (isCorrect) score++;

            locked[qi] = true;

            // Marcar opciones
            block.querySelectorAll('.quiz-option').forEach((btn, oi) => {
                btn.disabled = true;
                if (oi === q.correct)  btn.classList.add('correct');
                if (oi === selected && !isCorrect) btn.classList.add('incorrect');
            });

            // Feedback por pregunta
            const feedbackEl = block.querySelector(`#quiz-feedback-${qi}`);
            feedbackEl.textContent = isCorrect ? q.feedback.correct : q.feedback.incorrect;
            feedbackEl.className = `quiz-feedback ${isCorrect ? 'is-correct' : 'is-incorrect'}`;
        });

        submitBtn.disabled = true;
        submitBtn.textContent = 'Quiz calificado';
        showResult(score, total);
    });

    // ── Resultado final ──────────────────────────────────────────
    function showResult(score, total) {
        const pct = Math.round((score / total) * 100);
        let level, color;

        if (pct >= 80)      { level = '¡Excelente!';    color = 'result-high'; }
        else if (pct >= 60) { level = 'Bien hecho';     color = 'result-mid';  }
        else                { level = 'Sigue repasando'; color = 'result-low'; }

        resultEl.className = `quiz-result visible ${color}`;
        resultEl.innerHTML = `
      <div class="quiz-result-score">${score} / ${total}</div>
      <div class="quiz-result-label">${level}</div>
      <div class="quiz-result-pct">${pct}% de respuestas correctas</div>
    `;
        resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // ── Helper: leer datos de pregunta desde el DOM ──────────────
    // Los datos reales vienen del banco; los pasamos via data-* en render
    // Para no re-importar el banco en init, los almacenamos en el HTML.
}

function getQuestionData(container, qi) {
    const block = container.querySelector(`.quiz-question-block[data-index="${qi}"]`);
    return {
        correct: parseInt(block.dataset.correct, 10),
        feedback: {
            correct:   decodeURIComponent(block.dataset.feedbackCorrect),
            incorrect: decodeURIComponent(block.dataset.feedbackIncorrect)
        }
    };
}

// Exportar helper para que course.config.js pueda construir el array de preguntas
export function pickQuestions(bank, ids) {
    return ids.map(id => {
        const q = bank[id];
        if (!q) throw new Error(`[Quiz] Pregunta "${id}" no encontrada en el banco.`);
        return { ...q, id };
    });
}

export function pickRandomQuestions(bank, ids, count = 5) {
    const shuffledIds = [...ids].sort(() => Math.random() - 0.5);
    const selectedIds = shuffledIds.slice(0, count);

    return selectedIds.map(id => {
        const q = bank[id];
        if (!q) throw new Error(`[Quiz] Pregunta "${id}" no encontrada en el banco.`);
        return { ...q, id };
    });
}

export function getOrPickQuizQuestions(bank, ids, quizId, count = 5) {
    const storageKey = `quiz_assigned_${quizId}`;
    let selectedIds;

    // 1. Intentamos recuperar las preguntas guardadas previamente
    const storedIds = sessionStorage.getItem(storageKey);

    if (storedIds) {
        // Si existen, las parseamos
        selectedIds = JSON.parse(storedIds);
    } else {
        // 2. Si no existen, barajamos los ids y tomamos los necesarios
        const shuffledIds = [...ids].sort(() => Math.random() - 0.5);
        selectedIds = shuffledIds.slice(0, count);

        // 3. Las guardamos en el sessionStorage en formato string
        sessionStorage.setItem(storageKey, JSON.stringify(selectedIds));
    }

    // 4. Mapeamos los IDs finales a los objetos reales del banco
    return selectedIds.map(id => {
        const q = bank[id];
        if (!q) throw new Error(`[Quiz] Pregunta "${id}" no encontrada en el banco.`);
        return { ...q, id };
    });
}