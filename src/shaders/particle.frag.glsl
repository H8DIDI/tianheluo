// GPU Particle fragment shader — soft glow with additive blending

varying float vLife;
varying vec3 vColor;
varying float vAge;

void main() {
  // Soft circular particle with glow
  vec2 center = gl_PointCoord - vec2(0.5);
  float dist = length(center);

  // Discard outside circle
  if (dist > 0.5) discard;

  // Soft falloff: bright core + gentle glow
  float core = exp(-dist * dist * 40.0);     // tight bright center
  float glow = exp(-dist * dist * 8.0);      // wider soft glow
  float alpha = mix(glow, core, 0.6);

  // Life-based fade
  float lifeFade = smoothstep(0.0, 0.08, vLife);
  alpha *= lifeFade;

  // Sparkle: random brightness variation based on age
  float sparkle = 0.85 + 0.15 * fract(sin(vAge * 127.1 + gl_PointCoord.x * 311.7) * 43758.5453);
  alpha *= sparkle;

  // Final color with HDR-style overbright for additive blending
  vec3 finalColor = vColor * (1.0 + core * 2.0);

  gl_FragColor = vec4(finalColor * alpha, alpha);
}
