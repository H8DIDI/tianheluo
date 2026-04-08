import test from 'node:test';
import assert from 'node:assert/strict';

import { playScheduledEventFire } from '../src/components/stage/stageEventPlayback.ts';

test('playScheduledEventFire fires the preferred loaded tube once', () => {
  const fired = new Set<string>();
  const calls: string[] = [];

  playScheduledEventFire({
    fireItem: { positionId: 'pos-1', rackId: 'rack-1', tubeIndex: 0 },
    positions: [
      {
        id: 'pos-1',
        name: 'P1',
        coordinate: { x: 0, y: 0, z: 0 },
        color: '#fff',
        racks: [
          {
            id: 'rack-1',
            name: 'R1',
            type: 'straight',
            rotation: 0,
            tubeCount: 2,
            tubes: [
              {
                id: 'tube-1',
                index: 0,
                angle: 0,
                tilt: 90,
                loaded: true,
                isFired: false,
                effect: {
                  id: 'effect-1',
                  name: 'Burst',
                  type: 'burst',
                  color: '#ff0',
                  height: 100,
                  duration: 2,
                  intensity: 1,
                  particleCount: 100,
                  spread: 360,
                  trailLength: 0.4,
                },
              },
              {
                id: 'tube-2',
                index: 1,
                angle: 0,
                tilt: 90,
                loaded: false,
                isFired: false,
                effect: null,
              },
            ],
          },
        ],
      },
    ],
    firedTubeIds: fired,
    findTransform: () => ({ position: [1, 2, 3], direction: [0, 1, 0] }),
    fireTube: (_positionId, _rackId, tubeIndex) => calls.push(`fire:${tubeIndex}`),
    spawnFireworkFromTube: (_position, _direction, effect) => calls.push(`spawn:${effect.id}`),
    reportAmmoExhausted: () => calls.push('ammo'),
  });

  assert.deepEqual(calls, ['fire:0', 'spawn:effect-1']);
  assert.equal(fired.has('tube-1'), true);
});

test('playScheduledEventFire reports ammo exhausted when no tube is available', () => {
  const calls: string[] = [];

  playScheduledEventFire({
    fireItem: { positionId: 'pos-1', rackId: 'rack-1', tubeIndex: 0 },
    positions: [
      {
        id: 'pos-1',
        name: 'P1',
        coordinate: { x: 0, y: 0, z: 0 },
        color: '#fff',
        racks: [
          {
            id: 'rack-1',
            name: 'R1',
            type: 'straight',
            rotation: 0,
            tubeCount: 1,
            tubes: [
              {
                id: 'tube-1',
                index: 0,
                angle: 0,
                tilt: 90,
                loaded: false,
                isFired: false,
                effect: null,
              },
            ],
          },
        ],
      },
    ],
    firedTubeIds: new Set<string>(),
    findTransform: () => ({ position: [0, 0, 0], direction: [0, 1, 0] }),
    fireTube: () => calls.push('fire'),
    spawnFireworkFromTube: () => calls.push('spawn'),
    reportAmmoExhausted: () => calls.push('ammo'),
  });

  assert.deepEqual(calls, ['ammo']);
});
