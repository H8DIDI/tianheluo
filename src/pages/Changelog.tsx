import { PageHero, SectionWrap } from '../components/PageScaffold';
import { GitCommit } from 'lucide-react';

type Entry = {
  date: string;
  tag: 'feature' | 'data' | 'ui' | 'infra' | 'fix';
  title: string;
  items: string[];
};

const entries: Entry[] = [
  {
    date: '2026-04-17',
    tag: 'ui',
    title: 'UI v4 · Vercel / Linear 风格大改版',
    items: [
      '切换 Geist Sans + Geist Mono 字体',
      '放大 TopNav 至 72px，桌面端加 GitHub / 打开模拟器 CTA',
      'Home 增加 hero + KPI 条 + MCP 入口 section',
      '统一 PageHero / SectionWrap 组件，所有子页视觉对齐',
      '加入"更新日志"栏目',
    ],
  },
  {
    date: '2026-04-17',
    tag: 'data',
    title: '视频卡片增加封面 + 互动数据',
    items: [
      '抓取脚本提取 RSS 封面 URL',
      '通过 Bilibili view API 补齐播放/点赞/投币/收藏数',
      'D1 新增 thumbnail/bvid/like/coin/favorite/duration 列',
      '前端视频卡展示封面 + 时长 + 数据行',
    ],
  },
  {
    date: '2026-04-17',
    tag: 'infra',
    title: 'MCP Server 上线 mcp.tianheluo.com',
    items: [
      'Node Express + @modelcontextprotocol/sdk 实现 stateless HTTP',
      '暴露 list_fireworks_videos / list_fireworks_news / get_industry_stats / get_industry_chain 四个工具',
      'Bearer Token 鉴权，通过 cloudflared tunnel 分发',
      'systemd 托管 tianheluo-mcp.service，开机自启',
    ],
  },
  {
    date: '2026-04-17',
    tag: 'infra',
    title: '数据管线 B 阶段完工',
    items: [
      'D1 建表：videos / news / sources / fetch_log',
      'Python 抓取脚本 + 关键词过滤 + 标签规则 + 去重 UPSERT',
      'systemd timer 每天 03:00 自动运行',
      'CF Pages Functions: /api/videos /api/news /api/stats',
    ],
  },
  {
    date: '2026-04-17',
    tag: 'feature',
    title: '网站改为 5 Tab 产业聚合站',
    items: [
      '视频 / 产业链 / 资讯 / 数据 / 工具 五大板块',
      '原 3D 烟花模拟器搬到 /tools/simulator 保留',
      'React Router + SPA 404 fallback via Pages Functions middleware',
    ],
  },
  {
    date: '2026-04-17',
    tag: 'infra',
    title: '阿里云 ECS → Cloudflare Tunnel',
    items: [
      'RSSHub（chromium-bundled）以 Docker 方式部署',
      '通过 cloudflared tunnel 绕过阿里云 ICP 拦截',
      'rss.tianheluo.com / mcp.tianheluo.com 走隧道回源',
      'Bilibili SESSDATA cookie 注入，UP 主视频可抓',
    ],
  },
  {
    date: '2026-04-17',
    tag: 'feature',
    title: '域名 & 品牌迁移至 tianheluo.com',
    items: [
      '项目改名 萤合落 → 天河落',
      'GitHub 仓库重命名 yingheluo-v3 → tianheluo',
      '旧域 yingheluo.dpdns.org 整域 301 跳转',
      'CF Pages 添加 tianheluo.com 为主域',
      '邮箱 jj100kmyeyes@gmail.com 以 SVG 形式放在主页与 /about/',
    ],
  },
];

const tagMeta: Record<Entry['tag'], { label: string; className: string }> = {
  feature: { label: 'Feature', className: 'bg-sky-400/10 text-sky-300 ring-sky-400/30' },
  data: { label: 'Data', className: 'bg-emerald-400/10 text-emerald-300 ring-emerald-400/30' },
  ui: { label: 'UI', className: 'bg-amber-400/10 text-amber-300 ring-amber-400/30' },
  infra: { label: 'Infra', className: 'bg-fuchsia-400/10 text-fuchsia-300 ring-fuchsia-400/30' },
  fix: { label: 'Fix', className: 'bg-rose-400/10 text-rose-300 ring-rose-400/30' },
};

export default function Changelog() {
  return (
    <>
      <PageHero
        eyebrow={<><GitCommit size={11} /> Changelog</>}
        title="更新日志"
        subtitle="所有可见改动都在这里。倒序排列，最新在上。"
        tone="violet"
      />
      <SectionWrap>
        <ol className="relative space-y-10 border-l border-white/[0.08] pl-6 sm:pl-8">
          {entries.map((e, i) => {
            const meta = tagMeta[e.tag];
            return (
              <li key={i} className="relative">
                <span
                  className={`absolute -left-[33px] top-1.5 grid h-4 w-4 place-items-center rounded-full ring-4 ring-black sm:-left-[41px] ${meta.className} ring-inset`}
                  aria-hidden
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <time className="font-mono text-[12.5px] tabular-nums text-white/50">{e.date}</time>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${meta.className}`}
                  >
                    {meta.label}
                  </span>
                </div>
                <h3 className="mt-2 text-[19px] font-bold tracking-tight text-white sm:text-[21px]">{e.title}</h3>
                <ul className="mt-3 space-y-1.5 text-[13.5px] leading-relaxed text-white/60">
                  {e.items.map((item, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/25" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </SectionWrap>
    </>
  );
}
