/**
 * PinManager.js
 * ---------------------------------------------------------------------------
 * Builds glowing location pins from JSON data, drives their forever-pulsing
 * glow animation, and handles raycasting for hover/click. Pin visuals
 * (sprites) get correct globe occlusion for free from the WebGL depth
 * buffer; interaction hit-testing additionally checks against the Earth
 * mesh so you can't click "through" the globe onto a far-side pin.
 */
import * as THREE from 'three';
import { latLngToVector3, createEmitter } from './Utils.js';

let sharedTextures = null;
function getSharedTextures() {
  if (sharedTextures) return sharedTextures;

  const makeCanvas = (size) => {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    return c;
  };

  // Soft outer glow (additive)
  const glowCanvas = makeCanvas(128);
  {
    const ctx = glowCanvas.getContext('2d');
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, 'rgba(255,255,255,0.85)');
    g.addColorStop(0.3, 'rgba(150,200,255,0.35)');
    g.addColorStop(1, 'rgba(120,180,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
  }

  // Crisp white core dot
  const coreCanvas = makeCanvas(64);
  {
    const ctx = coreCanvas.getContext('2d');
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.55, 'rgba(255,255,255,0.95)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
  }

  // Pulse ring (soft stroked circle)
  const ringCanvas = makeCanvas(128);
  {
    const ctx = ringCanvas.getContext('2d');
    ctx.strokeStyle = 'rgba(255,255,255,0.9)';
    ctx.lineWidth = 5;
    ctx.shadowColor = 'rgba(255,255,255,0.9)';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(64, 64, 52, 0, Math.PI * 2);
    ctx.stroke();
  }

  sharedTextures = {
    glow: new THREE.CanvasTexture(glowCanvas),
    core: new THREE.CanvasTexture(coreCanvas),
    ring: new THREE.CanvasTexture(ringCanvas),
  };
  return sharedTextures;
}

export class PinManager {
  constructor({ scene, camera, domElement, earthMesh, config, animationManager }) {
    this.scene = scene;
    this.camera = camera;
    this.domElement = domElement;
    this.earthMesh = earthMesh;
    this.config = config;
    this.anim = animationManager;
    this.emitter = createEmitter();

    this.pins = [];
    this.hoveredId = null;
    this.activeId = null;

    this.raycaster = new THREE.Raycaster();
    this._pointer = new THREE.Vector2();
    this._pointerDown = null;

    this._onPointerMove = this._onPointerMove.bind(this);
    this._onPointerDown = this._onPointerDown.bind(this);
    this._onPointerUp = this._onPointerUp.bind(this);
    domElement.addEventListener('pointermove', this._onPointerMove);
    domElement.addEventListener('pointerdown', this._onPointerDown);
    domElement.addEventListener('pointerup', this._onPointerUp);
  }

  on(event, cb) {
    return this.emitter.on(event, cb);
  }

  build(locations, parentGroup) {
    const textures = getSharedTextures();
    const radius = this.config.globeRadius;

    this.pins = locations.map((loc) => {
      const position = latLngToVector3(loc.lat, loc.lng, radius * 1.001);
      const surfaceNormal = position.clone().normalize();

      const group = new THREE.Group();
      group.position.copy(position);
      group.lookAt(position.clone().add(surfaceNormal));

      const core = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: textures.core, color: 0xffffff, depthWrite: false, transparent: true })
      );
      core.scale.setScalar(0.028);

      const glow = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: textures.glow,
          color: 0x8fc4ff,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          transparent: true,
        })
      );
      glow.scale.setScalar(0.09);

      const ring = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: textures.ring,
          color: 0xffffff,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          transparent: true,
          opacity: 0.55,
        })
      );
      ring.scale.setScalar(0.045);

      // Larger, invisible sprite purely for comfortable raycast hit-testing (touch-friendly).
      const hitMesh = new THREE.Sprite(new THREE.SpriteMaterial({ visible: false }));
      hitMesh.scale.setScalar(0.16);

      group.add(glow, core, ring, hitMesh);
      parentGroup.add(group);

      // Forever pulse: ring expands + fades, loops indefinitely.
      const pulseTween = this.anim.pulse(ring.scale, { x: 0.11, y: 0.11, z: 0.11 });
      const pulseOpacity = this.anim.pulse(ring.material, { opacity: 0 });

      const pin = {
        ...loc,
        position,
        surfaceNormal,
        group,
        core,
        glow,
        ring,
        hitMesh,
        pulseTween,
        pulseOpacity,
        baseGlowScale: 0.09,
        baseCoreScale: 0.028,
      };
      hitMesh.userData.pin = pin;
      return pin;
    });

    return this.pins;
  }

  getPin(id) {
    return this.pins.find((p) => p.id === id);
  }

  setHover(id, { emit = true } = {}) {
    if (this.hoveredId === id) return;
    this.hoveredId = id;
    this.pins.forEach((pin) => this._applyState(pin));
    this.domElement.style.cursor = id != null ? 'pointer' : '';
    if (emit) this.emitter.emit('hover', id);
  }

  setActive(id, { emit = true } = {}) {
    if (this.activeId === id) return;
    this.activeId = id;
    this.pins.forEach((pin) => this._applyState(pin));
    if (emit) this.emitter.emit('active', id);
  }

  _applyState(pin) {
    const isHover = pin.id === this.hoveredId;
    const isActive = pin.id === this.activeId;
    const boost = isActive ? 1.5 : isHover ? 1.25 : 1;
    this.anim.to(pin.core.scale, { x: pin.baseCoreScale * boost, y: pin.baseCoreScale * boost, z: pin.baseCoreScale * boost }, 'hoverDuration', 'hoverEase');
    this.anim.to(pin.glow.scale, { x: pin.baseGlowScale * boost, y: pin.baseGlowScale * boost, z: pin.baseGlowScale * boost }, 'hoverDuration', 'hoverEase');
    this.anim.to(pin.glow.material, { opacity: isActive || isHover ? 1 : 0.85 }, 'hoverDuration', 'hoverEase');
  }

  /** Raycasts pointer against pins + the Earth mesh; returns the nearest hit pin (if any and unoccluded). */
  _pick(event) {
    const rect = this.domElement.getBoundingClientRect();
    this._pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this._pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this._pointer, this.camera);
    const targets = [this.earthMesh, ...this.pins.map((p) => p.hitMesh)];
    const hits = this.raycaster.intersectObjects(targets, false);
    const nearest = hits[0];
    if (!nearest || nearest.object === this.earthMesh) return null;
    return nearest.object.userData.pin || null;
  }

  _onPointerMove(event) {
    const pin = this._pick(event);
    const id = pin ? pin.id : null;
    if (id !== this.hoveredId) {
      this.setHover(id);
      if (this.config.onPinHover) this.config.onPinHover(pin);
    }
  }

  _onPointerDown(event) {
    this._pointerDown = { x: event.clientX, y: event.clientY, time: performance.now() };
  }

  _onPointerUp(event) {
    if (!this._pointerDown) return;
    const dx = event.clientX - this._pointerDown.x;
    const dy = event.clientY - this._pointerDown.y;
    const dt = performance.now() - this._pointerDown.time;
    this._pointerDown = null;
    // Only treat as a "click" if it wasn't a drag-rotate gesture.
    if (Math.hypot(dx, dy) > 6 || dt > 500) return;

    const pin = this._pick(event);
    if (!pin) return;
    this.setActive(pin.id);
    if (this.config.onPinClick) this.config.onPinClick(pin);
    this.emitter.emit('click', pin);
  }

  dispose() {
    this.domElement.removeEventListener('pointermove', this._onPointerMove);
    this.domElement.removeEventListener('pointerdown', this._onPointerDown);
    this.domElement.removeEventListener('pointerup', this._onPointerUp);
    this.pins.forEach((pin) => {
      this.anim.killTweensOf(pin.ring.scale);
      this.anim.killTweensOf(pin.ring.material);
    });
  }
}
