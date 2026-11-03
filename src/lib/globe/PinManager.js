/**
 * PinManager.js
 * ---------------------------------------------------------------------------
 * Builds glowing location pins from JSON data, drives their forever-pulsing
 * glow animation, and handles raycasting for hover/click. Pin visuals
 * (sprites) get correct globe occlusion for free from the WebGL depth
 * buffer; interaction hit-testing additionally checks against the Earth
 * mesh so you can't click "through" the globe onto a far-side pin.
 */
import * as THREE from "three";
import { latLngToVector3, createEmitter } from "./Utils.js";

let sharedTextures = null;
// Bust the texture cache on HMR so new canvas drawings always take effect
if (typeof module !== "undefined" && module.hot)
  module.hot.dispose(() => {
    sharedTextures = null;
  });
function getSharedTextures() {
  if (sharedTextures) return sharedTextures;

  const makeCanvas = (size) => {
    const c = document.createElement("canvas");
    c.width = c.height = size;
    return c;
  };

  // Combined pin texture: grey halo disc drawn first, red dot on top — single canvas = no z-order issues
  const pinCanvas = makeCanvas(256);
  {
    const ctx = pinCanvas.getContext("2d");
    const cx = 128,
      cy = 128;

    ctx.beginPath();
    ctx.arc(cx, cy, 100, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(95,105,110,0.2)";
    ctx.fill();
    // thin lighter border stroke
    ctx.beginPath();
    ctx.arc(cx, cy, 100, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(180,192,196,0)";
    ctx.lineWidth = 4;
    ctx.stroke();

    // --- Layer 2: red solid dot, exact design color #DA4D47, fully opaque ---
    const dotR = 40;
    ctx.beginPath();
    ctx.arc(cx, cy, dotR, 0, Math.PI * 2);
    ctx.fillStyle = "#DA4D47";
    ctx.fill();
  }
  // Pulse ring: soft red stroked circle for the expanding pulse
  const ringCanvas = makeCanvas(256);
  {
    const ctx = ringCanvas.getContext("2d");
    ctx.strokeStyle = "rgba(218,77,71,1)";
    ctx.lineWidth = 6;
    ctx.shadowColor = "rgba(218,77,71,1)";
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(128, 128, 110, 0, Math.PI * 2);
    ctx.stroke();
  }

  sharedTextures = {
    pin: new THREE.CanvasTexture(pinCanvas), // combined halo+dot
    ring: new THREE.CanvasTexture(ringCanvas),
  };
  return sharedTextures;
}

export class PinManager {
  constructor({
    scene,
    camera,
    domElement,
    earthMesh,
    config,
    animationManager,
  }) {
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
    domElement.addEventListener("pointermove", this._onPointerMove);
    domElement.addEventListener("pointerdown", this._onPointerDown);
    domElement.addEventListener("pointerup", this._onPointerUp);
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

      const pinSprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: textures.pin,
          color: 0xffffff,
          depthWrite: false,
          transparent: true,
          depthTest: false,
        }),
      );
      pinSprite.renderOrder = 10;
      pinSprite.scale.setScalar(0.09);
      const core = pinSprite;
      const glow = pinSprite;

      const ring = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: textures.ring,
          color: 0xffffff,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          transparent: true,
          opacity: 0.6,
          depthTest: false,
        }),
      );
      ring.renderOrder = 5;
      ring.scale.setScalar(0.13);
      ring.visible = false;

      const hitMesh = new THREE.Sprite(
        new THREE.SpriteMaterial({ visible: false }),
      );
      hitMesh.scale.setScalar(0.16);

      group.add(pinSprite, ring, hitMesh);
      parentGroup.add(group);

      const pulseTween = this.anim.pulse(ring.scale, {
        x: 0.16,
        y: 0.16,
        z: 0.16,
      });
      const pulseOpacity = this.anim.pulse(ring.material, { opacity: 0 });

      const pin = {
        ...loc,
        position,
        surfaceNormal,
        group,
        core: pinSprite,
        glow: pinSprite,
        ring,
        hitMesh,
        pulseTween,
        pulseOpacity,
        baseGlowScale: 0.09,
        baseCoreScale: 0.09,
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
    this.domElement.style.cursor = id != null ? "pointer" : "";
    if (emit) this.emitter.emit("hover", id);
  }

  setActive(id, { emit = true } = {}) {
    if (this.activeId === id) return;
    this.activeId = id;
    this.pins.forEach((pin) => this._applyState(pin));
    if (emit) this.emitter.emit("active", id);
  }

  _applyState(pin) {
    const isHover = pin.id === this.hoveredId;
    const isActive = pin.id === this.activeId;
    const boost = isActive ? 1.5 : isHover ? 1.25 : 1;
    this.anim.to(
      pin.core.scale,
      {
        x: pin.baseCoreScale * boost,
        y: pin.baseCoreScale * boost,
        z: pin.baseCoreScale * boost,
      },
      "hoverDuration",
      "hoverEase",
    );
  }

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
    this._pointerDown = {
      x: event.clientX,
      y: event.clientY,
      time: performance.now(),
    };
  }

  _onPointerUp(event) {
    if (!this._pointerDown) return;
    const dx = event.clientX - this._pointerDown.x;
    const dy = event.clientY - this._pointerDown.y;
    const dt = performance.now() - this._pointerDown.time;
    this._pointerDown = null;
    if (Math.hypot(dx, dy) > 6 || dt > 500) return;

    const pin = this._pick(event);
    if (!pin) return;
    this.setActive(pin.id);
    if (this.config.onPinClick) this.config.onPinClick(pin);
    this.emitter.emit("click", pin);
  }

  dispose() {
    this.domElement.removeEventListener("pointermove", this._onPointerMove);
    this.domElement.removeEventListener("pointerdown", this._onPointerDown);
    this.domElement.removeEventListener("pointerup", this._onPointerUp);
    this.pins.forEach((pin) => {
      this.anim.killTweensOf(pin.ring.scale);
      this.anim.killTweensOf(pin.ring.material);
    });
  }
}
