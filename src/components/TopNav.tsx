import { NavLink } from 'react-router-dom';

const tabs = [
  { to: '/', label: '视频', end: true },
  { to: '/chain', label: '产业链' },
  { to: '/news', label: '资讯' },
  { to: '/data', label: '数据' },
  { to: '/tools', label: '工具' },
];

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#05050a]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[#05050a]/60">
      <nav className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-4 sm:gap-3 sm:px-6">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-[15px] font-bold tracking-tight text-neutral-50"
        >
          <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-amber-400 to-orange-500 text-sm shadow-[0_0_16px_rgba(245,158,11,0.35)]">
            🎆
          </span>
          <span>天河落</span>
        </NavLink>
        <div className="mx-2 h-4 w-px bg-white/10 hidden sm:block" />
        <div className="flex items-center gap-0.5 overflow-x-auto">
          {tabs.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.end}
              className={({ isActive }) =>
                `relative rounded-md px-3 py-1.5 text-[13.5px] font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-amber-300'
                    : 'text-neutral-400 hover:text-neutral-100'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {t.label}
                  {isActive && (
                    <span className="absolute inset-x-2 -bottom-[13px] h-[2px] rounded-full bg-amber-400" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
        <div className="ml-auto hidden items-center gap-2 text-xs text-neutral-500 md:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
          日更 · 浏阳花炮产业
        </div>
      </nav>
    </header>
  );
}
