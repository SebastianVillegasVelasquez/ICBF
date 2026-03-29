/**
 * course.config.js
 *
 * SINGLE SOURCE OF TRUTH for course structure.
 * 
 * Pages now use SCREEN TYPES instead of HTML files.
 * This makes the course modular, reusable, and maintainable.
 *
 * Screen types available:
 *   - 'welcome' → WelcomeScreen (module intro)
 *   - 'video'   → VideoScreen (video player + character info)
 *   - 'carousel'→ CarouselScreen (carousel of modules)
 *   - 'html'    → Load from /pages/ (legacy, for custom content)
 *
 * HOW TO USE:
 *   Each page needs:
 *     - title: string
 *     - type: 'welcome' | 'video' | 'carousel' | 'html'
 *     - config: object with type-specific settings
 *
 * EXAMPLES:
 *   Welcome page:
 *     { title: "Bienvenida", type: "welcome", config: { moduleNumber: 1, ... } }
 *
 *   Video page:
 *     { title: "Video", type: "video", config: { videoUrl: "...", characterName: "..." } }
 *
 *   Carousel page:
 *     { title: "Modulos", type: "carousel", config: { slides: [...] } }
 *
 *   HTML page (legacy):
 *     { title: "Contenido", type: "html", file: "pages/module0/custom.html" }
 */

export const course = {
  title: "Ley 1257: No violencia contra la mujer",

  modules: [

    // ── 0: Introduction ─────────────────────────────────────
    {
      title: "Introducción",
      description: "Conoce el propósito de este curso, su estructura y la normativa que lo sustenta.",
      highlights: ["Marco legal", "Objetivo del curso", "Competencias"],
      showCover: true,
      pages: [
        {
          title: "Bienvenida",
          type: "welcome",
          config: {
            courseTitle: "Ley 1257: No violencia contra la mujer",
            moduleNumber: 1,
            moduleTitle: "Introducción",
            introText: "Este curso te introduce en la Ley 1257 de 2008, su marco legal, objetivos y competencias que desarrollarás.",
            progressPercent: 0
          }
        }
      ]
    },

    // ── 1: Preguntas Frecuentes (Accordion) ──────────────────
    {
      title: "Preguntas Frecuentes",
      description: "Usa el acordeón para explorar respuestas a las preguntas más comunes.",
      highlights: ["Población protegida", "Derechos de las víctimas", "Mecanismos de protección"],
      showCover: true,
      pages: [
        {
          title: "Preguntas Frecuentes",
          type: "html",
          file: "pages/module1/faq.html"
        }
      ]
    },

    // ── 2: Tipos de Violencia ────────────────────────────────
    {
      title: "Tipos de Violencia",
      description: "Conoce las categorías de violencia contempladas en la Ley 1257.",
      highlights: ["Violencia física", "Violencia psicológica", "Violencia económica"],
      showCover: true,
      pages: [
        {
          title: "Clasificación",
          type: "html",
          file: "pages/module2/tipos-violencia.html"
        }
      ]
    },

    // ── 3: Buenas Prácticas ──────────────────────────────────
    {
      title: "Buenas Prácticas",
      description: "Estrategias y procedimientos recomendados para responder a casos.",
      highlights: ["Protección de víctimas", "Investigación", "Seguimiento"],
      showCover: true,
      pages: [
        {
          title: "Buenas Prácticas",
          type: "html",
          file: "pages/module3/buenas-practicas.html"
        }
      ]
    },

    // ── 4: Compromisos ───────────────────────────────────────
    {
      title: "Compromisos",
      description: "Compromisos institucionales y personales para prevenir la violencia.",
      highlights: ["Responsabilidad", "Prevención", "Acción"],
      showCover: true,
      pages: [
        {
          title: "Compromisos",
          type: "html",
          file: "pages/module4/compromisos.html"
        }
      ]
    },

    // ── 5: Rutas de Atención ─────────────────────────────────
    {
      title: "Rutas de Atención",
      description: "Procedimientos a seguir ante casos de violencia.",
      highlights: ["Identificación", "Derivación", "Seguimiento"],
      showCover: true,
      pages: [
        {
          title: "Rutas de Atención",
          type: "html",
          file: "pages/module5/rutas.html"
        }
      ]
    },

    // ── 6: Clasificador (Drag & Drop) ────────────────────────
    {
      title: "Clasificador de Violencia",
      description: "Ejercicio interactivo: clasifica tipos de violencia.",
      highlights: ["Violencia psicológica", "Violencia económica", "Aprendizaje activo"],
      showCover: true,
      pages: [
        {
          title: "Clasificador",
          type: "html",
          file: "pages/module6/clasifica.html"
        }
      ]
    },

    // ── 7: Mapa (Hotspot) ────────────────────────────────────
    {
      title: "Mapa de Recursos",
      description: "Explora los recursos disponibles en tu región.",
      highlights: ["Recursos locales", "Centros de atención", "Líneas de ayuda"],
      showCover: true,
      pages: [
        {
          title: "Mapa de Recursos",
          type: "html",
          file: "pages/module7/mapa.html"
        }
      ]
    },

    // ── 8: Evaluación (Multiple Choice) ──────────────────────
    {
      title: "Evaluación",
      description: "Verifica tu comprensión del contenido.",
      highlights: ["10 preguntas", "Retroalimentación", "Certificado"],
      showCover: true,
      pages: [
        {
          title: "Evaluación Final",
          type: "html",
          file: "pages/module8/evaluacion.html"
        }
      ]
    },

    // ── 9: Normativa ─────────────────────────────────────────
    {
      title: "Marco Normativo",
      description: "Documentos legales y normativas de referencia.",
      highlights: ["Ley 1257", "Sentencias emblemáticas", "Jurisprudencia"],
      showCover: true,
      pages: [
        {
          title: "Normativa",
          type: "html",
          file: "pages/module9/normativa.html"
        }
      ]
    },

    // ── 10: Fundamentos ──────────────────────────────────────
    {
      title: "Fundamentos Teóricos",
      description: "Conceptos y teorías que sustentan la Ley.",
      highlights: ["Derechos humanos", "Igualdad", "Dignidad"],
      showCover: true,
      pages: [
        {
          title: "Fundamentos",
          type: "html",
          file: "pages/module10/fundamentos.html"
        }
      ]
    },

    // ── 11: Herramientas y Bibliografía ──────────────────────
    {
      title: "Recursos Adicionales",
      description: "Herramientas y referencias bibliográficas.",
      highlights: ["Plantillas", "Guías", "Bibliografía"],
      showCover: true,
      pages: [
        {
          title: "Herramientas",
          type: "html",
          file: "pages/module11/herramientas.html"
        },
        {
          title: "Bibliografía",
          type: "html",
          file: "pages/module11/bibliografia.html"
        }
      ]
    }

  ] // end modules
};
