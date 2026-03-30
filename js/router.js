/**
 * router.js
 *
 * Builds a flat list of routes from course.config.js.
 *
 * SCREEN TYPES (defined per-page in course.config.js):
 *   - 'welcome'  : Pantalla de bienvenida al módulo/curso.
 *   - 'video'    : Pantalla con un reproductor de video.
 *   - 'content'  : Plantilla genérica — contiene uno o más componentes.
 *
 * Para agregar una pantalla nueva al curso, solo edita course.config.js.
 * No se necesitan cambios aquí.
 */

import { course } from './course.config.js';

let routes = [];

export function buildRoutes() {
  routes = [];

  course.modules.forEach((mod, modIdx) => {
    (mod.screens || []).forEach((screen) => {
      routes.push({
        ...screen,          // type, title, + cualquier config propia
        moduleIndex: modIdx,
        module: mod,
      });
    });
  });

  return routes;
}

export function getRoutes()       { return routes; }
export function getRoute(index)   { return routes[index] || null; }
export function getTotalRoutes()  { return routes.length; }
export function getCourseTitle()  { return course.title; }
export function getCourseConfig() { return course; }
