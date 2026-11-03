/**
 * CardManager.js
 * ---------------------------------------------------------------------------
 * Builds one glassmorphic floating card per pin and repositions all of them
 * every frame from the pins' projected 3D→2D screen coordinates. Each card
 * is anchored via a real CSS2DObject (so text stays crisp at any zoom and
 * we get automatic frustum-based hide as a bonus), then pushed outward from
 * the globe's screen-space center along the pin's own radial direction,
 * de-conflicted against already-placed cards, and clamped to the viewport.
 *
 * Visibility is never faked: opacity is driven continuously by the same
 * camera-direction/surface-normal dot-product used everywhere else in the
 * component, smoothstepped so cards fade rather than pop as their pin
 * rotates behind the globe.
 */
import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import {
  projectToScreen,
  surfaceVisibility,
  rectsOverlap,
  clampRectToViewport,
  normalize2D,
  createEmitter,
} from "./Utils.js";

const CHEVRON_SVG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>';

const escapeHtml = (s = "") =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );

export class CardManager {
  constructor({ container, camera, config, leaderLine }) {
    this.container = container;
    this.camera = camera;
    this.config = config;
    this.leaderLine = leaderLine;
    this.emitter = createEmitter();

    this.entries = new Map();
    this._anchorTmp = { x: 0, y: 0 };
    this._centerTmp = { x: 0, y: 0 };
    this._worldTmp = new THREE.Vector3();
    this._globeCenter = new THREE.Vector3(0, 0, 0);
  }

  on(event, cb) {
    return this.emitter.on(event, cb);
  }

  build(pins, icons) {
    pins.forEach((pin, index) => {
      const wrapper = document.createElement("div");
      wrapper.className = "pin-anchor";
      const anchorObj = new CSS2DObject(wrapper);
      anchorObj.position.set(0, 0, 0);
      pin.group.add(anchorObj);

      const el = document.createElement("div");
      el.className = "globe-card";
      const title = escapeHtml(pin.title);
      const subtitle = escapeHtml(pin.subtitle);
      el.innerHTML = `
        <div class="globe-card__inner" tabindex="0" role="button" aria-label="${title}: ${subtitle}">
          <span class="globe-card__icon">${icons[pin.icon] || ""}</span>
          <span class="globe-card__text">
            <span class="globe-card__title">${title}</span>
            <span class="globe-card__subtitle">${subtitle}</span>
          </span>
          <span class="globe-card__chevron" aria-hidden="true">${CHEVRON_SVG}</span>
        </div>
      `;
      wrapper.appendChild(el);
      const inner = el.querySelector(".globe-card__inner");

      const emitHover = (id) => this.emitter.emit("hover", id);
      inner.addEventListener("mouseenter", () => emitHover(pin.id));
      inner.addEventListener("mouseleave", () => emitHover(null));
      inner.addEventListener("focus", () => emitHover(pin.id));
      inner.addEventListener("blur", () => emitHover(null));
      inner.addEventListener("click", () => this.emitter.emit("click", pin));
      inner.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.emitter.emit("click", pin);
        }
      });

      this.entries.set(pin.id, {
        pin,
        wrapper,
        el,
        inner,
        order: index,
        everVisible: false,
      });
    });
  }

  setHover(id) {
    this.entries.forEach((entry) =>
      entry.el.classList.toggle("is-hover", entry.pin.id === id),
    );
  }

  setActive(id) {
    this.entries.forEach((entry) =>
      entry.el.classList.toggle("is-active", entry.pin.id === id),
    );
  }

  /** Called every frame from the shared render loop. */
  update(cameraPosition) {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (!width || !height) return;

    const centerScreen = projectToScreen(
      this._globeCenter,
      this.camera,
      width,
      height,
      this._centerTmp,
    );
    const placedRects = [];
    const cfg = this.config.card;

    const ordered = [...this.entries.values()].sort(
      (a, b) => a.order - b.order,
    );

    for (const entry of ordered) {
      const { pin, el, wrapper } = entry;
      const worldPos = pin.group.getWorldPosition(this._worldTmp);
      const anchorScreen = projectToScreen(
        worldPos,
        this.camera,
        width,
        height,
        this._anchorTmp,
      );
      const behindCamera = anchorScreen.z > 1;
      const cssCulled = wrapper.style.display === "none";

      let visibility =
        behindCamera || cssCulled
          ? 0
          : surfaceVisibility(
              pin.surfaceNormal,
              cameraPosition,
              this._globeCenter,
            );

      if (visibility <= 0.015) {
        el.style.opacity = "0";
        el.style.pointerEvents = "none";
        el.tabIndex = -1;
        this.leaderLine.update(
          pin.id,
          anchorScreen.x,
          anchorScreen.y,
          anchorScreen.x,
          anchorScreen.y,
          0,
        );
        continue;
      }

      const dir = normalize2D(
        anchorScreen.x - centerScreen.x,
        anchorScreen.y - centerScreen.y,
      );
      const point = {
        x: anchorScreen.x + dir.x * cfg.radialOffset,
        y: anchorScreen.y + dir.y * cfg.radialOffset,
      };
      let rect = {
        x: dir.x >= 0 ? point.x : point.x - cfg.width,
        y: dir.y >= 0 ? point.y : point.y - cfg.height,
        width: cfg.width,
        height: cfg.height,
      };

      let attempts = 0;
      while (
        attempts < 6 &&
        placedRects.some((r) => rectsOverlap(rect, r, cfg.overlapPadding))
      ) {
        attempts += 1;
        const push = cfg.radialOffset + attempts * 46;
        const p2 = {
          x: anchorScreen.x + dir.x * push,
          y: anchorScreen.y + dir.y * push,
        };
        rect = {
          x: dir.x >= 0 ? p2.x : p2.x - cfg.width,
          y: dir.y >= 0 ? p2.y : p2.y - cfg.height,
          width: cfg.width,
          height: cfg.height,
        };
      }

      rect = clampRectToViewport(rect, width, height, cfg.viewportPadding);
      placedRects.push(rect);

      // Entrance motion (fade + rise + scale) is derived straight from the same
      // continuous visibility factor — no separate one-shot tween needed, and
      // it can never desync from the occlusion state driving opacity.
      const lift = (1 - visibility) * 14;
      const scale = 0.94 + 0.06 * visibility;
      const dx = rect.x - anchorScreen.x;
      const dy = rect.y - anchorScreen.y;

      el.style.opacity = String(visibility);
      el.style.transform = `translate(${dx}px, ${dy}px) translateY(${lift}px) scale(${scale})`;
      const interactive = visibility > 0.5;
      el.style.pointerEvents = interactive ? "auto" : "none";
      el.tabIndex = -1; // the focusable element is .globe-card__inner
      entry.inner.tabIndex = interactive ? 0 : -1;
      el.setAttribute("aria-hidden", interactive ? "false" : "true");

      const edge = this._nearestEdgePoint(rect, anchorScreen);
      this.leaderLine.update(
        pin.id,
        anchorScreen.x,
        anchorScreen.y,
        edge.x,
        edge.y,
        visibility,
      );

      entry.everVisible = true;
    }
  }

  _nearestEdgePoint(rect, from) {
    const x = Math.min(Math.max(from.x, rect.x), rect.x + rect.width);
    const y = Math.min(Math.max(from.y, rect.y), rect.y + rect.height);
    return { x, y };
  }

  dispose() {
    this.entries.forEach(({ wrapper }) => wrapper.remove());
    this.entries.clear();
  }
}
