import type { FireworkEffect } from '../../types/domain';

export type ShapeBurstPattern = 'ring' | 'heart' | 'star';

export function buildShapeBurstPattern(
  pattern: ShapeBurstPattern,
  count: number,
  scale: number
): Array<[number, number, number]> {
  if (pattern === 'star') {
    return Array.from({ length: count }, (_, index) => {
      const angle = (index / count) * Math.PI * 2;
      const radius = index % 2 === 0 ? scale : scale * 0.42;
      return [Math.cos(angle) * radius, Math.sin(angle) * radius, 0];
    });
  }

  if (pattern === 'heart') {
    return Array.from({ length: count }, (_, index) => {
      const t = (index / count) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);
      return [x * scale * 0.08, (y - 2) * scale * 0.08, 0];
    });
  }

  return Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * Math.PI * 2;
    return [Math.cos(angle) * scale, 0, Math.sin(angle) * scale];
  });
}

export function buildShapeQuickLaunchEffect(
  pattern: ShapeBurstPattern,
  id: string
): FireworkEffect {
  return {
    id,
    name: pattern === 'ring' ? 'Shape Ring' : pattern === 'heart' ? 'Shape Heart' : 'Shape Star',
    type: 'burst',
    color: pattern === 'ring' ? '#FDE047' : pattern === 'heart' ? '#F472B6' : '#60A5FA',
    height: 100,
    duration: pattern === 'ring' ? 1.9 : pattern === 'heart' ? 2.2 : 2,
    intensity: 1,
    particleCount: pattern === 'ring' ? 140 : pattern === 'heart' ? 180 : 160,
    spread: 360,
    trailLength: 0.55,
    shapePattern: pattern,
  };
}
