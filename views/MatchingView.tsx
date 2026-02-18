import React, { useState, useMemo } from 'react';
import {
  ClipboardList, Users, CheckCircle2, Clock, XCircle,
  Search, Filter, ChevronDown, MapPin, Star, Zap,
  X, AlertTriangle, ArrowRight, MessageCircle
} from 'lucide-react';
import { mockServiceRequests, mockProfessionals } from '../mockData';
import { ServiceRequest, JobStatus, Professional } from '../types';
import ProfessionalProfileModal from '../components/ProfessionalProfileModal';

// ─── Configs ──────────────────────────────────────────────────────────────────

const statusConfig: Record<JobStatus, {
  label: string; color: string; bg: string; border: string; icon: React.ReactNode;
}> = {
  pending:     { label: 'Pendiente',  color: 'text-amber-700', bg: 'bg-amber-50',   border: 'border-amber-200', icon: <Clock size={14} /> },
  in_progress: { label: 'En curso',   color: 'text-blue-700',  bg: 'bg-blue-50',    border: 'border-blue-200',  icon: <Zap size={14} /> },
  completed:   { label: 'Completado', color: 'text-emerald-700',bg:'bg-emerald-50', border: 'border-emerald-200',icon: <CheckCircle2 size={14} /> },
  cancelled:   { label: 'Cancelado',  color: 'text-slate-500', bg: 'bg-slate-50',   border: 'border-slate-200', icon: <XCircle size={14} /> },
};

const priorityConfig = {
  high:   { label: 'Alta',   dot: 'bg-rose-500',   text: 'text-rose-600',   pill: 'bg-rose-50 border-rose-200' },
  medium: { label: 'Media',  dot: 'bg-amber-400',  text: 'text-amber-600',  pill: 'bg-amber-50 border-amber-200' },
  low:    { label: 'Baja',   dot: 'bg-slate-300',  text: 'text-slate-500',  pill: 'bg-slate-50 border-slate-200' },
};

const availabilityDot: Record<string, string> = {
  available:   'bg-emerald-500',
  busy:        'bg-amber-400',
  unavailable: 'bg-slate-300',
};

// ─── Sub-components ────────────────────────────────────────────────────────────

interface AssignDrawerProps {
  request: ServiceRequest;
  onClose: () => void;
  onAssign: (requestId: string, professionalId: string) => void;
  onViewProfile: (pro: Professional) => void;
}

const AssignDrawer: React.FC<AssignDrawerProps> = ({ request, onClose, onAssign, onViewProfile }) => {
  const [search, setSearch] = useState('');

  // Suggest by zone match first, then available
  const sorted = useMemo(() => {
    const q = search.toLowerCase();
    return [...mockProfessionals]
      .filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.specialty.toLowerCase().includes(q) ||
        (p.skills ?? []).some(s => s.toLowerCase().includes(q))
      )
      .sort((a, b) => {
        const aMatch = a.zone === request.zone ? -1 : 0;
        const bMatch = b.zone === request.zone ? -1 : 0;
        const aAvail = a.availability === 'available' ? -1 : 0;
        const bAvail = b.availability === 'available' ? -1 : 0;
        return (aMatch + aAvail) - (bMatch + bAvail);
      });
  }, [search, request.zone]);

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-t-3xl shadow-2xl overflow-hidden">
        <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mt-3" />
        <div className="px-5 pt-3 pb-4 border-b border-slate-100">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-slate-800">Asignar profesional</h3>
              <p className="text-slate-500 text-xs mt-0.5">
                {request.serviceType} · <span className="font-semibold">{request.clientName}</span> · {request.zone}
              </p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
              <X size={20} />
            </button>
          </div>
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar profesional…"
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:ring-2 focus:ring-violet-400 focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-y-auto max-h-[55vh] p-4 space-y-2">
          {sorted.map(pro => {
            const isAssigned = request.assignedProfessionalId === pro.id;
            const isZoneMatch = pro.zone === request.zone;
            const dot = availabilityDot[pro.availability ?? 'available'];
            return (
              <div
                key={pro.id}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                  isAssigned
                    ? 'bg-violet-50 border-violet-300'
                    : 'bg-white border-slate-200 hover:border-violet-200 hover:bg-slate-50'
                }`}
              >
                <button className="flex items-center gap-3 flex-1 min-w-0 text-left" onClick={() => onViewProfile(pro)}>
                  <div className="relative shrink-0">
                    <img src={pro.avatar} alt={pro.name} className="w-11 h-11 rounded-xl object-cover" />
                    <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${dot}`} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <p className="font-bold text-slate-800 text-sm">{pro.name}</p>
                      {isZoneMatch && (
                        <span className="bg-violet-100 text-violet-600 text-[9px] font-extrabold px-2 py-0.5 rounded-full border border-violet-200 uppercase">
                          Zona ideal
                        </span>
                      )}
                    </div>
                    <p className="text-slate-500 text-xs truncate">{pro.specialty}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star size={10} className="text-amber-400 fill-amber-400" />
                      <span className="text-[10px] font-bold text-amber-600">{pro.rating}</span>
                      <span className="text-[10px] text-slate-300">·</span>
                      <span className="text-[10px] text-slate-400">{pro.totalJobs} trab.</span>
                    </div>
                  </div>
                </button>

                <div className="flex items-center gap-2 shrink-0">
                  {isAssigned ? (
                    <span className="flex items-center gap-1 bg-violet-600 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-xl">
                      <CheckCircle2 size={11} /> Asignada
                    </span>
                  ) : (
                    <button
                      onClick={() => onAssign(request.id, pro.id)}
                      className="bg-violet-50 text-violet-700 border border-violet-200 text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-violet-600 hover:text-white hover:border-violet-600 transition-all"
                    >
                      Asignar
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── Main View ─────────────────────────────────────────────────────────────────

const STATUS_TABS: { value: JobStatus | 'all'; label: string; count?: number }[] = [
  { value: 'all',         label: 'Todas' },
  { value: 'pending',     label: 'Pendientes' },
  { value: 'in_progress', label: 'En curso' },
  { value: 'completed',   label: 'Completadas' },
];

const MatchingView: React.FC = () => {
  const [requests, setRequests]       = useState<ServiceRequest[]>(mockServiceRequests);
  const [activeTab, setActiveTab]     = useState<JobStatus | 'all'>('all');
  const [search, setSearch]           = useState('');
  const [selectedReq, setSelectedReq] = useState<ServiceRequest | null>(null);
  const [viewPro, setViewPro]         = useState<Professional | null>(null);
  const [expandedId, setExpandedId]   = useState<string | null>(null);

  const filtered = useMemo(() =>
    requests.filter(r => {
      const q = search.toLowerCase();
      const matchStatus = activeTab === 'all' || r.status === activeTab;
      const matchSearch =
        r.clientName.toLowerCase().includes(q) ||
        r.serviceType.toLowerCase().includes(q) ||
        r.zone.toLowerCase().includes(q);
      return matchStatus && matchSearch;
    }),
    [requests, activeTab, search]
  );

  const tabCounts = useMemo(() => ({
    all:         requests.length,
    pending:     requests.filter(r => r.status === 'pending').length,
    in_progress: requests.filter(r => r.status === 'in_progress').length,
    completed:   requests.filter(r => r.status === 'completed').length,
  }), [requests]);

  const handleAssign = (requestId: string, proId: string) => {
    setRequests(prev => prev.map(r =>
      r.id === requestId
        ? { ...r, assignedProfessionalId: proId, status: r.status === 'pending' ? 'in_progress' : r.status }
        : r
    ));
    setSelectedReq(null);
  };

  const handleStatusChange = (requestId: string, newStatus: JobStatus) => {
    setRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: newStatus } : r));
  };

  return (
    <div className="space-y-5 pb-24">
      {/* Header */}
      <header>
        <h2 className="text-2xl font-extrabold text-slate-800">Matching & Asignación</h2>
        <p className="text-slate-500 text-sm mt-0.5">
          Gestioná solicitudes y asigná profesionales al trabajo.
        </p>
      </header>

      {/* Summary Strip */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Pendientes', value: tabCounts.pending, color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', icon: <AlertTriangle size={15} /> },
          { label: 'En curso',   value: tabCounts.in_progress, color: 'text-blue-700',  bg: 'bg-blue-50',  border: 'border-blue-200',  icon: <Zap size={15} /> },
          { label: 'Completadas',value: tabCounts.completed,   color: 'text-emerald-700',bg:'bg-emerald-50',border:'border-emerald-200',icon: <CheckCircle2 size={15} /> },
        ].map(s => (
          <div key={s.label} className={`${s.bg} border ${s.border} rounded-2xl p-3 text-center`}>
            <div className={`${s.color} flex justify-center mb-1`}>{s.icon}</div>
            <p className={`text-xl font-extrabold ${s.color}`}>{s.value}</p>
            <p className={`text-[10px] font-bold uppercase ${s.color} opacity-70`}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por cliente, servicio o zona…"
          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-violet-400 focus:border-transparent text-sm text-slate-700 placeholder:text-slate-400"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500">
            <X size={15} />
          </button>
        )}
      </div>

      {/* Status Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
        {STATUS_TABS.map(tab => {
          const count = tabCounts[tab.value as keyof typeof tabCounts];
          const active = activeTab === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap border transition-all ${
                active
                  ? 'bg-violet-600 text-white border-violet-600 shadow-sm shadow-violet-200'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-violet-300'
              }`}
            >
              {tab.label}
              <span className={`px-1.5 py-0.5 rounded-lg text-[10px] font-extrabold ${
                active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Requests List */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <div className="bg-slate-100 rounded-3xl p-6 mb-4">
            <ClipboardList size={34} className="text-slate-300 mx-auto" />
          </div>
          <p className="font-bold text-slate-500">Sin solicitudes</p>
          <p className="text-slate-400 text-sm mt-1">No hay solicitudes con los filtros actuales.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(req => {
            const cfg = statusConfig[req.status];
            const pri = req.priority ? priorityConfig[req.priority] : null;
            const assignedPro = req.assignedProfessionalId
              ? mockProfessionals.find(p => p.id === req.assignedProfessionalId)
              : null;
            const isExpanded = expandedId === req.id;

            return (
              <div
                key={req.id}
                className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${
                  isExpanded ? 'border-violet-300 shadow-md shadow-violet-100' : 'border-slate-200'
                }`}
              >
                {/* Card header - always visible */}
                <button
                  className="w-full p-4 text-left flex items-start gap-3"
                  onClick={() => setExpandedId(isExpanded ? null : req.id)}
                >
                  {/* Status icon */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${cfg.bg} border ${cfg.border}`}>
                    <span className={cfg.color}>{cfg.icon}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-extrabold text-slate-800 text-sm">{req.clientName}</p>
                      {pri && (
                        <span className={`flex items-center gap-1 border text-[10px] font-bold px-2 py-0.5 rounded-lg ${pri.pill} ${pri.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${pri.dot}`} />
                          {pri.label}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-500 text-xs mt-0.5">{req.serviceType} · {req.zone}</p>
                    <p className="text-slate-400 text-[11px]">{req.date}</p>
                    {assignedPro && (
                      <p className="text-violet-600 text-xs font-semibold mt-1 flex items-center gap-1">
                        <Users size={11} /> {assignedPro.name}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className={`px-2.5 py-1 rounded-xl border text-[10px] font-bold uppercase ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                      {cfg.label}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-slate-300 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </div>
                </button>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-0 space-y-4 border-t border-slate-100">
                    {/* Notes */}
                    {req.notes && (
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Notas</p>
                        <p className="text-slate-600 text-sm">{req.notes}</p>
                      </div>
                    )}

                    {/* Address */}
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <MapPin size={14} className="text-slate-400 shrink-0" />
                      <span>{req.address}</span>
                    </div>

                    {/* Assigned professional card */}
                    {assignedPro && (
                      <div className="bg-violet-50 border border-violet-200 rounded-2xl p-3 flex items-center gap-3">
                        <div className="relative shrink-0">
                          <img src={assignedPro.avatar} alt={assignedPro.name} className="w-10 h-10 rounded-xl object-cover" />
                          <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${availabilityDot[assignedPro.availability ?? 'available']}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-violet-800 text-sm">{assignedPro.name}</p>
                          <p className="text-violet-600 text-xs">{assignedPro.specialty}</p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => setViewPro(assignedPro)}
                            className="border border-violet-300 text-violet-600 text-xs font-bold px-2.5 py-1.5 rounded-xl hover:bg-violet-100 transition-colors"
                          >
                            Ver perfil
                          </button>
                          <a
                            href={`https://wa.me/${assignedPro.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-emerald-500 text-white p-1.5 rounded-xl hover:bg-emerald-600 transition-colors"
                          >
                            <MessageCircle size={14} />
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="grid gap-2">
                      {/* Assign / Reassign */}
                      {(req.status === 'pending' || req.status === 'in_progress') && (
                        <button
                          onClick={() => setSelectedReq(req)}
                          className="flex items-center justify-center gap-2 w-full py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-bold text-sm transition-all shadow-md shadow-violet-200 active:scale-95"
                        >
                          <Users size={16} />
                          {assignedPro ? 'Reasignar profesional' : 'Asignar profesional'}
                          <ArrowRight size={14} />
                        </button>
                      )}

                      {/* Status actions */}
                      <div className="grid grid-cols-2 gap-2">
                        {req.status === 'pending' && (
                          <button
                            onClick={() => handleStatusChange(req.id, 'in_progress')}
                            className="flex items-center justify-center gap-1.5 py-2.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors"
                          >
                            <Zap size={13} /> Iniciar trabajo
                          </button>
                        )}
                        {req.status === 'in_progress' && (
                          <button
                            onClick={() => handleStatusChange(req.id, 'completed')}
                            className="flex items-center justify-center gap-1.5 py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors"
                          >
                            <CheckCircle2 size={13} /> Marcar completado
                          </button>
                        )}
                        {req.status !== 'cancelled' && req.status !== 'completed' && (
                          <button
                            onClick={() => handleStatusChange(req.id, 'cancelled')}
                            className="flex items-center justify-center gap-1.5 py-2.5 bg-slate-50 text-slate-500 border border-slate-200 rounded-xl text-xs font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                          >
                            <XCircle size={13} /> Cancelar
                          </button>
                        )}
                        {(req.status === 'completed' || req.status === 'cancelled') && (
                          <button
                            onClick={() => handleStatusChange(req.id, 'pending')}
                            className="flex items-center justify-center gap-1.5 py-2.5 bg-slate-50 text-slate-600 border border-slate-200 rounded-xl text-xs font-bold hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200 transition-colors"
                          >
                            <Filter size={13} /> Reabrir
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Assign Drawer */}
      {selectedReq && (
        <AssignDrawer
          request={selectedReq}
          onClose={() => setSelectedReq(null)}
          onAssign={handleAssign}
          onViewProfile={pro => { setSelectedReq(null); setViewPro(pro); }}
        />
      )}

      {/* Professional Profile Modal */}
      {viewPro && (
        <ProfessionalProfileModal
          professional={viewPro}
          onClose={() => setViewPro(null)}
          onAssign={proId => {
            if (selectedReq) handleAssign(selectedReq.id, proId);
            setViewPro(null);
          }}
        />
      )}
    </div>
  );
};

export default MatchingView;
