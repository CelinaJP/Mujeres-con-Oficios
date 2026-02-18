
import React, { useState, useMemo } from 'react';
import {
  Search, SlidersHorizontal, MapPin, Star, Award,
  ChevronRight, Users, X, CheckCircle2
} from 'lucide-react';
import { mockProfessionals } from '../mockData';
import { AvailabilityStatus, Professional } from '../types';
import ProfessionalProfileModal from '../components/ProfessionalProfileModal';

const ZONES = ['Todas', 'CABA', 'Norte', 'Sur', 'Oeste'];
const SPECIALTIES = ['Todas', 'Electricidad', 'Domótica', 'Certificaciones', 'Plomería', 'Pintura'];
const AVAILABILITY_OPTS: { value: AvailabilityStatus | 'all'; label: string }[] = [
  { value: 'all',         label: 'Cualquier estado' },
  { value: 'available',   label: 'Disponibles' },
  { value: 'busy',        label: 'Ocupadas' },
  { value: 'unavailable', label: 'No disponibles' },
];

const availabilityChip: Record<AvailabilityStatus, { label: string; color: string; dot: string }> = {
  available:   { label: 'Disponible',    color: 'text-emerald-600', dot: 'bg-emerald-500' },
  busy:        { label: 'Ocupada',       color: 'text-amber-600',   dot: 'bg-amber-400' },
  unavailable: { label: 'No disponible', color: 'text-slate-400',   dot: 'bg-slate-300' },
};

const DirectoryView: React.FC = () => {
  const [searchTerm, setSearchTerm]         = useState('');
  const [filterZone, setFilterZone]         = useState('Todas');
  const [filterSpecialty, setFilterSpecialty] = useState('Todas');
  const [filterAvail, setFilterAvail]       = useState<AvailabilityStatus | 'all'>('all');
  const [showFilters, setShowFilters]       = useState(false);
  const [selectedPro, setSelectedPro]       = useState<Professional | null>(null);

  const activeFilterCount = [
    filterZone !== 'Todas',
    filterSpecialty !== 'Todas',
    filterAvail !== 'all',
  ].filter(Boolean).length;

  const filtered = useMemo(() => mockProfessionals.filter(pro => {
    const q = searchTerm.toLowerCase();
    const matchSearch =
      pro.name.toLowerCase().includes(q) ||
      pro.specialty.toLowerCase().includes(q) ||
      (pro.skills ?? []).some(s => s.toLowerCase().includes(q));
    const matchZone    = filterZone === 'Todas' || pro.zone === filterZone;
    const matchSpec    = filterSpecialty === 'Todas' || pro.specialty.toLowerCase().includes(filterSpecialty.toLowerCase());
    const matchAvail   = filterAvail === 'all' || pro.availability === filterAvail;
    return matchSearch && matchZone && matchSpec && matchAvail;
  }), [searchTerm, filterZone, filterSpecialty, filterAvail]);

  const clearFilters = () => {
    setFilterZone('Todas');
    setFilterSpecialty('Todas');
    setFilterAvail('all');
  };

  return (
    <div className="space-y-5 pb-24">
      {/* Header */}
      <header>
        <h2 className="text-2xl font-extrabold text-slate-800">Directorio</h2>
        <p className="text-slate-500 text-sm mt-0.5">
          {filtered.length} profesional{filtered.length !== 1 ? 'es' : ''} encontrada{filtered.length !== 1 ? 's' : ''}
        </p>
      </header>

      {/* Search + Filter toggle */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
          <input
            type="text"
            placeholder="Búsqueda por nombre, especialidad o skill…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-violet-400 focus:border-transparent text-slate-700 text-sm placeholder:text-slate-400 transition-all"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500">
              <X size={16} />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(v => !v)}
          className={`relative flex items-center gap-2 px-4 py-3 rounded-2xl border font-semibold text-sm transition-all shadow-sm ${
            showFilters || activeFilterCount > 0
              ? 'bg-violet-600 text-white border-violet-600 shadow-violet-200'
              : 'bg-white text-slate-600 border-slate-200'
          }`}
        >
          <SlidersHorizontal size={17} />
          Filtros
          {activeFilterCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center border-2 border-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Expanded Filters Panel */}
      {showFilters && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-extrabold text-slate-700">Filtros avanzados</p>
            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className="text-xs text-rose-500 font-bold hover:underline flex items-center gap-1">
                <X size={12} /> Limpiar todo
              </button>
            )}
          </div>

          {/* Zone chips */}
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Zona</p>
            <div className="flex gap-2 flex-wrap">
              {ZONES.map(z => (
                <button
                  key={z}
                  onClick={() => setFilterZone(z)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    filterZone === z
                      ? 'bg-violet-600 text-white border-violet-600 shadow-sm shadow-violet-200'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-violet-300'
                  }`}
                >
                  {z}
                </button>
              ))}
            </div>
          </div>

          {/* Specialty chips */}
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Especialidad</p>
            <div className="flex gap-2 flex-wrap">
              {SPECIALTIES.map(s => (
                <button
                  key={s}
                  onClick={() => setFilterSpecialty(s)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    filterSpecialty === s
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-200'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Availability select */}
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Disponibilidad</p>
            <div className="flex gap-2 flex-wrap">
              {AVAILABILITY_OPTS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setFilterAvail(opt.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    filterAvail === opt.value
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-200'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick zone chips (always visible) */}
      {!showFilters && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {ZONES.map(zone => (
            <button
              key={zone}
              onClick={() => setFilterZone(zone)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                filterZone === zone
                  ? 'bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-200'
                  : 'bg-white border-slate-200 text-slate-500 hover:border-violet-300'
              }`}
            >
              {zone}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-slate-100 rounded-3xl p-6 mb-4">
            <Users size={36} className="text-slate-300 mx-auto" />
          </div>
          <p className="font-bold text-slate-500">Sin resultados</p>
          <p className="text-slate-400 text-sm mt-1">Probá ajustando los filtros de búsqueda.</p>
          <button onClick={clearFilters} className="mt-4 text-sm text-violet-600 font-bold hover:underline">Limpiar filtros</button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(pro => {
            const availCfg = availabilityChip[pro.availability ?? 'available'];
            return (
              <button
                key={pro.id}
                onClick={() => setSelectedPro(pro)}
                className="w-full bg-white rounded-3xl p-5 shadow-sm border border-slate-200 hover:border-violet-300 hover:shadow-md transition-all text-left active:scale-[0.99]"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex gap-3.5">
                    <div className="relative shrink-0">
                      <img src={pro.avatar} alt={pro.name} className="w-14 h-14 rounded-2xl object-cover" />
                      <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${availCfg.dot}`} />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-800 text-base leading-tight">{pro.name}</h3>
                      <p className="text-violet-600 text-xs font-bold mt-0.5">{pro.specialty}</p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="flex items-center gap-1 text-slate-400 text-xs">
                          <MapPin size={11} /> {pro.zone}
                        </span>
                        <span className="text-slate-200">·</span>
                        <span className="flex items-center gap-1 text-xs">
                          <Star size={11} className="text-amber-400 fill-amber-400" />
                          <strong className="text-amber-600">{pro.rating}</strong>
                          <span className="text-slate-400">({pro.totalJobs} trab.)</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <ChevronRight size={20} className="text-slate-300" />
                    <span className={`text-[10px] font-bold ${availCfg.color}`}>{availCfg.label}</span>
                  </div>
                </div>

                {/* Skills preview */}
                {pro.skills && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {pro.skills.slice(0, 4).map(skill => (
                      <span key={skill} className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg text-[10px] font-bold border border-slate-200">
                        {skill}
                      </span>
                    ))}
                    {pro.skills.length > 4 && (
                      <span className="bg-violet-50 text-violet-600 px-2.5 py-1 rounded-lg text-[10px] font-bold border border-violet-200">
                        +{pro.skills.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Courses */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {pro.coursesCompleted.map((course, idx) => (
                    <span key={idx} className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg text-[10px] font-bold border border-emerald-200">
                      <Award size={9} /> {course}
                    </span>
                  ))}
                </div>

                {/* Mini portfolio */}
                <div className="grid grid-cols-3 gap-1.5">
                  {pro.portfolio.slice(0, 3).map((img, idx) => (
                    <div key={idx} className="aspect-video rounded-xl overflow-hidden bg-slate-100">
                      <img src={img} alt="trabajo" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>

                {/* Certifications badge */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
                  <CheckCircle2 size={13} className="text-emerald-500" />
                  <span className="text-xs text-slate-500">
                    <strong className="text-slate-700">{pro.coursesCompleted.length}</strong> certificacion{pro.coursesCompleted.length !== 1 ? 'es' : ''} completada{pro.coursesCompleted.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Profile Modal */}
      {selectedPro && (
        <ProfessionalProfileModal
          professional={selectedPro}
          onClose={() => setSelectedPro(null)}
        />
      )}
    </div>
  );
};

export default DirectoryView;
