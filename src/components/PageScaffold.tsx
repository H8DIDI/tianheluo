import type { ReactNode } from 'react';

const toneStyles: Record<string, { dot: string; text: string; border: string; glow: string }> = {
  amber: { dot: 'bg-amber-400', text: 'text-amber-300', border: 'border-amber-400/30', glow: 'from-amber-500/25' },
  pink: { dot: 'bg-pink-400', text: 'text-pink-300', border: 'border-pink-400/30', glow: 'from-pink-500/25' },
  violet: { dot: 'bg-violet-400', text: 'text-violet-300', border: 'border-violet-400/30', glow: 'from-violet-500/25' },
  sky: { dot: 'bg-sky-400', text: 'text-sky-300', border: 'border-sky-400/30', glow: 'from-sky-500/25' },
  emerald: { dot: 'bg-emerald-400', text: 'text-emerald-300', border: 'border-emerald-400/30', glow: 'from-emerald-500/25' },
  cyan: { dot: 'bg-cyan-400', text: 'text-cyan-300', border: 'border-cyan-400/30', glow: 'from-cyan-500/25' },
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
    <section className="relative overflow-hidden border-b border-white/[0.06] mesh-hero noise-overlay">
      <div className="absolute inset-0 -z-10 grid-overlay" />
      <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 sm:py-24 lg:px-12 lg:py-28">
        {eyebrow && (
          <div
            className={`inline-flex items-center gap-2 rounded-full border bg-white/[0.04] px-4 py-1.5 text-[12.5px] font-medium backdrop-blur-md ${t.border} ${t.text}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full soft-pulse ${t.dot}`} />
            {eyebrow}
          </div>
        )}
        <h1 className="mt-6 max-w-5xl text-[42px] font-extrabold leading-[1.04] tracking-[-0.035em] text-white sm:text-[60px] lg:text-[76px]">
          {title}
        </h1>
        {subtitle && (
          <div className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/65 sm:text-[17px]">
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
    <section className={`mx-auto max-w-[1440px] px-6 py-16 sm:px-10 sm:py-20 lg:px-12 ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  right,
  tone = 'amber',
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  right?: ReactNode;
  tone?: keyof typeof toneStyles;
}) {
  const t = toneStyles[tone];
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0 flex-1">
        {eyebrow && <div className={`label-caps ${t.text}`}>{eyebrow}</div>}
        <h2 className="mt-2 text-[28px] font-bold tracking-tight text-white sm:text-[36px]">{title}</h2>
        {subtitle && <p className="mt-2 max-w-2xl text-[14.5px] text-white/55">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}
