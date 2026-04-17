import { useEffect, useState } from 'react';
import { TrendingUp, Database, Activity, Rss } from 'lucide-react';

type Stats = {
  videos: number;
  news: number;
  sources: number;
  last_fetch_at: number | null;
  industry: {
    annual_output: string;
    annual_output_unit: string;
    above_scale_companies: number;
    patents: number;
    export_countries: string;
  };
};

export default function Data() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch('/api/stats').then((r) => r.json()).then(setStats).catch(() => {});
  }, []);

  const industry = stats?.industry;
  const kpis = [
    { label: '产业年产值', value: industry?.annual_output ?? '508.9', unit: industry?.annual_output_unit ?? '亿元', note: '2024 年', icon: TrendingUp, tone: 'amber' },
    { label: '规上企业', value: String(industry?.above_scale_companies ?? 431), unit: '家', note: '浏阳片区', icon: Database, tone: 'sky' },
    { label: '相关专利', value: String(industry?.patents ?? 3721), unit: '项', note: '近十年累计', icon: Activity, tone: 'emerald' },
    { label: '出口国家', value: industry?.export_countries ?? '100+', unit: '国', note: '常年稳定', icon: Rss, tone: 'fuchsia' },
  ];

  const toneMap: Record<string, { text: string; bg: string; ring: string }> = {
    amber: { text: 'text-amber-300', bg: 'bg-amber-400/5', ring: 'ring-amber-400/20' },
    sky: { text: 'text-sky-300', bg: 'bg-sky-400/5', ring: 'ring-sky-400/20' },
    emerald: { text: 'text-emerald-300', bg: 'bg-emerald-400/5', ring: 'ring-emerald-400/20' },
    fuchsia: { text: 'text-fuchsia-300', bg: 'bg-fuchsia-400/5', ring: 'ring-fuchsia-400/20' },
  };

  const pipeline = [
    { label: '已抓视频', value: stats?.videos ?? '—' },
    { label: '已抓资讯', value: stats?.news ?? '—' },
    { label: '启用信源', value: stats?.sources ?? '—' },
    {
      label: '最近拉取',
      value: stats?.last_fetch_at
        ? new Date(stats.last_fetch_at * 1000).toLocaleString('zh-CN', { hour12: false })
        : '—',
    },
  ];

  return (
    <div className="space-y-10">
      <section>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-[11px] font-medium text-emerald-300">
          <TrendingUp size={11} /> 产业指标
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-neutral-50 sm:text-4xl">
          产业数据 · 企业名录
        </h1>
        <p className="mt-2 max-w-3xl text-[14.5px] leading-relaxed text-neutral-400">
          宏观数据来源：浏阳市统计公报、湖南省工信厅及公开年报。
          企业名录后续将从公开政府数据源和商业 API 抓取更新，支持按主营、资质、出口能力筛选。
        </p>
      </section>

      <section>
        <div className="mb-3 flex items-center gap-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">核心指标</h2>
          <div className="h-px flex-1 bg-white/5" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((s) => {
            const tone = toneMap[s.tone];
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className={`group rounded-xl border border-white/[0.08] bg-neutral-900/40 p-5 transition-all hover:-translate-y-0.5 hover:border-white/20`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-500">{s.label}</span>
                  <span className={`rounded-md ${tone.bg} p-1 ${tone.text} ring-1 ring-inset ${tone.ring}`}>
                    <Icon size={14} />
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className={`text-3xl font-bold tabular-nums ${tone.text}`}>{s.value}</span>
                  <span className="text-sm text-neutral-500">{s.unit}</span>
                </div>
                <div className="mt-1 text-[11px] text-neutral-600">{s.note}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center gap-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">数据管线状态</h2>
          <div className="h-px flex-1 bg-white/5" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pipeline.map((p) => (
            <div key={p.label} className="rounded-xl border border-white/[0.08] bg-neutral-900/40 p-4">
              <div className="text-xs text-neutral-500">{p.label}</div>
              <div className="mt-1.5 text-[17px] font-semibold tabular-nums text-neutral-100">{p.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">企业名录</h2>
          <span className="text-xs text-neutral-500">占位 · 政府公开数据源接入中</span>
        </div>
        <div className="overflow-hidden rounded-xl border border-white/[0.08]">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] text-left text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="px-4 py-3">名称</th>
                <th className="px-4 py-3">类型</th>
                <th className="px-4 py-3">地区</th>
                <th className="px-4 py-3">状态</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/5 text-neutral-400">
                <td colSpan={4} className="px-4 py-6 text-center text-neutral-500">
                  API 对接后将展示规上企业、资质、出口能力等信息
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
