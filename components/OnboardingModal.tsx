/**
 * OnboardingModal
 * Modal de bienvenida para gestores que acceden por primera vez.
 * Se muestra automáticamente si no existe la key 'mo_onboarded' en localStorage.
 * El usuario puede navegar por los pasos con "Siguiente" o saltarlo con "Omitir".
 *
 * Props:
 *  - onComplete: () => void   — callback al finalizar o saltar el onboarding
 *
 * Uso:
 *  // En App.tsx o Layout.tsx:
 *  const [showOnboarding, setShowOnboarding] = useState(
 *    () => !localStorage.getItem('mo_onboarded')
 *  );
 *  {showOnboarding && <OnboardingModal onComplete={() => setShowOnboarding(false)} />}
 */
import React, { useState } from 'react';
import {
  LayoutDashboard, Zap, Users, ClipboardList,
  ArrowRight, CheckCircle2, X, Bell
} from 'lucide-react';

interface OnboardingModalProps {
  onComplete: () => void;
}

// ─── Pasos del onboarding ─────────────────────────────────────────────────────
const STEPS = [
  {
    icon: <LayoutDashboard size={40} className="text-violet-500" />,
    bg: 'bg-violet-50',
    title: '¡Bienvenida al Panel MO! 👋',
    description:
      'Esta plataforma está diseñada para que gestiones el contacto entre clientas y profesionales de manera ágil y profesional.',
  },
  {
    icon: <ClipboardList size={40} className="text-rose-500" />,
    bg: 'bg-rose-50',
    title: 'Fichás el servicio',
    description:
      'Desde "Ficha Técnica" registrás los datos del trabajo: clienta, dirección, tipo de servicio, fotos y materiales.',
  },
  {
    icon: <Zap size={40} className="text-amber-500" />,
    bg: 'bg-amber-50',
    title: 'Asignás y coordinás',
    description:
      'En "Matching" ves todas las solicitudes abiertas y podés asignar a la profesional ideal según zona y especialidad.',
  },
  {
    icon: <Users size={40} className="text-emerald-500" />,
    bg: 'bg-emerald-50',
    title: 'Directorio de profesionales',
    description:
      'Accedé al directorio completo con perfiles, portafolios, historial de trabajos y estado de disponibilidad en tiempo real.',
  },
  {
    icon: <Bell size={40} className="text-blue-500" />,
    bg: 'bg-blue-50',
    title: 'Notificaciones al instante',
    description:
      'La campana del header te avisa sobre nuevas solicitudes, cambios de estado y profesionales disponibles.',
  },
];

/**
 * OnboardingModal — guía de bienvenida paso a paso para nuevas gestoras.
 */
const OnboardingModal: React.FC<OnboardingModalProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const isLast = step === STEPS.length - 1;
  const current = STEPS[step];

  const handleComplete = () => {
    localStorage.setItem('mo_onboarded', 'true');
    onComplete();
  };

  const handleNext = () => {
    if (isLast) handleComplete();
    else setStep(s => s + 1);
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Bienvenida al Panel MO"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden onboarding-enter">
        {/* Skip button */}
        <button
          onClick={handleComplete}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors z-10 focus-visible:outline-2 focus-visible:outline-violet-500"
          aria-label="Omitir introducción"
        >
          <X size={18} />
        </button>

        {/* Step icon */}
        <div className={`${current.bg} px-6 pt-10 pb-8 flex flex-col items-center`}>
          <div className="bg-white rounded-3xl w-20 h-20 flex items-center justify-center shadow-md mb-4">
            {current.icon}
          </div>
          {/* Progress dots */}
          <div className="flex gap-2" role="progressbar" aria-valuenow={step + 1} aria-valuemax={STEPS.length}>
            {STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className={`rounded-full transition-all ${
                  i === step
                    ? 'w-5 h-2 bg-violet-600'
                    : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Ir al paso ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pt-5 pb-6">
          <h2 className="text-xl font-extrabold text-slate-800 text-center leading-tight mb-2">
            {current.title}
          </h2>
          <p className="text-slate-500 text-sm text-center leading-relaxed">
            {current.description}
          </p>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            {step > 0 && (
              <button
                onClick={() => setStep(s => s - 1)}
                className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-colors focus-visible:outline-2 focus-visible:outline-slate-400"
              >
                Anterior
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-violet-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-violet-500"
            >
              {isLast ? (
                <>
                  <CheckCircle2 size={16} />
                  ¡Comenzar!
                </>
              ) : (
                <>
                  Siguiente
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>

          {/* Step counter */}
          <p className="text-center text-[11px] text-slate-400 mt-3">
            Paso {step + 1} de {STEPS.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
