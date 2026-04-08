import type { Position, Rack, Tube } from '../../types/domain';

type ScheduledFireLike = {
  positionId: string;
  rackId: string;
  tubeIndex: number;
};

type FireLaunchTransform = {
  position: [number, number, number];
  direction: [number, number, number];
};

type EventPlaybackParams = {
  fireItem: ScheduledFireLike;
  positions: Position[];
  firedTubeIds: Set<string>;
  findTransform: (position: Position, rack: Rack, tube: Tube) => FireLaunchTransform;
  fireTube: (positionId: string, rackId: string, tubeIndex: number) => void;
  spawnFireworkFromTube: (
    tubePos: [number, number, number],
    tubeDir: [number, number, number],
    effect: NonNullable<Tube['effect']>
  ) => void;
  reportAmmoExhausted: () => void;
};

function findPositionAndRack(positions: Position[], positionId: string, rackId: string) {
  const position = positions.find((pos) => pos.id === positionId);
  if (!position) return { position: undefined, rack: undefined };
  const rack = position.racks.find((item) => item.id === rackId);
  return { position, rack };
}

function selectAvailableTube(
  rack: Rack,
  preferredIndex: number,
  firedTubeIds: Set<string>
) {
  const count = rack.tubes.length;
  if (count === 0) return undefined;
  const normalizedIndex = ((preferredIndex % count) + count) % count;
  for (let offset = 0; offset < count; offset++) {
    const idx = (normalizedIndex + offset) % count;
    const candidate = rack.tubes[idx];
    if (
      candidate &&
      candidate.loaded &&
      candidate.effect &&
      !candidate.isFired &&
      !firedTubeIds.has(candidate.id)
    ) {
      return candidate;
    }
  }
  return undefined;
}

export function playScheduledEventFire({
  fireItem,
  positions,
  firedTubeIds,
  findTransform,
  fireTube,
  spawnFireworkFromTube,
  reportAmmoExhausted,
}: EventPlaybackParams) {
  const { position, rack } = findPositionAndRack(
    positions,
    fireItem.positionId,
    fireItem.rackId
  );
  if (!position || !rack) return;

  const candidateTube = selectAvailableTube(rack, fireItem.tubeIndex, firedTubeIds);
  if (!candidateTube) {
    reportAmmoExhausted();
    return;
  }

  if (firedTubeIds.has(candidateTube.id) || !candidateTube.effect) return;

  const transform = findTransform(position, rack, candidateTube);
  firedTubeIds.add(candidateTube.id);
  fireTube(position.id, rack.id, candidateTube.index);
  spawnFireworkFromTube(transform.position, transform.direction, candidateTube.effect);
}
