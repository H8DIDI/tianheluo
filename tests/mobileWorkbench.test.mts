import test from 'node:test';
import assert from 'node:assert/strict';

import {
  getMobileWorkbenchTabs,
  getMobileWorkbenchSheetTitle,
} from '../src/components/layout/mobileWorkbench.ts';

test('mobile workbench exposes stage and core mobile panels only', () => {
  const tabs = getMobileWorkbenchTabs({
    hasAssistant: true,
  });

  assert.deepEqual(
    tabs.map((tab) => tab.id),
    ['stage', 'timeline', 'map', 'assistant']
  );
});

test('mobile workbench hides assistant tab when unavailable', () => {
  const tabs = getMobileWorkbenchTabs({
    hasAssistant: false,
  });

  assert.deepEqual(
    tabs.map((tab) => tab.id),
    ['stage', 'timeline', 'map']
  );
});

test('mobile workbench sheet titles match selected panel', () => {
  assert.equal(getMobileWorkbenchSheetTitle('timeline'), '时间轴');
  assert.equal(getMobileWorkbenchSheetTitle('map'), '阵地编辑');
  assert.equal(getMobileWorkbenchSheetTitle('assistant'), 'AI 助理');
});
