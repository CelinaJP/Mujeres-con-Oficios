/**
 * Tooltip
 * Tooltip accesible que aparece al hacer hover o focus en el elemento hijo.
 * Usa posición absoluta respecto al contenedor relativo.
 *
 * Props:
 *  - content: string         — texto del tooltip
 *  - children: ReactNode     — elemento trigger
 *  - position?: 'top' | 'bottom' | 'left' | 'right'  (default: 'top')
 *
 * Uso:
 *  <Tooltip content="Asignar profesional al trabajo">
 *    <button>Asignar</button>
 *  </Tooltip>
 */
import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const positionClasses = {
  top:    'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left:   'right-full top-1/2 -translate-y-1/2 mr-2',
  right:  'left-full top-1/2 -translate-y-1/2 ml-2',
};

const arrowClasses = {
  top:    'top-full left-1/2 -translate-x-1/2 border-t-slate-800 border-x-transparent border-b-transparent border-4',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-slate-800 border-x-transparent border-t-transparent border-4',
  left:   'left-full top-1/2 -translate-y-1/2 border-l-slate-800 border-y-transparent border-r-transparent border-4',
  right:  'right-full top-1/2 -translate-y-1/2 border-r-slate-800 border-y-transparent border-l-transparent border-4',
};

/**
 * Tooltip — envuelve cualquier elemento y muestra un tooltip accesible.
 */
const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'top' }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className={`absolute z-[100] pointer-events-none ${positionClasses[position]}`}
        >
          <div className="bg-slate-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap max-w-[200px] text-center leading-tight">
            {content}
          </div>
          <span className={`absolute ${arrowClasses[position]}`} aria-hidden="true" />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
