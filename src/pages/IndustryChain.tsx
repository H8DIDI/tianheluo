type Node = { id: string; label: string; desc?: string };

const upstream: Node[] = [
  { id: 'u1', label: '原料', desc: '硝酸钾 · 氯酸钾 · 金属盐（锶/钡/铜/钠）· 引线 · 纸筒' },
  { id: 'u2', label: '模具与设备', desc: '压模机 · 装药机 · 自动引线机' },
];
const midstream: Node[] = [
  { id: 'm1', label: '引信与药剂', desc: '起爆药 · 发射药 · 效果药' },
  { id: 'm2', label: '组装与制造', desc: '单发类 · 组合类 · 架子烟花 · 显示类' },
  { id: 'm3', label: '检测与认证', desc: 'CE · UN · 国标 GB 10631 · 出口许可' },
];
const downstream: Node[] = [
  { id: 'd1', label: '国内销售', desc: '零售 · 节庆批发 · 政府采购' },
  { id: 'd2', label: '国际出口', desc: '东南亚 · 欧盟 · 北美 · 中东 · 拉美' },
  { id: 'd3', label: '秀演与文创', desc: '烟花秀策划 · 主题公园 · 影视特效' },
  { id: 'd4', label: '数字化与服务', desc: '3D 编排 · 安全培训 · 物流仓储' },
];

const colors = {
  upstream: { label: 'text-sky-300', dot: 'bg-sky-400', shadow: 'hover:shadow-[0_0_0_1px_rgba(56,189,248,0.25)]' },
  mid: { label: 'text-amber-300', dot: 'bg-amber-400', shadow: 'hover:shadow-[0_0_0_1px_rgba(245,158,11,0.25)]' },
  down: { label: 'text-fuchsia-300', dot: 'bg-fuchsia-400', shadow: 'hover:shadow-[0_0_0_1px_rgba(232,121,249,0.25)]' },
};

function Column({ title, items, theme }: { title: string; items: Node[]; theme: keyof typeof colors }) {
  const c = colors[theme];
  return (
    <div className="flex-1">
      <div className={`mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider ${c.label}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
        {title}
      </div>
      <div className="space-y-3">
        {items.map((n) => (
          <div
            key={n.id}
            className={`group rounded-lg border border-white/[0.08] bg-neutral-900/40 p-3.5 transition-all hover:-translate-y-0.5 hover:border-white/20 ${c.shadow}`}
          >
            <div className="text-[14px] font-semibold text-neutral-100">{n.label}</div>
            {n.desc && <div className="mt-1 text-[12px] leading-relaxed text-neutral-400">{n.desc}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function IndustryChain() {
  return (
    <div className="space-y-10">
      <section>
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/5 px-3 py-1 text-[11px] font-medium text-amber-300">
          产业全景
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-neutral-50 sm:text-4xl">
          浏阳花炮 · 完整产业链
        </h1>
        <p className="mt-2 max-w-3xl text-[14.5px] leading-relaxed text-neutral-400">
          上游原料与装备 · 中游药剂与组装 · 下游流通与应用。2025 年浏阳花炮产业年产值突破{' '}
          <strong className="text-amber-300">500 亿元</strong>，
          规上企业 <strong className="text-amber-300">431</strong> 家，专利{' '}
          <strong className="text-amber-300">3721</strong> 项，出口覆盖{' '}
          <strong className="text-amber-300">100+</strong> 国家。
        </p>
      </section>

      <section className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.02] to-transparent p-6 sm:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-stretch">
          <Column title="🧪 上游" items={upstream} theme="upstream" />
          <div className="hidden items-center text-neutral-600 md:flex">
            <span className="font-mono text-2xl">→</span>
          </div>
          <Column title="🏭 中游" items={midstream} theme="mid" />
          <div className="hidden items-center text-neutral-600 md:flex">
            <span className="font-mono text-2xl">→</span>
          </div>
          <Column title="🚀 下游" items={downstream} theme="down" />
        </div>
      </section>

      <section className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.02] p-4 text-[12.5px] leading-relaxed text-neutral-500">
        规划：后续接入 <code className="rounded bg-white/5 px-1 font-mono text-[11px]">React Flow</code>{' '}
        做成可交互节点图，每个节点可点击查看代表企业与近期动态。
      </section>
    </div>
  );
}
