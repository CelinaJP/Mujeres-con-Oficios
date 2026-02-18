
import React, { useState, useRef, useCallback } from 'react';
import {
  Camera, Mic, Plus, X, UserPlus, FileText, CheckCircle2,
  User, MapPin, Briefcase, ImagePlus, Star, ChevronDown,
  Package, AlertCircle, Upload
} from 'lucide-react';
import { mockProfessionals } from '../mockData';

/* ─── tipos locales ────────────────────────────────────────── */
interface AddressState {
  street: string;
  number: string;
  betweenStreets: string;
  locality: string;
}

/* ─── sub-componente: campo de texto ──────────────────────── */
interface FieldProps {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  error?: string;
  type?: string;
}
const Field: React.FC<FieldProps> = ({ icon, placeholder, value, onChange, hint, error, type = 'text' }) => (
  <div className="survey-field-wrap">
    <div className={`survey-field ${error ? 'survey-field--error' : ''}`}>
      <span className="survey-field__icon">{icon}</span>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="survey-field__input"
      />
    </div>
    {hint && !error && <p className="survey-field__hint">{hint}</p>}
    {error && (
      <p className="survey-field__error">
        <AlertCircle size={12} />
        {error}
      </p>
    )}
  </div>
);

/* ─── SurveyView principal ────────────────────────────────── */
const SurveyView: React.FC = () => {
  const [clientName, setClientName]   = useState('');
  const [serviceType, setServiceType] = useState('');
  const [address, setAddress]         = useState<AddressState>({ street: '', number: '', betweenStreets: '', locality: '' });
  const [notes, setNotes]             = useState('');
  const [materials, setMaterials]     = useState<string[]>([]);
  const [materialInput, setMaterialInput] = useState('');
  const [photos, setPhotos]           = useState<string[]>([]);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [isSuccess, setIsSuccess]     = useState(false);
  const [isDragging, setIsDragging]   = useState(false);
  const [touched, setTouched]         = useState<Record<string, boolean>>({});
  const [isRecording, setIsRecording] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const validate = (field: string, val: string) => {
    if (field === 'clientName' && !val.trim()) return 'El nombre es requerido';
    if (field === 'serviceType' && !val) return 'Seleccioná un servicio';
    return '';
  };

  const addPhotos = useCallback((files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files).map(f => URL.createObjectURL(f));
    setPhotos(prev => [...prev, ...urls]);
  }, []);

  const handleAddMaterial = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && materialInput.trim()) {
      setMaterials(prev => [...prev, materialInput.trim()]);
      setMaterialInput('');
    }
  };

  const handleSubmit = () => {
    setTouched({ clientName: true, serviceType: true });
    if (!clientName.trim() || !serviceType) return;
    console.log('Relevamiento:', { clientName, serviceType, address, notes, materials, photos });
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3500);
  };

  const services = [
    'Albañilería', 'Plomería', 'Electricidad', 'Pintura',
    'Carpintería', 'Gasista', 'Durlock / Tabiquería', 'Climatización',
  ];

  /* ── drag & drop ── */
  const onDragOver  = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = () => setIsDragging(false);
  const onDrop      = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addPhotos(e.dataTransfer.files);
  };

  return (
    <div className="survey-root">

      {/* ── Header ── */}
      <header className="survey-header">
        <div className="survey-header__badge">
          <FileText size={14} />
          Relevamiento en Obra
        </div>
        <h1 className="survey-header__title">Ficha Técnica</h1>
        <p className="survey-header__sub">Completá los datos del relevamiento en obra.</p>
      </header>

      {/* ── Toast éxito ── */}
      {isSuccess && (
        <div className="survey-toast survey-toast--success">
          <CheckCircle2 size={18} />
          <span>¡Relevamiento guardado con éxito!</span>
        </div>
      )}

      {/* ── Grid principal ── */}
      <div className="survey-grid">

        {/* ── Tarjeta Datos del Lugar ── */}
        <div className="survey-card survey-card--place">
          <div className="survey-card__head">
            <span className="survey-card__icon-wrap survey-card__icon-wrap--indigo">
              <MapPin size={16} />
            </span>
            <div>
              <h2 className="survey-card__title">Datos del Lugar</h2>
              <p className="survey-card__desc">Información de la clienta y ubicación</p>
            </div>
          </div>

          <div className="survey-card__body space-y-3">
            <Field
              icon={<User size={15} />}
              placeholder="Nombre completo de la clienta"
              value={clientName}
              onChange={setClientName}
              error={touched.clientName ? validate('clientName', clientName) : ''}
              hint="Nombre y apellido tal como aparece en el contrato"
            />

            <div className="survey-select-wrap">
              <span className="survey-select__icon"><Briefcase size={15} /></span>
              <select
                value={serviceType}
                onBlur={() => setTouched(t => ({ ...t, serviceType: true }))}
                onChange={e => setServiceType(e.target.value)}
                className={`survey-select ${touched.serviceType && !serviceType ? 'survey-select--error' : ''}`}
              >
                <option value="" disabled>Servicio que requiere la clienta</option>
                {services.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <span className="survey-select__chevron"><ChevronDown size={14} /></span>
            </div>
            {touched.serviceType && !serviceType && (
              <p className="survey-field__error"><AlertCircle size={12} />Seleccioná un servicio</p>
            )}

            <div className="survey-address-grid">
              <input
                type="text"
                placeholder="Calle"
                value={address.street}
                onChange={e => setAddress(a => ({ ...a, street: e.target.value }))}
                className="survey-input survey-input--street"
              />
              <input
                type="text"
                placeholder="N°"
                value={address.number}
                onChange={e => setAddress(a => ({ ...a, number: e.target.value }))}
                className="survey-input survey-input--number"
              />
            </div>
            <input
              type="text"
              placeholder="Entre calles (opcional)"
              value={address.betweenStreets}
              onChange={e => setAddress(a => ({ ...a, betweenStreets: e.target.value }))}
              className="survey-input"
            />
            <input
              type="text"
              placeholder="Localidad / Barrio"
              value={address.locality}
              onChange={e => setAddress(a => ({ ...a, locality: e.target.value }))}
              className="survey-input"
            />
          </div>
        </div>

        {/* ── Tarjeta Registro Visual ── */}
        <div className="survey-card survey-card--media">
          <div className="survey-card__head">
            <span className="survey-card__icon-wrap survey-card__icon-wrap--amber">
              <Camera size={16} />
            </span>
            <div>
              <h2 className="survey-card__title">Registro Visual</h2>
              <p className="survey-card__desc">Fotos del estado actual de la obra</p>
            </div>
          </div>

          <div className="survey-card__body">
            {/* Drop zone */}
            <div
              className={`survey-dropzone ${isDragging ? 'survey-dropzone--active' : ''}`}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              aria-label="Subir imágenes"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && fileInputRef.current?.click()}
            >
              <Upload size={28} className="survey-dropzone__icon" />
              <p className="survey-dropzone__title">Arrastrá o hacé clic para subir</p>
              <p className="survey-dropzone__sub">PNG, JPG, HEIC · Máx. 10 MB c/u</p>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={e => addPhotos(e.target.files)}
              multiple
              accept="image/*"
              className="hidden"
            />

            {/* Preview grid */}
            {photos.length > 0 && (
              <div className="survey-photo-grid">
                {photos.map((src, idx) => (
                  <div key={idx} className="survey-photo-thumb">
                    <img src={src} alt={`Obra ${idx + 1}`} className="survey-photo-thumb__img" />
                    <button
                      onClick={() => setPhotos(p => p.filter((_, i) => i !== idx))}
                      className="survey-photo-thumb__remove"
                      aria-label="Eliminar foto"
                    >
                      <X size={11} />
                    </button>
                    <span className="survey-photo-thumb__num">{idx + 1}</span>
                  </div>
                ))}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="survey-photo-add"
                  title="Agregar más fotos"
                >
                  <ImagePlus size={20} />
                </button>
              </div>
            )}

            {photos.length > 0 && (
              <p className="survey-photo-count">
                <CheckCircle2 size={13} className="text-emerald-500" />
                {photos.length} {photos.length === 1 ? 'foto cargada' : 'fotos cargadas'}
              </p>
            )}
          </div>
        </div>

        {/* ── Tarjeta Observaciones ── */}
        <div className="survey-card survey-card--notes">
          <div className="survey-card__head">
            <span className="survey-card__icon-wrap survey-card__icon-wrap--rose">
              <FileText size={16} />
            </span>
            <div className="flex-1">
              <h2 className="survey-card__title">Observaciones y Notas</h2>
              <p className="survey-card__desc">Estado, tareas y detalles relevantes</p>
            </div>
            <button
              className={`survey-mic-btn ${isRecording ? 'survey-mic-btn--active' : ''}`}
              onClick={() => setIsRecording(r => !r)}
              title={isRecording ? 'Detener grabación' : 'Dictar nota de voz'}
            >
              <Mic size={15} />
              {isRecording && <span className="survey-mic-pulse" />}
            </button>
          </div>

          <div className="survey-card__body">
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Describe el estado de la instalación, tareas a realizar, materiales necesarios..."
              className="survey-textarea"
              rows={6}
            />
            <div className="survey-textarea-footer">
              <span className={`survey-char-count ${notes.length > 450 ? 'survey-char-count--warn' : ''}`}>
                {notes.length}/500
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tarjeta Materiales ── */}
      <div className="survey-card survey-card--full">
        <div className="survey-card__head">
          <span className="survey-card__icon-wrap survey-card__icon-wrap--emerald">
            <Package size={16} />
          </span>
          <div className="flex-1">
            <h2 className="survey-card__title">Lista de Materiales</h2>
            <p className="survey-card__desc">Ingresá los materiales necesarios para la obra</p>
          </div>
          {materials.length > 0 && (
            <span className="survey-badge">{materials.length}</span>
          )}
        </div>

        <div className="survey-card__body">
          <div className="survey-material-input-wrap">
            <input
              type="text"
              value={materialInput}
              onChange={e => setMaterialInput(e.target.value)}
              onKeyDown={handleAddMaterial}
              placeholder="Escribí un material y presioná Enter o hacé clic en +"
              className="survey-material-input"
            />
            <button
              onClick={() => {
                if (materialInput.trim()) {
                  setMaterials(prev => [...prev, materialInput.trim()]);
                  setMaterialInput('');
                }
              }}
              className="survey-material-add-btn"
              title="Agregar material"
            >
              <Plus size={18} />
            </button>
          </div>

          {materials.length > 0 ? (
            <div className="survey-chips">
              {materials.map((m, idx) => (
                <span key={idx} className="survey-chip">
                  {m}
                  <button
                    onClick={() => setMaterials(prev => prev.filter((_, i) => i !== idx))}
                    className="survey-chip__remove"
                    aria-label={`Eliminar ${m}`}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <div className="survey-empty-materials">
              <Package size={24} className="text-slate-300" />
              <p>No hay materiales cargados aún.</p>
              <span>Usá el campo de arriba para agregar materiales.</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Acciones ── */}
      <div className="survey-actions">
        <button
          onClick={() => setShowMatchModal(true)}
          className="survey-btn survey-btn--secondary"
        >
          <UserPlus size={18} />
          Match Profesional
        </button>
        <button
          onClick={handleSubmit}
          className="survey-btn survey-btn--primary"
        >
          <CheckCircle2 size={18} />
          Guardar Ficha
        </button>
      </div>

      {/* ── Modal Match Profesional ── */}
      {showMatchModal && (
        <div className="survey-overlay" onClick={() => setShowMatchModal(false)}>
          <div className="survey-modal" onClick={e => e.stopPropagation()}>
            <div className="survey-modal__handle" />
            <div className="survey-modal__head">
              <div className="survey-modal__icon-wrap">
                <UserPlus size={20} />
              </div>
              <div>
                <h3 className="survey-modal__title">Asignar Profesional</h3>
                <p className="survey-modal__sub">Elegí la profesional más adecuada para esta obra</p>
              </div>
            </div>

            <div className="survey-modal__list">
              {mockProfessionals.map((pro) => (
                <div key={pro.id} className="survey-pro-card">
                  <img src={pro.avatar} alt={pro.name} className="survey-pro-card__avatar" />
                  <div className="survey-pro-card__info">
                    <p className="survey-pro-card__name">{pro.name}</p>
                    <p className="survey-pro-card__specialty">{pro.specialty}</p>
                    {'rating' in pro && pro.rating && (
                      <span className="survey-pro-card__rating">
                        <Star size={11} className="fill-amber-400 text-amber-400" />
                        {pro.rating}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setShowMatchModal(false)}
                    className="survey-pro-card__btn"
                  >
                    Asignar
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowMatchModal(false)}
              className="survey-modal__cancel"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyView;
