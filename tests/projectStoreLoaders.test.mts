import test from 'node:test';
import assert from 'node:assert/strict';

import { useProjectStore } from '../src/store/projectStore.ts';

test('loadGrandShow loads the dedicated grand show project', () => {
  useProjectStore.getState().loadGrandShow();
  const project = useProjectStore.getState().project;

  assert.ok(project, 'expected a project after loadGrandShow');
  assert.equal(project?.name, '3分钟中型烟花秀');
  assert.equal(project?.activityName, 'Grand Show - 对称齐射编排');
});
