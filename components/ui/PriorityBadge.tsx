/**
 * PriorityBadge
 * Badge visual para niveles de prioridad de solicitudes.
 *
 * Props:
 *  - priority: 'low' | 'medium' | 'high'
 *
 * Uso:
 *  <PriorityBadge priority="high" />
 */
import React from 'react';

interface Props {
  priority: 'low' | 'medium' | 'high';
}

const config = {
  high:   { label: 'Alta',  dot: 'bg-rose-500',  text: 'text-rose-600',  pill: 'bg-rose-50 border-rose-200' },
  medium: { label: 'Media', dot: 'bg-amber-400', text: 'text-amber-600', pill: 'bg-amber-50 border-amber-200' },
  low:    { label: 'Baja',  dot: 'bg-slate-300', text: 'text-slate-500', pill: 'bg-slate-50 border-slate-200' },
};

/**
 * PriorityBadge — indicador de prioridad con punto de color y etiqueta.
 */
const PriorityBadge: React.FC<Props> = ({ priority }) => {
  const { label, dot, text, pill } = config[priority];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wide ${text} ${pill}`}
      aria-label={`Prioridad: ${label}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} aria-hidden="true" />
      {label}
    </span>
  );
};

export default PriorityBadge;
