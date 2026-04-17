import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/[0.08] bg-black">
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 text-[18px] font-bold text-white">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-black font-black">
                天
              </span>
              天河落
              <span className="font-mono text-[12px] font-normal text-white/35">Tianheluo</span>
            </div>
            <p className="mt-4 max-w-md text-[14px] leading-relaxed text-white/55">
              浏阳花炮产业数字化聚合展示站。日更抓取管线 + 可 AI 调用的 MCP 服务，
              为产业观察与从业者提供一站式入口。
            </p>
          </div>
          <div>
            <div className="label-caps mb-4 text-white/40">导航</div>
            <ul className="space-y-2.5 text-[14px]">
              <li><a href="/" className="text-white/65 hover:text-white">视频</a></li>
              <li><a href="/chain" className="text-white/65 hover:text-white">产业链</a></li>
              <li><a href="/news" className="text-white/65 hover:text-white">资讯</a></li>
              <li><a href="/data" className="text-white/65 hover:text-white">数据</a></li>
              <li><a href="/tools" className="text-white/65 hover:text-white">工具</a></li>
              <li><a href="/changelog" className="text-white/65 hover:text-white">更新日志</a></li>
            </ul>
          </div>
          <div>
            <div className="label-caps mb-4 text-white/40">合作 / 反馈</div>
            <img src="/email.svg" alt="联系邮箱" width={280} height={36} className="mb-4 h-9" />
            <a
              href="https://github.com/H8DIDI/tianheluo"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-[13px] text-white/65 hover:text-white"
            >
              <Github size={14} /> H8DIDI/tianheluo
            </a>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-6 font-mono text-[11.5px] text-white/35">
          <span>© 2026 H8DIDI · built on Cloudflare Pages + D1</span>
          <span>powered by RSSHub + MCP</span>
        </div>
      </div>
    </footer>
  );
}
