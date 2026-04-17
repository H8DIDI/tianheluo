import { useEffect, useState } from 'react';
import { Play, ThumbsUp, Coins, Star, Tv } from 'lucide-react';

type VideoItem = {
  id: string;
  source: 'bilibili' | 'youtube' | 'douyin' | 'web';
  title: string;
  channel_name?: string;
  description?: string;
  thumbnail?: string | null;
  url: string;
  bvid?: string | null;
  play_count?: number | null;
  like_count?: number | null;
  coin_count?: number | null;
  favorite_count?: number | null;
  duration?: number | null;
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
    play_count: 128000,
    like_count: 4200,
    featured: 1,
  },
];

const sourceBadge: Record<string, { label: string; className: string }> = {
  bilibili: { label: 'B站', className: 'bg-sky-500/15 text-sky-300 ring-1 ring-inset ring-sky-400/30' },
  youtube: { label: 'YouTube', className: 'bg-red-500/15 text-red-300 ring-1 ring-inset ring-red-400/30' },
  douyin: { label: '抖音', className: 'bg-pink-500/15 text-pink-300 ring-1 ring-inset ring-pink-400/30' },
  web: { label: 'Web', className: 'bg-neutral-500/15 text-neutral-300 ring-1 ring-inset ring-neutral-400/30' },
};

function fmtCount(n?: number | null) {
  if (n == null) return null;
  if (n < 1000) return String(n);
  if (n < 10000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  if (n < 100000000) return (n / 10000).toFixed(1).replace(/\.0$/, '') + '万';
  return (n / 100000000).toFixed(1).replace(/\.0$/, '') + '亿';
}

function fmtDate(ts?: number) {
  if (!ts) return '';
  const d = new Date(ts * 1000);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function fmtDuration(sec?: number | null) {
  if (!sec || sec <= 0) return null;
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function VideoCard({ v }: { v: VideoItem }) {
  const sb = sourceBadge[v.source] || sourceBadge.web;
  const dur = fmtDuration(v.duration);
  return (
    <a
      href={v.url}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-neutral-900/40 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400/40 hover:bg-neutral-900/60 hover:shadow-[0_0_0_1px_rgba(245,158,11,0.08),0_20px_40px_-20px_rgba(245,158,11,0.15)]"
    >
      <div className="relative aspect-video overflow-hidden bg-neutral-800">
        {v.thumbnail ? (
          <img
            src={v.thumbnail}
            alt={v.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-500/10 via-fuchsia-500/5 to-neutral-900">
            <span className="text-3xl opacity-30">🎆</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <span className={`absolute left-2 top-2 rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${sb.className}`}>
          {sb.label}
        </span>
        {!!v.featured && (
          <span className="absolute right-2 top-2 rounded-md bg-amber-400 px-1.5 py-0.5 text-[10px] font-bold text-black shadow-sm">
            精选
          </span>
        )}
        {dur && (
          <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-white/90 backdrop-blur-sm">
            {dur}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="line-clamp-2 text-[13.5px] font-medium leading-snug text-neutral-100 transition-colors group-hover:text-amber-200">
          {v.title}
        </h3>
        <div className="mt-auto flex items-center justify-between gap-2 text-[11px] text-neutral-500">
          <span className="truncate">{v.channel_name || '—'}</span>
          <span className="shrink-0 font-mono tabular-nums">{fmtDate(v.published_at)}</span>
        </div>
        {(v.play_count != null || v.like_count != null) && (
          <div className="flex items-center gap-3 text-[11px] text-neutral-500">
            {v.play_count != null && (
              <span className="flex items-center gap-1">
                <Play size={11} className="text-neutral-600" /> {fmtCount(v.play_count)}
              </span>
            )}
            {v.like_count != null && (
              <span className="flex items-center gap-1">
                <ThumbsUp size={11} className="text-neutral-600" /> {fmtCount(v.like_count)}
              </span>
            )}
            {v.coin_count != null && v.coin_count > 0 && (
              <span className="flex items-center gap-1">
                <Coins size={11} className="text-neutral-600" /> {fmtCount(v.coin_count)}
              </span>
            )}
            {v.favorite_count != null && v.favorite_count > 0 && (
              <span className="flex items-center gap-1">
                <Star size={11} className="text-neutral-600" /> {fmtCount(v.favorite_count)}
              </span>
            )}
          </div>
        )}
        {v.tags && v.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {v.tags.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-neutral-400 ring-1 ring-inset ring-white/5"
              >
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
    <div className="space-y-10">
      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/5 px-3 py-1 text-[11px] font-medium text-amber-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
              实时聚合
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-neutral-50 sm:text-4xl">
              浏阳烟花 · 视频精选
            </h1>
            <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-neutral-400">
              自建 RSSHub 日更聚合 B 站 UP 主频道 / YouTube 频道与关键词搜索，
              来源 + 标签双维度筛选，精选位手动置顶。
            </p>
          </div>
          <div className="text-right text-xs text-neutral-500">
            <Tv size={14} className="inline" />{' '}
            {loading ? '加载中…' : usingMock ? '样例内容' : `${list.length} 条 · 日更`}
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section>
          <div className="mb-3 flex items-center gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-amber-300">🔥 头条</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-amber-400/30 to-transparent" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((v) => (
              <VideoCard key={v.id} v={v} />
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="mb-3 flex items-center gap-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">最新视频</h2>
          <div className="h-px flex-1 bg-white/5" />
        </div>
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-white/[0.08] bg-neutral-900/40">
                <div className="aspect-video animate-pulse bg-white/[0.04]" />
                <div className="space-y-2 p-3">
                  <div className="h-3 animate-pulse rounded bg-white/[0.05]" />
                  <div className="h-3 w-2/3 animate-pulse rounded bg-white/[0.05]" />
                </div>
              </div>
            ))}
          </div>
        ) : others.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/10 p-10 text-center text-sm text-neutral-500">
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

      <section className="rounded-xl border border-white/[0.06] bg-gradient-to-br from-neutral-900/40 to-neutral-900/10 p-6 text-sm">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-300">数据来源</div>
        <p className="leading-relaxed text-neutral-400">
          视频通过自建 RSSHub 聚合 B 站 UP 主频道与关键词结果，每日凌晨 3 点自动拉取、去重、打标入库；
          播放数据通过 Bilibili 官方 API 补齐。YouTube 使用官方 RSS。
          如希望收录特定 UP 主或单视频，请通过页脚邮箱反馈。
          {error && <span className="mt-2 block text-rose-400">API 异常：{error}（已回退样例）</span>}
        </p>
      </section>
    </div>
  );
}
