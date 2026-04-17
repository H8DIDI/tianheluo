import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';

type VideoItem = {
  id: string;
  source: 'bilibili' | 'youtube' | 'douyin' | 'web';
  title: string;
  channel_name?: string;
  url: string;
  published_at?: number;
  tags?: string[];
  featured?: number | boolean;
};

const mockVideos: VideoItem[] = [
  {
    id: 'demo-1',
    source: 'bilibili',
    title: '2026 浏阳国际花炮节｜高清全景燃放',
    channel_name: '浏阳花炮官方',
    url: 'https://www.bilibili.com/',
    published_at: Date.parse('2026-01-02') / 1000,
    tags: ['秀演', '浏阳'],
    featured: 1,
  },
  {
    id: 'demo-2',
    source: 'bilibili',
    title: '揭秘专业烟花秀的编排流程 —— 从脚本到燃放',
    channel_name: '烟花研究所',
    url: 'https://www.bilibili.com/',
    published_at: Date.parse('2026-03-11') / 1000,
    tags: ['编排', '科普'],
  },
  {
    id: 'demo-3',
    source: 'bilibili',
    title: '浏阳花炮出口东南亚：流水线与检测全记录',
    channel_name: '财经视角',
    url: 'https://www.bilibili.com/',
    published_at: Date.parse('2026-02-28') / 1000,
    tags: ['出口', '产业'],
  },
];

const sourceBadge: Record<string, { label: string; color: string }> = {
  bilibili: { label: 'B站', color: 'bg-sky-500/20 text-sky-300' },
  youtube: { label: 'YouTube', color: 'bg-red-500/20 text-red-300' },
  douyin: { label: '抖音', color: 'bg-pink-500/20 text-pink-300' },
  web: { label: 'Web', color: 'bg-neutral-500/20 text-neutral-300' },
};

function fmtDate(ts?: number) {
  if (!ts) return '';
  const d = new Date(ts * 1000);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function VideoCard({ v }: { v: VideoItem }) {
  const sb = sourceBadge[v.source] || sourceBadge.web;
  return (
    <a
      href={v.url}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex flex-col overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] transition-all hover:-translate-y-0.5 hover:border-amber-400/40 hover:bg-white/[0.06]"
    >
      <div className="relative aspect-video bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-fuchsia-500/15">
        <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-40">🎆</div>
        <span className={`absolute left-2 top-2 rounded px-1.5 py-0.5 text-[10px] font-medium ${sb.color}`}>
          {sb.label}
        </span>
        {!!v.featured && (
          <span className="absolute right-2 top-2 rounded bg-amber-400/90 px-1.5 py-0.5 text-[10px] font-semibold text-black">
            精选
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="line-clamp-2 text-sm font-medium text-neutral-100 group-hover:text-amber-300">
          {v.title}
        </h3>
        <div className="mt-auto flex items-center justify-between text-[11px] text-neutral-500">
          <span className="truncate">{v.channel_name || '—'}</span>
          <span>{fmtDate(v.published_at)}</span>
        </div>
        {v.tags && v.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {v.tags.slice(0, 4).map((t) => (
              <span key={t} className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-neutral-400">
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}

export default function Home() {
  const [videos, setVideos] = useState<VideoItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetch('/api/videos?limit=40')
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => {
        if (!alive) return;
        const items: VideoItem[] = (d.items || []).map((x: VideoItem) => ({
          ...x,
          tags: Array.isArray(x.tags) ? x.tags : [],
        }));
        setVideos(items.length ? items : mockVideos);
      })
      .catch((e) => {
        if (!alive) return;
        setError(String(e));
        setVideos(mockVideos);
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const list = videos || [];
  const featured = list.filter((v) => !!v.featured);
  const others = list.filter((v) => !v.featured);
  const usingMock = videos === mockVideos;

  return (
    <div className="space-y-8">
      <section>
        <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
          <h1 className="text-2xl font-bold tracking-tight">浏阳烟花视频精选</h1>
          <span className="text-xs text-neutral-500">
            {loading ? '加载中…' : usingMock ? '展示为样例内容（真实数据正在对接）' : `${list.length} 条 · 日更`}
          </span>
        </div>
        <p className="max-w-2xl text-sm text-neutral-400">
          聚合 B 站 / YouTube 的浏阳花炮与专业烟花秀内容。来源 + 标签双维度筛选，精选位手动置顶。
        </p>
      </section>

      {featured.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-semibold text-amber-300">🔥 头条</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((v) => (
              <VideoCard key={v.id} v={v} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-3 text-sm font-semibold text-neutral-300">最新视频</h2>
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] animate-pulse rounded-lg bg-white/[0.04]" />
            ))}
          </div>
        ) : others.length === 0 ? (
          <div className="rounded-lg border border-dashed border-white/10 p-8 text-center text-sm text-neutral-500">
            暂无内容。抓取管线首次拉取中，请稍后再来。
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {others.map((v) => (
              <VideoCard key={v.id} v={v} />
            ))}
          </div>
        )}
      </section>

      <section className="rounded-lg border border-dashed border-white/10 bg-white/[0.02] p-6 text-sm text-neutral-400">
        <div className="flex items-center gap-2 text-neutral-300">
          <ExternalLink size={14} /> 数据来源与自动更新
        </div>
        <p className="mt-2 leading-relaxed">
          视频通过自建 RSSHub 聚合 B 站 UP 主频道与关键词结果，每日凌晨 3 点自动拉取、去重、打标入库。
          YouTube 使用官方 RSS。抖音受平台风控，暂未启用，后续走专门抓取。如希望收录特定 UP
          主或单视频，请通过页脚邮箱反馈。
          {error && <span className="block mt-2 text-rose-400">API 异常：{error}（已回退样例内容）</span>}
        </p>
      </section>
    </div>
  );
}
