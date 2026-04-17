import { ChevronRight } from 'lucide-react';
import { PageHero, SectionWrap } from '../components/PageScaffold';

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

const tones = {
  up: { label: 'text-sky-300', dot: 'bg-sky-400', hover: 'hover:border-sky-400/40 hover:shadow-[0_20px_40px_-24px_rgba(56,189,248,0.35)]' },
  mid: { label: 'text-amber-300', dot: 'bg-amber-400', hover: 'hover:border-amber-400/40 hover:shadow-[0_20px_40px_-24px_rgba(245,158,11,0.4)]' },
  down: { label: 'text-fuchsia-300', dot: 'bg-fuchsia-400', hover: 'hover:border-fuchsia-400/40 hover:shadow-[0_20px_40px_-24px_rgba(232,121,249,0.35)]' },
};

function Column({ title, code, items, theme }: { title: string; code: string; items: Node[]; theme: keyof typeof tones }) {
  const c = tones[theme];
  return (
    <div className="flex-1 min-w-0">
      <div className="mb-5 flex items-baseline gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
        <span className={`label-caps ${c.label}`}>{code}</span>
        <span className="text-[15px] font-bold text-white">{title}</span>
      </div>
      <div className="space-y-3">
        {items.map((n) => (
          <div
            key={n.id}
            className={`rounded-xl border border-white/[0.08] bg-[#0A0A0A] p-4 transition-all duration-200 hover:-translate-y-0.5 ${c.hover}`}
          >
            <div className="text-[15px] font-semibold text-white">{n.label}</div>
            {n.desc && <div className="mt-1.5 text-[13px] leading-relaxed text-white/55">{n.desc}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function IndustryChain() {
  return (
    <>
      <PageHero
        eyebrow="产业全景"
        title={<>浏阳花炮<br className="sm:hidden" />完整产业链</>}
        subtitle={
          <>
            上游原料与装备 · 中游药剂与组装 · 下游流通与应用。2025 年产值突破{' '}
            <strong className="text-amber-300">500 亿元</strong>，规上企业{' '}
            <strong className="text-amber-300">431</strong> 家，专利{' '}
            <strong className="text-amber-300">3,721</strong> 项，出口覆盖{' '}
            <strong className="text-amber-300">100+</strong> 国家。
          </>
        }
      />
      <SectionWrap>
        <div className="rounded-2xl border border-white/[0.08] bg-[#050505] p-5 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-6">
            <Column code="Upstream" title="🧪 上游" items={upstream} theme="up" />
            <div className="hidden shrink-0 items-center text-white/20 lg:flex">
              <ChevronRight size={28} />
            </div>
            <Column code="Midstream" title="🏭 中游" items={midstream} theme="mid" />
            <div className="hidden shrink-0 items-center text-white/20 lg:flex">
              <ChevronRight size={28} />
            </div>
            <Column code="Downstream" title="🚀 下游" items={downstream} theme="down" />
          </div>
        </div>

        <p className="mt-6 text-[13px] text-white/40">
          规划：后续接入{' '}
          <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[11.5px] text-white/75">React Flow</code>{' '}
          做成可交互节点图，每个节点可点击查看代表企业与近期动态。
        </p>
      </SectionWrap>
    </>
  );
}
