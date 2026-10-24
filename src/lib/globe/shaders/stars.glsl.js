/**
 * stars.glsl.js
 * ---------------------------------------------------------------------------
 * Procedural point-star field with per-star twinkle (sine-modulated alpha)
 * and depth-aware point sizing. No texture asset required.
 */

export const starsVertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute float aBrightness;
  attribute float aTint;
  uniform float uTime;
  varying float vAlpha;
  varying float vTint;

  void main() {
    // Subtle, slow twinkle — most of a star's brightness stays constant
    // (aBrightness) with only a gentle modulation on top, so the field
    // reads as calm deep space rather than a busy sparkle.
    float twinkle = 0.85 + 0.15 * sin(uTime * (0.35 + aPhase * 0.25) + aPhase * 6.2831);
    vAlpha = aBrightness * twinkle;
    vTint = aTint;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const starsFragmentShader = /* glsl */ `
  varying float vAlpha;
  varying float vTint;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float mask = smoothstep(0.5, 0.0, d);
    // Gentle per-star color variation: cool blue-white to warm white,
    // mirroring the natural spread of real star colors.
    vec3 cool = vec3(0.82, 0.89, 1.0);
    vec3 warm = vec3(1.0, 0.94, 0.86);
    vec3 color = mix(cool, warm, vTint);
    gl_FragColor = vec4(color, mask * vAlpha);
  }
`;
