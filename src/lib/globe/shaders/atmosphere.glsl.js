/**
 * atmosphere.glsl.js
 * ---------------------------------------------------------------------------
 * Direct GLSL port of the atmosphere shell from three.js's official
 * "webgpu_tsl_earth" reference example — same fresnel/remap/pow(3) alpha
 * formula and day/twilight color mix, taken verbatim from its TSL source.
 * Rendered with THREE.BackSide + depth-testing against the opaque Earth,
 * at a scale of exactly 1.04 (the reference's `atmosphere.scale.setScalar(1.04)`).
 */

export const atmosphereVertexShader = /* glsl */ `
  varying vec3 vNormalW;
  varying vec3 vWorldPosition;

  void main() {
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

export const atmosphereFragmentShader = /* glsl */ `
  uniform vec3 dayColor;
  uniform vec3 twilightColor;
  uniform vec3 sunDirection;

  varying vec3 vNormalW;
  varying vec3 vWorldPosition;

  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    float fresnel = 1.0 - abs(dot(viewDir, vNormalW));
    float sunFacing = dot(vNormalW, sunDirection);

    vec3 color = mix(twilightColor, dayColor, smoothstep(-0.25, 0.75, sunFacing));

    // alpha = remap(fresnel, 0.73, 1, 1, 0).pow(3) * sunOrientation.smoothstep(-0.5, 1)
    float rim = clamp(1.0 - (fresnel - 0.73) / (1.0 - 0.73), 0.0, 1.0);
    float alpha = pow(rim, 3.0) * smoothstep(-0.5, 1.0, sunFacing);

    gl_FragColor = vec4(color, alpha);
  }
`;
