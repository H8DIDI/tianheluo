import test from 'node:test';
import assert from 'node:assert/strict';

import { resolveStageTapLaunchMode } from './stageLaunchSelection.ts';

test('resolveStageTapLaunchMode prefers library effect when enabled and selected', () => {
  const result = resolveStageTapLaunchMode({
    quickLaunchMode: 'library',
    selectedEffectId: 'peony-gold-5',
    quickLaunchPreset: 'comet',
  });

  assert.deepEqual(result, {
    mode: 'library',
    selectedEffectId: 'peony-gold-5',
  });
});

test('resolveStageTapLaunchMode falls back to preset mode when no library effect is selected', () => {
  const result = resolveStageTapLaunchMode({
    quickLaunchMode: 'library',
    selectedEffectId: null,
    quickLaunchPreset: 'willow',
  });

  assert.deepEqual(result, {
    mode: 'preset',
    preset: 'willow',
  });
});
