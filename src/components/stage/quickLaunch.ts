export type QuickLaunchSource = 'stage-tap' | 'quick-button';

export type QuickLaunchRequest = {
  id: string;
  world: [number, number, number];
  source: QuickLaunchSource;
};

export function getQuickLaunchWorldPoint(point: [number, number, number]): [number, number, number] {
  return [point[0], 0, point[2]];
}

export function createQuickLaunchRequest(
  world: [number, number, number],
  source: QuickLaunchSource
): QuickLaunchRequest {
  return {
    id: `quick-launch-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    world,
    source,
  };
}
