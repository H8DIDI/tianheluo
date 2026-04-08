import test from 'node:test';
import assert from 'node:assert/strict';

import { useProjectStore } from '../src/store/projectStore.ts';

test('setProject syncs legacy cues from cueList', () => {
  useProjectStore.getState().setProject({
    id: 'sync-project',
    name: 'Cue Sync Project',
    positions: [],
    events: [],
    duration: 12,
    createdAt: new Date('2026-01-01T00:00:00Z'),
    updatedAt: new Date('2026-01-01T00:00:00Z'),
    cueList: [
      {
        id: 'cue-1',
        launchTime: 0.75,
        launcherId: 'launcher-x',
        launcherPos: { x: 2, y: 0, z: 0 },
        burstTime: 1.4,
        initVelocity: { x: 0, y: 0, z: 12 },
        hangTime: 2.1,
        pattern: 'peony',
        color: '#ff0000',
        intensity: 0.9,
        size: 1,
      },
    ],
  });

  const project = useProjectStore.getState().project;
  assert.equal(project?.cueList?.length, 1);
  assert.equal(project?.cues?.length, 1);
  assert.equal(project?.cues?.[0].track, 'launcher-x');
});

test('updateProject syncs legacy cues when cueList is updated', () => {
  useProjectStore.getState().setProject({
    id: 'sync-project-2',
    name: 'Cue Update Project',
    positions: [],
    events: [],
    duration: 8,
    createdAt: new Date('2026-01-01T00:00:00Z'),
    updatedAt: new Date('2026-01-01T00:00:00Z'),
    cueList: [],
    cues: [],
  });

  useProjectStore.getState().updateProject({
    cueList: [
      {
        id: 'cue-2',
        launchTime: 1,
        launcherId: 'launcher-y',
        launcherPos: { x: -3, y: 0, z: 0 },
        burstTime: 1.5,
        initVelocity: { x: 1, y: 0, z: 10 },
        hangTime: 2,
        pattern: 'willow',
        color: '#00ff00',
        intensity: 0.85,
        size: 1.1,
      },
    ],
  });

  const project = useProjectStore.getState().project;
  assert.equal(project?.cueList?.length, 1);
  assert.equal(project?.cues?.length, 1);
  assert.equal(project?.cues?.[0].effect.type, 'willow');
});
