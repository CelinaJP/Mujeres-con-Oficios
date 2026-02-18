/**
 * EmptyState
 * Componente para estados vacíos en listas y búsquedas.
 *
 * Props:
 *  - icon: React.ReactNode     — ícono central
 *  - title: string             — mensaje principal
 *  - description?: string      — texto secundario
 *  - action?: { label, onClick } — botón de acción opcional
 *
 * Uso:
 *  <EmptyState
 *    icon={<Users size={32} />}
 *    title="Sin profesionales"
 *    description="Probá ajustando los filtros."
 *    action={{ label: 'Limpiar filtros', onClick: clearFilters }}
 *  />
 */
import React from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * EmptyState — estado vacío reutilizable con ícono, título, descripción y acción opcional.
 */
const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-16 px-6 text-center" role="status">
    <div className="bg-slate-100 rounded-3xl p-6 mb-4 text-slate-300">
      {icon}
    </div>
    <p className="font-extrabold text-slate-500 text-base">{title}</p>
    {description && (
      <p className="text-slate-400 text-sm mt-1 max-w-xs leading-relaxed">{description}</p>
    )}
    {action && (
      <button
        onClick={action.onClick}
        className="mt-4 text-sm text-violet-600 font-bold hover:underline focus-visible:outline-2 focus-visible:outline-violet-500 rounded px-1"
      >
        {action.label}
      </button>
    )}
  </div>
);

export default EmptyState;
