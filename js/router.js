/**
 * router.js
 *
 * Builds a flat list of "routes" from the course config,
 * where each route is either:
 *   - a module cover  (type: 'cover')
 *   - a section page  (type: 'section', has sections[] array)
 *   - a legacy HTML page (type: 'html', has file path)
 *
 * This keeps app.js clean and makes the course config the
 * single source of truth for navigation order.
 */

import { course } from './course.config.js';

let routes = [];

/**
 * Build the routes array from course config.
 * Called once on init.
 */
export function buildRoutes() {
  routes = [];

  course.modules.forEach((mod, modIdx) => {
    // Module cover (optional – only if module has description or highlights)
    if (mod.showCover !== false) {
      routes.push({
        type: 'cover',
        moduleIndex: modIdx,
        module: mod,
        title: mod.title,
        globalIndex: routes.length,
      });
    }

    // Pages inside the module
    (mod.pages || []).forEach((page, pageIdx) => {
      routes.push({
        type: page.file ? 'html' : 'section',
        moduleIndex: modIdx,
        pageIndex: pageIdx,
        module: mod,
        page,
        title: page.title,
        globalIndex: routes.length,
      });
    });
  });

  return routes;
}

export function getRoutes() { return routes; }

export function getRoute(index) { return routes[index] || null; }

export function getTotalRoutes() { return routes.length; }

export function getCourseTitle() { return course.title; }

export function getCourseConfig() { return course; }
