// ════════════════════════════════════════════════════════════════
// QUIZ COMPONENT
// ════════════════════════════════════════════════════════════════

export function renderQuiz(data) {
    const questions = data.questions || [];
    const total = questions.length;

    const questionsHtml = questions.map((q, i) => `
        <div class="quiz-question-block"
             data-index="${i}"
             data-correct="${q.correct}"
             data-feedback-correct="${encodeURIComponent(q.feedback.correct)}"
             data-feedback-incorrect="${encodeURIComponent(q.feedback.incorrect)}"
             style="display:${i === 0 ? 'flex' : 'none'}; flex-direction:column; gap:14px;">
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
        .qz-shell {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding: 28px 40px 20px;
            font-family: "Nunito", sans-serif;
            overflow: hidden;
        }
        .qz-top {
            display: flex;
            align-items: center;
            gap: 14px;
            margin-bottom: 18px;
            flex-shrink: 0;
        }
        .quiz-progress-track {
            flex: 1;
            height: 7px;
            background: #e5e7eb;
            border-radius: 99px;
            overflow: hidden;
        }
        .quiz-progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #E8B800, #3aafa9);
            border-radius: 99px;
            transition: width 0.4s ease;
        }
        .quiz-counter {
            font-size: 13px;
            font-weight: 800;
            color: #5a4200;
            background: #FFF3B0;
            border: 1.5px solid #E8B800;
            padding: 4px 14px;
            border-radius: 20px;
            white-space: nowrap;
        }
        .qz-meta { flex-shrink: 0; margin-bottom: 14px; }
        .qz-title { font-size: 20px; font-weight: 900; color: #1a1a2e; margin: 0 0 4px; }
        .qz-desc  { font-size: 13px; color: #6b7280; margin: 0; }

        .qz-body {
            flex: 1;
            min-height: 0;
            overflow: hidden;
        }

        .quiz-question-block { height: 100%; }

        .quiz-question-text {
            font-size: 17px;
            font-weight: 700;
            color: #1a1a2e;
            margin: 0;
            line-height: 1.5;
            flex-shrink: 0;
        }
        .quiz-question-num { color: #E8B800; margin-right: 5px; }

        .quiz-options {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .quiz-option {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 13px 18px;
            border-radius: 12px;
            border: 1.5px solid #e5e7eb;
            background: #fafafa;
            cursor: pointer;
            text-align: left;
            font-size: 14px;
            color: #374151;
            font-family: "Nunito", sans-serif;
            font-weight: 600;
            transition: border-color 0.15s, background 0.15s;
            width: 100%;
        }
        .quiz-option:hover:not(:disabled) { border-color: #E8B800; background: #FFFBEA; }
        .quiz-option.selected  { border-color: #E8B800; background: #FFF3B0; }
        .quiz-option.correct   { border-color: #16a34a; background: #f0fdf4; }
        .quiz-option.incorrect { border-color: #dc2626; background: #fef2f2; }
        .quiz-option:disabled  { cursor: default; }

        .quiz-option-letter {
            width: 30px; height: 30px;
            border-radius: 50%;
            background: #e5e7eb;
            display: inline-flex; align-items: center; justify-content: center;
            font-size: 12px; font-weight: 800; color: #374151;
            flex-shrink: 0;
            transition: background 0.15s, color 0.15s;
        }
        .quiz-option.selected  .quiz-option-letter { background: #E8B800; color: #fff; }
        .quiz-option.correct   .quiz-option-letter { background: #16a34a; color: #fff; }
        .quiz-option.incorrect .quiz-option-letter { background: #dc2626; color: #fff; }
        .quiz-option-text { font-size: 14px; color: #374151; line-height: 1.4; }

        .quiz-feedback {
            font-size: 13px;
            line-height: 1.55;
            border-radius: 0 8px 8px 0;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease, padding 0.3s ease;
            flex-shrink: 0;
        }
        .quiz-feedback.is-correct   { max-height: 120px; padding: 10px 14px; background: #f0fdf4; color: #15803d; border-left: 3px solid #16a34a; }
        .quiz-feedback.is-incorrect { max-height: 120px; padding: 10px 14px; background: #fef2f2; color: #b91c1c; border-left: 3px solid #dc2626; }

        .qz-nav {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 18px;
            flex-shrink: 0;
        }
        .qz-dots { display: flex; gap: 6px; }
        .qz-dot {
            width: 8px; height: 8px;
            border-radius: 50%;
            background: #e5e7eb;
            transition: background 0.2s, transform 0.2s;
        }
        .qz-dot.active    { background: #E8B800; transform: scale(1.4); }
        .qz-dot.correct   { background: #16a34a; }
        .qz-dot.incorrect { background: #dc2626; }

        .qz-btn {
            font-size: 14px; font-weight: 800;
            padding: 10px 26px;
            border-radius: 30px;
            border: 2px solid #E8B800;
            background: #E8B800;
            color: #5a4200;
            cursor: pointer;
            font-family: "Nunito", sans-serif;
            transition: background 0.18s, opacity 0.18s;
        }
        .qz-btn:hover:not(:disabled) { background: #d4a800; border-color: #d4a800; }
        .qz-btn:disabled { opacity: 0.35; cursor: default; }
        .qz-btn-ghost {
            background: transparent;
            border-color: #e5e7eb;
            color: #6b7280;
        }
        .qz-btn-ghost:hover { background: #f5f5f5; border-color: #d0d0d0; }

        .quiz-result {
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            gap: 12px;
            text-align: center;
        }
        .quiz-result.visible { display: flex; }
        .quiz-result-score  { font-size: 56px; font-weight: 900; line-height: 1; }
        .quiz-result-label  { font-size: 20px; font-weight: 800; color: #1a1a2e; }
        .quiz-result-pct    { font-size: 14px; color: #6b7280; }
        .result-high .quiz-result-score { color: #15803d; }
        .result-mid  .quiz-result-score { color: #92400e; }
        .result-low  .quiz-result-score { color: #b91c1c; }

        .quiz-submit-btn {
            font-size: 14px; font-weight: 800;
            padding: 10px 26px;
            border-radius: 30px;
            border: 2px solid #16a34a;
            background: #16a34a;
            color: #fff;
            cursor: pointer;
            font-family: "Nunito", sans-serif;
            transition: background 0.18s, opacity 0.18s;
            display: none;
        }
        .quiz-submit-btn:hover:not(:disabled) { background: #15803d; }
        .quiz-submit-btn:disabled { opacity: 0.35; cursor: default; }

        @media (max-width: 1400px) {
            .qz-shell { padding: 20px 28px 16px; }
            .quiz-question-text { font-size: 15px; }
            .quiz-option { padding: 11px 15px; font-size: 13px; }
            .quiz-option-text { font-size: 13px; }
            .quiz-option-letter { width: 26px; height: 26px; font-size: 11px; }
            .qz-title { font-size: 17px; }
            .qz-btn { font-size: 13px; padding: 9px 20px; }
            .quiz-submit-btn { font-size: 13px; padding: 9px 20px; }
        }
    </style>

    <div class="qz-shell" data-booted="quiz" data-total="${total}">

        <div class="qz-top">
            <span class="quiz-counter">0 / ${total} respondidas</span>
            <div class="quiz-progress-track">
                <div class="quiz-progress-fill" style="width:0%"></div>
            </div>
        </div>

        ${data.title || data.description ? `
        <div class="qz-meta">
            ${data.title       ? `<h2 class="qz-title">${data.title}</h2>` : ''}
            ${data.description ? `<p class="qz-desc">${data.description}</p>` : ''}
        </div>` : ''}

        <div class="qz-body" id="qz-body">
            ${questionsHtml}
        </div>

        <div class="quiz-result" id="quiz-result"></div>

        <div class="qz-nav" id="qz-nav">
            <div class="qz-dots" id="qz-dots">
                ${questions.map((_, i) => `<div class="qz-dot${i === 0 ? ' active' : ''}" data-dot="${i}"></div>`).join('')}
            </div>
            <div style="display:flex; gap:8px; align-items:center;">
                <button class="qz-btn qz-btn-ghost" id="qz-prev" disabled>← Anterior</button>
                <button class="qz-btn" id="qz-next" disabled>Siguiente →</button>
                <button class="quiz-submit-btn" disabled>Calificar</button>
            </div>
        </div>
    </div>`;
}

// ════════════════════════════════════════════════════════════════

export function initQuiz(container) {
    const total   = parseInt(container.dataset.total, 10);
    const answers = new Array(total).fill(null);
    const locked  = new Array(total).fill(false);

    const counter   = container.querySelector('.quiz-counter');
    const fill      = container.querySelector('.quiz-progress-fill');
    const submitBtn = container.querySelector('.quiz-submit-btn');
    const resultEl  = container.querySelector('#quiz-result');
    const qzNav     = container.querySelector('#qz-nav');
    const blocks    = container.querySelectorAll('.quiz-question-block');
    const dots      = container.querySelectorAll('.qz-dot');
    const btnPrev   = container.querySelector('#qz-prev');
    const btnNext   = container.querySelector('#qz-next');

    let current = 0;

    // ── Mostrar pregunta ─────────────────────────────────────────
    function showQuestion(idx) {
        blocks.forEach((b, i) => b.style.display = i === idx ? 'flex' : 'none');
        current = idx;
        updateUI();
    }

    // ── Actualizar toda la UI ────────────────────────────────────
    function updateUI() {
        const answeredCount = answers.filter(a => a !== null).length;
        const pct = Math.round((answeredCount / total) * 100);

        counter.textContent = `${answeredCount} / ${total} respondidas`;
        fill.style.width = `${pct}%`;

        dots.forEach((d, i) => {
            d.classList.remove('active', 'correct', 'incorrect');
            if (i === current) {
                d.classList.add('active');
            } else if (answers[i] !== null) {
                const correct = parseInt(blocks[i].dataset.correct);
                d.classList.add(answers[i] === correct ? 'correct' : 'incorrect');
            }
        });

        btnPrev.disabled = current === 0;

        const isLast      = current === total - 1;
        const allAnswered = answers.every(a => a !== null);

        if (isLast && allAnswered) {
            btnNext.style.display      = 'none';
            submitBtn.style.display    = 'inline-flex';
            submitBtn.disabled         = false;
        } else {
            btnNext.style.display      = 'inline-flex';
            submitBtn.style.display    = 'none';
            btnNext.disabled           = answers[current] === null;
        }
    }

    // ── Selección de opción ──────────────────────────────────────
    container.querySelectorAll('.quiz-option').forEach(btn => {
        btn.addEventListener('click', () => {
            const qi = parseInt(btn.dataset.question, 10);
            const oi = parseInt(btn.dataset.option, 10);

            if (locked[qi]) return;

            const block = container.querySelector(`.quiz-question-block[data-index="${qi}"]`);
            block.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            answers[qi] = oi;
            updateUI();
        });
    });

    // ── Navegación ───────────────────────────────────────────────
    btnPrev.addEventListener('click', () => {
        if (current > 0) showQuestion(current - 1);
    });

    btnNext.addEventListener('click', () => {
        if (current < total - 1) showQuestion(current + 1);
    });

    // ── Calificar ────────────────────────────────────────────────
    submitBtn.addEventListener('click', () => {
        let score = 0;

        container.querySelectorAll('.quiz-question-block').forEach((block, qi) => {
            const q        = getQuestionData(container, qi);
            const selected = answers[qi];
            const isCorrect = selected === q.correct;

            if (isCorrect) score++;
            locked[qi] = true;

            block.querySelectorAll('.quiz-option').forEach((b, oi) => {
                b.disabled = true;
                if (oi === q.correct) b.classList.add('correct');
                if (oi === selected && !isCorrect) b.classList.add('incorrect');
            });

            const feedbackEl = block.querySelector(`#quiz-feedback-${qi}`);
            feedbackEl.textContent = isCorrect ? q.feedback.correct : q.feedback.incorrect;
            feedbackEl.className = `quiz-feedback ${isCorrect ? 'is-correct' : 'is-incorrect'}`;
        });

        qzNav.style.display = 'none';
        showResult(score, total);
    });

    // ── Resultado ────────────────────────────────────────────────
    function showResult(score, total) {
        const pct = Math.round((score / total) * 100);
        let level, color;

        if (pct >= 80)      { level = '¡Excelente!';     color = 'result-high'; }
        else if (pct >= 60) { level = 'Bien hecho';      color = 'result-mid';  }
        else                { level = 'Sigue repasando'; color = 'result-low';  }

        resultEl.className = `quiz-result visible ${color}`;
        resultEl.innerHTML = `
            <div class="quiz-result-score">${score} / ${total}</div>
            <div class="quiz-result-label">${level}</div>
            <div class="quiz-result-pct">${pct}% de respuestas correctas</div>
        `;
    }

    showQuestion(0);
}

// ════════════════════════════════════════════════════════════════

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

export function pickQuestions(bank, ids) {
    return ids.map(id => {
        const q = bank[id];
        if (!q) throw new Error(`[Quiz] Pregunta "${id}" no encontrada en el banco.`);
        return { ...q, id };
    });
}

export function pickRandomQuestions(bank, ids, count = 5) {
    const shuffledIds = [...ids].sort(() => Math.random() - 0.5);
    return shuffledIds.slice(0, count).map(id => {
        const q = bank[id];
        if (!q) throw new Error(`[Quiz] Pregunta "${id}" no encontrada en el banco.`);
        return { ...q, id };
    });
}

export function getOrPickQuizQuestions(bank, ids, quizId, count = 5) {
    const storageKey = `quiz_assigned_${quizId}`;
    const storedIds  = sessionStorage.getItem(storageKey);
    let selectedIds;

    if (storedIds) {
        selectedIds = JSON.parse(storedIds);
    } else {
        const shuffledIds = [...ids].sort(() => Math.random() - 0.5);
        selectedIds = shuffledIds.slice(0, count);
        sessionStorage.setItem(storageKey, JSON.stringify(selectedIds));
    }

    return selectedIds.map(id => {
        const q = bank[id];
        if (!q) throw new Error(`[Quiz] Pregunta "${id}" no encontrada en el banco.`);
        return { ...q, id };
    });
}