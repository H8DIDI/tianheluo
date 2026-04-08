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

test('star shape burst alternates between outer and inner radii', () => {
  const points = buildShapeBurstPattern('star', 10, 10);
  const radii = points.map((point) => Math.hypot(point[0], point[1]));

  assert.equal(points.length, 10);
  assert.ok(Math.max(...radii) - Math.min(...radii) > 3);
});

test('shape quick launch effect maps to burst effect with shape metadata', () => {
  const effect = buildShapeQuickLaunchEffect('star', 'shape-1');

  assert.equal(effect.type, 'burst');
  assert.equal(effect.name, 'Shape Star');
  assert.equal(effect.shapePattern, 'star');
});
