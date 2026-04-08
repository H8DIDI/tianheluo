export type ParticleMaterialConfig = {
  pointScale: number;
  coreBoost: number;
  flashBoost: number;
  glowFalloff: number;
  coreFalloff: number;
  coolingStrength: number;
};

export function getParticleMaterialConfig(): ParticleMaterialConfig {
  return {
    pointScale: 320,
    coreBoost: 3.6,
    flashBoost: 5.8,
    glowFalloff: 6.2,
    coreFalloff: 34,
    coolingStrength: 0.46,
  };
}

export function getParticleCoolingColor(): [number, number, number] {
  return [0.88, 0.22, 0.04];
}
