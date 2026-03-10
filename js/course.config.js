/**
 * course.config.js
 *
 * Single source of truth for course structure.
 * Each module here showcases one component type.
 * Each page has sections[] -> JSON-driven interactive components.
 *
 * To add a new module: add an entry to the modules array.
 * To add a new page:   add an entry to the module's pages array.
 */

export const course = {
  title: "Ley 1257: No violencia contra la mujer",

  modules: [

    // ── 0: Introduccion ─────────────────────────────────────
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
          title: "Bienvenida",
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

    // ── 1: Acordeon ──────────────────────────────────────────
    {
      title: "Modulo 1: Preguntas frecuentes",
      description: "Usa el acordeon para explorar respuestas a las preguntas mas comunes sobre la Ley 1257.",
      highlights: [
        "Poblacion protegida por la ley",
        "Instituciones responsables",
        "Medidas de proteccion disponibles"
      ],
      showCover: true,
      pages: [
        {
          title: "Acordeon: preguntas frecuentes",
          sections: [
            {
              type: "accordion",
              title: "Preguntas frecuentes sobre la Ley 1257",
              items: [
                { heading: "¿A quienes protege la Ley 1257?", body: "Protege a todas las mujeres sin importar su edad, condicion social, etnia o tipo de relacion con el agresor." },
                { heading: "¿Que instituciones deben aplicarla?", body: "Todas las entidades del Estado: comisarias de familia, fiscalia, policia, hospitales, ICBF, entre otras." },
                { heading: "¿Que son las medidas de proteccion?", body: "Son ordenes judiciales o administrativas que buscan salvaguardar la integridad de la victima: desalojo del agresor, prohibicion de acercamiento, entre otras." },
                { heading: "¿Como se activa la ruta de atencion?", body: "La victima puede acudir a una comisaria de familia, al ICBF, a la Fiscalia o a un hospital; cualquier entidad debe orientar e iniciar el proceso." },
                { heading: "¿Que derechos tienen las victimas?", body: "Derecho a recibir informacion, a ser atendidas sin discriminacion, a medidas de proteccion, a reparacion del dano y a no ser revictimizadas." }
              ]
            }
          ]
        }
      ]
    },

    // ── 2: Tarjetas ──────────────────────────────────────────
    {
      title: "Modulo 2: Tipos de violencia",
      description: "Conoce las cuatro formas de violencia reconocidas por la Ley 1257 a traves de tarjetas informativas.",
      highlights: [
        "Violencia fisica y sus consecuencias",
        "Violencia psicologica y emocional",
        "Violencia sexual y economica"
      ],
      showCover: true,
      pages: [
        {
          title: "Tarjetas: formas de violencia",
          sections: [
            {
              type: "cards",
              title: "Formas de violencia segun la Ley 1257",
              intro: "La ley reconoce cuatro formas principales de violencia contra la mujer. Haz clic en cada tarjeta para ampliar la informacion.",
              items: [
                { title: "Violencia fisica", body: "Accion u omision que cause dano o sufrimiento fisico, lesiones u otro dano en el cuerpo de la mujer." },
                { title: "Violencia psicologica", body: "Accion u omision destinada a degradar, controlar, aislar o humillar a la mujer, causando dano emocional." },
                { title: "Violencia sexual", body: "Toda accion que vulnere el derecho a decidir voluntariamente sobre la vida sexual e intima de la mujer." },
                { title: "Violencia economica", body: "Accion u omision orientada al abuso economico, control abusivo de las finanzas o robo de recursos de la mujer." }
              ]
            }
          ]
        }
      ]
    },

    // ── 3: Carrusel ──────────────────────────────────────────
    {
      title: "Modulo 3: Buenas practicas",
      description: "Desliza para conocer las buenas practicas institucionales en la atencion a victimas de violencia.",
      highlights: [
        "Escucha activa y sin juicios",
        "Activacion oportuna de la ruta",
        "Trabajo interinstitucional"
      ],
      showCover: true,
      pages: [
        {
          title: "Carrusel: buenas practicas",
          sections: [
            {
              type: "carousel",
              title: "Buenas practicas institucionales",
              intro: "Desliza para conocer acciones que marcan la diferencia en la atencion a victimas.",
              slides: [
                { heading: "Escucha activa sin juicios", body: "Recibir el relato de la victima con respeto, sin interrumpir ni minimizar, es el primer paso para una atencion efectiva." },
                { heading: "Activacion inmediata de la ruta", body: "No esperar a que la situacion sea 'mas grave'. Ante cualquier senal de violencia, la ruta debe activarse de inmediato." },
                { heading: "Registro completo del caso", body: "Documentar con detalle fecha, descripcion de hechos y medidas tomadas garantiza seguimiento y proteccion legal." },
                { heading: "Trabajo interinstitucional", body: "La coordinacion entre ICBF, Fiscalia, Comisarias y salud mejora los resultados y evita la victimizacion secundaria." },
                { heading: "Confidencialidad", body: "Toda informacion que comparta la victima debe tratarse con estricta reserva para garantizar su seguridad e integridad." }
              ]
            }
          ]
        }
      ]
    },

    // ── 4: Lista de verificacion ─────────────────────────────
    {
      title: "Modulo 4: Compromisos",
      description: "Verifica cuales compromisos ya practicas como servidor publico en la atencion a victimas.",
      highlights: [
        "Identificacion de senales de alerta",
        "Activacion de la ruta de atencion",
        "Trato digno y sin revictimizacion"
      ],
      showCover: true,
      pages: [
        {
          title: "Lista de verificacion: compromisos",
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
                "Me actualizo periodicamente en la normativa vigente",
                "Garantizo la privacidad de la informacion de la victima"
              ]
            }
          ]
        }
      ]
    },

    // ── 5: Tabla comparativa ─────────────────────────────────
    {
      title: "Modulo 5: Rutas de atencion",
      description: "Compara las rutas de atencion disponibles segun el tipo de violencia reportada.",
      highlights: [
        "Ruta para violencia fisica y sexual",
        "Ruta para violencia psicologica",
        "Ruta para violencia economica"
      ],
      showCover: true,
      pages: [
        {
          title: "Tabla: rutas de atencion",
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
        }
      ]
    },

    // ── 6: Arrastre y suelte ─────────────────────────────────
    {
      title: "Modulo 6: Clasifica la violencia",
      description: "Pon a prueba tu comprension clasificando situaciones reales en el tipo de violencia que representan.",
      highlights: [
        "Reconocer violencia psicologica",
        "Identificar violencia economica",
        "Distinguir tipos en situaciones cotidianas"
      ],
      showCover: true,
      pages: [
        {
          title: "Arrastre: clasifica la violencia",
          sections: [
            {
              type: "drag-drop",
              title: "Clasifica cada situacion",
              instruction: "Arrastra cada situacion a la categoria de violencia que corresponde.",
              items: [
                "Prohibir trabajar",
                "Amenazar con golpear",
                "Tomar el salario sin permiso",
                "Gritar insultos",
                "Controlar el acceso al dinero",
                "Aislar de familiares y amigos"
              ],
              zones: [
                { label: "Violencia psicologica", accepts: ["Amenazar con golpear", "Gritar insultos", "Aislar de familiares y amigos"] },
                { label: "Violencia economica",   accepts: ["Prohibir trabajar", "Tomar el salario sin permiso", "Controlar el acceso al dinero"] }
              ]
            }
          ]
        }
      ]
    },

    // ── 7: Mapa de puntos calientes ──────────────────────────
    {
      title: "Modulo 7: Mapa de la ruta",
      description: "Explora el mapa interactivo para conocer el rol de cada entidad en la ruta de atencion.",
      highlights: [
        "Denuncia inicial y primeras medidas",
        "Rol de la Comisaria de Familia",
        "Intervencion del ICBF y la Fiscalia"
      ],
      showCover: true,
      pages: [
        {
          title: "Mapa interactivo de atencion",
          sections: [
            {
              type: "hotspot",
              title: "Puntos clave de la ruta de atencion",
              intro: "Haz clic en cada punto para conocer el rol de cada entidad en la ruta de atencion a victimas.",
              image: "/placeholder.svg?width=800&height=380",
              imageAlt: "Mapa de ruta de atencion a victimas de violencia",
              points: [
                { x: 15, y: 40, label: "1", heading: "Denuncia inicial", body: "La victima puede presentar la denuncia ante la Policia, Fiscalia o Comisaria de Familia las 24 horas del dia." },
                { x: 38, y: 55, label: "2", heading: "Comisaria de Familia", body: "Otorga medidas de proteccion inmediatas y hace seguimiento al caso." },
                { x: 60, y: 35, label: "3", heading: "ICBF", body: "Interviene cuando hay ninos, ninas o adolescentes involucrados, garantizando su proteccion integral." },
                { x: 80, y: 50, label: "4", heading: "Fiscalia", body: "Adelanta la investigacion penal y puede solicitar medidas cautelares al juez." }
              ]
            }
          ]
        }
      ]
    },

    // ── 8: Seleccion multiple ────────────────────────────────
    {
      title: "Modulo 8: Evaluacion",
      description: "Responde las preguntas de seleccion multiple para evaluar tu comprension de la Ley 1257.",
      highlights: [
        "Fecha de expedicion de la ley",
        "Tipos de violencia reconocidos",
        "Instituciones competentes"
      ],
      showCover: true,
      pages: [
        {
          title: "Seleccion multiple: evaluacion",
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
                },
                {
                  question: "¿Que entidad interviene cuando hay ninos o adolescentes involucrados en un caso de violencia?",
                  options: ["Fiscalia General", "Policia Nacional", "ICBF", "Superintendencia"],
                  correct: 2,
                  feedback: { correct: "Correcto. El ICBF garantiza la proteccion integral de ninos y adolescentes.", incorrect: "Incorrecto. El ICBF es la entidad especializada para estos casos." }
                }
              ]
            }
          ]
        }
      ]
    },

    // ── 9: Linea de tiempo ───────────────────────────────────
    {
      title: "Modulo 9: Evolucion normativa",
      description: "Recorre los hitos normativos mas importantes en la proteccion de los derechos de las mujeres en Colombia.",
      highlights: [
        "Constitucion Politica de 1991",
        "Codigo Penal de 2000",
        "Ley 1257 de 2008 y reformas"
      ],
      showCover: true,
      pages: [
        {
          title: "Linea de tiempo: normativa",
          sections: [
            {
              type: "timeline",
              title: "Hitos normativos en Colombia",
              intro: "Colombia ha avanzado progresivamente en la proteccion de los derechos de las mujeres a lo largo de los anos.",
              events: [
                { year: "1991", heading: "Constitucion Politica", body: "Reconoce la igualdad de derechos entre hombres y mujeres y prohibe toda discriminacion." },
                { year: "2000", heading: "Ley 599 – Codigo Penal", body: "Tipifica la violencia intrafamiliar como delito punible con penas privativas de la libertad." },
                { year: "2008", heading: "Ley 1257", body: "Norma integral para garantizar a las mujeres una vida libre de violencia, definiendo medidas de proteccion, atencion y sancion." },
                { year: "2019", heading: "Ley 1959", body: "Modifica el Codigo Penal en materia de violencia intrafamiliar y agrava las sanciones para reincidentes." },
                { year: "2022", heading: "Plan de Igualdad", body: "El gobierno nacional aprueba el Plan de Igualdad para reforzar la implementacion de la Ley 1257 en todo el territorio." }
              ]
            }
          ]
        }
      ]
    },

    // ── 10: Narrativa ────────────────────────────────────────
    {
      title: "Modulo 10: Que es la Ley 1257",
      description: "Recorre paso a paso los fundamentos de la Ley 1257 y su impacto en la vida de las mujeres colombianas.",
      highlights: [
        "Definicion y alcance de la ley",
        "Derechos que garantiza",
        "Obligaciones del Estado"
      ],
      showCover: true,
      pages: [
        {
          title: "Narrativa: fundamentos de la ley",
          sections: [
            {
              type: "narrative-scroll",
              title: "Fundamentos de la Ley 1257",
              intro: "Conoce los aspectos esenciales que definen y estructuran la Ley 1257 de 2008.",
              steps: [
                { heading: "Definicion", body: "La Ley 1257 de 2008 dicta normas de sensibilizacion, prevencion y sancion de formas de violencia y discriminacion contra las mujeres." },
                { heading: "Alcance", body: "Aplica a todas las relaciones de pareja, familiares, laborales y comunitarias, sin importar el ambito donde ocurra la violencia." },
                { heading: "Derechos garantizados", body: "Garantiza el derecho a una vida libre de violencia, a la igualdad real, a la no discriminacion y a la atencion integral." },
                { heading: "Obligaciones del Estado", body: "El Estado debe prevenir, investigar, sancionar y reparar las violencias contra las mujeres a traves de todas sus instituciones." },
                { heading: "Sanciones", body: "Establece agravantes penales cuando la victima es mujer y el delito se comete por razon de su genero o condicion." }
              ]
            }
          ]
        }
      ]
    },

    // ── 11: Caja de herramientas ─────────────────────────────
    {
      title: "Modulo 11: Herramientas",
      description: "Accede a los recursos practicos y documentos de apoyo para la atencion de casos de violencia contra la mujer.",
      highlights: [
        "Protocolo de atencion institucional",
        "Formulario unificado de denuncia",
        "Directorio de servicios por region"
      ],
      showCover: true,
      pages: [
        {
          title: "Caja de herramientas",
          sections: [
            {
              type: "toolbox",
              title: "Herramientas para el servidor publico",
              intro: "Recursos practicos para la atencion de casos de violencia contra la mujer en el marco de la Ley 1257.",
              items: [
                { title: "Protocolo de atencion", body: "Guia paso a paso para recibir, registrar y remitir casos de violencia de genero en entidades del Estado." },
                { title: "Formulario unificado de denuncia", body: "Formato estandarizado para el registro inicial del caso, compatible con el sistema de informacion del ICBF." },
                { title: "Directorio de servicios", body: "Contactos actualizados de Comisarias de Familia, Casas de Acogida y lineas de emergencia por departamento." },
                { title: "Material de sensibilizacion", body: "Cartillas, videos y afiches descargables para actividades de prevencion con comunidades." },
                { title: "Guia de medidas de proteccion", body: "Explica los tipos de medidas de proteccion disponibles, como solicitarlas y como hacer seguimiento a su cumplimiento." }
              ]
            }
          ]
        },
        {
          title: "Bibliografia y referencias",
          sections: [
            {
              type: "bibliography",
              title: "Referencias y fuentes",
              refs: [
                { authors: "Congreso de Colombia", year: "2008", title: "Ley 1257 de 2008", source: "Diario Oficial No. 47.193", url: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=34054" },
                { authors: "OMS", year: "2021", title: "Violencia contra la mujer: datos y cifras", source: "Organizacion Mundial de la Salud", url: "https://www.who.int/es/news-room/fact-sheets/detail/violence-against-women" },
                { authors: "ICBF", year: "2022", title: "Lineamiento tecnico para la atencion a victimas de violencia de genero", source: "Instituto Colombiano de Bienestar Familiar" },
                { authors: "Congreso de Colombia", year: "2019", title: "Ley 1959 de 2019", source: "Diario Oficial No. 51.025" }
              ]
            }
          ]
        }
      ]
    }

  ]
};
