/**
 * NotificationCenter
 * Panel deslizante de notificaciones para el gestor/agencia.
 * Se activa desde el header al pulsar el ícono de campana.
 *
 * Props:
 *  - notifications: AppNotification[]   — lista de notificaciones
 *  - onMarkRead: (id: string) => void    — marca una como leída
 *  - onMarkAllRead: () => void           — marca todas como leídas
 *  - onNavigate: (tab, relatedId?) => void — navega a la sección correspondiente
 *  - onClose: () => void                — cierra el panel
 */
import React from 'react';
import {
  X, Bell, CheckCheck, ClipboardList,
  Users, Zap, AlertCircle, Clock, ArrowRight
} from 'lucide-react';
import { AppNotification, NotificationType, TabType } from '../types';

// ─── Helper: formato relativo de tiempo ──────────────────────────────────────
function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days  = Math.floor(diff / 86_400_000);
  if (mins  < 1)  return 'Ahora mismo';
  if (mins  < 60) return `Hace ${mins} min`;
  if (hours < 24) return `Hace ${hours} h`;
  return `Hace ${days} día${days !== 1 ? 's' : ''}`;
}

// ─── Icon & color per type ────────────────────────────────────────────────────
const typeConfig: Record<NotificationType, {
  icon: React.ReactNode;
  bg: string;
  color: string;
  label: string;
}> = {
  new_request:   { icon: <ClipboardList size={16} />, bg: 'bg-amber-50',   color: 'text-amber-600',   label: 'Solicitud' },
  assignment:    { icon: <Users size={16} />,         bg: 'bg-violet-50',  color: 'text-violet-600',  label: 'Asignación' },
  status_change: { icon: <Zap size={16} />,           bg: 'bg-blue-50',    color: 'text-blue-600',    label: 'Estado' },
  available_pro: { icon: <Users size={16} />,         bg: 'bg-emerald-50', color: 'text-emerald-600', label: 'Profesional' },
  reminder:      { icon: <AlertCircle size={16} />,   bg: 'bg-rose-50',    color: 'text-rose-600',    label: 'Recordatorio' },
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface NotificationCenterProps {
  notifications: AppNotification[];
  onMarkRead:    (id: string) => void;
  onMarkAllRead: () => void;
  onNavigate:    (tab: TabType, relatedId?: string) => void;
  onClose:       () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────
const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onMarkRead,
  onMarkAllRead,
  onNavigate,
  onClose,
}) => {
  const unread = notifications.filter(n => !n.read).length;

  const handleTap = (n: AppNotification) => {
    if (!n.read) onMarkRead(n.id);
    if (n.targetTab) onNavigate(n.targetTab, n.relatedId);
    onClose();
  };

  return (
    /* Overlay */
    <div className="fixed inset-0 z-[80] flex flex-col justify-start" role="dialog" aria-modal="true" aria-label="Centro de notificaciones">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative notification-panel-enter bg-white w-full max-w-2xl mx-auto rounded-b-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="bg-violet-100 text-violet-600 w-9 h-9 rounded-xl flex items-center justify-center">
              <Bell size={18} />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-800 text-base leading-tight">Notificaciones</h2>
              {unread > 0
                ? <p className="text-xs text-violet-600 font-bold">{unread} sin leer</p>
                : <p className="text-xs text-slate-400">Todo al día ✓</p>
              }
            </div>
          </div>
          <div className="flex items-center gap-2">
            {unread > 0 && (
              <button
                onClick={onMarkAllRead}
                className="flex items-center gap-1.5 text-xs text-violet-600 font-bold bg-violet-50 border border-violet-200 px-3 py-1.5 rounded-xl hover:bg-violet-100 transition-colors"
                aria-label="Marcar todas como leídas"
              >
                <CheckCheck size={13} />
                Leer todas
              </button>
            )}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
              aria-label="Cerrar notificaciones"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="overflow-y-auto max-h-[75vh] divide-y divide-slate-50">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center py-14 text-center px-6">
              <div className="bg-slate-100 rounded-3xl p-5 mb-3">
                <Bell size={30} className="text-slate-300 mx-auto" />
              </div>
              <p className="font-bold text-slate-500">Sin notificaciones</p>
              <p className="text-slate-400 text-sm mt-1">Estás al día con toda la actividad.</p>
            </div>
          ) : (
            notifications.map(n => {
              const cfg = typeConfig[n.type];
              return (
                <button
                  key={n.id}
                  onClick={() => handleTap(n)}
                  className={`w-full flex items-start gap-4 px-5 py-4 text-left hover:bg-slate-50 transition-colors focus-visible:outline-2 focus-visible:outline-violet-500 ${
                    !n.read ? 'bg-violet-50/40' : ''
                  }`}
                  aria-label={`${n.title}: ${n.body}`}
                >
                  {/* Icon */}
                  <div className={`${cfg.bg} ${cfg.color} w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5`}>
                    {cfg.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-sm font-bold leading-tight ${n.read ? 'text-slate-700' : 'text-slate-900'}`}>
                        {n.title}
                      </p>
                      {!n.read && (
                        <span className="w-2 h-2 bg-violet-500 rounded-full shrink-0" aria-label="No leída" />
                      )}
                    </div>
                    <p className={`text-xs mt-0.5 leading-relaxed ${n.read ? 'text-slate-400' : 'text-slate-600'}`}>
                      {n.body}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`text-[10px] font-bold uppercase ${cfg.color}`}>{cfg.label}</span>
                      <span className="text-slate-200 text-[10px]">·</span>
                      <div className="flex items-center gap-1 text-slate-400 text-[10px]">
                        <Clock size={9} />
                        {relativeTime(n.timestamp)}
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  {n.targetTab && (
                    <ArrowRight size={15} className="text-slate-300 shrink-0 mt-1.5" aria-hidden="true" />
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/80">
            <p className="text-[11px] text-slate-400 text-center">
              Mostrando las últimas {notifications.length} notificaciones
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;
