import { useEffect, useState } from 'react';

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
  {
    id: 'n2',
    source: 'yicai',
    source_name: '第一财经',
    title: '烟花出海：东南亚订单为何集体转向湖南',
    summary: '多家业内公司反馈，今年以来东南亚节庆采购订单向浏阳、醴陵集中，头部企业排产已至 Q3。',
    url: '#',
    published_at: Date.parse('2026-04-09') / 1000,
    tags: ['出口', '产业'],
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
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => setItems((d.items || []).length ? d.items : mock))
      .catch(() => setItems(mock))
      .finally(() => setLoading(false));
  }, []);

  const list = items || [];
  const usingMock = items === mock;

  return (
    <div className="space-y-6">
      <section>
        <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
          <h1 className="text-2xl font-bold tracking-tight">浏阳花炮 · 最新资讯</h1>
          <span className="text-xs text-neutral-500">
            {loading ? '加载中…' : usingMock ? '展示为样例内容（真实数据对接中）' : `${list.length} 条 · 日更`}
          </span>
        </div>
        <p className="max-w-2xl text-sm text-neutral-400">
          关键词追踪："浏阳花炮" / "烟花产业" / "花炮出口" / "燃放政策"。仅展示标题与摘要，点击跳转原站。
        </p>
      </section>

      <section className="space-y-3">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-lg bg-white/[0.04]" />
          ))
        ) : list.length === 0 ? (
          <div className="rounded-lg border border-dashed border-white/10 p-8 text-center text-sm text-neutral-500">
            暂无匹配资讯，抓取管线正在对接更多信源。
          </div>
        ) : (
          list.map((n) => (
            <a
              key={n.id}
              href={n.url}
              target="_blank"
              rel="noreferrer noopener"
              className="block rounded-lg border border-white/10 bg-white/[0.03] p-4 transition-all hover:-translate-y-0.5 hover:border-amber-400/40 hover:bg-white/[0.06]"
            >
              <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                <span className="rounded bg-amber-500/10 px-1.5 py-0.5 text-amber-300">
                  {n.source_name || n.source}
                </span>
                <span>{fmtDate(n.published_at)}</span>
              </div>
              <h3 className="mt-2 text-base font-semibold text-neutral-100">{n.title}</h3>
              {n.summary && (
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-neutral-400">{n.summary}</p>
              )}
              {n.tags && n.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {n.tags.slice(0, 5).map((t) => (
                    <span key={t} className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-neutral-400">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </a>
          ))
        )}
      </section>
    </div>
  );
}
