import { Outlet } from 'react-router-dom';
import { TopNav } from '../components/TopNav';
import { Footer } from '../components/Footer';

export default function MainLayout() {
  return (
    <div className="min-h-dvh bg-black text-white">
      <TopNav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
