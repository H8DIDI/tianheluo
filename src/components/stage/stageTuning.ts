export function clampBurstHeight(height: number, isGroundEffect: boolean) {
  if (isGroundEffect) {
    return Math.min(Math.max(height, 18), 52);
  }

  return Math.min(Math.max(height, 72), 168);
}

export function normalizeTubeDirection(
  direction: [number, number, number],
  minimumVertical = 0.45
): [number, number, number] {
  const horizontalX = direction[0];
  const horizontalZ = direction[2];
  const horizontalLength = Math.sqrt(horizontalX ** 2 + horizontalZ ** 2);
  const safeVertical = Math.max(direction[1], minimumVertical);
  const scale = horizontalLength > 0 ? Math.sqrt((1 - safeVertical ** 2)) / horizontalLength : 0;

  return [horizontalX * scale, safeVertical, horizontalZ * scale];
}
