
import React from 'react';
import { TabType } from '../types';
import { ClipboardList, BookOpen, Users, Bell } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-violet-200">
             <span className="text-white font-bold text-sm">MO</span>
          </div>
          <div>
            <h1 className="font-bold text-base text-slate-800 tracking-tight leading-none">Comunidad MO</h1>
            <div className="flex items-center gap-1 mt-0.5">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Cloud Sync On</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 text-slate-400 hover:text-violet-600 transition-colors">
            <CloudCheck size={20} />
          </button>
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 px-6 py-3 flex justify-around items-center safe-area-bottom shadow-lg md:max-w-md md:mx-auto md:mb-4 md:rounded-full md:bottom-4 md:border">
        <NavButton 
          active={activeTab === TabType.SURVEY} 
          onClick={() => onTabChange(TabType.SURVEY)}
          icon={<ClipboardList size={22} />}
          label="Relevamientos"
        />
        <NavButton 
          active={activeTab === TabType.ACADEMY} 
          onClick={() => onTabChange(TabType.ACADEMY)}
          icon={<BookOpen size={22} />}
          label="Academia"
        />
        <NavButton 
          active={activeTab === TabType.DIRECTORY} 
          onClick={() => onTabChange(TabType.DIRECTORY)}
          icon={<Users size={22} />}
          label="Directorio"
        />
      </nav>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? 'text-violet-600 scale-105' : 'text-slate-400 hover:text-slate-600'}`}
  >
    {icon}
    <span className="text-[10px] font-semibold uppercase tracking-wider">{label}</span>
  </button>
);

// Fallback icon for CloudCheck if not available in version
const CloudCheck = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v2"/><path d="m16 19 2 2 4-4"/></svg>
);

export default Layout;
