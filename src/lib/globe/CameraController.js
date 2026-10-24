/**
 * CameraController.js
 * ---------------------------------------------------------------------------
 * Wraps OrbitControls with the constraints and behaviour the spec calls for:
 * damped drag/zoom/pinch with momentum, no panning, a clamped polar angle so
 * the globe never flips upside-down, auto-rotate that pauses on interaction
 * and resumes after a configurable idle delay, and a smooth "focus camera on
 * this lat/lng" animation used when a pin becomes active.
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'gsap';
import { latLngToVector3, slerpVectors, createInactivityTimer, prefersReducedMotion } from './Utils.js';

export class CameraController {
  constructor(camera, domElement, config) {
    this.camera = camera;
    this.config = config;
    this.reducedMotion = prefersReducedMotion();

    const controls = new OrbitControls(camera, domElement);
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.rotateSpeed = 0.55;
    controls.zoomSpeed = 0.7;
    controls.enableZoom = config.enableZoom;
    // one finger spins the globe, two fingers pinch-zoom and twist it
    controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_ROTATE };
    controls.minDistance = config.minDistance;
    controls.maxDistance = config.maxDistance;
    // Keep the globe "upright": never orbit far enough to look through the poles.
    controls.minPolarAngle = Math.PI * 0.12;
    controls.maxPolarAngle = Math.PI * 0.88;
    controls.autoRotate = config.autoRotate && !this.reducedMotion;
    controls.autoRotateSpeed = config.rotationSpeed;
    this.controls = controls;

    this._focusTween = null;
    this._resumeTimer = createInactivityTimer(config.autoRotateResumeDelay, () => {
      if (config.autoRotate && !this.reducedMotion && !this._focusTween) controls.autoRotate = true;
    });

    controls.addEventListener('start', () => {
      controls.autoRotate = false;
      this._resumeTimer.cancel();
    });
    controls.addEventListener('end', () => {
      this._resumeTimer.reset();
    });
  }

  update() {
    this.controls.update();
  }

  /** Smoothly arcs the camera to look squarely at the given lat/lng, keeping the current distance. */
  focusOn(lat, lng) {
    const distance = this.camera.position.length();
    const startDir = this.camera.position.clone().normalize();
    const endDir = latLngToVector3(lat, lng, 1).normalize();

    this.controls.autoRotate = false;
    this._resumeTimer.cancel();
    if (this._focusTween) this._focusTween.kill();

    const proxy = { t: 0 };
    this._focusTween = gsap.to(proxy, {
      t: 1,
      duration: this.reducedMotion ? 0.01 : this.config.animation.focusDuration,
      ease: this.config.animation.focusEase,
      onUpdate: () => {
        const dir = slerpVectors(startDir, endDir, proxy.t);
        this.camera.position.copy(dir.multiplyScalar(distance));
      },
      onComplete: () => {
        this._focusTween = null;
        this._resumeTimer.reset();
      },
    });
  }

  dispose() {
    this._resumeTimer.cancel();
    if (this._focusTween) this._focusTween.kill();
    this.controls.dispose();
  }
}
