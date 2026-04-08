import type { FireworkEffect, Particle } from '../../types/domain';
import { computeCueShellPosition } from './cueRuntime';

export type CueShellParticle = Particle & {
  age: number;
  baseVelocity: [number, number, number];
  velocity: [number, number, number];
  position: [number, number, number];
  apexY?: number;
  fallTime?: number;
  scheduledBurstTime?: number;
  hangTime?: number;
  effect?: FireworkEffect;
  launchPosition?: [number, number, number];
};

type HeightClampParticle = {
  position: [number, number, number];
  velocity: [number, number, number];
};

export type PendingExplosion = {
  position: [number, number, number];
  effect: FireworkEffect;
  hangTime?: number;
};

export function shouldTriggerScheduledItem(
  itemTime: number,
  windowStart: number,
  windowEnd: number
) {
  return itemTime <= windowEnd + 1e-4 && itemTime >= windowStart;
}

export function updateCueShellParticle(
  particle: CueShellParticle,
  gravity: number,
  clampHeightPosition: (particle: HeightClampParticle) => void
): PendingExplosion | null {
  particle.position = computeCueShellPosition({
    launchPos: particle.launchPosition ?? particle.position,
    velocity: particle.baseVelocity,
    age: particle.age,
    gravity,
  });
  particle.velocity = [
    particle.baseVelocity[0],
    particle.baseVelocity[1] + gravity * particle.age,
    particle.baseVelocity[2],
  ];
  clampHeightPosition(particle);

  if (
    particle.effect &&
    particle.scheduledBurstTime !== undefined &&
    particle.age >= particle.scheduledBurstTime
  ) {
    return {
      position: [...particle.position] as [number, number, number],
      effect: particle.effect,
      hangTime: particle.hangTime,
    };
  }

  return null;
}
