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