
import { Professional, Course, ServiceRequest, DashboardStats, AppNotification } from './types';

export const mockProfessionals: Professional[] = [
  {
    id: '1',
    name: 'Marta García',
    specialty: 'Instalaciones Eléctricas / Trifásica',
    zone: 'CABA',
    // Mujer electricista trabajando con cables en escalera
    avatar: 'https://images.pexels.com/photos/8486932/pexels-photo-8486932.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    coursesCompleted: ['Normativa AEA', 'Energías Renovables'],
    portfolio: [
      // Mujer electricista parada en escalera sosteniendo cables
      'https://images.pexels.com/photos/20500461/pexels-photo-20500461.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      // Mujer electricista perforando pared con taladro y casco
      'https://images.pexels.com/photos/8486929/pexels-photo-8486929.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      // Mujer soldando con gafas protectoras
      'https://images.pexels.com/photos/9241771/pexels-photo-9241771.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    whatsapp: '5491100000001',
    bio: 'Electricista matriculada con 8 años de experiencia en instalaciones residenciales y comerciales. Especialista en sistemas trifásicos y normativa AEA.',
    skills: ['Trifásica', 'Tableros', 'Normativa AEA', 'Luminarias', 'Automatización'],
    rating: 4.9,
    totalJobs: 47,
    availability: 'available',
    jobHistory: [
      { id: 'jh1', clientName: 'Ana González', serviceType: 'Electricidad', date: '2026-02-10', status: 'completed', rating: 5, notes: 'Excelente trabajo y puntualidad.' },
      { id: 'jh2', clientName: 'Rosa Pérez', serviceType: 'Tablero eléctrico', date: '2026-01-28', status: 'completed', rating: 5 },
      { id: 'jh3', clientName: 'Carmen López', serviceType: 'Iluminación LED', date: '2026-01-15', status: 'completed', rating: 4 },
    ]
  },
  {
    id: '2',
    name: 'Lucía Domínguez',
    specialty: 'Domótica y Automatización',
    zone: 'Norte',
    // Mujer técnica en tecnología e ingeniería
    avatar: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    coursesCompleted: ['Smart Home v2', 'Seguridad Electrónica'],
    portfolio: [
      // Mujer ingeniera con casco amarillo en entorno industrial
      'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      // Mujer técnica inspeccionando paneles solares con PPE
      'https://images.pexels.com/photos/4254163/pexels-photo-4254163.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      // Cámara de seguridad smart home (neutral)
      'https://images.pexels.com/photos/26597080/pexels-photo-26597080.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    whatsapp: '5491100000002',
    bio: 'Técnica especializada en domótica residencial e industrial. Integro sistemas KNX, Z-Wave y asistentes de voz. Certificada por LARES Argentina.',
    skills: ['KNX', 'Smart Home', 'CCTV', 'Control Remoto', 'Integraciones IoT'],
    rating: 4.7,
    totalJobs: 31,
    availability: 'busy',
    jobHistory: [
      { id: 'jh4', clientName: 'Patricia Salas', serviceType: 'Smart Home', date: '2026-02-12', status: 'in_progress' },
      { id: 'jh5', clientName: 'Inés Morales', serviceType: 'CCTV', date: '2026-01-20', status: 'completed', rating: 5 },
    ]
  },
  {
    id: '3',
    name: 'Elena Rodríguez',
    specialty: 'Certificaciones e Inspección',
    zone: 'Sur',
    // Ingeniera inspectora con casco y clipboard en obra
    avatar: 'https://images.pexels.com/photos/3862371/pexels-photo-3862371.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    coursesCompleted: ['Protocolo puesta a tierra', 'Habilitaciones Municipales'],
    portfolio: [
      // Mujer ingeniera con casco y portapapeles inspeccionando obra
      'https://images.pexels.com/photos/7937365/pexels-photo-7937365.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      // Mujer revisando notas en obra con casco
      'https://images.pexels.com/photos/7937676/pexels-photo-7937676.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      // Mujer ingeniera en taller industrial con sonrisa
      'https://images.pexels.com/photos/3862614/pexels-photo-3862614.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    whatsapp: '5491100000003',
    bio: 'Inspectora técnica y certificadora con amplia experiencia en habilitaciones municipales y auditorías eléctricas para locales comerciales.',
    skills: ['Certificaciones', 'Habilitaciones', 'Puesta a Tierra', 'Auditoría', 'GAS TG'],
    rating: 4.8,
    totalJobs: 62,
    availability: 'available',
    jobHistory: [
      { id: 'jh6', clientName: 'Silvia Torres', serviceType: 'Habilitación', date: '2026-02-14', status: 'completed', rating: 5 },
      { id: 'jh7', clientName: 'María Ruiz', serviceType: 'Certificación', date: '2026-02-05', status: 'completed', rating: 4 },
    ]
  },
  {
    id: '4',
    name: 'Valeria Méndez',
    specialty: 'Plomería y Gas',
    zone: 'Oeste',
    // Mujer plomera sosteniendo llave inglesa con PPE
    avatar: 'https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    coursesCompleted: ['Gasista matriculada', 'Instalaciones Sanitarias'],
    portfolio: [
      // Mujer plomera caucásica con llave de plomero y PPE
      'https://images.pexels.com/photos/8486928/pexels-photo-8486928.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      // Mujer plomera con equipo de seguridad y llave
      'https://images.pexels.com/photos/8486923/pexels-photo-8486923.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      // Mujer plomera profesional con chaleco naranja sosteniendo llave
      'https://images.pexels.com/photos/8486975/pexels-photo-8486975.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    whatsapp: '5491100000004',
    bio: 'Gasista matriculada y plomera con más de 10 años de trayectoria. Especialista en instalaciones sanitarias y reparaciones de urgencia.',
    skills: ['Plomería', 'Gas', 'Soldadura', 'Calefacción', 'Sanitarios'],
    rating: 4.6,
    totalJobs: 89,
    availability: 'available',
    jobHistory: [
      { id: 'jh8', clientName: 'Fernanda Díaz', serviceType: 'Plomería urgente', date: '2026-02-16', status: 'completed', rating: 5 },
      { id: 'jh9', clientName: 'Claudia Vega', serviceType: 'Instalación gas', date: '2026-02-01', status: 'completed', rating: 4 },
    ]
  },
  {
    id: '5',
    name: 'Sofía Castillo',
    specialty: 'Pintura y Revestimientos',
    zone: 'CABA',
    // Mujer pintora adulta con rodillo de pintura
    avatar: 'https://images.pexels.com/photos/8481711/pexels-photo-8481711.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    coursesCompleted: ['Técnicas Decorativas', 'Microcemento'],
    portfolio: [
      // Mujer pintando pared gris con rodillo en obra de renovación
      'https://images.pexels.com/photos/6764265/pexels-photo-6764265.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      // Mujer joven pintando pared gris sonriendo DIY
      'https://images.pexels.com/photos/6764262/pexels-photo-6764262.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      // Mujer pintando con rodillo gris en interior, renovación
      'https://images.pexels.com/photos/6764270/pexels-photo-6764270.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    ],
    whatsapp: '5491100000005',
    bio: 'Pintora profesional y decoradora de interiores. Especializada en microcemento, pintura texturada y revestimientos decorativos de alta gama.',
    skills: ['Pintura', 'Microcemento', 'Texturado', 'Revestimientos', 'Decoración'],
    rating: 4.9,
    totalJobs: 53,
    availability: 'unavailable',
    jobHistory: [
      { id: 'jh10', clientName: 'Laura Jiménez', serviceType: 'Microcemento baño', date: '2026-02-08', status: 'completed', rating: 5 },
    ]
  }
];

export const mockServiceRequests: ServiceRequest[] = [
  {
    id: 'sr1',
    clientName: 'Ana González',
    serviceType: 'Electricidad',
    address: 'Av. Corrientes 1234, CABA',
    zone: 'CABA',
    date: '2026-02-18',
    status: 'pending',
    notes: 'Necesita revisión de tablero eléctrico y cambio de disyuntores.',
    priority: 'high',
  },
  {
    id: 'sr2',
    clientName: 'Patricia Salas',
    serviceType: 'Domótica',
    address: 'Limites 450, San Isidro',
    zone: 'Norte',
    date: '2026-02-17',
    status: 'in_progress',
    assignedProfessionalId: '2',
    notes: 'Instalación sistema Smart Home completo.',
    priority: 'medium',
  },
  {
    id: 'sr3',
    clientName: 'Fernanda Díaz',
    serviceType: 'Plomería',
    address: 'Rivadavia 890, Morón',
    zone: 'Oeste',
    date: '2026-02-16',
    status: 'completed',
    assignedProfessionalId: '4',
    notes: 'Caño roto en cocina - urgente.',
    priority: 'high',
  },
  {
    id: 'sr4',
    clientName: 'Inés Morales',
    serviceType: 'Pintura',
    address: 'Mitre 321, La Plata',
    zone: 'Sur',
    date: '2026-02-15',
    status: 'pending',
    notes: 'Pintura interior 3 ambientes, preparación de superficies incluida.',
    priority: 'low',
  },
  {
    id: 'sr5',
    clientName: 'Carmen López',
    serviceType: 'Electricidad',
    address: 'San Martín 567, CABA',
    zone: 'CABA',
    date: '2026-02-14',
    status: 'in_progress',
    assignedProfessionalId: '1',
    notes: 'Instalación de luminarias LED en local comercial.',
    priority: 'medium',
  },
  {
    id: 'sr6',
    clientName: 'Silvia Torres',
    serviceType: 'Certificación',
    address: 'Belgrano 123, Quilmes',
    zone: 'Sur',
    date: '2026-02-13',
    status: 'completed',
    assignedProfessionalId: '3',
    notes: 'Habilitación municipal local gastronómico.',
    priority: 'high',
  },
];

export const mockDashboardStats: DashboardStats = {
  totalProfessionals: 5,
  activeProfessionals: 3,
  pendingRequests: 2,
  inProgressJobs: 2,
  completedThisMonth: 4,
  zones: [
    { name: 'CABA', count: 2 },
    { name: 'Norte', count: 1 },
    { name: 'Sur', count: 1 },
    { name: 'Oeste', count: 1 },
  ],
};

export const mockCourses: Course[] = [
  {
    id: 'c1',
    title: 'Domótica Residencial Avanzada',
    progress: 65,
    description: 'Aprende a instalar y configurar sistemas de control inteligente para el hogar, incluyendo iluminación, climatización y seguridad.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    attachments: [
      { name: 'Guía de Protocolos KNX.pdf', url: '#' },
      { name: 'Esquema Eléctrico Smart.pdf', url: '#' }
    ]
  },
  {
    id: 'c2',
    title: 'Seguridad en el Trabajo de Obra',
    progress: 100,
    description: 'Protocolos de seguridad, uso de EPP y gestión de riesgos en ambientes de construcción civil e industrial.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    attachments: [
      { name: 'Manual de EPP.pdf', url: '#' }
    ]
  }
];

// ─── Mock Notifications ───────────────────────────────────────────────────────
export const mockNotifications: AppNotification[] = [
  {
    id: 'n1',
    type: 'reminder',
    title: 'Ficha técnica creada',
    body: 'Creaste una nueva ficha técnica. Recordá asignar una profesional para derivar el trabajo.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    read: false,
    targetTab: 'matching' as any,
    relatedId: 'sr1',
  },
  {
    id: 'n2',
    type: 'available_pro',
    title: 'Profesional disponible',
    body: 'Marta García está disponible y lista para aceptar trabajos.',
    timestamp: new Date(Date.now() - 32 * 60 * 1000).toISOString(),
    read: false,
    targetTab: 'directory' as any,
    relatedId: '1',
  },
  {
    id: 'n3',
    type: 'status_change',
    title: 'Trabajo completado',
    body: 'Marcaste como completado el servicio de Plomería de Fernanda Díaz.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
    targetTab: 'matching' as any,
    relatedId: 'sr3',
  },
  {
    id: 'n4',
    type: 'assignment',
    title: 'Asignación confirmada',
    body: 'Asignaste a Lucía Domínguez al trabajo de Domótica de Patricia Salas.',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    read: true,
    targetTab: 'matching' as any,
    relatedId: 'sr2',
  },
  {
    id: 'n5',
    type: 'reminder',
    title: 'Recordatorio pendiente',
    body: 'Tenés 2 fichas técnicas sin asignar que requieren atención.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    targetTab: 'matching' as any,
  },
];
