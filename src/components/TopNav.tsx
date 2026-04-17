import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Github, Sparkles } from 'lucide-react';

// Each tab gets its own color accent (active state)
const tabs: Array<{ to: string; label: string; end?: boolean; color: string }> = [
  { to: '/', label: '视频', end: true, color: 'text-pink-400' },
  { to: '/chain', label: '产业链', color: 'text-sky-400' },
  { to: '/news', label: '资讯', color: 'text-emerald-400' },
  { to: '/data', label: '数据', color: 'text-amber-400' },
  { to: '/tools', label: '工具', color: 'text-violet-400' },
  { to: '/changelog', label: '更新日志', color: 'text-cyan-400' },
];

export function TopNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'border-b border-white/[0.08] bg-[#0A0A0F]/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-[1440px] items-center gap-8 px-6 sm:px-10 lg:gap-14 lg:px-12">
        <NavLink to="/" className="flex shrink-0 items-center gap-2.5 text-[18px] font-extrabold tracking-tight text-white">
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-amber-400 via-pink-500 to-violet-500 text-[15px] font-black text-white shadow-[0_8px_24px_-6px_rgba(236,72,153,0.5)]">
            天
          </span>
          <span className="hidden sm:inline">天河落</span>
          <span className="hidden font-mono text-[11px] font-normal text-white/40 xl:inline">
            Tianheluo
          </span>
        </NavLink>

        {/* Desktop tabs */}
        <div className="hidden min-w-0 flex-1 items-center gap-3 md:flex lg:gap-5">
          {tabs.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.end}
              className={({ isActive }) =>
                `relative rounded-lg px-4 py-2.5 text-[15px] font-medium transition-all ${
                  isActive
                    ? `${t.color}`
                    : 'text-white/55 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span
                      className={`absolute inset-0 -z-10 rounded-lg bg-current opacity-[0.12]`}
                    />
                  )}
                  <span className="relative z-10">{t.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          <a
            href="https://github.com/H8DIDI/tianheluo"
            target="_blank"
            rel="noreferrer noopener"
            className="hidden h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white/70 transition-colors hover:border-white/25 hover:bg-white/[0.08] hover:text-white lg:inline-flex"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href="/tools/simulator"
            className="group relative hidden h-10 items-center gap-2 overflow-hidden rounded-lg px-5 text-[14px] font-semibold text-white transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            <span className="absolute inset-0 -z-10 bg-gradient-to-r from-amber-400 via-pink-500 to-violet-500" />
            <span className="absolute inset-[1px] -z-10 rounded-[7px] bg-[#0A0A0F] opacity-0 group-hover:opacity-0" />
            <Sparkles size={14} />
            打开模拟器
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="菜单"
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-white/80 hover:bg-white/[0.08] md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/[0.08] bg-[#0A0A0F]/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-1 px-6 py-5">
            {tabs.map((t) => (
              <NavLink
                key={t.to}
                to={t.to}
                end={t.end}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-[16px] font-medium transition-colors ${
                    isActive
                      ? `bg-white/[0.08] ${t.color}`
                      : 'text-white/75 hover:bg-white/[0.04] hover:text-white'
                  }`
                }
              >
                {t.label}
              </NavLink>
            ))}
            <div className="mt-3 flex gap-2">
              <a
                href="https://github.com/H8DIDI/tianheluo"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3 text-[14px] text-white/85"
              >
                <Github size={15} /> GitHub
              </a>
              <a
                href="/tools/simulator"
                className="relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-lg px-3 py-3 text-[14px] font-semibold text-white"
              >
                <span className="absolute inset-0 -z-10 bg-gradient-to-r from-amber-400 via-pink-500 to-violet-500" />
                <Sparkles size={14} /> 打开模拟器
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
