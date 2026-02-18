
import React, { useState, useRef } from 'react';
import { Camera, Mic, Plus, X, UserPlus, FileText, CheckCircle2, User, MapPin, Briefcase } from 'lucide-react';
import { mockProfessionals } from '../mockData';
import { Professional } from '../types';

const SurveyView: React.FC = () => {
  // Estados para "Datos del lugar"
  const [clientName, setClientName] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [address, setAddress] = useState({
    street: '',
    number: '',
    betweenStreets: '',
    locality: ''
  });

  // Estados originales
  const [notes, setNotes] = useState('');
  const [materials, setMaterials] = useState<string[]>([]);
  const [materialInput, setMaterialInput] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddMaterial = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && materialInput.trim()) {
      setMaterials([...materials, materialInput.trim()]);
      setMaterialInput('');
    }
  };

  const removeMaterial = (index: number) => {
    setMaterials(materials.filter((_, i) => i !== index));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).map((file: File) => URL.createObjectURL(file));
      setPhotos([...photos, ...newPhotos]);
    }
  };

  const handleSubmit = () => {
    const data = {
      clientName,
      serviceType,
      address,
      notes,
      materials,
      photos
    };
    console.log('Datos de Relevamiento Enviados:', data);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const services = [
    'Albañilería',
    'Plomería',
    'Electricidad',
    'Pintura',
    'Carpintería',
    'Gasista',
    'Durlock / Tabiquería',
    'Climatización'
  ];

  return (
    <div className="space-y-6">
      <header className="">
        <h2 className="flex items-center justify-center mb-0 text-3xl font-bold text-slate-800">Ficha Técnica</h2>
        <p className="flex items-center justify-center mb-2 text-slate-500">Completá los datos del relevamiento en obra.</p>
      </header>

      {isSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 size={20} />
          <span className="font-medium">¡Relevamiento guardado con éxito!</span>
        </div>
      )}

      <div className="layout-survey">
        <div className="col-span-1">
          {/* SECCIÓN: Datos del Lugar */}
      <section className="bg-blue-plus p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
        <label className="title-color block text-sm font-bold text-slate-700 mb-1 flex items-center gap-2">
          <MapPin size={18} className="text-red-600" />
          Datos del Lugar
        </label>

        <div className="space-y-3">
          {/* Nombre de la Clienta */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Nombre de la clienta"
              className="w-full p-3 pl-10 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-violet-500 text-sm"
            />
          </div>

          {/* Servicio Requerido */}
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full p-3 pl-10 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-violet-500 text-sm appearance-none text-slate-700"
            >
              <option value="" disabled>Servicio que requiere la clienta</option>
              {services.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Domicilio - Grid */}
          <div className="grid grid-cols-4 gap-2">
            <input
              type="text"
              placeholder="Calle"
              value={address.street}
              onChange={(e) => setAddress({...address, street: e.target.value})}
              className="col-span-3 p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-violet-500 text-sm"
            />
            <input
              type="text"
              placeholder="N°"
              value={address.number}
              onChange={(e) => setAddress({...address, number: e.target.value})}
              className="col-span-1 p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-violet-500 text-sm"
            />
          </div>
          <input
            type="text"
            placeholder="Entre calles"
            value={address.betweenStreets}
            onChange={(e) => setAddress({...address, betweenStreets: e.target.value})}
            className="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-violet-500 text-sm"
          />
          <input
            type="text"
            placeholder="Localidad"
            value={address.locality}
            onChange={(e) => setAddress({...address, locality: e.target.value})}
            className="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-violet-500 text-sm"
          />
        </div>
      </section>
        </div>
        <div className="col-span-1">
          {/* Media Section */}
      <section className="bg-blue-plus p-5 rounded-2xl shadow-sm border border-slate-100">
        <label className="title-color block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
          <Camera size={18} className="text-red-600" />
          Registro Visual
        </label>

        <div className="grid grid-cols-3 gap-3 mb-4">
          {photos.map((src, idx) => (
            <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200">
              <img src={src} alt={`Obra ${idx}`} className="w-full h-full object-cover" />
              <button
                onClick={() => setPhotos(photos.filter((_, i) => i !== idx))}
                className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors"
          >
            <Plus size={24} />
            <span className="text-[10px] font-bold mt-1 uppercase">Agregar</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handlePhotoUpload}
            multiple
            accept="image/*"
            className="hidden"
          />
        </div>
      </section>
        </div>
        <div className="col-span-1">
          {/* Notes Section */}
      <section className="bg-blue-plus p-5 rounded-2xl shadow-sm border border-slate-100">
        <label className="title-color block text-sm font-bold text-slate-700 mb-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
             <FileText size={18} className="text-red-600" />
             Observaciones y Notas
          </div>
          <button className="text-red-600 p-2 bg-red-50 rounded-full active:scale-95 transition-transform">
            <Mic size={18} />
          </button>
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Describe el estado de la instalación, tareas a realizar..."
          className="w-full h-32 p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-violet-500 placeholder:text-slate-400 text-slate-700 resize-none"
        />
      </section>
        </div>
      </div>

      {/* Materials Section */}
      <section className="bg-blue-plus p-5 rounded-2xl shadow-sm border border-slate-100">
        <label className="title-color block text-sm font-bold text-slate-700 mb-3">Lista de Materiales</label>
        <div className="relative mb-3">
          <input
            type="text"
            value={materialInput}
            onChange={(e) => setMaterialInput(e.target.value)}
            onKeyDown={handleAddMaterial}
            placeholder="Escribí un material y presioná Enter"
            className="w-full p-4 pr-12 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-violet-500 placeholder:text-slate-400 text-slate-700"
          />
          <button
            onClick={() => {
              if (materialInput.trim()) {
                setMaterials([...materials, materialInput.trim()]);
                setMaterialInput('');
              }
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-plus text-white p-2 rounded-lg"
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {materials.map((m, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-700 border border-slate-200">
              {m}
              <button onClick={() => removeMaterial(idx)} className="text-slate-400 hover:text-red-500">
                <X size={14} />
              </button>
            </div>
          ))}
          {materials.length === 0 && <p className="text-slate-400 text-sm italic">No hay materiales cargados.</p>}
        </div>
      </section>

      {/* Actions */}
      <div className="max-w-6xl grid grid-cols-2 gap-0 align-items-center justify-items-center align-self-center mx-auto">
        <button
          onClick={() => setShowMatchModal(true)}
          className="btn-view-1 flex items-center justify-center gap-2 p-4 bg-white border-2 border-red-600 text-red-600 rounded-xl font-bold active:bg-violet-50 transition-colors shadow-sm"
        >
          <UserPlus size={20} />
          Match Profesional
        </button>
        <button
          onClick={handleSubmit}
          className="btn-view-2 bg-red-plus p-4 bg-red-600 text-white rounded-xl font-bold shadow-lg shadow-violet-200 active:bg-red-700 transition-colors"
        >
          Guardar Ficha
        </button>
      </div>

      {/* Match Modal (Drawer style) */}
      {showMatchModal && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowMatchModal(false)} />
          <div className="relative w-full max-w-md bg-white rounded-t-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6" />
            <h3 className="text-xl font-bold text-slate-800 mb-4 text-center">Asignar Profesional</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {mockProfessionals.map((pro) => (
                <div key={pro.id} className="flex items-center justify-between p-3 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <img src={pro.avatar} alt={pro.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-slate-800">{pro.name}</p>
                      <p className="text-xs text-slate-500">{pro.specialty}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowMatchModal(false)}
                    className="p-2 bg-violet-50 text-violet-600 rounded-lg text-xs font-bold uppercase tracking-wider"
                  >
                    Asignar
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowMatchModal(false)}
              className="w-full mt-6 p-4 bg-slate-100 text-slate-600 rounded-xl font-bold"
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
