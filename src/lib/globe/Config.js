/**
 * Config.js
 * ---------------------------------------------------------------------------
 * Single source of truth for every tunable used across the globe component.
 * Nothing below is hardcoded elsewhere — modules read from this object (or
 * from the instance-level override merged over it in main.js) so the whole
 * experience can be re-skinned/re-tuned without touching implementation code.
 */

export const defaultConfig = {
  // ---- Mount point -------------------------------------------------------
  container: '#globe',

  // ---- Data ---------------------------------------------------------------
  pins: [],
  dataUrl: null, // optional: if set, pins are fetched from this URL instead

  // ---- Globe geometry -----------------------------------------------------
  globeRadius: 1,
  atmosphereRadius: 1.04, // matches the reference's atmosphere.scale.setScalar(1.04)
  segments: 96,

  // ---- Rotation -------------------------------------------------------------
  autoRotate: true,
  rotationSpeed: 0.15, // globe revolutions "feel" unit, mapped to OrbitControls autoRotateSpeed
  autoRotateResumeDelay: 3000, // ms of inactivity before auto-rotate resumes

  // ---- Camera ---------------------------------------------------------------
  fov: 45,
  minDistance: 1.6,
  maxDistance: 6,
  defaultDistance: 3.1,
  enableZoom: true,

  // ---- Visual toggles ---------------------------------------------------
  showAtmosphere: true,
  showStars: true,
  showBloom: true,
  starCount: 8000,

  // ---- Theme --------------------------------------------------------------
  theme: 'dark', // 'dark' | 'light'

  // ---- Animation durations & easing (seconds, GSAP eases) ----------------
  animation: {
    // GSAP-flavored eases (used by Animation.js / CameraController / LeaderLine tweens)
    cardEnterDuration: 0.6,
    cardExitDuration: 0.4,
    cardEase: 'power3.out',
    lineDrawDuration: 0.5,
    lineEase: 'power2.inOut',
    focusDuration: 1.2,
    focusEase: 'power2.inOut',
    pulseDuration: 2.2,
    pulseEase: 'sine.inOut',
    hoverDuration: 0.25,
    hoverEase: 'power2.out',
    // CSS-flavored equivalents (GSAP ease names aren't valid CSS timing-functions) —
    // consumed as custom properties by globe.scss for the pure-CSS hover/active transitions.
    hoverEaseCss: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
    lineEaseCss: 'ease',
  },

  // ---- Card layout ---------------------------------------------------------
  card: {
    width: 240,
    height: 76, // matches .globe-card__inner's CSS height (globe.scss)
    radialOffset: 96, // px pushed outward from globe-edge projection along the pin's radial direction
    viewportPadding: 16,
    overlapPadding: 10,
  },

  // ---- Callbacks ------------------------------------------------------------
  onPinClick: null,
  onPinHover: null,
  onReady: null,
};

/** Deep-merges a partial user config over the defaults (one level of nested objects deep, which is all we need). */
export function resolveConfig(userConfig = {}) {
  const merged = { ...defaultConfig, ...userConfig };
  merged.animation = { ...defaultConfig.animation, ...(userConfig.animation || {}) };
  merged.card = { ...defaultConfig.card, ...(userConfig.card || {}) };
  return merged;
}
