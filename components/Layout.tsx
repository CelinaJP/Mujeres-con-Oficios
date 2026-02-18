import React, { useState } from 'react';
import { TabType, AppNotification } from '../types';
import {
  LayoutDashboard, ClipboardList, Users, Zap,
  Bell, HelpCircle, X, MessageCircle, FileText,
} from 'lucide-react';
import NotificationCenter from './NotificationCenter';
import OnboardingModal from './OnboardingModal';
import Tooltip from './ui/Tooltip';
import { mockNotifications } from '../mockData';

// ─── Types ──────────────────────────────────────────────────────────────────
interface LayoutProps {
  children: React.ReactNode;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

interface NavButtonProps {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  badge?: number;
  ariaLabel?: string;
}

// ─── NavButton ───────────────────────────────────────────────────────────────
const NavButton: React.FC<NavButtonProps> = ({
  active, icon, label, onClick, badge, ariaLabel,
}) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel ?? label}
    aria-current={active ? 'page' : undefined}
    className={`relative flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-2xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-violet-500 ${
      active ? 'text-violet-600' : 'text-slate-400 hover:text-slate-600'
    }`}
  >
    {active && (
      <span className="absolute inset-0 bg-violet-50 rounded-2xl" aria-hidden="true" />
    )}
    <span className="relative" aria-hidden="true">{icon}</span>
    <span className="relative text-[9px] font-extrabold uppercase tracking-widest">{label}</span>
    {badge !== undefined && badge > 0 && (
      <span
        className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center border-2 border-white z-10"
        aria-hidden="true"
      >
        {badge}
      </span>
    )}
  </button>
);

// ─── HelpPanel ───────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: '¿Cómo asigno una profesional a un trabajo?',
    a: 'Andá a "Matching", abrí la solicitud y pulsá "Asignar profesional". El sistema sugerirá las más adecuadas por zona.',
  },
  {
    q: '¿Cómo cambio el estado de un trabajo?',
    a: 'En el panel de Matching, expandí la solicitud y usá los botones "Iniciar trabajo", "Completado" o "Cancelar".',
  },
  {
    q: '¿Cómo filtro profesionales por disponibilidad?',
    a: 'En el Directorio, pulsá "Filtros" y seleccioná "Disponibles" en la sección de disponibilidad.',
  },
  {
    q: '¿Cómo creo una nueva ficha técnica?',
    a: 'Pulsá el ícono de portapapeles en la barra inferior o el botón "Nueva ficha" en el Dashboard.',
  },
];

const HelpPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div
    className="fixed inset-0 z-[80] flex items-end justify-center"
    role="dialog"
    aria-modal="true"
    aria-label="Ayuda rápida"
  >
    <div
      className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      onClick={onClose}
      aria-hidden="true"
    />
    <div className="relative w-full max-w-2xl bg-white rounded-t-3xl shadow-2xl p-6 notification-panel-enter">
      <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-5" aria-hidden="true" />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="bg-blue-100 text-blue-600 w-9 h-9 rounded-xl flex items-center justify-center">
            <HelpCircle size={18} aria-hidden="true" />
          </div>
          <h2 className="font-extrabold text-slate-800 text-lg">Ayuda rápida</h2>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-violet-500"
          aria-label="Cerrar ayuda"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>

      <div className="space-y-3 mb-5">
        {FAQS.map((item, i) => (
          <details key={i} className="group bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
            <summary className="flex items-center justify-between px-4 py-3 cursor-pointer font-bold text-slate-700 text-sm list-none focus-visible:outline-2 focus-visible:outline-violet-500">
              {item.q}
              <span className="text-violet-500 group-open:rotate-45 transition-transform text-lg leading-none ml-2" aria-hidden="true">+</span>
            </summary>
            <p className="px-4 pb-3 text-slate-500 text-sm leading-relaxed">{item.a}</p>
          </details>
        ))}
      </div>

      <div className="bg-gradient-to-r from-violet-50 to-blue-50 border border-violet-200 rounded-2xl p-4">
        <p className="text-sm font-bold text-slate-700 mb-3">¿Necesitás más ayuda?</p>
        <div className="grid grid-cols-2 gap-2">
          <a
            href="https://wa.me/5491100000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 bg-emerald-500 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition-colors focus-visible:outline-2 focus-visible:outline-emerald-500"
          >
            <MessageCircle size={14} aria-hidden="true" /> WhatsApp
          </a>
          <button className="flex items-center justify-center gap-2 py-2.5 bg-white text-violet-700 border border-violet-300 rounded-xl text-xs font-bold hover:bg-violet-50 transition-colors focus-visible:outline-2 focus-visible:outline-violet-500">
            <FileText size={14} aria-hidden="true" /> Ver docs
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ─── Layout ──────────────────────────────────────────────────────────────────
const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>(mockNotifications);
  const [showNotifs,    setShowNotifs]     = useState(false);
  const [showHelp,      setShowHelp]       = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(
    () => !localStorage.getItem('mo_onboarded'),
  );

  const unreadCount  = notifications.filter(n => !n.read).length;
  const newReqUnread = notifications.filter(n => !n.read && n.type === 'new_request').length;

  const handleMarkRead    = (id: string) =>
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  const handleMarkAllRead = () =>
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const handleNotifNav    = (tab: TabType) => {
    onTabChange(tab);
    setShowNotifs(false);
  };

  return (
    <div className="layout-color relative min-h-screen">
      {/* Skip link para usuarios de teclado */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-violet-600 focus:text-white focus:rounded-xl focus:text-sm focus:font-bold"
      >
        Saltar al contenido
      </a>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex justify-between items-center shadow-sm"
        role="banner"
      >
        <button
          onClick={() => onTabChange(TabType.DASHBOARD)}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-violet-500 rounded-xl"
          aria-label="Ir al Dashboard"
        >
          <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-200" aria-hidden="true">
            <span className="text-white font-extrabold text-sm tracking-tight">MO</span>
          </div>
          <div>
            <h1 className="font-extrabold text-slate-800 text-base tracking-tight leading-none">
              Mujeres con Oficios
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" aria-hidden="true" />
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Panel de agencia</span>
            </div>
          </div>
        </button>

        <div className="flex items-center gap-1">
          <Tooltip content="Ayuda rápida" position="bottom">
            <button
              onClick={() => setShowHelp(true)}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-violet-500"
              aria-label="Abrir panel de ayuda"
            >
              <HelpCircle size={20} aria-hidden="true" />
            </button>
          </Tooltip>

          <Tooltip
            content={unreadCount > 0 ? `${unreadCount} notificaciones sin leer` : 'Notificaciones'}
            position="bottom"
          >
            <button
              onClick={() => setShowNotifs(true)}
              className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-violet-500"
              aria-label={`Notificaciones${unreadCount > 0 ? `, ${unreadCount} sin leer` : ''}`}
            >
              <Bell size={20} aria-hidden="true" />
              {unreadCount > 0 && (
                <span
                  className="absolute top-1 right-1 min-w-[16px] h-4 bg-rose-500 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center border-2 border-white px-0.5"
                  aria-hidden="true"
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          </Tooltip>
        </div>
      </header>

      {/* ── Main ───────────────────────────────────────────────────────────── */}
      <main className="px-4 py-5" id="main-content" tabIndex={-1}>
        {children}
      </main>

      {/* ── Bottom Nav ─────────────────────────────────────────────────────── */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-100 px-2 py-2 flex justify-around items-center safe-area-bottom shadow-xl"
        aria-label="Navegación principal"
        role="navigation"
      >
        <Tooltip content="Dashboard general" position="top">
          <NavButton
            active={activeTab === TabType.DASHBOARD}
            onClick={() => onTabChange(TabType.DASHBOARD)}
            icon={<LayoutDashboard size={21} />}
            label="Inicio"
            ariaLabel="Ir al Dashboard"
          />
        </Tooltip>

        <Tooltip content="Solicitudes y asignaciones" position="top">
          <NavButton
            active={activeTab === TabType.MATCHING}
            onClick={() => onTabChange(TabType.MATCHING)}
            icon={<Zap size={21} />}
            label="Matching"
            badge={newReqUnread}
            ariaLabel="Ir a Matching y Asignaciones"
          />
        </Tooltip>

        <Tooltip content="Nueva ficha técnica" position="top">
          <NavButton
            active={activeTab === TabType.SURVEY}
            onClick={() => onTabChange(TabType.SURVEY)}
            icon={<ClipboardList size={21} />}
            label="Ficha"
            ariaLabel="Crear ficha técnica"
          />
        </Tooltip>

        <Tooltip content="Directorio de profesionales" position="top">
          <NavButton
            active={activeTab === TabType.DIRECTORY}
            onClick={() => onTabChange(TabType.DIRECTORY)}
            icon={<Users size={21} />}
            label="Directorio"
            ariaLabel="Ver directorio de profesionales"
          />
        </Tooltip>
      </nav>

      {/* ── Overlays ───────────────────────────────────────────────────────── */}
      {showNotifs && (
        <NotificationCenter
          notifications={notifications}
          onMarkRead={handleMarkRead}
          onMarkAllRead={handleMarkAllRead}
          onNavigate={handleNotifNav}
          onClose={() => setShowNotifs(false)}
        />
      )}

      {showHelp && <HelpPanel onClose={() => setShowHelp(false)} />}

      {showOnboarding && (
        <OnboardingModal onComplete={() => setShowOnboarding(false)} />
      )}
    </div>
  );
};

export default Layout;
