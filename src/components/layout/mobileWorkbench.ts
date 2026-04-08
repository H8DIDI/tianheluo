export type MobileWorkbenchPanel = 'stage' | 'timeline' | 'map' | 'assistant';

export type MobileWorkbenchTab = {
  id: MobileWorkbenchPanel;
  label: string;
};

export function getMobileWorkbenchTabs({ hasAssistant }: { hasAssistant: boolean }) {
  const tabs: MobileWorkbenchTab[] = [
    { id: 'stage', label: '烟花' },
    { id: 'timeline', label: '时间轴' },
    { id: 'map', label: '阵地' },
  ];

  if (hasAssistant) {
    tabs.push({ id: 'assistant', label: 'AI' });
  }

  return tabs;
}

export function getMobileWorkbenchSheetTitle(panel: Exclude<MobileWorkbenchPanel, 'stage'>) {
  switch (panel) {
    case 'timeline':
      return '时间轴';
    case 'map':
      return '阵地编辑';
    case 'assistant':
      return 'AI 助理';
  }
}
