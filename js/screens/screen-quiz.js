/**
 * screen-quiz.js
 * 
 * EJEMPLO: Pantalla de Quiz interactivo
 * 
 * Esta es una pantalla de ejemplo para demostrar cómo crear
 * nuevas pantallas personalizadas siguiendo el patrón modular.
 * 
 * Config:
 *   {
 *     title: "Quiz del Módulo",
 *     questions: [
 *       {
 *         text: "¿Pregunta?",
 *         options: ["Opción A", "Opción B", "Opción C"],
 *         correctAnswer: 0
 *       },
 *       ...
 *     ]
 *   }
 */

import { Screen } from './screen-base.js';

export class QuizScreen extends Screen {
  constructor(config = {}) {
    super(config);
    this.selectedAnswers = new Map(); // Almacena respuestas seleccionadas
  }

  render() {
    const {
      title = 'Quiz',
      questions = []
    } = this.config;

    if (questions.length === 0) {
      return '<div class="screen screen-quiz"><p>No hay preguntas disponibles</p></div>';
    }

    const questionsHtml = questions
      .map((question, index) => this.renderQuestion(question, index))
      .join('');

    return `
      <div class="screen screen-quiz">
        <!-- Encabezado -->
        <div class="quiz-header">
          <h1 class="quiz-title">${title}</h1>
          <p class="quiz-progress"><span id="quiz-progress">0</span>/${questions.length} respondidas</p>
        </div>

        <!-- Preguntas -->
        <div class="quiz-container">
          <div class="quiz-questions">
            ${questionsHtml}
          </div>
        </div>

        <!-- Botón enviar -->
        <div class="quiz-footer">
          <button class="quiz-btn-submit" id="quiz-submit">
            Enviar Quiz
          </button>
        </div>
      </div>
    `;
  }

  renderQuestion(question, index) {
    const { text = '', options = [] } = question;

    const optionsHtml = options
      .map((option, optIndex) => `
        <label class="quiz-option-label">
          <input 
            type="radio" 
            name="question-${index}" 
            class="quiz-option-input"
            value="${optIndex}"
            data-question="${index}"
          >
          <span class="quiz-option-text">${option}</span>
        </label>
      `)
      .join('');

    return `
      <div class="quiz-question" data-question-index="${index}">
        <h3 class="quiz-question-text">${index + 1}. ${text}</h3>
        <div class="quiz-options">
          ${optionsHtml}
        </div>
      </div>
    `;
  }

  init() {
    const inputs = this.el.querySelectorAll('.quiz-option-input');
    const submitBtn = this.el.querySelector('#quiz-submit');
    const progressDisplay = this.el.querySelector('#quiz-progress');

    // Cuando se selecciona una opción
    inputs.forEach(input => {
      input.addEventListener('change', (e) => {
        const questionIndex = parseInt(e.target.dataset.question, 10);
        const selectedValue = e.target.value;

        // Guardar respuesta
        this.selectedAnswers.set(questionIndex, selectedValue);

        // Actualizar contador de respuestas
        if (progressDisplay) {
          progressDisplay.textContent = this.selectedAnswers.size;
        }

        console.log(`[quiz] Pregunta ${questionIndex} respondida: opción ${selectedValue}`);
      });
    });

    // Cuando se envía el quiz
    submitBtn?.addEventListener('click', () => {
      const totalQuestions = this.el.querySelectorAll('.quiz-question').length;
      const answered = this.selectedAnswers.size;

      if (answered === totalQuestions) {
        console.log('[quiz] Todas las preguntas respondidas:', this.selectedAnswers);
        
        // Disparar evento personalizado para que app.js maneje la siguiente acción
        this.el.dispatchEvent(new CustomEvent('quiz-complete', {
          detail: { answers: Object.fromEntries(this.selectedAnswers) }
        }));
      } else {
        alert(`Por favor responde todas las preguntas (${answered}/${totalQuestions})`);
      }
    });
  }
}
