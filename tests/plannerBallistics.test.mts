import test from 'node:test';
import assert from 'node:assert/strict';

import { solveBallistics } from '../src/planner/ballistics.ts';
import { computeCueShellPosition } from '../src/components/stage/cueRuntime.ts';
import { specToSceneArray } from '../src/planner/coordinate.ts';

test('planner solution reaches target point in stage coordinates', () => {
  const launcherPos = { x: -8, y: 0, z: 0 };
  const targetPos = { x: 12, y: 3, z: 24 };
  const constraints = {
    heightRange: [18, 30] as [number, number],
    flightTimeRange: [1.2, 2.2] as [number, number],
    speedMax: 60,
    pitchRange: [20, 80] as [number, number],
  };

  const result = solveBallistics(launcherPos, targetPos, constraints, 2.5);
  assert.ok(result.solution, 'expected a valid ballistic solution');

  const stagePosition = computeCueShellPosition({
    launchPos: specToSceneArray(launcherPos),
    velocity: specToSceneArray(result.solution!.velocity),
    age: result.solution!.flightTime,
    gravity: -9.8,
  });

  const targetStage = specToSceneArray(targetPos);

  assert.ok(Math.abs(stagePosition[0] - targetStage[0]) < 1e-6);
  assert.ok(Math.abs(stagePosition[1] - targetStage[1]) < 1e-6);
  assert.ok(Math.abs(stagePosition[2] - targetStage[2]) < 1e-6);
});
