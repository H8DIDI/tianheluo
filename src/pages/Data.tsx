import { useEffect, useState } from 'react';
import { TrendingUp, Activity, Rss, Building2 } from 'lucide-react';
import { PageHero, SectionWrap, SectionHeader } from '../components/PageScaffold';

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
    { label: '产业年产值', value: industry?.annual_output ?? '508.9', unit: industry?.annual_output_unit ?? '亿元', note: '2024 年', icon: TrendingUp, tone: 'amber' as const },
    { label: '规上企业', value: String(industry?.above_scale_companies ?? 431), unit: '家', note: '浏阳片区', icon: Building2, tone: 'sky' as const },
    { label: '相关专利', value: String(industry?.patents ?? 3721), unit: '项', note: '近十年累计', icon: Activity, tone: 'emerald' as const },
    { label: '出口国家', value: industry?.export_countries ?? '100+', unit: '国', note: '常年稳定', icon: Rss, tone: 'fuchsia' as const },
  ];

  const toneMap = {
    amber: { text: 'text-amber-300', ring: 'ring-amber-400/20', bg: 'bg-amber-400/10' },
    sky: { text: 'text-sky-300', ring: 'ring-sky-400/20', bg: 'bg-sky-400/10' },
    emerald: { text: 'text-emerald-300', ring: 'ring-emerald-400/20', bg: 'bg-emerald-400/10' },
    fuchsia: { text: 'text-fuchsia-300', ring: 'ring-fuchsia-400/20', bg: 'bg-fuchsia-400/10' },
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
    <>
      <PageHero
        eyebrow={<><TrendingUp size={11} /> 产业指标</>}
        title="产业数据 · 企业名录"
        subtitle="宏观数据来源于浏阳市统计公报、湖南省工信厅及公开年报。企业名录后续将从公开政府数据源和商业 API 抓取更新。"
        tone="emerald"
      />
      <SectionWrap>
        <SectionHeader eyebrow="Core" title="核心指标" />
        <div className="mt-8 grid gap-4 grid-cols-2 lg:grid-cols-4">
          {kpis.map((s) => {
            const tone = toneMap[s.tone];
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-5 transition-all hover:-translate-y-0.5 hover:border-white/15 sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-medium text-white/45">{s.label}</span>
                  <span className={`rounded-lg ${tone.bg} p-1.5 ${tone.text} ring-1 ring-inset ${tone.ring}`}>
                    <Icon size={14} />
                  </span>
                </div>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className={`number-display text-[34px] font-bold sm:text-[40px] ${tone.text}`}>{s.value}</span>
                  <span className="text-[14px] text-white/45">{s.unit}</span>
                </div>
                <div className="mt-1 text-[11.5px] text-white/35">{s.note}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-16">
          <SectionHeader eyebrow="Pipeline" title="数据管线状态" />
          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] grid-cols-2 lg:grid-cols-4">
            {pipeline.map((p) => (
              <div key={p.label} className="bg-[#0A0A0A] p-5 sm:p-6">
                <div className="text-[12px] font-medium text-white/45">{p.label}</div>
                <div className="mt-2 number-display text-[20px] font-semibold text-white sm:text-[22px]">
                  {p.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <SectionHeader
            eyebrow="Companies"
            title="企业名录"
            right={<span className="text-[12px] text-white/45">API 对接中</span>}
          />
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/[0.08]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-sm">
                <thead className="bg-white/[0.03]">
                  <tr className="label-caps text-white/40">
                    <th className="px-5 py-3.5 text-left">名称</th>
                    <th className="px-5 py-3.5 text-left">类型</th>
                    <th className="px-5 py-3.5 text-left">地区</th>
                    <th className="px-5 py-3.5 text-left">状态</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-white/[0.06]">
                    <td colSpan={4} className="px-5 py-10 text-center text-[13px] text-white/40">
                      API 对接后将展示规上企业、资质、出口能力等信息
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </SectionWrap>
    </>
  );
}
