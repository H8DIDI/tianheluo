import type { BurstPatternId } from './burstPatterns.ts';
import { resolveBurstPatternMeta } from './burstPatterns.ts';

export type QuickLaunchSource = 'stage-tap' | 'quick-button';

export type QuickLaunchPreset =
  | 'peony'
  | 'willow'
  | 'comet'
  | 'ring'
  | 'heart'
  | 'star'
  | 'diamond'
  | 'butterfly'
  | 'text-love'
  | 'text-520'
  | 'text-custom';

export type QuickLaunchRequest = {
  id: string;
  world: [number, number, number];
  source: QuickLaunchSource;
  preset: QuickLaunchPreset;
  customLabel?: string;
};

export type QuickLaunchEffect = {
  id: string;
  name: string;
  type: 'peony' | 'willow' | 'comet' | 'burst';
  color: string;
  height: number;
  duration: number;
  intensity: number;
  particleCount: number;
  spread: number;
  trailLength: number;
  burstPattern?: BurstPatternId;
  burstLabel?: string;
};

export type QuickLaunchBurstProfile = {
  launchOffsetZ: number;
  burstHeight: number;
  burstDelay: number;
};

const QUICK_LAUNCH_PRESET_COLORS: Record<QuickLaunchPreset, string[]> = {
  peony: ['#F59E0B', '#EF4444', '#FDE047'],
  willow: ['#FDE68A', '#FBBF24', '#F59E0B'],
  comet: ['#60A5FA', '#C084FC', '#F472B6'],
  ring: ['#FDE047', '#F59E0B', '#FFFFFF'],
  heart: ['#F472B6', '#FB7185', '#FCA5A5'],
  star: ['#60A5FA', '#93C5FD', '#FDE68A'],
  diamond: ['#22D3EE', '#38BDF8', '#E0F2FE'],
  butterfly: ['#C084FC', '#F472B6', '#FDE68A'],
  'text-love': ['#FB7185', '#F472B6', '#F9A8D4'],
  'text-520': ['#60A5FA', '#818CF8', '#C084FC'],
  'text-custom': ['#F59E0B', '#FDE047', '#FB7185'],
};

const BURST_PRESET_CONFIG: Record<
  Extract<QuickLaunchPreset, 'ring' | 'heart' | 'star' | 'diamond' | 'butterfly' | 'text-love' | 'text-520'>,
  {
    name: string;
    height: number;
    duration: number;
    particleCount: number;
    trailLength: number;
    burstPattern: BurstPatternId;
  }
> = {
  ring: { name: 'Quick Ring', height: 132, duration: 2.35, particleCount: 260, trailLength: 0.66, burstPattern: 'ring' },
  heart: { name: 'Quick Heart', height: 138, duration: 2.6, particleCount: 300, trailLength: 0.7, burstPattern: 'heart' },
  star: { name: 'Quick Star', height: 136, duration: 2.45, particleCount: 280, trailLength: 0.68, burstPattern: 'star' },
  diamond: { name: 'Quick Diamond', height: 140, duration: 2.5, particleCount: 300, trailLength: 0.7, burstPattern: 'diamond' },
  butterfly: { name: 'Quick Butterfly', height: 146, duration: 2.8, particleCount: 340, trailLength: 0.76, burstPattern: 'butterfly' },
  'text-love': { name: 'Quick LOVE', height: 142, duration: 2.8, particleCount: 340, trailLength: 0.74, burstPattern: 'text-love' },
  'text-520': { name: 'Quick 520', height: 140, duration: 2.7, particleCount: 320, trailLength: 0.72, burstPattern: 'text-520' },
};

export function buildQuickLaunchTextLabel(value: string) {
  const normalized = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4);
  return normalized.length > 0 ? normalized : 'YHL';
}

function createOffsetWorld(
  center: [number, number, number],
  offsetX: number,
  offsetZ: number
): [number, number, number] {
  return [center[0] + offsetX, 0, center[2] + offsetZ];
}

export function getQuickLaunchWorldPoint(point: [number, number, number]): [number, number, number] {
  return [point[0], 0, point[2]];
}

export function getQuickLaunchLaunchPoint(point: [number, number, number]): [number, number, number] {
  return [point[0], 0, point[2] - 42];
}

export function getQuickLaunchBurstProfile(preset: QuickLaunchPreset): QuickLaunchBurstProfile {
  switch (preset) {
    case 'willow':
      return { launchOffsetZ: 42, burstHeight: 42, burstDelay: 1.55 };
    case 'comet':
      return { launchOffsetZ: 38, burstHeight: 32, burstDelay: 1.05 };
    case 'text-love':
    case 'text-520':
    case 'text-custom':
      return { launchOffsetZ: 42, burstHeight: 38, burstDelay: 1.35 };
    default:
      return { launchOffsetZ: 42, burstHeight: 34, burstDelay: 1.2 };
  }
}

export function createQuickLaunchRequest(
  world: [number, number, number],
  source: QuickLaunchSource,
  preset: QuickLaunchPreset = 'peony',
  customLabel?: string
): QuickLaunchRequest {
  return {
    id: `quick-launch-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    world,
    source,
    preset,
    customLabel: preset === 'text-custom' ? buildQuickLaunchTextLabel(customLabel ?? '') : undefined,
  };
}

export function buildQuickLaunchEffect(
  preset: QuickLaunchPreset,
  id: string,
  customLabel?: string
): QuickLaunchEffect {
  const colors = QUICK_LAUNCH_PRESET_COLORS[preset];
  const color = colors[Math.floor(Math.random() * colors.length)];

  if (preset === 'text-custom') {
    const burstLabel = buildQuickLaunchTextLabel(customLabel ?? '');
    return {
      id,
      name: `Quick ${burstLabel}`,
      type: 'burst',
      color,
      height: 138,
      duration: 2.8,
      intensity: 1,
      particleCount: 320,
      spread: 360,
      trailLength: 0.68,
      burstPattern: 'text-custom',
      burstLabel,
    };
  }

  if (preset === 'willow') {
    return {
      id,
      name: 'Quick Willow',
      type: 'willow',
      color,
      height: 152,
      duration: 3.4,
      intensity: 1,
      particleCount: 320,
      spread: 360,
      trailLength: 1.1,
    };
  }

  if (preset === 'comet') {
    return {
      id,
      name: 'Quick Comet',
      type: 'comet',
      color,
      height: 128,
      duration: 1.9,
      intensity: 1,
      particleCount: 180,
      spread: 120,
      trailLength: 0.9,
    };
  }

  if (preset in BURST_PRESET_CONFIG) {
    const config = BURST_PRESET_CONFIG[preset as keyof typeof BURST_PRESET_CONFIG];
    const patternMeta = resolveBurstPatternMeta(config.burstPattern);
    return {
      id,
      name: config.name,
      type: 'burst',
      color,
      height: config.height,
      duration: config.duration,
      intensity: 1,
      particleCount: config.particleCount,
      spread: 360,
      trailLength: config.trailLength,
      burstPattern: config.burstPattern,
      burstLabel: patternMeta.kind === 'text' ? patternMeta.label : undefined,
    };
  }

  return {
    id,
    name: 'Quick Peony',
    type: 'peony',
    color,
    height: 132,
    duration: 2.3,
    intensity: 1,
    particleCount: 280,
    spread: 360,
    trailLength: 0.62,
  };
}

export function createQuickLaunchSalvoRequests(
  center: [number, number, number],
  preset: QuickLaunchPreset,
  customLabel?: string
) {
  const offsets: Array<[number, number]> = [
    [-16, -6],
    [-8, -2],
    [0, 0],
    [8, -2],
    [16, -6],
  ];

  return offsets.map(([offsetX, offsetZ]) =>
    createQuickLaunchRequest(createOffsetWorld(center, offsetX, offsetZ), 'quick-button', preset, customLabel)
  );
}

export function createQuickLaunchRandomShowRequests(preset: QuickLaunchPreset, customLabel?: string) {
  return Array.from({ length: 8 }, (_, index) => {
    const x = -60 + ((index * 17) % 120);
    const z = -60 + ((index * 11) % 80);
    return createQuickLaunchRequest([x, 0, z], 'quick-button', preset, customLabel);
  });
}

export function createQuickLaunchFinaleRequests(center: [number, number, number]) {
  const finalePlan: Array<{ offsetX: number; offsetZ: number; preset: QuickLaunchPreset }> = [
    { offsetX: -28, offsetZ: -10, preset: 'ring' },
    { offsetX: -18, offsetZ: -6, preset: 'diamond' },
    { offsetX: -8, offsetZ: -2, preset: 'text-love' },
    { offsetX: 0, offsetZ: 0, preset: 'text-520' },
    { offsetX: 8, offsetZ: -2, preset: 'star' },
    { offsetX: 18, offsetZ: -6, preset: 'butterfly' },
    { offsetX: 28, offsetZ: -10, preset: 'heart' },
    { offsetX: -10, offsetZ: -14, preset: 'willow' },
    { offsetX: 10, offsetZ: -14, preset: 'willow' },
  ];

  return finalePlan.map(({ offsetX, offsetZ, preset }) =>
    createQuickLaunchRequest(createOffsetWorld(center, offsetX, offsetZ), 'quick-button', preset)
  );
}
