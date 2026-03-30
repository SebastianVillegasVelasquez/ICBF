/**
 * course.config.js
 *
 * CONFIGURACIÓN CENTRAL DEL CURSO
 * 
 * Pantallas disponibles:
 *   - 'welcome' → Bienvenida al módulo
 *   - 'video'   → Reproductor de video
 *   - 'carousel'→ Carrusel de módulos/temas
 */

export const course = {
  title: "El ecosistema de los derechos humanos y Derecho Internacional Humanitario",

  modules: [

    // ── MÓDULO 0: Bienvenida General ────────────────────────
    {
      title: "Bienvenida",
      description: "Introducción al curso",
      highlights: ["Inicio", "Objetivos", "Estructura"],
      showCover: true,
      pages: [
        {
          title: "Bienvenida General",
          type: "welcome",
          config: {
            courseTitle: "Ley 1257: Protección de la mujer",
            moduleNumber: 0,
            moduleTitle: "Bienvenido al Curso",
            introText: "Este curso te guiará a través de los conceptos, normativas y mejores prácticas relacionadas con la Ley 1257 de 2008. Aprenderás sobre protección de derechos, prevención de violencia y procedimientos de atención.",
            progressPercent: 0
          }
        }
      ]
    },


  ] // end modules
};
