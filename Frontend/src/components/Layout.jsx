import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Home as HomeIcon, FileText, Users, BookOpen } from 'lucide-react';
import Footer from './Footer';

const tabs = [
  { path: '/', label: 'Home', icon: HomeIcon },
  { path: '/notes', label: 'Notes', icon: FileText },
  { path: '/community', label: 'Community', icon: Users },
  { path: '/pyqs', label: "PYQ's", icon: BookOpen },
];

const captions = {
  '/': {
    title: 'Welcome back 👋',
    subtitle: 'Your campus, all in one place. Pick up where you left off.',
  },
  '/notes': {
    title: 'Notes Library',
    subtitle: 'Access high quality, peer-shared study materials.',
  },
  '/community': {
    title: 'Community',
    subtitle: 'Ask doubts, share knowledge, and help others out.',
  },
  '/pyqs': {
    title: 'Previous Year Question Papers',
    subtitle: 'Practice with real exam papers from past semesters.',
  },
};

function Layout() {
  const { pathname } = useLocation();
  const active = captions[pathname] ?? captions['/'];
  const ActiveIcon = tabs.find((t) => t.path === pathname)?.icon ?? HomeIcon;

  return (
    <div className="min-h-screen w-full bg-slate-100">
      {/* Navbar */}
      <header className="bg-slate-900">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-sm">
              C
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">CampusHub</p>
              <p className="text-[11px] text-slate-400 leading-tight">Bennett University</p>
            </div>
          </div>

          <nav className="flex items-center gap-1">
            {tabs.map(({ path, label, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'bg-red-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      {/* Page content */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;