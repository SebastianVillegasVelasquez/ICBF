/**
 * GUÍA: CÓMO AGREGAR NUEVAS PANTALLAS PERSONALIZADAS
 * 
 * El sistema de pantallas del curso es completamente modular y reutilizable.
 * Puedes crear nuevas pantallas sin modificar el código existente.
 * 
 * ========================================================================
 * PASO 1: ENTENDER LA ARQUITECTURA
 * ========================================================================
 * 
 * Las pantallas se dividen en 3 partes:
 * 
 * 1. CLASE (archivo JS) — Define la estructura HTML y la lógica interactiva
 * 2. CONFIGURACIÓN (course.config.js) — Define qué páginas usan cada pantalla
 * 3. ESTILOS (CSS) — Define la apariencia visual
 * 
 * 
 * ========================================================================
 * PASO 2: CREAR UNA NUEVA PANTALLA
 * ========================================================================
 * 
 * Las pantallas existentes están en: /js/screens/
 * 
 * Estructura de una pantalla:
 * 
 * ┌─ screen-base.js (clase base)
 * │  ├─ mount(element) → Renderiza la pantalla
 * │  └─ init() → Inicializa eventos
 * │
 * ├─ screen-welcome.js (pantalla de bienvenida)
 * ├─ screen-video.js (pantalla de video)
 * ├─ screen-carousel.js (pantalla de carrusel)
 * └─ screen-[tuPantalla].js (tu nueva pantalla)
 * 
 * 
 * ========================================================================
 * PASO 3: CREAR TU PROPIA PANTALLA (EJEMPLO)
 * ========================================================================
 * 
 * Quieres crear una pantalla de "Quiz" con preguntas interactivas.
 * 
 * ARCHIVO: /js/screens/screen-quiz.js
 * ─────────────────────────────────────────────
 * 
 *   import { Screen } from './screen-base.js';
 *   
 *   export class QuizScreen extends Screen {
 *     render() {
 *       // Destructurar la configuración
 *       const {
 *         title = 'Quiz',
 *         questions = []
 *       } = this.config;
 *       
 *       // Retornar HTML
 *       return `
 *         <div class="screen screen-quiz">
 *           <h1>${title}</h1>
 *           <div class="quiz-questions">
 *             ${questions.map((q, i) => `
 *               <div class="quiz-question" data-index="${i}">
 *                 <p>${q.text}</p>
 *                 <div class="quiz-options">
 *                   ${q.options.map((opt, j) => `
 *                     <button class="quiz-option" data-option="${j}">
 *                       ${opt}
 *                     </button>
 *                   `).join('')}
 *                 </div>
 *               </div>
 *             `).join('')}
 *           </div>
 *           <button class="quiz-submit">Enviar respuestas</button>
 *         </div>
 *       `;
 *     }
 *     
 *     init() {
 *       // Aquí van todos los event listeners
 *       const options = this.el.querySelectorAll('.quiz-option');
 *       const submitBtn = this.el.querySelector('.quiz-submit');
 *       
 *       options.forEach(opt => {
 *         opt.addEventListener('click', (e) => {
 *           console.log('Opción seleccionada:', e.target.dataset.option);
 *         });
 *       });
 *       
 *       submitBtn?.addEventListener('click', () => {
 *         console.log('Quiz enviado');
 *         this.el.dispatchEvent(new CustomEvent('quiz-complete'));
 *       });
 *     }
 *   }
 * 
 * 
 * ========================================================================
 * PASO 4: IMPORTAR TU NUEVA PANTALLA EN app.js
 * ========================================================================
 * 
 * ARCHIVO: /js/app.js (línea ~30)
 * ─────────────────────────────────────────────
 * 
 *   // Añade esta línea:
 *   import { QuizScreen } from './screens/screen-quiz.js';
 * 
 * 
 * ========================================================================
 * PASO 5: AGREGAR TU PANTALLA AL RENDERIZADOR (app.js)
 * ========================================================================
 * 
 * ARCHIVO: /js/app.js (función renderRoute, línea ~280)
 * ─────────────────────────────────────────────────────
 * 
 *   function renderRoute(route) {
 *     if (!appEl) return;
 *     
 *     if (route.type === 'cover') {
 *       // ... código existente ...
 *     } else if (route.type === 'welcome') {
 *       // ... código existente ...
 *     } else if (route.type === 'quiz') {     // ← NUEVA
 *       const screen = new QuizScreen(route.config || {});
 *       screen.mount(appEl);
 *     } else if (route.type === 'video') {
 *       // ... código existente ...
 *     }
 *   }
 * 
 * 
 * ========================================================================
 * PASO 6: DEFINIR LA PANTALLA EN course.config.js
 * ========================================================================
 * 
 * ARCHIVO: /js/course.config.js
 * ─────────────────────────────────────────────
 * 
 *   modules: [
 *     {
 *       title: "Mi Módulo",
 *       pages: [
 *         {
 *           title: "Quiz del Módulo",
 *           type: "quiz",  // ← Tu nuevo tipo
 *           config: {
 *             title: "¿Qué aprendiste?",
 *             questions: [
 *               {
 *                 text: "¿Pregunta 1?",
 *                 options: ["Opción A", "Opción B", "Opción C"]
 *               },
 *               {
 *                 text: "¿Pregunta 2?",
 *                 options: ["Opción A", "Opción B"]
 *               }
 *             ]
 *           }
 *         }
 *       ]
 *     }
 *   ]
 * 
 * 
 * ========================================================================
 * PASO 7: AGREGAR ESTILOS CSS
 * ========================================================================
 * 
 * ARCHIVO: /css/screens.css
 * ─────────────────────────
 * 
 *   Agrega al final del archivo:
 * 
 *   /* ─ Quiz Screen ─ */
 *   .screen-quiz {
 *     justify-content: center;
 *   }
 *   
 *   .quiz-questions {
 *     max-width: 600px;
 *     display: flex;
 *     flex-direction: column;
 *     gap: 24px;
 *   }
 *   
 *   .quiz-question {
 *     padding: 20px;
 *     border: 2px solid #e0e0e0;
 *     border-radius: 8px;
 *   }
 *   
 *   .quiz-options {
 *     display: flex;
 *     flex-direction: column;
 *     gap: 8px;
 *     margin-top: 12px;
 *   }
 *   
 *   .quiz-option {
 *     padding: 10px 16px;
 *     background: #f5f5f5;
 *     border: 2px solid #ddd;
 *     border-radius: 6px;
 *     cursor: pointer;
 *     transition: all 0.2s;
 *   }
 *   
 *   .quiz-option:hover {
 *     background: #e8f5e9;
 *     border-color: #20b2aa;
 *   }
 *   
 *   .quiz-submit {
 *     margin-top: 24px;
 *     padding: 12px 32px;
 *     background: #20b2aa;
 *     color: white;
 *     border: none;
 *     border-radius: 24px;
 *     cursor: pointer;
 *     font-weight: 700;
 *   }
 * 
 * 
 * ========================================================================
 * RESUMEN RÁPIDO
 * ========================================================================
 * 
 * Para agregar una nueva pantalla:
 * 
 * 1. ✅ Crea: /js/screens/screen-[nombre].js
 *    - Extiende de Screen
 *    - Implementa render() — retorna HTML
 *    - Implementa init() — agrega event listeners
 * 
 * 2. ✅ Importa en: /js/app.js
 * 
 * 3. ✅ Agrega al renderizador en: /js/app.js (función renderRoute)
 * 
 * 4. ✅ Usa en: /js/course.config.js
 *    - Define pages con type: 'tu-tipo'
 *    - Pasa config personalizada
 * 
 * 5. ✅ Estiliza en: /css/screens.css
 * 
 * 
 * ========================================================================
 * VENTAJAS DEL SISTEMA MODULAR
 * ========================================================================
 * 
 * ✓ Sin repetición — Cada pantalla es independiente
 * ✓ Reutilizable — Usa la misma pantalla en múltiples módulos
 * ✓ Configurable — Los datos vienen en route.config, no en el código
 * ✓ Escalable — Agregar nuevas pantallas es simple
 * ✓ Limpio — Separación clara entre HTML, JS y CSS
 * ✓ Mantenible — Cambios en una pantalla no afectan las otras
 * 
 * 
 * ========================================================================
 * PREGUNTAS FRECUENTES
 * ========================================================================
 * 
 * P: ¿Puedo reutilizar la misma pantalla en varios módulos?
 * R: Sí. Solo agrega múltiples páginas con el mismo type y config diferente.
 * 
 * P: ¿Cómo paso datos dinámicos a una pantalla?
 * R: Todo va en route.config — es un objeto que se destructura en render()
 * 
 * P: ¿Qué pasa si la pantalla necesita hacer algo después de renderizar?
 * R: Usa el método init() para event listeners y lógica interactiva
 * 
 * P: ¿Puedo enviar datos desde una pantalla al resto de la app?
 * R: Sí, usa dispatchEvent() con CustomEvent, o llama a funciones globales
 * 
 * P: ¿Es obligatorio usar CSS en screens.css?
 * R: No, pero es la convención. Puedes usar inline styles si prefieres.
 */

export const SCREEN_SYSTEM_DOCS = `
  Sistema de Pantallas Modular del Curso
  Versión 1.0
  
  Documentación completa disponible en este archivo.
`;
