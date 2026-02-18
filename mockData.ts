
import { Professional, Course, ServiceRequest, DashboardStats } from './types';

export const mockProfessionals: Professional[] = [
  {
    id: '1',
    name: 'Marta García',
    specialty: 'Instalaciones Eléctricas / Trifásica',
    zone: 'CABA',
    avatar: 'https://picsum.photos/seed/marta/200',
    coursesCompleted: ['Normativa AEA', 'Energías Renovables'],
    portfolio: [
      'https://picsum.photos/seed/p1/400',
      'https://picsum.photos/seed/p2/400',
      'https://picsum.photos/seed/p3/400'
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
    avatar: 'https://picsum.photos/seed/lucia/200',
    coursesCompleted: ['Smart Home v2', 'Seguridad Electrónica'],
    portfolio: [
      'https://picsum.photos/seed/p4/400',
      'https://picsum.photos/seed/p5/400',
      'https://picsum.photos/seed/p6/400'
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
    avatar: 'https://picsum.photos/seed/elena/200',
    coursesCompleted: ['Protocolo puesta a tierra', 'Habilitaciones Municipales'],
    portfolio: [
      'https://picsum.photos/seed/p7/400',
      'https://picsum.photos/seed/p8/400',
      'https://picsum.photos/seed/p9/400'
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
    avatar: 'https://picsum.photos/seed/valeria/200',
    coursesCompleted: ['Gasista matriculada', 'Instalaciones Sanitarias'],
    portfolio: [
      'https://picsum.photos/seed/p10/400',
      'https://picsum.photos/seed/p11/400',
      'https://picsum.photos/seed/p12/400'
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
    avatar: 'https://picsum.photos/seed/sofia/200',
    coursesCompleted: ['Técnicas Decorativas', 'Microcemento'],
    portfolio: [
      'https://picsum.photos/seed/p13/400',
      'https://picsum.photos/seed/p14/400',
      'https://picsum.photos/seed/p15/400'
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
