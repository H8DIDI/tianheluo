import { Outlet } from 'react-router-dom';
import { TopNav } from '../components/TopNav';
import { Footer } from '../components/Footer';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#05050a] text-neutral-200 selection:bg-amber-400/30 selection:text-amber-100">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-50 [background:radial-gradient(ellipse_at_top,rgba(245,158,11,0.08),transparent_50%)]" />
      <div className="relative z-10">
        <TopNav />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
