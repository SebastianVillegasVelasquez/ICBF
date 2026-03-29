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
  title: "Ley 1257: Protección de la mujer",

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

    // ── MÓDULO 1: Introducción a la Ley ─────────────────────
    {
      title: "Introducción a la Ley 1257",
      description: "Marco legal y propósito de la normativa",
      highlights: ["Historia", "Objetivos", "Alcance"],
      showCover: true,
      pages: [
        {
          title: "Bienvenida al Módulo 1",
          type: "welcome",
          config: {
            courseTitle: "Ley 1257",
            moduleNumber: 1,
            moduleTitle: "Introducción a la Ley 1257",
            introText: "La Ley 1257 de 2008 establece normas de sensibilización, prevención y sanción de formas de violencia y discriminación contra la mujer. Aprenderás su historia, objetivos y aplicación.",
            progressPercent: 10
          }
        },
        {
          title: "Video: Contexto Histórico",
          type: "video",
          config: {
            videoUrl: "https://example.com/video1.mp4",
            videoTitle: "Contexto Histórico de la Ley 1257",
            characterName: "Ayla",
            subtitle: "Conoce cómo surgió esta importante normativa",
            characterLeft: "Ayla",
            characterRight: "Simón"
          }
        }
      ]
    },

    // ── MÓDULO 2: Conceptos Fundamentales ───────────────────
    {
      title: "Conceptos Fundamentales",
      description: "Definiciones y terminología clave",
      highlights: ["Violencia", "Discriminación", "Derechos"],
      showCover: true,
      pages: [
        {
          title: "Bienvenida al Módulo 2",
          type: "welcome",
          config: {
            courseTitle: "Ley 1257",
            moduleNumber: 2,
            moduleTitle: "Conceptos Fundamentales",
            introText: "Entiende los conceptos básicos que fundamentan la Ley 1257: violencia, discriminación, víctimas y derechos humanos.",
            progressPercent: 20
          }
        },
        {
          title: "Video: Definiciones Clave",
          type: "video",
          config: {
            videoUrl: "https://example.com/video2.mp4",
            videoTitle: "Definiciones y Conceptos",
            characterName: "Simón",
            subtitle: "Exploramos los términos fundamentales",
            characterLeft: "Ayla",
            characterRight: "Simón"
          }
        },
        {
          title: "Carrusel de Temas",
          type: "carousel",
          config: {
            slides: [
              {
                icon: "👩‍⚖️",
                title: "Violencia contra la mujer",
                objective: "Acciones u omisiones que causen daño",
                contents: ["Violencia física", "Violencia psicológica", "Violencia sexual", "Violencia económica"]
              },
              {
                icon: "⚖️",
                title: "Derechos Humanos",
                objective: "Derechos fundamentales de toda persona",
                contents: ["Derecho a la vida", "Derecho a la libertad", "Derecho a la dignidad"]
              },
              {
                icon: "🛡️",
                title: "Protección",
                objective: "Medidas para garantizar seguridad",
                contents: ["Medidas cautelares", "Órdenes de restricción", "Programas de protección"]
              },
              {
                icon: "📋",
                title: "Responsabilidad",
                objective: "Obligaciones del Estado",
                contents: ["Prevención", "Investigación", "Sanción", "Reparación"]
              },
              {
                icon: "🤝",
                title: "Participación",
                objective: "Rol de la comunidad",
                contents: ["Denuncia", "Apoyo a víctimas", "Prevención comunitaria"]
              }
            ]
          }
        }
      ]
    },

    // ── MÓDULO 3: Tipos de Violencia ────────────────────────
    {
      title: "Tipos de Violencia",
      description: "Clasificación de formas de violencia",
      highlights: ["Física", "Psicológica", "Sexual", "Económica"],
      showCover: true,
      pages: [
        {
          title: "Bienvenida al Módulo 3",
          type: "welcome",
          config: {
            courseTitle: "Ley 1257",
            moduleNumber: 3,
            moduleTitle: "Tipos de Violencia",
            introText: "La Ley 1257 reconoce múltiples formas de violencia. Conoce cómo se clasifican y sus características distintivas.",
            progressPercent: 30
          }
        },
        {
          title: "Video: Manifestaciones de Violencia",
          type: "video",
          config: {
            videoUrl: "https://example.com/video3.mp4",
            videoTitle: "Formas y Manifestaciones",
            characterName: "Ayla",
            subtitle: "Identifica los diferentes tipos de violencia",
            characterLeft: "Ayla",
            characterRight: "Simón"
          }
        },
        {
          title: "Clasificación de Violencia",
          type: "carousel",
          config: {
            slides: [
              {
                icon: "✊",
                title: "Violencia Física",
                objective: "Daño corporal directo",
                contents: ["Golpes", "Empujones", "Restricción de movimiento", "Intoxicación forzada"]
              },
              {
                icon: "💔",
                title: "Violencia Psicológica",
                objective: "Daño emocional y mental",
                contents: ["Humillación", "Amenazas", "Insultos", "Control emocional", "Aislamiento"]
              },
              {
                icon: "⚡",
                title: "Violencia Sexual",
                objective: "Actos sexuales no consentidos",
                contents: ["Acoso sexual", "Tocamientos sin consentimiento", "Violación", "Explotación"]
              },
              {
                icon: "💰",
                title: "Violencia Económica",
                objective: "Control financiero y acceso",
                contents: ["Negación de recursos", "Control de ingresos", "Destrucción de bienes", "Deuda forzada"]
              },
              {
                icon: "🚫",
                title: "Negligencia y Abandono",
                objective: "Falta de cuidado y protección",
                contents: ["Abandono", "Falta de atención médica", "Descuido emocional"]
              }
            ]
          }
        }
      ]
    },

    // ── MÓDULO 4: Derechos de las Víctimas ──────────────────
    {
      title: "Derechos de las Víctimas",
      description: "Protecciones y garantías para víctimas",
      highlights: ["Acceso a justicia", "Reparación", "Protección"],
      showCover: true,
      pages: [
        {
          title: "Bienvenida al Módulo 4",
          type: "welcome",
          config: {
            courseTitle: "Ley 1257",
            moduleNumber: 4,
            moduleTitle: "Derechos de las Víctimas",
            introText: "Toda víctima de violencia tiene derechos específicos garantizados por la ley. Conoce sus garantías y mecanismos de protección.",
            progressPercent: 40
          }
        },
        {
          title: "Video: Derechos y Garantías",
          type: "video",
          config: {
            videoUrl: "https://example.com/video4.mp4",
            videoTitle: "Derechos de las Víctimas",
            characterName: "Simón",
            subtitle: "Acceso a justicia y protección",
            characterLeft: "Ayla",
            characterRight: "Simón"
          }
        },
        {
          title: "Derechos Específicos",
          type: "carousel",
          config: {
            slides: [
              {
                icon: "⚖️",
                title: "Acceso a Justicia",
                objective: "Derecho a ser escuchado",
                contents: ["Denuncia sin costo", "Representación legal", "Procedimiento preferente"]
              },
              {
                icon: "🛡️",
                title: "Protección",
                objective: "Medidas de seguridad personal",
                contents: ["Órdenes de restricción", "Protección policial", "Programas de refugio"]
              },
              {
                icon: "💊",
                title: "Atención Integral",
                objective: "Servicios de apoyo multidisciplinario",
                contents: ["Atención médica", "Apoyo psicológico", "Asesoría legal", "Albergue temporal"]
              },
              {
                icon: "💰",
                title: "Reparación",
                objective: "Compensación por daños",
                contents: ["Indemnización", "Restitución", "Rehabilitación", "Satisfacción"]
              },
              {
                icon: "🔒",
                title: "Confidencialidad",
                objective: "Privacidad en los procesos",
                contents: ["Datos protegidos", "Procesos cerrados", "Identidad resguardada"]
              }
            ]
          }
        }
      ]
    },

    // ── MÓDULO 5: Procedimientos y Rutas ────────────────────
    {
      title: "Procedimientos de Atención",
      description: "Rutas de atención y procedimientos legales",
      highlights: ["Denuncia", "Investigación", "Juicio"],
      showCover: true,
      pages: [
        {
          title: "Bienvenida al Módulo 5",
          type: "welcome",
          config: {
            courseTitle: "Ley 1257",
            moduleNumber: 5,
            moduleTitle: "Procedimientos de Atención",
            introText: "Conoce los pasos a seguir ante un caso de violencia: desde la denuncia hasta los procedimientos legales.",
            progressPercent: 50
          }
        },
        {
          title: "Video: Ruta de Atención",
          type: "video",
          config: {
            videoUrl: "https://example.com/video5.mp4",
            videoTitle: "Procedimientos Paso a Paso",
            characterName: "Ayla",
            subtitle: "Guía para denuncia y atención",
            characterLeft: "Ayla",
            characterRight: "Simón"
          }
        },
        {
          title: "Fases del Procedimiento",
          type: "carousel",
          config: {
            slides: [
              {
                icon: "📞",
                title: "1. Denuncia",
                objective: "Primer paso ante violencia",
                contents: ["Línea de emergencia", "Policía", "Fiscalía", "Centros de atención"]
              },
              {
                icon: "🔍",
                title: "2. Investigación",
                objective: "Recopilación de pruebas",
                contents: ["Entrevistas", "Inspecciones", "Peritajes médicos"]
              },
              {
                icon: "⚖️",
                title: "3. Procesos Legales",
                objective: "Actuaciones ante autoridades",
                contents: ["Audiencias", "Pruebas", "Defensa", "Sentencia"]
              },
              {
                icon: "🏛️",
                title: "4. Resoluciones",
                objective: "Decisiones judiciales",
                contents: ["Sentencia condenatoria", "Medidas cautelares", "Medidas protectoras"]
              },
              {
                icon: "✅",
                title: "5. Seguimiento",
                objective: "Cumplimiento de sentencias",
                contents: ["Monitoreo", "Apoyo a víctima", "Control del agresor"]
              }
            ]
          }
        }
      ]
    },

    // ── MÓDULO 6: Buenas Prácticas ─────────────────────────
    {
      title: "Buenas Prácticas",
      description: "Recomendaciones para responder a casos",
      highlights: ["Prevención", "Intervención", "Seguimiento"],
      showCover: true,
      pages: [
        {
          title: "Bienvenida al Módulo 6",
          type: "welcome",
          config: {
            courseTitle: "Ley 1257",
            moduleNumber: 6,
            moduleTitle: "Buenas Prácticas",
            introText: "Aprende estrategias y procedimientos recomendados para una respuesta efectiva ante casos de violencia.",
            progressPercent: 60
          }
        },
        {
          title: "Video: Mejores Prácticas",
          type: "video",
          config: {
            videoUrl: "https://example.com/video6.mp4",
            videoTitle: "Estrategias Efectivas",
            characterName: "Simón",
            subtitle: "Protocolos y mejores prácticas",
            characterLeft: "Ayla",
            characterRight: "Simón"
          }
        }
      ]
    },

    // ── MÓDULO 7: Normativa y Marco Legal ───────────────────
    {
      title: "Normativa y Referencias",
      description: "Documentos legales y jurisprudencia",
      highlights: ["Ley 1257", "Jurisprudencia", "Convenciones"],
      showCover: true,
      pages: [
        {
          title: "Bienvenida al Módulo 7",
          type: "welcome",
          config: {
            courseTitle: "Ley 1257",
            moduleNumber: 7,
            moduleTitle: "Marco Normativo",
            introText: "Consulta el marco legal completo, sentencias clave y convenciones internacionales relacionadas.",
            progressPercent: 70
          }
        }
      ]
    },

    // ── MÓDULO 8: Herramientas y Recursos ───────────────────
    {
      title: "Herramientas y Recursos",
      description: "Materiales de apoyo y referencia",
      highlights: ["Plantillas", "Guías", "Contactos"],
      showCover: true,
      pages: [
        {
          title: "Bienvenida al Módulo 8",
          type: "welcome",
          config: {
            courseTitle: "Ley 1257",
            moduleNumber: 8,
            moduleTitle: "Herramientas y Recursos",
            introText: "Accede a plantillas, guías prácticas y contactos de organismos de apoyo.",
            progressPercent: 80
          }
        }
      ]
    },

    // ── MÓDULO 9: Evaluación Final ──────────────────────────
    {
      title: "Evaluación",
      description: "Verifica tu comprensión",
      highlights: ["Cuestionario", "Retroalimentación", "Certificado"],
      showCover: true,
      pages: [
        {
          title: "Bienvenida a Evaluación",
          type: "welcome",
          config: {
            courseTitle: "Ley 1257",
            moduleNumber: 9,
            moduleTitle: "Evaluación Final",
            introText: "Completa esta evaluación para verificar tu comprensión de los contenidos. Al finalizar, recibirás retroalimentación.",
            progressPercent: 90
          }
        }
      ]
    },

    // ── MÓDULO 10: Cierre ───────────────────────────────────
    {
      title: "Cierre del Curso",
      description: "Conclusiones y próximos pasos",
      highlights: ["Resumen", "Certificado", "Recursos"],
      showCover: true,
      pages: [
        {
          title: "Felicitaciones",
          type: "welcome",
          config: {
            courseTitle: "Ley 1257",
            moduleNumber: 10,
            moduleTitle: "¡Has Completado el Curso!",
            introText: "Felicidades por completar este curso. Has adquirido conocimientos valiosos sobre la Ley 1257 y protección de derechos.",
            progressPercent: 100
          }
        }
      ]
    }

  ] // end modules
};
