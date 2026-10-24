/**
 * main.js
 * ---------------------------------------------------------------------------
 * Entry point. Loads assets, instantiates every module, and wires them
 * together. This is the only file that knows about all the other modules —
 * Globe/PinManager/CardManager/CameraController/LeaderLine stay decoupled
 * and talk to each other only through the small event emitters exposed here.
 */
import { resolveConfig } from './Config.js';
import { AssetLoader } from './AssetLoader.js';
import { AnimationManager } from './Animation.js';
import { Globe } from './Globe.js';
import { CameraController } from './CameraController.js';
import { PinManager } from './PinManager.js';
import { CardManager } from './CardManager.js';
import { LeaderLine } from './LeaderLine.js';

/**
 * Public component factory — mirrors the API requested in the spec:
 *   new GlobeComponent({ container, rotationSpeed, autoRotate, pins, ... })
 */
export async function createGlobeComponent(userConfig = {}) {
  const config = resolveConfig(userConfig);
  const container = typeof config.container === 'string' ? document.querySelector(config.container) : config.container;
  if (!container) throw new Error(`GlobeComponent: container "${config.container}" not found`);

  container.dataset.theme = config.theme;
  container.style.setProperty('--card-enter-duration', `${config.animation.cardEnterDuration}s`);
  container.style.setProperty('--hover-duration', `${config.animation.hoverDuration}s`);
  container.style.setProperty('--hover-ease', config.animation.hoverEaseCss);
  container.style.setProperty('--line-draw-duration', `${config.animation.lineDrawDuration}s`);
  container.style.setProperty('--line-ease', config.animation.lineEaseCss);

  // Scale the card layout down on narrow viewports so it never overwhelms a phone screen.
  const baseCardConfig = { ...config.card };
  const applyResponsiveCardSizing = () => {
    const compact = container.clientWidth < 640;
    // Cards are sized in rem (see globe.css) so they track the laptop-scaling root font-size.
    const scale = parseFloat(getComputedStyle(document.documentElement).fontSize) / 16 || 1;
    config.card.width = (compact ? 232 : baseCardConfig.width) * scale;
    config.card.height = baseCardConfig.height * scale;
    config.card.radialOffset = (compact ? 58 : baseCardConfig.radialOffset) * scale;
  };
  applyResponsiveCardSizing();

  const loaderEl = container.querySelector('.globe-loader');
  const progressEl = loaderEl?.querySelector('.globe-loader__bar');
  const setProgress = (ratio) => {
    if (progressEl) progressEl.style.width = `${Math.round(ratio * 100)}%`;
  };

  const assetLoader = new AssetLoader(setProgress);
  const [textures, icons, fetchedLocations] = await Promise.all([
    assetLoader.loadTextures(),
    assetLoader.loadIcons(),
    config.pins && config.pins.length ? Promise.resolve(null) : assetLoader.loadLocations(config.dataUrl),
  ]);
  const locations = config.pins && config.pins.length ? config.pins : fetchedLocations;

  const animationManager = new AnimationManager(config);
  const globe = new Globe(container, config, textures);
  const cameraController = new CameraController(globe.camera, globe.renderer.domElement, config);

  const pinManager = new PinManager({
    scene: globe.scene,
    camera: globe.camera,
    domElement: globe.renderer.domElement,
    earthMesh: globe.earth,
    config,
    animationManager,
  });
  const pins = pinManager.build(locations, globe.earthGroup);

  const leaderLine = new LeaderLine(container, animationManager);
  leaderLine.setSize(container.clientWidth, container.clientHeight);

  const cardManager = new CardManager({ container, camera: globe.camera, config, leaderLine });
  cardManager.build(pins, icons);

  // ---- Cross-module wiring: pin ⇄ card hover/click stay in sync ----------
  let activeId = null;
  const select = (pin) => {
    activeId = pin.id;
    pinManager.setActive(pin.id);
    cardManager.setActive(pin.id);
    cameraController.focusOn(pin.lat, pin.lng);
    if (config.onPinClick) config.onPinClick(pin);
  };

  pinManager.on('hover', (id) => cardManager.setHover(id));
  cardManager.on('hover', (id) => {
    pinManager.setHover(id, { emit: false });
    if (config.onPinHover) config.onPinHover(id ? pinManager.getPin(id) : null);
  });
  pinManager.on('click', select);
  cardManager.on('click', select);

  // ---- Shared render loop -------------------------------------------------
  globe.onTick(() => {
    cameraController.update();
    cardManager.update(globe.camera.position);
  });
  globe.onResize((w, h) => {
    leaderLine.setSize(w, h);
    applyResponsiveCardSizing();
  });

  globe.start();

  if (loaderEl) {
    setProgress(1);
    requestAnimationFrame(() => {
      loaderEl.classList.add('is-loaded');
      setTimeout(() => loaderEl.remove(), 700);
    });
  }

  if (config.onReady) config.onReady();

  return {
    globe,
    cameraController,
    pinManager,
    cardManager,
    leaderLine,
    focusOn: (lat, lng) => cameraController.focusOn(lat, lng),
    setActivePin: (id) => {
      const pin = pinManager.getPin(id);
      if (pin) select(pin);
    },
    destroy() {
      pinManager.dispose();
      cardManager.dispose();
      leaderLine.dispose();
      cameraController.dispose();
      globe.dispose();
    },
  };
}
