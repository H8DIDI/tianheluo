// GPU Particle vertex shader — firework sparks
// All position/velocity updates happen on GPU via uniforms + attributes

uniform float uTime;
uniform float uGravity;
uniform float uDrag;
uniform vec2 uResolution;

attribute float aLife;       // 0..1 normalized remaining life
attribute float aSize;       // base particle size
attribute vec3 aVelocity;    // initial velocity
attribute vec3 aColor;       // particle RGB
attribute float aBornTime;   // time when particle was created
attribute float aLifespan;   // total lifespan in seconds

varying float vLife;
varying vec3 vColor;
varying float vAge;

void main() {
  float age = uTime - aBornTime;
  float life = clamp(1.0 - age / aLifespan, 0.0, 1.0);
  vLife = life;
  vAge = age;

  // Physics: position = p0 + v*t + 0.5*g*t^2, with exponential drag
  float dragFactor = pow(uDrag, age * 60.0); // drag per-frame approximation
  vec3 displacement = aVelocity * age * dragFactor;
  displacement.y += 0.5 * uGravity * age * age;

  vec3 worldPos = position + displacement;

  // Color temperature decay: white → yellow → orange → red → dark
  vec3 warmColor = aColor;
  if (life < 0.3) {
    warmColor *= mix(vec3(0.3, 0.05, 0.0), vec3(1.0), life / 0.3);
  } else if (life < 0.6) {
    warmColor = mix(aColor * vec3(1.0, 0.7, 0.3), aColor, (life - 0.3) / 0.3);
  }
  vColor = warmColor;

  vec4 mvPosition = modelViewMatrix * vec4(worldPos, 1.0);

  // Size: larger when young, shrinks as it dies, perspective scaling
  float sizeFade = smoothstep(0.0, 0.05, life) * smoothstep(0.0, 0.1, 1.0 - life);
  sizeFade = max(sizeFade, life * life); // keep bright while alive
  gl_PointSize = aSize * sizeFade * (300.0 / -mvPosition.z);
  gl_PointSize = clamp(gl_PointSize, 1.0, 128.0);

  gl_Position = projectionMatrix * mvPosition;

  // Hide dead particles
  if (life <= 0.0 || age < 0.0) {
    gl_Position = vec4(9999.0, 9999.0, 9999.0, 1.0);
    gl_PointSize = 0.0;
  }
}
