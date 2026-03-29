/**
 * screen-base.js
 * 
 * Base class for all reusable screen types.
 * Each screen handles its own rendering and interactivity.
 * Progress bar + nav pill are managed by app.js globally.
 */

export class Screen {
  constructor(config = {}) {
    this.config = config;
    this.el = null;
  }

  /**
   * render() - Returns HTML string for this screen
   * Override in subclasses
   */
  render() {
    return '<div class="screen">Screen not implemented</div>';
  }

  /**
   * mount(container) - Inject HTML into container and initialize interactivity
   */
  mount(container) {
    this.el = container;
    this.el.innerHTML = this.render();
    this.init();
  }

  /**
   * init() - Wire up event listeners and initialize components
   * Override in subclasses
   */
  init() {}

  /**
   * destroy() - Clean up event listeners before unmounting
   * Override if needed
   */
  destroy() {}
}

/**
 * Helper: Safely parse JSON from data attribute or return default
 */
export function parseDataAttr(el, attr, defaultVal = null) {
  const val = el.getAttribute(`data-${attr}`);
  if (!val) return defaultVal;
  try {
    return JSON.parse(val);
  } catch {
    console.warn(`[screens] Failed to parse data-${attr}:`, val);
    return defaultVal;
  }
}
