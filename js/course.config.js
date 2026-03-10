/**
 * course.config.js
 *
 * Single source of truth for course structure.
 * Each page has either:
 *   - sections[]  →  JSON-driven interactive components (preferred)
 *   - file        →  legacy HTML file path
 *
 * Set showCover: false on a module to skip the cover slide.
 */

export const course = {
  title: "Ley 1257: No violencia contra la mujer",

  modules: [

    // ──────────────────────────────────────────────────
    // MODULE 0  –  Introduccion (cover + narrative demo)
    // ──────────────────────────────────────────────────
    {
      title: "Introduccion",
      description: "Conoce el proposito de este curso, su estructura y la normativa que lo sustenta.",
      highlights: [
        "Marco legal de la Ley 1257 de 2008",
        "Objetivo del curso y metodologia",
        "Competencias a desarrollar"
      ],
      showCover: true,
      pages: [
        {
          title: "Bienvenida y narrativa",
          sections: [
            {
              type: "narrative-scroll",
              title: "Recorrido del curso",
              intro: "Este curso te acompana en el aprendizaje de la Ley 1257 de 2008, sus conceptos clave y su aplicacion practica.",
              steps: [
                { heading: "Por que es importante", body: "La violencia contra la mujer es un problema de salud publica y derechos humanos que requiere conocimiento y accion desde cada rol institucional." },
                { heading: "Que aprenderas", body: "Identificaras formas de violencia, rutas de atencion, derechos de las victimas y obligaciones del Estado." },
                { heading: "Como funciona el curso", body: "Cada modulo tiene contenido teorico, actividades interactivas y una evaluacion final para consolidar tu aprendizaje." }
              ]
            }
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // MODULE 1  –  Conceptos (cards + accordion + timeline)
    // ──────────────────────────────────────────────────
    {
      title: "Modulo 1: Conceptos clave",
      description: "Comprende los conceptos fundamentales sobre las formas de violencia definidas en la Ley 1257.",
      highlights: [
        "Definicion de violencia de genero",
        "Tipos de violencia reconocidos por la ley",
        "Evolucion normativa en Colombia"
      ],
      showCover: true,
      pages: [
        {
          title: "Tipos de violencia",
          sections: [
            {
              type: "cards",
              title: "Formas de violencia segun la Ley 1257",
              intro: "La ley reconoce cuatro formas principales de violencia contra la mujer.",
              items: [
                { title: "Violencia fisica", body: "Accion u omision que cause dano o sufrimiento fisico, lesiones u otro dano en el cuerpo de la mujer." },
                { title: "Violencia psicologica", body: "Accion u omision destinada a degradar, controlar, aislar o humillar a la mujer, causando dano emocional." },
                { title: "Violencia sexual", body: "Toda accion que vulnere el derecho a decidir voluntariamente sobre la vida sexual e intima." },
                { title: "Violencia economica", body: "Accion u omision orientada al abuso economico, control abusivo de las finanzas o robo de recursos." }
              ]
            }
          ]
        },
        {
          title: "Evolucion normativa",
          sections: [
            {
              type: "timeline",
              title: "Hitos normativos en Colombia",
              intro: "Colombia ha avanzado progresivamente en la proteccion de los derechos de las mujeres.",
              events: [
                { year: "1991", heading: "Constitucion Politica", body: "Reconoce la igualdad de derechos entre hombres y mujeres y prohibe toda discriminacion." },
                { year: "2000", heading: "Ley 599 – Codigo Penal", body: "Tipifica la violencia intrafamiliar como delito punible con penas privativas de la libertad." },
                { year: "2008", heading: "Ley 1257", body: "Norma integral para garantizar a las mujeres una vida libre de violencia, definiendo medidas de proteccion, atencion y sancion." },
                { year: "2019", heading: "Ley 1959", body: "Modifica el Codigo Penal en materia de violencia intrafamiliar y agrava las sanciones." }
              ]
            }
          ]
        },
        {
          title: "Preguntas frecuentes",
          sections: [
            {
              type: "accordion",
              title: "Preguntas frecuentes sobre la Ley 1257",
              items: [
                { heading: "¿A quienes protege la Ley 1257?", body: "Protege a todas las mujeres sin importar su edad, condicion social, etnia o tipo de relacion con el agresor." },
                { heading: "¿Que instituciones deben aplicarla?", body: "Todas las entidades del Estado: comisarias de familia, fiscalia, policia, hospitales, ICBF, entre otras." },
                { heading: "¿Que son las medidas de proteccion?", body: "Son ordenes judiciales o administrativas que buscan salvaguardar la integridad de la victima: desalojo del agresor, prohibicion de acercamiento, entre otras." },
                { heading: "¿Como se activa la ruta de atencion?", body: "La victima puede acudir a una comisaria de familia, al ICBF, a la Fiscalia o a un hospital; cualquier entidad debe orientar e iniciar el proceso." }
              ]
            }
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // MODULE 2  –  Interacciones demo
    // ──────────────────────────────────────────────────
    {
      title: "Modulo 2: Actividades interactivas",
      description: "Pon a prueba tu aprendizaje con las siguientes actividades interactivas.",
      highlights: [
        "Preguntas de seleccion multiple",
        "Actividad de arrastre y soltado",
        "Lista de verificacion"
      ],
      showCover: true,
      pages: [
        {
          title: "Evaluacion: seleccion multiple",
          sections: [
            {
              type: "multiple-choice",
              title: "Pon a prueba tu conocimiento",
              questions: [
                {
                  question: "¿En que ano se expidio la Ley 1257 en Colombia?",
                  options: ["2000", "2005", "2008", "2015"],
                  correct: 2,
                  feedback: { correct: "Correcto, la Ley 1257 fue promulgada en 2008.", incorrect: "Incorrecto. La Ley 1257 fue expedida en 2008." }
                },
                {
                  question: "¿Cual de las siguientes es una forma de violencia economica?",
                  options: [
                    "Golpear a la mujer",
                    "Controlar abusivamente el dinero del hogar",
                    "Insultar en publico",
                    "Prohibir salir de la casa"
                  ],
                  correct: 1,
                  feedback: { correct: "Exacto. El control abusivo de las finanzas es violencia economica.", incorrect: "Esa opcion corresponde a otro tipo de violencia." }
                }
              ]
            }
          ]
        },
        {
          title: "Actividad: clasifica la violencia",
          sections: [
            {
              type: "drag-drop",
              title: "Clasifica cada situacion",
              instruction: "Arrastra cada situacion a la categoria de violencia que corresponde.",
              items: [
                "Prohibir trabajar",
                "Amenazar con golpear",
                "Tomar el salario sin permiso",
                "Gritar insultos"
              ],
              zones: [
                { label: "Violencia psicologica", accepts: ["Amenazar con golpear", "Gritar insultos"] },
                { label: "Violencia economica",   accepts: ["Prohibir trabajar", "Tomar el salario sin permiso"] }
              ]
            }
          ]
        },
        {
          title: "Lista de verificacion",
          sections: [
            {
              type: "checklist",
              title: "Compromisos del servidor publico",
              intro: "Marca los compromisos que ya conoces y practicas en tu labor institucional.",
              items: [
                "Identifico las senales de alerta de violencia contra la mujer",
                "Conozco la ruta de atencion y la activo cuando es necesario",
                "Trato a las victimas con respeto, confidencialidad y sin revictimizar",
                "Remito a las instituciones competentes de forma oportuna",
                "Me actualizo periodicamente en la normativa vigente"
              ]
            }
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────
    // MODULE 3  –  Recursos y componentes adicionales
    // ──────────────────────────────────────────────────
    {
      title: "Modulo 3: Recursos de apoyo",
      description: "Explora recursos adicionales, comparativos y puntos de informacion interactivos.",
      highlights: [
        "Comparativo de rutas de atencion",
        "Carrusel de buenas practicas",
        "Caja de herramientas y bibliografia"
      ],
      showCover: true,
      pages: [
        {
          title: "Comparativo de rutas",
          sections: [
            {
              type: "comparison-table",
              title: "Rutas de atencion segun el tipo de violencia",
              headers: ["Tipo de violencia", "Primera instancia", "Entidad de apoyo", "Marco legal"],
              rows: [
                ["Fisica / Sexual", "Hospital o clinica", "Fiscalia, Comisaria de Familia", "Ley 1257, Art. 19"],
                ["Psicologica",     "Comisaria de Familia", "ICBF, Defensoria del Pueblo", "Ley 1257, Art. 7"],
                ["Economica",       "Comisaria de Familia", "Superintendencia de Notariado", "Ley 1257, Art. 8"],
                ["Intrafamiliar",   "Policia Nacional", "Comisaria de Familia, Fiscalia", "Ley 599 de 2000"]
              ]
            }
          ]
        },
        {
          title: "Buenas practicas",
          sections: [
            {
              type: "carousel",
              title: "Buenas practicas institucionales",
              intro: "Desliza para conocer acciones que marcan la diferencia en la atencion a victimas.",
              slides: [
                { heading: "Escucha activa sin juicios", body: "Recibir el relato de la victima con respeto, sin interrumpir ni minimizar, es el primer paso para una atencion efectiva." },
                { heading: "Activacion inmediata de la ruta", body: "No esperar a que la situacion sea 'mas grave'. Ante cualquier senal de violencia, la ruta debe activarse de inmediato." },
                { heading: "Registro completo del caso", body: "Documentar con detalle fecha, descripcion de hechos y medidas tomadas garantiza seguimiento y proteccion legal." },
                { heading: "Trabajo interinstitucional", body: "La coordinacion entre ICBF, Fiscalia, Comisarias y salud mejora los resultados y evita la victimizacion secundaria." }
              ]
            }
          ]
        },
        {
          title: "Mapa interactivo de atencion",
          sections: [
            {
              type: "hotspot",
              title: "Puntos clave de la ruta de atencion",
              intro: "Haz clic en cada punto para conocer el rol de cada entidad.",
              image: "/placeholder.svg?width=800&height=380",
              imageAlt: "Mapa de ruta de atencion a victimas",
              points: [
                { x: 15, y: 40, label: "1", heading: "Denuncia inicial", body: "La victima puede presentar la denuncia ante la Policia, Fiscalia o Comisaria de Familia las 24 horas del dia." },
                { x: 38, y: 55, label: "2", heading: "Comisaria de Familia", body: "Otorga medidas de proteccion inmediatas y hace seguimiento al caso." },
                { x: 60, y: 35, label: "3", heading: "ICBF", body: "Interviene cuando hay ninos, ninas o adolescentes involucrados, garantizando su proteccion integral." },
                { x: 80, y: 50, label: "4", heading: "Fiscalia", body: "Adelanta la investigacion penal y puede solicitar medidas cautelares al juez." }
              ]
            }
          ]
        },
        {
          title: "Caja de herramientas",
          sections: [
            {
              type: "toolbox",
              title: "Herramientas para el servidor publico",
              intro: "Recursos practicos para la atencion de casos de violencia contra la mujer.",
              items: [
                { title: "Protocolo de atencion", body: "Guia paso a paso para recibir, registrar y remitir casos de violencia de genero en entidades del Estado." },
                { title: "Formulario unificado de denuncia", body: "Formato estandarizado para el registro inicial del caso, compatible con el sistema de informacion del ICBF." },
                { title: "Directorio de servicios", body: "Contactos actualizados de Comisarias de Familia, Casas de Acogida y lineas de emergencia por departamento." },
                { title: "Material de sensibilizacion", body: "Cartillas, videos y afiches descargables para actividades de prevencion con comunidades." }
              ]
            }
          ]
        },
        {
          title: "Bibliografia",
          sections: [
            {
              type: "bibliography",
              title: "Referencias y fuentes",
              refs: [
                { authors: "Congreso de Colombia", year: "2008", title: "Ley 1257 de 2008", source: "Diario Oficial No. 47.193", url: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=34054" },
                { authors: "OMS", year: "2021", title: "Violencia contra la mujer: datos y cifras", source: "Organizacion Mundial de la Salud", url: "https://www.who.int/es/news-room/fact-sheets/detail/violence-against-women" },
                { authors: "ICBF", year: "2022", title: "Lineamiento tecnico para la atencion a victimas de violencia de genero", source: "Instituto Colombiano de Bienestar Familiar" }
              ]
            }
          ]
        }
      ]
    }

  ]
};
