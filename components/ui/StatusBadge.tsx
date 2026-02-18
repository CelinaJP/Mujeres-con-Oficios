/**
 * StatusBadge
 * Badge visual para estados de trabajo (JobStatus).
 *
 * Props:
 *  - status: JobStatus
 *  - size?: 'sm' | 'md'   — por defecto 'sm'
 *
 * Uso:
 *  <StatusBadge status="pending" />
 *  <StatusBadge status="completed" size="md" />
 */
import React from 'react';
import { Clock, Zap, CheckCircle2, XCircle } from 'lucide-react';
import { JobStatus } from '../../types';

interface Props {
  status: JobStatus;
  size?: 'sm' | 'md';
}

const config: Record<JobStatus, {
  label: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  border: string;
}> = {
  pending:     { label: 'Pendiente',   icon: <Clock    size={12} />, color: 'text-amber-700',  bg: 'bg-amber-50',   border: 'border-amber-200' },
  in_progress: { label: 'En curso',    icon: <Zap      size={12} />, color: 'text-blue-700',   bg: 'bg-blue-50',    border: 'border-blue-200' },
  completed:   { label: 'Completado',  icon: <CheckCircle2 size={12} />, color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  cancelled:   { label: 'Cancelado',   icon: <XCircle  size={12} />, color: 'text-slate-500',  bg: 'bg-slate-100',  border: 'border-slate-200' },
};

/**
 * StatusBadge — muestra un badge coloreado con ícono según el estado del trabajo.
 */
const StatusBadge: React.FC<Props> = ({ status, size = 'sm' }) => {
  const { label, icon, color, bg, border } = config[status];
  const textSize = size === 'md' ? 'text-xs' : 'text-[10px]';
  const padding  = size === 'md' ? 'px-3 py-1.5' : 'px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 ${padding} rounded-xl border font-bold uppercase tracking-wide ${textSize} ${color} ${bg} ${border}`}
      aria-label={`Estado: ${label}`}
    >
      {icon}
      {label}
    </span>
  );
};

export default StatusBadge;
