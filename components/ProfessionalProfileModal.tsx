import React from 'react';
import {
  X, MessageCircle, MapPin, Star, Briefcase,
  Award, CheckCircle2, Clock, XCircle
} from 'lucide-react';
import { Professional, AvailabilityStatus, JobStatus } from '../types';

interface Props {
  professional: Professional;
  onClose: () => void;
  onAssign?: (id: string) => void;
}

const availabilityConfig: Record<AvailabilityStatus, { label: string; color: string; dot: string }> = {
  available:   { label: 'Disponible',  color: 'text-emerald-600', dot: 'bg-emerald-500' },
  busy:        { label: 'Ocupada',     color: 'text-amber-600',   dot: 'bg-amber-400' },
  unavailable: { label: 'No disponible', color: 'text-slate-400', dot: 'bg-slate-300' },
};

const jobStatusConfig: Record<JobStatus, { label: string; icon: React.ReactNode; color: string }> = {
  completed:   { label: 'Completado',  icon: <CheckCircle2 size={14} />, color: 'text-emerald-600' },
  in_progress: { label: 'En curso',   icon: <Clock size={14} />,        color: 'text-blue-600' },
  pending:     { label: 'Pendiente',  icon: <Clock size={14} />,        color: 'text-amber-600' },
  cancelled:   { label: 'Cancelado',  icon: <XCircle size={14} />,      color: 'text-slate-400' },
};

const ProfessionalProfileModal: React.FC<Props> = ({ professional: pro, onClose, onAssign }) => {
  const avail = availabilityConfig[pro.availability ?? 'available'];

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}
      />
    ));

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-t-3xl shadow-2xl overflow-hidden profile-modal-enter">
        {/* Drag handle */}
        <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mt-3" />

        {/* Header hero */}
        <div className="profile-hero px-6 pt-4 pb-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
          >
            <X size={18} />
          </button>
          <div className="flex items-end gap-4">
            <img
              src={pro.avatar}
              alt={pro.name}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white/40 shadow-xl"
            />
            <div className="pb-1">
              <h3 className="text-white text-xl font-extrabold leading-tight">{pro.name}</h3>
              <p className="text-white/80 text-sm font-medium">{pro.specialty}</p>
              <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                <span className="flex items-center gap-1 text-white/70 text-xs">
                  <MapPin size={12} /> {pro.zone}
                </span>
                <span className={`flex items-center gap-1.5 text-xs font-bold bg-white/20 px-2.5 py-1 rounded-full ${avail.color}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${avail.dot}`} />
                  {avail.label}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Body - scrollable */}
        <div className="overflow-y-auto max-h-[60vh] px-6 py-5 space-y-5">
          {/* Rating + Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-3 text-center">
              <div className="flex justify-center mb-1">{renderStars(pro.rating ?? 0)}</div>
              <p className="text-amber-700 text-xl font-extrabold">{pro.rating?.toFixed(1)}</p>
              <p className="text-amber-500 text-[10px] font-bold uppercase">Calificación</p>
            </div>
            <div className="bg-violet-50 border border-violet-100 rounded-2xl p-3 text-center">
              <Briefcase size={20} className="text-violet-500 mx-auto mb-1" />
              <p className="text-violet-700 text-xl font-extrabold">{pro.totalJobs}</p>
              <p className="text-violet-500 text-[10px] font-bold uppercase">Trabajos</p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3 text-center">
              <Award size={20} className="text-blue-500 mx-auto mb-1" />
              <p className="text-blue-700 text-xl font-extrabold">{pro.coursesCompleted.length}</p>
              <p className="text-blue-500 text-[10px] font-bold uppercase">Cursos</p>
            </div>
          </div>

          {/* Bio */}
          {pro.bio && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Sobre ella</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{pro.bio}</p>
            </div>
          )}

          {/* Skills */}
          {pro.skills && pro.skills.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Habilidades</h4>
              <div className="flex flex-wrap gap-2">
                {pro.skills.map(skill => (
                  <span
                    key={skill}
                    className="bg-violet-100 text-violet-700 px-3 py-1.5 rounded-xl text-xs font-bold border border-violet-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Courses */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Certificaciones</h4>
            <div className="flex flex-wrap gap-2">
              {pro.coursesCompleted.map(course => (
                <span
                  key={course}
                  className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl text-xs font-bold border border-emerald-200"
                >
                  <CheckCircle2 size={12} />
                  {course}
                </span>
              ))}
            </div>
          </div>

          {/* Portfolio */}
          {pro.portfolio.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Portafolio</h4>
              <div className="grid grid-cols-3 gap-2">
                {pro.portfolio.map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
                    <img src={img} alt={`Trabajo ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Job History */}
          {pro.jobHistory && pro.jobHistory.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Historial de trabajos</h4>
              <div className="space-y-2">
                {pro.jobHistory.map(job => {
                  const cfg = jobStatusConfig[job.status];
                  return (
                    <div key={job.id} className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-bold text-slate-800 text-sm truncate">{job.clientName}</p>
                        <p className="text-slate-500 text-xs">{job.serviceType} · {job.date}</p>
                        {job.notes && <p className="text-slate-400 text-[11px] mt-0.5 italic truncate">"{job.notes}"</p>}
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className={`flex items-center gap-1 text-[10px] font-bold uppercase ${cfg.color}`}>
                          {cfg.icon} {cfg.label}
                        </span>
                        {job.rating && (
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: job.rating }).map((_, i) => (
                              <Star key={i} size={10} className="text-amber-400 fill-amber-400" />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 grid grid-cols-2 gap-3 bg-white">
          {onAssign && (
            <button
              onClick={() => onAssign(pro.id)}
              className="flex items-center justify-center gap-2 p-4 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-violet-200 active:scale-95"
            >
              <Briefcase size={18} />
              Asignar trabajo
            </button>
          )}
          <a
            href={`https://wa.me/${pro.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 p-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold transition-all shadow-lg shadow-emerald-100 active:scale-95 ${!onAssign ? 'col-span-2' : ''}`}
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalProfileModal;
