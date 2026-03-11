/**
 * course.config.js
 *
 * SINGLE SOURCE OF TRUTH for course structure.
 *
 * HOW TO USE:
 *   - Each module has a title, optional description/highlights for the cover,
 *     and a pages[] array.
 *   - Each page ONLY needs a title and a file path pointing to an HTML file
 *     inside /pages/<module-folder>/.
 *   - The content team edits the HTML files directly — no JSON sections here.
 *
 * ADDING A NEW PAGE:
 *   1. Create the HTML file in /pages/<module-folder>/
 *   2. Add an entry: { title: "Mi pagina", file: "pages/module-X/mi-pagina.html" }
 *
 * ADDING A NEW MODULE:
 *   1. Create a folder under /pages/ (e.g. /pages/module12/)
 *   2. Add a new object to the modules[] array below
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
          file: "pages/module0/bienvenida.html"
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
          file: "pages/module1/faq.html"
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
          file: "pages/module2/tipos-violencia.html"
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
          file: "pages/module3/buenas-practicas.html"
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
          file: "pages/module4/compromisos.html"
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
          file: "pages/module5/rutas.html"
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
          file: "pages/module6/clasifica.html"
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
          file: "pages/module7/mapa.html"
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
          file: "pages/module8/evaluacion.html"
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
          file: "pages/module9/normativa.html"
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
          file: "pages/module10/fundamentos.html"
        }
      ]
    },

    // ── 11: Caja de herramientas ─────────────────────────────
    {
      title: "Modulo 11: Herramientas",
      description: "Accede a los recursos practicos y documentos de apoyo para la atencion de casos.",
      highlights: [
        "Protocolo de atencion institucional",
        "Formulario unificado de denuncia",
        "Directorio de servicios por region"
      ],
      showCover: true,
      pages: [
        {
          title: "Caja de herramientas",
          file: "pages/module11/herramientas.html"
        },
        {
          title: "Bibliografia y referencias",
          file: "pages/module11/bibliografia.html"
        }
      ]
    }

  ]
};
