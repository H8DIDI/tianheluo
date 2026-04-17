import { useEffect, useState } from 'react';
import { ExternalLink, Newspaper } from 'lucide-react';
import { PageHero, SectionWrap } from '../components/PageScaffold';

type NewsItem = {
  id: string;
  source: string;
  source_name?: string;
  title: string;
  summary?: string;
  url: string;
  published_at?: number;
  tags?: string[];
};

const mock: NewsItem[] = [
  {
    id: 'n1',
    source: 'liuyang',
    source_name: '浏阳发布',
    title: '浏阳花炮产业集群 2025 年产值预计突破 520 亿元',
    summary: '据浏阳市工信局披露，2025 年全市花炮全链条产值预计同比增长 4.2%，出口规模稳居全国第一。',
    url: '#',
    published_at: Date.parse('2026-04-12') / 1000,
    tags: ['产业数据', '浏阳'],
  },
];

function fmtDate(ts?: number) {
  if (!ts) return '';
  const d = new Date(ts * 1000);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function News() {
  const [items, setItems] = useState<NewsItem[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/news?limit=50')
      .then((r) => r.json())
      .then((d) => setItems((d.items || []).length ? d.items : mock))
      .catch(() => setItems(mock))
      .finally(() => setLoading(false));
  }, []);

  const list = items || [];

  return (
    <>
      <PageHero
        eyebrow={<><Newspaper size={11} /> 关键词订阅</>}
        title="浏阳花炮 · 最新资讯"
        subtitle={
          <>
            追踪关键词：
            <code className="ml-1 rounded bg-white/[0.08] px-1.5 py-0.5 font-mono text-[12.5px] text-white/85">浏阳花炮</code>{' '}
            <code className="rounded bg-white/[0.08] px-1.5 py-0.5 font-mono text-[12.5px] text-white/85">烟花产业</code>{' '}
            <code className="rounded bg-white/[0.08] px-1.5 py-0.5 font-mono text-[12.5px] text-white/85">花炮出口</code>
            。仅展示标题与摘要，点击跳转原站。
          </>
        }
        tone="sky"
      />
      <SectionWrap>
        <div className="space-y-3.5">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-32 animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.02]" />
            ))
          ) : list.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/[0.12] p-12 text-center text-white/45">
              暂无匹配资讯，抓取管线正在对接更多信源。
            </div>
          ) : (
            list.map((n) => (
              <a
                key={n.id}
                href={n.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group block rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:shadow-[0_20px_40px_-24px_rgba(245,158,11,0.25)] sm:p-6"
              >
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="rounded-md bg-amber-400/10 px-2 py-0.5 font-medium text-amber-300 ring-1 ring-inset ring-amber-400/25">
                    {n.source_name || n.source}
                  </span>
                  <span className="font-mono tabular-nums text-white/40">{fmtDate(n.published_at)}</span>
                </div>
                <h3 className="mt-3 text-[18px] font-semibold leading-snug text-white transition-colors group-hover:text-amber-200 sm:text-[20px]">
                  {n.title}
                </h3>
                {n.summary && (
                  <p className="mt-2 line-clamp-2 text-[13.5px] leading-relaxed text-white/60">{n.summary}</p>
                )}
                <div className="mt-4 flex items-center justify-between">
                  {n.tags && n.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {n.tags.slice(0, 5).map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-white/[0.06] px-2 py-0.5 text-[11px] text-white/60 ring-1 ring-inset ring-white/[0.04]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span />
                  )}
                  <span className="flex shrink-0 items-center gap-1 text-[12px] text-white/45 transition-colors group-hover:text-amber-300">
                    阅读原文 <ExternalLink size={12} />
                  </span>
                </div>
              </a>
            ))
          )}
        </div>
      </SectionWrap>
    </>
  );
}
