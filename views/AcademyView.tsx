
import React, { useState } from 'react';
// Added Award to the lucide-react imports
import { Play, CheckCircle, FileText, ChevronLeft, Download, Info, Award } from 'lucide-react';
import { mockCourses } from '../mockData';
import { Course } from '../types';

const AcademyView: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  if (selectedCourse) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
        <button 
          onClick={() => setSelectedCourse(null)}
          className="flex items-center gap-2 text-slate-500 font-semibold mb-2"
        >
          <ChevronLeft size={20} />
          Volver a mis cursos
        </button>

        {/* Video Player */}
        <div className="aspect-video w-full bg-black rounded-3xl overflow-hidden shadow-2xl">
          <iframe 
            width="100%" 
            height="100%" 
            src={selectedCourse.videoUrl} 
            title="Course Video" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>

        {/* Course Info */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">{selectedCourse.title}</h2>
              <p className="text-slate-500 mt-2">{selectedCourse.description}</p>
            </div>
            <div className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-xs font-bold">
               {selectedCourse.progress}% completado
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 mt-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
               <FileText size={18} className="text-violet-600" />
               Archivos Adjuntos
            </h3>
            <div className="space-y-3">
              {selectedCourse.attachments.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg text-slate-400">
                       <FileText size={20} />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{file.name}</span>
                  </div>
                  <button className="p-2 text-violet-600 hover:bg-violet-50 rounded-lg transition-colors">
                    <Download size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button className="w-full p-4 bg-violet-600 text-white rounded-2xl font-bold shadow-lg shadow-violet-100">
           Finalizar este Módulo
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Academia MO</h2>
          <p className="text-slate-500">Capacitaciones para tu crecimiento.</p>
        </div>
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-violet-100 border-t-violet-600 flex items-center justify-center">
            <span className="text-xs font-bold">82%</span>
          </div>
          <div className="pr-2">
            <p className="text-[10px] uppercase font-bold text-slate-400">Progreso Total</p>
            <p className="text-xs font-bold text-slate-700">6/8 Cursos</p>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-violet-200 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-violet-200 text-sm font-bold uppercase tracking-widest mb-1">Próximo desafío</p>
          <h3 className="text-xl font-bold mb-4">Certificación en Puesta a Tierra</h3>
          <button className="px-6 py-2.5 bg-white text-violet-600 rounded-xl text-sm font-bold shadow-lg active:scale-95 transition-transform">
             Continuar Aprendiendo
          </button>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-20 transform rotate-12">
           <Award size={140} />
        </div>
      </section>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-bold text-slate-800">Mis Cursos</h3>
          <button className="text-violet-600 text-sm font-bold">Ver todos</button>
        </div>
        {mockCourses.map(course => (
          <div 
            key={course.id} 
            onClick={() => setSelectedCourse(course)}
            className="group bg-white rounded-3xl p-4 border border-slate-100 shadow-sm flex gap-4 active:scale-[0.98] transition-all cursor-pointer hover:border-violet-200"
          >
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100">
               <img src={`https://picsum.photos/seed/${course.id}/200`} alt={course.title} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                 <div className="w-8 h-8 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                   <Play size={16} fill="currentColor" />
                 </div>
               </div>
            </div>
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <h4 className="font-bold text-slate-800 leading-tight">{course.title}</h4>
                <div className="flex items-center gap-1.5 mt-1">
                   <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">VÍDEO</span>
                   <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">DOCS</span>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Progreso</span>
                  <span className="text-[10px] font-bold text-violet-600">{course.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-violet-600 rounded-full transition-all duration-1000" 
                     style={{ width: `${course.progress}%` }}
                   />
                </div>
              </div>
            </div>
            <div className="flex items-center">
               {course.progress === 100 ? (
                 <CheckCircle className="text-emerald-500" size={24} />
               ) : (
                 <ChevronRight className="text-slate-300" size={20} />
               )}
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Section */}
      <section className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 text-slate-800 font-bold mb-3">
          <Info size={18} className="text-violet-600" />
          Recomendado para vos
        </div>
        <p className="text-sm text-slate-500 mb-4">Basado en tus relevamientos recientes, este curso te ayudaría a mejorar tus presupuestos.</p>
        <div className="flex items-center justify-between p-3 bg-violet-50 rounded-2xl border border-violet-100">
           <span className="text-sm font-bold text-violet-700">Costos y presupuestos II</span>
           <button className="px-3 py-1.5 bg-violet-600 text-white rounded-lg text-xs font-bold">Inscribirse</button>
        </div>
      </section>
    </div>
  );
};

interface ChevronRightProps {
  className?: string;
  size?: number;
}

const ChevronRight: React.FC<ChevronRightProps> = ({ className, size = 24 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

export default AcademyView;
