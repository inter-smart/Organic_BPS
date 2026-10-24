/**
 * earth.glsl.js
 * ---------------------------------------------------------------------------
 * Direct GLSL port of three.js's official "webgpu_tsl_earth" reference
 * example (https://threejs.org/examples/webgpu_tsl_earth.html), translated
 * node-for-node from its TSL source since WebGLRenderer/ShaderMaterial can't
 * consume TSL node graphs directly. Every formula, threshold, and default
 * value below (roughnessLow/High, atmosphere colors, bump scale, the 0.2/1,
 * -0.25/0.5, -0.25/0.75, -0.5/1 smoothstep ranges) is taken verbatim from
 * the reference's source, not approximated.
 *
 * One faithfully-reproduced detail that's easy to miss: the reference uses
 * the RAW geometric normal (`normalWorldGeometry`) — not the bump-perturbed
 * one — for fresnel/terminator/atmosphere-blend math, and only feeds the
 * bump-perturbed normal into the surface's own lighting. Perturbing the
 * former too would make the terminator/atmosphere rim noisy from the bump
 * map's high-frequency detail, which the reference avoids.
 *
 * The one unavoidable departure: the reference lights its surface through
 * three.js's full node-based PBR pipeline (MeshStandardNodeMaterial). A
 * hand-written ShaderMaterial has no such pipeline, so the diffuse/specular
 * response below is a Lambertian + roughness-remapped Blinn-Phong term
 * standing in for it — visually equivalent, not a literal reproduction of
 * their BRDF.
 */

export const earthVertexShader = /* glsl */ `
  // "cameraPosition" is auto-injected by three.js (ShaderMaterial) in world space.
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vWorldPosition;
  varying vec3 vViewPosition;

  void main() {
    vUv = uv;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    vViewPosition = cameraPosition - worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

export const earthFragmentShader = /* glsl */ `
  uniform sampler2D dayTexture;
  uniform sampler2D nightTexture;
  uniform sampler2D bumpRoughnessCloudsTexture; // r: bump, g: roughness, b: clouds
  uniform vec3 sunDirection;
  uniform vec3 atmosphereDayColor;
  uniform vec3 atmosphereTwilightColor;
  uniform float roughnessLow;
  uniform float roughnessHigh;

  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vWorldPosition;
  varying vec3 vViewPosition;

  float cloudsAt(vec2 uv) {
    return smoothstep(0.2, 1.0, texture2D(bumpRoughnessCloudsTexture, uv).b);
  }

  // bumpElevation = max(bump.r, cloudsStrength) — reference's exact formula.
  float elevationAt(vec2 uv) {
    return max(texture2D(bumpRoughnessCloudsTexture, uv).r, cloudsAt(uv));
  }

  // dHdxy_fwd — reference's BumpMapNode, bumpScale defaults to 1 (bumpMap(bumpElevation), no 2nd arg).
  vec2 dHdxy_fwd(vec2 uv) {
    vec2 dSTdx = dFdx(uv);
    vec2 dSTdy = dFdy(uv);
    float Hll = elevationAt(uv);
    float dBx = elevationAt(uv + dSTdx) - Hll;
    float dBy = elevationAt(uv + dSTdy) - Hll;
    return vec2(dBx, dBy);
  }

  // perturbNormalArb — reference normalizes vSigmaX/vSigmaY ("preserve the
  // same bump map look regardless of the texture's scale").
  vec3 perturbNormalArb(vec3 surfPos, vec3 surfNormal, vec2 dHdxy) {
    vec3 vSigmaX = normalize(dFdx(surfPos));
    vec3 vSigmaY = normalize(dFdy(surfPos));
    vec3 vN = surfNormal;
    vec3 R1 = cross(vSigmaY, vN);
    vec3 R2 = cross(vN, vSigmaX);
    float fDet = dot(vSigmaX, R1);
    vec3 vGrad = sign(fDet) * (dHdxy.x * R1 + dHdxy.y * R2);
    return normalize(abs(fDet) * vN - vGrad);
  }

  void main() {
    vec4 brc = texture2D(bumpRoughnessCloudsTexture, vUv);
    float clouds = cloudsAt(vUv);

    // colorNode = mix(day, vec3(1), cloudsStrength * 2)
    vec3 dayColor = texture2D(dayTexture, vUv).rgb;
    dayColor = mix(dayColor, vec3(1.0), clamp(clouds * 2.0, 0.0, 1.0));

    // roughnessNode = remap(max(g, step(0.01, clouds)), 0, 1, roughnessLow, roughnessHigh)
    float roughness = max(brc.g, step(0.01, clouds));
    roughness = mix(roughnessLow, roughnessHigh, roughness);

    // normalNode = bumpMap(bumpElevation) — feeds only the surface lighting, per the note above.
    vec3 N = perturbNormalArb(vWorldPosition, vNormalW, dHdxy_fwd(vUv));
    vec3 viewDir = normalize(vViewPosition);

    // fresnel / sunOrientation use normalWorldGeometry — the RAW normal, not the bump-perturbed one.
    float fresnel = 1.0 - abs(dot(viewDir, vNormalW));
    float sunFacing = dot(vNormalW, sunDirection);

    vec3 atmosphereColor = mix(atmosphereTwilightColor, atmosphereDayColor, smoothstep(-0.25, 0.75, sunFacing));
    float dayStrength = smoothstep(-0.25, 0.5, sunFacing);

    // Stand-in for the reference's PBR-lit "output.rgb": Lambertian falloff
    // (using the bump-perturbed normal, so terrain relief actually shades)
    // plus a roughness-remapped specular highlight.
    float lambert = clamp(dot(N, sunDirection), 0.0, 1.0);
    vec3 litDay = dayColor * mix(0.55, 1.0, lambert);

    vec3 halfDir = normalize(sunDirection + viewDir);
    float specAngle = max(dot(N, halfDir), 0.0);
    float shininess = mix(600.0, 24.0, roughness);
    float specStrength = mix(0.4, 0.04, roughness);
    litDay += vec3(1.0, 0.97, 0.92) * pow(specAngle, shininess) * specStrength * dayStrength;

    vec3 nightColor = texture2D(nightTexture, vUv).rgb;
    vec3 color = mix(nightColor, litDay, dayStrength);

    // finalOutput = mix(finalOutput, atmosphereColor, atmosphereMix) — the
    // globe's own surface also picks up the atmosphere tint at grazing
    // angles on the day side, not just the separate atmosphere shell.
    float atmosphereDayStrength = smoothstep(-0.5, 1.0, sunFacing);
    float atmosphereMix = clamp(atmosphereDayStrength * fresnel * fresnel, 0.0, 1.0);
    color = mix(color, atmosphereColor, atmosphereMix);

    gl_FragColor = vec4(color, 1.0);
  }
`;
