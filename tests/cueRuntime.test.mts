import test from 'node:test';
import assert from 'node:assert/strict';

import { computeCueShellPosition } from '../src/components/stage/cueRuntime.ts';

test('cue shell follows planner ballistics without runtime drift', () => {
  const launchPos = [2, 1.5, -3] as [number, number, number];
  const velocity = [8, 14, 5] as [number, number, number];
  const burstDelay = 1.75;
  const gravity = -9.8;

  const position = computeCueShellPosition({
    launchPos,
    velocity,
    age: burstDelay,
    gravity,
  });

  assert.ok(Math.abs(position[0] - 16) < 1e-6);
  assert.ok(Math.abs(position[1] - 10.99375) < 1e-6);
  assert.ok(Math.abs(position[2] - 5.75) < 1e-6);
});
