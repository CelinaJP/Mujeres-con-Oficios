
import { Professional, Course } from './types';

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
    whatsapp: '5491100000001'
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
    whatsapp: '5491100000002'
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
    whatsapp: '5491100000003'
  }
];

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
