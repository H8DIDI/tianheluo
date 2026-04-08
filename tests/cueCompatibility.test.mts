import test from 'node:test';
import assert from 'node:assert/strict';

import { deriveLegacyCuesFromCueList, syncProjectCueCompatibility } from '../src/utils/cueCompatibility.ts';

test('deriveLegacyCuesFromCueList creates exportable legacy cues', () => {
  const cues = deriveLegacyCuesFromCueList([
    {
      id: 'cue-1',
      launchTime: 1.25,
      launcherId: 'launcher-a',
      launcherPos: { x: 10, y: 0, z: 0 },
      burstTime: 1.8,
      initVelocity: { x: 2, y: 0, z: 16 },
      hangTime: 2.4,
      pattern: 'willow',
      color: '#FFD700',
      intensity: 0.85,
      size: 1.2,
      debug: { targetPoint: { x: 16, y: 1, z: 24 } },
    },
  ]);

  assert.equal(cues.length, 1);
  assert.equal(cues[0].track, 'launcher-a');
  assert.equal(cues[0].position.x, 10);
  assert.equal(cues[0].effect.type, 'willow');
  assert.equal(cues[0].effect.height, 24);
});

test('syncProjectCueCompatibility populates legacy cues from cueList', () => {
  const project = syncProjectCueCompatibility({
    id: 'project-1',
    name: 'Test Project',
    positions: [],
    events: [],
    duration: 10,
    createdAt: new Date('2026-01-01T00:00:00Z'),
    updatedAt: new Date('2026-01-01T00:00:00Z'),
    cueList: [
      {
        id: 'cue-1',
        launchTime: 0.5,
        launcherId: 'launcher-1',
        launcherPos: { x: 0, y: 0, z: 0 },
        burstTime: 1.6,
        initVelocity: { x: 0, y: 0, z: 14 },
        hangTime: 2,
        pattern: 'burst',
        color: '#F59E0B',
        intensity: 0.9,
        size: 1,
      },
    ],
  });

  assert.equal(project.cues?.length, 1);
  assert.equal(project.cues?.[0].startTime, 0.5);
  assert.equal(project.cues?.[0].track, 'launcher-1');
});
