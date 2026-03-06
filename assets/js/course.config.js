/**
 * ==========================================================
 *  COURSE.CONFIG.JS
 *  Configuración central del curso
 *
 *  INSTRUCCIONES PARA EL EQUIPO:
 *  
 *  Para agregar una nueva página:
 *  1. Crear el archivo HTML en /assets/pages/
 *  2. Agregar la entrada en este archivo bajo el módulo correspondiente
 *
 *  Para agregar un nuevo módulo:
 *  1. Agregar un nuevo objeto en el array "modules"
 *  2. Incluir las páginas del módulo en el array "pages"
 * ==========================================================
 */

console.log("[v0] course.config.js cargado");

export const course = {
    // Título del curso (aparece en el header)
    title: "Ley 1257: No violencia contra la mujer",

    // Estructura de módulos y páginas
    modules: [
        {
            title: "Introducción",
            pages: [
                {
                    title: "Inicio y Generalidades",
                    file: "assets/pages/intro.html"
                }
            ]
        },
        {
            title: "Módulo 1: Conceptos",
            pages: [
                {
                    title: "Conceptos básicos",
                    file: "assets/pages/module1.html"
                },
                {
                    title: "Violencia psicológica",
                    file: "assets/pages/module2.html"
                }
            ]
        }
    ]
};
