export type CueShellStateInput = {
  launchPos: [number, number, number];
  velocity: [number, number, number];
  age: number;
  gravity: number;
};

export function computeCueShellPosition({
  launchPos,
  velocity,
  age,
  gravity,
}: CueShellStateInput): [number, number, number] {
  const t = Math.max(0, age);
  return [
    launchPos[0] + velocity[0] * t,
    launchPos[1] + velocity[1] * t + 0.5 * gravity * t * t,
    launchPos[2] + velocity[2] * t,
  ];
}
