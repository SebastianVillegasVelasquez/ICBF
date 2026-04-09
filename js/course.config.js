import {renderSlideshow} from "./components/slideshow.js";
import {getOrPickQuizQuestions, renderQuiz} from "./components/quiz.js";
import {QUESTIONS_BANK} from "./data/question-bank.js";

export const course = {
    title: "Ecosistema de los Derechos Humanos",

    modules: [
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
        // MÓDULO INTRODUCTORIO
        // ─────────────────────────────────────────────────────────
        {
            id: 0,
            title: "Módulo: Introducción",
            screens: [
                // MODULO 0 - Introduccion
                // PANTALLA 1- Video introductorio
                {
                    type: "video",
                    title: "Video introductorio",
                    videoUrl: "",
                    characterName: "Ayla",
                    subtitle: "Conoce los objetivos del curso y los personajes que te acompañarán. En este módulo aprenderás las bases fundamentales sobre los ecosistemas de derechos de manera interactiva.",
                    characterLeft: "Ayla",
                    characterRight: "Simón",
                },

                // PANTALLA 2 - Video navegacion
                {
                    type: "video",
                    title: "Video navegacion",
                    videoUrl: "",
                    characterName: "Ayla",
                    subtitle: "Conoce los objetivos del curso y los personajes que te acompañarán. En este módulo aprenderás las bases fundamentales sobre los ecosistemas de derechos de manera interactiva.",
                    characterLeft: "Ayla",
                    characterRight: "Simón",
                },

                // PANTALLA 3 — Contenido tematico

                {
                    type: "default-content",
                    htmlFile: "assets/tabla-contenidos/tabla-contenido-int.html",
                        GraphicResources: {
                        backgroundUrl: 'assets/img/background-modulo-1.png',
                        backgroundConfig: {
                            size: 'cover',
                            position: 'center'
                        },
                    },
                },

                // PANTALLA 4 - Video animado de concepto básico
                {
                    type: "video",
                    title: "Video animado de concepto básico",
                    videoUrl: "",
                    characterName: "Ayla",
                    subtitle: "Conoce los objetivos del curso y los personajes que te acompañarán. En este módulo aprenderás las bases fundamentales sobre los ecosistemas de derechos de manera interactiva.",
                    characterLeft: "Ayla",
                    characterRight: "Simón",
                },

            ]
        },
        // ─────────────────────────────────────────────────────────
        // MÓDULO 1
        // ─────────────────────────────────────────────────────────
        {
            id: 1,
            title: "Módulo 1: El suelo y las raíces del ecosistema",
            screens: [
                
                //MODULO 1
                //PANTALLA 1 — Bienvenida
                {
                    type: "module-intro",
                    moduleTitle: "Módulo 1",
                    introText: "El suelo y las raíces del ecosistema",
                    subText: "",
                },
                // PANTALLA 2 - Post-intro
                {
                    type: "post-intro",
                    moduleTitle: "Módulo 1",
                    introText: "Derechos humanos y derecho internacional humanitario",
                    subText: "El suelo y las raíces del ecosistema",
                    topics: [
                        "Derechos humanos",
                        "Igualdad y no discriminación",
                        "Derecho internacional humanitario"
                    ],
                    characterImageConfig: {
                        url: "assets/img/personajes/tres_personajes.png",
                        size: "contain"
                    },
                    percentage: 0
                },
                // PANTALLA 3 - JUSTIFICACION MODULO 1
                {
                    type: "default-content",
                    hideBackground: false,
                    htmlFile: "",
                    GraphicResources: {
                        backgroundUrl: 'assets/img/background-modulo-1.png',
                        backgroundConfig: {
                            size: 'cover',
                            position: 'center'
                        },
                    },
                    contentHtml: renderSlideshow({
                        slides: [
                            {
                                label: "Justificación",
                                title: "Derechos Humanos y DIH",
                                body: `
          <p>Proporciona a los participantes las herramientas necesarias para comprender y aplicar los derechos civiles y políticos, esenciales para la participación activa y el ejercicio pleno de los derechos. </p>
          <p>A través del estudio de los mecanismos de protección universales, regionales y nacionales, así como de los mecanismos de participación ciudadana, el módulo capacita a los participantes para promover una gestión pública transparente</p>
        `
                            },
                            {
                                label: "Objetivo general",
                                title: "Reconocimiento y orientación ética",
                                body: `
          <p>Reconocer los derechos civiles y políticos, los mecanismos universales, regionales y nacionales de protección y los mecanismos de participación ciudadana, para orientar la gestión pública transparente y la participación informada en la garantía de los derechos de niños, niñas y adolescentes.</p>
        `
                            },
                            {
                                label: "Objetivos específicos",
                                title: "Fundamentos e identificación de vulneraciones",
                                body: `
          <p>Identificar los derechos civiles y políticos y los principales mecanismos universales, regionales y nacionales de protección, para reconocer rutas institucionales de garantía y defensa de los derechos de niños, niñas y adolescentes.</p>
          <p>Analizar el funcionamiento y alcance de los mecanismos de participación ciudadana, para promover una gestión pública transparente y el ejercicio informado de los derechos, en los procesos institucionales relacionados con la protección integral de niños, niñas y adolescentes.</p>
          <p>Aplicar los mecanismos de protección y participación ciudadana a situaciones contextualizadas, para orientar decisiones y acciones coherentes con los derechos civiles y políticos, en escenarios reales o simulados vinculados a la labor del ICBF y la garantía de derechos en el ámbito público.</p>
        `
                            }
                        ]
                    })
                },


                // PANTALLA 4 - Video introductorio
                {
                    type: "video",
                    title: "Video introductorio",
                    videoUrl: "",
                    characterName: "Ayla",
                    subtitle: "Conoce los objetivos del curso y los personajes que te acompañarán. En este módulo aprenderás las bases fundamentales sobre los ecosistemas de derechos de manera interactiva.",
                    characterLeft: "Ayla",
                    characterRight: "Simón",
                },

                // PANTALLA 5 - ACTIVIDAD QUIZ

                {
                    type: "default-content",
                    hideBackground: false,
                    htmlFile: "",
                        GraphicResources: {
                        backgroundUrl: 'assets/img/background-modulo-1.png',
                        backgroundConfig: {
                            size: 'cover',
                            position: 'center'
                        },
                    },
                    contentHtml: renderQuiz({
                        title: "Autodiagnóstico de la comprensión de los DDHH y DIH",
                        description: "",
                        questions: getOrPickQuizQuestions(
                            QUESTIONS_BANK,
                            [
                                'dh-001', 'dh-002', 'part-003', 'part-004', 'iva-005',
                                'dih-006', 'dh-007', 'part-008', 'dh-009', 'iva-010',
                                'dh-011', 'part-012', 'dh-013', 'dh-014', 'iva-015',
                                'dih-016', 'part-017', 'iva-018', 'dh-019', 'dh-020'
                            ],
                            'quiz-autodiagnostico',
                            5
                        )
                    })
                },
                // PANTALLA 6 - REVISTA DIDÁCTICA

                {
                    type: "default-content",
                    htmlFile: "assets/revistas_didacticas/revista-didactica-m1-1.html",
                    GraphicResources: {
                        // Nuevas propiedades para logos del header
                        headerLogos: {
                            leftUrl: 'assets/img/titulos/titulo-blanco.png',
                            rightUrl: 'assets/img/logos/logo-icbf-blanco.png'
                        },
                        backgroundUrl: 'assets/img/fondos/fondo-tierra.png',
                        backgroundConfig: {
                            size: 'cover',
                            position: 'center'
                        },
                        characterUrl: 'assets/img/personajes/hombre.png',
                        characterConfig: {
                            side: 'left',
                            xOffset: '-10px',
                            yOffset: '80px',
                            scale: 1,
                            maxWidth: '450px',
                            // Configuración para laptops/pantallas bajas
                            responsive: {
                                xOffset: '-20px',
                                yOffset: '0px',
                                scale: 0.9,
                                maxWidth: '310px'
                            }
                        }
                    }
                },

                // PANTALLA 7 - INFOGRAFIA 1
                {
                    type: "default-content",
                    hideBackground: false,
                    htmlFile: "assets/infografias/linea-tiempo.html"
                },

                // PANTALLA 8 - REVISTA DIDACTICA 2

                {
                    type: "default-content",
                    htmlFile: "assets/revistas_didacticas/revista-didactica-m1-2.html",
                    GraphicResources: {
                        // Nuevas propiedades para logos del header
                        headerLogos: {
                            leftUrl: 'assets/img/titulos/titulo-blanco.png',
                            rightUrl: 'assets/img/logos/logo-icbf-blanco.png'
                        },
                        backgroundUrl: 'assets/img/fondos/fondo-tierra.png',
                        backgroundConfig: {
                            size: 'cover',
                            position: 'center'
                        },
                        characterUrl: 'assets/img/personajes/niña_sentada.png',
                        characterConfig: {
                            side: 'left',
                            xOffset: '50px',
                            yOffset: '80px',
                            scale: 1,
                            maxWidth: '400px',
                            // Configuración para laptops/pantallas bajas
                            responsive: {
                                xOffset: '10px',
                                yOffset: '0px',
                                scale: 0.8,
                                maxWidth: '300px'
                            }
                        }
                    }
                },

                // PANTALLA 9 - INFOGRAFIA 2
                {
                    type: "default-content",
                    hideBackground: true,
                    htmlFile: "assets/infografias/info-m1-2-int.html"
                },

                // PANTALLA 10 - REVISTA DIDACTICA 3
                {
                    type: "default-content",
                    htmlFile: "assets/revistas_didacticas/revista-didactica-m1-3.html",
                    GraphicResources: {
                        // Nuevas propiedades para logos del header
                        headerLogos: {
                            leftUrl: 'assets/img/titulos/titulo-blanco.png',
                            rightUrl: 'assets/img/logos/logo-icbf-blanco.png'
                        },
                        backgroundUrl: 'assets/img/fondos/fondo-tierra-seca.png',
                        backgroundConfig: {
                            size: 'cover',
                            position: 'center'
                        },
                        characterUrl: 'assets/img/personajes/niño-revista-3.png',
                        characterConfig: {
                            side: 'right',
                            xOffset: '50px',
                            yOffset: '80px',
                            scale: 1,
                            maxWidth: '600px',
                            // Configuración para laptops/pantallas bajas
                            responsive: {
                                xOffset: '50px',
                                yOffset: '0px',
                                scale: 1,
                                maxWidth: '400px'
                            }
                        }
                    }
                },
                // PANTALLA 11 - REVISTA DIDACTICA 4
                {
                    type: "default-content",
                    htmlFile: "assets/revistas_didacticas/revista-didactica-m1-4.html",
                    GraphicResources: {
                        // Nuevas propiedades para logos del header
                        headerLogos: {
                            leftUrl: 'assets/img/titulos/titulo-blanco.png',
                            rightUrl: 'assets/img/logos/logo-icbf-blanco.png'
                        },
                        backgroundUrl: 'assets/img/fondos/fondo-tierra-2.png',
                        backgroundConfig: {
                            size: 'cover',
                            position: 'center'
                        },
                        characterUrl: 'assets/img/personajes/niña-revista-4.png',
                        characterConfig: {
                            side: 'left',
                            xOffset: '50px',
                            yOffset: '40px',
                            scale: 0.8,
                            maxWidth: '450px',
                            // Configuración para laptops/pantallas bajas
                            responsive: {
                                xOffset: '50px',
                                yOffset: '40px',
                                scale: 0.7,
                                maxWidth: '400px'
                            }
                        }
                    }
                },

                // PANTALLA 12 - CASO DE ESTUDIO

                {
                    type: "default-content",
                    hideBackground: false,

                    htmlFile: "assets/actividades/estudio-casos-m1.html",
                    GraphicResources: {
                        backgroundUrl: 'assets/img/background-modulo-1.png',
                        backgroundConfig: {
                            size: 'cover',
                            position: 'center'
                        },
                    },
                },

                //PAGINA 13 - PÓDCAST
                {
                    type: "default-content",
                    hideBackground: false,

                    htmlFile: "assets/actividades/podcast.html",
                },

                    // PANTALLA 14 - CAJA DE HERRAMIENTAS
                {
                    type: "default-content",
                    hideBackground: true,

                    htmlFile: "assets/caja-herramientas/caja_de_herramientas.html"
                },
                {
                    type: "end-module",
                    moduleTitle: "Módulo 1",
                    introText: "El suelo y las raíces del ecosistema",
                    subText: "",
                    percentage: 20,
                },
            ]
        },
        {
            id:2,
            title: 'Modulo 2: PARTICIPACIÓN, PROTECCIÓN Y EJERCICIO DE LOS DERECHOS EN EL ÁMBITO PÚBLICO',
            screens: [
                {
                    type: "module-intro",
                    moduleTitle: "Módulo 2",
                    introText: "PARTICIPACIÓN, PROTECCIÓN Y EJERCICIO DE LOS DERECHOS EN EL ÁMBITO PÚBLICO\n",
                    subText: "El aire y el flujo vital",
                    percentage: 20,
                },
                {
                    type: "post-intro",
                    moduleTitle: "Módulo 2",
                    introText: "PARTICIPACIÓN, PROTECCIÓN Y EJERCICIO DE LOS DERECHOS EN EL ÁMBITO PÚBLICO",
                    subText: "El aire y el flujo vital",
                    topics: [
                        "Derechos civiles y políticoss",
                        "Mecanismos de protección",
                        "Mecanismos de participación ciudadana",
                        "Veedurías ciudadanas"
                    ],
                    percentage: 20
                },
                {
                    type: "default-content",
                    hideBackground: false,
                    htmlFile: "",
                    GraphicResources: {
                        backgroundUrl: 'assets/img/background-modulo-1.png',
                        backgroundConfig: {
                            size: 'cover',
                            position: 'center'
                        },
                    },
                    contentHtml: renderSlideshow({
                        slides: [
                            {
                                label: "Justificación",
                                title: "Derechos Humanos y DIH",
                                body: `
          <p>Proporciona a los participantes las herramientas necesarias para comprender y aplicar los derechos civiles y políticos, esenciales para la participación activa y el ejercicio pleno de los derechos. </p>
          <p>A través del estudio de los mecanismos de protección universales, regionales y nacionales, así como de los mecanismos de participación ciudadana, el módulo capacita a los participantes para promover una gestión pública transparente</p>
        `
                            },
                            {
                                label: "Objetivo general",
                                title: "Reconocimiento y orientación ética",
                                body: `
          <p>Reconocer los derechos civiles y políticos, los mecanismos universales, regionales y nacionales de protección y los mecanismos de participación ciudadana, para orientar la gestión pública transparente y la participación informada en la garantía de los derechos de niños, niñas y adolescentes.</p>
        `
                            },
                            {
                                label: "Objetivos específicos",
                                title: "Fundamentos e identificación de vulneraciones",
                                body: `
          <p>Identificar los derechos civiles y políticos y los principales mecanismos universales, regionales y nacionales de protección, para reconocer rutas institucionales de garantía y defensa de los derechos de niños, niñas y adolescentes.</p>
          <p>Analizar el funcionamiento y alcance de los mecanismos de participación ciudadana, para promover una gestión pública transparente y el ejercicio informado de los derechos, en los procesos institucionales relacionados con la protección integral de niños, niñas y adolescentes.</p>
          <p>Aplicar los mecanismos de protección y participación ciudadana a situaciones contextualizadas, para orientar decisiones y acciones coherentes con los derechos civiles y políticos, en escenarios reales o simulados vinculados a la labor del ICBF y la garantía de derechos en el ámbito público.</p>
        `
                            }
                        ]
                    })
                },

                {
                    type: "video",
                    title: "Video navegacion",
                    videoUrl: "",
                    characterName: "Ayla",
                    subtitle: "Conoce los objetivos del curso y los personajes que te acompañarán. En este módulo aprenderás las bases fundamentales sobre los ecosistemas de derechos de manera interactiva.",
                    characterLeft: "Ayla",
                    characterRight: "Simón",
                },
                {
                    type: "video",
                    title: "Video navegacion",
                    videoUrl: "",
                    characterName: "Ayla",
                    subtitle: "Conoce los objetivos del curso y los personajes que te acompañarán. En este módulo aprenderás las bases fundamentales sobre los ecosistemas de derechos de manera interactiva.",
                    characterLeft: "Ayla",
                    characterRight: "Simón",
                },

                {
                    type: "default-content",
                    hideBackground: false,

                    htmlFile: "assets/actividades/podcast.html",
                },



                // {
                //     type: "default-content",
                //     htmlFile: "assets/revistas_didacticas/revista-didactica-m2-1.html",
                //     GraphicResources: {
                //         // Nuevas propiedades para logos del header
                //         headerLogos: {
                //             leftUrl: 'assets/img/titulos/titulo-blanco.png',
                //             rightUrl: 'assets/img/logos/logo-icbf-blanco.png'
                //         },
                //         backgroundUrl: 'assets/img/fondos/fondo-tierra-seca.png',
                //         backgroundConfig: {
                //             size: 'cover',
                //             position: 'center'
                //         },
                //         characterUrl: 'assets/img/personajes/niña-revista-4.png',
                //         characterConfig: {
                //             side: 'left',
                //             xOffset: '50px',
                //             yOffset: '40px',
                //             scale: 0.8,
                //             maxWidth: '600px',
                //             // Configuración para laptops/pantallas bajas
                //             responsive: {
                //                 xOffset: '-30px',
                //                 yOffset: '-50px',
                //                 scale: 0.7,
                //                 maxWidth: '400px'
                //             }
                //         }
                //     }
                // },

            ]
        },


    ]
};
