
export enum TabType {
  SURVEY = 'survey',
  ACADEMY = 'academy',
  DIRECTORY = 'directory',
  DASHBOARD = 'dashboard',
  MATCHING = 'matching',
}

export type AvailabilityStatus = 'available' | 'busy' | 'unavailable';
export type JobStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface Professional {
  id: string;
  name: string;
  specialty: string;
  zone: string;
  avatar: string;
  coursesCompleted: string[];
  portfolio: string[];
  whatsapp: string;
  bio?: string;
  skills?: string[];
  rating?: number;
  totalJobs?: number;
  availability?: AvailabilityStatus;
  jobHistory?: JobRecord[];
}

export interface JobRecord {
  id: string;
  clientName: string;
  serviceType: string;
  date: string;
  status: JobStatus;
  rating?: number;
  notes?: string;
}

export interface ServiceRequest {
  id: string;
  clientName: string;
  serviceType: string;
  address: string;
  zone: string;
  date: string;
  status: JobStatus;
  assignedProfessionalId?: string;
  notes?: string;
  priority?: 'low' | 'medium' | 'high';
}

export interface Course {
  id: string;
  title: string;
  progress: number;
  description: string;
  videoUrl: string;
  attachments: { name: string; url: string }[];
}

export interface SurveyForm {
  clientName: string;
  serviceType: string;
  address: {
    street: string;
    number: string;
    betweenStreets: string;
    locality: string;
  };
  notes: string;
  materials: string[];
  photos: string[];
}

export interface DashboardStats {
  totalProfessionals: number;
  activeProfessionals: number;
  pendingRequests: number;
  inProgressJobs: number;
  completedThisMonth: number;
  zones: { name: string; count: number }[];
}

// ─── Notifications ────────────────────────────────────────────────────────────
export type NotificationType =
  | 'new_request'
  | 'assignment'
  | 'status_change'
  | 'available_pro'
  | 'reminder';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  timestamp: string;       // ISO string
  read: boolean;
  /** Tab to navigate to when tapped */
  targetTab?: TabType;
  /** ID del recurso relacionado (ServiceRequest, Professional…) */
  relatedId?: string;
}
