/**
 * course.config.js — Configuración del curso
 *
 * Cada módulo tiene un array "screens" con las pantallas en orden.
 * Tipos de pantalla disponibles:
 *
 *   type: 'welcome'  → Pantalla de bienvenida
 *     courseTitle    : Nombre del curso
 *     moduleNumber   : Número del módulo
 *     moduleTitle    : Título del módulo
 *     introText      : Texto introductorio
 *
 *   type: 'video'    → Pantalla de video
 *     videoUrl       : URL del video (mp4 o YouTube embed)
 *     title          : Título del video
 *     characterName  : Nombre del personaje que habla
 *     subtitle       : Subtítulo o descripción
 *     characterLeft  : Nombre personaje izquierdo (placeholder)
 *     characterRight : Nombre personaje derecho (placeholder)
 *
 *   type: 'content'  → Plantilla de contenido con componentes
 *     title          : Título de la pantalla (opcional)
 *     components     : Array de componentes a renderizar en orden
 *       Cada componente: { type: 'carousel' | 'accordion' | ..., data: { ... } }
 */

export const course = {
  title: "Ecosistema de los Derechos Humanos",

  modules: [

    // ─────────────────────────────────────────────────────────
    // MÓDULO 1
    // ─────────────────────────────────────────────────────────
    {
      title: "Módulo 1: Introducción",
      screens: [

        //PANTALLA 1 — Bienvenida
        {
          type: "custom",
          html: "js/screens/welcome-hero/welcome.html",
          css: "js/screens/welcome-hero/welcome.css",
        },

        // PANTALLA 2 — Video
        {
          type: "video",
          title: "Video introductorio",
          videoUrl: "",
          characterName: "Ayla",
          subtitle: "Conoce los objetivos del curso y los personajes que te acompañarán.",
          characterLeft: "Ayla",
          characterRight: "Simón",
        },

        // PANTALLA 3 — Video 16:9
        {
          type: "video",
          title: "Video instructivo",
          videoUrl: "",
          characterName: "Ayla",
          subtitle: "Conoce los objetivos del curso y los personajes que te acompañarán.",
          characterLeft: "Ayla",
          characterRight: "Simón",
        },

        // PANTALLA 3 — Contenido con carrusel
        // El componente 'carousel' espera slides con: heading y body
        {
          type: "content",
          components: [
            {
              type: "carousel",
              data: {
                slides: [
                  {
                    heading: "Módulo 1 — Marco normativo",
                    body: "Reconoce el marco normativo de los derechos humanos: historia, Declaración Universal y Sistema ONU."
                  },
                  {
                    heading: "Módulo 2 — DIH",
                    body: "Comprende el Derecho Internacional Humanitario: Convenios de Ginebra, principios básicos y aplicación práctica."
                  },
                  {
                    heading: "Módulo 3 — Mecanismos de protección",
                    body: "Identifica sistemas regionales, la Corte IDH y los mecanismos de denuncia disponibles."
                  },
                  {
                    heading: "Módulo 4 — Práctica",
                    body: "Aplica los marcos normativos con casos prácticos, buenas prácticas y protocolos de actuación."
                  },
                  {
                    heading: "Módulo 5 — Evaluación",
                    body: "Verifica tu aprendizaje, accede a recursos adicionales y obtén tu certificación."
                  }
                ]
              }
            }
          ]
        }

      ]
    }

  ]
};
