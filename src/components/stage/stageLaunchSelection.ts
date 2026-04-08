import type { QuickLaunchPreset } from './quickLaunch.ts';

export type StageTapLaunchMode =
  | { mode: 'library'; selectedEffectId: string }
  | { mode: 'preset'; preset: QuickLaunchPreset };

export function resolveStageTapLaunchMode(params: {
  quickLaunchMode: 'preset' | 'library';
  selectedEffectId: string | null;
  quickLaunchPreset: QuickLaunchPreset;
}): StageTapLaunchMode {
  if (params.quickLaunchMode === 'library' && params.selectedEffectId) {
    return { mode: 'library', selectedEffectId: params.selectedEffectId };
  }

  return { mode: 'preset', preset: params.quickLaunchPreset };
}
