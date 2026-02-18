import React from 'react';
import {
  Users, ClipboardList, CheckCircle2, Clock, MapPin,
  TrendingUp, AlertTriangle, ArrowRight, Star, Zap
} from 'lucide-react';
import { mockDashboardStats, mockServiceRequests, mockProfessionals } from '../mockData';
import { TabType, JobStatus } from '../types';

interface DashboardViewProps {
  onNavigate: (tab: TabType) => void;
}

const statusConfig: Record<JobStatus, { label: string; color: string; bg: string }> = {
  pending:     { label: 'Pendiente',   color: 'text-amber-600',  bg: 'bg-amber-50 border-amber-200' },
  in_progress: { label: 'En curso',    color: 'text-blue-600',   bg: 'bg-blue-50 border-blue-200' },
  completed:   { label: 'Completado',  color: 'text-emerald-600',bg: 'bg-emerald-50 border-emerald-200' },
  cancelled:   { label: 'Cancelado',   color: 'text-slate-400',  bg: 'bg-slate-50 border-slate-200' },
};

const priorityConfig = {
  high:   { label: 'Alta',   dot: 'bg-red-500' },
  medium: { label: 'Media',  dot: 'bg-amber-400' },
  low:    { label: 'Baja',   dot: 'bg-emerald-400' },
};

const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const stats = mockDashboardStats;
  const recentRequests = mockServiceRequests.slice(0, 4);
  const topProfessionals = mockProfessionals
    .filter(p => p.availability === 'available')
    .slice(0, 3);

  const statCards = [
    {
      label: 'Profesionales activas',
      value: stats.activeProfessionals,
      total: stats.totalProfessionals,
      icon: <Users size={20} />,
      color: 'text-violet-600',
      bg: 'bg-violet-50',
      accent: 'border-violet-200',
      action: () => onNavigate(TabType.DIRECTORY),
    },
    {
      label: 'Fichas técnicas sin asignar',
      value: stats.pendingRequests,
      icon: <AlertTriangle size={20} />,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      accent: 'border-amber-200',
      action: () => onNavigate(TabType.MATCHING),
    },
    {
      label: 'Trabajos en curso',
      value: stats.inProgressJobs,
      icon: <Clock size={20} />,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      accent: 'border-blue-200',
      action: () => onNavigate(TabType.MATCHING),
    },
    {
      label: 'Completados este mes',
      value: stats.completedThisMonth,
      icon: <CheckCircle2 size={20} />,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      accent: 'border-emerald-200',
      action: () => onNavigate(TabType.MATCHING),
    },
  ];

  return (
    <div className="space-y-6 pb-24">
      {/* Hero / Welcome */}
      <div className="dashboard-hero rounded-3xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-white/70 text-sm font-medium uppercase tracking-widest mb-1">Panel de Gestión</p>
            <h2 className="text-white text-2xl font-extrabold leading-tight">¡Buen día, gestora! 👋</h2>
            <p className="text-white/80 text-sm mt-1">Tenés <strong className="text-white">{stats.pendingRequests} fichas técnicas</strong> sin asignar profesional.</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
            <Zap size={28} className="text-white" />
          </div>
        </div>
        <button
          onClick={() => onNavigate(TabType.MATCHING)}
          className="mt-4 flex items-center gap-2 bg-white text-violet-700 px-4 py-2.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          <ClipboardList size={16} />
          Ver fichas técnicas
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Stat Cards */}
      <section>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Resumen general</h3>
        <div className="grid grid-cols-2 gap-3">
          {statCards.map((card, i) => (
            <button
              key={i}
              onClick={card.action}
              className={`dashboard-stat-card bg-white border ${card.accent} rounded-2xl p-4 text-left shadow-sm hover:shadow-md transition-all active:scale-95`}
            >
              <div className={`${card.bg} ${card.color} w-9 h-9 rounded-xl flex items-center justify-center mb-3`}>
                {card.icon}
              </div>
              <p className={`text-3xl font-extrabold ${card.color} leading-none`}>
                {card.value}
                {card.total !== undefined && (
                  <span className="text-base font-semibold text-slate-400 ml-1">/ {card.total}</span>
                )}
              </p>
              <p className="text-slate-500 text-xs font-medium mt-1 leading-tight">{card.label}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Zone Distribution */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Distribución por zona</h3>
          <button
            onClick={() => onNavigate(TabType.DIRECTORY)}
            className="text-xs text-violet-600 font-bold flex items-center gap-1 hover:underline"
          >
            Ver directorio <ArrowRight size={12} />
          </button>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
          {stats.zones.map(zone => {
            const pct = Math.round((zone.count / stats.totalProfessionals) * 100);
            return (
              <div key={zone.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <MapPin size={12} className="text-violet-500" />
                    <span className="text-sm font-semibold text-slate-700">{zone.name}</span>
                  </div>
                  <span className="text-xs text-slate-400 font-bold">{zone.count} prof.</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent Requests */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fichas técnicas recientes</h3>
          <button
            onClick={() => onNavigate(TabType.MATCHING)}
            className="text-xs text-violet-600 font-bold flex items-center gap-1 hover:underline"
          >
            Ver todas <ArrowRight size={12} />
          </button>
        </div>
        <div className="space-y-2">
          {recentRequests.map(req => {
            const cfg = statusConfig[req.status];
            const priCfg = req.priority ? priorityConfig[req.priority] : null;
            const assignedPro = req.assignedProfessionalId
              ? mockProfessionals.find(p => p.id === req.assignedProfessionalId)
              : null;
            return (
              <div
                key={req.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex items-center gap-4"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${cfg.bg} border ${cfg.bg}`}>
                  <ClipboardList size={18} className={cfg.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-slate-800 text-sm truncate">{req.clientName}</p>
                    {priCfg && (
                      <span className="flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${priCfg.dot}`} />
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{priCfg.label}</span>
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 text-xs truncate">{req.serviceType} · {req.zone}</p>
                  {assignedPro && (
                    <p className="text-violet-600 text-[10px] font-semibold mt-0.5 flex items-center gap-1">
                      <Users size={10} /> {assignedPro.name}
                    </p>
                  )}
                </div>
                <span className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider shrink-0 ${cfg.bg} ${cfg.color}`}>
                  {cfg.label}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Available Professionals */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Disponibles ahora</h3>
          <button
            onClick={() => onNavigate(TabType.DIRECTORY)}
            className="text-xs text-violet-600 font-bold flex items-center gap-1 hover:underline"
          >
            Ver todas <ArrowRight size={12} />
          </button>
        </div>
        <div className="space-y-2">
          {topProfessionals.map(pro => (
            <div
              key={pro.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex items-center gap-4"
            >
              <div className="relative shrink-0">
                <img src={pro.avatar} alt={pro.name} className="w-11 h-11 rounded-xl object-cover" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-800 text-sm truncate">{pro.name}</p>
                <p className="text-slate-500 text-xs truncate">{pro.specialty}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star size={10} className="text-amber-400 fill-amber-400" />
                  <span className="text-[10px] font-bold text-amber-500">{pro.rating}</span>
                  <span className="text-[10px] text-slate-300">·</span>
                  <span className="text-[10px] text-slate-400">{pro.totalJobs} trabajos</span>
                </div>
              </div>
              <button
                onClick={() => onNavigate(TabType.MATCHING)}
                className="bg-violet-50 text-violet-600 px-3 py-1.5 rounded-xl text-xs font-bold border border-violet-200 hover:bg-violet-100 transition-colors shrink-0"
              >
                Asignar
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Acciones rápidas</h3>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => onNavigate(TabType.SURVEY)}
            className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm hover:shadow-md hover:border-rose-300 transition-all active:scale-95"
          >
            <div className="bg-rose-50 text-rose-600 w-10 h-10 rounded-xl flex items-center justify-center">
              <ClipboardList size={20} />
            </div>
            <span className="text-[11px] font-bold text-slate-600 text-center leading-tight">Nueva ficha</span>
          </button>
          <button
            onClick={() => onNavigate(TabType.MATCHING)}
            className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm hover:shadow-md hover:border-blue-300 transition-all active:scale-95"
          >
            <div className="bg-blue-50 text-blue-600 w-10 h-10 rounded-xl flex items-center justify-center">
              <Users size={20} />
            </div>
            <span className="text-[11px] font-bold text-slate-600 text-center leading-tight">Match rápido</span>
          </button>
          <button
            onClick={() => onNavigate(TabType.DIRECTORY)}
            className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm hover:shadow-md hover:border-violet-300 transition-all active:scale-95"
          >
            <div className="bg-violet-50 text-violet-600 w-10 h-10 rounded-xl flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
            <span className="text-[11px] font-bold text-slate-600 text-center leading-tight">Directorio</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default DashboardView;
