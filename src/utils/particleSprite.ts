import * as THREE from 'three';

/**
 * High-quality radial gradient particle sprite (128x128)
 * Bright core + soft glow halo for realistic firework sparks
 */
export function createParticleSprite(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const half = size / 2;

  // Outer soft glow
  const glow = ctx.createRadialGradient(half, half, 0, half, half, half);
  glow.addColorStop(0, 'rgba(255,255,255,1)');
  glow.addColorStop(0.08, 'rgba(255,255,255,0.95)');
  glow.addColorStop(0.15, 'rgba(255,240,220,0.8)');
  glow.addColorStop(0.3, 'rgba(255,200,150,0.45)');
  glow.addColorStop(0.5, 'rgba(255,150,80,0.15)');
  glow.addColorStop(0.7, 'rgba(255,100,40,0.04)');
  glow.addColorStop(1, 'rgba(0,0,0,0)');

  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Elliptical trail sprite for rising shell tails and spark trails
 */
export function createTrailSprite(): THREE.CanvasTexture {
  const w = 32;
  const h = 128;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, 'rgba(255,255,255,0)');
  grad.addColorStop(0.3, 'rgba(255,240,200,0.6)');
  grad.addColorStop(0.5, 'rgba(255,255,255,1)');
  grad.addColorStop(0.7, 'rgba(255,240,200,0.6)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.ellipse(w / 2, h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Bright flash sprite for explosion moment — intense center, rapid falloff
 */
export function createFlashSprite(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const half = size / 2;

  const flash = ctx.createRadialGradient(half, half, 0, half, half, half);
  flash.addColorStop(0, 'rgba(255,255,255,1)');
  flash.addColorStop(0.05, 'rgba(255,255,240,0.95)');
  flash.addColorStop(0.12, 'rgba(255,240,200,0.6)');
  flash.addColorStop(0.25, 'rgba(255,200,120,0.2)');
  flash.addColorStop(0.5, 'rgba(255,150,50,0.03)');
  flash.addColorStop(1, 'rgba(0,0,0,0)');

  ctx.fillStyle = flash;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}
