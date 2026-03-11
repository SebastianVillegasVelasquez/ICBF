/**
 * router.js
 *
 * Builds a flat list of "routes" from course.config.js.
 *
 * ROUTE TYPES:
 *   - 'cover'  : Auto-generated module cover screen (no HTML file needed).
 *                Shown when a module has showCover: true.
 *   - 'page'   : A real HTML file fetched from disk via page.file.
 *                All content pages are this type now.
 *
 * The router no longer handles JSON-driven "section" types.
 * Content lives entirely in HTML files under /pages/.
 *
 * TEAM NOTE:
 *   To add a page, just add { title, file } to a module's pages[]
 *   in course.config.js. No changes here needed.
 */

import { course } from './course.config.js';

let routes = [];

/**
 * buildRoutes()
 * Called once at startup. Flattens the course config into an ordered
 * array of route objects that app.js can navigate through by index.
 */
export function buildRoutes() {
  routes = [];

  course.modules.forEach((mod, modIdx) => {

    // Optional module cover — shown before the module's pages
    if (mod.showCover !== false) {
      routes.push({
        type: 'cover',
        moduleIndex: modIdx,
        module: mod,
        title: mod.title,
      });
    }

    // Each page inside the module becomes a 'page' route.
    // app.js will fetch page.file and inject it into the content area.
    (mod.pages || []).forEach((page) => {
      routes.push({
        type: 'page',        // always 'page' — content comes from an HTML file
        moduleIndex: modIdx,
        module: mod,
        page,                // { title, file }
        title: page.title,
      });
    });

  });

  return routes;
}

// ── Accessors ──────────────────────────────────────────────
export function getRoutes()       { return routes; }
export function getRoute(index)   { return routes[index] || null; }
export function getTotalRoutes()  { return routes.length; }
export function getCourseTitle()  { return course.title; }
export function getCourseConfig() { return course; }
