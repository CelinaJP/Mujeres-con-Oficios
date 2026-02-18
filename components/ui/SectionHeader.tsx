/**
 * SectionHeader
 * Cabecera de sección reutilizable con título, contador y acción opcional.
 *
 * Props:
 *  - title: string              — etiqueta de la sección
 *  - count?: number             — número opcional entre paréntesis
 *  - actionLabel?: string       — texto del enlace de acción
 *  - onAction?: () => void      — callback del enlace de acción
 *
 * Uso:
 *  <SectionHeader title="Solicitudes recientes" count={4} actionLabel="Ver todas" onAction={() => onNavigate(TabType.MATCHING)} />
 */
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  count?: number;
  actionLabel?: string;
  onAction?: () => void;
}

/**
 * SectionHeader — cabecera de sección consistente con texto en mayúsculas y enlace de acción.
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, count, actionLabel, onAction }) => (
  <div className="flex items-center justify-between mb-3">
    <div className="flex items-center gap-2">
      <h3 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
        {title}
      </h3>
      {count !== undefined && (
        <span className="bg-slate-200 text-slate-500 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </div>
    {actionLabel && onAction && (
      <button
        onClick={onAction}
        className="text-xs text-violet-600 font-bold flex items-center gap-1 hover:underline focus-visible:outline-2 focus-visible:outline-violet-500 rounded px-1"
        aria-label={actionLabel}
      >
        {actionLabel}
        <ArrowRight size={12} aria-hidden="true" />
      </button>
    )}
  </div>
);

export default SectionHeader;
