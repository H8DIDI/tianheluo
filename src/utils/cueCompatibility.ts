import type { ChoreographyCue, Cue, FireworkEffect, Project } from '../types/domain';

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function mapCuePatternToType(pattern: string): FireworkEffect['type'] {
  const key = pattern.trim().toLowerCase();
  if (key.includes('willow')) return 'willow';
  if (key.includes('chrysanthemum') || key.includes('mum')) return 'chrysanthemum';
  if (key.includes('crossette') || key.includes('spark')) return 'crossette';
  if (key.includes('peony') || key.includes('ring')) return 'peony';
  if (key.includes('fountain')) return 'fountain';
  if (key.includes('comet')) return 'comet';
  if (key.includes('mine')) return 'mine';
  return 'burst';
}

function buildLegacyCueEffect(cue: ChoreographyCue): FireworkEffect {
  const type = mapCuePatternToType(cue.pattern ?? 'burst');
  const intensity = clamp(cue.intensity ?? 0.9, 0.1, 1);
  const size = clamp(cue.size ?? 1, 0.5, 2);
  const particleCount = Math.max(30, Math.round(120 * intensity * size));
  const duration = Math.max(0.6, cue.hangTime ?? 2.2);
  const height = Math.min(cue.debug?.targetPoint?.z ?? 90, 500);
  const trailLength =
    type === 'willow' ? 0.9 : type === 'chrysanthemum' ? 0.75 : type === 'crossette' ? 0.55 : 0.4;
  const spread = type === 'comet' ? 120 : 360;

  return {
    id: `cue-${cue.id}`,
    name: cue.pattern || 'Cue Burst',
    type,
    color: cue.color || '#F59E0B',
    height,
    duration,
    intensity,
    particleCount,
    spread,
    trailLength,
  };
}

export function deriveLegacyCuesFromCueList(cueList?: ChoreographyCue[]): Cue[] {
  if (!cueList || cueList.length === 0) return [];

  return cueList.map((cue) => ({
    id: cue.id,
    name: cue.pattern || 'Cue Burst',
    position: cue.launcherPos,
    effect: buildLegacyCueEffect(cue),
    startTime: cue.launchTime,
    track: cue.launcherId,
  }));
}

export function syncProjectCueCompatibility(project: Project): Project {
  if (project.cueList && project.cueList.length > 0) {
    return {
      ...project,
      cues: deriveLegacyCuesFromCueList(project.cueList),
    };
  }

  return {
    ...project,
    cues: project.cues ?? [],
    cueList: project.cueList ?? [],
  };
}
