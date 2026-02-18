/**
 * AvailabilityBadge
 * Muestra el estado de disponibilidad de una profesional.
 *
 * Props:
 *  - status: AvailabilityStatus
 *  - showLabel?: boolean  — muestra la etiqueta de texto (default: true)
 *
 * Uso:
 *  <AvailabilityBadge status="available" />
 *  <AvailabilityBadge status="busy" showLabel={false} />
 */
import React from 'react';
import { AvailabilityStatus } from '../../types';

interface Props {
  status: AvailabilityStatus;
  showLabel?: boolean;
}

const config: Record<AvailabilityStatus, { label: string; dot: string; color: string }> = {
  available:   { label: 'Disponible',    dot: 'bg-emerald-500', color: 'text-emerald-600' },
  busy:        { label: 'Ocupada',       dot: 'bg-amber-400',   color: 'text-amber-600' },
  unavailable: { label: 'No disponible', dot: 'bg-slate-300',   color: 'text-slate-400' },
};

/**
 * AvailabilityBadge — punto de color + etiqueta de disponibilidad.
 */
const AvailabilityBadge: React.FC<Props> = ({ status, showLabel = true }) => {
  const { label, dot, color } = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-bold ${color}`}
      aria-label={`Disponibilidad: ${label}`}
    >
      <span className={`w-2 h-2 rounded-full ${dot} ${status === 'available' ? 'animate-pulse' : ''}`} aria-hidden="true" />
      {showLabel && label}
    </span>
  );
};

export default AvailabilityBadge;
