export const INTRO_SEEN_KEY = "mpw-intro-seen"

/**
 * Inline script (runs before first paint) that marks <html data-intro-seen>
 * when the intro was already shown this session or the user prefers reduced
 * motion, so the CSS can hide the loader without a flash.
 */
export const INTRO_GATE_SCRIPT = `try{if(matchMedia("(prefers-reduced-motion: reduce)").matches||sessionStorage.getItem("${INTRO_SEEN_KEY}"))document.documentElement.dataset.introSeen="1"}catch(e){}`
