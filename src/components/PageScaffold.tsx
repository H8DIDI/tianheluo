import type { ReactNode } from 'react';

const toneStyles: Record<string, { ring: string; bg: string; text: string; glow: string }> = {
  amber: { ring: 'ring-amber-400/25', bg: 'bg-amber-400/10', text: 'text-amber-300', glow: 'from-amber-500/20' },
  sky: { ring: 'ring-sky-400/25', bg: 'bg-sky-400/10', text: 'text-sky-300', glow: 'from-sky-500/20' },
  emerald: { ring: 'ring-emerald-400/25', bg: 'bg-emerald-400/10', text: 'text-emerald-300', glow: 'from-emerald-500/20' },
  fuchsia: { ring: 'ring-fuchsia-400/25', bg: 'bg-fuchsia-400/10', text: 'text-fuchsia-300', glow: 'from-fuchsia-500/20' },
  violet: { ring: 'ring-violet-400/25', bg: 'bg-violet-400/10', text: 'text-violet-300', glow: 'from-violet-500/20' },
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  tone = 'amber',
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  tone?: keyof typeof toneStyles;
}) {
  const t = toneStyles[tone];
  return (
    <section className="relative overflow-hidden border-b border-white/[0.08]">
      <div className="absolute inset-0 -z-10 grid-bg" />
      <div
        className={`absolute left-1/2 top-0 -z-10 h-[380px] w-[720px] -translate-x-1/2 rounded-full bg-gradient-to-b ${t.glow} via-transparent to-transparent blur-3xl`}
      />
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        {eyebrow && (
          <div
            className={`inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-3 py-1.5 text-[12.5px] backdrop-blur-md ${t.text}`}
          >
            {eyebrow}
          </div>
        )}
        <h1 className="mt-5 max-w-4xl text-[36px] font-bold leading-[1.08] tracking-[-0.035em] text-white sm:text-[52px] lg:text-[68px]">
          {title}
        </h1>
        {subtitle && (
          <div className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/60 sm:text-[16.5px]">
            {subtitle}
          </div>
        )}
      </div>
    </section>
  );
}

export function SectionWrap({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  right,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0 flex-1">
        {eyebrow && <div className="label-caps text-amber-300/80">{eyebrow}</div>}
        <h2 className="mt-2 text-[28px] font-bold tracking-tight text-white sm:text-[34px]">{title}</h2>
        {subtitle && <p className="mt-2 max-w-2xl text-[14px] text-white/55">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}
