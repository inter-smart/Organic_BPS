/**
 * Globe.js
 * ---------------------------------------------------------------------------
 * Owns the Three.js scene graph: renderer, camera, lighting rig, the Earth
 * mesh (a GLSL port of three.js's "webgpu_tsl_earth" reference example —
 * bump-mapped terrain, in-shader clouds, day/night/atmosphere blending),
 * the atmosphere glow shell, the procedural starfield, and the bloom pass.
 * Also owns the single shared render loop — other modules register
 * per-frame callbacks via `onTick()` instead of running their own rAF.
 */
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

import { earthVertexShader, earthFragmentShader } from './shaders/earth.glsl.js';
import { atmosphereVertexShader, atmosphereFragmentShader } from './shaders/atmosphere.glsl.js';
import { starsVertexShader, starsFragmentShader } from './shaders/stars.glsl.js';
import { prefersReducedMotion } from './Utils.js';

export class Globe {
  /**
   * @param {HTMLElement} container
   * @param {object} config - resolved Config.js object
   * @param {object} textures - { day, night, bumpRoughnessClouds } THREE.Texture map
   */
  constructor(container, config, textures) {
    this.container = container;
    this.config = config;
    this.textures = textures;
    this.tickCallbacks = [];
    this.resizeCallbacks = [];
    this.clock = new THREE.Timer();
    this._raf = null;
    this._reducedMotion = prefersReducedMotion();

    this._buildRenderer();
    this._buildScene();
    this._buildLights();
    this._buildEarth();
    if (config.showAtmosphere) this._buildAtmosphere();
    if (config.showStars) this._buildStars();
    if (config.showBloom) this._buildComposer();

    this._onResize = this._onResize.bind(this);
    this._resizeObserver = new ResizeObserver(this._onResize);
    this._resizeObserver.observe(this.container);
    this._onResize();
  }

  // ---------------------------------------------------------------------
  // Setup
  // ---------------------------------------------------------------------

  _buildRenderer() {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.domElement.classList.add('globe-canvas');
    this.container.appendChild(renderer.domElement);
    this.renderer = renderer;

    // CSS2D layer for the floating HTML cards — sits above the canvas.
    const cssRenderer = new CSS2DRenderer();
    cssRenderer.domElement.classList.add('globe-css-layer');
    this.container.appendChild(cssRenderer.domElement);
    this.cssRenderer = cssRenderer;
  }

  _buildScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(this.config.fov, 1, 0.1, 400);
    this.camera.position.set(0, 0, this.config.defaultDistance);
  }

  _buildLights() {
    const ambient = new THREE.AmbientLight(0x35507a, 0.55);
    this.scene.add(ambient);

    const hemi = new THREE.HemisphereLight(0x6fa8ff, 0x0a0a12, 0.35);
    this.scene.add(hemi);

    // The "sun" — its world-space direction also drives the Earth shader's
    // day/night terminator and specular highlight, so lighting stays consistent.
    const sun = new THREE.DirectionalLight(0xffffff, 1.4);
    sun.position.set(-3.2, 1.4, 2.6);
    this.scene.add(sun);
    this.sunLight = sun;
    this.sunDirection = sun.position.clone().normalize();

    this.ambientLight = ambient;
    this.hemiLight = hemi;
  }

  _buildEarth() {
    const { globeRadius, segments } = this.config;
    const geometry = new THREE.SphereGeometry(globeRadius, segments, segments);

    // Shared with the atmosphere shell's material, matching the reference's
    // shared uniform() nodes — same two Color instances feed both.
    this.atmosphereDayColor = new THREE.Color(0x4db2ff);
    this.atmosphereTwilightColor = new THREE.Color(0x4db2ff);

    const material = new THREE.ShaderMaterial({
      vertexShader: earthVertexShader,
      fragmentShader: earthFragmentShader,
      uniforms: {
        dayTexture: { value: this.textures.day },
        nightTexture: { value: this.textures.night },
        bumpRoughnessCloudsTexture: { value: this.textures.bumpRoughnessClouds },
        sunDirection: { value: this.sunDirection.clone() },
        atmosphereDayColor: { value: this.atmosphereDayColor },
        atmosphereTwilightColor: { value: this.atmosphereTwilightColor },
        roughnessLow: { value: 0.25 },
        roughnessHigh: { value: 0.35 },
      },
    });

    this.earthGroup = new THREE.Group();
    this.earth = new THREE.Mesh(geometry, material);
    this.earthGroup.add(this.earth);
    this.scene.add(this.earthGroup);
  }

  _buildAtmosphere() {
    const { globeRadius, atmosphereRadius, segments } = this.config;
    // Reference: `atmosphere.scale.setScalar(1.04)` on the same unit sphere geometry.
    const geometry = new THREE.SphereGeometry(globeRadius * atmosphereRadius, segments, segments);

    const material = new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      uniforms: {
        dayColor: { value: this.atmosphereDayColor },
        twilightColor: { value: this.atmosphereTwilightColor },
        sunDirection: { value: this.sunDirection.clone() },
      },
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });

    this.atmosphere = new THREE.Mesh(geometry, material);
    this.earthGroup.add(this.atmosphere);
  }

  _buildStars() {
    const count = this.config.starCount;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const brightness = new Float32Array(count);
    const tints = new Float32Array(count);

    // Pushed much farther out than the globe/camera (which stay within ~1.6–6
    // units of the origin) so the field reads as distant deep space rather
    // than a nearby particle halo. A wide radius spread adds subtle depth.
    for (let i = 0; i < count; i++) {
      const radius = THREE.MathUtils.randFloat(120, 320);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      // Most stars are small and dim; a small fraction stand out slightly —
      // matches the natural brightness distribution of a real star field.
      const isBright = Math.random() > 0.92;
      sizes[i] = isBright ? THREE.MathUtils.randFloat(0.9, 1.6) : THREE.MathUtils.randFloat(0.35, 0.85);
      brightness[i] = isBright ? THREE.MathUtils.randFloat(0.75, 1.0) : THREE.MathUtils.randFloat(0.25, 0.6);
      phases[i] = Math.random();
      tints[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
    geometry.setAttribute('aBrightness', new THREE.BufferAttribute(brightness, 1));
    geometry.setAttribute('aTint', new THREE.BufferAttribute(tints, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader: starsVertexShader,
      fragmentShader: starsFragmentShader,
      uniforms: { uTime: { value: 0 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.stars = new THREE.Points(geometry, material);
    this.scene.add(this.stars);
  }

  _buildComposer() {
    const composer = new EffectComposer(this.renderer);
    composer.addPass(new RenderPass(this.scene, this.camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.32, 0.35, 0.9);
    composer.addPass(bloom);
    this.composer = composer;
    this.bloomPass = bloom;
  }

  // ---------------------------------------------------------------------
  // Loop
  // ---------------------------------------------------------------------

  /** Registers a per-frame callback: fn(deltaSeconds, elapsedSeconds). */
  onTick(fn) {
    this.tickCallbacks.push(fn);
    return () => {
      this.tickCallbacks = this.tickCallbacks.filter((cb) => cb !== fn);
    };
  }

  /** Registers a callback fired whenever the container is resized: fn(width, height). */
  onResize(fn) {
    this.resizeCallbacks.push(fn);
    return () => {
      this.resizeCallbacks = this.resizeCallbacks.filter((cb) => cb !== fn);
    };
  }

  start() {
    const loop = () => {
      this._raf = requestAnimationFrame(loop);
      this.clock.update();
      const delta = Math.min(this.clock.getDelta(), 0.1);
      const elapsed = this.clock.getElapsed();

      if (this.stars) this.stars.material.uniforms.uTime.value = elapsed;

      for (const cb of this.tickCallbacks) cb(delta, elapsed);

      if (this.composer) this.composer.render();
      else this.renderer.render(this.scene, this.camera);
      this.cssRenderer.render(this.scene, this.camera);
    };
    this._raf = requestAnimationFrame(loop);
  }

  stop() {
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = null;
  }

  // ---------------------------------------------------------------------
  // Resize / dispose
  // ---------------------------------------------------------------------

  _onResize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (width === 0 || height === 0) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.cssRenderer.setSize(width, height);
    if (this.composer) this.composer.setSize(width, height);
    if (this.bloomPass) this.bloomPass.resolution.set(width, height);

    for (const cb of this.resizeCallbacks) cb(width, height);
  }

  dispose() {
    this.stop();
    this._resizeObserver.disconnect();

    this.scene.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
        materials.forEach((m) => m.dispose());
      }
    });
    Object.values(this.textures).forEach((tex) => tex.dispose());

    this.renderer.dispose();
    this.renderer.domElement.remove();
    this.cssRenderer.domElement.remove();
  }
}
