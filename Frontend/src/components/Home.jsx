import { useState } from 'react';
import { Home as HomeIcon, FileText, Users, BookOpen } from 'lucide-react';

const tabs = [
  { key: 'home', label: 'Home', icon: HomeIcon },
  { key: 'notes', label: 'Notes', icon: FileText },
  { key: 'community', label: 'Community', icon: Users },
  { key: 'pyqs', label: "PYQ's", icon: BookOpen },
];

const tabContent = {
  home: {
    title: 'Welcome back 👋',
    subtitle: 'Your campus, all in one place. Pick up where you left off.',
  },
  notes: {
    title: 'Notes Library',
    subtitle: 'Access high quality, peer-shared study materials.',
  },
  community: {
    title: 'Community',
    subtitle: 'Ask doubts, share knowledge, and help others out.',
  },
  pyqs: {
    title: "Previous Year Question Papers",
    subtitle: 'Practice with real exam papers from past semesters.',
  },
};

function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const active = tabContent[activeTab];

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
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                  activeTab === key
                    ? 'bg-red-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-10 flex flex-col items-center text-center">
          <span className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
            {(() => {
              const ActiveIcon = tabs.find((t) => t.key === activeTab).icon;
              return <ActiveIcon size={24} />;
            })()}
          </span>
          <h1 className="text-2xl font-bold text-slate-900">{active.title}</h1>
          <p className="text-sm text-slate-500 mt-2 max-w-md">{active.subtitle}</p>
        </div>
      </main>
    </div>
  );
}

export default Home;