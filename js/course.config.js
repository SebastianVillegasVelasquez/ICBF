export const course = {
  title: "Ecosistema de los Derechos Humanos",

  modules: [
    // ─────────────────────────────────────────────────────────
    // CONFIGURACIÓN DE PANTALLAS
    // ─────────────────────────────────────────────────────────
    // Tipos soportados:
    //   - "module-intro"    : Pantalla de bienvenida con título
    //   - "post-intro"      : Pantalla resumen post-módulo
    //   - "video"           : Pantalla de video
    //   - "content"         : Pantalla con componentes (carousel, cards, etc)
    //   - "custom"          : Pantalla HTML personalizada + CSS dinámico
    //   - "default-layout"  : Layout con imágenes izq/derecha + contenido central
    //
    // Para background images dinámicos, usar en renderizadores:
    //   window.resolvePath('assets/img/nombre.png')
    // Esto funciona en CUALQUIER entorno (localhost, subcarpetas, producción)
    // ─────────────────────────────────────────────────────────
    // FRONT PAGE
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
        //PANTALLA 1 — Bienvenida
        {
          type: "module-intro",
          moduleTitle: "Módulo 1",
          introText: "El ecosistema de derechos",
          subText: "Conceptos básicos y fundamentales",
        },
          // PANTALLA 2 - Post-intro
        {
          type: "post-intro",
          moduleTitle: "Módulo 1",
          introText: "El ecosistema de derechos",
          subText: "Conceptos básicos y fundamentales",
        },
        {
          type: "default-layout",
          contentHtml: `
    <div class="table-container">
      <h2>Tabla de Datos Importantes</h2>
      <table class="custom-table">
         <tr><th>Concepto</th><th>Definición</th></tr>
         <tr><td>Derecho Humano</td><td>Garantía universal...</td></tr>
      </table>
    </div>
  `
        },

        // PANTALLA 2 — Video
        {
          type: "video",
          title: "Video introductorio",
          videoUrl: "",
          characterName: "Ayla",
          subtitle: "Conoce los objetivos del curso y los personajes que te acompañarán. En este módulo aprenderás las bases fundamentales sobre los ecosistemas de derechos de manera interactiva.",
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
