/**
 * LeaderLine.js
 * ---------------------------------------------------------------------------
 * Thin SVG lines connecting each pin to its floating card. Endpoints are
 * updated every frame from projected 3D coordinates (owned by CardManager);
 * opacity continuously tracks the same occlusion factor used for the card,
 * so the line and card fade in lockstep. The dash pattern is set via CSS.
 */
export class LeaderLine {
  constructor(container, animationManager) {
    this.anim = animationManager;
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.classList.add('globe-leader-lines');
    this.svg.setAttribute('aria-hidden', 'true');
    container.appendChild(this.svg);
    this.lines = new Map();
  }

  setSize(width, height) {
    this.svg.setAttribute('width', width);
    this.svg.setAttribute('height', height);
  }

  _ensure(id) {
    let entry = this.lines.get(id);
    if (entry) return entry;
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    el.classList.add('leader-line');
    el.style.opacity = '0';
    this.svg.appendChild(el);
    entry = { el };
    this.lines.set(id, entry);
    return entry;
  }

  /** opacityFactor is 0..1 */
  update(id, x1, y1, x2, y2, opacityFactor) {
    const entry = this._ensure(id);
    entry.el.setAttribute('x1', x1);
    entry.el.setAttribute('y1', y1);
    entry.el.setAttribute('x2', x2);
    entry.el.setAttribute('y2', y2);
    entry.el.style.opacity = String(Math.max(0, Math.min(1, opacityFactor)) * 0.9);
  }

  remove(id) {
    const entry = this.lines.get(id);
    if (!entry) return;
    this.anim.killTweensOf(entry.el);
    entry.el.remove();
    this.lines.delete(id);
  }

  dispose() {
    this.lines.forEach((_, id) => this.remove(id));
    this.svg.remove();
  }
}