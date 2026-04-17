import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Github } from 'lucide-react';

const tabs = [
  { to: '/', label: '视频', end: true },
  { to: '/chain', label: '产业链' },
  { to: '/news', label: '资讯' },
  { to: '/data', label: '数据' },
  { to: '/tools', label: '工具' },
  { to: '/changelog', label: '更新日志' },
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
          ? 'border-b border-white/[0.08] bg-black/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-black'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1440px] items-center px-5 sm:h-[72px] sm:px-8 lg:px-10">
        <NavLink to="/" className="flex items-center gap-2.5 text-[17px] font-bold tracking-tight text-white">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-black font-black">
            天
          </span>
          <span className="hidden sm:inline">天河落</span>
          <span className="hidden font-mono text-[11px] font-normal text-white/40 md:inline">
            Tianheluo
          </span>
        </NavLink>

        <div className="ml-10 hidden items-center gap-1 md:flex">
          {tabs.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.end}
              className={({ isActive }) =>
                `relative rounded-md px-3.5 py-2 text-[14.5px] font-medium transition-colors ${
                  isActive ? 'text-white' : 'text-white/55 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {t.label}
                  {isActive && (
                    <span className="absolute inset-x-3.5 -bottom-[17px] h-[2px] rounded-full bg-white sm:-bottom-[21px]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <a
            href="https://github.com/H8DIDI/tianheluo"
            target="_blank"
            rel="noreferrer noopener"
            className="hidden h-9 items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.02] px-3 text-[13px] text-white/70 transition-colors hover:border-white/20 hover:text-white md:inline-flex"
          >
            <Github size={14} /> GitHub
          </a>
          <a
            href="/tools/simulator"
            className="hidden h-9 items-center rounded-md bg-white px-3.5 text-[13.5px] font-semibold text-black transition-colors hover:bg-white/90 sm:inline-flex"
          >
            打开模拟器 →
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="菜单"
            className="grid h-9 w-9 place-items-center rounded-md border border-white/10 text-white/80 hover:bg-white/5 md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/[0.08] md:hidden">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-1 px-5 py-4">
            {tabs.map((t) => (
              <NavLink
                key={t.to}
                to={t.to}
                end={t.end}
                className={({ isActive }) =>
                  `rounded-md px-3 py-3 text-[15px] font-medium ${
                    isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {t.label}
              </NavLink>
            ))}
            <div className="mt-2 flex gap-2">
              <a
                href="https://github.com/H8DIDI/tianheluo"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-white/10 px-3 py-2.5 text-[13px] text-white/80"
              >
                <Github size={14} /> GitHub
              </a>
              <a
                href="/tools/simulator"
                className="flex flex-1 items-center justify-center rounded-md bg-white px-3 py-2.5 text-[13.5px] font-semibold text-black"
              >
                打开模拟器 →
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
