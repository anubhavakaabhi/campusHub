import { useState, useEffect } from 'react';
import { Home as HomeIcon, FileText, Users, BookOpen } from 'lucide-react';
import cookie from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/auth.services.js';

const tabs = [
  { key: 'home', label: 'Home', icon: HomeIcon },
];

const tabContent = {
  home: {
    title: 'Welcome back 👋',
    subtitle: 'Your campus, all in one place. Pick up where you left off.',
  },
};

function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const active = tabContent[activeTab];

 useEffect(() => {
  api.get('/me')
    .then((res) => console.log(res.data))
    .catch(() => navigate('/login'));
}, []);

  return (
    <div className="min-h-screen w-full bg-slate-100">

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