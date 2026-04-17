import { useEffect, useState } from 'react';

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
    fetch('/api/stats')
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  const industry = stats?.industry;
  const kpis = [
    { label: '产业年产值', value: industry?.annual_output ?? '508.9', unit: industry?.annual_output_unit ?? '亿元', note: '2024 年数据' },
    { label: '规上企业数', value: String(industry?.above_scale_companies ?? 431), unit: '家', note: '浏阳片区' },
    { label: '相关专利', value: String(industry?.patents ?? 3721), unit: '项', note: '近十年累计' },
    { label: '出口国家', value: industry?.export_countries ?? '100+', unit: '国', note: '常年稳定' },
  ];

  const pipeline = [
    { label: '抓取视频', value: stats?.videos ?? '—' },
    { label: '抓取资讯', value: stats?.news ?? '—' },
    { label: '启用信源', value: stats?.sources ?? '—' },
    {
      label: '最近拉取',
      value: stats?.last_fetch_at
        ? new Date(stats.last_fetch_at * 1000).toLocaleString('zh-CN', { hour12: false })
        : '—',
    },
  ];

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-bold tracking-tight">产业数据 · 企业名录</h1>
        <p className="mt-2 max-w-3xl text-sm text-neutral-400">
          宏观数据来源于浏阳市统计公报、湖南省工信厅及公开年报。企业名录后续将从公开政府数据源和 API 抓取更新，
          并支持按主营、资质、出口能力筛选。
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-amber-300">产业指标</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((s) => (
            <div key={s.label} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <div className="text-xs text-neutral-500">{s.label}</div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-bold text-amber-300">{s.value}</span>
                <span className="text-sm text-neutral-400">{s.unit}</span>
              </div>
              <div className="mt-1 text-[11px] text-neutral-600">{s.note}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-neutral-300">数据管线运行状态</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pipeline.map((p) => (
            <div key={p.label} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <div className="text-xs text-neutral-500">{p.label}</div>
              <div className="mt-1 text-lg font-semibold text-neutral-100">{p.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-lg font-semibold">企业名录</h2>
          <span className="text-xs text-neutral-500">占位 · 政府公开数据源接入中</span>
        </div>
        <div className="overflow-hidden rounded-lg border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.04] text-left text-xs uppercase tracking-wider text-neutral-400">
              <tr>
                <th className="px-4 py-2">名称</th>
                <th className="px-4 py-2">类型</th>
                <th className="px-4 py-2">地区</th>
                <th className="px-4 py-2">状态</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/5 text-neutral-300">
                <td colSpan={4} className="px-4 py-4 text-center text-neutral-500">
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
