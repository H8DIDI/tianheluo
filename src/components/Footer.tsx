export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/[0.06] bg-gradient-to-b from-transparent to-black/40">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="max-w-sm">
          <div className="flex items-center gap-2 text-sm font-bold text-neutral-100">
            <span className="grid h-6 w-6 place-items-center rounded bg-gradient-to-br from-amber-400 to-orange-500 text-xs">
              🎆
            </span>
            天河落 <span className="font-mono text-[11px] font-normal text-neutral-500">Tianheluo</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-neutral-500">
            浏阳花炮产业数字化聚合展示：视频 · 资讯 · 产业链 · 数据 · 工具。
            日更抓取管线 + 可 AI 调用的 MCP 服务，为产业观察与从业者提供趁手入口。
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-[11px] font-medium uppercase tracking-wider text-neutral-500">
            合作 / 反馈
          </div>
          <img src="/email.svg" alt="联系邮箱" width={280} height={36} className="opacity-95" />
          <div className="mt-1 flex gap-3 text-[11px] text-neutral-500">
            <a href="https://github.com/H8DIDI/tianheluo" className="hover:text-neutral-200">GitHub</a>
            <span>·</span>
            <a href="/tools/simulator" className="hover:text-neutral-200">3D 模拟器</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/[0.04] py-3 text-center font-mono text-[11px] text-neutral-600">
        © 2026 H8DIDI · built on Cloudflare Pages + D1 · powered by RSSHub + MCP
      </div>
    </footer>
  );
}
