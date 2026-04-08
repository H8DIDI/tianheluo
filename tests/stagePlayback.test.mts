import test from 'node:test';
import assert from 'node:assert/strict';

import { shouldTriggerScheduledItem, updateCueShellParticle } from '../src/components/stage/stagePlayback.ts';

test('shouldTriggerScheduledItem matches playback frame window rules', () => {
  assert.equal(shouldTriggerScheduledItem(1, 1, 1.016), true);
  assert.equal(shouldTriggerScheduledItem(1.01605, 1, 1.016), true);
  assert.equal(shouldTriggerScheduledItem(0.999, 1, 1.016), false);
  assert.equal(shouldTriggerScheduledItem(1.02, 1, 1.016), false);
});

test('updateCueShellParticle triggers explosion at scheduled burst time', () => {
  const particle = {
    age: 1.5,
    baseVelocity: [4, 12, 3] as [number, number, number],
    velocity: [4, 12, 3] as [number, number, number],
    position: [0, 0, 0] as [number, number, number],
    launchPosition: [1, 2, 3] as [number, number, number],
    scheduledBurstTime: 1.4,
    hangTime: 2.3,
    effect: {
      id: 'effect-1',
      name: 'Test Burst',
      type: 'burst',
      color: '#fff000',
      height: 90,
      duration: 2,
      intensity: 0.9,
      particleCount: 120,
      spread: 360,
      trailLength: 0.4,
    },
    apexY: 2,
    fallTime: 0,
    life: 1,
    size: 1,
    color: '#fff000',
    type: 'rocket' as const,
  };

  const pending = updateCueShellParticle(particle, -9.8, () => {});

  assert.ok(pending);
  assert.equal(pending?.hangTime, 2.3);
  assert.ok(Math.abs((pending?.position[0] ?? 0) - 7) < 1e-6);
});
