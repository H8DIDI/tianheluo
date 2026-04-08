import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildShapeBurstPattern,
  buildShapeQuickLaunchEffect,
} from '../src/components/stage/shapeBurst.ts';

test('ring shape burst creates circular point distribution', () => {
  const points = buildShapeBurstPattern('ring', 12, 10);

  assert.equal(points.length, 12);
  assert.ok(points.every((point) => Math.abs(Math.hypot(point[0], point[2]) - 10) < 1e-6));
});

test('heart shape burst creates non-empty point distribution', () => {
  const points = buildShapeBurstPattern('heart', 24, 6);

  assert.equal(points.length, 24);
  assert.ok(points.some((point) => point[1] > 0));
  assert.ok(points.some((point) => point[1] < 0));
});

test('shape quick launch effect maps to burst effect with shape metadata', () => {
  const effect = buildShapeQuickLaunchEffect('ring', 'shape-1');

  assert.equal(effect.type, 'burst');
  assert.equal(effect.name, 'Shape Ring');
  assert.equal(effect.shapePattern, 'ring');
});
