/**
 * AssetLoader.js
 * ---------------------------------------------------------------------------
 * Wraps THREE.LoadingManager in a Promise-based API and drives the loading
 * overlay's progress bar. All textures are loaded asynchronously; nothing
 * in Globe.js touches the network directly.
 */
import * as THREE from 'three';

const TEXTURE_PATHS = {
  // Exact texture set from three.js's official "webgpu_tsl_earth" reference
  // example. `bumpRoughnessClouds` packs three grayscale maps into one RGB
  // image — R: bump/elevation, G: roughness, B: cloud coverage.
  day: '/globe/textures/earth_day_4096.jpg',
  night: '/globe/textures/earth_night_4096.jpg',
  bumpRoughnessClouds: '/globe/textures/earth_bump_roughness_clouds_4096.jpg',
};

const ICON_PATHS = {
  mountain: '/globe/icons/mountain.svg',
  leaf: '/globe/icons/leaf.svg',
  target: '/globe/icons/target.svg',
};

export class AssetLoader {
  /**
   * @param {(ratio: number) => void} onProgress - called with 0..1 as assets load
   */
  constructor(onProgress) {
    this.manager = new THREE.LoadingManager();
    this.textureLoader = new THREE.TextureLoader(this.manager);

    if (typeof onProgress === 'function') {
      this.manager.onProgress = (_url, loaded, total) => onProgress(total ? loaded / total : 1);
    }
  }

  /** Loads every Earth texture, resolving with a keyed map of ready THREE.Texture instances. */
  async loadTextures() {
    const entries = await Promise.all(
      Object.entries(TEXTURE_PATHS).map(
        ([key, path]) =>
          new Promise((resolve, reject) => {
            this.textureLoader.load(
              path,
              (texture) => {
                // bumpRoughnessClouds is a data map (not a color photo) — keep it linear.
                texture.colorSpace = key === 'day' || key === 'night' ? THREE.SRGBColorSpace : THREE.NoColorSpace;
                texture.anisotropy = 8; // matches the reference's texture.anisotropy = 8
                resolve([key, texture]);
              },
              undefined,
              (err) => reject(new Error(`Failed to load texture "${key}" (${path}): ${err?.message || err}`))
            );
          })
      )
    );
    return Object.fromEntries(entries);
  }

  /** Fetches and inlines every pin icon as raw SVG markup, keyed by icon name. */
  async loadIcons() {
    const entries = await Promise.all(
      Object.entries(ICON_PATHS).map(async ([key, path]) => {
        const res = await fetch(path);
        if (!res.ok) throw new Error(`Failed to load icon "${key}" (${path}): HTTP ${res.status}`);
        return [key, await res.text()];
      })
    );
    return Object.fromEntries(entries);
  }

  /** Optionally fetches pin location data from a URL (falls back to inline config.pins when omitted). */
  async loadLocations(url) {
    if (!url) return null;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load location data (${url}): HTTP ${res.status}`);
    return res.json();
  }
}
