/**
 * interaction-renderer.js
 *
 * Central dispatcher: maps a section "type" string from course config
 * to its render function and init function.
 *
 * To add a new component type:
 *   1. Create /js/components/my-component.js
 *   2. Import renderMyComponent and initMyComponent here
 *   3. Add an entry to REGISTRY below
 */

import { renderAccordion,        initAccordion        } from '../components/accordion.js';
import { renderCards,            initCards            } from '../components/cards.js';
import { renderCarousel,         initCarousel         } from '../components/carousel.js';
import { renderChecklist,        initChecklist        } from '../components/checklist.js';
import { renderComparisonTable,  initComparisonTable  } from '../components/comparison-table.js';
import { renderDragDrop,         initDragDrop         } from '../components/drag-drop.js';
import { renderHotspot,          initHotspot          } from '../components/hotspot.js';
import { renderMultipleChoice,   initMultipleChoice   } from '../components/multiple-choice.js';
import { renderTimeline,         initTimeline         } from '../components/timeline.js';
import { renderToolbox,          initToolbox,
         renderBibliography,     initBibliography     } from '../components/toolbox.js';
import { renderNarrativeScroll,  initNarrativeScroll  } from '../components/narrative-scroll.js';

const REGISTRY = {
  'accordion':        { render: renderAccordion,       init: initAccordion       },
  'reveal':           { render: renderAccordion,       init: initAccordion       }, // alias
  'cards':            { render: renderCards,            init: initCards           },
  'carousel':         { render: renderCarousel,         init: initCarousel        },
  'slider':           { render: renderCarousel,         init: initCarousel        }, // alias
  'checklist':        { render: renderChecklist,        init: initChecklist       },
  'comparison-table': { render: renderComparisonTable,  init: initComparisonTable },
  'drag-drop':        { render: renderDragDrop,         init: initDragDrop        },
  'hotspot':          { render: renderHotspot,          init: initHotspot         },
  'multiple-choice':  { render: renderMultipleChoice,   init: initMultipleChoice  },
  'timeline':         { render: renderTimeline,         init: initTimeline        },
  'toolbox':          { render: renderToolbox,          init: initToolbox         },
  'bibliography':     { render: renderBibliography,     init: initBibliography    },
  'narrative-scroll': { render: renderNarrativeScroll,  init: initNarrativeScroll },
};

/**
 * Render a single section into HTML string
 * @param {object} section  - section config object from course JSON
 * @param {number} sectionIndex
 * @returns {string} HTML string
 */
export function renderSection(section, sectionIndex = 0) {
  const entry = REGISTRY[section.type];
  if (!entry) {
    return `<div style="padding:16px;color:#c00;border:1px solid #f00;border-radius:8px;">
      Tipo de seccion desconocido: <strong>${section.type}</strong>
    </div>`;
  }
  return entry.render(section.data || section, sectionIndex);
}

/**
 * Initialise all interactive sections inside a DOM container.
 * Called after the HTML has been injected into the page.
 * @param {HTMLElement} container
 */
export function initSections(container) {
  // Run all init functions — each one queries for its own elements
  Object.values(REGISTRY).forEach(({ init }) => {
    try { init(container); } catch (e) { /* ignore if no elements present */ }
  });
}
