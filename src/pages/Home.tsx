import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, ThumbsUp, Coins, Star, ArrowRight, Sparkles, Zap, TrendingUp } from 'lucide-react';

type VideoItem = {
  id: string;
  source: 'bilibili' | 'youtube' | 'douyin' | 'web';
  title: string;
  channel_name?: string;
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

const sourceBadge: Record<string, { label: string; className: string }> = {
  bilibili: { label: 'Bilibili', className: 'bg-[#fb7299] text-white shadow-[0_4px_14px_-4px_rgba(251,114,153,0.5)]' },
  youtube: { label: 'YouTube', className: 'bg-red-500 text-white shadow-[0_4px_14px_-4px_rgba(239,68,68,0.5)]' },
  douyin: { label: 'Douyin', className: 'bg-pink-500 text-white' },
  web: { label: 'Web', className: 'bg-white/15 text-white ring-1 ring-inset ring-white/20' },
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
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
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
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121217] transition-all duration-300 hover:-translate-y-1.5 hover:border-pink-400/40 hover:shadow-[0_30px_60px_-20px_rgba(236,72,153,0.35)]"
    >
      <div className="relative aspect-video overflow-hidden bg-[#1a1a22]">
        {v.thumbnail ? (
          <img
            src={v.thumbnail}
            alt={v.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
            onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-500/25 via-violet-500/15 to-amber-500/15 text-4xl">
            🎆
          </div>
        )}
        {/* Play button overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-white/90 text-black shadow-2xl backdrop-blur-md transition-transform group-hover:scale-110">
            <Play size={22} fill="currentColor" strokeWidth={0} className="translate-x-0.5" />
          </span>
        </div>
        <div className="absolute left-3 top-3 flex gap-2">
          <span className={`rounded-md px-2 py-0.5 text-[11px] font-bold tracking-wide ${sb.className}`}>
            {sb.label}
          </span>
          {!!v.featured && (
            <span className="rounded-md bg-gradient-to-r from-amber-400 to-pink-500 px-2 py-0.5 text-[11px] font-bold text-white shadow-lg">
              精选
            </span>
          )}
        </div>
        {dur && (
          <span className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-1 font-mono text-[11px] tabular-nums text-white backdrop-blur-md ring-1 ring-white/10">
            {dur}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-4 sm:p-5">
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-white transition-colors group-hover:text-pink-200">
          {v.title}
        </h3>
        <div className="flex items-center justify-between gap-2 text-[12px] text-white/55">
          <span className="truncate font-medium">{v.channel_name || '—'}</span>
          <span className="shrink-0 font-mono tabular-nums">{fmtDate(v.published_at)}</span>
        </div>
        {(v.play_count != null || v.like_count != null) && (
          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[12px] text-white/70">
            {v.play_count != null && (
              <span className="flex items-center gap-1 tabular-nums">
                <Play size={12} className="text-pink-400/80" fill="currentColor" strokeWidth={0} />
                {fmtCount(v.play_count)}
              </span>
            )}
            {v.like_count != null && (
              <span className="flex items-center gap-1 tabular-nums">
                <ThumbsUp size={12} className="text-amber-400/80" /> {fmtCount(v.like_count)}
              </span>
            )}
            {v.coin_count != null && v.coin_count > 0 && (
              <span className="flex items-center gap-1 tabular-nums">
                <Coins size={12} className="text-violet-400/80" /> {fmtCount(v.coin_count)}
              </span>
            )}
            {v.favorite_count != null && v.favorite_count > 0 && (
              <span className="flex items-center gap-1 tabular-nums">
                <Star size={12} className="text-cyan-400/80" /> {fmtCount(v.favorite_count)}
              </span>
            )}
          </div>
        )}
        {v.tags && v.tags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1.5">
            {v.tags.slice(0, 4).map((t, i) => {
              const colors = [
                'bg-pink-400/12 text-pink-300 ring-pink-400/25',
                'bg-amber-400/12 text-amber-300 ring-amber-400/25',
                'bg-violet-400/12 text-violet-300 ring-violet-400/25',
                'bg-cyan-400/12 text-cyan-300 ring-cyan-400/25',
              ];
              return (
                <span
                  key={t}
                  className={`rounded-md px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${colors[i % colors.length]}`}
                >
                  {t}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </a>
  );
}

export default function Home() {
  const [videos, setVideos] = useState<VideoItem[] | null>(null);
  const [stats, setStats] = useState<{ videos: number; sources: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/videos?limit=40')
      .then((r) => r.json())
      .then((d) => setVideos(d.items || []))
      .finally(() => setLoading(false));
    fetch('/api/stats').then((r) => r.json()).then(setStats).catch(() => {});
  }, []);

  const list = videos || [];
  const featured = list.filter((v) => !!v.featured);
  const others = list.filter((v) => !v.featured);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden mesh-hero noise-overlay border-b border-white/[0.06]">
        <div className="absolute inset-0 -z-10 grid-overlay" />
        <div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 sm:py-28 lg:px-12 lg:py-36">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[13px] font-medium text-white/85 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-400 opacity-80" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-400" />
            </span>
            每日自动聚合 · RSSHub + D1 + MCP
          </div>
          <h1 className="mt-8 max-w-5xl text-[44px] font-extrabold leading-[1.02] tracking-[-0.04em] text-white sm:text-[68px] lg:text-[92px]">
            浏阳花炮
            <br />
            <span className="aurora-text">一屏看全产业</span>
          </h1>
          <p className="mt-7 max-w-2xl text-[16px] leading-relaxed text-white/70 sm:text-[18px]">
            视频、资讯、产业链、数据与实用工具，一站式聚合展示。
            自建抓取管线每日更新，无需登录，免费公开，供 AI 与人类共同消费。
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/tools/simulator"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-6 py-3.5 text-[15px] font-semibold text-white transition-transform hover:scale-[1.03] glow-btn"
            >
              <span className="absolute inset-0 -z-10 bg-gradient-to-r from-amber-400 via-pink-500 to-violet-500" />
              <Sparkles size={16} />
              打开 3D 烟花模拟器
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#latest-videos"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3.5 text-[15px] font-medium text-white/90 backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white/[0.08]"
            >
              浏览视频墙
            </a>
          </div>

          {/* KPI cards — colorful */}
          <div className="mt-20 grid gap-4 grid-cols-2 lg:grid-cols-4">
            {[
              { label: '产业年产值', value: '508.9', suffix: '亿元', tone: 'from-amber-500/20 to-orange-500/5', text: 'text-amber-300', icon: TrendingUp },
              { label: '规上企业', value: '431', suffix: '家', tone: 'from-pink-500/20 to-rose-500/5', text: 'text-pink-300', icon: Zap },
              { label: '产业专利', value: '3,721', suffix: '项', tone: 'from-violet-500/20 to-indigo-500/5', text: 'text-violet-300', icon: Sparkles },
              { label: '出口国家', value: '100', suffix: '+', tone: 'from-cyan-500/20 to-teal-500/5', text: 'text-cyan-300', icon: TrendingUp },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className={`relative overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-br ${s.tone} p-5 backdrop-blur-sm transition-transform hover:-translate-y-0.5 sm:p-6`}
                >
                  <div className="flex items-center justify-between">
                    <span className="label-caps text-white/50">{s.label}</span>
                    <Icon size={14} className={s.text} />
                  </div>
                  <div className="mt-3 flex items-baseline gap-1.5">
                    <span className={`number-display text-[30px] font-extrabold sm:text-[38px] ${s.text}`}>
                      {s.value}
                    </span>
                    <span className="text-[13px] text-white/45">{s.suffix}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-6 pt-20 sm:px-10 sm:pt-24 lg:px-12">
          <div>
            <div className="label-caps text-pink-400">🔥 今日头条</div>
            <h2 className="mt-2 text-[30px] font-bold tracking-tight text-white sm:text-[40px]">精选视频</h2>
            <p className="mt-2 max-w-2xl text-[14.5px] text-white/55">编辑置顶，优先曝光的高质量烟花秀与产业内容</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured.slice(0, 3).map((v) => (
              <VideoCard key={v.id} v={v} />
            ))}
          </div>
        </section>
      )}

      {/* LATEST GRID */}
      <section id="latest-videos" className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 sm:py-24 lg:px-12">
        <div>
          <div className="label-caps text-violet-400">最新入库</div>
          <h2 className="mt-2 text-[30px] font-bold tracking-tight text-white sm:text-[40px]">视频墙</h2>
          <p className="mt-2 max-w-2xl text-[14.5px] text-white/55">
            {loading ? '正在拉取最新内容…' : `聚合 ${stats?.videos ?? list.length} 条视频，每日凌晨 3:00 自动更新`}
          </p>
        </div>
        <div className="mt-10">
          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                  <div className="aspect-video animate-pulse bg-white/[0.04]" />
                  <div className="space-y-2 p-4">
                    <div className="h-4 animate-pulse rounded bg-white/[0.05]" />
                    <div className="h-4 w-2/3 animate-pulse rounded bg-white/[0.05]" />
                  </div>
                </div>
              ))}
            </div>
          ) : others.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 p-14 text-center text-white/45">
              抓取管线首次拉取中，请稍后再来。
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {others.map((v) => (
                <VideoCard key={v.id} v={v} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA strip */}
      <section className="border-y border-white/[0.06] bg-gradient-to-br from-violet-500/10 via-transparent to-pink-500/10">
        <div className="mx-auto max-w-[1440px] px-6 py-14 sm:px-10 lg:px-12">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <div className="label-caps text-cyan-300">AI 访问</div>
              <h3 className="mt-1 text-[24px] font-bold tracking-tight text-white sm:text-[28px]">
                通过 MCP 让 AI 直接查询站点数据
              </h3>
              <p className="mt-2 text-[14px] text-white/60">
                已暴露 4 个工具：视频、资讯、产业指标、产业链。Claude Desktop / Cursor 即接即用。
              </p>
            </div>
            <a
              href="https://mcp.tianheluo.com/health"
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-[14px] font-semibold text-black transition-transform hover:scale-[1.03]"
            >
              查看 MCP 端点 <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
