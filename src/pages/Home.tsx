import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, ThumbsUp, Coins, Star, ArrowRight, Sparkles } from 'lucide-react';

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
  bilibili: { label: 'Bilibili', className: 'bg-[#fb7299]/15 text-[#ffa8c0] ring-1 ring-inset ring-[#fb7299]/40' },
  youtube: { label: 'YouTube', className: 'bg-red-500/15 text-red-300 ring-1 ring-inset ring-red-400/40' },
  douyin: { label: 'Douyin', className: 'bg-pink-500/15 text-pink-200 ring-1 ring-inset ring-pink-400/40' },
  web: { label: 'Web', className: 'bg-white/10 text-white/80 ring-1 ring-inset ring-white/20' },
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

function VideoCard({ v, big = false }: { v: VideoItem; big?: boolean }) {
  const sb = sourceBadge[v.source] || sourceBadge.web;
  const dur = fmtDuration(v.duration);
  return (
    <a
      href={v.url}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0A] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_24px_60px_-20px_rgba(245,158,11,0.25)]"
    >
      <div className="relative aspect-video overflow-hidden bg-[#111]">
        {v.thumbnail ? (
          <img
            src={v.thumbnail}
            alt={v.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-500/15 via-fuchsia-500/5 to-transparent text-4xl opacity-40">
            🎆
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold backdrop-blur-md ${sb.className}`}>
            {sb.label}
          </span>
          {!!v.featured && (
            <span className="rounded-md bg-amber-400 px-2 py-0.5 text-[11px] font-bold text-black shadow-lg">
              精选
            </span>
          )}
        </div>
        {dur && (
          <span className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-0.5 font-mono text-[11px] tabular-nums text-white backdrop-blur-md">
            {dur}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-4 sm:p-5">
        <h3
          className={`line-clamp-2 font-semibold leading-snug text-white transition-colors group-hover:text-amber-200 ${
            big ? 'text-[17px] sm:text-[19px]' : 'text-[15px]'
          }`}
        >
          {v.title}
        </h3>
        <div className="flex items-center justify-between gap-2 text-[12px] text-white/50">
          <span className="truncate font-medium">{v.channel_name || '—'}</span>
          <span className="shrink-0 font-mono tabular-nums">{fmtDate(v.published_at)}</span>
        </div>
        {(v.play_count != null || v.like_count != null) && (
          <div className="flex items-center gap-4 text-[12px] text-white/55">
            {v.play_count != null && (
              <span className="flex items-center gap-1 tabular-nums">
                <Play size={12} className="text-white/30" fill="currentColor" strokeWidth={0} /> {fmtCount(v.play_count)}
              </span>
            )}
            {v.like_count != null && (
              <span className="flex items-center gap-1 tabular-nums">
                <ThumbsUp size={12} className="text-white/30" /> {fmtCount(v.like_count)}
              </span>
            )}
            {v.coin_count != null && v.coin_count > 0 && (
              <span className="flex items-center gap-1 tabular-nums">
                <Coins size={12} className="text-white/30" /> {fmtCount(v.coin_count)}
              </span>
            )}
            {v.favorite_count != null && v.favorite_count > 0 && (
              <span className="flex items-center gap-1 tabular-nums">
                <Star size={12} className="text-white/30" /> {fmtCount(v.favorite_count)}
              </span>
            )}
          </div>
        )}
        {v.tags && v.tags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1.5">
            {v.tags.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-md bg-white/[0.06] px-2 py-0.5 text-[11px] text-white/60 ring-1 ring-inset ring-white/[0.04]"
              >
                {t}
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
  const [stats, setStats] = useState<{ videos: number; sources: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/videos?limit=40')
      .then((r) => r.json())
      .then((d) => setVideos(d.items || []))
      .finally(() => setLoading(false));
    fetch('/api/stats')
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  const list = videos || [];
  const featured = list.filter((v) => !!v.featured);
  const others = list.filter((v) => !v.featured);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/[0.08]">
        <div className="absolute inset-0 -z-10 grid-bg" />
        <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-amber-500/25 via-orange-500/10 to-transparent blur-3xl" />
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-3 py-1.5 text-[12.5px] text-white/75 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
            </span>
            每日自动聚合 · RSSHub + D1 + MCP
          </div>
          <h1 className="mt-6 max-w-5xl text-[40px] font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-[60px] lg:text-[84px]">
            浏阳花炮，
            <br className="sm:hidden" />
            <span className="hero-gradient-text">一屏看全产业</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/65 sm:text-[17px]">
            视频、资讯、产业链、数据与实用工具，一站式聚合展示。
            自建抓取管线每日更新，无需登录，免费公开，供 AI 与人类共同消费。
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/tools/simulator"
              className="group inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-[14.5px] font-semibold text-black transition-transform hover:scale-[1.02]"
            >
              <Sparkles size={16} />
              打开 3D 烟花模拟器
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#latest-videos"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-5 py-3 text-[14.5px] font-medium text-white/90 backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white/[0.06]"
            >
              浏览视频墙
            </a>
          </div>

          {/* KPI strip */}
          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-4">
            {[
              { label: '产业年产值', value: '508.9', suffix: '亿元' },
              { label: '规上企业', value: '431', suffix: '家' },
              { label: '产业专利', value: '3,721', suffix: '项' },
              { label: '出口国家', value: '100', suffix: '+' },
            ].map((s) => (
              <div key={s.label} className="bg-[#050505] p-5 sm:p-6">
                <div className="label-caps text-white/40">{s.label}</div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="number-display text-[28px] font-bold text-white sm:text-[34px]">{s.value}</span>
                  <span className="text-[13px] text-white/40">{s.suffix}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-5 pt-16 sm:px-8 sm:pt-20 lg:px-10">
          <SectionHeader
            eyebrow="🔥 今日头条"
            title="精选视频"
            subtitle="编辑置顶，优先曝光的高质量烟花秀与产业内容"
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured.slice(0, 3).map((v) => (
              <VideoCard key={v.id} v={v} big />
            ))}
          </div>
        </section>
      )}

      {/* LATEST GRID */}
      <section id="latest-videos" className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <SectionHeader
          eyebrow="最新入库"
          title="视频墙"
          subtitle={
            loading
              ? '正在拉取最新内容…'
              : `聚合 ${stats?.videos ?? list.length} 条视频，每日凌晨 3:00 自动更新`
          }
        />
        <div className="mt-8">
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
      <section className="border-y border-white/[0.08] bg-[#050505]">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-10">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="label-caps text-white/40">AI 访问</div>
              <h3 className="mt-1 text-[22px] font-bold tracking-tight text-white sm:text-[26px]">
                通过 MCP 让 AI 直接查询站点数据
              </h3>
              <p className="mt-1 text-[14px] text-white/55">
                已暴露 4 个工具：视频、资讯、产业指标、产业链。Claude Desktop / Cursor 即接即用。
              </p>
            </div>
            <a
              href="https://mcp.tianheluo.com/health"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-lg bg-white/[0.06] px-4 py-2.5 text-[13.5px] font-medium text-white ring-1 ring-inset ring-white/10 hover:bg-white/[0.1]"
            >
              查看 MCP 端点 <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div>
      <div className="label-caps text-amber-300/80">{eyebrow}</div>
      <h2 className="mt-2 text-[30px] font-bold tracking-tight text-white sm:text-[38px]">{title}</h2>
      {subtitle && <p className="mt-2 max-w-2xl text-[14.5px] text-white/55">{subtitle}</p>}
    </div>
  );
}
