
import React from 'react';
import { TabType } from '../types';
import { LayoutDashboard, ClipboardList, Users, Zap, Bell } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="layout-color relative min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-200">
            <span className="text-white font-extrabold text-sm tracking-tight">MO</span>
          </div>
          <div>
            <h1 className="font-extrabold text-slate-800 text-base tracking-tight leading-none">Mujeres con Oficios</h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Panel de agencia</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-5">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-100 px-2 py-2 flex justify-around items-center safe-area-bottom shadow-xl">
        <NavButton
          active={activeTab === TabType.DASHBOARD}
          onClick={() => onTabChange(TabType.DASHBOARD)}
          icon={<LayoutDashboard size={21} />}
          label="Inicio"
        />
        <NavButton
          active={activeTab === TabType.MATCHING}
          onClick={() => onTabChange(TabType.MATCHING)}
          icon={<Zap size={21} />}
          label="Matching"
          badge={2}
        />
        <NavButton
          active={activeTab === TabType.SURVEY}
          onClick={() => onTabChange(TabType.SURVEY)}
          icon={<ClipboardList size={21} />}
          label="Ficha"
        />
        <NavButton
          active={activeTab === TabType.DIRECTORY}
          onClick={() => onTabChange(TabType.DIRECTORY)}
          icon={<Users size={21} />}
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
  badge?: number;
}

const NavButton: React.FC<NavButtonProps> = ({ active, icon, label, onClick, badge }) => (
  <button
    onClick={onClick}
    className={`relative flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-2xl transition-all duration-200 ${
      active
        ? 'text-violet-600'
        : 'text-slate-400 hover:text-slate-600'
    }`}
  >
    {active && (
      <span className="absolute inset-0 bg-violet-50 rounded-2xl" />
    )}
    <span className="relative">{icon}</span>
    <span className="relative text-[9px] font-extrabold uppercase tracking-widest">{label}</span>
    {badge !== undefined && badge > 0 && (
      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center border-2 border-white z-10">
        {badge}
      </span>
    )}
  </button>
);

export default Layout;
