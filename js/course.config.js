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
    // FRONT PAGE
    // ─────────────────────────────────────────────────────────
    {
      title: "Portada",
      screens: [
        {
          type: "custom",
          html: "js/screens/front-page/front-page.html",
          css: "css/front-page.css",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────
    // MÓDULO 1
    // ─────────────────────────────────────────────────────────
    {
      id: 1,
      title: "Módulo 1: Introducción",
      screens: [

        // {
        //   type: "custom",
        //   html: "js/screens/front-page/front-page.html",
        //   css: "css/front-page.css",
        // },
        //PANTALLA 1 — Bienvenida
        {
          type: "custom",
          html: "js/screens/welcome-hero/welcome.html",
          css: "css/welcome.css",
        },
        //
        // // PANTALLA 2 — Video
        // {
        //   type: "video",
        //   title: "Video introductorio",
        //   videoUrl: "",
        //   characterName: "Ayla",
        //   subtitle: "Conoce los objetivos del curso y los personajes que te acompañarán. En este módulo aprenderás las bases fundamentales sobre los ecosistemas de derechos de manera interactiva.",
        //   characterLeft: "Ayla",
        //   characterRight: "Simón",
        // },

        // PANTALLA 3 — Video 16:9
        // {
        //   type: "video",
        //   title: "Video instructivo",
        //   videoUrl: "",
        //   characterName: "Ayla",
        //   subtitle: "Conoce los objetivos del curso y los personajes que te acompañarán.",
        //   characterLeft: "Ayla",
        //   characterRight: "Simón",
        // },

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
                    icon:"",
                    title: "MÓDULO 1. DERECHOS HUMANOS Y DERECHO INTERNACIONAL HUMANITARIO",
                    objective: "Reconocer los Derechos Humanos y Derecho Internacional Humanitario (DIH), para orientar la toma de decisiones éticas y responsables en la protección y garantía de los derechos de niños, niñas y adolescentes, en los contextos sociales, institucionales.",
                    contents: [
                      "Derechos Humanos",
                      "Igualdad y no discriminación",
                      "Derecho Internacional Humanitario"
                    ]
                  },
                  {
                    icon:"",
                    title: "MÓDULO 2. PARTICIPACIÓN, PROTECCIÓN Y EJERCICIO DE LOS DERECHOS EN EL ÁMBITO PÚBLICO",
                    objective: "Reconocer los derechos civiles y políticos, los mecanismos universales, regionales y nacionales de protección y los mecanismos de participación ciudadana, para orientar la gestión pública transparente y la participación informada en la garantía de los derechos de niños, niñas y adolescentes.",
                    contents: [
                      "Derechos civiles y políticos",
                      "Mecanismos de protección",
                      "Mecanismos de participación ciudadana",
                      "Veedurías ciudadanas"
                    ]
                  },
                  {
                    icon:"",
                    title: "MÓDULO 3. DERECHOS ECONÓMICOS, SOCIALES Y CULTURALES Y SUS MECANISMOS DE PROTECCIÓN",
                    objective: "Reconocer los Derechos Económicos, Sociales y Culturales y sus mecanismos de protección, para orientar acciones que contribuyan a la garantía integral de los derechos de niños, niñas y adolescentes.",
                    contents: [
                      "Los Derechos Económicos, Sociales y Culturales",
                      "Mecanismos de protección de los Derechos Económicos, Sociales y Culturales"
                    ]
                  },
                  {
                    icon:"",
                    title: "MÓDULO 4. DERECHOS COLECTIVOS Y AMBIENTALES",
                    objective: "Identificar los derechos colectivos y ambientales, los mecanismos nacionales de protección y los enfoques de multiculturalidad y diversidad étnica, para orientar acciones de protección y respeto por los derechos de niños, niñas y adolescentes y de sus comunidades, en los contextos sociales, culturales y territoriales.",
                    contents: [
                      "Derechos colectivos",
                      "Mecanismos nacionales de protección",
                      "Multiculturalidad y diversidad étnica"
                    ]
                  },
                  {
                    icon:"",
                    title: "MÓDULO 5. GRUPOS POBLACIONALES",
                    objective: "Reconocer los derechos de los distintos grupos poblacionales desde un enfoque diferencial, para orientar acciones institucionales inclusivas, respetuosas y pertinentes en la protección y garantía de los derechos.",
                    contents: [
                      "Derechos de mujeres y niñas",
                      "Derechos de niños, niñas y adolescentes",
                      "Derechos de la comunidad LGBTIQ+",
                      "Derechos de pueblos y comunidades indígenas",
                      "Derechos de las personas migrantes y refugiadas",
                      "Personas con discapacidad y personas mayores"
                    ]
                  }
                ]
              }
            }
          ]
        },
          // PANTALLA 4 -
        {
          type: "video",
          title: "Video introductorio",
          videoUrl: "",
          characterName: "Ayla",
          subtitle: "Conoce los objetivos del curso y los personajes que te acompañarán.",
          characterLeft: "Ayla",
          characterRight: "Simón",
        },


      ]
    }

  ]
};
