
import React, { useState, useMemo, useCallback } from 'react';
import {
  Search, SlidersHorizontal, MapPin, Star, Award,
  ChevronRight, Users, X, CheckCircle2, Phone,
  MessageCircle, Briefcase, ChevronDown, ChevronUp,
  Image as ImageIcon, Zap
} from 'lucide-react';
import { mockProfessionals } from '../mockData';
import { AvailabilityStatus, Professional } from '../types';
import ProfessionalProfileModal from '../components/ProfessionalProfileModal';

/* ── Constantes ──────────────────────────────────────────────────────────── */
const ZONES       = ['Todas', 'CABA', 'Norte', 'Sur', 'Oeste'];
const SPECIALTIES = ['Todas', 'Electricidad', 'Domótica', 'Certificaciones', 'Plomería', 'Pintura'];
const AVAILABILITY_OPTS: { value: AvailabilityStatus | 'all'; label: string }[] = [
  { value: 'all',         label: 'Cualquier estado' },
  { value: 'available',   label: 'Disponibles'      },
  { value: 'busy',        label: 'Ocupadas'         },
  { value: 'unavailable', label: 'No disponibles'   },
];

const AVAIL_CFG: Record<AvailabilityStatus, { label: string; cls: string; dot: string; badge: string }> = {
  available:   { label: 'Disponible',    cls: 'dir-badge--available',   dot: 'bg-emerald-500', badge: 'text-emerald-700 bg-emerald-50 border-emerald-200'  },
  busy:        { label: 'Ocupada',       cls: 'dir-badge--busy',        dot: 'bg-amber-400',   badge: 'text-amber-700  bg-amber-50  border-amber-200'      },
  unavailable: { label: 'No disponible', cls: 'dir-badge--unavailable', dot: 'bg-slate-300',   badge: 'text-slate-500  bg-slate-50  border-slate-200'      },
};

/* ── Utilidades ──────────────────────────────────────────────────────────── */
const openWhatsApp = (phone: string, name: string) => {
  const msg = encodeURIComponent(`Hola ${name}, te contacto desde Mujeres con Oficios.`);
  window.open(`https://wa.me/${phone}?text=${msg}`, '_blank', 'noopener');
};

const renderStars = (rating: number) =>
  [1, 2, 3, 4, 5].map(n => (
    <Star
      key={n}
      size={11}
      className={n <= Math.round(rating)
        ? 'text-amber-400 fill-amber-400'
        : 'text-slate-200 fill-slate-200'}
    />
  ));

/* ── Sub-componente: mini galería de portfolio ───────────────────────────── */
const PortfolioStrip: React.FC<{ images: string[]; specialty: string; onExpand: () => void }> = ({
  images, specialty, onExpand
}) => {
  const visible = images.slice(0, 2);
  const extra   = images.length - 2;
  return (
    <div className="dir-portfolio">
      {visible.map((src, i) => (
        <div key={i} className="dir-portfolio__thumb">
          <img
            src={src}
            alt={`Trabajo de ${specialty} ${i + 1}`}
            className="dir-portfolio__img"
            loading="lazy"
          />
        </div>
      ))}
      {extra > 0 && (
        <button
          className="dir-portfolio__more"
          onClick={e => { e.stopPropagation(); onExpand(); }}
          aria-label={`Ver ${extra} foto${extra !== 1 ? 's' : ''} más`}
          title={`Ver ${extra} foto${extra !== 1 ? 's' : ''} más`}
        >
          <ImageIcon size={16} />
          <span>+{extra}</span>
        </button>
      )}
    </div>
  );
};

/* ── Sub-componente: card de profesional ─────────────────────────────────── */
const ProfCard: React.FC<{
  pro: Professional;
  onOpen: (p: Professional) => void;
}> = ({ pro, onOpen }) => {
  const avail      = pro.availability ?? 'available';
  const cfg        = AVAIL_CFG[avail];
  const skillsShow = (pro.skills ?? []).slice(0, 3);
  const skillsMore = (pro.skills ?? []).length - 3;

  return (
    <article className="dir-card" aria-label={`Perfil de ${pro.name}`}>
      {/* ── Encabezado ── */}
      <div className="dir-card__header">
        <div className="dir-card__avatar-wrap">
          <img
            src={pro.avatar}
            alt={`Avatar de ${pro.name}`}
            className="dir-card__avatar"
            loading="lazy"
          />
          <span
            className={`dir-card__dot ${cfg.dot}`}
            title={cfg.label}
            aria-label={`Estado: ${cfg.label}`}
          />
        </div>

        <div className="dir-card__meta">
          <div className="dir-card__name-row">
            <h3 className="dir-card__name">{pro.name}</h3>
            <span className={`dir-badge ${cfg.cls}`}>{cfg.label}</span>
          </div>

          <p className="dir-card__specialty">
            <Briefcase size={12} />
            {pro.specialty}
          </p>

          <div className="dir-card__stats">
            <span className="dir-card__zone" title={`Zona: ${pro.zone}`}>
              <MapPin size={11} />
              {pro.zone}
            </span>
            <span className="dir-card__sep" aria-hidden>·</span>
            <span className="dir-card__rating" aria-label={`Rating: ${pro.rating} sobre 5`}>
              <span className="dir-card__stars">{renderStars(pro.rating ?? 0)}</span>
              <strong>{pro.rating}</strong>
              <span className="dir-card__jobs">({pro.totalJobs} trab.)</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── Skills ── */}
      {skillsShow.length > 0 && (
        <div className="dir-card__skills" role="list" aria-label="Habilidades">
          {skillsShow.map(skill => (
            <span key={skill} className="dir-skill" role="listitem">{skill}</span>
          ))}
          {skillsMore > 0 && (
            <span className="dir-skill dir-skill--more">+{skillsMore}</span>
          )}
        </div>
      )}

      {/* ── Certificaciones ── */}
      {pro.coursesCompleted.length > 0 && (
        <div className="dir-card__certs" role="list" aria-label="Certificaciones">
          {pro.coursesCompleted.map((c, i) => (
            <span key={i} className="dir-cert" role="listitem">
              <Award size={10} />
              {c}
            </span>
          ))}
        </div>
      )}

      {/* ── Portfolio strip ── */}
      {pro.portfolio.length > 0 && (
        <PortfolioStrip
          images={pro.portfolio}
          specialty={pro.specialty}
          onExpand={() => onOpen(pro)}
        />
      )}

      {/* ── Acciones ── */}
      <div className="dir-card__actions">
        <button
          className="dir-btn dir-btn--wa"
          onClick={e => { e.stopPropagation(); openWhatsApp(pro.whatsapp, pro.name); }}
          aria-label={`Contactar a ${pro.name} por WhatsApp`}
          title="Contactar por WhatsApp"
        >
          <MessageCircle size={15} />
          WhatsApp
        </button>
        <button
          className="dir-btn dir-btn--profile"
          onClick={() => onOpen(pro)}
          aria-label={`Ver perfil completo de ${pro.name}`}
        >
          Ver perfil
          <ChevronRight size={15} />
        </button>
      </div>
    </article>
  );
};

/* ── Vista principal ─────────────────────────────────────────────────────── */
const DirectoryView: React.FC = () => {
  const [searchTerm,       setSearchTerm]       = useState('');
  const [filterZone,       setFilterZone]       = useState('Todas');
  const [filterSpecialty,  setFilterSpecialty]  = useState('Todas');
  const [filterAvail,      setFilterAvail]      = useState<AvailabilityStatus | 'all'>('all');
  const [showFilters,      setShowFilters]      = useState(false);
  const [selectedPro,      setSelectedPro]      = useState<Professional | null>(null);
  const [sortBy,           setSortBy]           = useState<'rating' | 'jobs' | 'name'>('rating');

  const activeFilterCount = [
    filterZone !== 'Todas',
    filterSpecialty !== 'Todas',
    filterAvail !== 'all',
  ].filter(Boolean).length;

  const filtered = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return mockProfessionals
      .filter(pro => {
        const matchSearch =
          pro.name.toLowerCase().includes(q) ||
          pro.specialty.toLowerCase().includes(q) ||
          (pro.skills ?? []).some(s => s.toLowerCase().includes(q));
        const matchZone  = filterZone === 'Todas' || pro.zone === filterZone;
        const matchSpec  = filterSpecialty === 'Todas' || pro.specialty.toLowerCase().includes(filterSpecialty.toLowerCase());
        const matchAvail = filterAvail === 'all' || pro.availability === filterAvail;
        return matchSearch && matchZone && matchSpec && matchAvail;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return (b.rating ?? 0) - (a.rating ?? 0);
        if (sortBy === 'jobs')   return (b.totalJobs ?? 0) - (a.totalJobs ?? 0);
        return a.name.localeCompare(b.name);
      });
  }, [searchTerm, filterZone, filterSpecialty, filterAvail, sortBy]);

  const clearFilters = useCallback(() => {
    setFilterZone('Todas');
    setFilterSpecialty('Todas');
    setFilterAvail('all');
  }, []);

  return (
    <div className="dir-root">

      {/* ── Header ── */}
      <header className="dir-header">
        <div>
          <h2 className="dir-header__title">Directorio</h2>
          <p className="dir-header__sub">
            <Users size={13} />
            {filtered.length} profesional{filtered.length !== 1 ? 'es' : ''} encontrada{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
        {/* Selector de ordenamiento */}
        <div className="dir-sort-wrap">
          <label htmlFor="dir-sort" className="dir-sort-label">Ordenar por</label>
          <select
            id="dir-sort"
            value={sortBy}
            onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="dir-sort-select"
          >
            <option value="rating">Mejor rating</option>
            <option value="jobs">Más trabajos</option>
            <option value="name">Nombre A-Z</option>
          </select>
        </div>
      </header>

      {/* ── Barra de búsqueda + toggles ── */}
      <div className="dir-search-row">
        <div className="dir-search-wrap">
          <Search size={16} className="dir-search-icon" aria-hidden />
          <input
            type="search"
            placeholder="Buscá por nombre, especialidad o habilidad…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="dir-search-input"
            aria-label="Buscar profesionales"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="dir-search-clear"
              aria-label="Limpiar búsqueda"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(v => !v)}
          className={`dir-filter-btn ${showFilters || activeFilterCount > 0 ? 'dir-filter-btn--active' : ''}`}
          aria-expanded={showFilters}
          aria-controls="dir-filters-panel"
        >
          <SlidersHorizontal size={16} />
          Filtros
          {activeFilterCount > 0 && (
            <span className="dir-filter-badge" aria-label={`${activeFilterCount} filtros activos`}>
              {activeFilterCount}
            </span>
          )}
          {showFilters ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* ── Panel de filtros expandible ── */}
      {showFilters && (
        <div id="dir-filters-panel" className="dir-filters-panel" role="region" aria-label="Filtros avanzados">
          <div className="dir-filters-panel__head">
            <p className="dir-filters-panel__title">Filtros avanzados</p>
            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className="dir-filters-panel__clear">
                <X size={11} /> Limpiar todo
              </button>
            )}
          </div>

          <fieldset className="dir-filter-group">
            <legend className="dir-filter-group__legend">Zona</legend>
            <div className="dir-filter-group__chips">
              {ZONES.map(z => (
                <button
                  key={z}
                  onClick={() => setFilterZone(z)}
                  className={`dir-chip-filter ${filterZone === z ? 'dir-chip-filter--active dir-chip-filter--zone' : ''}`}
                  aria-pressed={filterZone === z}
                >
                  {z}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="dir-filter-group">
            <legend className="dir-filter-group__legend">Especialidad</legend>
            <div className="dir-filter-group__chips">
              {SPECIALTIES.map(s => (
                <button
                  key={s}
                  onClick={() => setFilterSpecialty(s)}
                  className={`dir-chip-filter ${filterSpecialty === s ? 'dir-chip-filter--active dir-chip-filter--spec' : ''}`}
                  aria-pressed={filterSpecialty === s}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="dir-filter-group">
            <legend className="dir-filter-group__legend">Disponibilidad</legend>
            <div className="dir-filter-group__chips">
              {AVAILABILITY_OPTS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setFilterAvail(opt.value)}
                  className={`dir-chip-filter ${filterAvail === opt.value ? 'dir-chip-filter--active dir-chip-filter--avail' : ''}`}
                  aria-pressed={filterAvail === opt.value}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      )}

      {/* ── Zone pills rápidas (cuando el panel está cerrado) ── */}
      {!showFilters && (
        <nav className="dir-zone-strip" aria-label="Filtrar por zona">
          {ZONES.map(zone => (
            <button
              key={zone}
              onClick={() => setFilterZone(zone)}
              className={`dir-zone-pill ${filterZone === zone ? 'dir-zone-pill--active' : ''}`}
              aria-pressed={filterZone === zone}
            >
              {zone}
            </button>
          ))}
        </nav>
      )}

      {/* ── Resultados ── */}
      {filtered.length === 0 ? (
        <div className="dir-empty" role="status">
          <div className="dir-empty__icon">
            <Users size={32} className="text-slate-300" />
          </div>
          <p className="dir-empty__title">Sin resultados</p>
          <p className="dir-empty__sub">Probá ajustando los filtros o la búsqueda.</p>
          <button onClick={clearFilters} className="dir-empty__cta">
            <Zap size={14} /> Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="dir-grid" role="list" aria-label="Lista de profesionales">
          {filtered.map(pro => (
            <div key={pro.id} role="listitem">
              <ProfCard pro={pro} onOpen={setSelectedPro} />
            </div>
          ))}
        </div>
      )}

      {/* ── Modal de perfil ── */}
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
