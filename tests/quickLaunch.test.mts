import test from 'node:test';
import assert from 'node:assert/strict';

import { useProjectStore } from '../src/store/projectStore.ts';
import {
  createQuickLaunchRequest,
  getQuickLaunchWorldPoint,
} from '../src/components/stage/quickLaunch.ts';

test('createQuickLaunchRequest stores a stage quick-launch payload', () => {
  useProjectStore.getState().requestQuickLaunch({
    world: [12, 0, -8],
    source: 'stage-tap',
  });

  const request = useProjectStore.getState().quickLaunchRequest;
  assert.ok(request);
  assert.deepEqual(request?.world, [12, 0, -8]);
  assert.equal(request?.source, 'stage-tap');
});

test('getQuickLaunchWorldPoint clamps stage taps to ground plane', () => {
  const point = getQuickLaunchWorldPoint([5, 13, -9]);
  assert.deepEqual(point, [5, 0, -9]);
});

test('createQuickLaunchRequest returns normalized request payload', () => {
  const request = createQuickLaunchRequest([4, 0, 7], 'stage-tap');
  assert.deepEqual(request.world, [4, 0, 7]);
  assert.equal(request.source, 'stage-tap');
  assert.ok(typeof request.id === 'string');
});
