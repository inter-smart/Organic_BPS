/**
 * Utils.js
 * ---------------------------------------------------------------------------
 * Small, dependency-light math/DOM helpers shared across modules. Nothing in
 * here holds state — every function is pure given its inputs.
 */
import * as THREE from 'three';

/**
 * Converts geographic latitude/longitude (degrees) into a position on a
 * sphere of the given radius, in Three.js's Y-up world space.
 */
export function latLngToVector3(lat, lng, radius, target = new THREE.Vector3()) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  target.x = -radius * Math.sin(phi) * Math.cos(theta);
  target.y = radius * Math.cos(phi);
  target.z = radius * Math.sin(phi) * Math.sin(theta);
  return target;
}

/** Projects a world-space Vector3 to CSS pixel coordinates within a container of the given size. */
export function projectToScreen(worldPos, camera, width, height, target = { x: 0, y: 0 }) {
  const ndc = worldPos.clone().project(camera);
  target.x = (ndc.x * 0.5 + 0.5) * width;
  target.y = (-ndc.y * 0.5 + 0.5) * height;
  target.z = ndc.z; // depth, useful for front/behind-camera checks
  return target;
}

/** Smooth Hermite interpolation between edge0 and edge1, clamped to [0, 1]. */
export function smoothstep(edge0, edge1, x) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/**
 * Visibility factor (0..1) for a point on the globe's surface: 1.0 when it
 * faces the camera dead-on, smoothly fading to 0 as it approaches the limb
 * (grazing edge) and behind. Computed from the true surface normal and the
 * camera direction — not a fake screen-space guess.
 */
export function surfaceVisibility(surfaceNormal, cameraPosition, globeCenter, fadeStart = 0.28, fadeEnd = -0.05) {
  const viewDir = new THREE.Vector3().subVectors(cameraPosition, globeCenter).normalize();
  const facing = surfaceNormal.dot(viewDir);
  return smoothstep(fadeEnd, fadeStart, facing);
}

/** Axis-aligned rectangle overlap test, with optional padding applied to `a`. */
export function rectsOverlap(a, b, padding = 0) {
  return !(
    a.x + a.width + padding < b.x ||
    b.x + b.width + padding < a.x ||
    a.y + a.height + padding < b.y ||
    b.y + b.height + padding < a.y
  );
}

/** Clamps a rectangle {x,y,width,height} so it stays fully inside [0,0,boundsW,boundsH] minus padding. */
export function clampRectToViewport(rect, boundsW, boundsH, padding = 16) {
  const x = Math.min(Math.max(rect.x, padding), boundsW - rect.width - padding);
  const y = Math.min(Math.max(rect.y, padding), boundsH - rect.height - padding);
  return { ...rect, x, y };
}

/** Normalizes a 2D vector, returning {x:0,y:-1} as a safe fallback for a zero-length input. */
export function normalize2D(x, y) {
  const len = Math.hypot(x, y);
  if (len < 1e-6) return { x: 0, y: -1 };
  return { x: x / len, y: y / len };
}

/**
 * Spherical linear interpolation between two unit-length direction vectors.
 * Used to arc the camera over the globe's surface (rather than cutting a
 * straight chord through it) when focusing on a location.
 */
export function slerpVectors(v0, v1, t, target = new THREE.Vector3()) {
  const dot = Math.min(1, Math.max(-1, v0.dot(v1)));
  const theta = Math.acos(dot) * t;
  const relative = v1.clone().addScaledVector(v0, -dot).normalize();
  return target
    .copy(v0)
    .multiplyScalar(Math.cos(theta))
    .addScaledVector(relative, Math.sin(theta));
}

/** Minimal dependency-free pub/sub used for cross-module wiring (pin↔card hover/click sync). */
export function createEmitter() {
  const listeners = new Map();
  return {
    on(event, cb) {
      if (!listeners.has(event)) listeners.set(event, new Set());
      listeners.get(event).add(cb);
      return () => listeners.get(event)?.delete(cb);
    },
    emit(event, ...args) {
      listeners.get(event)?.forEach((cb) => cb(...args));
    },
  };
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** requestAnimationFrame-based debounce for "resume after N ms of inactivity" timers. */
export function createInactivityTimer(delayMs, onFire) {
  let handle = null;
  return {
    reset() {
      if (handle) clearTimeout(handle);
      handle = setTimeout(onFire, delayMs);
    },
    cancel() {
      if (handle) clearTimeout(handle);
      handle = null;
    },
  };
}
