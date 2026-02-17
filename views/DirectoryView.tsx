
import React, { useState } from 'react';
import { Search, Filter, MessageCircle, MapPin, Award, ChevronRight } from 'lucide-react';
import { mockProfessionals } from '../mockData';

const DirectoryView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterZone, setFilterZone] = useState('Todas');

  const filtered = mockProfessionals.filter(pro => {
    const matchesSearch = pro.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         pro.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesZone = filterZone === 'Todas' || pro.zone === filterZone;
    return matchesSearch && matchesZone;
  });

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">Directorio</h2>
        <p className="text-slate-500">Encontrá profesionales de confianza.</p>
      </header>

      {/* Search & Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Buscar por nombre o especialidad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pl-12 bg-white rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-violet-500 text-slate-700"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['Todas', 'CABA', 'Norte', 'Sur'].map(zone => (
            <button 
              key={zone}
              onClick={() => setFilterZone(zone)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all border ${
                filterZone === zone 
                ? 'bg-violet-600 border-violet-600 text-white shadow-md' 
                : 'bg-white border-slate-200 text-slate-500 hover:border-violet-300'
              }`}
            >
              {zone}
            </button>
          ))}
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-500 flex items-center gap-2">
            <Filter size={16} />
            <span className="text-sm font-semibold">Filtros</span>
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {filtered.map(pro => (
          <div key={pro.id} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 overflow-hidden">
            <div className="flex items-start justify-between mb-4">
              <div className="flex gap-4">
                <img src={pro.avatar} alt={pro.name} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-50" />
                <div>
                  <h3 className="font-bold text-slate-800 text-lg leading-tight">{pro.name}</h3>
                  <p className="text-violet-600 text-sm font-semibold mt-0.5">{pro.specialty}</p>
                  <div className="flex items-center gap-1 text-slate-400 text-xs mt-1">
                    <MapPin size={12} />
                    <span>{pro.zone}</span>
                  </div>
                </div>
              </div>
              <button className="text-slate-300">
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {pro.coursesCompleted.map((course, idx) => (
                <span key={idx} className="flex items-center gap-1 bg-violet-50 text-violet-700 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                  <Award size={10} />
                  {course}
                </span>
              ))}
            </div>

            {/* Mini Portfolio */}
            <div className="grid grid-cols-3 gap-2 mb-5">
              {pro.portfolio.map((img, idx) => (
                <img key={idx} src={img} alt="Trabajo" className="aspect-square rounded-xl object-cover" />
              ))}
            </div>

            {/* Action */}
            <a 
              href={`https://wa.me/${pro.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full p-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold transition-all shadow-lg shadow-emerald-100"
            >
              <MessageCircle size={20} />
              Contactar por WhatsApp
            </a>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 font-medium">No se encontraron profesionales.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectoryView;
