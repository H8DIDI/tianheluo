import { Sparkles, Wand2, Zap } from 'lucide-react';
import { useProjectStore } from '../../store/projectStore';
import {
  createQuickLaunchFinaleRequests,
  createQuickLaunchRandomShowRequests,
  createQuickLaunchSalvoRequests,
} from '../stage/quickLaunch';

type QuickLaunchBarProps = {
  compact?: boolean;
};

export function QuickLaunchBar({ compact = false }: QuickLaunchBarProps) {
  const quickLaunchPreset = useProjectStore((state) => state.quickLaunchPreset);
  const quickLaunchCustomLabel = useProjectStore((state) => state.quickLaunchCustomLabel);
  const setQuickLaunchPreset = useProjectStore((state) => state.setQuickLaunchPreset);
  const setQuickLaunchCustomLabel = useProjectStore((state) => state.setQuickLaunchCustomLabel);
  const enqueueQuickLaunches = useProjectStore((state) => state.enqueueQuickLaunches);

  return (
    <div className={`rounded-2xl border border-panel-border bg-app-bg/88 backdrop-blur-md shadow-glow px-3 py-2 flex flex-col gap-2 ${compact ? '' : 'max-w-[760px]'}`}>
      <div className="min-w-0">
        <div className="text-sm font-semibold text-text-main truncate">烟花舞台</div>
        <div className="text-[11px] text-text-secondary truncate">
          点舞台直接放烟花，先玩起来，再进编排
        </div>
      </div>
      <div className={`flex items-center gap-2 ${compact ? '' : 'flex-wrap'}`}>
        <select
          value={quickLaunchPreset}
          onChange={(event) => setQuickLaunchPreset(event.target.value as typeof quickLaunchPreset)}
          className={`h-9 rounded-xl border border-panel-border bg-panel-bg px-2 text-sm text-text-main ${compact ? 'flex-1 min-w-0' : 'min-w-[180px]'}`}
        >
          <option value="peony">牡丹</option>
          <option value="willow">垂柳</option>
          <option value="comet">彗星</option>
          <option value="ring">圆环</option>
          <option value="heart">爱心</option>
          <option value="star">星形</option>
          <option value="diamond">钻石</option>
          <option value="butterfly">蝴蝶</option>
          <option value="text-love">LOVE</option>
          <option value="text-520">520</option>
          <option value="text-custom">自定义文字</option>
        </select>
        {quickLaunchPreset === 'text-custom' && (
          <input
            value={quickLaunchCustomLabel}
            onChange={(event) => setQuickLaunchCustomLabel(event.target.value.toUpperCase().slice(0, 4))}
            placeholder="输入4位内文字"
            className="h-9 w-[108px] rounded-xl border border-panel-border bg-panel-bg px-2 text-sm text-text-main"
          />
        )}
        <button
          className="h-9 rounded-xl border border-panel-border bg-panel-bg px-3 text-sm text-text-main inline-flex items-center gap-1.5 flex-shrink-0"
          onClick={() => enqueueQuickLaunches(createQuickLaunchSalvoRequests([0, 0, -8], quickLaunchPreset, quickLaunchCustomLabel))}
          title="一键齐射"
        >
          <Zap size={15} /> 齐射
        </button>
        <button
          className="h-9 rounded-xl border border-panel-border bg-panel-bg px-3 text-sm text-text-main inline-flex items-center gap-1.5 flex-shrink-0"
          onClick={() => enqueueQuickLaunches(createQuickLaunchRandomShowRequests(quickLaunchPreset, quickLaunchCustomLabel))}
          title="随机秀"
        >
          <Wand2 size={15} /> 随机秀
        </button>
        <button
          className="h-9 rounded-xl border border-panel-border bg-panel-bg px-3 text-sm text-text-main inline-flex items-center gap-1.5 flex-shrink-0"
          onClick={() => enqueueQuickLaunches(createQuickLaunchFinaleRequests([0, 0, -8]))}
          title="终场秀"
        >
          <Sparkles size={15} /> 终场秀
        </button>
      </div>
    </div>
  );
}
